import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "../App";

describe("<App />", () => {
  test("renders its children", () => {
    render(<App />);
    const element = screen.getByText("Delivery Fee Calculator");
    expect(element).toBeInTheDocument();
  });
});