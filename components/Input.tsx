import React from "react";

interface Props {
  placeholder?: string;
  value?: string;
  type?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ placeholder, value, type, disabled, onChange }: Props) => {
  return (
    <input
      placeholder={placeholder}
      value={value}
      type={type}
      disabled={disabled}
      onChange={onChange}
      className="w-full p-4 py-2 text-lg border-2 border-neutral-800 rounded-md outline-none focus:border-sky-500 focus:border-2 transition
        disabled:bg-neutral-900 disabled:opacity-70 disabled:cursor-not-allowed"
    />
  );
};

export default Input;
