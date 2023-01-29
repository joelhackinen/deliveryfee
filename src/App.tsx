import { useState } from "react";

import DeliveryForm from "./components/DeliveryForm";
import FeeModal from "./components/FeeModal";

import { Fee } from "./types";

const App = () => {
  const [fee, setFee] = useState<Fee>({} as Fee);

  return (
    <div className="container" style={{ maxWidth: 1080, padding: 60, minWidth: 300 }}>
      <h1 className="mb-4">Delivery fee calculator</h1>
      <DeliveryForm setFee={setFee} />
      <FeeModal fee={fee} hide={() => setFee({} as Fee)}/>
    </div>
  );
};

export default App;
