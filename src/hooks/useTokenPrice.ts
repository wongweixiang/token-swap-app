import { useEffect, useState } from "react";
import { getTokenPrice } from "@/services/getTokenPrice";

export const useTokenPrice = (tokenSymbol?: string) => {
  const [price, setPrice] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPrice = async () => {
      if (!tokenSymbol) return;

      setIsLoading(true);
      const result = await getTokenPrice({ symbol: tokenSymbol });
      setPrice(result);
      setIsLoading(false);
    };

    fetchPrice();
  }, [tokenSymbol]);

  return { price, isLoading };
};
