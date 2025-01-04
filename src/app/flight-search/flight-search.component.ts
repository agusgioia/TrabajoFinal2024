import { Component, OnInit } from '@angular/core';
import { FlightService } from '../services/flight.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlightOffer } from '../vuelo.interface';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { SharedService } from '../shared/shared.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-flight-search',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule,ToastModule,CardModule,ButtonModule],
  templateUrl: './flight-search.component.html',
  styleUrl: './flight-search.component.css'
})
export class FlightSearchComponent implements OnInit{

  flightForm!: FormGroup; 
  flights: FlightOffer[]=[]; 
  
  constructor(private fb: FormBuilder, 
    private flightService: FlightService,
    private sharedService:SharedService,
    private messageService:MessageService) {} 
  
  ngOnInit(): void { 
    this.flightForm = this.fb.group({ 
      origin: ['', Validators.required], 
      destination: ['', Validators.required], 
      departureDate: ['', [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]], 
      returnDate: ['',[Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)] ], 
      adults: [1, [Validators.required, Validators.min(1)]] 
    }); 

  } 

  

  onSubmit(): void { 
    
    if (this.flightForm.valid) { 
      const formValue = this.flightForm.value;
      this.flightService.listarVuelos( formValue.origin, formValue.destination, formValue.departureDate, 
        formValue.returnDate, formValue.adults ).subscribe({ 
          next: (response) => { 
            this.flights = response.data; 
            console.log(this.flights); 
          }, 
          error: (err) => { 
            console.error(err); 
          } 
      }); 
    } 
  } 
  
  onGuardar(vuelo:FlightOffer){
    const vueloSimplificado: FlightOffer = {
      id: vuelo.id,
      itineraries: Array.isArray(vuelo.itineraries)
        ? vuelo.itineraries.map((itinerary: any) => ({
            duration: itinerary.duration,
            segments: Array.isArray(itinerary.segments)
              ? itinerary.segments.map((segment: any) => ({
                  aircraft:{ 
                    code:segment.aircraft.code
                  },
                  departure: {
                    at: segment.departure?.at || "",
                    iataCode: segment.departure?.iataCode || "",
                  },
                  arrival: {
                    at: segment.arrival?.at || "",
                    iataCode: segment.arrival?.iataCode || "",
                  },
                  duration: segment.duration,
                  carrierCode: segment.carrierCode,
                  number: segment.number,
                }))
              : [],
          }))
        : [],
      price: {
        base: vuelo.price?.base || "",
        currency: vuelo.price?.currency || "",
        grandTotal: vuelo.price?.grandTotal || "",
      },
      pricingOptions: {
        fareType: vuelo.pricingOptions?.fareType || [],
      },
      travelerPricings: Array.isArray(vuelo.travelerPricings)
        ? vuelo.travelerPricings.map((traveler: any) => ({
            cabin: traveler.cabin || "",
            price: traveler.price
              ? {
                  base: traveler.price.base || "",
                  currency: traveler.price.currency || "",
                  total: traveler.price.total || "",
                }
              : { base: "", currency: "", total: "" },
          }))
        : [],
      validatingAirlineCodes: vuelo.validatingAirlineCodes || [],
      lastTicketingDate: vuelo.lastTicketingDate || "",
    };    
    this.sharedService.setFlightData(vueloSimplificado);
    this.messageService.add({severity:'success',summary:'Reservado',detail:'Vuelo guardado'});
    this.flightService.preciosVuelos(vuelo).subscribe((response)=> console.log(response));
  }
  
}
