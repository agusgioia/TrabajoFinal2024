import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { usuario } from '../usuario';
import { UsuarioService } from '../usuario.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [HeaderComponent, FooterComponent,CommonModule,FormsModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit{
    usuariosLista!: usuario[];
    constructor(private userService:UsuarioService){}

    ngOnInit(): void {
      this.listarTodosLosUsuarios();
    }

    private listarTodosLosUsuarios(){
      this.userService.listarUsuarios().subscribe(
        lamb =>{
          this.usuariosLista=lamb;
          console.log(this.usuariosLista);
        }
      )
    }
}
