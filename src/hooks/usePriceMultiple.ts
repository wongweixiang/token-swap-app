import { useEffect, useState } from "react";
import { useSelectedTokens } from "@/SelectedTokensContext";
import { getTokenPrice } from "@/services/getTokenPrice";
import { bigDecimal } from "js-big-decimal"; // using big decimal to avoid floating point math errors

export const usePriceMultiple = () => {
  const { fromToken, toToken } = useSelectedTokens();

  const [priceMultiple, setPriceMultiple] = useState<string | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getPriceMultiple = async () => {
      if (!fromToken?.symbol || !toToken?.symbol) return;

      setIsLoading(true);

      const fromPrice = await getTokenPrice({ symbol: fromToken?.symbol });

      const toPrice = await getTokenPrice({ symbol: toToken?.symbol });

      setPriceMultiple(bigDecimal.divide(fromPrice, toPrice));
      setIsLoading(false);
    };

    getPriceMultiple();
  }, [fromToken, toToken]);

  return { priceMultiple, isLoading };
};
