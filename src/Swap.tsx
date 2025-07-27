import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { TokenSelect } from "./TokenSelect";
import { bigDecimal } from "js-big-decimal"; // using big decimal to avoid floating point math errors
import { usePriceMultiple } from "./hooks/usePriceMultiple";
import swapVertical from "./assets/swap-vertical.svg";

export const Swap = () => {
  const { register, watch, setValue } = useForm();

  const fromInputValue = watch("fromInput");

  const { priceMultiple, isLoading } = usePriceMultiple();

  useEffect(() => {
    if (!fromInputValue) {
      setValue("toInput", null);
      return;
    }

    if (priceMultiple)
      setValue(
        "toInput",
        bigDecimal.multiply(String(fromInputValue), priceMultiple)
      );
  }, [fromInputValue, setValue, priceMultiple]);

  return (
    <form>
      <div className="flex flex-col items-center w-full gap-2 my-10">
        <div className="rounded-md bg-gray-200 p-4 flex flex-col items-start">
          <span>Sell</span>
          <div className="flex justify-between gap-2 w-full text-2xl">
            <input
              className="border-b-2 border-black"
              {...register("fromInput")}
              type="number"
            />
            <TokenSelect direction="from" />
          </div>
        </div>
        <button className="bg-emerald-200 p-2 rounded-4xl cursor-pointer">
          <img src={swapVertical} alt="Swap Icon" className="w-6 h-6" />
        </button>
        <div className="rounded-md bg-gray-200 p-4 flex flex-col items-start">
          <span>Buy</span>
          <div className="flex justify-between gap-2 w-full text-2xl">
            {fromInputValue && isLoading ? (
              <span>Loading...</span>
            ) : (
              <input
                className="border-b-2 border-black"
                {...register("toInput")}
                type="number"
                disabled
              />
            )}
            <TokenSelect direction="to" />
          </div>
        </div>
      </div>
    </form>
  );
};
