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
  aircraft: AircraftCode; // Aircraft code
  departure: SimplifiedLocationInfo;
  arrival: SimplifiedLocationInfo;
  duration: string;
  carrierCode: string;
  number: string; // Flight number
}
export interface AircraftCode{
  code:string;
}

export interface SimplifiedLocationInfo {
  at: string; // Date and time
  iataCode: string; // Airport code
}

export interface SimplifiedPrice {
  base: string;
  currency: string;
  grandTotal: string;
}

export interface SimplifiedPricingOptions {
  fareType: string[]; // Types of fares available
}

export interface SimplifiedTravelerPricing {
  cabin: string; // Cabin class (e.g., Economy, Business)
  price: SimplifiedTravelerPrice;
}

export interface SimplifiedTravelerPrice {
  base: string;
  currency: string;
  total: string;
}
