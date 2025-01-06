import { HotelArray } from "./hotel.interface";
import { FlightOffer } from "./vuelo.interface";

export interface Usuario{
    id:string;
    email:string;
    nombreUsuario:string;
    genero?:string;
    edad?:number;
    presupuesto?:number;
    viajes:Viajes[] | null;
}

export interface Viajes{
    idViaje:number|null;
    vuelo:FlightOffer | null;
    alojamiento:HotelArray | null;
}