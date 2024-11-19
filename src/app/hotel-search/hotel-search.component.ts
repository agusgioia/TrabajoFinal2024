import { Component } from '@angular/core';
import { HotelListService } from '../hotel-list.service';
import { Observer } from 'rxjs';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hotel-search',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './hotel-search.component.html',
  styleUrl: './hotel-search.component.css'
})
export class HotelSearchComponent {

  cityName: string = ''; 
  iataCode: string | null = null; 
  checkInDate: string = ''; 
  checkOutDate: string = ''; 
  adults: number = 1; 
  rooms: number = 1; 
  hotels: any[] = [];

  constructor(private hotelList: HotelListService) {}

  buscarIataCode(): void {
    const observer: Observer<any> = {
      next: (response) => {
        const cityData = response.data[0];
        this.iataCode = cityData.iataCode;
        console.log(this.iataCode);
        this.buscarHoteles();
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

  buscarHoteles(): void { 
    if (!this.iataCode) return; 
    this.hotelList.obtenerHoteles(this.iataCode, this.checkInDate, 
      this.checkOutDate, this.adults, this.rooms).subscribe({ 
        next: (response) => { 
          this.hotels = response.data; 
          console.log(this.hotels); 
        }, 
        error: (err) => { 
          console.error(err); 
        }, complete: () => { 
          console.log('Hotel search complete'); 
        } 
      }); 
    }
}
