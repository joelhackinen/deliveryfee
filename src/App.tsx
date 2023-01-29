import { useState } from "react";
import { Container } from "react-bootstrap";

import DeliveryForm from "./components/DeliveryForm";
import FeeModal from "./components/FeeModal";

import { Fee } from "./types";

const App = () => {
  const [fee, setFee] = useState<Fee>({} as Fee);

  return (
    <Container id="main-container" style={{ maxWidth: 600, minWidth: 260, padding: 40 }}>
      <h1 className="mb-4">Delivery fee calculator</h1>
      <DeliveryForm setFee={setFee} />
      <FeeModal fee={fee} hide={() => setFee({} as Fee)}/>
    </Container>
  );
};

export default App;
