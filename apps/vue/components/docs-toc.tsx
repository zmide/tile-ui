import { computed, defineComponent, onBeforeUnmount, onMounted, PropType, ref } from 'vue';

type TocItem = {
	title?: string;
	url: string;
	depth: number;
};

export const VueDocsToc = defineComponent({
	name: 'VueDocsToc',
	props: {
		toc: {
			type: Array as PropType<TocItem[]>,
			required: true,
		},
		variant: {
			type: String as PropType<'list' | 'dropdown'>,
			default: 'list',
		},
	},
	setup(props) {
		const open = ref(false);
		const activeHeading = ref<string | null>(null);
		const container = ref<HTMLElement | null>(null);
		let observer: IntersectionObserver | null = null;

		const links = computed(() =>
			props.toc.map((item) => ({
				...item,
				title: item.title ?? decodeURIComponent(item.url.replace(/^#/, '').replace(/-/g, ' ')),
			})),
		);

		onMounted(() => {
			observer = new IntersectionObserver(
				(entries) => {
					for (const entry of entries) {
						if (entry.isIntersecting) {
							activeHeading.value = entry.target.id;
						}
					}
				},
				{ rootMargin: '0% 0% -80% 0%' },
			);

			for (const item of props.toc) {
				const element = document.getElementById(item.url.replace(/^#/, ''));
				if (element) observer.observe(element);
			}

			const handlePointerDown = (event: MouseEvent) => {
				if (!container.value?.contains(event.target as Node)) {
					open.value = false;
				}
			};

			const handleEscape = (event: KeyboardEvent) => {
				if (event.key === 'Escape') open.value = false;
			};

			document.addEventListener('mousedown', handlePointerDown);
			document.addEventListener('keydown', handleEscape);

			onBeforeUnmount(() => {
				document.removeEventListener('mousedown', handlePointerDown);
				document.removeEventListener('keydown', handleEscape);
				observer?.disconnect();
			});
		});

		return () => {
			if (!links.value.length) return null;

			if (props.variant === 'dropdown') {
				return (
					<div ref={container} class="docs-toc-mobile">
						<button
							type="button"
							class="docs-toc-mobile__trigger"
							aria-expanded={open.value}
							onClick={() => {
								open.value = !open.value;
							}}>
							<span class="docs-toc-mobile__icon" aria-hidden="true">
								<svg viewBox="0 0 16 16" fill="none">
									<path d="M2.5 4.5H13.5M2.5 8H13.5M2.5 11.5H9.5" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" />
								</svg>
							</span>
							On This Page
						</button>
						{open.value ? (
							<div class="docs-toc-mobile__content">
								{links.value.map((item) => (
									<a
										key={item.url}
										href={item.url}
										class="docs-toc__link"
										data-active={item.url === `#${activeHeading.value}`}
										data-depth={item.depth}
										onClick={() => {
											open.value = false;
										}}>
										{item.title}
									</a>
								))}
							</div>
						) : null}
					</div>
				);
			}

			return (
				<div class="docs-toc">
					<p class="docs-toc__title">On This Page</p>
					{links.value.map((item) => (
						<a key={item.url} href={item.url} class="docs-toc__link" data-active={item.url === `#${activeHeading.value}`} data-depth={item.depth}>
							{item.title}
						</a>
					))}
				</div>
			);
		};
	},
});
