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
import { AuthService } from '../auth/auth.service';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [ToastModule, CardModule, ReactiveFormsModule, CommonModule, FormsModule, ButtonModule, InputNumberModule, HeaderComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit{
  
  formUser!:FormGroup;
  usuario!: Usuario;
  
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

  getIdUserById(){
    this.userService.getUserById(this.authService.currentUserSig()?.id!).subscribe({
      next:(foundUser)=>{
        this.usuario = foundUser;
        console.log(this.usuario);
        this.formUser.patchValue(this.usuario);
      },
      error:()=>{
        this.messageService.add({severity:'error', summary:'Error', detail:'Usuario no encontrado'});
      }
    });
  }

  ngOnInit(): void {
    this.getIdUserById();
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
    this.userService.EditarUsuario(this.formUser.value,this.authService.currentUserSig()?.id!).subscribe({
      next:()=>{
        this.messageService.add({
          severity:'success',
          summary:'Guardado',
          detail:'Usuario actualizado correctamente',
        });
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
