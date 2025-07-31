import { useSelectedTokens } from "@/SelectedTokensContext";
import { bigDecimal } from "js-big-decimal"; // using big decimal to avoid floating point math errors
import { useTokenPrice } from "./useTokenPrice";

export const usePriceMultiple = () => {
  const { fromToken, toToken } = useSelectedTokens();

  const { price: fromTokenPrice, isLoading: isFromPriceLoading } =
    useTokenPrice(fromToken?.symbol);

  const { price: toTokenPrice, isLoading: isToPriceLoading } = useTokenPrice(
    toToken?.symbol
  );

  const priceMultiple =
    fromTokenPrice &&
    toTokenPrice &&
    bigDecimal.divide(fromTokenPrice, toTokenPrice);

  const isLoading = isFromPriceLoading || isToPriceLoading;

  return { priceMultiple, fromTokenPrice, toTokenPrice, isLoading };
};
