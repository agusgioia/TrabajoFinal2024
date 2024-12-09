import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FlightSearchComponent } from "../flight-search/flight-search.component";
import { HotelSearchComponent } from "../hotel-search/hotel-search.component";
import { HeaderComponent } from "../header/header.component";
import { SharedService } from '../shared/shared.service';
import { UsuarioService } from '../services/usuario.service';
import { AuthService } from '../auth/auth.service';
import { Usuario } from '../usuario.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, FlightSearchComponent, HotelSearchComponent, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(
    private sharedService:SharedService,
    private authService:AuthService,
    private userService:UsuarioService){}

  AgregarViaje(){
    const viaje = this.sharedService.getViaje(); 
    const usuarioPatch: Partial<Usuario> = { Viajes: viaje }; 
    this.userService.PatchUsuario(this.authService.currentUserSig()!.id, usuarioPatch).subscribe((response) => { 
      console.log(response); });
  }
 
}
