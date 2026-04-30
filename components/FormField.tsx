import React, { forwardRef } from 'react';

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  error?: string;
  isTextArea?: boolean;
  rows?: number;
}

const FormField = forwardRef<HTMLInputElement | HTMLTextAreaElement, FormFieldProps>(
  ({ label, error, isTextArea, className = '', ...props }, ref) => {
    const inputClasses = `w-full bg-[#12122a] border ${
      error ? 'border-red-500/50' : 'border-purple-900/40'
    } rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors ${className}`;

    return (
      <div className="w-full">
        <label className="block text-sm text-gray-400 mb-1.5">
          {label}
        </label>
        {isTextArea ? (
          <textarea
            ref={ref as React.ForwardedRef<HTMLTextAreaElement>}
            className={`${inputClasses} resize-none`}
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            ref={ref as React.ForwardedRef<HTMLInputElement>}
            className={inputClasses}
            {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
          />
        )}
        {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
      </div>
    );
  }
);

FormField.displayName = 'FormField';

export default FormField;