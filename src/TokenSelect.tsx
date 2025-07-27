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

export const TOKEN_MAPPING = {
  USDC: "1",
  USDT: "137",
  ETH: "8453",
  WBTC: "1",
};

type TokenSelectProps = {
  direction: "from" | "to";
  token: Token | undefined;
};

export const TokenSelect: FC<TokenSelectProps> = ({ direction, token }) => {
  const { fromToken, toToken, setSelectedTokens } = useSelectedTokens();

  const filteredSymbols = Object.keys(TOKEN_MAPPING).filter((sym) => {
    return direction === "from"
      ? sym !== toToken?.symbol
      : sym !== fromToken?.symbol;
  }); // prevent the same symbol from showing up on both sides of swap

  return (
    <Select
      value={token?.symbol}
      onValueChange={(e) => {
        if (!e) return;

        setSelectedTokens(
          direction === "from"
            ? { fromToken: { symbol: e, chainId: TOKEN_MAPPING[e] } }
            : { toToken: { symbol: e, chainId: TOKEN_MAPPING[e] } }
        );
      }}
    >
      <SelectTrigger className="w-36">
        <SelectValue placeholder="Select token" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Tokens</SelectLabel>
          {filteredSymbols.map((symbol) => (
            <SelectItem key={symbol} value={symbol}>
              {symbol}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
