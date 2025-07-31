import type { FC } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { useSelectedTokens, type Token } from "./SelectedTokensContext";
import { TOKENS } from "./constants/tokens";

type TokenSelectProps = {
  direction: "from" | "to";
  token: Token | undefined;
};

export const TokenSelect: FC<TokenSelectProps> = ({ direction, token }) => {
  const { fromToken, toToken, setSelectedTokens } = useSelectedTokens();

  const filteredSymbols = TOKENS.filter((token) => {
    return direction === "from"
      ? token?.symbol !== toToken?.symbol
      : token?.symbol !== fromToken?.symbol;
  }); // prevent the same symbol from showing up on both sides of swap

  const CustomSelectValue = () => {
    const tokenData = TOKENS.find((t) => t?.symbol === token?.symbol);

    if (!tokenData) return <SelectValue placeholder="Select token" />;

    return (
      <div className="flex items-center gap-3">
        <img className="w-6 h-6 ml-2" src={tokenData?.icon} />

        <div className="font-bold">{tokenData?.symbol}</div>
      </div>
    );
  };

  return (
    <Select
      value={token?.symbol ?? ""}
      onValueChange={(e) => {
        if (!e) return;

        const parsedToken = JSON.parse(e);

        setSelectedTokens(
          direction === "from"
            ? {
                fromToken: {
                  symbol: parsedToken?.symbol,
                  chainId: parsedToken?.chainId,
                },
              }
            : {
                toToken: {
                  symbol: parsedToken?.symbol,
                  chainId: parsedToken?.chainId,
                },
              }
        );
      }}
    >
      <SelectTrigger className="w-20 md:w-36">
        <CustomSelectValue />
      </SelectTrigger>
      <SelectContent className="w-">
        <SelectGroup>
          <SelectLabel>Tokens</SelectLabel>
          {filteredSymbols.map((t) => (
            <SelectItem key={t.symbol} value={JSON.stringify(t)}>
              <div className="flex justify-between items-center my-2 gap-3">
                <img className="w-6 h-6 ml-2" src={t.icon} />

                <div className="flex flex-col">
                  <div className="font-bold">{t.symbol}</div>
                  <div>{t.name}</div>
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
