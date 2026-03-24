import React from 'react';
import styles from './card.module.scss';

// --- Inlined from @tile-ui/core ---
type CardElement = 'div' | 'article' | 'section';

interface CardBaseProps {
  as?: CardElement;
}

const cardStyleKeys = {
  card: 'card',
  header: 'cardHeader',
  title: 'cardTitle',
  description: 'cardDescription',
  content: 'cardContent',
  footer: 'cardFooter',
} as const;
// --- End inlined ---

export interface CardProps extends React.HTMLAttributes<HTMLDivElement>, CardBaseProps {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', as: Component = 'div', children, ...props }, ref) => {
    return (
      <Component ref={ref} className={`${styles[cardStyleKeys.card]} ${className}`} {...props}>
        {children}
      </Component>
    );
  }
);
Card.displayName = 'Card';

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}
const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className = '', children, ...props }, ref) => (
    <div ref={ref} className={`${styles[cardStyleKeys.header]} ${className}`} {...props}>{children}</div>
  )
);
CardHeader.displayName = 'CardHeader';

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}
const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className = '', children, ...props }, ref) => (
    <h3 ref={ref} className={`${styles[cardStyleKeys.title]} ${className}`} {...props}>{children}</h3>
  )
);
CardTitle.displayName = 'CardTitle';

interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}
const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className = '', children, ...props }, ref) => (
    <p ref={ref} className={`${styles[cardStyleKeys.description]} ${className}`} {...props}>{children}</p>
  )
);
CardDescription.displayName = 'CardDescription';

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}
const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className = '', children, ...props }, ref) => (
    <div ref={ref} className={`${styles[cardStyleKeys.content]} ${className}`} {...props}>{children}</div>
  )
);
CardContent.displayName = 'CardContent';

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}
const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className = '', children, ...props }, ref) => (
    <div ref={ref} className={`${styles[cardStyleKeys.footer]} ${className}`} {...props}>{children}</div>
  )
);
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
export type { CardHeaderProps, CardTitleProps, CardDescriptionProps, CardContentProps, CardFooterProps };
export default Card;
