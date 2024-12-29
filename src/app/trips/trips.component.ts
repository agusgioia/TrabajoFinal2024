import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Usuario } from '../usuario.interface';
import { UsuarioService } from '../services/usuario.service';
import { AuthService } from '../auth/auth.service';
import { HeaderComponent } from "../header/header.component";
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';



@Component({
  selector: 'app-trips',
  standalone: true,
  imports: [ButtonModule, CardModule, CommonModule, HeaderComponent],
  templateUrl: './trips.component.html',
  styleUrl: './trips.component.css'
})
export class TripsComponent implements OnInit{

  usuario!:Usuario;

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

  redirect(){
    this.router.navigateByUrl('/home');
  }
}
