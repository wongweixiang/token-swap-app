import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelectedTokens } from "./SelectedTokensContext";
import { TokenSelect } from "./TokenSelect";
import { bigDecimal } from "js-big-decimal"; // using big decimal to avoid floating point math errors
import { usePriceMultiple } from "./hooks/usePriceMultiple";
import { ReverseButton } from "./components/ReverseButton";
import { PriceDisplay } from "./components/PriceDisplay";
import { CustomInput } from "./components/CustomInput";

export const Swap = () => {
  const {
    register,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const { fromToken, toToken, setSelectedTokens } = useSelectedTokens();

  const fromInputValue = watch("fromInput");
  const toInputValue = watch("toInput");

  const { priceMultiple, fromTokenPrice, toTokenPrice, isLoading } =
    usePriceMultiple();

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
        <div className="rounded-md bg-gray-200 p-4 flex flex-col items-start w-full">
          <span>Sell</span>
          <div className="flex justify-between gap-2 w-full text-2xl">
            <CustomInput
              {...register("fromInput", {
                required: "This field is required",
                validate: (value) =>
                  parseFloat(value) > 0 || "Only positive numbers allowed!",
              })}
            />
            <TokenSelect direction="from" token={fromToken} />
          </div>
          <PriceDisplay price={fromTokenPrice} amount={fromInputValue} />
          {errors.fromInput && (
            <p className="text-red-500 text-sm">
              {String(errors.fromInput.message)}
            </p>
          )}
        </div>
        <ReverseButton
          onClick={() => {
            const toInputValue = getValues("toInput");
            setValue("fromInput", toInputValue);
            setSelectedTokens({ fromToken: toToken, toToken: fromToken });
          }}
        />
        <div className="rounded-md bg-gray-200 p-4 flex flex-col items-start w-full">
          <span>Buy</span>
          <div className="flex justify-between gap-2 w-full text-2xl">
            {isLoading && toToken && fromToken ? (
              <span>Loading...</span>
            ) : (
              <CustomInput {...register("toInput")} disabled />
            )}
            <TokenSelect direction="to" token={toToken} />
          </div>
          <PriceDisplay
            price={toTokenPrice}
            amount={errors.fromInput ? 0 : toInputValue}
          />
        </div>
      </div>
    </form>
  );
};
