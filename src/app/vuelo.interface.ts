export interface FlightOffer {
  id: string;
  instantTicketingRequired: boolean;
  isUpsellOffer: boolean;
  itineraries: Itinerary[];
  lastTicketingDate: string;
  lastTicketingDateTime: string;
  nonHomogeneous: boolean;
  numberOfBookableSeats: number;
  oneWay: boolean;
  price: Price;
  pricingOptions: PricingOptions;
  source: string;
  travelerPricings: TravelerPricing[];
  type: string;
  validatingAirlineCodes: string[];
}

export interface Itinerary {
  duration: string;
  segments: Segment[];
}

export interface Segment {
  aircraft: Aircraft;
  arrival: LocationInfo;
  blacklistedInEU: boolean;
  carrierCode: string;
  departure: LocationInfo;
  duration: string;
  id: string;
  number: string;
  numberOfStops: number;
  operating: OperatingCarrier;
}

export interface Aircraft {
  code: string;
}

export interface LocationInfo {
  at: string;
  iataCode: string;
  terminal: string;
}

export interface OperatingCarrier {
  carrierCode: string;
}

export interface Price {
  additionalServices: AdditionalService[];
  base: string;
  currency: string;
  fees: Fee[];
  grandTotal: string;
  total: string;
}

export interface AdditionalService {
  amount: string;
  type: string;
}

export interface Fee {
  amount: string;
  type: string;
}

export interface PricingOptions {
  fareType: string[];
  includedCheckedBagsOnly: boolean;
}

export interface TravelerPricing {
  fareDetailsBySegment: FareDetail[];
  fareOption: string;
  price: TravelerPrice;
  travelerId: string;
  travelerType: string;
}

export interface FareDetail {
  cabin: string;
  class: string;
  fareBasis: string;
  includedCheckedBags: IncludedCheckedBags;
  segmentId: string;
  amenities: Amenity[];
}

export interface IncludedCheckedBags {
  quantity: number;
}

export interface Amenity {
  amenityProvider: AmenityProvider;
  amenityType: string;
  description: string;
  isChargeable: boolean;
}

export interface AmenityProvider {
  name: string;
}

export interface TravelerPrice {
  base: string;
  currency: string;
  total: string;
}
