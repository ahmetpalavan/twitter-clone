import React from "react";

interface Props {
  label: string;
  secondary?: boolean;
  onClick?: () => void;
  fullWidth?: boolean;
  large?: boolean;
  disabled?: boolean;
  outline?: boolean;
}

const Button = ({ label, secondary, onClick, fullWidth, large, disabled, outline }: Props) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-full
        font-semibold
        hover:opacity-80
        transition
        border-2
        ${fullWidth ? "w-full" : "w-fit"}
        ${secondary ? "border-black bg-white text-black" : "border-sky-500 text-white bg-sky-500"}
        ${large ? "px-5 py-3 text-xl" : "px-4 py-2 text-md"}
        ${outline ? "bg-transparent border-white text-white" : ""}
    `}
    >
      {label}
    </button>
  );
};

export default Button;
