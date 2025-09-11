import React, { ReactNode, ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type Variant = "primary" | "secondary" | "icon";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: Variant;
};

function getVariantClasses(variant: Variant) {
  switch (variant) {
    case "primary":
      return "px-3 py-1 bg-primary-200 text-primary-800 hover:bg-secondary-950 transition hover:cursor-pointer font-semibold min-w-max";
    case "secondary":
      return "px-3 py-1 bg-secondary-200 text-secondary-800 hover:bg-secondary-950 transition hover:cursor-pointer font-semibold min-w-max";
    case "icon":
      return "py-2 px-2 h-max w-max rounded-full bg-primary-200 text-primary-800 hover:bg-opacity-1 hover:bg-primary-300 transition hover:cursor-pointer";
    default:
      return "px-3 py-1 bg-primary-200 text-primary-800 hover:bg-secondary-950 transition hover:cursor-pointer font-semibold min-w-max";
  }
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  ...props
}) => (
  <button
    {...props}
    className={twMerge(getVariantClasses(variant), props.className)}
  >
    {children}
  </button>
);

export default Button;
