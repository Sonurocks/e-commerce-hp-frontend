"use client";

import React, { InputHTMLAttributes, ReactNode } from "react";

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string | ReactNode;
  error?: string;
  helperText?: string;
  required?: boolean;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  variant?: "default" | "outlined" | "filled";
  size?: "small" | "medium" | "large";
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  helperTextClassName?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  required = false,
  fullWidth = true,
  leftIcon,
  rightIcon,
  variant = "default",
  size = "medium",
  className = "",
  inputClassName = "",
  labelClassName = "",
  errorClassName = "",
  helperTextClassName = "",
  id,
  name,
  type = "text",
  disabled,
  ...rest
}) => {
  // Generate id from name if not provided
  const inputId = id || name || `input-${Math.random().toString(36).substring(2, 11)}`;

  // Size classes
  const sizeClasses = {
    small: "px-3 py-2 text-sm",
    medium: "px-4 py-3 text-base",
    large: "px-5 py-4 text-lg",
  };

  // Variant classes
  const variantClasses = {
    default: "border-preto bg-white",
    outlined: "border-preto bg-white",
    filled: "border-gray-100 bg-gray-100",
  };

  // Base input classes
  const baseInputClasses = `
    w-full
    rounded-md
    border
    ${sizeClasses[size]}
    text-preto
    placeholder:text-[var(--color-hina)]
    focus:outline-none
    focus:border-preto
    transition-colors
    ${variantClasses[variant]}
    ${error ? "border-(--color-error)" : ""}
    ${disabled ? "opacity-50 cursor-not-allowed bg-gray-50" : ""}
    ${leftIcon ? "pl-10" : ""}
    ${rightIcon ? "pr-10" : ""}
  `.trim().replace(/\s+/g, " ");

  // Label classes
  const baseLabelClasses = `
    block
    text-xs
    font-normal
    text-preto
    mb-1
    ${labelClassName}
  `.trim().replace(/\s+/g, " ");

  // Error classes
  const baseErrorClasses = `
    mt-1
    text-xs
    text-(--color-error)
    ${errorClassName}
  `.trim().replace(/\s+/g, " ");

  // Helper text classes
  const baseHelperTextClasses = `
    mt-1
    text-xs
    text-preto
    font-normal
    ${helperTextClassName}
  `.trim().replace(/\s+/g, " ");

  return (
    <div className={`${fullWidth ? "w-full" : ""} ${className}`}>
      {/* Label */}
      {label && (
        <label htmlFor={inputId} className={baseLabelClasses}>
          {typeof label === "string" ? (
            <>
              {label}
              {required && <span className="text-preto ml-1">*</span>}
            </>
          ) : (
            label
          )}
        </label>
      )}

      {/* Input Container */}
      <div className="relative">
        {/* Left Icon */}
        {leftIcon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400">
            {leftIcon}
          </div>
        )}

        {/* Input Field */}
        <input
          id={inputId}
          name={name}
          type={type}
          disabled={disabled}
          className={`${baseInputClasses} ${inputClassName}`}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={
            error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
          }
          {...rest}
        />

        {/* Right Icon */}
        {rightIcon && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400">
            {rightIcon}
          </div>
        )}
      </div>

      {/* Helper Text */}
      {helperText && !error && (
        <p id={`${inputId}-helper`} className={baseHelperTextClasses}>
          {helperText}
        </p>
      )}

      {/* Error Message */}
      {error && (
        <p id={`${inputId}-error`} className={baseErrorClasses} role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
