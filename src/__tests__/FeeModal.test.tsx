import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import FeeModal from "../components/FeeModal";
import { FREE_DELIVERY_THRESHOLD } from "../utils/constants";


const fee1 = {
  cart: 9,
  totalFee: 6,
  distanceFee: 2,
  itemFee: 1,
  surcharge: 1,
  rushFee: 0,
  unlimitedFee: 6,
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
  const user = userEvent.setup();

  beforeEach(() => {
    hide.mockReset();
    render(<FeeModal fee={fee1} hide={hide} />);
  });

  test(`shows the fee details when the cart value is under ${FREE_DELIVERY_THRESHOLD}€`, () => {
    const surchargeFee = screen.getByText("Small order surcharge");
    expect(surchargeFee).toBeInTheDocument();

    const feeAmount = screen.getByText("Fee amount");
    expect(feeAmount).toBeInTheDocument();

    const baseFee = screen.getByText("Base fee");
    expect(baseFee).toBeInTheDocument();
  });

  test(`shows the correct text when cart value is over ${FREE_DELIVERY_THRESHOLD}`, () => {
    render(<FeeModal fee={fee2} hide={hide} />);
    const element = screen.getByText(`No delivery fee because the cart value is ${FREE_DELIVERY_THRESHOLD}€ or more euros.`);
    expect(element).toBeInTheDocument();
  });

  test("can be closed", async () => {
    const b = screen.getByRole('button', { name: "Close" });
    await user.click(b);
    expect(hide).toBeCalledTimes(1);
  });
});