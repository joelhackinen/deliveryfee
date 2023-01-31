import { useState } from "react";
import { Fee } from "../types";
import { Container } from "react-bootstrap";

import CalculatorForm from "./CalculatorForm";
import FeeModal from "./FeeModal";

const Calculator = () => {
  console.log("<Calculator /> render")
  const [fee, setFee] = useState<Fee>({} as Fee);

  const showModal = (fee: Fee) => setFee(fee);
  const hideModal = () => setFee({} as Fee);

  return (
    <Container>
      <CalculatorForm showModal={showModal} />
      <FeeModal fee={fee} hide={hideModal} />
    </Container>
  );
};

export default Calculator;