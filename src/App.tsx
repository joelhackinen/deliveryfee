import { useState } from "react";

import DeliveryForm from "./components/DeliveryForm";
import FeeModal from "./components/FeeModal";

import { Parameters, Fee } from "./types";

import { calculateFee } from "./utils/helper";

const App = () => {
  const [fee, setFee] = useState<Fee>({} as Fee);

  const displayFee = (params: Parameters): void => {
    setFee(calculateFee(params));
  };


  return (
    <div className="container" style={{ maxWidth: 1080, padding: 60, minWidth: 300 }}>
      <h1 className="mb-4">Delivery fee calculator</h1>
      <DeliveryForm showFee={displayFee} />
      <FeeModal fee={fee} hide={() => setFee({} as Fee)}/>
    </div>
  );
};

export default App;
