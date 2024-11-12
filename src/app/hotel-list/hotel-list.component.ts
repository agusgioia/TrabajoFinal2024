import { Component, OnInit } from '@angular/core';
import { HotelListService } from '../hotel-list.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hotel-list',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './hotel-list.component.html',
  styleUrl: './hotel-list.component.css'
})
export class HotelListComponent implements OnInit {
  ciudad: string = '';
  fechaEntrada: string = '';
  fechaSalida: string = '';
  adultos: number = 1;
  habitaciones: number = 1;
  hoteles: any[] = [];
  error: string = '';

  constructor(private hotelService: HotelListService) {}

  ngOnInit(): void {
    this.hotelService.obtenerToken().subscribe({
      next: (response) => {
        this.hotelService.setAccessToken(response.access_token);
        console.log('Token de acceso:', response.access_token);
      },
      error: (error) => {
        console.error('Error al obtener el token:', error);
      }
    });
  }

  buscarHoteles(): void {
    this.hotelService.obtenerIATACiudad(this.ciudad).subscribe({
      next: (response) => {
        const codigoIATA = response.data[0]?.iataCode;
        if (codigoIATA) {
          this.hotelService.obtenerHoteles(codigoIATA, this.fechaEntrada, this.fechaSalida, this.adultos, this.habitaciones).subscribe({
            next: (hotelesResponse) => {
              this.hoteles = hotelesResponse.data;
            },
            error: (error) => {
              this.error = 'Error al obtener hoteles: ' + error.message;
            }
          });
        } else {
          this.error = 'No se encontró ningún código IATA para la ciudad ingresada.';
        }
      },
      error: (error) => {
        this.error = 'Error al obtener el código IATA: ' + error.message;
      }
    });
  }
}
