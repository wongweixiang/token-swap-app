import swapVertical from "./assets/swap-vertical.svg";
import type { FC } from "react";

type ReverseButtonProps = {
  onClick: () => void;
};

export const ReverseButton: FC<ReverseButtonProps> = ({ onClick }) => {
  return (
    <button
      type="button"
      className="bg-emerald-200 p-2 rounded-4xl cursor-pointer"
      onClick={onClick}
    >
      <img src={swapVertical} alt="Swap Icon" className="w-6 h-6" />
    </button>
  );
};
