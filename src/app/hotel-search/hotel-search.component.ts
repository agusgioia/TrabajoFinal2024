import { Component } from '@angular/core';
import { HotelListService } from '../services/hotel-list.service';
import { Observer } from 'rxjs';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { HotelArray, HotelOffer } from '../hotel.interface';
import { ButtonModule } from 'primeng/button';
import { SharedService } from '../shared/shared.service';

interface HotelLi{
  hotelId:string;
  name:string;
  iataCode:string;
  lastUpdate:string;
}

@Component({
  selector: 'app-hotel-search',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule,ToastModule,CardModule,ButtonModule],
  templateUrl: './hotel-search.component.html',
  styleUrl: './hotel-search.component.css'
})
export class HotelSearchComponent {

  cityName: string = ''; 
  iataCode: string = ''; 
  checkInDate: string = ''; 
  checkOutDate: string = ''; 
  adults: number = 1; 
  rooms: number = 1; 
  hotels: HotelLi[] = [];
  id: string[] = [];
  hotelsOffers: HotelArray ={data:[]};
  dateErrorMessage:string|null=null;

  constructor(private hotelList: HotelListService,private sharedService:SharedService) {}

  buscarIataCode(): void {
    const observer: Observer<any> = {
      next: (response) => {
        const cityData = response.data[0];
        this.iataCode = cityData.iataCode;
        console.log(this.iataCode);
        this.hotelList.obtenerHotelesPorCiudad(this.iataCode).subscribe({
          next:(Response)=> {
            this.hotels=Response.data;
            console.log(this.hotels);
            let i = 0;
            this.dateErrorMessage = null; 
            const currentDate = new Date(Date.now()); // Asignar la fecha actual a currentDate 
            const checkIn = new Date(this.checkInDate);
             const checkOut = new Date(this.checkOutDate); 
             if (checkIn < currentDate || checkOut < currentDate) { 
              this.dateErrorMessage = 'Las fechas de check-in y check-out deben ser iguales o posteriores a la fecha actual.'; 
              return; 
            } 
            if (checkIn > checkOut) { 
              this.dateErrorMessage = 'La fecha de check-out debe ser posterior a la fecha de check-in.'; 
              return; 
            }
            this.hotels.forEach(hotel => {
              this.hotelList.obtenerHoteles(hotel.hotelId, this.checkInDate, 
                this.checkOutDate, this.adults, this.rooms).subscribe({
                  next:(Response)=>{
                      this.hotelsOffers=Response;
                      console.log(Response);
                  }
                })
              
            });
          },
          error:(err) => {
            console.error(err);
          },
          complete: () => { 
            console.log('Hotel list retrieve complete'); 
          }
        });
      },
      error: (err) => { 
        console.error(err); 
      }, 
      complete: () => { 
        console.log('IATA code retrieval complete'); 
      }
    }; 
    this.hotelList.obtenerIataCode(this.cityName).subscribe(observer);
  }

  onSubmit(Alojamiento:HotelOffer){
    this.sharedService.setAlojamiento(Alojamiento);
  }

}
