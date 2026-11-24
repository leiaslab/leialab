import React, { forwardRef, useId } from 'react';

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  error?: string;
  isTextArea?: boolean;
  rows?: number;
}

const FormField = forwardRef<HTMLInputElement | HTMLTextAreaElement, FormFieldProps>(
  ({ label, error, isTextArea, className = '', ...props }, ref) => {
    const generatedId = useId();
    const inputId = props.id ?? generatedId;
    const errorId = inputId + '-error';
    const describedBy = [props['aria-describedby'], error ? errorId : undefined].filter(Boolean).join(' ') || undefined;
    const inputClasses = `w-full bg-[#12122a] border ${
      error ? 'border-red-500/50' : 'border-purple-900/40'
    } rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors ${className}`;

    return (
      <div className="w-full">
        <label htmlFor={inputId} className="block text-sm text-slate-300 mb-1.5">
          {label}
        </label>
        {isTextArea ? (
          <textarea
            ref={ref as React.ForwardedRef<HTMLTextAreaElement>}
            className={`${inputClasses} resize-none`}
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
            id={inputId}
            aria-invalid={error ? true : props['aria-invalid']}
            aria-describedby={describedBy}
          />
        ) : (
          <input
            ref={ref as React.ForwardedRef<HTMLInputElement>}
            className={inputClasses}
            {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
            id={inputId}
            aria-invalid={error ? true : props['aria-invalid']}
            aria-describedby={describedBy}
          />
        )}
        {error && <p id={errorId} className="text-red-400 text-xs mt-1">{error}</p>}
      </div>
    );
  }
);

FormField.displayName = 'FormField';

export default FormField;
