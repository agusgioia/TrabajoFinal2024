import { Component } from '@angular/core';
import { FlightService } from '../flight.service';

@Component({
  selector: 'app-flight-search',
  standalone: true,
  imports: [],
  templateUrl: './flight-search.component.html',
  styleUrl: './flight-search.component.css'
})
export class FlightSearchComponent {

    constructor (private flighService:FlightService){} 

    
}
