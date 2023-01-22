/*import { FormEvent, useState } from "react";

const App = () => {
  const [cart, setCart] = useState<string>("");
  const [distance, setDistance] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  const calculatePrice = (event: FormEvent) => {
    event.preventDefault();
    if (isNaN(Number(cart)) || isNaN(Number(distance)) || isNaN(Number(amount))) {
      return;
    }
  };

  return (
    <div>
      <form onSubmit={calculatePrice}>
        <input type="text" value={cart} onChange={(event) => setCart(event.target.value)}/>
        <button type="submit">Calculate delivery price</button>
      </form>
    </div>
  );
};

export default App;*/

import { FormEvent, useState } from "react";

const App = () => {
  const [cart, setCart] = useState<string>("");
  const [distance, setDistance] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  const fieldsOk = !isNaN(Number(cart));

  const calculatePrice = (event: FormEvent) => {
    event.preventDefault();
    window.alert("button pressed");
  };

  return (
    <div>
      <form onSubmit={calculatePrice}>
        <input type="text" value={cart} onChange={(event) => setCart(event.target.value)}/>
        <input type="text" value={distance} onChange={(event) => setDistance(event.target.value)}/>
        <input type="text" value={amount} onChange={(event) => setAmount(event.target.value)}/>
        <button type="submit" disabled={!fieldsOk} >Calculate delivery price</button>
      </form>
    </div>
  );
};

export default App;
