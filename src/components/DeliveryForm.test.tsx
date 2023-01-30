import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import DeliveryForm from "./DeliveryForm";
import userEvent from "@testing-library/user-event";

describe("Testing DeliveryForm", () => {
  const user = userEvent.setup();
  const setFee = jest.fn();
  let cart: HTMLElement;
  let distance: HTMLElement;
  let amount: HTMLElement;
  let date: HTMLElement;
  let time: HTMLElement;
  let submitButton: HTMLElement;

  describe("when form sending succeeds", () => {
    afterAll(() => {
      // TODO
    })
  })
/*
  beforeEach(async () => {
    setFee.mockReset();
    render(<DeliveryForm setFee={setFee} />);
    cart = screen.getByPlaceholderText("Cart Value");
    distance = screen.getByPlaceholderText("Delivery Distance");
    amount = screen.getByPlaceholderText("Amount of items");
    date = screen.getByPlaceholderText("Delivery date");
    time = screen.getByPlaceholderText("Delivery time (UTC)");
    submitButton = screen.getByText("Calculate");
  });
*/


  test("calls onSubmit with valid inputs and gets it right", async () => {
    await user.type(cart, "1.5");
    await user.type(distance, "1001");
    await user.type(amount, "4");
    await user.type(date, "2023-06-25");
    await user.type(time, "18:09");
    await user.click(submitButton);

    expect(setFee).toBeCalledTimes(1);

    expect(setFee.mock.calls[0][0]).toEqual({
      cart: 1.5,
      totalFee: 11.5,
      distanceFee: 1,
      itemFee: 0,
      surcharge: 8.5,
      rushFee: 0,
      unlimitedFee: 11.5,
      limitedFlag: false
    });
  });

  test("doesn't call onSubmit with negative amount", async () => {
    await user.type(cart, "1.5");
    await user.type(distance, "1001");
    await user.type(amount, "-4");
    await user.type(date, "2023-06-25");
    await user.type(time, "18:09");
    await user.click(submitButton);

    expect(setFee).toBeCalledTimes(0);
  });

  test("only calls onSubmit when amount is a positive whole number", async () => {
    await user.type(cart, "1.5");
    await user.type(distance, "1001");
    await user.type(amount, "1.4");
    await user.type(date, "2023-01-27");
    await user.type(time, "18:09");
    await user.click(submitButton);

    expect(setFee).toBeCalledTimes(0);

    await user.clear(amount);
    await user.type(amount, "-1");
    await user.click(submitButton);

    expect(setFee).toBeCalledTimes(0);

    await user.clear(amount);
    await user.type(amount, "1");
    await user.click(submitButton);

    expect(setFee).toBeCalledTimes(1);
  });

  test("calculates the friday rush extra right", async () => {
    await user.type(cart, "10");
    await user.type(distance, "1000");
    await user.type(amount, "4");
    await user.type(date, "2023-01-27");
    await user.type(time, "17:09");
    await user.click(submitButton);

    expect(setFee).toBeCalledTimes(1);

    expect(setFee.mock.calls[0][0]).toEqual({
      cart: 10,
      totalFee: 2.4,
      distanceFee: 0,
      itemFee: 0,
      surcharge: 0,
      rushFee: 0.4,
      unlimitedFee: 2.4,
      limitedFlag: false
    });
  });
});