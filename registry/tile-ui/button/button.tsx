import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import styles from './button.module.scss';

// --- Inlined from @tile-ui/core ---
type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  asChild?: boolean;
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getButtonStyleKeys(variant: ButtonVariant = 'default', size: ButtonSize = 'default') {
  return {
    base: 'button',
    variant: `variant${capitalize(variant)}`,
    size: `size${capitalize(size)}`,
  };
}

function isButtonDisabled(disabled?: boolean, loading?: boolean): boolean {
  return !!disabled || !!loading;
}
// --- End inlined ---

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonBaseProps {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = '',
      variant = 'default',
      size = 'default',
      asChild = false,
      loading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    const styleKeys = getButtonStyleKeys(variant, size);

    const classes = [
      styles[styleKeys.base],
      styles[styleKeys.variant],
      styles[styleKeys.size],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <Comp
        ref={ref}
        className={classes}
        disabled={isButtonDisabled(disabled, loading)}
        {...props}
      >
        {loading && (
          <svg
            className={styles.spinner}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
          </svg>
        )}
        {children}
      </Comp>
    );
  }
);

Button.displayName = 'Button';

export { Button };
export default Button;
