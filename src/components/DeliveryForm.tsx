import { FormEvent, useState } from "react";
import { Button, Form, FloatingLabel, Row, Col } from "react-bootstrap";

import { FormProps } from "../types";

const DeliveryForm = (props: FormProps) => {
  const [cart, setCart] = useState<string>("")
  const [distance, setDistance] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");

  const fieldsOk = Number(cart) !== 0 && Number(distance) !== 0 && Number(amount) !== 0 && date !== "" && time !== "";

  const submit = (event: FormEvent) => {
    event.preventDefault();
    props.showFee({
      cart: Number(cart),
      distance: Number(distance),
      amount: Number(amount),
      day: new Date(date).getUTCDay(),
      time
    });
  };

  const resetFields = () => {
    setCart("");
    setDistance("");
    setAmount("");
    setDate("");
    setTime("");
  };

  return (
    <Form onSubmit={submit}>
      <Form.Group>
        <FloatingLabel label="Cart Value" className="mb-3">
          <Form.Control
            type="number"
            value={cart}
            onChange={(event) => setCart(event.target.value)}
            placeholder="Cart Value"
          />
        </FloatingLabel>
      </Form.Group>
      <Form.Group>
        <FloatingLabel label="Delivery Distance" className="mb-3">
          <Form.Control
            type="number"
            value={distance}
            onChange={(event) => setDistance(event.target.value)}
            placeholder="Delivery Distance"
          />
        </FloatingLabel>
      </Form.Group>
      <Row className="mb-3">
        <Form.Group as={Col} className="mb-3" md>
          <FloatingLabel label="Amount of items">
            <Form.Control
              type="number"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              placeholder="Amount of items"
            />
          </FloatingLabel>
        </Form.Group>
        <Form.Group as={Col} className="mb-3" sm>
          <FloatingLabel label="Delivery date" >
            <Form.Control
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              placeholder="Delivery date"
            />
          </FloatingLabel>
        </Form.Group>
        <Form.Group as={Col} className="mb-3" sm>
          <FloatingLabel label="Delivery time (UTC)" >
            <Form.Control
              type="time"
              value={time}
              onChange={(event) => setTime(event.target.value)}
              placeholder="Delivery time (UTC)"
            />
          </FloatingLabel>
        </Form.Group>
      </Row>
      <Button variant="primary" type="submit" disabled={!fieldsOk} style={{ marginRight: 10 }}>
        Calculate
      </Button>
      <Button variant="outline-danger" onClick={resetFields}>
        Reset
      </Button>
    </Form>
  );
};

export default DeliveryForm;