import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { getTokenPrice } from "@/services/getTokenPrice";
import { bigDecimal } from "js-big-decimal"; // using big decimal to avoid floating point math errors

export const usePriceMultiple = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [priceMultiple, setPriceMultiple] = useState("1");

  const fromSymbol = searchParams.get("from");
  const toSymbol = searchParams.get("to");

  useEffect(() => {
    const getPriceMultiple = async () => {
      if (!fromSymbol || !toSymbol) return;

      const fromPrice = await getTokenPrice({ symbol: fromSymbol });

      const toPrice = await getTokenPrice({ symbol: toSymbol });

      setPriceMultiple(bigDecimal.divide(fromPrice, toPrice));
    };

    getPriceMultiple();
  }, [fromSymbol, toSymbol]);

  return { priceMultiple };
};
