import { useState, useCallback, useEffect, useRef } from 'react';

/**
 * 复制到剪贴板的 hook
 */
interface UseCopyToClipboardProps {
	timeout?: number;
}

interface CopyState {
	copied: boolean;
	error: Error | null;
}

export function useCopyToClipboard({ timeout = 2000 }: UseCopyToClipboardProps = {}): [(text: string) => Promise<boolean>, CopyState] {
	const [copyState, setCopyState] = useState<CopyState>({
		copied: false,
		error: null,
	});

	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	const copy = useCallback(
		async (text: string) => {
			if (!navigator?.clipboard) {
				const error = new Error('Clipboard API not available');
				setCopyState({ copied: false, error });
				return false;
			}

			try {
				await navigator.clipboard.writeText(text);
				setCopyState({ copied: true, error: null });

				if (timeout) {
					timeoutRef.current = setTimeout(() => {
						setCopyState({ copied: false, error: null });
					}, timeout);
				}

				return true;
			} catch (error) {
				const err = error instanceof Error ? error : new Error('Failed to copy');
				setCopyState({ copied: false, error: err });
				return false;
			}
		},
		[timeout],
	);

	return [copy, copyState];
}

/**
 * 点击外部触发的 hook
 */
export function useClickOutside<T extends HTMLElement = HTMLElement>(callback: () => void): React.RefObject<T | null> {
	const ref = useRef<T>(null);

	useEffect(() => {
		const handleClick = (event: MouseEvent | TouchEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				callback();
			}
		};

		document.addEventListener('mousedown', handleClick);
		document.addEventListener('touchstart', handleClick, { passive: true });

		return () => {
			document.removeEventListener('mousedown', handleClick);
			document.removeEventListener('touchstart', handleClick);
		};
	}, [callback]);

	return ref;
}

/**
 * 键盘事件 hook
 */
export function useKeyPress(targetKey: string, callback: () => void): void {
	useEffect(() => {
		const handleKeyPress = (event: KeyboardEvent) => {
			if (event.key === targetKey) {
				callback();
			}
		};

		window.addEventListener('keydown', handleKeyPress);

		return () => {
			window.removeEventListener('keydown', handleKeyPress);
		};
	}, [targetKey, callback]);
}

/**
 * 鼠标位置 hook
 */
export function useMousePosition(): { x: number; y: number } {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

	useEffect(() => {
		const handleMouseMove = (event: MouseEvent) => {
			setMousePosition({ x: event.clientX, y: event.clientY });
		};

		window.addEventListener('mousemove', handleMouseMove);

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
		};
	}, []);

	return mousePosition;
}
