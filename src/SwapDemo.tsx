import { useEffect } from "react";
import {
  getAssetErc20ByChainAndSymbol,
  getAssetPriceInfo,
} from "@funkit/api-base";
import { TOKEN_MAPPING } from "./TokenSelect";

const DEV_API_KEY = "Z9SZaOwpmE40KX61mUKWm5hrpGh7WHVkaTvQJpQk";

type GetTokenData = {
  symbol: string;
};

export const SwapDemo = () => {
  const getTokenData = async ({ symbol }: GetTokenData) => {
    const chainId = TOKEN_MAPPING[symbol];

    const tokenInfo = await getAssetErc20ByChainAndSymbol({
      chainId,
      symbol,
      apiKey: DEV_API_KEY,
    });

    const price = await getAssetPriceInfo({
      chainId,
      assetTokenAddress: tokenInfo?.address,
      apiKey: DEV_API_KEY,
    });

    console.log({ tokenInfo, price });
  };

  useEffect(() => {
    getTokenData({
      symbol: "ETH",
    });
  }, []);

  return <div>Swap component</div>;
};
