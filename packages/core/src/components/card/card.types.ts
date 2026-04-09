export type CardElement = 'div' | 'article' | 'section';

/**
 * 框架无关的 Card 基础 Props (仅包含组件库自定义属性)
 */
export interface CardBaseProps {
	as?: CardElement;
}

export interface CardHeaderBaseProps {}
export interface CardTitleBaseProps {}
export interface CardDescriptionBaseProps {}
export interface CardContentBaseProps {}
export interface CardFooterBaseProps {}
