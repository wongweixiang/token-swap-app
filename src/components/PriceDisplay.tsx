import { bigDecimal } from "js-big-decimal"; // using big decimal to avoid floating point math errors
import type { FC } from "react";

type PriceDisplayProps = {
  price: string | undefined;
  amount: string;
};

export const PriceDisplay: FC<PriceDisplayProps> = ({ amount, price }) => {
  return (
    <span className="mt-2">
      {bigDecimal.round(bigDecimal.multiply(price, amount), 2)}
      USD
    </span>
  );
};
