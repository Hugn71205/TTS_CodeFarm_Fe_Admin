import { forwardRef, type InputHTMLAttributes } from "react";
import type { FieldError } from "react-hook-form";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, ...rest }, ref) => {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
        <input
          {...rest}
          ref={ref}
          className={`w-full text-black pl-4 py-2 pr-4 text-sm bg-gray-100 border rounded-md focus:outline-none focus:ring-2 ${
            error ? "border-red-500 focus:ring-red-500" : "border-gray-200 focus:ring-gray-200"
          }`}
        />
        {error && <span className="text-red-500 text-sm">{error.message}</span>}
      </div>
    );
  }
);

export default InputField;