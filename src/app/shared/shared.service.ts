import { Injectable } from '@angular/core';
import { Viajes } from '../usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private viajes: Viajes[] = []; // Cambiar a array para manejar múltiples viajes

  setVuelo(value: any) {
    if (!this.viajes[0]) {
      this.viajes[0] = { Transporte: null, Alojamiento: null };
    }
    this.viajes[0].Transporte = value;
  }

  setAlojamiento(value: any) {
    if (!this.viajes[0]) {
      this.viajes[0] = { Transporte: null, Alojamiento: null };
    }
    this.viajes[0].Alojamiento = value;
  }

  getViaje(): Viajes[] {
    return this.viajes;
  }
}
