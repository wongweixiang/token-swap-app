import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { TokenSelect } from "./TokenSelect";
import { bigDecimal } from "js-big-decimal"; // using big decimal to avoid floating point math errors
import { usePriceMultiple } from "./hooks/usePriceMultiple";

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
      <div className="flex flex-col w-full gap-4 my-10">
        <div className="rounded-md bg-gray-200 p-4 flex gap-2">
          <TokenSelect direction="from" />
          <input {...register("fromInput")} type="number" />
        </div>
        <div className="rounded-md bg-gray-200 p-4 flex items-center gap-2">
          <TokenSelect direction="to" />
          {fromInputValue && isLoading ? (
            <span>Loading...</span>
          ) : (
            <input {...register("toInput")} type="number" disabled />
          )}
        </div>
      </div>
    </form>
  );
};
