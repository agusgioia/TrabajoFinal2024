import { Injectable } from '@angular/core';
import { Viajes } from '../usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private viajes: Viajes[] = [];
  private i:number = 0;
  setVuelo(value: any) {
    this.viajes[this.i].Transporte = value;
  }

  setAlojamiento(value: any) {
    this.viajes[this.i].Alojamiento = value;
  }

  getViaje(): Viajes[] {
    this.i++;
    return this.viajes;
  }
}
