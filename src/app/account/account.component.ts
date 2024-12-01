import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {  CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import {  Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { InputNumberModule } from 'primeng/inputnumber';
import { Usuario } from '../usuario.interface';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [ToastModule,CardModule,ReactiveFormsModule,CommonModule,FormsModule,ButtonModule,InputNumberModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit{
  usuariosLista:Usuario[]=[];
  formUser!:FormGroup;
  usuario!: Usuario;
  docId!:string;


  constructor(
    private userService:UsuarioService,
    private fu:FormBuilder,
    private messageService:MessageService,
    private router:Router,
    private authService:AuthService){
      this.formUser = this.fu.group({
        id:[''],
        email:['',Validators.required],
        nombreUsuario:['',Validators.required],
        genero:['',Validators.required],
        edad:[18,[Validators.required,Validators.min(18)]],
        presupuesto:[0,[Validators.required,Validators.min(0)]],
        Viajes:[''],
      })
  }

  getIdUserByEmail(email:string|undefined){
    for(let i=0;i<this.usuariosLista.length;i++){
      if (email===this.usuariosLista[i].email){
        this.usuario = this.usuariosLista[i];
        this.docId = this.usuariosLista[i].id;
        break;
      }
    }
  }

  ngOnInit(): void {
    this.userService.listarUsuarios().subscribe(Response =>{
      this.usuariosLista=Response;
      console.log(this.usuariosLista);
      this.getIdUserByEmail(this.authService.currentUserSig()?.email);
      this.formUser.patchValue(this.usuario);
    });   
  }

  
  updateUser(){
    if(this.formUser.invalid){
      this.messageService.add({
        severity:'error',
        summary:'Error',
        detail:'Revise los campos e intente nuevamente',
      });
      return;
    }
    console.log(this.formUser.value);
    this.userService.EditarUsuario(this.formUser.value,this.docId!).subscribe({
      next:()=>{
        this.messageService.add({
          severity:'success',
          summary:'Guardado',
          detail:'Usuario actualizado correctamente',
        });
        this.router.navigateByUrl('/');
      },
      error:()=>{
        this.messageService.add({
          severity:'error',
          summary:'Error',
          detail:'Revise los campos e intente nuevamente',
        });
      }
    });
  }

    
}
