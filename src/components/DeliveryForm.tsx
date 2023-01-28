import { FormEvent, useState } from "react";

import {
  Button,
  Form,
  FloatingLabel,
  Row,
  Col,
  Alert
} from "react-bootstrap";

import { FormProps } from "../types";

const DeliveryForm = (props: FormProps) => {
  const [cart, setCart] = useState<string>("")
  const [distance, setDistance] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [errs, setErrors] = useState<string[]>([]);

  const fieldsFilled = cart !== "" && distance !== "" && amount !== "" && date !== "" && time !== "";

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const e = validateFields();
    if (e.length !== 0) {
      setErrors(e);
      return;
    }
    setErrors([]);
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

  const validateFields = (): string[] => {
    const errs: string[] = []
    if (isNaN(Number(cart)) || Number(cart) <= 0) {
      errs.push("Cart Value has to be a nonzero positive number.");
    }
    if (isNaN(Number(distance)) || Number(distance) <= 0) {
      errs.push("Distance has to be a nonzero positive number.");
    }
    if (isNaN(Number(amount)) || Number(amount) <= 0 || Number(amount) % 1 !== 0) {
      errs.push("Amount has to be a nonzero, positive whole number.");
    }
    if (date === "" || date.split("-").length !== 3) {
      errs.push("Missing or invalid delivery date.");
    }
    if (time === "" || time.split(":").length !== 2) {
      errs.push("Missing or invalid delivery time.");
    }
    return errs;
  }

  return (
    <div>
      {
        errs.length === 0
          ? null
          : <Alert variant="warning">{errs.join("\n")}</Alert>
      }
      <Form onSubmit={submit}>
        <Form.Group>
          <FloatingLabel label="Cart Value" className="mb-3">
            <Form.Control
              type="text"
              value={cart}
              onChange={(event) => setCart(event.target.value)}
              placeholder="Cart Value"
            />
          </FloatingLabel>
        </Form.Group>
        <Form.Group>
          <FloatingLabel label="Delivery Distance" className="mb-3">
            <Form.Control
              type="text"
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
                type="text"
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
        <Button variant="primary" type="submit" disabled={!fieldsFilled} style={{ marginRight: 10 }}>
          Calculate
        </Button>
        <Button variant="outline-danger" onClick={resetFields}>
          Reset
        </Button>
      </Form>
    </div>
  );
};

export default DeliveryForm;