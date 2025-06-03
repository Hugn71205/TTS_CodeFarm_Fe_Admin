import React from "react";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface InputFieldProps {
  label: string;
  id: string;
  type?: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  id,
  type = "text",
  register,
  error,
  required = false,
}) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}
    </label>
    <input
      id={id}
      type={type}
      {...register}
      required={required}
      className="w-full text-black pl-4 py-2 pr-4 text-sm bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
    />
    {error && <span className="text-red-500 text-sm">{error.message}</span>}
  </div>
);

export default InputField;
