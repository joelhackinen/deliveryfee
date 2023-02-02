import { Container } from "react-bootstrap";

import Calculator from "./components/Calculator";


const App = () => (
  <Container id="main-container" style={{ maxWidth: 600 }}>
    <Calculator />
  </Container>
);


export default App;
