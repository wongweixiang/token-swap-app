import type { FC } from "react";
import { useSearchParams } from "react-router";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";

export const TOKEN_MAPPING = {
  USDC: "1",
  USDT: "137",
  ETH: "8453",
  WBTC: "1",
};

type TokenSelectProps = {
  direction: "from" | "to";
};

export const TokenSelect: FC<TokenSelectProps> = ({ direction }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const fromSymbol = searchParams.get("from");
  const toSymbol = searchParams.get("to");

  const filteredSymbols = Object.keys(TOKEN_MAPPING).filter((sym) => {
    return direction === "from" ? sym !== toSymbol : sym !== fromSymbol;
  }); // prevent same symbol from showing up on both sides of swap

  return (
    <Select
      onValueChange={(e) =>
        setSearchParams((params) => {
          params.set(direction, e);
          return params;
        })
      }
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
