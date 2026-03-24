/**
 * 根据 ID 生成 Textarea 相关的辅助 ID
 */
export function getTextareaIds(id: string) {
  return {
    textarea: id,
    error: `${id}-error`,
    helper: `${id}-helper`,
  };
}

/**
 * 获取 Textarea 的 ARIA 属性
 */
export function getTextareaAriaProps(
  ids: ReturnType<typeof getTextareaIds>,
  error?: string,
  helperText?: string
) {
  return {
    'aria-invalid': !!error || undefined,
    'aria-describedby': error ? ids.error : helperText ? ids.helper : undefined,
  };
}
