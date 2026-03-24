import type { ButtonVariant, ButtonSize } from './button.types';
import { capitalize } from '../../utils/helpers';

/**
 * 获取 Button 的样式类名键
 */
export function getButtonStyleKeys(
  variant: ButtonVariant = 'default',
  size: ButtonSize = 'default'
) {
  return {
    base: 'button',
    variant: `variant${capitalize(variant)}`,
    size: `size${capitalize(size)}`,
  };
}

/**
 * 判断 Button 是否处于禁用状态
 */
export function isButtonDisabled(disabled?: boolean, loading?: boolean): boolean {
  return !!disabled || !!loading;
}
