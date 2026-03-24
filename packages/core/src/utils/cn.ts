type ClassValue = string | number | boolean | null | undefined | ClassValue[] | Record<string, boolean | null | undefined>;

/**
 * 合并 CSS 类名
 * 支持条件类名和数组类名
 */
export function cn(...inputs: ClassValue[]): string {
  return inputs
    .flatMap(input => {
      if (input === null || input === undefined || input === false) {
        return [];
      }
      if (typeof input === 'string' || typeof input === 'number') {
        return [String(input)];
      }
      if (Array.isArray(input)) {
        return input;
      }
      if (typeof input === 'object') {
        return Object.entries(input)
          .filter(([, value]) => value)
          .map(([key]) => key);
      }
      return [];
    })
    .filter(Boolean)
    .join(' ');
}
