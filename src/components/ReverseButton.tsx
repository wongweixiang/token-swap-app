import type { FC } from "react";
import { useSelectedTokens } from "../SelectedTokensContext";
import { cn } from "@/lib/utils";
import swapVertical from "@/assets/swap-vertical.svg";

type ReverseButtonProps = {
  onClick: () => void;
};

export const ReverseButton: FC<ReverseButtonProps> = ({ onClick }) => {
  const { fromToken, toToken } = useSelectedTokens();

  const isEnabled = fromToken && toToken;

  return (
    <button
      type="button"
      disabled={!isEnabled}
      className={cn(
        "p-2 rounded-4xl",
        isEnabled ? "bg-emerald-200 cursor-pointer" : "bg-emerald-50"
      )}
      onClick={onClick}
    >
      <img src={swapVertical} alt="Swap Icon" className="w-6 h-6" />
    </button>
  );
};
