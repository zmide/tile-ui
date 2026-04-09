/**
 * 根据 ID 生成 Input 相关的辅助 ID
 */
export function getInputIds(id: string) {
	return {
		input: id,
		error: `${id}-error`,
		helper: `${id}-helper`,
	};
}

/**
 * 获取 Input 的 ARIA 属性
 */
export function getInputAriaProps(ids: ReturnType<typeof getInputIds>, error?: string, helperText?: string) {
	return {
		'aria-invalid': !!error || undefined,
		'aria-describedby': error ? ids.error : helperText ? ids.helper : undefined,
	};
}
