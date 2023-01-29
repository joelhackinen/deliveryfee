export interface Parameters {
  cart: number;
  distance: number;
  amount: number;
  day: number;
  time: string;
}

export interface FormProps {
  setFee: (fee: Fee) => void;
}

export interface Fee {
  cart: number;
  totalFee: number;
  distanceFee: number;
  itemFee: number;
  surcharge: number;
  rushFee: number;
  unlimitedFee: number;
  limitedFlag: boolean;
}