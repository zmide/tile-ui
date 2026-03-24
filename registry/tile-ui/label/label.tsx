import React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import styles from './label.module.scss';

// --- Inlined from @tile-ui/core ---
interface LabelBaseProps {
  required?: boolean;
}

function getLabelClassKeys(required?: boolean) {
  return {
    base: 'label',
    required: required ? 'required' : undefined,
  };
}
// --- End inlined ---

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement>,
    LabelBaseProps {}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className = '', required, children, ...props }, ref) => {
    const classKeys = getLabelClassKeys(required);

    return (
      <LabelPrimitive.Root
        ref={ref}
        className={`${styles[classKeys.base]} ${classKeys.required ? styles[classKeys.required] : ''} ${className}`}
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
