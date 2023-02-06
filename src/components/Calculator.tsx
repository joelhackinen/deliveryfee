import { useState } from "react";
import { Container } from "react-bootstrap";
import { Fee } from "../types";

import CalculatorForm from "./CalculatorForm";
import FeeModal from "./FeeModal";

const Calculator = () => {
  const [fee, setFee] = useState<Fee | undefined>(undefined);

  const showModal = (fee: Fee) => setFee(fee);
  const hideModal = () => setFee(undefined);

  return (
    <Container>
      <CalculatorForm showModal={showModal} />
      <FeeModal fee={fee} hide={hideModal} />
    </Container>
  );
};

export default Calculator;