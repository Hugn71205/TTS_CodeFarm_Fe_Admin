import React from "react";

interface CustomButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  className?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  type = "button",
  className = "",
}) => (
  <button
    type={type}
    className={`w-full bg-gray-900 text-white py-3 px-4 rounded-md hover:bg-gray-800 transition-colors ${className}`}
  >
    {children}
  </button>
);

export default CustomButton;