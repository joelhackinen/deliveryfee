import { FormEvent, useState } from "react";
import { Button, Form, FloatingLabel, Row, Col } from "react-bootstrap";

import { FormProps } from "../types";

const DeliveryForm = (props: FormProps) => {
  const [cart, setCart] = useState<string>("")
  const [distance, setDistance] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [day, setDay] = useState<number>(NaN);
  const [time, setTime] = useState<string>("");

  const fieldsOk = Number(cart) !== 0 && Number(distance) !== 0 && Number(amount) !== 0 && !isNaN(day) && time !== "";

  const submit = (event: FormEvent) => {
    event.preventDefault();
    props.calculateFee({
      cart: Number(cart),
      distance: Number(distance),
      amount: Number(amount),
      day,
      time
    });
    setCart("");
    setDistance("");
    setAmount("");
    setDay(NaN);
    setTime("");
  };

  return (
    <Form onSubmit={submit}>
      <FloatingLabel label="Cart Value" className="mb-3">
        <Form.Control type="number" value={cart} onChange={(event) => setCart(event.target.value)} placeholder="value"/>
      </FloatingLabel>
      <Form.Group as={Col}>
        <FloatingLabel label="Delivery Distance" className="mb-3">
          <Form.Control type="number" value={distance} onChange={(event) => setDistance(event.target.value)} placeholder="distance"/>
        </FloatingLabel>
      </Form.Group>
      <Row>
        <Form.Group as={Col}>
          <FloatingLabel label="Amount of items" className="mb-3">
            <Form.Control type="number" value={amount} onChange={(event) => setAmount(event.target.value)} placeholder="amount"/>
          </FloatingLabel>
        </Form.Group>
        <Form.Group as={Col}>
          <FloatingLabel label="Delivery date" >
            <Form.Control type="date" onChange={(event) => setDay(new Date(event.target.value).getUTCDay())}/>
          </FloatingLabel>
        </Form.Group>
        <Form.Group as={Col}>
          <FloatingLabel label="Delivery time (UTC)" >
            <Form.Control type="time" value={time} onChange={(event) => setTime(event.target.value)}/>
          </FloatingLabel>
        </Form.Group>
      </Row>
      <Button variant="primary" type="submit" disabled={!fieldsOk}>
        Calculate
      </Button>
    </Form>
  );
};

export default DeliveryForm;