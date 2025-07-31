import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { bigDecimal } from "js-big-decimal"; // using big decimal to avoid floating point math errors
import { toast } from "sonner";

import { usePriceMultiple } from "./usePriceMultiple";
import { useSelectedTokens } from "@/SelectedTokensContext";

type FormValues = {
  fromInput: string;
  toInput: string;
};

export const useSwapForm = () => {
  const {
    watch,
    getValues,
    setValue,
    formState: { errors },
    reset,
    ...otherProps
  } = useForm<FormValues>({
    mode: "onChange",
  });

  const { fromToken, toToken, setSelectedTokens } = useSelectedTokens();

  const fromInputValue = watch("fromInput");
  const toInputValue = watch("toInput");

  const { priceMultiple } = usePriceMultiple();

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

  const handleReverseTradeDirection = () => {
    const toInputValue = getValues("toInput");
    setValue("fromInput", toInputValue);
    setSelectedTokens({ fromToken: toToken, toToken: fromToken });
  };
  return {
    fromInputValue,
    toInputValue,
    onSubmit,
    errors,
    handleReverseTradeDirection,
    ...otherProps,
  };
};
