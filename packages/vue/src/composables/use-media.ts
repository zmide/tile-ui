import { ref, onMounted, onUnmounted } from 'vue';

/**
 * 窗口大小响应式 composable
 */
export function useWindowSize() {
  const width = ref(typeof window !== 'undefined' ? window.innerWidth : 0);
  const height = ref(typeof window !== 'undefined' ? window.innerHeight : 0);

  function handleResize() {
    width.value = window.innerWidth;
    height.value = window.innerHeight;
  }

  onMounted(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
  });

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
  });

  return { width, height };
}

/**
 * 媒体查询 composable
 */
export function useMediaQuery(query: string) {
  const matches = ref(false);

  onMounted(() => {
    const media = window.matchMedia(query);
    matches.value = media.matches;

    const listener = (event: MediaQueryListEvent) => {
      matches.value = event.matches;
    };

    media.addEventListener('change', listener);

    onUnmounted(() => {
      media.removeEventListener('change', listener);
    });
  });

  return matches;
}

/**
 * 是否是移动设备
 */
export function useIsMobile() {
  return useMediaQuery('(max-width: 768px)');
}

/**
 * 在线状态 composable
 */
export function useOnlineStatus() {
  const isOnline = ref(typeof navigator !== 'undefined' ? navigator.onLine : true);

  onMounted(() => {
    const handleOnline = () => { isOnline.value = true; };
    const handleOffline = () => { isOnline.value = false; };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    onUnmounted(() => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    });
  });

  return isOnline;
}

/**
 * 滚动位置 composable
 */
export function useScrollPosition() {
  const x = ref(0);
  const y = ref(0);

  onMounted(() => {
    function handleScroll() {
      x.value = window.scrollX;
      y.value = window.scrollY;
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll);
    });
  });

  return { x, y };
}
