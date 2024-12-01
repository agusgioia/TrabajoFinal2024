interface segments{
    
}

interface Itinerary {
    duration:string;
    segments:segments;
  }
  
  interface Fees{
    amount:number;
    type:string;
  }

  interface Price {
    currency: string;
    total: string;
    base: string;
    fees: Fees;
    grandTotal: string;
  }
  
  interface PricingOptions {
    fareType: string[];
    includedCheckedBagsOnly: boolean;
  }
  
  export interface vuelo {
    id: string;
    itineraries: Itinerary[];
    price: Price;
    pricingOptions: PricingOptions;
  }
  