import { Component } from '@angular/core';
import { HotelListService } from '../services/hotel-list.service';
import {  FormBuilder,FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { Cancellations, Changes, HotelArray, HotelOffer, Offer, CardPolicies } from '../hotel.interface';
import { ButtonModule } from 'primeng/button';
import { SharedService } from '../shared/shared.service';
import { MessageService } from 'primeng/api';
import { concatMap, from, tap, throwError } from 'rxjs';

interface HotelLi{
  hotelId:string;
  name:string;
  iataCode:string;
  lastUpdate:string;
}

interface Data{
  iataCode:string;
}

@Component({
  selector: 'app-hotel-search',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule,ToastModule,CardModule,ButtonModule],
  templateUrl: './hotel-search.component.html',
  styleUrl: './hotel-search.component.css'
})
export class HotelSearchComponent {

  cityName!:string;
  hotelForm!:FormGroup;
  hotels:HotelLi[] = [];
  hotelsOffers: HotelArray[]=[];
  dateErrorMessage:string|null=null;
  

  constructor(
    private hotelList: HotelListService,
    private sharedService:SharedService,
    private fb:FormBuilder,
    private messageService:MessageService) {}

  
 
  ngOnInit():void{
    this.hotelForm = this.fb.group({
      cityName:['',Validators.required],
      checkInDate:['',[Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]],
      checkOutDate:['',[Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]],
      adults:['',[Validators.required, Validators.min(1)]],
      rooms: ['',[Validators.required, Validators.min(1)]]
    });
  }
  

    onSubmit() {
      if (this.hotelForm.valid) {
        const formValue = this.hotelForm.value;
        this.cityName = formValue.cityName;
    
        this.hotelList.obtenerIataCode(formValue.cityName).pipe(
          concatMap((Response) => {
            const cityData: Data = Response.data[0];
            const iataCode = cityData.iataCode;
            console.log(iataCode);
            return this.hotelList.obtenerHotelesPorCiudad(iataCode);
          }),
          concatMap((Response) => {
            this.hotels = Response.data;
            console.log(this.hotels);
    
            this.dateErrorMessage = null;
            const currentDate = new Date(Date.now());
    
            if (formValue.checkInDate < currentDate || formValue.checkOutDate < currentDate) {
              this.dateErrorMessage = 'Las fechas de check-in y check-out deben ser iguales o posteriores a la fecha actual.';
              return throwError(() => new Error(this.dateErrorMessage || 'Error de fechas'));
            }
            if (formValue.checkInDate > formValue.checkOutDate) {
              this.dateErrorMessage = 'La fecha de check-out debe ser posterior a la fecha de check-in.';
              return throwError(() => new Error(this.dateErrorMessage || 'Error de fechas'));
            }
    
            return from(this.hotels).pipe(
              concatMap((hotel) => 
                this.hotelList.obtenerHoteles(
                  hotel.hotelId, formValue.checkInDate, formValue.checkOutDate, formValue.adults, formValue.rooms
                )
              ),
              tap((Response) => this.hotelsOffers!.push(Response))
            );
          })
        ).subscribe({
          error: (err) => console.error(err),
          complete: () => console.log('Proceso de obtención de hoteles finalizado')
        });
      }
    }
    


  onGuardar(Alojamiento: HotelArray) {
    const alojamientoSimplificado: HotelArray = {
      data: Array.isArray(Alojamiento.data)
        ? Alojamiento.data.map((hotelOffer: HotelOffer) => ({
            available: hotelOffer.available,
            hotel: {
              name: hotelOffer.hotel?.name || '',
              hotelId: hotelOffer.hotel?.hotelId || '',
              cityCode: hotelOffer.hotel?.cityCode || '',
              latitude: hotelOffer.hotel?.latitude,
              longitude: hotelOffer.hotel?.longitude,
            },
            offers: Array.isArray(hotelOffer.offers)
              ? hotelOffer.offers.map((offer: Offer) => ({
                  checkInDate: offer?.checkInDate || '',
                  checkOutDate: offer?.checkOutDate || '',
                  room: {
                    type: offer.room?.type || '',
                    typeEstimated: offer.room?.typeEstimated || '',
                    description: offer.room?.description || '',
                  },
                  guests: {
                    adults: offer.guests?.adults || 0,
                  },
                  price: {
                    currency: offer.price?.currency || '',
                    base: offer.price?.base || '',
                    total: offer.price?.total || '',
                    variations: {
                      average: {
                        base: offer.price?.variations?.average?.base || '',
                      },
                      changes: Array.isArray(offer.price)
                      ? offer.price.map((Change:Changes)=>({
                        startDate:Change.startDate || '',
                        endDate:Change.endDate || '',
                        base:Change.base || ''
                      }))
                      : []
                    },
                  },
                  policies:{
                    cancellations: Array.isArray(offer.policies.cancellations) 
                    ?offer.policies.cancellations.map((cancellation:Cancellations)=>({
                      description:{
                        text:cancellation.description?.text || null
                      },
                      type:cancellation.type || null,
                      amount:cancellation.amount ||null,
                      deadline:cancellation.deadline ||null,
                      numberOfNights:cancellation.numberOfNights || null
                    }))
                    : [],
                    paymentType: offer.policies?.paymentType || '',
                    guarantee:{
                      acceptedPayments:{
                        creditCardPolicies:Array.isArray(offer.policies.guarantee?.acceptedPayments?.creditCardPolicies)
                        ?offer.policies.guarantee?.acceptedPayments?.creditCardPolicies.map((cardPolicies:CardPolicies)=>({
                          vendorCode:cardPolicies.vendorCode || '' ||null
                        }))
                        : [],
                        creditCards: Array.isArray(offer.policies.guarantee?.acceptedPayments?.creditCards)
                        ? offer.policies.guarantee?.acceptedPayments?.creditCards.map((card: string) => card || '')
                        : [],
                        methods:Array.isArray(offer.policies.guarantee?.acceptedPayments?.methods)
                        ?offer.policies.guarantee?.acceptedPayments?.methods.map((method:string)=>method || '')
                        : []
                      }
                    }
                  },
                }))
              : [],
          }))
        : [],
    };
  
    this.sharedService.setHotelData(alojamientoSimplificado);
    this.messageService.add({
      severity: 'success',
      summary: 'Reservado',
      detail: 'Alojamiento guardado',
    });
  }
  

}
