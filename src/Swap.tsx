import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { TokenSelect } from "./TokenSelect";

export const Swap = () => {
  const { register, watch, setValue } = useForm();

  const buyInputValue = watch("buyInput");

  useEffect(() => {
    setValue("sellInput", buyInputValue * 2);
  }, [buyInputValue, setValue]);

  return (
    <form>
      <div className="flex flex-col w-full gap-4 my-10">
        <div className="rounded-md bg-gray-400 p-4 flex gap-2">
          <TokenSelect direction="from" />
          <input {...register("buyInput")} type="number" />
        </div>
        <div className="rounded-md bg-gray-400 p-4 flex gap-2">
          <TokenSelect direction="to" />
          <input {...register("sellInput")} type="number" disabled />
        </div>
      </div>
    </form>
  );
};
