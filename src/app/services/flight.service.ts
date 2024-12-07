import { Injectable } from '@angular/core';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { HotelListService } from './hotel-list.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

   private flightOffersSearch = 
   'https://test.api.amadeus.com/v2/shopping/flight-offers'; // iataCodeOrigen, iataCodeDestino, fechaSalida, fechaVuelta(opcional), adultos
   private flightOffersPrice = 
   'https://test.api.amadeus.com/v1/shopping/flight-offers/pricing'; // No entiendo pero parece que sobreescribe si es necesario los precios de la anterior api para saber el precio final en tiempo real
   private flightCreateOrders = 
   'https://test.api.amadeus.com/v1/booking/flight-orders'; // crea la orden de compra

    private accessToken:string = '';

    constructor(private token:HotelListService,private http:HttpClient){}

    listarVuelos(iataOrigin:string,iataDest:string,departureDate:string,returnDate:string,adults:number):Observable<any>{
      return this.token.obtenerToken().pipe( 
        switchMap(response => { 
          this.accessToken = response.access_token; 
          const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.accessToken}` }); 
          let url = `${this.flightOffersSearch}?originLocationCode=${iataOrigin}&destinationLocationCode=${iataDest}&departureDate=${departureDate}&returnDate=${returnDate}&adults=${adults}`; 
          return this.http.get(url, { headers }); 
        }), 
        catchError((error) => { 
          return throwError(() => new Error(error.message || 'Error del servidor')); 
        }) 
      );
    }


  
}