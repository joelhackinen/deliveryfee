import { FormEvent, useState } from "react";
import { useField } from "../hooks";

export interface Parameters {
  cart: number;
  distance: number;
  amount: number;
  rushHour: boolean;
}

interface FormProps {
  calculateFee: (props: Parameters) => void;
}

const DeliveryForm = (props: FormProps) => {
  const { reset: resetCart, hasValue: cartHasValue, ...cart } = useField("number");
  const { reset: resetDistance, hasValue: distanceHasValue, ...distance } = useField("number");
  const { reset: resetAmount, hasValue: amountHasValue, ...amount } = useField("number");
  const [ rushHour, setRushHour ] = useState<boolean>(false);

  const fieldsOk = cartHasValue() && distanceHasValue() && amountHasValue();

  const submit = (event: FormEvent) => {
    event.preventDefault();
    props.calculateFee({
      cart: Number(cart.value),
      distance: Number(distance.value),
      amount: Number(amount.value),
      rushHour
    });
    resetCart();
    resetDistance();
    resetAmount();
  };

  return (
    <div>
      <form onSubmit={submit}>
        <input { ...cart } />
        <input { ...distance } />
        <input { ...amount } />
        <button type="submit" disabled={!fieldsOk}>
          Calculate delivery price
        </button>
        <div>
          <input type="checkbox" onClick={() => setRushHour(!rushHour)}/>
          <label>Rush hour delivery</label>
        </div>
      </form>
    </div>
  );
};

export default DeliveryForm;