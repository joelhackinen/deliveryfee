import { Container } from "react-bootstrap";

import DeliveryForm from "./components/DeliveryForm";


const App = () => {
  console.log("<App /> render");

  return (
    <Container id="main-container" style={{ maxWidth: 600, minWidth: 260, padding: 40 }}>
      <h1 className="mb-4">Delivery fee calculator</h1>
      <DeliveryForm />
    </Container>
  );
};

export default App;
