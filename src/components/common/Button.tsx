"use client";

import React, { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "size"> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "social";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  href?: string;
  target?: string;
  className?: string;
  children: ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "medium",
  fullWidth = false,
  loading = false,
  leftIcon,
  rightIcon,
  href,
  target,
  className = "",
  disabled,
  children,
  type = "button",
  ...rest
}) => {
  // Size classes
  const sizeClasses = {
    small: "px-4 py-2 text-sm",
    medium: "px-6 py-3 text-base",
    large: "px-8 py-4 text-lg",
  };

  // Variant classes
  const variantClasses = {
    primary: "bg-[#222] text-white hover:bg-[#333] focus:bg-[#333]",
    secondary: "bg-preto text-white hover:bg-gray-900 focus:bg-gray-900",
    outline: "border-2 border-[#222] text-preto bg-transparent hover:bg-gray-50 focus:bg-gray-50",
    ghost: "bg-transparent text-preto hover:bg-gray-100 focus:bg-gray-100",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:bg-red-700",
    social: "border border-preto bg-white text-preto hover:bg-(--colorLightGrey) focus:bg-(--colorLightGrey)",
  };

  // Base button classes
  const baseClasses = `
    inline-flex
    items-center
    justify-center
    gap-2
    font-semibold
    rounded-lg
    transition-colors
    focus:outline-none
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${fullWidth ? "w-full" : ""}
    ${loading ? "cursor-wait" : ""}
    ${disabled || loading ? "opacity-50 cursor-not-allowed" : ""}
  `.trim().replace(/\s+/g, " ");

  const buttonContent = (
    <>
      {loading && (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {!loading && leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
      <span>{children}</span>
      {!loading && rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
    </>
  );

  // If href is provided, render as Link
  if (href) {
    return (
      <Link
        href={href}
        target={target}
        className={`${baseClasses} ${className}`}
        {...(rest as any)}
      >
        {buttonContent}
      </Link>
    );
  }

  // Render as button
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`${baseClasses} ${className}`}
      {...rest}
    >
      {buttonContent}
    </button>
  );
};

export default Button;
