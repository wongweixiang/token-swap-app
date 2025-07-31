import { useEffect, useState } from "react";
import { getTokenPrice } from "@/services/getTokenPrice";
import type { TOKEN_MAPPING } from "@/TokenSelect";

export const useTokenPrice = (tokenSymbol?: keyof typeof TOKEN_MAPPING) => {
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
