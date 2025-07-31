import {
  getAssetErc20ByChainAndSymbol,
  getAssetPriceInfo,
} from "@funkit/api-base";
import { TOKENS } from "@/constants/tokens";

type GetTokenData = {
  symbol: string;
};

export const getTokenPrice = async ({
  symbol,
}: GetTokenData): Promise<string> => {
  const chainId = TOKENS?.find((t) => t.symbol === symbol)?.chainId;

  if (!chainId) return "";

  const tokenInfo = await getAssetErc20ByChainAndSymbol({
    chainId,
    symbol,
    apiKey: import.meta.env.VITE_DEV_API_KEY,
  });

  const priceData = await getAssetPriceInfo({
    chainId,
    assetTokenAddress: tokenInfo?.address,
    apiKey: import.meta.env.VITE_DEV_API_KEY,
  });

  return String(priceData.unitPrice);
};
