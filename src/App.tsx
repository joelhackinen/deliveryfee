import { FormEvent, useState } from "react";
import { useField } from "./hooks";

const App = () => {
  const { reset: resetCart, hasValue: cartHasValue, ...cart } = useField("number");
  const { reset: resetDistance, hasValue: distanceHasValue, ...distance } = useField("number");
  const { reset: resetAmount, hasValue: amountHasValue, ...amount } = useField("number");
  const [ rushHour, setRushHour ] = useState<boolean>(false);

  console.log(rushHour);

  const fieldsOk = cartHasValue() && distanceHasValue() && amountHasValue();

  const calculatePrice = (event: FormEvent) => {
    event.preventDefault();
    window.alert("button pressed");
    resetCart();
    resetDistance();
    resetAmount();
  };

  // seuraavaks checkbox kysymään toimitusaikaa (rush hour?) ja joku kalenterihässäkkä.

  return (
    <div>
      <form onSubmit={calculatePrice}>
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

export default App;
