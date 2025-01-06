import { Injectable } from '@angular/core';
import {  HotelArray } from '../hotel.interface'; 
import { FlightOffer } from '../vuelo.interface';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private viaje: {idViaje:number | null; vuelo: FlightOffer | null; alojamiento: HotelArray | null } = {
    idViaje:null,
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
    this.viaje = { idViaje:null,vuelo: null, alojamiento: null };
  }
}
