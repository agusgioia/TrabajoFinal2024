import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { usuarioInt } from '../usuario.interface';
import { UsuarioService } from '../usuario.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [HeaderComponent, FooterComponent,CommonModule,FormsModule,UserFormComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit{
    usuariosLista: usuarioInt[]=[];
    constructor(private userService:UsuarioService){}

    ngOnInit(): void {
      this.listarTodosLosUsuarios();
    }

    private listarTodosLosUsuarios(){
      this.userService.listarUsuarios().subscribe(
        data =>{
          this.usuariosLista=data;
          console.log(this.usuariosLista);
        }
      )
    }

    
    
}
