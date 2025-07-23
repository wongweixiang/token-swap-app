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

const TOKEN_LIST = [
  {
    chainId: "1",
    symbol: "USDC",
  },
  {
    chainId: "137",
    symbol: "USDT",
  },
  {
    chainId: "8453",
    symbol: "ETH",
  },
  {
    chainId: "1",
    symbol: "WBTC",
  },
];

type TokenSelectProps = {
  direction: "from" | "to";
};

export const TokenSelect: FC<TokenSelectProps> = ({ direction }) => {
  console.log(direction);

  return (
    <Select onValueChange={(e) => alert(e)}>
      <SelectTrigger className="w-36">
        <SelectValue placeholder="Select token" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Tokens</SelectLabel>
          {TOKEN_LIST.map((token) => (
            <SelectItem value={token.symbol}>{token.symbol}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
