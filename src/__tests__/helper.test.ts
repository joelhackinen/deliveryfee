import { calculateFee } from "../utils/helper";
import { Parameters } from "../types";


describe("Testing calculateFee()", () => {
  test("with values before border-cases", () => {
    const params1: Parameters = {
      cart: 9.9,
      distance: 999,
      amount: 4,
      day: 5,
      time: "14:59"
    };
    expect(calculateFee(params1)).toEqual({
      cart: 9.9,
      totalFee: 2.1,
      distanceFee: 0,
      itemFee: 0,
      surcharge: 0.1,
      rushFee: 0,
      unlimitedFee: 2.1,
      limitedFlag: false
    });
  });

  test("with border-case values", () => {
    const params2: Parameters = {
      cart: 10,
      distance: 1000,
      amount: 5,
      day: 5,
      time: "15:00"
    };
    expect(calculateFee(params2)).toEqual({
      cart: 10,
      totalFee: 3.0,
      distanceFee: 0,
      itemFee: 0.5,
      surcharge: 0,
      rushFee: 0.5,
      unlimitedFee: 3.0,
      limitedFlag: false
    });
  });

  test("with values after border-case", () => {
    const params3: Parameters = {
      cart: 66,
      distance: 1001,
      amount: 12,
      day: 5,
      time: "19:00"
    };
    expect(calculateFee(params3)).toEqual({
      cart: 66,
      totalFee: 7,
      distanceFee: 1,
      itemFee: 4,
      surcharge: 0,
      rushFee: 0,
      unlimitedFee: 7,
      limitedFlag: false
    });
  });

  test("if free delivery works and fee limitations work", () => {
    const params3: Parameters = {
      cart: 100,
      distance: 7501,
      amount: 2,
      day: 2,
      time: "12:33"
    };
    expect(calculateFee(params3)).toEqual({
      cart: 100,
      totalFee: 0,
      distanceFee: 14,
      itemFee: 0,
      surcharge: 0,
      rushFee: 0,
      unlimitedFee: 16,
      limitedFlag: true
    });
  });
});
