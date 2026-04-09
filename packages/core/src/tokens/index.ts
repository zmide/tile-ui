/**
 * 设计 Token - JS 导出
 * 与 styles/variables/_colors.scss 保持同步
 */

// 主色调
export const colors = {
	primary: '#18181b',
	primaryForeground: '#fafafa',
	secondary: '#f4f4f5',
	secondaryForeground: '#18181b',
	accent: '#f4f4f5',
	accentForeground: '#18181b',
	destructive: '#ef4444',
	destructiveForeground: '#fafafa',
	success: '#22c55e',
	successForeground: '#fafafa',
	warning: '#f59e0b',
	warningForeground: '#fafafa',
	info: '#3b82f6',
	infoForeground: '#fafafa',
	background: '#ffffff',
	foreground: '#18181b',
	border: '#e4e4e7',
	input: '#e4e4e7',
	ring: '#18181b',
} as const;

// 阴影
export const shadows = {
	sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
	default: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
	md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
	lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
} as const;

// 圆角
export const radii = {
	sm: '0.25rem',
	default: '0.5rem',
	md: '0.75rem',
	lg: '1rem',
	full: '9999px',
} as const;

// 字体
export const fonts = {
	sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
	mono: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace",
} as const;

// 字号
export const fontSizes = {
	xs: '0.75rem',
	sm: '0.875rem',
	base: '1rem',
	lg: '1.125rem',
	xl: '1.25rem',
	'2xl': '1.5rem',
	'3xl': '1.875rem',
} as const;

// 字重
export const fontWeights = {
	light: 300,
	normal: 400,
	medium: 500,
	semibold: 600,
	bold: 700,
} as const;

// 行高
export const lineHeights = {
	none: 1,
	tight: 1.25,
	normal: 1.5,
	relaxed: 1.625,
} as const;

// 间距
export const spacing = {
	1: '0.25rem',
	2: '0.5rem',
	3: '0.75rem',
	4: '1rem',
	5: '1.25rem',
	6: '1.5rem',
	8: '2rem',
	10: '2.5rem',
	12: '3rem',
} as const;

// 过渡
export const transitions = {
	fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
	normal: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
	slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

// 层级
export const zIndex = {
	dropdown: 1000,
	modal: 1050,
	popover: 1060,
	tooltip: 1070,
} as const;

// 断点
export const breakpoints = {
	sm: '640px',
	md: '768px',
	lg: '1024px',
	xl: '1280px',
	'2xl': '1536px',
} as const;
