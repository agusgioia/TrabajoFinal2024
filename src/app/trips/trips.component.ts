import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Usuario } from '../usuario.interface';
import { UsuarioService } from '../services/usuario.service';
import { AuthService } from '../auth/auth.service';
import { Viajes } from '../usuario.interface';
import { HeaderComponent } from "../header/header.component";
import { Router } from '@angular/router';



@Component({
  selector: 'app-trips',
  standalone: true,
  imports: [ButtonModule, CardModule, CommonModule, HeaderComponent],
  templateUrl: './trips.component.html',
  styleUrl: './trips.component.css'
})
export class TripsComponent implements OnInit{
  usuariosLista:Usuario[]=[];
  usuario!:Usuario;
  viajes:Viajes[]=[];
  docId!:string;

  constructor(
    private userService:UsuarioService,
    private authService:AuthService,
    private router:Router){}

  ngOnInit(): void {
    this.listarTodosLosUsuarios();
    console.log(this.usuario.listaViajes);
  }

  async listarTodosLosUsuarios(){
    this.userService.listarUsuarios().subscribe(
      data =>{
        this.usuariosLista=data;
        console.log(this.usuariosLista);
        this.getIdUserByEmail(this.authService.currentUserSig()?.email);
      }
    )
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

  redirect(){
    this.router.navigateByUrl('/home');
  }

}
