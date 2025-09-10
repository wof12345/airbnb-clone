import React, { ReactNode, ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

const Button: React.FC<ButtonProps> = ({ children, ...props }) => (
  <button
    {...props}
    className={twMerge(
      "px-4 py-2 bg-secondary-100 text-primary-800 rounded hover:bg-secondary-950 hover:text-white transition hover:cursor-pointer font-semibold min-w-max",
      props.className
    )}
  >
    {children}
  </button>
);

export default Button;
