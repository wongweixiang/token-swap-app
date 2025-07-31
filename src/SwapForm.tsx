import { Button } from "./components/ui/button";

import { useSelectedTokens } from "./SelectedTokensContext";
import { TokenSelect } from "./TokenSelect";
import { usePriceMultiple } from "./hooks/usePriceMultiple";
import { useSwapForm } from "./hooks/useSwapForm";

import { ReverseButton } from "./components/ReverseButton";
import { PriceDisplay } from "./components/PriceDisplay";
import { CustomInput } from "./components/CustomInput";
import { Skeleton } from "./components/ui/skeleton";

export const SwapForm = () => {
  const { fromToken, toToken } = useSelectedTokens();

  const { fromTokenPrice, toTokenPrice, isLoading } = usePriceMultiple();

  const {
    register,
    fromInputValue,
    toInputValue,
    onSubmit,
    errors,
    handleSubmit,
    handleReverseTradeDirection,
  } = useSwapForm();

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
        <ReverseButton onClick={handleReverseTradeDirection} />
        <div className="rounded-md bg-gray-200 p-4 flex flex-col items-start w-full">
          <span>Buy</span>
          <div className="flex justify-between gap-2 w-full text-2xl">
            {isLoading && toToken && fromToken ? (
              <Skeleton className="w-16 grow" />
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
