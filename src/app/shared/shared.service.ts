import { Injectable } from '@angular/core';
import {  HotelArray } from '../hotel.interface'; // Asegúrate de importar los tipos correctos
import { FlightOffer } from '../vuelo.interface';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private viaje: { vuelo: FlightOffer | null; alojamiento: HotelArray | null } = {
    vuelo: null,
    alojamiento: null
  };

  setFlightData(flightData: FlightOffer | null) {
    this.viaje.vuelo = flightData;
  }

  setHotelData(hotelData: HotelArray | null) {
    this.viaje.alojamiento = hotelData;
  }

  getViaje() {
    return this.viaje;
  }

  clearData() {
    this.viaje = { vuelo: null, alojamiento: null };
  }
}
