import { Container } from "react-bootstrap";

import DeliveryForm from "./components/DeliveryForm";


const App = () => {
  console.log("<App /> render");

  return (
    <Container id="main-container" style={{ maxWidth: 600 }}>
      <DeliveryForm />
    </Container>
  );
};

export default App;
