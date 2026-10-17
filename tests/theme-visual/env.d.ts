export {};

declare global {
	interface Window {
		__themeFixture: {
			framework: string;
			setMode(mode: 'light' | 'dark', selector?: 'class' | 'data-theme'): void;
			showToast(): void;
			dismissToasts(): void;
		};
	}
}
