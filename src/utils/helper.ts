import { Parameters, Fee } from "../types";

export const calculateFee = (params: Parameters): Fee => {
  const { cart, distance, amount, day, time } = params;
  const hour = Number(time.split(":")[0]);

  // base fee which covers the first 1000 meters
  const baseFee = 2;
  let distanceFee = 0;
  let temp = distance - 1000;

  // for every 500 meters the fee increases by 1€
  while (temp > 0) {
    distanceFee += 1;
    temp -= 500;
  }

  let itemFee = 0;
  let items = amount;

  // 1 - 4 items: no fee
  // 5 - 12 items: 0.5€ fee
  // 13 or more items: 0.5€ fee + 1.2€ "bulk" fee
  while (items > 4) {
    if (items > 12) {
      itemFee += 1.2;
    }
    itemFee += 0.5;
    items -= 1;
  }

  // the difference between the cart value and 10€ if the cart value is less than 10€
  const surcharge = cart >= 10 ? 0 : 10 - cart;

  // the fee is multiplied by 1.2 if the delivery is on friday 15:00 - 18:59
  const rushFee = day === 5 && (hour >= 15 && hour <= 18)
    ? roundToTwo((baseFee + surcharge + distanceFee + itemFee) * 0.2)
    : 0;

  const basicFee = baseFee + surcharge + distanceFee + itemFee + rushFee;

  // the fee cannot be more than 15€
  const limitedFee = basicFee > 15 ? 15 : basicFee;

  const limitedFlag = basicFee > 15 ? true : false;

  // no fee if cart value is more than 100€
  const totalFee = cart >= 100 ? 0 : limitedFee;

  return {
    cart,
    totalFee,
    distanceFee,
    itemFee,
    surcharge,
    rushFee,
    limitedFlag
  };
};


// helper function to check if an object is empty ({})
// about empty object detection: https://stackoverflow.com/a/59787784
export const isEmpty = (obj: Fee) => {
  for (let _ in obj) return false;
  return true;
}

export const roundToTwo = (number: number) => {
  return Math.round((number + Number.EPSILON) * 100) / 100;
}