export interface HotelArray{
  data:HotelOffer[];
}

export interface HotelOffer {
    available: boolean;
    hotel: HotelDetails;
    offers: Offer[];
  }
  
  export interface HotelDetails {
    chainCode: string;
    cityCode: string;
    dupeId: string;
    hotelId: string;
    latitude: number;
    longitude: number;
    name: string;
    type: string;
  }
  
  export interface Offer {
    checkInDate: string;
    checkOutDate: string;
    guests: Guests;
    id: string;
    policies: Policies;
    paymentType: string;
    price: Price;
    rateCode: string;
    room: Room;
    self: string;
  }
  
  export interface Guests {
    adults: number;
  }
  
  export interface Policies {
    cancellations: Cancellation[];
  }
  
  export interface Cancellation {
    deadline: Description;
    amount: number;
  }
  
  export interface Description {
    text: string;
  }
  
  export interface Price {
    base: string;
    currency: string;
    total: string;
    variations: Variations;
  }
  
  export interface Variations {
    average: AveragePrice;
    changes: PriceChange[];
  }
  
  export interface AveragePrice {
    base: string;
  }
  
  export interface PriceChange {
    base: string;
    startDate: string;
    endDate: string;
  }
  
  export interface Room {
    description: Description;
    type: string;
    typeEstimated: TypeEstimated;
  }
  
  export interface TypeEstimated {
    bedType: string;
    beds: number;
  }
  