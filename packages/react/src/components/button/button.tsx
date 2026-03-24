import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { getButtonStyleKeys, isButtonDisabled } from '@tile-ui/core';
import type { ButtonBaseProps } from '@tile-ui/core';
import styles from '@tile-ui/styles/scss/components/button.module.scss';

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
