import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, switchMap, tap, throwError } from 'rxjs';

interface TokenResponse { 
  access_token: string; 
  token_type: string; 
  expires_in: number; 
}

@Injectable({
  providedIn: 'root'
})
export class HotelListService {

  private clientId = 'E9GAchBq91z1l1yhDlWGveZS20G3YzET';
  private clientSecret = '43UaxDJMKWSGcc0y';
  private tokenUrl: string = 'https://test.api.amadeus.com/v1/security/oauth2/token';
  private citySearchUrl: string = 'https://test.api.amadeus.com/v1/reference-data/locations/cities';
  private hotelListUrl: string = 'https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city';//?cityCode=BCN';
  private hotelSearchUrl:string = 'https://test.api.amadeus.com/v3/shopping/hotel-offers';// ?hotelIds=MCLONGHM'
  private hotelBookingUrl:string = 'https://test.api.amadeus.com/v2/booking/hotel-orders';

  private accessToken: string | null = null;

  constructor(private http: HttpClient) {}

  obtenerToken(): Observable<TokenResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = new URLSearchParams({
      'grant_type': 'client_credentials',
      'client_id': this.clientId,
      'client_secret': this.clientSecret
    }).toString();

    return this.http.post<TokenResponse>(this.tokenUrl, body, { headers })
    .pipe( tap(response => { 
      this.setAccessToken(response.access_token); 
    }), 
    catchError((error) => { 
      return throwError(() => new Error(error.message || 
        'Server error')); 
      }) 
    );
  }

   
  obtenerIataCode(cityName:string):Observable<any>{
    return this.obtenerToken().pipe(
      switchMap(Response =>{
        this.accessToken = Response.access_token;
        const headers = new HttpHeaders({'Authorization':`Bearer ${this.accessToken}`});
        let url = `${this.citySearchUrl}?keyword=${cityName}`;
        return this.http.get(url,{headers});
      }),
      catchError((error)=>{
        return throwError(()=> new Error(error.message || 'Error del serivodr'));
      })
    );   
  }

  obtenerHotelesPorCiudad(iataCode:string):Observable<any>{
    if (!this.accessToken){
      throw new Error('No existe el token');
    }

    const headers = new HttpHeaders({
      'Authorization':`Bearer ${this.accessToken}`
    });

    const url = `${this.hotelListUrl}?cityCode=${iataCode}`;
    return this.http.get(url, {headers}).pipe(
      catchError((error) =>{
        return throwError(()=>new Error(error.message || 'Error del servidor'));
    })
    );
  }

  obtenerHoteles(hotelId: string, checkInDate: string, 
    checkOutDate: string, adults: number,
     rooms: number): Observable<any> { 
      if (!this.accessToken) { 
        throw new Error('Access token is not set'); 
      } 
      const headers = new HttpHeaders({ 
        'Authorization': `Bearer ${this.accessToken}` 
      }); 
      const url = `${this.hotelSearchUrl}?hotelIds=${hotelId}&adults=${adults}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&roomQuantity=${rooms}`; 
      return this.http.get(url, { headers }).pipe( catchError((error) => { 
        return throwError(() => new Error(error.message || 'Server error')); 
      }) 
    ); 
  }

  //no implementado
  reservarHotel(){
  }

  setAccessToken(token: string) {
    this.accessToken = token;
  }
}

