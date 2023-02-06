import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Calculator from "../components/Calculator";
import userEvent from "@testing-library/user-event";

describe("<Calculator />", () => {
  const user = userEvent.setup();
  let cart: HTMLElement;
  let distance: HTMLElement;
  let amount: HTMLElement;
  let date: HTMLElement;
  let time: HTMLElement;
  let submitButton: HTMLElement;
  let container: HTMLElement;

  const getFields = () => {
    cart = screen.getByPlaceholderText("Cart Value");
    distance = screen.getByPlaceholderText("Delivery Distance");
    amount = screen.getByPlaceholderText("Amount of items");
    date = screen.getByPlaceholderText("Delivery date");
    time = screen.getByPlaceholderText("Delivery time");
    submitButton = screen.getByText("Calculate");
  };

  beforeEach(() => {
    const view = render(<Calculator />);
    container = view.container;
    cart = screen.getByPlaceholderText("Cart Value");
    distance = screen.getByPlaceholderText("Delivery Distance");
    amount = screen.getByPlaceholderText("Amount of items");
    date = screen.getByPlaceholderText("Delivery date");
    time = screen.getByPlaceholderText("Delivery time");
    submitButton = screen.getByText("Calculate");
  });

  test("is rendered", () => {
    const element = screen.queryByText("Delivery Fee Calculator");
    expect(element).not.toBeNull();
  });

  test("renders the form", () => {
    const field = screen.queryByText("Cart Value (€)");
    const submit = container.querySelector("#submit-button");
    expect(field).not.toBeNull();
    expect(submit).not.toBeNull();
  });

  test("renders the modal and its closeable", async () => {
    await user.type(cart, "11");
    await user.type(distance, "1499");
    await user.type(amount, "4");
    await user.type(date, "2023-06-24");
    await user.type(time, "14:12");
    expect(submitButton).not.toBeDisabled();

    await user.click(submitButton);
    const modal = screen.getByRole("dialog");

    expect(modal).toBeInTheDocument();
    expect(modal).toHaveTextContent("Delivery fee: 3 €");

    const closeButton = screen.getByRole("button", { name: "Close" });
    await user.click(closeButton);
    
    expect(modal).not.toBeInTheDocument();
  });
});