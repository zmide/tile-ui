export const sizes = ['xs', 'sm', 'default', 'lg', 'icon-xs', 'icon-sm', 'icon', 'icon-lg'] as const;
export const variants = ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'] as const;
export const chartConfig = { requests: { label: 'Requests', color: 'var(--chart-1)' } };
export const chartData = [
	{ x: 'Mon', requests: 12 },
	{ x: 'Tue', requests: 24 },
	{ x: 'Wed', requests: 18 },
	{ x: 'Thu', requests: 32 },
];
export const chartSeries = [{ key: 'requests' }];
const now = Math.floor(Date.now() / 1000);
export const liveData = Array.from({ length: 61 }, (_, index) => ({ time: now - 60 + index, value: 100 + Math.sin(index / 6) * 4 + index / 5 }));
export const liveOptions = { data: liveData, value: liveData.at(-1)!.value, window: 60, grid: true, badge: true, pulse: false, momentum: false, paused: true };

// Test controls mutate the document root only, without re-rendering the app.
// The runner retains DOM references separately to detect accidental remounting.
export function exposeFixture(framework: string, toast: { success: (message: string, options: object) => unknown; dismissAll: () => void }) {
	Object.assign(window, {
		__themeFixture: {
			framework,
			setMode(mode: 'light' | 'dark', selector: 'class' | 'data-theme' = 'class') {
				const root = document.documentElement;
				root.classList.remove('light', 'dark');
				root.removeAttribute('data-theme');
				if (selector === 'class') root.classList.add(mode);
				else root.dataset.theme = mode;
			},
			showToast() {
				// Sonner uses nonpositive duration for persistent toasts; Infinity overflows setTimeout.
				toast.success('Theme saved', { id: 'theme-fixture-toast', duration: 0, description: 'Your current mode is preserved.' });
			},
			dismissToasts() {
				toast.dismissAll();
			},
		},
	});
	document.documentElement.dataset.fixtureReady = framework;
}
