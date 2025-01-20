import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Usuario } from '../usuario.interface';
import { UsuarioService } from '../services/usuario.service';
import { AuthService } from '../auth/auth.service';
import { HeaderComponent } from "../header/header.component";
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';


@Component({
  selector: 'app-trips',
  standalone: true,
  imports: [ButtonModule, CardModule, CommonModule, 
    HeaderComponent,ToastModule],
  templateUrl: './trips.component.html',
  styleUrl: './trips.component.css'
})
export class TripsComponent implements OnInit{

  usuario!:Usuario;
items: MenuItem[]|undefined;

  constructor(
    private userService:UsuarioService,
    private authService:AuthService,
    private router:Router,
    private messageService:MessageService){}

  ngOnInit(): void {
    this.getUserById();
  }

  getUserById(){

    this.userService.getUserById(this.authService.currentUserSig()?.id!).subscribe({
        next:(foundUser)=>{
          this.usuario = foundUser;
          console.log(this.usuario);
        },
        error:()=>{
          this.messageService.add({severity:'error', summary:'Error', detail:'Usuario no encontrado'});
        }
      });

  }

   //onEdit(){}
  

  onDelete(idViaje:number|null){
    this.userService.EliminarViaje(this.authService.currentUserSig()?.id!,idViaje).subscribe({
      next:()=>{this.messageService.add({severity:'success',summary:'Success',detail:'Viaje borrado'})},
      error:(err) => {
        console.error(err);
      }
    });
  }

  redirect(){
    this.router.navigateByUrl('/home');
  }
}
