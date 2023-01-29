import { FormEvent, useState } from "react";

import { calculateFee } from "../utils/helper";

import {
  Button,
  Form,
  FloatingLabel,
  Row,
  Col
} from "react-bootstrap";

import { Fee } from "../types";

const DeliveryForm = ({ setFee }: { setFee: (fee: Fee) => void }) => {
  const [cart, setCart] = useState<string>("")
  const [distance, setDistance] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");

  const cartOk = cart !== "" && !isNaN(Number(cart)) && Number(cart) > 0;
  const distanceOk = distance != "" && !isNaN(Number(distance)) && Number(distance) > 0;
  const amountOk = amount !== "" && !isNaN(Number(amount)) && Number(amount) > 0 && Number(amount) % 1 === 0;
  const dateOk = date != "" && time != "";

  const fieldsOk = cartOk && distanceOk && amountOk && dateOk;

  const submit = (event: FormEvent) => {
    event.preventDefault();

    setFee(calculateFee({
      cart: Number(cart),
      distance: Number(distance),
      amount: Number(amount),
      day: new Date(date).getUTCDay(),
      time
    }));
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
          {cart !== "" && !cartOk && <Form.Text className="text-danger">Invalid input.</Form.Text>}
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
          {distance !== "" && !distanceOk && <Form.Text className="text-danger">Invalid input.</Form.Text>}
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
            {amount !== "" && !amountOk && <Form.Text className="text-danger">Invalid input.</Form.Text>}
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