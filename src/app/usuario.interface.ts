import { HotelOffer } from "./hotel.interface";
import { FlightOffer } from "./vuelo.interface";

export interface Usuario{
    id:string;
    email:string;
    nombreUsuario:string;
    genero?:string;
    edad?:number;
    presupuesto?:number;
    listaViajes:Viajes[];
}

export interface Viajes{
    Transporte:FlightOffer | null;
    Alojamiento:HotelOffer | null;
  }