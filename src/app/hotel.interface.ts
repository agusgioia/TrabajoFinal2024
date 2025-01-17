export interface HotelArray{
  data: HotelOffer[];
}

export interface HotelOffer {
  hotel:HotelDetails;
  available: boolean;
  offers: Offer[];
}

export interface HotelDetails{
  name: string;
  hotelId:string;
  cityCode: string;
  latitude: number;
  longitude: number;
}

export interface Offer{
  checkInDate:string;
  checkOutDate:string;
  room:RoomDetails;
  guests:NumberAdults;
  price:priceOptions;
  policies:Policies;
}

export interface RoomDetails{
  type:string;
  typeEstimated:TypeEstimated;
  description:RoomDescription;
}

export interface TypeEstimated{
  beds:number;
  bedType:string;
  category:string;
}

export interface RoomDescription{
  text:string;
  lang:string;
}

export interface NumberAdults{
  adults:number;
}

export interface priceOptions{
  currency:string;
  base:string;
  total:string;
  variations:Variations;
}

export interface Variations{
  average:Average;
  changes:Changes[];
}

export interface Average{
  base:string;
}

export interface Changes{
  startDate:string;
  endDate:string;
  base:string;
}

export interface Policies{
  cancellations:Cancellations[];
  paymentType:string;

  guarantee:Guarantee | null;
}

export interface Guarantee{
  acceptedPayments:PaymentType | null;
}

export interface PaymentType{
  creditCardPolicies:CardPolicies[] | null;
  creditCards:string[] | null;
  methods:string[] | null;
}

export interface CardPolicies{
  vendorCode:string | null;
}

export interface Cancellations{
  description:CancellationDescription | null;
  type:string | null;
  amount:string | null;
  deadline:string |null;
  numberOfNights:number | null;
}

export interface CancellationDescription{
  text:string | null;
}