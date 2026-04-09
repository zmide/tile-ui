import { useState, useEffect } from 'react';

/**
 * 窗口大小响应式 hook
 */
interface WindowSize {
	width: number;
	height: number;
}

export function useWindowSize(): WindowSize {
	const [windowSize, setWindowSize] = useState<WindowSize>({
		width: typeof window !== 'undefined' ? window.innerWidth : 0,
		height: typeof window !== 'undefined' ? window.innerHeight : 0,
	});

	useEffect(() => {
		function handleResize() {
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		}

		window.addEventListener('resize', handleResize);
		handleResize();

		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return windowSize;
}

/**
 * 媒体查询 hook
 */
export function useMediaQuery(query: string): boolean {
	const [matches, setMatches] = useState(false);

	useEffect(() => {
		const media = window.matchMedia(query);
		if (media.matches !== matches) {
			setMatches(media.matches);
		}

		const listener = (event: MediaQueryListEvent) => {
			setMatches(event.matches);
		};

		media.addEventListener('change', listener);
		return () => media.removeEventListener('change', listener);
	}, [matches, query]);

	return matches;
}

/**
 * 是否是移动设备
 */
export function useIsMobile(): boolean {
	return useMediaQuery('(max-width: 768px)');
}

/**
 * 在线状态 hook
 */
export function useOnlineStatus(): boolean {
	const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);

	useEffect(() => {
		const handleOnline = () => setIsOnline(true);
		const handleOffline = () => setIsOnline(false);

		window.addEventListener('online', handleOnline);
		window.addEventListener('offline', handleOffline);

		return () => {
			window.removeEventListener('online', handleOnline);
			window.removeEventListener('offline', handleOffline);
		};
	}, []);

	return isOnline;
}

/**
 * 滚动位置 hook
 */
export function useScrollPosition(): { x: number; y: number } {
	const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 });

	useEffect(() => {
		function handleScroll() {
			setScrollPosition({
				x: window.scrollX,
				y: window.scrollY,
			});
		}

		window.addEventListener('scroll', handleScroll, { passive: true });
		handleScroll();

		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return scrollPosition;
}
