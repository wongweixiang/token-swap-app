import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { bigDecimal } from "js-big-decimal"; // using big decimal to avoid floating point math errors
import { Button } from "./components/ui/button";
import { toast } from "sonner";

import { useSelectedTokens } from "./SelectedTokensContext";
import { TokenSelect } from "./TokenSelect";
import { usePriceMultiple } from "./hooks/usePriceMultiple";
import { ReverseButton } from "./components/ReverseButton";
import { PriceDisplay } from "./components/PriceDisplay";
import { CustomInput } from "./components/CustomInput";

type FormValues = {
  fromInput: string;
  toInput: string;
};

export const SwapForm = () => {
  const {
    register,
    watch,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    mode: "onChange",
  });

  const { fromToken, toToken, setSelectedTokens } = useSelectedTokens();

  const fromInputValue = watch("fromInput");
  const toInputValue = watch("toInput");

  const { priceMultiple, fromTokenPrice, toTokenPrice, isLoading } =
    usePriceMultiple();

  useEffect(() => {
    if (!fromInputValue) {
      setValue("toInput", "");
      return;
    }

    if (priceMultiple)
      setValue(
        "toInput",
        bigDecimal.multiply(String(fromInputValue), priceMultiple)
      );
  }, [fromInputValue, setValue, priceMultiple]);

  const onSubmit = (data: FormValues) => {
    const toastMessage = `Successfully swapped ${data?.fromInput} ${fromToken?.symbol} for ${data?.toInput} ${toToken?.symbol}`;

    toast(toastMessage);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
          <PriceDisplay
            price={fromTokenPrice}
            amount={fromInputValue}
            isLoading={isLoading}
          />
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
            amount={errors.fromInput ? "0" : toInputValue}
            isLoading={isLoading}
          />
        </div>

        <Button
          type="submit"
          disabled={!toInputValue}
          className="w-full h-12 mt-3"
        >
          Swap
        </Button>
      </div>
    </form>
  );
};
