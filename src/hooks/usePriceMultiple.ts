import { useEffect, useState } from "react";
import { useSelectedTokens } from "@/SelectedTokensContext";
import { getTokenPrice } from "@/services/getTokenPrice";
import { bigDecimal } from "js-big-decimal"; // using big decimal to avoid floating point math errors

export const usePriceMultiple = () => {
  const { fromToken, toToken } = useSelectedTokens();

  const [fromTokenPrice, setFromTokenPrice] = useState<string | undefined>(
    undefined
  );
  const [isFromPriceLoading, setIsFromPriceLoading] = useState(false);

  const [toTokenPrice, setToTokenPrice] = useState<string | undefined>(
    undefined
  );
  const [isToPriceLoading, setIsToPriceLoading] = useState(false);

  useEffect(() => {
    const getFromPrice = async () => {
      if (!fromToken) return;

      setIsFromPriceLoading(true);

      const fromPrice = await getTokenPrice({ symbol: fromToken?.symbol });

      setFromTokenPrice(fromPrice);
      setIsFromPriceLoading(false);
    };

    getFromPrice();
  }, [fromToken]);

  useEffect(() => {
    const getToPrice = async () => {
      if (!toToken) return;

      setIsToPriceLoading(true);

      const toPrice = await getTokenPrice({ symbol: toToken?.symbol });

      setToTokenPrice(toPrice);
      setIsToPriceLoading(false);
    };

    getToPrice();
  }, [toToken]);

  const priceMultiple =
    fromTokenPrice &&
    toTokenPrice &&
    bigDecimal.divide(fromTokenPrice, toTokenPrice);

  const isLoading = isFromPriceLoading || isToPriceLoading;

  return { priceMultiple, fromTokenPrice, toTokenPrice, isLoading };
};
