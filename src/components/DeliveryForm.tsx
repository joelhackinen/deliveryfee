import { FormEvent, useState } from "react";
import { Button, Form, FloatingLabel, Row, Col } from "react-bootstrap";

export interface Parameters {
  cart: number;
  distance: number;
  amount: number;
  rushHour: boolean;
}

interface FormProps {
  calculateFee: (props: Parameters) => void;
}

const DeliveryForm = (props: FormProps) => {
  const [cart, setCart] = useState<string>("")
  const [distance, setDistance] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [rushHour, setRushHour] = useState<boolean>(false);

  const fieldsOk = cart !== "" && distance !== "" && amount !== "";

  const submit = (event: FormEvent) => {
    event.preventDefault();
    props.calculateFee({
      cart: Number(cart),
      distance: Number(distance),
      amount: Number(amount),
      rushHour
    });
    setCart("");
    setDistance("");
    setAmount("");
  };

  return (
    <Form onSubmit={submit}>
      <FloatingLabel label="Cart Value" className="mb-3">
        <Form.Control type="number" value={cart} onChange={(event) => setCart(event.target.value)} placeholder="value"/>
      </FloatingLabel>
      <Row>
        <Form.Group as={Col}>
          <FloatingLabel label="Delivery Distance" className="mb-3">
            <Form.Control type="number" value={distance} onChange={(event) => setDistance(event.target.value)} placeholder="distance"/>
          </FloatingLabel>
        </Form.Group>
        <Form.Group as={Col} className="mb-3">
          <Form.Range style={{ marginTop: 10 }} value={distance} min="1" max="15000" onChange={(event) => setDistance(event.target.value)}/>
        </Form.Group>
      </Row>
      <Row>
        <Form.Group as={Col}>
          <FloatingLabel label="Amount of items" className="mb-3">
            <Form.Control type="number" value={amount} onChange={(event) => setAmount(event.target.value)} placeholder="amount"/>
          </FloatingLabel>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Control type="date" />
          <Form.Group className="mb-3" >
            <Form.Check type="checkbox" label="Rush hour (3 PM - 7 PM) delivery?" onClick={() => setRushHour(!rushHour)}/>
          </Form.Group>
        </Form.Group>
      </Row>
      <Button variant="primary" type="submit" disabled={!fieldsOk}>
        Calculate
      </Button>
    </Form>
  );
};

export default DeliveryForm;