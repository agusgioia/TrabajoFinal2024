import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Usuario } from '../usuario.interface';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-trips',
  standalone: true,
  imports: [ButtonModule,CardModule,CommonModule ],
  templateUrl: './trips.component.html',
  styleUrl: './trips.component.css'
})
export class TripsComponent implements OnInit{
  usuariosLista:Usuario[]=[];

  constructor(private userService:UsuarioService){}

  ngOnInit(): void {
    this.listarTodosLosUsuarios();
  }

  listarTodosLosUsuarios(){
    this.userService.listarUsuarios().subscribe(
      data =>{
        this.usuariosLista=data;
        console.log(this.usuariosLista);
      }
    )
  }

}
