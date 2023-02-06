import { FormEvent, useState } from "react";

import {
  Button,
  Form,
  FloatingLabel,
  Row,
  Col,
  Container,
  Card
} from "react-bootstrap";

import { calculateFee } from "../utils/helper";

import { Fee, FormProps } from "../types";


const CalculatorForm = ({ showModal }: FormProps) => {
  const [cart, setCart] = useState<string>("");
  const [distance, setDistance] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");

  const cartOk = cart !== "" && !isNaN(Number(cart)) && Number(cart) > 0;
  const distanceOk = distance !== "" && !isNaN(Number(distance)) && Number(distance) > 0 && Number(distance) % 1 === 0;
  const amountOk = amount !== "" && !isNaN(Number(amount)) && Number(amount) > 0 && Number(amount) % 1 === 0;
  const dateOk = date !== "" && time !== "";

  const fieldsOk = cartOk && distanceOk && amountOk && dateOk;

  const submit = (event: FormEvent) => {
    event.preventDefault();

    let fee: Fee;

    try {
      fee = calculateFee({
        cart: Number(cart),
        distance: Number(distance),
        amount: Number(amount),
        day: new Date(date).getUTCDay(),
        time
      });
    } catch (e) {
      return;
    }
    showModal(fee);
  };

  const resetFields = () => {
    setCart("");
    setDistance("");
    setAmount("");
    setDate("");
    setTime("");
  };


  return (
    <Container className="mt-3">
      <Card className="shadow-lg">
        <Card.Title as="h3" className="text-center" style={{marginTop: 15}}>
          Delivery Fee Calculator
        </Card.Title>
        <Card.Body>
          <Form onSubmit={submit} id="delivery-form">
            <Form.Group className="mb-3">
              <FloatingLabel label="Cart Value (€)">
                <Form.Control
                  type="text"
                  value={cart}
                  onChange={({ target }) => setCart(target.value)}
                  placeholder="Cart Value"
                />
                {cart !== "" && !cartOk && <Form.Text className="text-danger">Invalid input.</Form.Text>}
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3">
              <FloatingLabel label="Delivery Distance (m)">
                <Form.Control
                  type="text"
                  value={distance}
                  onChange={({ target }) => setDistance(target.value)}
                  placeholder="Delivery Distance"
                />
                {distance !== "" && !distanceOk && <Form.Text className="text-danger">Invalid input.</Form.Text>}
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3">
              <FloatingLabel label="Amount of items">
                <Form.Control
                  type="text"
                  value={amount}
                  onChange={({ target }) => setAmount(target.value)}
                  placeholder="Amount of items"
                />
                {amount !== "" && !amountOk && <Form.Text className="text-danger">Invalid input.</Form.Text>}
              </FloatingLabel>
            </Form.Group>
            <Row>
              <Form.Group as={Col} className="mb-3">
                <FloatingLabel label="Delivery date" >
                  <Form.Control
                    type="date"
                    value={date}
                    onChange={({ target }) => setDate(target.value)}
                    placeholder="Delivery date"
                  />
                </FloatingLabel>
              </Form.Group>
              <Form.Group as={Col} className="mb-3">
                <FloatingLabel label="Delivery time" >
                  <Form.Control
                    type="time"
                    value={time}
                    onChange={({ target }) => setTime(target.value)}
                    placeholder="Delivery time"
                  />
                </FloatingLabel>
              </Form.Group>
            </Row>
            <Button variant="primary" type="submit" disabled={!fieldsOk} style={{ marginRight: 10 }} id="submit-button">
              Calculate
            </Button>
            <Button variant="outline-danger" onClick={resetFields} id="reset-button">
              Reset
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CalculatorForm;