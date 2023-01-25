export interface Parameters {
  cart: number;
  distance: number;
  amount: number;
  day: number;
  time: string;
}

export interface FormProps {
  showFee: (props: Parameters) => void;
}

export interface FeeValues {
  totalFee: number;
  totalPrice: number;
  distanceFee: number;
  itemFee: number;
  surcharge: number;
  multiplier: number;
  limitedFee: number;
}


export type Fee = FeeValues;