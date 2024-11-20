import { Component, OnInit } from '@angular/core';
import { FlightService } from '../flight.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-flight-search',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './flight-search.component.html',
  styleUrl: './flight-search.component.css'
})
export class FlightSearchComponent implements OnInit{

  flightForm!: FormGroup; 
  flights: any; 
  
  constructor(private fb: FormBuilder, private flightSearchService: FlightService) {} 
  
  ngOnInit(): void { 
    this.flightForm = this.fb.group({ 
      origin: ['', Validators.required], 
      destination: ['', Validators.required], 
      departureDate: ['', [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]], 
      returnDate: ['',[Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)] ], 
      adults: [1, [Validators.required, Validators.min(1)]] 
    }); 

  } 
  onSubmit(): void { 
    if (this.flightForm.valid) { 
      const formValue = this.flightForm.value; 
      const formattedDepartureDate = this.formatDate(formValue.departureDate); 
      const formattedReturnDate = this.formatDate(formValue.returnDate); 

      this.flightSearchService.listarVuelos( formValue.origin, formValue.destination, formattedDepartureDate, 
        formattedReturnDate, formValue.adults ).subscribe({ 
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
  
  private formatDate(date: string): string { 
    return date; 
  }


}
