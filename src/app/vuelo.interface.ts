export interface FlightOffer {
  id: string;
  itineraries: SimplifiedItinerary[];
  price: SimplifiedPrice;
  pricingOptions: SimplifiedPricingOptions;
  travelerPricings: SimplifiedTravelerPricing[];
  validatingAirlineCodes: string[];
  lastTicketingDate: string;
}

export interface SimplifiedItinerary {
  duration: string;
  segments: SimplifiedSegment[];
}

export interface SimplifiedSegment {
  aircraft: AircraftCode; 
  departure: SimplifiedLocationInfo;
  arrival: SimplifiedLocationInfo;
  duration: string;
  carrierCode: string;
  number: string; 
}
export interface AircraftCode{
  code:string;
}

export interface SimplifiedLocationInfo {
  at: string; 
  iataCode: string; 
}

export interface SimplifiedPrice {
  base: string;
  currency: string;
  grandTotal: string;
}

export interface SimplifiedPricingOptions {
  fareType: string[];
}

export interface SimplifiedTravelerPricing {
  price: SimplifiedTravelerPrice;
  fareDetailsBySegment:FareDetails[]; 
}

export interface FareDetails{ 
  amenities:AmenitiesDetails[];
  cabin:string;
}

export interface AmenitiesDetails{ 
  description:string;
  amenityType:string;
  isChargeable:boolean;
}

export interface SimplifiedTravelerPrice {
  base: string;
  currency: string;
  total: string;
}
