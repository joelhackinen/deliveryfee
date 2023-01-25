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