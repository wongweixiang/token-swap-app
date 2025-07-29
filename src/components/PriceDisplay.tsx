import type { FC } from "react";
import { bigDecimal } from "js-big-decimal"; // using big decimal to avoid floating point math errors
import { Skeleton } from "@/components/ui/skeleton";

type PriceDisplayProps = {
  price: string | undefined;
  amount: string;
  isLoading: boolean;
};

export const PriceDisplay: FC<PriceDisplayProps> = ({
  amount,
  price,
  isLoading,
}) => {
  return (
    <span className="mt-2 flex items-center gap-2">
      {isLoading ? (
        <Skeleton className="h-4 w-8" />
      ) : (
        bigDecimal.round(bigDecimal.multiply(price, amount), 2)
      )}
      USD
    </span>
  );
};
