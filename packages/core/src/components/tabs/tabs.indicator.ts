/** Browser-only measurement lifecycle; importing this module is safe during SSR. */
export function observeTabsIndicator(list: HTMLElement, indicator: HTMLElement): { update: () => void; disconnect: () => void } {
	const view = list.ownerDocument.defaultView;
	let disposed = false;
	let observed: HTMLElement[] = [];
	const resize = typeof ResizeObserver === 'undefined' ? undefined : new ResizeObserver(() => update());

	function update() {
		if (disposed) return;
		// A nested TabsList owns its own triggers and must never move this indicator.
		const triggers = Array.from(list.querySelectorAll<HTMLElement>('[role="tab"]')).filter((trigger) => trigger.closest('[role="tablist"]') === list);
		if (triggers.length !== observed.length || triggers.some((trigger, index) => trigger !== observed[index])) {
			resize?.disconnect();
			resize?.observe(list);
			triggers.forEach((trigger) => resize?.observe(trigger));
			observed = triggers;
		}
		const active = triggers.find((trigger) => trigger.getAttribute('aria-selected') === 'true');
		const rect = active?.getBoundingClientRect();
		if (!rect || !rect.width || !rect.height) {
			indicator.dataset.state = 'hidden';
			return;
		}
		const parent = list.getBoundingClientRect();
		// Convert viewport coordinates back to the list's padding box. Physical left
		// works for both LTR and RTL (including negative RTL scrollLeft), and vertical lists.
		const css = view?.getComputedStyle(list);
		const borderBoxSize = (axis: 'width' | 'height') => {
			const size = parseFloat(css?.[axis] ?? '');
			if (!Number.isFinite(size)) return axis === 'width' ? list.offsetWidth : list.offsetHeight;
			if (css?.boxSizing === 'border-box') return size;
			const sides = axis === 'width' ? (['Left', 'Right'] as const) : (['Top', 'Bottom'] as const);
			return (
				size +
				sides.reduce(
					(extra, side) =>
						extra +
						(parseFloat(css?.getPropertyValue(`padding-${side.toLowerCase()}`) ?? '') || 0) +
						(parseFloat(css?.getPropertyValue(`border-${side.toLowerCase()}-width`) ?? '') || 0),
					0,
				)
			);
		};
		// offsetWidth/Height round fractional tab widths and can distort the indicator.
		const width = borderBoxSize('width');
		const height = borderBoxSize('height');
		const scaleX = width ? parent.width / width || 1 : 1;
		const scaleY = height ? parent.height / height || 1 : 1;
		const values = {
			left: (rect.left - parent.left) / scaleX - list.clientLeft + list.scrollLeft,
			top: (rect.top - parent.top) / scaleY - list.clientTop + list.scrollTop,
			width: rect.width / scaleX,
			height: rect.height / scaleY,
		};
		for (const [key, value] of Object.entries(values)) {
			const property = `--tile-tabs-indicator-${key}`;
			const next = `${value}px`;
			if (indicator.style.getPropertyValue(property) !== next) indicator.style.setProperty(property, next);
		}
		indicator.dataset.state = 'visible';
	}

	const mutations =
		typeof MutationObserver === 'undefined'
			? undefined
			: new MutationObserver((records) => {
					if (
						records.some((record) => {
							const target = record.target.nodeType === 1 ? (record.target as Element) : record.target.parentElement;
							return target !== indicator && target?.closest('[role="tablist"]') === list;
						})
					)
						update();
				});
	mutations?.observe(list, {
		subtree: true,
		childList: true,
		characterData: true,
		attributes: true,
		attributeFilter: ['aria-selected', 'data-state', 'data-orientation', 'class', 'style', 'dir', 'hidden'],
	});
	resize?.observe(list);
	view?.addEventListener('resize', update);
	const fonts = list.ownerDocument.fonts;
	void fonts?.ready.then(() => update());
	fonts?.addEventListener('loadingdone', update);
	update();

	return {
		update,
		disconnect() {
			disposed = true;
			resize?.disconnect();
			mutations?.disconnect();
			view?.removeEventListener('resize', update);
			fonts?.removeEventListener('loadingdone', update);
			observed = [];
		},
	};
}
