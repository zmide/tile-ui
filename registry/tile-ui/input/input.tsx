import React, { useId } from 'react';
import styles from './input.module.scss';

// --- Inlined from @tile-ui/core ---
interface InputBaseProps {
  label?: string;
  error?: string;
  helperText?: string;
}

function getInputIds(id: string) {
  return { input: id, error: `${id}-error`, helper: `${id}-helper` };
}

function getInputAriaProps(
  ids: ReturnType<typeof getInputIds>,
  error?: string,
  helperText?: string
) {
  return {
    'aria-invalid': !!error || undefined,
    'aria-describedby': error ? ids.error : helperText ? ids.helper : undefined,
  };
}
// --- End inlined ---

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    InputBaseProps {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = '',
      label,
      error,
      helperText,
      required,
      id: providedId,
      type = 'text',
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id = providedId || generatedId;
    const ids = getInputIds(id);
    const ariaProps = getInputAriaProps(ids, error, helperText);

    return (
      <div className={styles.inputWrapper}>
        {label && (
          <label
            htmlFor={id}
            className={`${styles.label} ${required ? styles.required : ''}`}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          type={type}
          className={`${styles.input} ${error ? styles.error : ''} ${className}`}
          {...ariaProps}
          {...props}
        />
        {error && (
          <span id={ids.error} className={styles.errorText}>
            {error}
          </span>
        )}
        {!error && helperText && (
          <span id={ids.helper} className={styles.helperText}>
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
export default Input;
