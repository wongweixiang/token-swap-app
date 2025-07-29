import type { FC, InputHTMLAttributes } from "react";

type CustomInputProps = InputHTMLAttributes<HTMLInputElement>;

export const CustomInput: FC<CustomInputProps> = ({ ...props }) => {
  return (
    <input
      className="w-8 border-b-2 border-black grow"
      type="number"
      step="any"
      {...props}
    />
  );
};
