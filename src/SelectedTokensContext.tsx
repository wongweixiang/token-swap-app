import { createContext, useContext, useState, type ReactNode } from "react";
import type { TOKEN_MAPPING } from "./TokenSelect";

export type Token = {
  chainId: string;
  symbol: keyof typeof TOKEN_MAPPING;
};

type SelectedTokensContextType = {
  fromToken: Token | undefined;
  toToken: Token | undefined;
  setSelectedTokens: (
    tokens: Partial<{ fromToken: Token; toToken: Token }>
  ) => void;
};

const SelectedTokensContext = createContext<
  SelectedTokensContextType | undefined
>(undefined);

export const SelectedTokensProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [fromToken, setFromToken] = useState<Token | undefined>(undefined);
  const [toToken, setToToken] = useState<Token | undefined>(undefined);

  const setSelectedTokens = (
    tokens: Partial<{ fromToken: Token; toToken: Token }>
  ) => {
    if (tokens.fromToken) setFromToken(tokens.fromToken);
    if (tokens.toToken) setToToken(tokens.toToken);
  };

  return (
    <SelectedTokensContext.Provider
      value={{ fromToken, toToken, setSelectedTokens }}
    >
      {children}
    </SelectedTokensContext.Provider>
  );
};

export const useSelectedTokens = () => {
  const context = useContext(SelectedTokensContext);
  if (!context) {
    throw new Error(
      "useSelectedToken must be used within a SelectedTokenProvider"
    );
  }
  return context;
};
