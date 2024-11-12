import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HotelListService {

  private clientId = 'E9GAchBq91z1l1yhDlWGveZS20G3YzET';
  private clientSecret = '43UaxDJMKWSGcc0y';
  private tokenUrl: string = 'https://test.api.amadeus.com/v1/security/oauth2/token';
  private citySearchUrl: string = 'https://test.api.amadeus.com/v1/reference-data/locations/cities';
  private hotelListUrl: string = 'https://test.api.amadeus.com/v2/shopping/hotel-offers';

  private accessToken: string | null = null;
  constructor(private http: HttpClient) {}

  obtenerToken(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = new URLSearchParams({
      'grant_type': 'client_credentials',
      'client_id': this.clientId,
      'client_secret': this.clientSecret
    }).toString();

    return this.http.post(this.tokenUrl, body, { headers });
  }

  obtenerIATACiudad(nombreCiudad: string): Observable<any> {
    if (!this.accessToken) {
      throw new Error('Token de acceso no disponible');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.accessToken}`
    });

    const params = { 'keyword': nombreCiudad };

    return this.http.get(this.citySearchUrl, { headers, params });
  }

  obtenerHoteles(codigoIATA: string, fechaEntrada: string, fechaSalida: string, adultos: number, habitaciones: number): Observable<any> {
    if (!this.accessToken) {
      throw new Error('Token de acceso no disponible');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.accessToken}`
    });

    const params = {
      'cityCode': codigoIATA,
      'checkInDate': fechaEntrada,
      'checkOutDate': fechaSalida,
      'adults': adultos,
      'rooms': habitaciones
    };

    return this.http.get(this.hotelListUrl, { headers, params });
  }

  setAccessToken(token: string) {
    this.accessToken = token;
  }
}

