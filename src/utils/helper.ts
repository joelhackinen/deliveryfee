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


  // items 1-4  --> +0€
  //       5-*  --> +0.5€
  //       13-* --> +1.2€
  const billableItems = Math.max(amount - 4, 0);
  const extraItems = Math.max(billableItems - 8, 0);
  const itemFee = billableItems * 0.5 + extraItems * 1.2;

  // the difference between the cart value and 10€ if the cart value is less than 10€
  const surcharge = cart < SURCHARGE_THRESHOLD
    ? SURCHARGE_THRESHOLD - cart
    : 0;

  // 20% extra fee if the delivery is on friday 15:00 - 18:59
  const rushFee = day === 5 && (hour >= 15 && hour <= 18)
    ? (BASE_FEE + surcharge + distanceFee + itemFee) * 0.2
    : 0;

  // the fee without any limitations
  const unlimitedFee = BASE_FEE + surcharge + distanceFee + itemFee + rushFee;

  // the fee limited to 15€
  const limitedFee = Math.min(15, unlimitedFee);

  const limitedFlag = unlimitedFee > MAX_FEE;

  // no fee if cart value is more than 100€
  const totalFee = cart >= FREE_DELIVERY_THRESHOLD ? 0 : limitedFee;

  // rounded due to floating point inaccuracy
  const feeObj: Fee = {
    cart: roundToTwoDecimals(cart),
    totalFee: roundToTwoDecimals(totalFee),
    distanceFee: roundToTwoDecimals(distanceFee),
    itemFee: roundToTwoDecimals(itemFee),
    surcharge: roundToTwoDecimals(surcharge),
    rushFee: roundToTwoDecimals(rushFee),
    unlimitedFee: roundToTwoDecimals(unlimitedFee),
    limitedFlag
  };

  if ((Object.values(feeObj).slice(0, 7)).some(x => isNaN(Number(x)))) throw new Error("");

  return feeObj;
};


export const isEmptyFeeObject = (obj: Fee): boolean => {
  for (const _ in obj) return false;
  return true;
};

export const roundToTwoDecimals = (num: number): number => {
  return Math.round((num + Number.EPSILON) * 100) / 100;
};