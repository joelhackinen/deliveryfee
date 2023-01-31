import { Container } from "react-bootstrap";

import Calculator from "./components/Calculator";


const App = () => {
  console.log("<App /> render");

  return (
    <Container id="main-container" style={{ maxWidth: 600 }}>
      <Calculator />
    </Container>
  );
};

export default App;
