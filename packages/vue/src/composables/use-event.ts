import { ref, onMounted, onUnmounted } from 'vue';
import type { Ref } from 'vue';

/**
 * 复制到剪贴板的 composable
 */
export function useCopyToClipboard(timeout = 2000) {
  const copied = ref(false);
  const error = ref<Error | null>(null);
  let timer: ReturnType<typeof setTimeout> | null = null;

  onUnmounted(() => {
    if (timer) clearTimeout(timer);
  });

  async function copy(text: string): Promise<boolean> {
    if (!navigator?.clipboard) {
      error.value = new Error('Clipboard API not available');
      copied.value = false;
      return false;
    }

    try {
      await navigator.clipboard.writeText(text);
      copied.value = true;
      error.value = null;

      if (timeout) {
        timer = setTimeout(() => {
          copied.value = false;
          error.value = null;
        }, timeout);
      }

      return true;
    } catch (err) {
      error.value = err instanceof Error ? err : new Error('Failed to copy');
      copied.value = false;
      return false;
    }
  }

  return { copy, copied, error };
}

/**
 * 点击外部触发的 composable
 */
export function useClickOutside<T extends HTMLElement = HTMLElement>(
  callback: () => void
): Ref<T | null> {
  const elementRef = ref<T | null>(null) as Ref<T | null>;

  onMounted(() => {
    const handleClick = (event: MouseEvent | TouchEvent) => {
      if (elementRef.value && !elementRef.value.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClick);
    document.addEventListener('touchstart', handleClick, { passive: true });

    onUnmounted(() => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('touchstart', handleClick);
    });
  });

  return elementRef;
}

/**
 * 键盘事件 composable
 */
export function useKeyPress(targetKey: string, callback: () => void): void {
  onMounted(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === targetKey) {
        callback();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    onUnmounted(() => {
      window.removeEventListener('keydown', handleKeyPress);
    });
  });
}

/**
 * 鼠标位置 composable
 */
export function useMousePosition() {
  const x = ref(0);
  const y = ref(0);

  onMounted(() => {
    const handleMouseMove = (event: MouseEvent) => {
      x.value = event.clientX;
      y.value = event.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    onUnmounted(() => {
      window.removeEventListener('mousemove', handleMouseMove);
    });
  });

  return { x, y };
}
