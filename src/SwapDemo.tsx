import { useEffect } from "react";
import {
  getAssetErc20ByChainAndSymbol,
  getAssetPriceInfo,
} from "@funkit/api-base";

const DEV_API_KEY = "Z9SZaOwpmE40KX61mUKWm5hrpGh7WHVkaTvQJpQk";

export const SwapDemo = () => {
  const getTokenData = async () => {
    const tokenInfo = await getAssetErc20ByChainAndSymbol({
      chainId: "1",
      symbol: "USDC",
      apiKey: DEV_API_KEY,
    });

    const price = await getAssetPriceInfo({
      chainId: "1",
      assetTokenAddress: "0x514910771af9ca656af840dff83e8264ecf986ca",
      apiKey: DEV_API_KEY,
    });

    console.log({ tokenInfo, price });
  };

  useEffect(() => {
    getTokenData();
  }, []);

  return <div>Swap component</div>;
};
