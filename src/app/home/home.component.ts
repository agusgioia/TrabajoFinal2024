import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FlightSearchComponent } from "../flight-search/flight-search.component";
import { HotelSearchComponent } from "../hotel-search/hotel-search.component";
import { HeaderComponent } from "../header/header.component";
import { SharedService } from '../shared/shared.service';
import { UsuarioService } from '../services/usuario.service';
import { AuthService } from '../auth/auth.service';
import { MessageService } from 'primeng/api';

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
    private userService:UsuarioService,
    private messageService:MessageService){}

  AgregarViaje(){
    const viaje = this.sharedService.getViaje();
    console.log("Viaje a guardar: ",viaje);
    this.userService.getUserById(this.authService.currentUserSig()!.id).subscribe({
      next:(Response)=>{
        let updatedTrips = Response.viajes;
        console.log("viajes antes del cambio: ",updatedTrips);
        if (!updatedTrips){
          updatedTrips = [];
        }
        viaje.idViaje = updatedTrips.length;
        updatedTrips!.push(viaje);
        console.log("viajes después del cambio: ",updatedTrips);
        this.userService.PatchUsuario(this.authService.currentUserSig()!.id, {viajes:updatedTrips}).subscribe({
          next:() => { 
           this.messageService.add({ severity: 'success', summary: 'Enviado', detail: 'Datos guardados enviados con éxito'});
           this.sharedService.clearData();
          },
          error:(error)=>{
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrió un error al enviar los datos' });
          }
        });
      },
      error:(error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrió un error al obtener los datos actuales del usuario' });
      }
    });
    
  }
 
}
