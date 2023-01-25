import { useState } from "react";

import DeliveryForm from "./components/DeliveryForm";

import { Parameters } from "./types";

import { calculateFee } from "./utils/helper";

const App = () => {
  const [fee, setFee] = useState<number>(NaN);

  const displayFee = (params: Parameters): void => {
    setFee(calculateFee(params));
  };


  return (
    <div className="container" style={{ maxWidth: 1080, padding: 60, minWidth: 300 }}>
      <h1 className="mb-4">Delivery fee calculator</h1>
      <DeliveryForm showFee={displayFee} />
      <div>
        {isNaN(fee)
          ? null
          : fee
        }
      </div>
    </div>
  );
};

export default App;
