import {
  getAssetErc20ByChainAndSymbol,
  getAssetPriceInfo,
} from "@funkit/api-base";
import { TOKEN_MAPPING } from "@/TokenSelect";

const DEV_API_KEY = "Z9SZaOwpmE40KX61mUKWm5hrpGh7WHVkaTvQJpQk";

type GetTokenData = {
  symbol: string;
};

export const getTokenPrice = async ({
  symbol,
}: GetTokenData): Promise<string> => {
  const chainId = TOKEN_MAPPING[symbol];

  const tokenInfo = await getAssetErc20ByChainAndSymbol({
    chainId,
    symbol,
    apiKey: DEV_API_KEY,
  });

  const priceData = await getAssetPriceInfo({
    chainId,
    assetTokenAddress: tokenInfo?.address,
    apiKey: DEV_API_KEY,
  });

  return String(priceData.unitPrice);
};
