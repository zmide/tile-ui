import React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import styles from './label.module.scss';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className = '', required, children, ...props }, ref) => {
    return (
      <LabelPrimitive.Root
        ref={ref}
        className={`${styles.label} ${required ? styles.required : ''} ${className}`}
        {...props}
      >
        {children}
      </LabelPrimitive.Root>
    );
  }
);

Label.displayName = 'Label';

export { Label };
export default Label;
