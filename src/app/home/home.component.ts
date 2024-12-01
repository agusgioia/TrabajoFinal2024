import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FlightSearchComponent } from "../flight-search/flight-search.component";
import { HotelSearchComponent } from "../hotel-search/hotel-search.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, FlightSearchComponent, HotelSearchComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  
 
}
