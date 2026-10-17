/**
 * 框架无关的 Input 基础 Props (仅包含组件库自定义属性)
 */
export interface InputBaseProps {
	label?: string;
	error?: string;
	helperText?: string;
	/** Visual control size; independent of the native numeric HTML `size` attribute. */
	controlSize?: 'default' | 'xs' | 'sm' | 'lg';
}
