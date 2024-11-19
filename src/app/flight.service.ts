import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

   private flightOffersSearch = 
   'https://test.api.amadeus.com/v2/shopping/flight-offers/';
   private flightOffersPrice = 
   'https://test.api.amadeus.com/v1/shopping/flight-offers/pricing';
   private flightCreateOrders = 
   'https://test.api.amadeus.com/v1/booking/flight-orders';

   

  
}
