import React from "react";

const Button = ({
  children,
  type = "button",
  onClick,
  variant = "primary", // primary | secondary | danger | outline
  size = "md", // sm | md | lg
  disabled = false,
  loading = false,
  fullWidth = false,
  className = "",
}) => {
  // Variants
  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-500 text-white hover:bg-gray-600",
    danger: "bg-red-500 text-white hover:bg-red-600",
    outline:
      "border border-gray-400 text-gray-700 hover:bg-gray-100",
  };

  // Sizes
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? "w-full" : ""}
        rounded-lg font-medium transition duration-200
        focus:outline-none focus:ring-2 focus:ring-offset-1
        ${disabled || loading ? "opacity-50 cursor-not-allowed" : ""}
        ${className}
      `}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;