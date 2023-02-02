import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";

describe("<App />", () => {
  let container: HTMLElement;

  beforeEach(() => {
    const result = render(<App />);
    container = result.container;
  });

  test("renders its children", () => {
    const element = screen.getByText("Delivery Fee Calculator");
    expect(element).toBeInTheDocument();
  });
});