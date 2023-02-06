import { Parameters, Fee } from "../types";

import {
  BASE_FEE,
  FREE_DELIVERY_THRESHOLD,
  MAX_FEE,
  SURCHARGE_THRESHOLD
} from "./constants";

export const calculateFee = (params: Parameters): Fee => {
  const { cart, distance, amount, day, time } = params;
  const hour = Number(time.split(":")[0]);

  // base fee covers the first 1000 meters
  const dist = distance - 1000;
  const distanceFee = dist > 0 ? Math.ceil(dist / 500) : 0;

  const billableItems = Math.max(amount - 4, 0);
  const extraItems = Math.max(billableItems - 8, 0);
  const itemFee = billableItems * 0.5 + extraItems * 1.2;

  // the difference between the cart value and 10€ if the cart value is less than 10€
  const surcharge = cart >= SURCHARGE_THRESHOLD ? 0 : SURCHARGE_THRESHOLD - cart;

  // the fee is multiplied by 1.2 if the delivery is on friday 15:00 - 18:59
  const rushFee = day === 5 && (hour >= 15 && hour <= 18)
    ? (BASE_FEE + surcharge + distanceFee + itemFee) * 0.2
    : 0;

  const unlimitedFee = BASE_FEE + surcharge + distanceFee + itemFee + rushFee;

  // the fee cannot be more than 15€
  const limitedFee = unlimitedFee > MAX_FEE ? MAX_FEE : unlimitedFee;

  const limitedFlag = unlimitedFee > MAX_FEE ? true : false;

  // no fee if cart value is more than 100€
  const totalFee = cart >= FREE_DELIVERY_THRESHOLD ? 0 : limitedFee;

  return {
    cart,
    totalFee,
    distanceFee,
    itemFee,
    surcharge,
    rushFee,
    unlimitedFee,
    limitedFlag
  };
};


export const isEmptyFeeObject = (obj: Fee): boolean => {
  for (const _ in obj) return false;
  return true;
};

export const roundToTwoDecimals = (num: number): number => {
  return Math.round((num + Number.EPSILON) * 100) / 100;
};