import {
  getAssetErc20ByChainAndSymbol,
  getAssetPriceInfo,
} from "@funkit/api-base";
import { TOKEN_MAPPING } from "@/TokenSelect";

type GetTokenData = {
  symbol: keyof typeof TOKEN_MAPPING;
};

export const getTokenPrice = async ({
  symbol,
}: GetTokenData): Promise<string> => {
  const chainId = TOKEN_MAPPING[symbol];

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
