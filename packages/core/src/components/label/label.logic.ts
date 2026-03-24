/**
 * 获取 Label 的样式类名数组
 */
export function getLabelClassKeys(required?: boolean) {
  return {
    base: 'label',
    required: required ? 'required' : undefined,
  };
}
