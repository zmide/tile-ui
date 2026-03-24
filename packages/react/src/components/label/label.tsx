import React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { getLabelClassKeys } from '@tile-ui/core';
import type { LabelBaseProps } from '@tile-ui/core';
import styles from '@tile-ui/styles/scss/components/label.module.scss';

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
