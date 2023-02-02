import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import FeeModal from "../components/FeeModal";
import { FREE_DELIVERY_THRESHOLD } from "../utils/constants";


const fee1 = {
  cart: 99,
  totalFee: 4,
  distanceFee: 2,
  itemFee: 0,
  surcharge: 0,
  rushFee: 0,
  unlimitedFee: 4,
  limitedFlag: false,
};

const fee2 = {
  cart: 100,
  totalFee: 4,
  distanceFee: 2,
  itemFee: 0,
  surcharge: 0,
  rushFee: 0,
  unlimitedFee: 4,
  limitedFlag: false,
};

describe("<FeeModal />", () => {
  const hide = jest.fn();
  let container: HTMLElement;

  beforeEach(() => {
    const result = render(<FeeModal fee={fee1} hide={hide} />);
    container = result.container;
  });

  test(`shows the fee details when the cart value is under ${FREE_DELIVERY_THRESHOLD}€`, () => {
    const feeAmount = screen.getByText("Fee amount");
    expect(feeAmount).toBeInTheDocument();

    const baseFee = screen.getByText("Base fee");
    expect(baseFee).toBeInTheDocument();
  });

  test(`show the correct text when cart value is over ${FREE_DELIVERY_THRESHOLD}`, () => {
    render(<FeeModal fee={fee2} hide={hide} />);
    const element = screen.getByText(`No delivery fee because the cart value is ${FREE_DELIVERY_THRESHOLD}€ or more euros.`);
    expect(element).toBeInTheDocument();
  });
});