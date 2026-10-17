// 本文件由 scripts/build-docs.mjs 自动生成，请勿手动修改。
export type SolidDoc = { slug: string; url: string; title: string; description: string; html: string; toc: Array<{ depth: number; title: string; href: string }> };

export const solidDocs: SolidDoc[] = [
	{
		slug: '',
		url: '/docs',
		title: 'Introduction',
		description: 'Tile UI Solid brings the shared component system and installable registry to SolidJS applications.',
		html: '<p>Tile UI Solid brings the shared Tile UI logic and SCSS design system to SolidJS without disguising Solid’s fine-grained runtime. The site documents 62 production-built components and their installable registry source.</p>\n<h2 id="start-with-the-slice" tabindex="-1"><a class="header-anchor" href="#start-with-the-slice">Start with the slice</a></h2>\n<ul>\n<li><a href="/docs/installation">Installation</a> covers package and registry setup.</li>\n<li><a href="/docs/components">Components</a> lists the exact 62-item Solid registry.</li>\n<li><a href="/docs/registry">Registry</a> explains source ownership and generated output.</li>\n<li><a href="/docs/examples">Examples</a> demonstrates interactive component composition.</li>\n</ul>\n<h2 id="rendering-and-deployment" tabindex="-1"><a class="header-anchor" href="#rendering-and-deployment">Rendering and deployment</a></h2>\n<p>Components support client rendering, server rendering, hydration, and static generation. This documentation site is pre-rendered for static hosting, while the same <code>@tile-ui/solid</code> components can be used in client-only or server-rendered applications.</p>\n<h2 id="shared-not-flattened" tabindex="-1"><a class="header-anchor" href="#shared-not-flattened">Shared, not flattened</a></h2>\n<p>Component behavior comes from <code>@tile-ui/core</code>, visual tokens come from <code>@tile-ui/styles</code>, and the Solid wrappers keep native Solid props and event semantics. The docs use the established Tile UI layout with a warm amber Solid accent.</p>\n<h2 id="theme-resources" tabindex="-1"><a class="header-anchor" href="#theme-resources">Theme resources</a></h2>\n<ul>\n<li><a href="/docs/themes">Theme resources</a> - available appearances and detailed theme guides</li>\n</ul>\n',
		toc: [
			{
				depth: 2,
				title: 'Start with the slice',
				href: '#start-with-the-slice',
			},
			{
				depth: 2,
				title: 'Rendering and deployment',
				href: '#rendering-and-deployment',
			},
			{
				depth: 2,
				title: 'Shared, not flattened',
				href: '#shared-not-flattened',
			},
			{
				depth: 2,
				title: 'Theme resources',
				href: '#theme-resources',
			},
		],
	},
	{
		slug: 'installation',
		url: '/docs/installation',
		title: 'Installation',
		description: 'Install Tile UI Solid as a package or copy the current registry slice into a Solid application.',
		html: '<p>Choose the package when you want managed updates, or the registry when you want the component source in your application.</p>\n<h2 id="package-install" tabindex="-1"><a class="header-anchor" href="#package-install">Package install</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#953800;--shiki-dark:#B392F0">corepack</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> pnpm</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> add</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> @tile-ui/solid</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> @tile-ui/styles</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> solid-js</span></span>\n<span class="line"></span></code></pre><p>Import the shared global theme once near the application root:</p>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">import</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> \'@tile-ui/styles/scss/globals.scss\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">;</span></span>\n<span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">import</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> { Button } </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">from</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> \'@tile-ui/solid\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">;</span></span>\n<span class="line"></span></code></pre><p><code>globals.scss</code> includes Tile’s default palette and reset. Keep that entry for the default all-in-one setup, or use <code>@tile-ui/styles/theme.scss</code> and an optional <code>@tile-ui/styles/reset.scss</code> separately. If your application already owns the semantic palette, use only <code>@tile-ui/styles/tokens.scss</code>.</p>\n<p>See <a href="/docs/themes">Theme resources</a> for independent appearances and their dedicated setup guides.</p>\n<h2 id="registry-install" tabindex="-1"><a class="header-anchor" href="#registry-install">Registry install</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#953800;--shiki-dark:#B392F0">pnpm</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> dlx</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> shadcn@latest</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> add</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> https://solid.tileui.zmorg.cn/r/button.json</span></span>\n<span class="line"></span></code></pre><p>Registry items include the Solid source, module SCSS, and rewritten framework-independent helpers they depend on.</p>\n<p>Independent appearances are listed in <a href="/docs/themes">Theme resources</a>; follow the selected theme’s guide for registry installation.</p>\n<h2 id="solidstart-notes" tabindex="-1"><a class="header-anchor" href="#solidstart-notes">SolidStart notes</a></h2>\n<p>Tile UI Solid components support server rendering. Keep browser APIs inside event handlers, <code>onMount</code>, or guarded effects, and import the global theme from the application root so SSR and hydration receive the same CSS.</p>\n<h2 id="continue" tabindex="-1"><a class="header-anchor" href="#continue">Continue</a></h2>\n<ul>\n<li>Review the <a href="/docs/components">component inventory</a>.</li>\n<li>Inspect the <a href="/docs/registry">registry contract</a>.</li>\n</ul>\n',
		toc: [
			{
				depth: 2,
				title: 'Package install',
				href: '#package-install',
			},
			{
				depth: 2,
				title: 'Registry install',
				href: '#registry-install',
			},
			{
				depth: 2,
				title: 'SolidStart notes',
				href: '#solidstart-notes',
			},
			{
				depth: 2,
				title: 'Continue',
				href: '#continue',
			},
		],
	},
	{
		slug: 'theming',
		url: '/docs/theming',
		title: 'Theming',
		description: 'Configure Tile UI semantic variables, SolidStart global styles, dark mode, and scoped themes.',
		html: '<p>Tile UI Solid reads the same semantic CSS variables as the React and Vue packages. Import the global style entry once, then override variables at the application or subtree level.</p>\n<h2 id="style-entries" tabindex="-1"><a class="header-anchor" href="#style-entries">Style entries</a></h2>\n<table>\n<thead>\n<tr>\n<th>Entry</th>\n<th>Purpose</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>tokens.scss</code></td>\n<td>Tile-specific extension tokens only</td>\n</tr>\n<tr>\n<td><code>theme.scss</code></td>\n<td>Extension tokens plus optional light and dark defaults</td>\n</tr>\n<tr>\n<td><code>reset.scss</code></td>\n<td>Optional document reset and base styles</td>\n</tr>\n<tr>\n<td><code>globals.scss</code></td>\n<td>Theme and reset together</td>\n</tr>\n</tbody>\n</table>\n<h2 id="solidstart-setup" tabindex="-1"><a class="header-anchor" href="#solidstart-setup">SolidStart setup</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">import</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> \'@tile-ui/styles/scss/globals.scss\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">;</span></span>\n<span class="line"></span></code></pre><p>Import this from <code>src/app.tsx</code> so server rendering and hydration receive the same styles.</p>\n<p>For the default palette without a reset, use <code>@tile-ui/styles/theme.scss</code> instead. Add <code>@tile-ui/styles/reset.scss</code> only if needed. The equivalent compiled CSS entries are also available.</p>\n<h2 id="existing-shadcn-themes" tabindex="-1"><a class="header-anchor" href="#existing-shadcn-themes">Existing shadcn themes</a></h2>\n<p>When the application already defines shadcn semantic variables, import only Tile extension tokens:</p>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">import</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> \'@tile-ui/styles/scss/tokens.scss\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">;</span></span>\n<span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">import</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> \'./app.scss\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">;</span></span>\n<span class="line"></span></code></pre><h2 id="scoped-themes" tabindex="-1"><a class="header-anchor" href="#scoped-themes">Scoped themes</a></h2>\n<p>Custom properties inherit, so themes can be limited to a Solid subtree:</p>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0">.solid-workspace</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> {</span></span>\n<span class="line"><span style="--shiki-light:#953800;--shiki-dark:#FFAB70">\t--primary</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#0550AE;--shiki-dark:#79B8FF">oklch</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#0550AE;--shiki-dark:#79B8FF">0.56</span><span style="--shiki-light:#0550AE;--shiki-dark:#79B8FF"> 0.15</span><span style="--shiki-light:#0550AE;--shiki-dark:#79B8FF"> 70</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">);</span></span>\n<span class="line"><span style="--shiki-light:#953800;--shiki-dark:#FFAB70">\t--primary-foreground</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#0550AE;--shiki-dark:#79B8FF">white</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">;</span></span>\n<span class="line"><span style="--shiki-light:#953800;--shiki-dark:#FFAB70">\t--radius</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#0550AE;--shiki-dark:#79B8FF">0.8</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">rem</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">;</span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">}</span></span>\n<span class="line"></span></code></pre><h2 id="dark-mode" tabindex="-1"><a class="header-anchor" href="#dark-mode">Dark mode</a></h2>\n<p>Apply <code>.dark</code> or <code>[data-theme=\'dark\']</code> to <code>html</code>. Dialog portals mount under the document body and inherit variables from the root element.</p>\n<p>The default theme entry exposes light values on <code>:root</code>, <code>.light</code>, and <code>[data-theme=\'light\']</code>. System preference alone does not toggle these selectors; update the root class or attribute with your application’s mode manager.</p>\n<h2 id="registry-theme-selection" tabindex="-1"><a class="header-anchor" href="#registry-theme-selection">Registry theme selection</a></h2>\n<p>UI items depend on <code>@tile-ui/styles</code>, which copies shared Sass support and injects only Tile extension defaults. Keep your host semantic palette or explicitly choose the optional <code>@tile-ui/theme-default</code> item. Independent theme installation belongs to the selected theme’s guide in <a href="/docs/themes">Theme resources</a>.</p>\n<h2 id="contrast-and-aa-small-text" tabindex="-1"><a class="header-anchor" href="#contrast-and-aa-small-text">Contrast and AA small-text</a></h2>\n<p>Tile’s default theme ships the canonical shadcn palette unchanged. A few default-theme token combinations fall slightly below the WCAG AA small-text threshold (4.5:1): <code>--destructive</code> text on white or <code>#fafafa</code> (3.60–3.76:1), <code>--destructive-foreground</code> on <code>--destructive</code> (3.60:1), and <code>--muted-foreground</code> on <code>--muted</code> (4.39:1). These are upstream shadcn tradeoffs kept for palette parity.</p>\n<p>The accessibility browser check acknowledges exactly those verified <code>(app, route, pair)</code> combinations through an explicit allowlist and never blanket-skips contrast. For strict AA compliance, override the affected tokens, for example <code>--muted-foreground: oklch(0.5 0 0)</code> or <code>--destructive-foreground: #ffffff</code>.</p>\n<h2 id="related-docs" tabindex="-1"><a class="header-anchor" href="#related-docs">Related docs</a></h2>\n<ul>\n<li><a href="/docs/installation">Installation</a></li>\n<li><a href="/docs/registry/getting-started">Registry getting started</a></li>\n</ul>\n<h2 id="independent-themes-and-ownership" tabindex="-1"><a class="header-anchor" href="#independent-themes-and-ownership">Independent themes and ownership</a></h2>\n<p>Select an independent appearance by importing its CSS or Sass entry in the application, rather than adding a component prop or Provider. Do not load two competing palettes together. Keep shared component styles; replace only the palette entry. Applications own fonts, initial mode selection, persistence, and system preference handling.</p>\n<p>Themes own colors, typography, dimensions, borders, shadows, state appearance, and visual motion. Shared components expose generic CSS variables, attributes, and composition APIs without identifying any concrete theme. State, measurement, lifecycle, and Canvas repaint behavior belong to the framework, not a theme’s stylesheet.</p>\n<p>If a theme cannot express a visual requirement through the existing interfaces, request a reusable framework capability with unchanged defaults rather than introducing theme-specific runtime branches. A theme’s supported root markers and scoping guarantees are documented by that theme; arbitrary nested theme combinations are not implied.</p>\n<h3 id="charts-and-liveline" tabindex="-1"><a class="header-anchor" href="#charts-and-liveline">Charts and Liveline</a></h3>\n<p>SVG Chart consumes CSS variables; explicit per-mode configuration takes priority. When Liveline’s <code>theme</code> is omitted, it reads the stylesheet’s <code>--tile-color-mode</code> marker. Without a marker, its legacy dark default remains. Explicit <code>theme=&quot;light&quot;</code> or <code>theme=&quot;dark&quot;</code> wins. Mode changes repaint the existing Canvas without recreating it; there is no new <code>&quot;auto&quot;</code> value.</p>\n<h2 id="theme-resources" tabindex="-1"><a class="header-anchor" href="#theme-resources">Theme resources</a></h2>\n<ul>\n<li><a href="/docs/themes">Theme directory</a> - available themes and their detailed setup guides.</li>\n<li><a href="/docs/themes/kumo">Kumo</a> - independent CSS/Sass appearance with light and dark modes.</li>\n</ul>\n',
		toc: [
			{
				depth: 2,
				title: 'Style entries',
				href: '#style-entries',
			},
			{
				depth: 2,
				title: 'SolidStart setup',
				href: '#solidstart-setup',
			},
			{
				depth: 2,
				title: 'Existing shadcn themes',
				href: '#existing-shadcn-themes',
			},
			{
				depth: 2,
				title: 'Scoped themes',
				href: '#scoped-themes',
			},
			{
				depth: 2,
				title: 'Dark mode',
				href: '#dark-mode',
			},
			{
				depth: 2,
				title: 'Registry theme selection',
				href: '#registry-theme-selection',
			},
			{
				depth: 2,
				title: 'Contrast and AA small-text',
				href: '#contrast-and-aa-small-text',
			},
			{
				depth: 2,
				title: 'Related docs',
				href: '#related-docs',
			},
			{
				depth: 2,
				title: 'Independent themes and ownership',
				href: '#independent-themes-and-ownership',
			},
			{
				depth: 3,
				title: 'Charts and Liveline',
				href: '#charts-and-liveline',
			},
			{
				depth: 2,
				title: 'Theme resources',
				href: '#theme-resources',
			},
		],
	},
	{
		slug: 'themes',
		url: '/docs/themes',
		title: 'Theme resources',
		description: 'Available Tile UI themes and links to installation, mode switching, and compatibility guides.',
		html: '<p>Themes are opt-in stylesheets, not separate component implementations. Choose a theme from this directory and follow its detailed guide. For semantic variables, custom themes, default styles, and framework responsibilities, see <a href="/docs/theming">Theming</a>.</p>\n<table>\n<thead>\n<tr>\n<th>Resource</th>\n<th>Purpose</th>\n<th>Guide</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Default styles</td>\n<td>Existing semantic palette or Tile’s optional defaults</td>\n<td><a href="/docs/theming">Default setup and customization</a></td>\n</tr>\n<tr>\n<td>Kumo</td>\n<td>Independent SCSS-authored appearance, distributed as CSS and Sass, with runtime light/dark switching</td>\n<td><a href="/docs/themes/kumo">Kumo setup and compatibility</a></td>\n</tr>\n</tbody>\n</table>\n<p>Import one palette at the application entry. Shared component styles stay the same across themes. Theme selection does not change component APIs or install a JavaScript theme runtime.</p>\n',
		toc: [],
	},
	{
		slug: 'themes/kumo',
		url: '/docs/themes/kumo',
		title: 'Kumo',
		description: 'Install the independent Kumo theme, configure runtime light and dark modes, and understand compatibility and distribution.',
		html: '<p>Kumo is an optional appearance for Tile UI, maintained in <code>@tile-ui/theme-kumo</code>. It changes visual values, not the component implementation. Its only visual source is SCSS, compiled directly to CSS; React, Vue, and Solid consume the same stylesheet.</p>\n<h2 id="package-installation" tabindex="-1"><a class="header-anchor" href="#package-installation">Package installation</a></h2>\n<p>Install the independent theme package with <code>pnpm add @tile-ui/theme-kumo</code>. Shared component styles remain in <code>@tile-ui/styles</code>. The theme is authored in SCSS and exports only CSS/Sass; it has no JavaScript token API.</p>\n<p>Choose the global appearance at build time by importing Kumo <strong>instead of</strong> the default theme or globals entry:</p>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">import</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> \'@tile-ui/theme-kumo/theme.css\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">;</span></span>\n<span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">import</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> \'@tile-ui/styles/reset.css\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">; </span><span style="--shiki-light:#6E7781;--shiki-dark:#6A737D">// Optional; omit if your application already has a reset.</span></span>\n<span class="line"></span></code></pre><p>For a Sass pipeline, replace the CSS import with <code>import \'@tile-ui/theme-kumo/theme.scss\'</code>. Kumo includes Tile extension defaults and Kumo light/dark tokens, not the default palette or reset. A separate tokens import is unnecessary. Do not combine Kumo with <code>theme.*</code> or <code>globals.*</code>: globals loads Tile’s default palette, not a theme-neutral base.</p>\n<p>Toggle <code>.light</code>/<code>.dark</code> or <code>data-theme=&quot;light&quot;</code>/<code>data-theme=&quot;dark&quot;</code> on <code>html</code> at runtime; keep the markers consistent if using both. No theme provider, <code>data-tile-theme</code> attribute, or dynamic stylesheet swap is required. Resolve system preference in your existing application mode manager and update the root marker, so body-level portals inherit the same mode.</p>\n<p>Tile component prop names and defaults remain unchanged; the complete Kumo variant/component API is not mirrored. Fonts are not fetched automatically: load any desired fonts through local assets or your own font setup. <code>createThemeVariables</code> and <code>applyThemeVariables</code> from <code>@tile-ui/core</code> still produce Tile default concrete values, so do not call them for Kumo class/attribute mode toggles; inline values can override the selected stylesheet.</p>\n<p>This is a Kumo-derived appearance, not verified pixel parity or a complete accessibility audit. The default-palette contrast figures in the general theming guide do not validate Kumo contrast.</p>\n<h3 id="charts-and-liveline" tabindex="-1"><a class="header-anchor" href="#charts-and-liveline">Charts and Liveline</a></h3>\n<p>SVG Chart reads CSS variables; an explicit per-mode color in its config still takes priority. Liveline with an omitted <code>theme</code> inherits the stylesheet’s <code>--tile-color-mode</code> marker (Kumo sets light/dark). Without that marker it preserves the legacy dark default. Explicit <code>theme=&quot;light&quot;</code> or <code>theme=&quot;dark&quot;</code> always wins; there is no new <code>&quot;auto&quot;</code> value. Root mode changes repaint an existing Liveline canvas without recreating it.</p>\n<h2 id="registry-installation" tabindex="-1"><a class="header-anchor" href="#registry-installation">Registry installation</a></h2>\n<p>UI items depend on <code>@tile-ui/styles</code>, which copies Sass support files and injects only Tile extension defaults; the host still owns the semantic palette. Keep the optional <code>@tile-ui/theme-default</code> item for Tile’s default palette, or choose Kumo explicitly:</p>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#953800;--shiki-dark:#B392F0">pnpm</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> dlx</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> shadcn@latest</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> add</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> @tile-ui/theme-kumo</span></span>\n<span class="line"></span></code></pre><p>The Kumo item depends on <code>@tile-ui/styles</code> and copies <code>styles/themes/kumo.scss</code>, the <code>_shared.scss</code>, <code>_light.scss</code>, and <code>_dark.scss</code> partials, and <code>styles/themes/LICENSE.kumo</code> (retain this MIT license and Cloudflare notice). It does not inject Kumo <code>cssVars</code>, import itself, or swap the host theme automatically. Explicitly import the copied <code>styles/themes/kumo.scss</code> once from your root entry with the appropriate local path. Do not import the theme partials separately, and remove default-theme/globals imports and conflicting host palette declarations when adopting Kumo.</p>\n<h2 id="runtime-mode-switching-and-first-paint" tabindex="-1"><a class="header-anchor" href="#runtime-mode-switching-and-first-paint">Runtime mode switching and first paint</a></h2>\n<p>Use a single root marker convention. For example, application-side browser code can update the attribute without loading another stylesheet:</p>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">document.documentElement.</span><span style="--shiki-light:#8250DF;--shiki-dark:#B392F0">setAttribute</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">\'data-theme\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">, </span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">\'dark\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">);</span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">document.documentElement.</span><span style="--shiki-light:#8250DF;--shiki-dark:#B392F0">setAttribute</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">\'data-theme\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">, </span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">\'light\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">);</span></span>\n<span class="line"></span></code></pre><p>Light is the default. Resolve system preference with your application’s mode manager and apply the resolved root marker before first paint where possible. Keep server markup and client hydration consistent. Persistence and system-preference listeners are application concerns, not part of the theme package.</p>\n<p>Apply the marker to <code>html</code> so body-level portals inherit it. Explicit light/dark resets are provided, but arbitrary nested themes are not a compatibility guarantee.</p>\n<h2 id="customization-and-scope" tabindex="-1"><a class="header-anchor" href="#customization-and-scope">Customization and scope</a></h2>\n<p>Override semantic and component CSS custom properties in an application stylesheet after the theme. The theme covers palette, dimensions, typography, borders, shadows, state styling, and visual motion; it does not copy component CSS or add behavior. For example:</p>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0">:root</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> {</span></span>\n<span class="line"><span style="--shiki-light:#953800;--shiki-dark:#FFAB70">  --tile-font-sans</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">\'Avenir Next\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">, </span><span style="--shiki-light:#0550AE;--shiki-dark:#79B8FF">sans-serif</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">;</span></span>\n<span class="line"><span style="--shiki-light:#953800;--shiki-dark:#FFAB70">  --tile-button-height</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#0550AE;--shiki-dark:#79B8FF">2.5</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">rem</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">;</span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">}</span></span>\n<span class="line"></span></code></pre><p>Use existing Tile component APIs for composition and interaction. Any missing state, structure, measurement, or drawing capability must be supplied as a generic framework interface, not theme JavaScript.</p>\n<h2 id="compatibility-and-validation-limits" tabindex="-1"><a class="header-anchor" href="#compatibility-and-validation-limits">Compatibility and validation limits</a></h2>\n<p>Card, Tooltip, Skeleton, Spinner, Calendar, and chart rendering retain Tile’s structure and engines, so some upstream visual differences remain. The theme does not promise complete upstream component or variant parity. Chromium checks cover selected states and mode switching, not every browser or a complete accessibility audit.</p>\n<p>Accessibility corrections intentionally differ from the reference: light link text is darker, dark links use the semantic text-link value, inactive light Tabs use a higher-contrast neutral, and keyboard focus rings are retained. Verify your own overrides and content for contrast and focus visibility.</p>\n<h2 id="source-and-license" tabindex="-1"><a class="header-anchor" href="#source-and-license">Source and license</a></h2>\n<p>The reference is <a href="https://github.com/cloudflare/kumo/tree/7e0ff40546f08405d05bc9754f0ff0fd009ece0a">Cloudflare Kumo</a>, pinned to <code>7e0ff40546f08405d05bc9754f0ff0fd009ece0a</code>. The theme package’s <code>LICENSE</code> contains the complete upstream MIT notice. Preserve that file when redistributing the theme; registry installation carries it as <code>styles/themes/LICENSE.kumo</code>.</p>\n<h2 id="related-resources" tabindex="-1"><a class="header-anchor" href="#related-resources">Related resources</a></h2>\n<ul>\n<li><a href="/docs/themes">Theme resources</a></li>\n<li><a href="/docs/theming">Theming and custom visual interfaces</a></li>\n<li><a href="/docs/installation">Installation</a></li>\n</ul>\n',
		toc: [
			{
				depth: 2,
				title: 'Package installation',
				href: '#package-installation',
			},
			{
				depth: 3,
				title: 'Charts and Liveline',
				href: '#charts-and-liveline',
			},
			{
				depth: 2,
				title: 'Registry installation',
				href: '#registry-installation',
			},
			{
				depth: 2,
				title: 'Runtime mode switching and first paint',
				href: '#runtime-mode-switching-and-first-paint',
			},
			{
				depth: 2,
				title: 'Customization and scope',
				href: '#customization-and-scope',
			},
			{
				depth: 2,
				title: 'Compatibility and validation limits',
				href: '#compatibility-and-validation-limits',
			},
			{
				depth: 2,
				title: 'Source and license',
				href: '#source-and-license',
			},
			{
				depth: 2,
				title: 'Related resources',
				href: '#related-resources',
			},
		],
	},
	{
		slug: 'primitives',
		url: '/docs/primitives',
		title: 'Primitives',
		description: 'Owner-scoped SolidJS signals for storage, media, clipboard, pointer, keyboard, and window state.',
		html: '<h2 id="introduction" tabindex="-1"><a class="header-anchor" href="#introduction">Introduction</a></h2>\n<p>Tile UI primitives are small Solid-native <code>create*</code> APIs for browser state that must remain safe during server rendering. Import all 11 APIs from the canonical <code>@tile-ui/solid/primitives</code> subpath, not the component package root.</p>\n<p>The package exposes all 11 primitives. The current registry lane publishes three smaller helper payloads covering eight of them; <code>createClickOutside</code>, <code>createKeyPress</code>, and <code>createMousePosition</code> remain package-only in this registry lane.</p>\n<h2 id="package-install" tabindex="-1"><a class="header-anchor" href="#package-install">Package install</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#953800;--shiki-dark:#B392F0">corepack</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> pnpm</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> add</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> @tile-ui/solid</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> solid-js</span></span>\n<span class="line"></span></code></pre><h2 id="package-usage" tabindex="-1"><a class="header-anchor" href="#package-usage">Package usage</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">import</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> { createIsMobile, createLocalStorage, createWindowSize } </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">from</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> \'@tile-ui/solid/primitives\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">const</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> [</span><span style="--shiki-light:#0550AE;--shiki-dark:#79B8FF">theme</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">, </span><span style="--shiki-light:#0550AE;--shiki-dark:#79B8FF">setTheme</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">] </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#8250DF;--shiki-dark:#B392F0"> createLocalStorage</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">\'theme\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">, </span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">\'light\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">);</span></span>\n<span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">const</span><span style="--shiki-light:#0550AE;--shiki-dark:#79B8FF"> isMobile</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583"> =</span><span style="--shiki-light:#8250DF;--shiki-dark:#B392F0"> createIsMobile</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">();</span></span>\n<span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">const</span><span style="--shiki-light:#0550AE;--shiki-dark:#79B8FF"> windowSize</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583"> =</span><span style="--shiki-light:#8250DF;--shiki-dark:#B392F0"> createWindowSize</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">();</span></span>\n<span class="line"></span></code></pre><p>Call primitives while a Solid owner is active, such as inside a component or <code>createRoot</code>. Accessors update after hydration without changing the deterministic server markup.</p>\n<h2 id="ssr-contract" tabindex="-1"><a class="header-anchor" href="#ssr-contract">SSR contract</a></h2>\n<p>Primitives do not read browser globals while rendering on the server. <code>createWindowSize</code>, <code>createScrollPosition</code>, and <code>createMousePosition</code> start at <code>{ x: 0, y: 0 }</code> or <code>{ width: 0, height: 0 }</code>; <code>createMediaQuery</code> and <code>createIsMobile</code> start at <code>false</code>; <code>createOnlineStatus</code> starts at <code>true</code>; storage primitives use their supplied eager or lazy default. Clipboard, key, and outside-click work begins only in the browser.</p>\n<h2 id="cleanup-contract" tabindex="-1"><a class="header-anchor" href="#cleanup-contract">Cleanup contract</a></h2>\n<p>Every listener, media-query subscription, and clipboard reset timer belongs to the current Solid owner. Disposing that owner removes its subscriptions; remounting creates a fresh set. The demo’s <strong>Dispose owner</strong> control makes that lifecycle visible without keeping a hidden component alive.</p>\n<h2 id="primitive-groups" tabindex="-1"><a class="header-anchor" href="#primitive-groups">Primitive groups</a></h2>\n<h3 id="storage" tabindex="-1"><a class="header-anchor" href="#storage">Storage</a></h3>\n<ul>\n<li><code>createLocalStorage(key, defaultValue)</code> returns an accessor and setter synchronized with <code>localStorage</code> after mount.</li>\n<li><code>createSessionStorage(key, defaultValue)</code> provides the same contract for the current tab’s <code>sessionStorage</code>.</li>\n</ul>\n<h3 id="media-and-window" tabindex="-1"><a class="header-anchor" href="#media-and-window">Media and window</a></h3>\n<ul>\n<li><code>createWindowSize()</code> tracks <code>window.innerWidth</code> and <code>window.innerHeight</code>.</li>\n<li><code>createMediaQuery(query)</code> accepts a string or accessor and follows <code>matchMedia</code> changes.</li>\n<li><code>createIsMobile()</code> is the shared <code>(max-width: 768px)</code> media query.</li>\n<li><code>createOnlineStatus()</code> tracks <code>navigator.onLine</code> plus online and offline events.</li>\n<li><code>createScrollPosition()</code> tracks the window’s horizontal and vertical scroll offsets.</li>\n<li><code>createMousePosition()</code> tracks client-space mouse coordinates.</li>\n</ul>\n<h3 id="events" tabindex="-1"><a class="header-anchor" href="#events">Events</a></h3>\n<ul>\n<li><code>createCopyToClipboard(options)</code> returns <code>copy</code>, <code>copied</code>, and <code>error</code> using the secure Clipboard API.</li>\n<li><code>createKeyPress(key, callback)</code> listens for an exact, optionally reactive <code>event.key</code> value.</li>\n<li><code>createClickOutside(element, callback)</code> accepts an <code>Accessor&lt;Element | null | undefined&gt;</code> and observes mouse and touch starts in that element’s owning document.</li>\n</ul>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">import</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> { </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">type</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> Accessor, createSignal } </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">from</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> \'solid-js\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">;</span></span>\n<span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">import</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> { createClickOutside } </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">from</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> \'@tile-ui/solid/primitives\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">const</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> [</span><span style="--shiki-light:#0550AE;--shiki-dark:#79B8FF">open</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">, </span><span style="--shiki-light:#0550AE;--shiki-dark:#79B8FF">setOpen</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">] </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#8250DF;--shiki-dark:#B392F0"> createSignal</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#0550AE;--shiki-dark:#79B8FF">true</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">);</span></span>\n<span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">let</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> panel</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">:</span><span style="--shiki-light:#953800;--shiki-dark:#B392F0"> HTMLDivElement</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583"> |</span><span style="--shiki-light:#0550AE;--shiki-dark:#79B8FF"> undefined</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">;</span></span>\n<span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">const</span><span style="--shiki-light:#8250DF;--shiki-dark:#B392F0"> panelElement</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">:</span><span style="--shiki-light:#953800;--shiki-dark:#B392F0"> Accessor</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#953800;--shiki-dark:#B392F0">Element</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583"> |</span><span style="--shiki-light:#0550AE;--shiki-dark:#79B8FF"> null</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583"> |</span><span style="--shiki-light:#0550AE;--shiki-dark:#79B8FF"> undefined</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">> </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> () </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=></span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> panel;</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#8250DF;--shiki-dark:#B392F0">createClickOutside</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">(panelElement, () </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=></span><span style="--shiki-light:#8250DF;--shiki-dark:#B392F0"> setOpen</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#0550AE;--shiki-dark:#79B8FF">false</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">));</span></span>\n<span class="line"></span></code></pre><h2 id="registry-install" tabindex="-1"><a class="header-anchor" href="#registry-install">Registry install</a></h2>\n<p>The registry exposes three focused helper payloads. These do not install every package primitive:</p>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#953800;--shiki-dark:#B392F0">pnpm</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> dlx</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> shadcn@latest</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> add</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> https://solid.tileui.zmorg.cn/r/create-local-storage.json</span></span>\n<span class="line"><span style="--shiki-light:#953800;--shiki-dark:#B392F0">pnpm</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> dlx</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> shadcn@latest</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> add</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> https://solid.tileui.zmorg.cn/r/create-media-query.json</span></span>\n<span class="line"><span style="--shiki-light:#953800;--shiki-dark:#B392F0">pnpm</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> dlx</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> shadcn@latest</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> add</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> https://solid.tileui.zmorg.cn/r/create-copy-to-clipboard.json</span></span>\n<span class="line"></span></code></pre><table>\n<thead>\n<tr>\n<th>Registry item</th>\n<th>Included helpers</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>create-local-storage</code></td>\n<td><code>createLocalStorage</code>, <code>createSessionStorage</code></td>\n</tr>\n<tr>\n<td><code>create-media-query</code></td>\n<td><code>createWindowSize</code>, <code>createMediaQuery</code>, <code>createIsMobile</code>, <code>createOnlineStatus</code>, <code>createScrollPosition</code></td>\n</tr>\n<tr>\n<td><code>create-copy-to-clipboard</code></td>\n<td><code>createCopyToClipboard</code></td>\n</tr>\n</tbody>\n</table>\n<p>The exact registry install names are <code>create-local-storage</code>, <code>create-media-query</code>, and <code>create-copy-to-clipboard</code>. Use the package subpath for <code>createClickOutside</code>, <code>createKeyPress</code>, and <code>createMousePosition</code>; those three APIs are package-only in this registry lane.</p>\n<h2 id="api-reference" tabindex="-1"><a class="header-anchor" href="#api-reference">API reference</a></h2>\n<table>\n<thead>\n<tr>\n<th>API</th>\n<th>Return</th>\n<th>Browser work</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>createLocalStorage&lt;T&gt;(key, defaultValue?)</code></td>\n<td><code>[Accessor&lt;T&gt;, Setter&lt;T&gt;]</code></td>\n<td>Reads and writes <code>localStorage</code></td>\n</tr>\n<tr>\n<td><code>createSessionStorage&lt;T&gt;(key, defaultValue?)</code></td>\n<td><code>[Accessor&lt;T&gt;, Setter&lt;T&gt;]</code></td>\n<td>Reads and writes <code>sessionStorage</code></td>\n</tr>\n<tr>\n<td><code>createWindowSize()</code></td>\n<td><code>Accessor&lt;WindowSize&gt;</code></td>\n<td>Subscribes to <code>resize</code></td>\n</tr>\n<tr>\n<td><code>createMediaQuery(query)</code></td>\n<td><code>Accessor&lt;boolean&gt;</code></td>\n<td>Subscribes to <code>MediaQueryList.change</code></td>\n</tr>\n<tr>\n<td><code>createIsMobile()</code></td>\n<td><code>Accessor&lt;boolean&gt;</code></td>\n<td>Uses the shared mobile media query</td>\n</tr>\n<tr>\n<td><code>createOnlineStatus()</code></td>\n<td><code>Accessor&lt;boolean&gt;</code></td>\n<td>Subscribes to <code>online</code> and <code>offline</code></td>\n</tr>\n<tr>\n<td><code>createScrollPosition()</code></td>\n<td><code>Accessor&lt;Point&gt;</code></td>\n<td>Subscribes to passive <code>scroll</code></td>\n</tr>\n<tr>\n<td><code>createMousePosition()</code></td>\n<td><code>Accessor&lt;Point&gt;</code></td>\n<td>Subscribes to <code>mousemove</code></td>\n</tr>\n<tr>\n<td><code>createCopyToClipboard(options?)</code></td>\n<td><code>{ copy, copied, error }</code></td>\n<td>Calls <code>navigator.clipboard.writeText</code></td>\n</tr>\n<tr>\n<td><code>createKeyPress(key, callback)</code></td>\n<td><code>void</code></td>\n<td>Subscribes to <code>window.keydown</code></td>\n</tr>\n<tr>\n<td><code>createClickOutside(element, callback)</code></td>\n<td><code>void</code></td>\n<td>Accepts <code>Accessor&lt;Element | null | undefined&gt;</code> and subscribes to owner-document mouse and touch starts</td>\n</tr>\n</tbody>\n</table>\n<p>Supporting types exported by the same subpath are <code>StorageDefaultValue</code>, <code>StorageSignal</code>, <code>WindowSize</code>, <code>Point</code>, <code>ReactiveValue</code>, <code>CopyToClipboardOptions</code>, <code>CopyToClipboardResult</code>, <code>ElementAccessor</code>, and <code>KeyValue</code>.</p>\n<h2 id="related-docs" tabindex="-1"><a class="header-anchor" href="#related-docs">Related docs</a></h2>\n<ul>\n<li><a href="/docs/installation">Installation</a></li>\n<li><a href="/docs/components">Components</a></li>\n<li><a href="/docs/registry">Registry</a></li>\n</ul>\n',
		toc: [
			{
				depth: 2,
				title: 'Introduction',
				href: '#introduction',
			},
			{
				depth: 2,
				title: 'Package install',
				href: '#package-install',
			},
			{
				depth: 2,
				title: 'Package usage',
				href: '#package-usage',
			},
			{
				depth: 2,
				title: 'SSR contract',
				href: '#ssr-contract',
			},
			{
				depth: 2,
				title: 'Cleanup contract',
				href: '#cleanup-contract',
			},
			{
				depth: 2,
				title: 'Primitive groups',
				href: '#primitive-groups',
			},
			{
				depth: 3,
				title: 'Storage',
				href: '#storage',
			},
			{
				depth: 3,
				title: 'Media and window',
				href: '#media-and-window',
			},
			{
				depth: 3,
				title: 'Events',
				href: '#events',
			},
			{
				depth: 2,
				title: 'Registry install',
				href: '#registry-install',
			},
			{
				depth: 2,
				title: 'API reference',
				href: '#api-reference',
			},
			{
				depth: 2,
				title: 'Related docs',
				href: '#related-docs',
			},
		],
	},
	{
		slug: 'components',
		url: '/docs/components',
		title: 'Components',
		description: 'The complete 62-component SolidJS registry with interactive demos and generated API references.',
		html: '<p>The Solid registry contains 62 UI items. Every item has an interactive demo, a dedicated API reference, and support for client rendering, server rendering, and static generation.</p>\n<h2 id="actions" tabindex="-1"><a class="header-anchor" href="#actions">Actions</a></h2>\n<ul>\n<li><a href="/docs/components/button">Button</a></li>\n<li><a href="/docs/components/button-group">Button Group</a></li>\n<li><a href="/docs/components/toggle">Toggle</a></li>\n<li><a href="/docs/components/toggle-group">Toggle Group</a></li>\n<li><a href="/docs/components/attachment">Attachment</a></li>\n<li><a href="/docs/components/accordion">Accordion</a></li>\n<li><a href="/docs/components/collapsible">Collapsible</a></li>\n</ul>\n<h2 id="forms" tabindex="-1"><a class="header-anchor" href="#forms">Forms</a></h2>\n<ul>\n<li><a href="/docs/components/input">Input</a></li>\n<li><a href="/docs/components/input-group">Input Group</a></li>\n<li><a href="/docs/components/input-otp">Input OTP</a></li>\n<li><a href="/docs/components/label">Label</a></li>\n<li><a href="/docs/components/field">Field</a></li>\n<li><a href="/docs/components/form">Form</a></li>\n<li><a href="/docs/components/checkbox">Checkbox</a></li>\n<li><a href="/docs/components/native-select">Native Select</a></li>\n<li><a href="/docs/components/radio-group">Radio Group</a></li>\n<li><a href="/docs/components/slider">Slider</a></li>\n<li><a href="/docs/components/switch">Switch</a></li>\n<li><a href="/docs/components/textarea">Textarea</a></li>\n<li><a href="/docs/components/calendar">Calendar</a></li>\n<li><a href="/docs/components/select">Select</a></li>\n<li><a href="/docs/components/combobox">Combobox</a></li>\n<li><a href="/docs/components/command">Command</a></li>\n</ul>\n<h2 id="data-display" tabindex="-1"><a class="header-anchor" href="#data-display">Data display</a></h2>\n<ul>\n<li><a href="/docs/components/badge">Badge</a></li>\n<li><a href="/docs/components/alert">Alert</a></li>\n<li><a href="/docs/components/aspect-ratio">Aspect Ratio</a></li>\n<li><a href="/docs/components/avatar">Avatar</a></li>\n<li><a href="/docs/components/bubble">Bubble</a></li>\n<li><a href="/docs/components/card">Card</a></li>\n<li><a href="/docs/components/empty">Empty</a></li>\n<li><a href="/docs/components/item">Item</a></li>\n<li><a href="/docs/components/kbd">Kbd</a></li>\n<li><a href="/docs/components/marker">Marker</a></li>\n<li><a href="/docs/components/progress">Progress</a></li>\n<li><a href="/docs/components/separator">Separator</a></li>\n<li><a href="/docs/components/skeleton">Skeleton</a></li>\n<li><a href="/docs/components/spinner">Spinner</a></li>\n<li><a href="/docs/components/table">Table</a></li>\n<li><a href="/docs/components/message">Message</a></li>\n<li><a href="/docs/components/message-scroller">Message Scroller</a></li>\n<li><a href="/docs/components/chart">Chart</a></li>\n<li><a href="/docs/components/liveline">Liveline</a></li>\n<li><a href="/docs/components/sonner">Sonner</a></li>\n</ul>\n<h2 id="navigation" tabindex="-1"><a class="header-anchor" href="#navigation">Navigation</a></h2>\n<ul>\n<li><a href="/docs/components/breadcrumb">Breadcrumb</a></li>\n<li><a href="/docs/components/pagination">Pagination</a></li>\n<li><a href="/docs/components/tabs">Tabs</a></li>\n<li><a href="/docs/components/dropdown-menu">Dropdown Menu</a></li>\n<li><a href="/docs/components/context-menu">Context Menu</a></li>\n<li><a href="/docs/components/menubar">Menubar</a></li>\n<li><a href="/docs/components/navigation-menu">Navigation Menu</a></li>\n<li><a href="/docs/components/carousel">Carousel</a></li>\n<li><a href="/docs/components/sidebar">Sidebar</a></li>\n</ul>\n<h2 id="overlays" tabindex="-1"><a class="header-anchor" href="#overlays">Overlays</a></h2>\n<ul>\n<li><a href="/docs/components/dialog">Dialog</a></li>\n<li><a href="/docs/components/alert-dialog">Alert Dialog</a></li>\n<li><a href="/docs/components/drawer">Drawer</a></li>\n<li><a href="/docs/components/sheet">Sheet</a></li>\n<li><a href="/docs/components/popover">Popover</a></li>\n<li><a href="/docs/components/hover-card">Hover Card</a></li>\n<li><a href="/docs/components/tooltip">Tooltip</a></li>\n</ul>\n<h2 id="layout-and-internationalization" tabindex="-1"><a class="header-anchor" href="#layout-and-internationalization">Layout and internationalization</a></h2>\n<ul>\n<li><a href="/docs/components/direction">Direction</a></li>\n<li><a href="/docs/components/scroll-area">Scroll Area</a></li>\n<li><a href="/docs/components/resizable">Resizable</a></li>\n</ul>\n',
		toc: [
			{
				depth: 2,
				title: 'Actions',
				href: '#actions',
			},
			{
				depth: 2,
				title: 'Forms',
				href: '#forms',
			},
			{
				depth: 2,
				title: 'Data display',
				href: '#data-display',
			},
			{
				depth: 2,
				title: 'Navigation',
				href: '#navigation',
			},
			{
				depth: 2,
				title: 'Overlays',
				href: '#overlays',
			},
			{
				depth: 2,
				title: 'Layout and internationalization',
				href: '#layout-and-internationalization',
			},
		],
	},
	{
		slug: 'components/accordion',
		url: '/docs/components/accordion',
		title: 'Accordion',
		description: 'Accessible SolidJS accordion primitives with deterministic IDs and keyboard navigation.',
		html: '<blockquote>\n<p>Use Accordion to organize related disclosure sections with predictable keyboard movement.</p>\n</blockquote>\n<h2 id="registry-install" tabindex="-1"><a class="header-anchor" href="#registry-install">Registry install</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#953800;--shiki-dark:#B392F0">pnpm</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> dlx</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> shadcn@latest</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> add</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> @tile-ui/accordion</span></span>\n<span class="line"></span></code></pre><h2 id="package-usage" tabindex="-1"><a class="header-anchor" href="#package-usage">Package usage</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">import</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> { Accordion, AccordionItem, AccordionTrigger, AccordionContent } </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">from</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> \'@tile-ui/solid\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Accordion</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> type</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"single"</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> defaultValue</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"one"</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> collapsible</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">AccordionItem</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> value</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"one"</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">AccordionTrigger</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>Section one&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">AccordionTrigger</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">AccordionContent</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>Content one.&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">AccordionContent</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">AccordionItem</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Accordion</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"></span></code></pre><h2 id="highlights" tabindex="-1"><a class="header-anchor" href="#highlights">Highlights</a></h2>\n<ul>\n<li>Single and multiple disclosure modes</li>\n<li>Disabled-aware roving focus</li>\n<li>Stable custom or generated trigger/content IDs</li>\n</ul>\n<h2 id="registry-dependencies" tabindex="-1"><a class="header-anchor" href="#registry-dependencies">Registry dependencies</a></h2>\n<table>\n<thead>\n<tr>\n<th>Item</th>\n<th>Purpose</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>accordion</code></td>\n<td>Component source and module styles</td>\n</tr>\n<tr>\n<td><code>core</code></td>\n<td>Framework-agnostic logic helpers</td>\n</tr>\n<tr>\n<td><code>utils</code></td>\n<td>Shared utility helpers</td>\n</tr>\n<tr>\n<td><code>styles</code></td>\n<td>Shared SCSS tokens and globals</td>\n</tr>\n</tbody>\n</table>\n<h2 id="api-reference" tabindex="-1"><a class="header-anchor" href="#api-reference">API reference</a></h2>\n<h3 id="accordion" tabindex="-1"><a class="header-anchor" href="#accordion">Accordion</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>type</code></td>\n<td><code>\'single\' | \'multiple\'</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>value</code></td>\n<td><code>string | string[]</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>defaultValue</code></td>\n<td><code>string | string[]</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>onValueChange</code></td>\n<td><code>(value: string | string[]) =&gt; void</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>collapsible</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>ref</code></td>\n<td><code>AccordionRef&lt;HTMLDivElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="accordionitem" tabindex="-1"><a class="header-anchor" href="#accordionitem">AccordionItem</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>value</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>disabled</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>triggerId</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>contentId</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>ref</code></td>\n<td><code>AccordionRef&lt;HTMLDivElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="accordiontrigger" tabindex="-1"><a class="header-anchor" href="#accordiontrigger">AccordionTrigger</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>ref</code></td>\n<td><code>AccordionRef&lt;HTMLButtonElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="accordioncontent" tabindex="-1"><a class="header-anchor" href="#accordioncontent">AccordionContent</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>ref</code></td>\n<td><code>AccordionRef&lt;HTMLDivElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h2 id="related-docs" tabindex="-1"><a class="header-anchor" href="#related-docs">Related docs</a></h2>\n<ul>\n<li><a href="/docs/components/collapsible">Collapsible</a></li>\n<li><a href="/docs/components/tabs">Tabs</a></li>\n<li><a href="/docs/components/dialog">Dialog</a></li>\n</ul>\n',
		toc: [
			{
				depth: 2,
				title: 'Registry install',
				href: '#registry-install',
			},
			{
				depth: 2,
				title: 'Package usage',
				href: '#package-usage',
			},
			{
				depth: 2,
				title: 'Highlights',
				href: '#highlights',
			},
			{
				depth: 2,
				title: 'Registry dependencies',
				href: '#registry-dependencies',
			},
			{
				depth: 2,
				title: 'API reference',
				href: '#api-reference',
			},
			{
				depth: 3,
				title: 'Accordion',
				href: '#accordion',
			},
			{
				depth: 3,
				title: 'AccordionItem',
				href: '#accordionitem',
			},
			{
				depth: 3,
				title: 'AccordionTrigger',
				href: '#accordiontrigger',
			},
			{
				depth: 3,
				title: 'AccordionContent',
				href: '#accordioncontent',
			},
			{
				depth: 2,
				title: 'Related docs',
				href: '#related-docs',
			},
		],
	},
	{
		slug: 'components/alert',
		url: '/docs/components/alert',
		title: 'Alert',
		description: 'Accessible SolidJS alert primitives for important status messages.',
		html: '<blockquote>\n<p>Use Alert for important information that should be announced immediately.</p>\n</blockquote>\n<h2 id="registry-install" tabindex="-1"><a class="header-anchor" href="#registry-install">Registry install</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#953800;--shiki-dark:#B392F0">pnpm</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> dlx</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> shadcn@latest</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> add</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> @tile-ui/alert</span></span>\n<span class="line"></span></code></pre><h2 id="package-usage" tabindex="-1"><a class="header-anchor" href="#package-usage">Package usage</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">import</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> { Alert, AlertTitle, AlertDescription } </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">from</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> \'@tile-ui/solid\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Alert</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> variant</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"destructive"</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">AlertTitle</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>Heads up&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">AlertTitle</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">AlertDescription</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>Your session expires in 5 minutes.&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">AlertDescription</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Alert</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"></span></code></pre><h2 id="highlights" tabindex="-1"><a class="header-anchor" href="#highlights">Highlights</a></h2>\n<ul>\n<li>Default and destructive variants</li>\n<li>Title and description</li>\n<li>Pairs with Card and Form</li>\n</ul>\n<h2 id="registry-dependencies" tabindex="-1"><a class="header-anchor" href="#registry-dependencies">Registry dependencies</a></h2>\n<table>\n<thead>\n<tr>\n<th>Item</th>\n<th>Purpose</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>alert</code></td>\n<td>Component source and module styles</td>\n</tr>\n<tr>\n<td><code>core</code></td>\n<td>Framework-agnostic logic helpers</td>\n</tr>\n<tr>\n<td><code>styles</code></td>\n<td>Shared SCSS tokens and globals</td>\n</tr>\n</tbody>\n</table>\n<h2 id="api-reference" tabindex="-1"><a class="header-anchor" href="#api-reference">API reference</a></h2>\n<h3 id="alert" tabindex="-1"><a class="header-anchor" href="#alert">Alert</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>variant</code></td>\n<td><code>\'default\' | \'destructive\'</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="alerttitle" tabindex="-1"><a class="header-anchor" href="#alerttitle">AlertTitle</a></h3>\n<p>No custom props.</p>\n<h3 id="alertdescription" tabindex="-1"><a class="header-anchor" href="#alertdescription">AlertDescription</a></h3>\n<p>No custom props.</p>\n<h2 id="related-docs" tabindex="-1"><a class="header-anchor" href="#related-docs">Related docs</a></h2>\n<ul>\n<li><a href="/docs/components/badge">Badge</a></li>\n<li><a href="/docs/components/card">Card</a></li>\n<li><a href="/docs/components/form">Form</a></li>\n</ul>\n',
		toc: [
			{
				depth: 2,
				title: 'Registry install',
				href: '#registry-install',
			},
			{
				depth: 2,
				title: 'Package usage',
				href: '#package-usage',
			},
			{
				depth: 2,
				title: 'Highlights',
				href: '#highlights',
			},
			{
				depth: 2,
				title: 'Registry dependencies',
				href: '#registry-dependencies',
			},
			{
				depth: 2,
				title: 'API reference',
				href: '#api-reference',
			},
			{
				depth: 3,
				title: 'Alert',
				href: '#alert',
			},
			{
				depth: 3,
				title: 'AlertTitle',
				href: '#alerttitle',
			},
			{
				depth: 3,
				title: 'AlertDescription',
				href: '#alertdescription',
			},
			{
				depth: 2,
				title: 'Related docs',
				href: '#related-docs',
			},
		],
	},
	{
		slug: 'components/alert-dialog',
		url: '/docs/components/alert-dialog',
		title: 'AlertDialog',
		description: 'Accessible SolidJS alert-dialog primitives with modal focus and outside-interaction policy.',
		html: '<blockquote>\n<p>Use AlertDialog for decisions that require modal focus, explicit Action and Cancel primitives, and observable outside interaction.</p>\n</blockquote>\n<h2 id="registry-install" tabindex="-1"><a class="header-anchor" href="#registry-install">Registry install</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#953800;--shiki-dark:#B392F0">pnpm</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> dlx</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> shadcn@latest</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> add</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> @tile-ui/alert-dialog</span></span>\n<span class="line"></span></code></pre><h2 id="package-usage" tabindex="-1"><a class="header-anchor" href="#package-usage">Package usage</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">import</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> { AlertDialog } </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">from</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> \'@tile-ui/solid\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">AlertDialog</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> onOpenChange</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#953800;--shiki-dark:#FFAB70">open</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">) </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=></span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> console.</span><span style="--shiki-light:#8250DF;--shiki-dark:#B392F0">log</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">(open)</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">}</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">AlertDialogTrigger</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>Delete&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">AlertDialogTrigger</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">AlertDialogContent</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">AlertDialogTitle</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>Delete workspace?&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">AlertDialogTitle</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">AlertDialogDescription</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>This cannot be undone.&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">AlertDialogDescription</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">AlertDialogCancel</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>Cancel&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">AlertDialogCancel</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">AlertDialogAction</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>Delete&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">AlertDialogAction</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">AlertDialogContent</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">AlertDialog</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"></span></code></pre><h2 id="highlights" tabindex="-1"><a class="header-anchor" href="#highlights">Highlights</a></h2>\n<ul>\n<li>Modal focus containment and trigger restoration</li>\n<li>Outside interaction can be observed or prevented</li>\n<li>Action and Cancel are nested native button primitives</li>\n</ul>\n<h2 id="foundation-behavior" tabindex="-1"><a class="header-anchor" href="#foundation-behavior">Foundation behavior</a></h2>\n<p>This Solid implementation uses native nested primitives and does not expose <code>asChild</code>. Controlled state uses Solid accessors and explicit callbacks such as <code>onOpenChange</code>, <code>onValueChange</code>, or <code>onSearchChange</code> where the family supports them.</p>\n<p>Portal content is omitted from the server response and mounted during hydration into the resolved document or nested portal scope. Closed and default-open roots keep deterministic trigger IDs and ARIA relationships without a hydration mismatch.</p>\n<p>Keyboard behavior follows the shared Foundation: focus and Tab order, Escape dismissal, arrow-key movement, typeahead, submenu branches, and trigger restoration are applied according to the component role.</p>\n<h2 id="registry-dependencies" tabindex="-1"><a class="header-anchor" href="#registry-dependencies">Registry dependencies</a></h2>\n<table>\n<thead>\n<tr>\n<th>Item</th>\n<th>Purpose</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>alert-dialog</code></td>\n<td>Component source and module styles</td>\n</tr>\n<tr>\n<td><code>core</code></td>\n<td>Framework-agnostic logic helpers</td>\n</tr>\n<tr>\n<td><code>utils</code></td>\n<td>Shared utility helpers</td>\n</tr>\n<tr>\n<td><code>button</code></td>\n<td>Registry component dependency</td>\n</tr>\n<tr>\n<td><code>styles</code></td>\n<td>Shared SCSS tokens and globals</td>\n</tr>\n</tbody>\n</table>\n<h2 id="api-reference" tabindex="-1"><a class="header-anchor" href="#api-reference">API reference</a></h2>\n<h3 id="alertdialog" tabindex="-1"><a class="header-anchor" href="#alertdialog">AlertDialog</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>open</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>defaultOpen</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>onOpenChange</code></td>\n<td><code>(open: boolean) =&gt; void</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>children</code></td>\n<td><code>JSX.Element</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="alertdialogtrigger" tabindex="-1"><a class="header-anchor" href="#alertdialogtrigger">AlertDialogTrigger</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>ref</code></td>\n<td><code>CallbackRef&lt;HTMLButtonElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="alertdialogoverlay" tabindex="-1"><a class="header-anchor" href="#alertdialogoverlay">AlertDialogOverlay</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>ref</code></td>\n<td><code>CallbackRef&lt;HTMLDivElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="alertdialogcontent" tabindex="-1"><a class="header-anchor" href="#alertdialogcontent">AlertDialogContent</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>ref</code></td>\n<td><code>CallbackRef&lt;HTMLDivElement&gt;</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>size</code></td>\n<td><code>AlertDialogSize</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>container</code></td>\n<td><code>Node</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>overlayClass</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>onEscapeKeyDown</code></td>\n<td><code>(event: DismissableLayerEvent&lt;KeyboardEvent&gt;) =&gt; void</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>onPointerDownOutside</code></td>\n<td><code>(event: DismissableLayerEvent&lt;PointerEvent&gt;) =&gt; void</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>onFocusOutside</code></td>\n<td><code>(event: DismissableLayerEvent&lt;FocusEvent&gt;) =&gt; void</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>onInteractOutside</code></td>\n<td><code>(event: DismissableLayerEvent&lt;DismissableLayerOutsideEvent&gt;) =&gt; void</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="alertdialogheader" tabindex="-1"><a class="header-anchor" href="#alertdialogheader">AlertDialogHeader</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>ref</code></td>\n<td><code>CallbackRef&lt;HTMLDivElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="alertdialogfooter" tabindex="-1"><a class="header-anchor" href="#alertdialogfooter">AlertDialogFooter</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>ref</code></td>\n<td><code>CallbackRef&lt;HTMLDivElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="alertdialogtitle" tabindex="-1"><a class="header-anchor" href="#alertdialogtitle">AlertDialogTitle</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>ref</code></td>\n<td><code>CallbackRef&lt;HTMLHeadingElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="alertdialogdescription" tabindex="-1"><a class="header-anchor" href="#alertdialogdescription">AlertDialogDescription</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>ref</code></td>\n<td><code>CallbackRef&lt;HTMLParagraphElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="alertdialogaction" tabindex="-1"><a class="header-anchor" href="#alertdialogaction">AlertDialogAction</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>ref</code></td>\n<td><code>CallbackRef&lt;HTMLButtonElement&gt;</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>variant</code></td>\n<td><code>ButtonVariant</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>size</code></td>\n<td><code>ButtonSize</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="alertdialogcancel" tabindex="-1"><a class="header-anchor" href="#alertdialogcancel">AlertDialogCancel</a></h3>\n<p>No custom props.</p>\n<h2 id="related-docs" tabindex="-1"><a class="header-anchor" href="#related-docs">Related docs</a></h2>\n<ul>\n<li><a href="/docs/components/dialog">Dialog</a></li>\n<li><a href="/docs/components/sheet">Sheet</a></li>\n<li><a href="/docs/components/drawer">Drawer</a></li>\n</ul>\n',
		toc: [
			{
				depth: 2,
				title: 'Registry install',
				href: '#registry-install',
			},
			{
				depth: 2,
				title: 'Package usage',
				href: '#package-usage',
			},
			{
				depth: 2,
				title: 'Highlights',
				href: '#highlights',
			},
			{
				depth: 2,
				title: 'Foundation behavior',
				href: '#foundation-behavior',
			},
			{
				depth: 2,
				title: 'Registry dependencies',
				href: '#registry-dependencies',
			},
			{
				depth: 2,
				title: 'API reference',
				href: '#api-reference',
			},
			{
				depth: 3,
				title: 'AlertDialog',
				href: '#alertdialog',
			},
			{
				depth: 3,
				title: 'AlertDialogTrigger',
				href: '#alertdialogtrigger',
			},
			{
				depth: 3,
				title: 'AlertDialogOverlay',
				href: '#alertdialogoverlay',
			},
			{
				depth: 3,
				title: 'AlertDialogContent',
				href: '#alertdialogcontent',
			},
			{
				depth: 3,
				title: 'AlertDialogHeader',
				href: '#alertdialogheader',
			},
			{
				depth: 3,
				title: 'AlertDialogFooter',
				href: '#alertdialogfooter',
			},
			{
				depth: 3,
				title: 'AlertDialogTitle',
				href: '#alertdialogtitle',
			},
			{
				depth: 3,
				title: 'AlertDialogDescription',
				href: '#alertdialogdescription',
			},
			{
				depth: 3,
				title: 'AlertDialogAction',
				href: '#alertdialogaction',
			},
			{
				depth: 3,
				title: 'AlertDialogCancel',
				href: '#alertdialogcancel',
			},
			{
				depth: 2,
				title: 'Related docs',
				href: '#related-docs',
			},
		],
	},
	{
		slug: 'components/aspect-ratio',
		url: '/docs/components/aspect-ratio',
		title: 'AspectRatio',
		description: 'An SSR-safe SolidJS container that preserves a requested width-to-height ratio.',
		html: '<blockquote>\n<p>Use AspectRatio to reserve stable media and preview geometry during SSR.</p>\n</blockquote>\n<h2 id="registry-install" tabindex="-1"><a class="header-anchor" href="#registry-install">Registry install</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#953800;--shiki-dark:#B392F0">pnpm</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> dlx</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> shadcn@latest</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> add</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> @tile-ui/aspect-ratio</span></span>\n<span class="line"></span></code></pre><h2 id="package-usage" tabindex="-1"><a class="header-anchor" href="#package-usage">Package usage</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">import</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> { AspectRatio } </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">from</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> \'@tile-ui/solid\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">AspectRatio</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> ratio</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#0550AE;--shiki-dark:#79B8FF">16</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583"> /</span><span style="--shiki-light:#0550AE;--shiki-dark:#79B8FF"> 9</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">}</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#85E89D">img</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> src</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"https://example.com/poster.png"</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> alt</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"Poster"</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> /></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">AspectRatio</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"></span></code></pre><h2 id="highlights" tabindex="-1"><a class="header-anchor" href="#highlights">Highlights</a></h2>\n<ul>\n<li>Ratio prop</li>\n<li>Fills its container</li>\n</ul>\n<h2 id="registry-dependencies" tabindex="-1"><a class="header-anchor" href="#registry-dependencies">Registry dependencies</a></h2>\n<table>\n<thead>\n<tr>\n<th>Item</th>\n<th>Purpose</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>aspect-ratio</code></td>\n<td>Component source and module styles</td>\n</tr>\n<tr>\n<td><code>core</code></td>\n<td>Framework-agnostic logic helpers</td>\n</tr>\n<tr>\n<td><code>styles</code></td>\n<td>Shared SCSS tokens and globals</td>\n</tr>\n</tbody>\n</table>\n<h2 id="api-reference" tabindex="-1"><a class="header-anchor" href="#api-reference">API reference</a></h2>\n<h3 id="aspectratio" tabindex="-1"><a class="header-anchor" href="#aspectratio">AspectRatio</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>ratio</code></td>\n<td><code>number</code></td>\n<td>1</td>\n</tr>\n</tbody>\n</table>\n<h2 id="related-docs" tabindex="-1"><a class="header-anchor" href="#related-docs">Related docs</a></h2>\n<ul>\n<li><a href="/docs/components/card">Card</a></li>\n<li><a href="/docs/components/carousel">Carousel</a></li>\n<li><a href="/docs/components/avatar">Avatar</a></li>\n</ul>\n',
		toc: [
			{
				depth: 2,
				title: 'Registry install',
				href: '#registry-install',
			},
			{
				depth: 2,
				title: 'Package usage',
				href: '#package-usage',
			},
			{
				depth: 2,
				title: 'Highlights',
				href: '#highlights',
			},
			{
				depth: 2,
				title: 'Registry dependencies',
				href: '#registry-dependencies',
			},
			{
				depth: 2,
				title: 'API reference',
				href: '#api-reference',
			},
			{
				depth: 3,
				title: 'AspectRatio',
				href: '#aspectratio',
			},
			{
				depth: 2,
				title: 'Related docs',
				href: '#related-docs',
			},
		],
	},
	{
		slug: 'components/attachment',
		url: '/docs/components/attachment',
		title: 'Attachment',
		description: 'Composable SolidJS attachment primitives with file metadata and actions.',
		html: '<blockquote>\n<p>Use Attachment primitives or AttachmentCard to present file state and actions.</p>\n</blockquote>\n<h2 id="registry-install" tabindex="-1"><a class="header-anchor" href="#registry-install">Registry install</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#953800;--shiki-dark:#B392F0">pnpm</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> dlx</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> shadcn@latest</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> add</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> @tile-ui/attachment</span></span>\n<span class="line"></span></code></pre><h2 id="package-usage" tabindex="-1"><a class="header-anchor" href="#package-usage">Package usage</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">import</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> { AttachmentCard } </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">from</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> \'@tile-ui/solid\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">AttachmentCard</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> name</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"solid-registry.pdf"</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> size</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#0550AE;--shiki-dark:#79B8FF">2516582</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">}</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> onDownload</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">() </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=></span><span style="--shiki-light:#8250DF;--shiki-dark:#B392F0"> downloadFile</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">()</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">}</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> /></span></span>\n<span class="line"></span></code></pre><h2 id="highlights" tabindex="-1"><a class="header-anchor" href="#highlights">Highlights</a></h2>\n<ul>\n<li>States like uploading and error</li>\n<li>Sizes and orientation</li>\n<li>Media, content, and actions</li>\n</ul>\n<h2 id="registry-dependencies" tabindex="-1"><a class="header-anchor" href="#registry-dependencies">Registry dependencies</a></h2>\n<table>\n<thead>\n<tr>\n<th>Item</th>\n<th>Purpose</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>attachment</code></td>\n<td>Component source and module styles</td>\n</tr>\n<tr>\n<td><code>core</code></td>\n<td>Framework-agnostic logic helpers</td>\n</tr>\n<tr>\n<td><code>utils</code></td>\n<td>Shared utility helpers</td>\n</tr>\n<tr>\n<td><code>button</code></td>\n<td>Registry component dependency</td>\n</tr>\n<tr>\n<td><code>styles</code></td>\n<td>Shared SCSS tokens and globals</td>\n</tr>\n</tbody>\n</table>\n<h2 id="api-reference" tabindex="-1"><a class="header-anchor" href="#api-reference">API reference</a></h2>\n<h3 id="attachment" tabindex="-1"><a class="header-anchor" href="#attachment">Attachment</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>state</code></td>\n<td><code>\'idle\' | \'uploading\' | \'processing\' | \'error\' | \'done\'</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>size</code></td>\n<td><code>\'default\' | \'sm\' | \'xs\'</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>orientation</code></td>\n<td><code>\'horizontal\' | \'vertical\'</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="attachmentcard" tabindex="-1"><a class="header-anchor" href="#attachmentcard">AttachmentCard</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>name</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>size</code></td>\n<td><code>number</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>state</code></td>\n<td><code>\'idle\' | \'uploading\' | \'processing\' | \'error\' | \'done\'</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>orientation</code></td>\n<td><code>\'horizontal\' | \'vertical\'</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>downloading</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>file</code></td>\n<td><code>File</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>action</code></td>\n<td><code>JSX.Element</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>onRemove</code></td>\n<td><code>SolidEventHandler&lt;HTMLButtonElement, MouseEvent&gt;</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>onDownload</code></td>\n<td><code>SolidEventHandler&lt;HTMLButtonElement, MouseEvent&gt;</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>onPreview</code></td>\n<td><code>SolidEventHandler&lt;HTMLDivElement, MouseEvent&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="attachmentgroup" tabindex="-1"><a class="header-anchor" href="#attachmentgroup">AttachmentGroup</a></h3>\n<p>No custom props.</p>\n<h3 id="attachmentcontent" tabindex="-1"><a class="header-anchor" href="#attachmentcontent">AttachmentContent</a></h3>\n<p>No custom props.</p>\n<h3 id="attachmentactions" tabindex="-1"><a class="header-anchor" href="#attachmentactions">AttachmentActions</a></h3>\n<p>No custom props.</p>\n<h3 id="attachmentmedia" tabindex="-1"><a class="header-anchor" href="#attachmentmedia">AttachmentMedia</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>variant</code></td>\n<td><code>AttachmentMediaVariant</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="attachmenttitle" tabindex="-1"><a class="header-anchor" href="#attachmenttitle">AttachmentTitle</a></h3>\n<p>No custom props.</p>\n<h3 id="attachmentdescription" tabindex="-1"><a class="header-anchor" href="#attachmentdescription">AttachmentDescription</a></h3>\n<p>No custom props.</p>\n<h3 id="attachmentaction" tabindex="-1"><a class="header-anchor" href="#attachmentaction">AttachmentAction</a></h3>\n<p>No custom props.</p>\n<h3 id="attachmenttrigger" tabindex="-1"><a class="header-anchor" href="#attachmenttrigger">AttachmentTrigger</a></h3>\n<p>No custom props.</p>\n<h2 id="related-docs" tabindex="-1"><a class="header-anchor" href="#related-docs">Related docs</a></h2>\n<ul>\n<li><a href="/docs/components/item">Item</a></li>\n<li><a href="/docs/components/badge">Badge</a></li>\n<li><a href="/docs/components/empty">Empty</a></li>\n</ul>\n',
		toc: [
			{
				depth: 2,
				title: 'Registry install',
				href: '#registry-install',
			},
			{
				depth: 2,
				title: 'Package usage',
				href: '#package-usage',
			},
			{
				depth: 2,
				title: 'Highlights',
				href: '#highlights',
			},
			{
				depth: 2,
				title: 'Registry dependencies',
				href: '#registry-dependencies',
			},
			{
				depth: 2,
				title: 'API reference',
				href: '#api-reference',
			},
			{
				depth: 3,
				title: 'Attachment',
				href: '#attachment',
			},
			{
				depth: 3,
				title: 'AttachmentCard',
				href: '#attachmentcard',
			},
			{
				depth: 3,
				title: 'AttachmentGroup',
				href: '#attachmentgroup',
			},
			{
				depth: 3,
				title: 'AttachmentContent',
				href: '#attachmentcontent',
			},
			{
				depth: 3,
				title: 'AttachmentActions',
				href: '#attachmentactions',
			},
			{
				depth: 3,
				title: 'AttachmentMedia',
				href: '#attachmentmedia',
			},
			{
				depth: 3,
				title: 'AttachmentTitle',
				href: '#attachmenttitle',
			},
			{
				depth: 3,
				title: 'AttachmentDescription',
				href: '#attachmentdescription',
			},
			{
				depth: 3,
				title: 'AttachmentAction',
				href: '#attachmentaction',
			},
			{
				depth: 3,
				title: 'AttachmentTrigger',
				href: '#attachmenttrigger',
			},
			{
				depth: 2,
				title: 'Related docs',
				href: '#related-docs',
			},
		],
	},
	{
		slug: 'components/avatar',
		url: '/docs/components/avatar',
		title: 'Avatar',
		description: 'SolidJS avatar primitives with reactive image fallback and grouping.',
		html: '<blockquote>\n<p>Use Avatar for image identities with a text fallback that reacts to load errors.</p>\n</blockquote>\n<h2 id="registry-install" tabindex="-1"><a class="header-anchor" href="#registry-install">Registry install</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#953800;--shiki-dark:#B392F0">pnpm</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> dlx</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> shadcn@latest</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> add</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> @tile-ui/avatar</span></span>\n<span class="line"></span></code></pre><h2 id="package-usage" tabindex="-1"><a class="header-anchor" href="#package-usage">Package usage</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">import</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> { Avatar, AvatarImage, AvatarFallback } </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">from</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> \'@tile-ui/solid\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Avatar</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">AvatarImage</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> src</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"/avatar.png"</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> alt</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"Tile UI"</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> /></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">AvatarFallback</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>TU&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">AvatarFallback</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Avatar</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"></span></code></pre><h2 id="highlights" tabindex="-1"><a class="header-anchor" href="#highlights">Highlights</a></h2>\n<ul>\n<li>Image, fallback, and badge</li>\n<li>Group stacking</li>\n<li>Three sizes</li>\n</ul>\n<h2 id="registry-dependencies" tabindex="-1"><a class="header-anchor" href="#registry-dependencies">Registry dependencies</a></h2>\n<table>\n<thead>\n<tr>\n<th>Item</th>\n<th>Purpose</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>avatar</code></td>\n<td>Component source and module styles</td>\n</tr>\n<tr>\n<td><code>core</code></td>\n<td>Framework-agnostic logic helpers</td>\n</tr>\n<tr>\n<td><code>styles</code></td>\n<td>Shared SCSS tokens and globals</td>\n</tr>\n</tbody>\n</table>\n<h2 id="api-reference" tabindex="-1"><a class="header-anchor" href="#api-reference">API reference</a></h2>\n<h3 id="avatar" tabindex="-1"><a class="header-anchor" href="#avatar">Avatar</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>size</code></td>\n<td><code>\'default\' | \'sm\' | \'lg\'</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="avatarimage" tabindex="-1"><a class="header-anchor" href="#avatarimage">AvatarImage</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>alt</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="avatarfallback" tabindex="-1"><a class="header-anchor" href="#avatarfallback">AvatarFallback</a></h3>\n<p>No custom props.</p>\n<h3 id="avatarbadge" tabindex="-1"><a class="header-anchor" href="#avatarbadge">AvatarBadge</a></h3>\n<p>No custom props.</p>\n<h3 id="avatargroup" tabindex="-1"><a class="header-anchor" href="#avatargroup">AvatarGroup</a></h3>\n<p>No custom props.</p>\n<h3 id="avatargroupcount" tabindex="-1"><a class="header-anchor" href="#avatargroupcount">AvatarGroupCount</a></h3>\n<p>No custom props.</p>\n<h2 id="related-docs" tabindex="-1"><a class="header-anchor" href="#related-docs">Related docs</a></h2>\n<ul>\n<li><a href="/docs/components/badge">Badge</a></li>\n<li><a href="/docs/components/item">Item</a></li>\n<li><a href="/docs/components/message">Message</a></li>\n</ul>\n',
		toc: [
			{
				depth: 2,
				title: 'Registry install',
				href: '#registry-install',
			},
			{
				depth: 2,
				title: 'Package usage',
				href: '#package-usage',
			},
			{
				depth: 2,
				title: 'Highlights',
				href: '#highlights',
			},
			{
				depth: 2,
				title: 'Registry dependencies',
				href: '#registry-dependencies',
			},
			{
				depth: 2,
				title: 'API reference',
				href: '#api-reference',
			},
			{
				depth: 3,
				title: 'Avatar',
				href: '#avatar',
			},
			{
				depth: 3,
				title: 'AvatarImage',
				href: '#avatarimage',
			},
			{
				depth: 3,
				title: 'AvatarFallback',
				href: '#avatarfallback',
			},
			{
				depth: 3,
				title: 'AvatarBadge',
				href: '#avatarbadge',
			},
			{
				depth: 3,
				title: 'AvatarGroup',
				href: '#avatargroup',
			},
			{
				depth: 3,
				title: 'AvatarGroupCount',
				href: '#avatargroupcount',
			},
			{
				depth: 2,
				title: 'Related docs',
				href: '#related-docs',
			},
		],
	},
	{
		slug: 'components/badge',
		url: '/docs/components/badge',
		title: 'Badge',
		description: 'A SolidJS status or label indicator with multiple visual variants.',
		html: '<blockquote>\n<p>Use Badge in SolidJS status surfaces, counts, or short labels.</p>\n</blockquote>\n<h2 id="registry-install" tabindex="-1"><a class="header-anchor" href="#registry-install">Registry install</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#953800;--shiki-dark:#B392F0">pnpm</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> dlx</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> shadcn@latest</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> add</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> @tile-ui/badge</span></span>\n<span class="line"></span></code></pre><h2 id="package-usage" tabindex="-1"><a class="header-anchor" href="#package-usage">Package usage</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">import</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> { Badge } </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">from</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> \'@tile-ui/solid\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Badge</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> variant</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"secondary"</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>New&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Badge</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"></span></code></pre><h2 id="highlights" tabindex="-1"><a class="header-anchor" href="#highlights">Highlights</a></h2>\n<ul>\n<li>Six visual variants</li>\n<li>Native Solid span attributes</li>\n<li>Pairs with Card and status surfaces</li>\n</ul>\n<h2 id="registry-dependencies" tabindex="-1"><a class="header-anchor" href="#registry-dependencies">Registry dependencies</a></h2>\n<table>\n<thead>\n<tr>\n<th>Item</th>\n<th>Purpose</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>badge</code></td>\n<td>Component source and module styles</td>\n</tr>\n<tr>\n<td><code>core</code></td>\n<td>Framework-agnostic logic helpers</td>\n</tr>\n<tr>\n<td><code>styles</code></td>\n<td>Shared SCSS tokens and globals</td>\n</tr>\n</tbody>\n</table>\n<h2 id="api-reference" tabindex="-1"><a class="header-anchor" href="#api-reference">API reference</a></h2>\n<h3 id="badge" tabindex="-1"><a class="header-anchor" href="#badge">Badge</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>variant</code></td>\n<td><code>\'default\' | \'secondary\' | \'destructive\' | \'outline\' | \'ghost\' | \'link\'</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h2 id="related-docs" tabindex="-1"><a class="header-anchor" href="#related-docs">Related docs</a></h2>\n<ul>\n<li><a href="/docs/components/card">Card</a></li>\n<li><a href="/docs/components/avatar">Avatar</a></li>\n<li><a href="/docs/components/alert">Alert</a></li>\n</ul>\n',
		toc: [
			{
				depth: 2,
				title: 'Registry install',
				href: '#registry-install',
			},
			{
				depth: 2,
				title: 'Package usage',
				href: '#package-usage',
			},
			{
				depth: 2,
				title: 'Highlights',
				href: '#highlights',
			},
			{
				depth: 2,
				title: 'Registry dependencies',
				href: '#registry-dependencies',
			},
			{
				depth: 2,
				title: 'API reference',
				href: '#api-reference',
			},
			{
				depth: 3,
				title: 'Badge',
				href: '#badge',
			},
			{
				depth: 2,
				title: 'Related docs',
				href: '#related-docs',
			},
		],
	},
	{
		slug: 'components/breadcrumb',
		url: '/docs/components/breadcrumb',
		title: 'Breadcrumb',
		description: 'Accessible SolidJS breadcrumb navigation using native links.',
		html: '<blockquote>\n<p>Use Breadcrumb to expose the current page within a native navigation trail.</p>\n</blockquote>\n<h2 id="registry-install" tabindex="-1"><a class="header-anchor" href="#registry-install">Registry install</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#953800;--shiki-dark:#B392F0">pnpm</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> dlx</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> shadcn@latest</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> add</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> @tile-ui/breadcrumb</span></span>\n<span class="line"></span></code></pre><h2 id="package-usage" tabindex="-1"><a class="header-anchor" href="#package-usage">Package usage</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">import</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">from</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> \'@tile-ui/solid\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Breadcrumb</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">BreadcrumbList</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">BreadcrumbItem</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">BreadcrumbLink</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> href</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"/docs"</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>Docs&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">BreadcrumbLink</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">BreadcrumbItem</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">BreadcrumbSeparator</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> /></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">BreadcrumbItem</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">BreadcrumbPage</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>Solid&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">BreadcrumbPage</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">BreadcrumbItem</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">BreadcrumbList</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Breadcrumb</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"></span></code></pre><h2 id="highlights" tabindex="-1"><a class="header-anchor" href="#highlights">Highlights</a></h2>\n<ul>\n<li>Native anchor composition</li>\n<li>Current-page semantics</li>\n<li>Custom separator content</li>\n</ul>\n<h2 id="registry-dependencies" tabindex="-1"><a class="header-anchor" href="#registry-dependencies">Registry dependencies</a></h2>\n<table>\n<thead>\n<tr>\n<th>Item</th>\n<th>Purpose</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>breadcrumb</code></td>\n<td>Component source and module styles</td>\n</tr>\n<tr>\n<td><code>core</code></td>\n<td>Framework-agnostic logic helpers</td>\n</tr>\n<tr>\n<td><code>styles</code></td>\n<td>Shared SCSS tokens and globals</td>\n</tr>\n</tbody>\n</table>\n<h2 id="api-reference" tabindex="-1"><a class="header-anchor" href="#api-reference">API reference</a></h2>\n<h3 id="breadcrumb" tabindex="-1"><a class="header-anchor" href="#breadcrumb">Breadcrumb</a></h3>\n<p>No custom props.</p>\n<h3 id="breadcrumblist" tabindex="-1"><a class="header-anchor" href="#breadcrumblist">BreadcrumbList</a></h3>\n<p>No custom props.</p>\n<h3 id="breadcrumbitem" tabindex="-1"><a class="header-anchor" href="#breadcrumbitem">BreadcrumbItem</a></h3>\n<p>No custom props.</p>\n<h3 id="breadcrumblink" tabindex="-1"><a class="header-anchor" href="#breadcrumblink">BreadcrumbLink</a></h3>\n<p>No custom props.</p>\n<h3 id="breadcrumbpage" tabindex="-1"><a class="header-anchor" href="#breadcrumbpage">BreadcrumbPage</a></h3>\n<p>No custom props.</p>\n<h3 id="breadcrumbseparator" tabindex="-1"><a class="header-anchor" href="#breadcrumbseparator">BreadcrumbSeparator</a></h3>\n<p>No custom props.</p>\n<h3 id="breadcrumbellipsis" tabindex="-1"><a class="header-anchor" href="#breadcrumbellipsis">BreadcrumbEllipsis</a></h3>\n<p>No custom props.</p>\n<h2 id="related-docs" tabindex="-1"><a class="header-anchor" href="#related-docs">Related docs</a></h2>\n<ul>\n<li><a href="/docs/components/pagination">Pagination</a></li>\n<li><a href="/docs/components/navigation-menu">NavigationMenu</a></li>\n<li><a href="/docs/components/sidebar">Sidebar</a></li>\n</ul>\n',
		toc: [
			{
				depth: 2,
				title: 'Registry install',
				href: '#registry-install',
			},
			{
				depth: 2,
				title: 'Package usage',
				href: '#package-usage',
			},
			{
				depth: 2,
				title: 'Highlights',
				href: '#highlights',
			},
			{
				depth: 2,
				title: 'Registry dependencies',
				href: '#registry-dependencies',
			},
			{
				depth: 2,
				title: 'API reference',
				href: '#api-reference',
			},
			{
				depth: 3,
				title: 'Breadcrumb',
				href: '#breadcrumb',
			},
			{
				depth: 3,
				title: 'BreadcrumbList',
				href: '#breadcrumblist',
			},
			{
				depth: 3,
				title: 'BreadcrumbItem',
				href: '#breadcrumbitem',
			},
			{
				depth: 3,
				title: 'BreadcrumbLink',
				href: '#breadcrumblink',
			},
			{
				depth: 3,
				title: 'BreadcrumbPage',
				href: '#breadcrumbpage',
			},
			{
				depth: 3,
				title: 'BreadcrumbSeparator',
				href: '#breadcrumbseparator',
			},
			{
				depth: 3,
				title: 'BreadcrumbEllipsis',
				href: '#breadcrumbellipsis',
			},
			{
				depth: 2,
				title: 'Related docs',
				href: '#related-docs',
			},
		],
	},
	{
		slug: 'components/bubble',
		url: '/docs/components/bubble',
		title: 'Bubble',
		description: 'SolidJS chat bubble primitives with alignment and reaction regions.',
		html: '<blockquote>\n<p>Use Bubble for aligned conversation content and optional reaction metadata.</p>\n</blockquote>\n<h2 id="registry-install" tabindex="-1"><a class="header-anchor" href="#registry-install">Registry install</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#953800;--shiki-dark:#B392F0">pnpm</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> dlx</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> shadcn@latest</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> add</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> @tile-ui/bubble</span></span>\n<span class="line"></span></code></pre><h2 id="package-usage" tabindex="-1"><a class="header-anchor" href="#package-usage">Package usage</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">import</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> { Bubble, BubbleContent } </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">from</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> \'@tile-ui/solid\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Bubble</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> align</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"end"</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">BubbleContent</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>Registry complete.&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">BubbleContent</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Bubble</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"></span></code></pre><h2 id="highlights" tabindex="-1"><a class="header-anchor" href="#highlights">Highlights</a></h2>\n<ul>\n<li>Seven visual variants</li>\n<li>Native div content primitive</li>\n<li>Aligned reaction metadata</li>\n</ul>\n<h2 id="registry-dependencies" tabindex="-1"><a class="header-anchor" href="#registry-dependencies">Registry dependencies</a></h2>\n<table>\n<thead>\n<tr>\n<th>Item</th>\n<th>Purpose</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>bubble</code></td>\n<td>Component source and module styles</td>\n</tr>\n<tr>\n<td><code>core</code></td>\n<td>Framework-agnostic logic helpers</td>\n</tr>\n<tr>\n<td><code>styles</code></td>\n<td>Shared SCSS tokens and globals</td>\n</tr>\n</tbody>\n</table>\n<h2 id="api-reference" tabindex="-1"><a class="header-anchor" href="#api-reference">API reference</a></h2>\n<h3 id="bubble" tabindex="-1"><a class="header-anchor" href="#bubble">Bubble</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>variant</code></td>\n<td><code>\'default\' | \'secondary\' | \'muted\' | \'tinted\' | \'outline\' | \'ghost\' | \'destructive\'</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>align</code></td>\n<td><code>\'start\' | \'end\'</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="bubblecontent" tabindex="-1"><a class="header-anchor" href="#bubblecontent">BubbleContent</a></h3>\n<p>No custom props.</p>\n<h3 id="bubblereactions" tabindex="-1"><a class="header-anchor" href="#bubblereactions">BubbleReactions</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>side</code></td>\n<td><code>\'top\' | \'bottom\'</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>align</code></td>\n<td><code>\'start\' | \'end\'</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="bubblegroup" tabindex="-1"><a class="header-anchor" href="#bubblegroup">BubbleGroup</a></h3>\n<p>No custom props.</p>\n<h2 id="related-docs" tabindex="-1"><a class="header-anchor" href="#related-docs">Related docs</a></h2>\n<ul>\n<li><a href="/docs/components/message">Message</a></li>\n<li><a href="/docs/components/message-scroller">MessageScroller</a></li>\n<li><a href="/docs/components/avatar">Avatar</a></li>\n</ul>\n',
		toc: [
			{
				depth: 2,
				title: 'Registry install',
				href: '#registry-install',
			},
			{
				depth: 2,
				title: 'Package usage',
				href: '#package-usage',
			},
			{
				depth: 2,
				title: 'Highlights',
				href: '#highlights',
			},
			{
				depth: 2,
				title: 'Registry dependencies',
				href: '#registry-dependencies',
			},
			{
				depth: 2,
				title: 'API reference',
				href: '#api-reference',
			},
			{
				depth: 3,
				title: 'Bubble',
				href: '#bubble',
			},
			{
				depth: 3,
				title: 'BubbleContent',
				href: '#bubblecontent',
			},
			{
				depth: 3,
				title: 'BubbleReactions',
				href: '#bubblereactions',
			},
			{
				depth: 3,
				title: 'BubbleGroup',
				href: '#bubblegroup',
			},
			{
				depth: 2,
				title: 'Related docs',
				href: '#related-docs',
			},
		],
	},
	{
		slug: 'components/button',
		url: '/docs/components/button',
		title: 'Button',
		description: 'A SolidJS action component with loading state and size variants.',
		html: '<blockquote>\n<p>Use Button for SolidJS actions, confirmations, and toolbar interactions.</p>\n</blockquote>\n<h2 id="registry-install" tabindex="-1"><a class="header-anchor" href="#registry-install">Registry install</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#953800;--shiki-dark:#B392F0">pnpm</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> dlx</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> shadcn@latest</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> add</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> @tile-ui/button</span></span>\n<span class="line"></span></code></pre><h2 id="package-usage" tabindex="-1"><a class="header-anchor" href="#package-usage">Package usage</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">import</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> { Button } </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">from</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> \'@tile-ui/solid\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Button</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>Default&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Button</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Button</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> variant</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"secondary"</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>Secondary&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Button</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Button</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> variant</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"outline"</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>Outline&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Button</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Button</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> variant</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"ghost"</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>Ghost&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Button</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Button</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> variant</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"destructive"</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>Destructive&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Button</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Button</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> loading</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>Loading&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Button</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"></span></code></pre><h2 id="highlights" tabindex="-1"><a class="header-anchor" href="#highlights">Highlights</a></h2>\n<ul>\n<li>Six visual variants</li>\n<li>Loading state support</li>\n<li>Eight sizes from <code>xs</code> through <code>icon-lg</code></li>\n</ul>\n<h2 id="registry-dependencies" tabindex="-1"><a class="header-anchor" href="#registry-dependencies">Registry dependencies</a></h2>\n<table>\n<thead>\n<tr>\n<th>Item</th>\n<th>Purpose</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>button</code></td>\n<td>Component source and module styles</td>\n</tr>\n<tr>\n<td><code>core</code></td>\n<td>Framework-agnostic logic helpers</td>\n</tr>\n<tr>\n<td><code>styles</code></td>\n<td>Shared SCSS tokens and globals</td>\n</tr>\n</tbody>\n</table>\n<h2 id="api-reference" tabindex="-1"><a class="header-anchor" href="#api-reference">API reference</a></h2>\n<h3 id="button" tabindex="-1"><a class="header-anchor" href="#button">Button</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>variant</code></td>\n<td><code>\'default\' | \'destructive\' | \'outline\' | \'secondary\' | \'ghost\' | \'link\'</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>size</code></td>\n<td><code>\'default\' | \'xs\' | \'sm\' | \'lg\' | \'icon\' | \'icon-xs\' | \'icon-sm\' | \'icon-lg\'</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>loading</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h2 id="related-docs" tabindex="-1"><a class="header-anchor" href="#related-docs">Related docs</a></h2>\n<ul>\n<li><a href="/docs/components/card">Card</a></li>\n<li><a href="/docs/components/input">Input</a></li>\n</ul>\n',
		toc: [
			{
				depth: 2,
				title: 'Registry install',
				href: '#registry-install',
			},
			{
				depth: 2,
				title: 'Package usage',
				href: '#package-usage',
			},
			{
				depth: 2,
				title: 'Highlights',
				href: '#highlights',
			},
			{
				depth: 2,
				title: 'Registry dependencies',
				href: '#registry-dependencies',
			},
			{
				depth: 2,
				title: 'API reference',
				href: '#api-reference',
			},
			{
				depth: 3,
				title: 'Button',
				href: '#button',
			},
			{
				depth: 2,
				title: 'Related docs',
				href: '#related-docs',
			},
		],
	},
	{
		slug: 'components/button-group',
		url: '/docs/components/button-group',
		title: 'ButtonGroup',
		description: 'SolidJS primitives for grouping related native button actions.',
		html: '<blockquote>\n<p>Use ButtonGroup to keep related native actions visually and semantically adjacent.</p>\n</blockquote>\n<h2 id="registry-install" tabindex="-1"><a class="header-anchor" href="#registry-install">Registry install</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#953800;--shiki-dark:#B392F0">pnpm</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> dlx</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> shadcn@latest</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> add</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> @tile-ui/button-group</span></span>\n<span class="line"></span></code></pre><h2 id="package-usage" tabindex="-1"><a class="header-anchor" href="#package-usage">Package usage</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">import</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> { ButtonGroup, Button } </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">from</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> \'@tile-ui/solid\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">ButtonGroup</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Button</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>One&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Button</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Button</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>Two&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Button</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Button</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>Three&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Button</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">ButtonGroup</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"></span></code></pre><h2 id="highlights" tabindex="-1"><a class="header-anchor" href="#highlights">Highlights</a></h2>\n<ul>\n<li>Horizontal and vertical orientation</li>\n<li>Text and separator</li>\n</ul>\n<h2 id="registry-dependencies" tabindex="-1"><a class="header-anchor" href="#registry-dependencies">Registry dependencies</a></h2>\n<table>\n<thead>\n<tr>\n<th>Item</th>\n<th>Purpose</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>button-group</code></td>\n<td>Component source and module styles</td>\n</tr>\n<tr>\n<td><code>core</code></td>\n<td>Framework-agnostic logic helpers</td>\n</tr>\n<tr>\n<td><code>styles</code></td>\n<td>Shared SCSS tokens and globals</td>\n</tr>\n</tbody>\n</table>\n<h2 id="api-reference" tabindex="-1"><a class="header-anchor" href="#api-reference">API reference</a></h2>\n<h3 id="buttongroup" tabindex="-1"><a class="header-anchor" href="#buttongroup">ButtonGroup</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>orientation</code></td>\n<td><code>\'horizontal\' | \'vertical\'</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="buttongrouptext" tabindex="-1"><a class="header-anchor" href="#buttongrouptext">ButtonGroupText</a></h3>\n<p>No custom props.</p>\n<h3 id="buttongroupseparator" tabindex="-1"><a class="header-anchor" href="#buttongroupseparator">ButtonGroupSeparator</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>orientation</code></td>\n<td><code>\'horizontal\' | \'vertical\'</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h2 id="related-docs" tabindex="-1"><a class="header-anchor" href="#related-docs">Related docs</a></h2>\n<ul>\n<li><a href="/docs/components/button">Button</a></li>\n<li><a href="/docs/components/toggle-group">ToggleGroup</a></li>\n<li><a href="/docs/components/input-group">InputGroup</a></li>\n</ul>\n',
		toc: [
			{
				depth: 2,
				title: 'Registry install',
				href: '#registry-install',
			},
			{
				depth: 2,
				title: 'Package usage',
				href: '#package-usage',
			},
			{
				depth: 2,
				title: 'Highlights',
				href: '#highlights',
			},
			{
				depth: 2,
				title: 'Registry dependencies',
				href: '#registry-dependencies',
			},
			{
				depth: 2,
				title: 'API reference',
				href: '#api-reference',
			},
			{
				depth: 3,
				title: 'ButtonGroup',
				href: '#buttongroup',
			},
			{
				depth: 3,
				title: 'ButtonGroupText',
				href: '#buttongrouptext',
			},
			{
				depth: 3,
				title: 'ButtonGroupSeparator',
				href: '#buttongroupseparator',
			},
			{
				depth: 2,
				title: 'Related docs',
				href: '#related-docs',
			},
		],
	},
	{
		slug: 'components/calendar',
		url: '/docs/components/calendar',
		title: 'Calendar',
		description: 'A deterministic SolidJS calendar with date selection and grid keyboard behavior.',
		html: '<blockquote>\n<p>Use Calendar for single, multiple, or range date selection; pass explicit <code>today</code> and <code>defaultMonth</code> when SSR output must be deterministic.</p>\n</blockquote>\n<h2 id="registry-install" tabindex="-1"><a class="header-anchor" href="#registry-install">Registry install</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#953800;--shiki-dark:#B392F0">pnpm</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> dlx</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> shadcn@latest</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> add</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> @tile-ui/calendar</span></span>\n<span class="line"></span></code></pre><h2 id="package-usage" tabindex="-1"><a class="header-anchor" href="#package-usage">Package usage</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">import</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> { Calendar } </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">from</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> \'@tile-ui/solid\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Calendar</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> mode</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"range"</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> defaultMonth</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">new</span><span style="--shiki-light:#8250DF;--shiki-dark:#B392F0"> Date</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#0550AE;--shiki-dark:#79B8FF">2026</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">, </span><span style="--shiki-light:#0550AE;--shiki-dark:#79B8FF">7</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">, </span><span style="--shiki-light:#0550AE;--shiki-dark:#79B8FF">1</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">)</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">}</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> today</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">new</span><span style="--shiki-light:#8250DF;--shiki-dark:#B392F0"> Date</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#0550AE;--shiki-dark:#79B8FF">2026</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">, </span><span style="--shiki-light:#0550AE;--shiki-dark:#79B8FF">7</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">, </span><span style="--shiki-light:#0550AE;--shiki-dark:#79B8FF">28</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">)</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">}</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> onSelect</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#953800;--shiki-dark:#FFAB70">range</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">) </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=></span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> console.</span><span style="--shiki-light:#8250DF;--shiki-dark:#B392F0">log</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">(range)</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">}</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> /></span></span>\n<span class="line"></span></code></pre><h2 id="highlights" tabindex="-1"><a class="header-anchor" href="#highlights">Highlights</a></h2>\n<ul>\n<li>Single, multiple, and range selection</li>\n<li>Visible range start and end state</li>\n<li>Explicit <code>today</code> and <code>defaultMonth</code> for deterministic SSR</li>\n</ul>\n<h2 id="registry-dependencies" tabindex="-1"><a class="header-anchor" href="#registry-dependencies">Registry dependencies</a></h2>\n<table>\n<thead>\n<tr>\n<th>Item</th>\n<th>Purpose</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>calendar</code></td>\n<td>Component source and module styles</td>\n</tr>\n<tr>\n<td><code>core</code></td>\n<td>Framework-agnostic logic helpers</td>\n</tr>\n<tr>\n<td><code>utils</code></td>\n<td>Shared utility helpers</td>\n</tr>\n<tr>\n<td><code>styles</code></td>\n<td>Shared SCSS tokens and globals</td>\n</tr>\n</tbody>\n</table>\n<h2 id="api-reference" tabindex="-1"><a class="header-anchor" href="#api-reference">API reference</a></h2>\n<h3 id="calendar" tabindex="-1"><a class="header-anchor" href="#calendar">Calendar</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>mode</code></td>\n<td><code>\'single\' | \'multiple\' | \'range\'</code></td>\n<td>‘single’</td>\n</tr>\n<tr>\n<td><code>selected</code></td>\n<td><code>Date | Date[] | CalendarRange | undefined</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>defaultSelected</code></td>\n<td><code>Date | Date[] | CalendarRange | undefined</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>defaultMonth</code></td>\n<td><code>Date</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>showOutsideDays</code></td>\n<td><code>boolean</code></td>\n<td>true</td>\n</tr>\n<tr>\n<td><code>disabled</code></td>\n<td><code>(date: Date) =&gt; boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>onSelect</code></td>\n<td><code>(selection: CalendarSelection) =&gt; void</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>locale</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>today</code></td>\n<td><code>Date</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="calendardaybutton" tabindex="-1"><a class="header-anchor" href="#calendardaybutton">CalendarDayButton</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>date</code></td>\n<td><code>Date</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>modifiers</code></td>\n<td><code>CalendarDayModifiers</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>locale</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h2 id="related-docs" tabindex="-1"><a class="header-anchor" href="#related-docs">Related docs</a></h2>\n<ul>\n<li><a href="/docs/components/chart">Chart</a></li>\n<li><a href="/docs/components/form">Form</a></li>\n<li><a href="/docs/components/popover">Popover</a></li>\n</ul>\n',
		toc: [
			{
				depth: 2,
				title: 'Registry install',
				href: '#registry-install',
			},
			{
				depth: 2,
				title: 'Package usage',
				href: '#package-usage',
			},
			{
				depth: 2,
				title: 'Highlights',
				href: '#highlights',
			},
			{
				depth: 2,
				title: 'Registry dependencies',
				href: '#registry-dependencies',
			},
			{
				depth: 2,
				title: 'API reference',
				href: '#api-reference',
			},
			{
				depth: 3,
				title: 'Calendar',
				href: '#calendar',
			},
			{
				depth: 3,
				title: 'CalendarDayButton',
				href: '#calendardaybutton',
			},
			{
				depth: 2,
				title: 'Related docs',
				href: '#related-docs',
			},
		],
	},
	{
		slug: 'components/card',
		url: '/docs/components/card',
		title: 'Card',
		description: 'Composable SolidJS card primitives for framed content.',
		html: '<blockquote>\n<p>Use Card to compose SolidJS summaries, settings surfaces, and action rows.</p>\n</blockquote>\n<h2 id="registry-install" tabindex="-1"><a class="header-anchor" href="#registry-install">Registry install</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#953800;--shiki-dark:#B392F0">pnpm</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> dlx</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> shadcn@latest</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> add</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> @tile-ui/card</span></span>\n<span class="line"></span></code></pre><h2 id="package-usage" tabindex="-1"><a class="header-anchor" href="#package-usage">Package usage</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">import</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button } </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">from</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> \'@tile-ui/solid\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Card</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">CardHeader</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">CardTitle</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>SolidStart workspace&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">CardTitle</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">CardDescription</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>SSR-ready Tile UI components for SolidJS.&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">CardDescription</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">CardHeader</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">CardContent</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#85E89D">p</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>The component source and styles remain shared across Tile UI.&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#85E89D">p</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">CardContent</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">CardFooter</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Button</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> variant</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"outline"</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>Preview&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Button</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Button</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>Install&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Button</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">CardFooter</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Card</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"></span></code></pre><h2 id="highlights" tabindex="-1"><a class="header-anchor" href="#highlights">Highlights</a></h2>\n<ul>\n<li>Solid-native primitive composition</li>\n<li>Header, content, and footer</li>\n<li>Pairs with Button and Input</li>\n</ul>\n<h2 id="registry-dependencies" tabindex="-1"><a class="header-anchor" href="#registry-dependencies">Registry dependencies</a></h2>\n<table>\n<thead>\n<tr>\n<th>Item</th>\n<th>Purpose</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>card</code></td>\n<td>Component source and module styles</td>\n</tr>\n<tr>\n<td><code>core</code></td>\n<td>Framework-agnostic logic helpers</td>\n</tr>\n<tr>\n<td><code>styles</code></td>\n<td>Shared SCSS tokens and globals</td>\n</tr>\n</tbody>\n</table>\n<h2 id="api-reference" tabindex="-1"><a class="header-anchor" href="#api-reference">API reference</a></h2>\n<h3 id="card" tabindex="-1"><a class="header-anchor" href="#card">Card</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>as</code></td>\n<td><code>\'div\' | \'article\' | \'section\'</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="cardheader" tabindex="-1"><a class="header-anchor" href="#cardheader">CardHeader</a></h3>\n<p>No custom props.</p>\n<h3 id="cardtitle" tabindex="-1"><a class="header-anchor" href="#cardtitle">CardTitle</a></h3>\n<p>No custom props.</p>\n<h3 id="carddescription" tabindex="-1"><a class="header-anchor" href="#carddescription">CardDescription</a></h3>\n<p>No custom props.</p>\n<h3 id="cardaction" tabindex="-1"><a class="header-anchor" href="#cardaction">CardAction</a></h3>\n<p>No custom props.</p>\n<h3 id="cardcontent" tabindex="-1"><a class="header-anchor" href="#cardcontent">CardContent</a></h3>\n<p>No custom props.</p>\n<h3 id="cardfooter" tabindex="-1"><a class="header-anchor" href="#cardfooter">CardFooter</a></h3>\n<p>No custom props.</p>\n<h2 id="related-docs" tabindex="-1"><a class="header-anchor" href="#related-docs">Related docs</a></h2>\n<ul>\n<li><a href="/docs/components/button">Button</a></li>\n<li><a href="/docs/components/input">Input</a></li>\n</ul>\n',
		toc: [
			{
				depth: 2,
				title: 'Registry install',
				href: '#registry-install',
			},
			{
				depth: 2,
				title: 'Package usage',
				href: '#package-usage',
			},
			{
				depth: 2,
				title: 'Highlights',
				href: '#highlights',
			},
			{
				depth: 2,
				title: 'Registry dependencies',
				href: '#registry-dependencies',
			},
			{
				depth: 2,
				title: 'API reference',
				href: '#api-reference',
			},
			{
				depth: 3,
				title: 'Card',
				href: '#card',
			},
			{
				depth: 3,
				title: 'CardHeader',
				href: '#cardheader',
			},
			{
				depth: 3,
				title: 'CardTitle',
				href: '#cardtitle',
			},
			{
				depth: 3,
				title: 'CardDescription',
				href: '#carddescription',
			},
			{
				depth: 3,
				title: 'CardAction',
				href: '#cardaction',
			},
			{
				depth: 3,
				title: 'CardContent',
				href: '#cardcontent',
			},
			{
				depth: 3,
				title: 'CardFooter',
				href: '#cardfooter',
			},
			{
				depth: 2,
				title: 'Related docs',
				href: '#related-docs',
			},
		],
	},
	{
		slug: 'components/carousel',
		url: '/docs/components/carousel',
		title: 'Carousel',
		description: 'A measured SolidJS carousel with accessible horizontal and vertical keyboard navigation.',
		html: '<blockquote>\n<p>Use Carousel with an accessible label so the measured viewport and orientation-specific keyboard controls have a clear name.</p>\n</blockquote>\n<h2 id="registry-install" tabindex="-1"><a class="header-anchor" href="#registry-install">Registry install</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#953800;--shiki-dark:#B392F0">pnpm</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> dlx</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> shadcn@latest</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> add</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> @tile-ui/carousel</span></span>\n<span class="line"></span></code></pre><h2 id="package-usage" tabindex="-1"><a class="header-anchor" href="#package-usage">Package usage</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">import</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">from</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> \'@tile-ui/solid\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Carousel</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> aria-label</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"Feature carousel"</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> orientation</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"vertical"</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">CarouselContent</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> viewportStyle</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">{ height: </span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"12rem"</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> }</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">}</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">CarouselItem</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>One&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">CarouselItem</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">CarouselItem</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>Two&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">CarouselItem</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">CarouselContent</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">CarouselPrevious</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> />&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">CarouselNext</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> />&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Carousel</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"></span></code></pre><h2 id="highlights" tabindex="-1"><a class="header-anchor" href="#highlights">Highlights</a></h2>\n<ul>\n<li>Measured horizontal and vertical viewports</li>\n<li>Arrow-key navigation follows orientation</li>\n<li>Accessible region labels describe each carousel</li>\n</ul>\n<h2 id="registry-dependencies" tabindex="-1"><a class="header-anchor" href="#registry-dependencies">Registry dependencies</a></h2>\n<table>\n<thead>\n<tr>\n<th>Item</th>\n<th>Purpose</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>carousel</code></td>\n<td>Component source and module styles</td>\n</tr>\n<tr>\n<td><code>core</code></td>\n<td>Framework-agnostic logic helpers</td>\n</tr>\n<tr>\n<td><code>button</code></td>\n<td>Registry component dependency</td>\n</tr>\n<tr>\n<td><code>styles</code></td>\n<td>Shared SCSS tokens and globals</td>\n</tr>\n</tbody>\n</table>\n<h2 id="api-reference" tabindex="-1"><a class="header-anchor" href="#api-reference">API reference</a></h2>\n<h3 id="carousel" tabindex="-1"><a class="header-anchor" href="#carousel">Carousel</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>orientation</code></td>\n<td><code>\'horizontal\' | \'vertical\'</code></td>\n<td>‘horizontal’</td>\n</tr>\n<tr>\n<td><code>ref</code></td>\n<td><code>CarouselRef&lt;HTMLDivElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="carouselcontent" tabindex="-1"><a class="header-anchor" href="#carouselcontent">CarouselContent</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>ref</code></td>\n<td><code>CarouselRef&lt;HTMLDivElement&gt;</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>viewportStyle</code></td>\n<td><code>JSX.CSSProperties | string</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="carouselitem" tabindex="-1"><a class="header-anchor" href="#carouselitem">CarouselItem</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>ref</code></td>\n<td><code>CarouselRef&lt;HTMLDivElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="carouselprevious" tabindex="-1"><a class="header-anchor" href="#carouselprevious">CarouselPrevious</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>ref</code></td>\n<td><code>CarouselRef&lt;HTMLButtonElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="carouselnext" tabindex="-1"><a class="header-anchor" href="#carouselnext">CarouselNext</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>ref</code></td>\n<td><code>CarouselRef&lt;HTMLButtonElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h2 id="related-docs" tabindex="-1"><a class="header-anchor" href="#related-docs">Related docs</a></h2>\n<ul>\n<li><a href="/docs/components/aspect-ratio">AspectRatio</a></li>\n<li><a href="/docs/components/tabs">Tabs</a></li>\n<li><a href="/docs/components/sheet">Sheet</a></li>\n</ul>\n',
		toc: [
			{
				depth: 2,
				title: 'Registry install',
				href: '#registry-install',
			},
			{
				depth: 2,
				title: 'Package usage',
				href: '#package-usage',
			},
			{
				depth: 2,
				title: 'Highlights',
				href: '#highlights',
			},
			{
				depth: 2,
				title: 'Registry dependencies',
				href: '#registry-dependencies',
			},
			{
				depth: 2,
				title: 'API reference',
				href: '#api-reference',
			},
			{
				depth: 3,
				title: 'Carousel',
				href: '#carousel',
			},
			{
				depth: 3,
				title: 'CarouselContent',
				href: '#carouselcontent',
			},
			{
				depth: 3,
				title: 'CarouselItem',
				href: '#carouselitem',
			},
			{
				depth: 3,
				title: 'CarouselPrevious',
				href: '#carouselprevious',
			},
			{
				depth: 3,
				title: 'CarouselNext',
				href: '#carouselnext',
			},
			{
				depth: 2,
				title: 'Related docs',
				href: '#related-docs',
			},
		],
	},
	{
		slug: 'components/chart',
		url: '/docs/components/chart',
		title: 'Chart',
		description: 'Responsive SolidJS SVG chart primitives with mixed series, scoped styles, and keyboard inspection.',
		html: '<blockquote>\n<p>Use ChartContainer with a stable title or accessible name; series keys become scoped SVG and CSS identifiers, so keep them deterministic.</p>\n</blockquote>\n<h2 id="registry-install" tabindex="-1"><a class="header-anchor" href="#registry-install">Registry install</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#953800;--shiki-dark:#B392F0">pnpm</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> dlx</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> shadcn@latest</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> add</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> @tile-ui/chart</span></span>\n<span class="line"></span></code></pre><h2 id="package-usage" tabindex="-1"><a class="header-anchor" href="#package-usage">Package usage</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">import</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> { ChartContainer } </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">from</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> \'@tile-ui/solid\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">ChartContainer</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> title</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"Monthly activity"</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> config</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">{ visits: { label: </span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"Visits"</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> }, target: { label: </span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"Target"</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> } }</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">}</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> data</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">[{ month: </span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"Jan"</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">, visits: </span><span style="--shiki-light:#0550AE;--shiki-dark:#79B8FF">42</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">, target: </span><span style="--shiki-light:#0550AE;--shiki-dark:#79B8FF">50</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> }]</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">}</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> xKey</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"month"</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> series</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">[{ key: </span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"visits"</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">, type: </span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"bar"</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> }, { key: </span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"target"</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">, type: </span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"line"</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> }]</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">}</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> initialDimension</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">{ width: </span><span style="--shiki-light:#0550AE;--shiki-dark:#79B8FF">640</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">, height: </span><span style="--shiki-light:#0550AE;--shiki-dark:#79B8FF">320</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> }</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">}</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> tabIndex</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#0550AE;--shiki-dark:#79B8FF">0</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">}</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> /></span></span>\n<span class="line"></span></code></pre><h2 id="highlights" tabindex="-1"><a class="header-anchor" href="#highlights">Highlights</a></h2>\n<ul>\n<li>Mixed line, bar, and area series</li>\n<li>Stable named SVG IDs and scoped theme styles</li>\n<li>Keyboard inspection announces the active datum</li>\n</ul>\n<h2 id="registry-dependencies" tabindex="-1"><a class="header-anchor" href="#registry-dependencies">Registry dependencies</a></h2>\n<table>\n<thead>\n<tr>\n<th>Item</th>\n<th>Purpose</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>chart</code></td>\n<td>Component source and module styles</td>\n</tr>\n<tr>\n<td><code>core</code></td>\n<td>Framework-agnostic logic helpers</td>\n</tr>\n<tr>\n<td><code>styles</code></td>\n<td>Shared SCSS tokens and globals</td>\n</tr>\n</tbody>\n</table>\n<h2 id="api-reference" tabindex="-1"><a class="header-anchor" href="#api-reference">API reference</a></h2>\n<h3 id="chartcontainer" tabindex="-1"><a class="header-anchor" href="#chartcontainer">ChartContainer</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>config</code></td>\n<td><code>Record&lt;string, ChartConfigItem&gt;</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>data</code></td>\n<td><code>ChartDatum[]</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>xKey</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>series</code></td>\n<td><code>ChartSeriesItem[]</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>type</code></td>\n<td><code>\'line\' | \'bar\' | \'area\'</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>initialDimension</code></td>\n<td><code>{ width: number; height: number }</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>showLegend</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>showTooltip</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>showGrid</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>showAxis</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>title</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>children</code></td>\n<td><code>(state: ChartContextValue) =&gt; JSX.Element</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>ref</code></td>\n<td><code>CallbackRef&lt;HTMLDivElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="chartstyle" tabindex="-1"><a class="header-anchor" href="#chartstyle">ChartStyle</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>id</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>config</code></td>\n<td><code>ChartConfig</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>ref</code></td>\n<td><code>CallbackRef&lt;HTMLStyleElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="charttooltipcontent" tabindex="-1"><a class="header-anchor" href="#charttooltipcontent">ChartTooltipContent</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>active</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>payload</code></td>\n<td><code>ChartTooltipEntry[]</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>label</code></td>\n<td><code>JSX.Element</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>indicator</code></td>\n<td><code>\'line\' | \'dot\' | \'dashed\'</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>hideLabel</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>hideIndicator</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>labelFormatter</code></td>\n<td><code>(value: JSX.Element, payload: ChartTooltipEntry[]) =&gt; JSX.Element</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>formatter</code></td>\n<td><code>(value: number, name: string, item: ChartTooltipEntry, index: number) =&gt; JSX.Element</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>color</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>nameKey</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>labelKey</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>labelClass</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>ref</code></td>\n<td><code>CallbackRef&lt;HTMLDivElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="chartlegendcontent" tabindex="-1"><a class="header-anchor" href="#chartlegendcontent">ChartLegendContent</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>payload</code></td>\n<td><code>ChartLegendItem[]</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>hideIcon</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>verticalAlign</code></td>\n<td><code>\'top\' | \'bottom\'</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>formatter</code></td>\n<td><code>(value: string, item: ChartLegendItem, index: number) =&gt; JSX.Element</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>ref</code></td>\n<td><code>CallbackRef&lt;HTMLDivElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="charttooltip" tabindex="-1"><a class="header-anchor" href="#charttooltip">ChartTooltip</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>children</code></td>\n<td><code>(state: { active: boolean; payload: ChartTooltipEntry[]; label: JSX.Element }) =&gt; JSX.Element</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="chartlegend" tabindex="-1"><a class="header-anchor" href="#chartlegend">ChartLegend</a></h3>\n<p>No custom props.</p>\n<h2 id="related-docs" tabindex="-1"><a class="header-anchor" href="#related-docs">Related docs</a></h2>\n<ul>\n<li><a href="/docs/components/calendar">Calendar</a></li>\n<li><a href="/docs/components/table">Table</a></li>\n<li><a href="/docs/components/card">Card</a></li>\n</ul>\n',
		toc: [
			{
				depth: 2,
				title: 'Registry install',
				href: '#registry-install',
			},
			{
				depth: 2,
				title: 'Package usage',
				href: '#package-usage',
			},
			{
				depth: 2,
				title: 'Highlights',
				href: '#highlights',
			},
			{
				depth: 2,
				title: 'Registry dependencies',
				href: '#registry-dependencies',
			},
			{
				depth: 2,
				title: 'API reference',
				href: '#api-reference',
			},
			{
				depth: 3,
				title: 'ChartContainer',
				href: '#chartcontainer',
			},
			{
				depth: 3,
				title: 'ChartStyle',
				href: '#chartstyle',
			},
			{
				depth: 3,
				title: 'ChartTooltipContent',
				href: '#charttooltipcontent',
			},
			{
				depth: 3,
				title: 'ChartLegendContent',
				href: '#chartlegendcontent',
			},
			{
				depth: 3,
				title: 'ChartTooltip',
				href: '#charttooltip',
			},
			{
				depth: 3,
				title: 'ChartLegend',
				href: '#chartlegend',
			},
			{
				depth: 2,
				title: 'Related docs',
				href: '#related-docs',
			},
		],
	},
	{
		slug: 'components/checkbox',
		url: '/docs/components/checkbox',
		title: 'Checkbox',
		description: 'An accessible tri-state SolidJS checkbox with controlled and native form state.',
		html: '<blockquote>\n<p>Use Checkbox for tri-state choices that participate in native forms.</p>\n</blockquote>\n<h2 id="registry-install" tabindex="-1"><a class="header-anchor" href="#registry-install">Registry install</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#953800;--shiki-dark:#B392F0">pnpm</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> dlx</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> shadcn@latest</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> add</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> @tile-ui/checkbox</span></span>\n<span class="line"></span></code></pre><h2 id="package-usage" tabindex="-1"><a class="header-anchor" href="#package-usage">Package usage</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">import</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> { Checkbox } </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">from</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> \'@tile-ui/solid\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Checkbox</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> /></span></span>\n<span class="line"></span></code></pre><h2 id="highlights" tabindex="-1"><a class="header-anchor" href="#highlights">Highlights</a></h2>\n<ul>\n<li>Indeterminate state support</li>\n<li>Accessible checkbox role</li>\n<li>Pairs with Field and Form</li>\n</ul>\n<h2 id="registry-dependencies" tabindex="-1"><a class="header-anchor" href="#registry-dependencies">Registry dependencies</a></h2>\n<table>\n<thead>\n<tr>\n<th>Item</th>\n<th>Purpose</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>checkbox</code></td>\n<td>Component source and module styles</td>\n</tr>\n<tr>\n<td><code>core</code></td>\n<td>Framework-agnostic logic helpers</td>\n</tr>\n<tr>\n<td><code>utils</code></td>\n<td>Shared utility helpers</td>\n</tr>\n<tr>\n<td><code>styles</code></td>\n<td>Shared SCSS tokens and globals</td>\n</tr>\n</tbody>\n</table>\n<h2 id="api-reference" tabindex="-1"><a class="header-anchor" href="#api-reference">API reference</a></h2>\n<h3 id="checkbox" tabindex="-1"><a class="header-anchor" href="#checkbox">Checkbox</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>checked</code></td>\n<td><code>CheckboxCheckedState</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>defaultChecked</code></td>\n<td><code>CheckboxCheckedState</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>onCheckedChange</code></td>\n<td><code>(checked: CheckboxCheckedState) =&gt; void</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>name</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>value</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>form</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>required</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h2 id="related-docs" tabindex="-1"><a class="header-anchor" href="#related-docs">Related docs</a></h2>\n<ul>\n<li><a href="/docs/components/switch">Switch</a></li>\n<li><a href="/docs/components/radio-group">RadioGroup</a></li>\n<li><a href="/docs/components/form">Form</a></li>\n</ul>\n',
		toc: [
			{
				depth: 2,
				title: 'Registry install',
				href: '#registry-install',
			},
			{
				depth: 2,
				title: 'Package usage',
				href: '#package-usage',
			},
			{
				depth: 2,
				title: 'Highlights',
				href: '#highlights',
			},
			{
				depth: 2,
				title: 'Registry dependencies',
				href: '#registry-dependencies',
			},
			{
				depth: 2,
				title: 'API reference',
				href: '#api-reference',
			},
			{
				depth: 3,
				title: 'Checkbox',
				href: '#checkbox',
			},
			{
				depth: 2,
				title: 'Related docs',
				href: '#related-docs',
			},
		],
	},
	{
		slug: 'components/collapsible',
		url: '/docs/components/collapsible',
		title: 'Collapsible',
		description: 'Accessible SolidJS collapsible trigger and region primitives.',
		html: '<blockquote>\n<p>Use Collapsible for one disclosure trigger and its associated content region.</p>\n</blockquote>\n<h2 id="registry-install" tabindex="-1"><a class="header-anchor" href="#registry-install">Registry install</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#953800;--shiki-dark:#B392F0">pnpm</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> dlx</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> shadcn@latest</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> add</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> @tile-ui/collapsible</span></span>\n<span class="line"></span></code></pre><h2 id="package-usage" tabindex="-1"><a class="header-anchor" href="#package-usage">Package usage</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">import</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> { Collapsible, CollapsibleTrigger, CollapsibleContent } </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">from</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> \'@tile-ui/solid\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Collapsible</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">CollapsibleTrigger</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>Details&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">CollapsibleTrigger</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">CollapsibleContent</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>Extra content here.&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">CollapsibleContent</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Collapsible</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"></span></code></pre><h2 id="highlights" tabindex="-1"><a class="header-anchor" href="#highlights">Highlights</a></h2>\n<ul>\n<li>Controlled and uncontrolled state</li>\n<li>Stable trigger and region IDs</li>\n<li>Native hidden and disabled semantics</li>\n</ul>\n<h2 id="registry-dependencies" tabindex="-1"><a class="header-anchor" href="#registry-dependencies">Registry dependencies</a></h2>\n<table>\n<thead>\n<tr>\n<th>Item</th>\n<th>Purpose</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>collapsible</code></td>\n<td>Component source and module styles</td>\n</tr>\n<tr>\n<td><code>core</code></td>\n<td>Framework-agnostic logic helpers</td>\n</tr>\n<tr>\n<td><code>utils</code></td>\n<td>Shared utility helpers</td>\n</tr>\n<tr>\n<td><code>styles</code></td>\n<td>Shared SCSS tokens and globals</td>\n</tr>\n</tbody>\n</table>\n<h2 id="api-reference" tabindex="-1"><a class="header-anchor" href="#api-reference">API reference</a></h2>\n<h3 id="collapsible" tabindex="-1"><a class="header-anchor" href="#collapsible">Collapsible</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>open</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>defaultOpen</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>disabled</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>onOpenChange</code></td>\n<td><code>(open: boolean) =&gt; void</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>triggerId</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>contentId</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>ref</code></td>\n<td><code>CollapsibleRef&lt;HTMLDivElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="collapsibletrigger" tabindex="-1"><a class="header-anchor" href="#collapsibletrigger">CollapsibleTrigger</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>ref</code></td>\n<td><code>CollapsibleRef&lt;HTMLButtonElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="collapsiblecontent" tabindex="-1"><a class="header-anchor" href="#collapsiblecontent">CollapsibleContent</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>ref</code></td>\n<td><code>CollapsibleRef&lt;HTMLDivElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h2 id="related-docs" tabindex="-1"><a class="header-anchor" href="#related-docs">Related docs</a></h2>\n<ul>\n<li><a href="/docs/components/accordion">Accordion</a></li>\n<li><a href="/docs/components/dialog">Dialog</a></li>\n<li><a href="/docs/components/sheet">Sheet</a></li>\n</ul>\n',
		toc: [
			{
				depth: 2,
				title: 'Registry install',
				href: '#registry-install',
			},
			{
				depth: 2,
				title: 'Package usage',
				href: '#package-usage',
			},
			{
				depth: 2,
				title: 'Highlights',
				href: '#highlights',
			},
			{
				depth: 2,
				title: 'Registry dependencies',
				href: '#registry-dependencies',
			},
			{
				depth: 2,
				title: 'API reference',
				href: '#api-reference',
			},
			{
				depth: 3,
				title: 'Collapsible',
				href: '#collapsible',
			},
			{
				depth: 3,
				title: 'CollapsibleTrigger',
				href: '#collapsibletrigger',
			},
			{
				depth: 3,
				title: 'CollapsibleContent',
				href: '#collapsiblecontent',
			},
			{
				depth: 2,
				title: 'Related docs',
				href: '#related-docs',
			},
		],
	},
	{
		slug: 'components/combobox',
		url: '/docs/components/combobox',
		title: 'Combobox',
		description: 'A searchable SolidJS combobox with controlled selection and logical keyboard exit.',
		html: '<blockquote>\n<p>Use Combobox for one searchable selection with controlled callbacks and logical Tab movement after the popup.</p>\n</blockquote>\n<h2 id="registry-install" tabindex="-1"><a class="header-anchor" href="#registry-install">Registry install</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#953800;--shiki-dark:#B392F0">pnpm</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> dlx</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> shadcn@latest</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> add</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> @tile-ui/combobox</span></span>\n<span class="line"></span></code></pre><h2 id="package-usage" tabindex="-1"><a class="header-anchor" href="#package-usage">Package usage</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">import</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> { Combobox } </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">from</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> \'@tile-ui/solid\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Combobox</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> items</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">[{ value: </span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"solid"</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">, label: </span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"Solid"</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">, keywords: [</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"ssr"</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">] }]</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">}</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> onValueChange</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#953800;--shiki-dark:#FFAB70">value</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">) </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=></span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> console.</span><span style="--shiki-light:#8250DF;--shiki-dark:#B392F0">log</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">(value)</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">}</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> /></span></span>\n<span class="line"></span></code></pre><h2 id="highlights" tabindex="-1"><a class="header-anchor" href="#highlights">Highlights</a></h2>\n<ul>\n<li>Data-driven filtering with keywords and custom filters</li>\n<li>Arrow, Home, End, Enter, Escape, and logical Tab behavior</li>\n<li><code>value</code> and <code>onValueChange</code> support controlled selection</li>\n</ul>\n<h2 id="foundation-behavior" tabindex="-1"><a class="header-anchor" href="#foundation-behavior">Foundation behavior</a></h2>\n<p>This Solid implementation uses native nested primitives and does not expose <code>asChild</code>. Controlled state uses Solid accessors and explicit callbacks such as <code>onOpenChange</code>, <code>onValueChange</code>, or <code>onSearchChange</code> where the family supports them.</p>\n<p>Portal content is omitted from the server response and mounted during hydration into the resolved document or nested portal scope. Closed and default-open roots keep deterministic trigger IDs and ARIA relationships without a hydration mismatch.</p>\n<p>Keyboard behavior follows the shared Foundation: focus and Tab order, Escape dismissal, arrow-key movement, typeahead, submenu branches, and trigger restoration are applied according to the component role.</p>\n<h2 id="registry-dependencies" tabindex="-1"><a class="header-anchor" href="#registry-dependencies">Registry dependencies</a></h2>\n<table>\n<thead>\n<tr>\n<th>Item</th>\n<th>Purpose</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>combobox</code></td>\n<td>Component source and module styles</td>\n</tr>\n<tr>\n<td><code>core</code></td>\n<td>Framework-agnostic logic helpers</td>\n</tr>\n<tr>\n<td><code>utils</code></td>\n<td>Shared utility helpers</td>\n</tr>\n<tr>\n<td><code>select</code></td>\n<td>Registry component dependency</td>\n</tr>\n<tr>\n<td><code>styles</code></td>\n<td>Shared SCSS tokens and globals</td>\n</tr>\n</tbody>\n</table>\n<h2 id="api-reference" tabindex="-1"><a class="header-anchor" href="#api-reference">API reference</a></h2>\n<h3 id="combobox" tabindex="-1"><a class="header-anchor" href="#combobox">Combobox</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>items</code></td>\n<td><code>ComboboxItem[]</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>value</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>onValueChange</code></td>\n<td><code>(value: string) =&gt; void</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>placeholder</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>searchPlaceholder</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>emptyText</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>notFoundText</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>maxItems</code></td>\n<td><code>number</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>disabled</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>filter</code></td>\n<td><code>(item: ComboboxItem, query: string) =&gt; boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>defaultValue</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>container</code></td>\n<td><code>Node</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>triggerId</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>contentId</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>inputId</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>ref</code></td>\n<td><code>CallbackRef&lt;HTMLDivElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h2 id="related-docs" tabindex="-1"><a class="header-anchor" href="#related-docs">Related docs</a></h2>\n<ul>\n<li><a href="/docs/components/select">Select</a></li>\n<li><a href="/docs/components/command">Command</a></li>\n<li><a href="/docs/components/input">Input</a></li>\n</ul>\n',
		toc: [
			{
				depth: 2,
				title: 'Registry install',
				href: '#registry-install',
			},
			{
				depth: 2,
				title: 'Package usage',
				href: '#package-usage',
			},
			{
				depth: 2,
				title: 'Highlights',
				href: '#highlights',
			},
			{
				depth: 2,
				title: 'Foundation behavior',
				href: '#foundation-behavior',
			},
			{
				depth: 2,
				title: 'Registry dependencies',
				href: '#registry-dependencies',
			},
			{
				depth: 2,
				title: 'API reference',
				href: '#api-reference',
			},
			{
				depth: 3,
				title: 'Combobox',
				href: '#combobox',
			},
			{
				depth: 2,
				title: 'Related docs',
				href: '#related-docs',
			},
		],
	},
	{
		slug: 'components/command',
		url: '/docs/components/command',
		title: 'Command',
		description: 'Composable SolidJS command primitives with filtering and keyboard navigation.',
		html: '<blockquote>\n<p>Use Command primitives to compose filtered action collections, groups, empty states, shortcuts, and optional modal palettes.</p>\n</blockquote>\n<h2 id="registry-install" tabindex="-1"><a class="header-anchor" href="#registry-install">Registry install</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#953800;--shiki-dark:#B392F0">pnpm</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> dlx</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> shadcn@latest</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> add</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> @tile-ui/command</span></span>\n<span class="line"></span></code></pre><h2 id="package-usage" tabindex="-1"><a class="header-anchor" href="#package-usage">Package usage</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">import</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> { Command } </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">from</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> \'@tile-ui/solid\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Command</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> loop</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">CommandInput</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> placeholder</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"Filter actions"</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> /></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">CommandList</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">CommandEmpty</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>No match.&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">CommandEmpty</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">CommandGroup</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> heading</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"Actions"</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">CommandItem</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> value</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"open"</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>Open docs&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">CommandItem</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">CommandGroup</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">CommandList</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Command</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"></span></code></pre><h2 id="highlights" tabindex="-1"><a class="header-anchor" href="#highlights">Highlights</a></h2>\n<ul>\n<li>Composable Input, List, Group, Item, Empty, and Dialog primitives</li>\n<li>Filtered keyboard navigation with optional looping</li>\n<li>Controlled search through <code>search</code> and <code>onSearchChange</code></li>\n</ul>\n<h2 id="foundation-behavior" tabindex="-1"><a class="header-anchor" href="#foundation-behavior">Foundation behavior</a></h2>\n<p>This Solid implementation uses native nested primitives and does not expose <code>asChild</code>. Controlled state uses Solid accessors and explicit callbacks such as <code>onOpenChange</code>, <code>onValueChange</code>, or <code>onSearchChange</code> where the family supports them.</p>\n<p>Portal content is omitted from the server response and mounted during hydration into the resolved document or nested portal scope. Closed and default-open roots keep deterministic trigger IDs and ARIA relationships without a hydration mismatch.</p>\n<p>Keyboard behavior follows the shared Foundation: focus and Tab order, Escape dismissal, arrow-key movement, typeahead, submenu branches, and trigger restoration are applied according to the component role.</p>\n<h2 id="registry-dependencies" tabindex="-1"><a class="header-anchor" href="#registry-dependencies">Registry dependencies</a></h2>\n<table>\n<thead>\n<tr>\n<th>Item</th>\n<th>Purpose</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>command</code></td>\n<td>Component source and module styles</td>\n</tr>\n<tr>\n<td><code>core</code></td>\n<td>Framework-agnostic logic helpers</td>\n</tr>\n<tr>\n<td><code>utils</code></td>\n<td>Shared utility helpers</td>\n</tr>\n<tr>\n<td><code>styles</code></td>\n<td>Shared SCSS tokens and globals</td>\n</tr>\n</tbody>\n</table>\n<h2 id="api-reference" tabindex="-1"><a class="header-anchor" href="#api-reference">API reference</a></h2>\n<h3 id="command" tabindex="-1"><a class="header-anchor" href="#command">Command</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>items</code></td>\n<td><code>CommandItemDef[]</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>groups</code></td>\n<td><code>CommandGroupDef[]</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>filter</code></td>\n<td><code>(value: string, search: string, keywords?: string[]) =&gt; boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>loop</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>listId</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>search</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>defaultSearch</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>onSearchChange</code></td>\n<td><code>(search: string) =&gt; void</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>ref</code></td>\n<td><code>CallbackRef&lt;HTMLDivElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="commandinput" tabindex="-1"><a class="header-anchor" href="#commandinput">CommandInput</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>ref</code></td>\n<td><code>CallbackRef&lt;HTMLInputElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="commandlist" tabindex="-1"><a class="header-anchor" href="#commandlist">CommandList</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>ref</code></td>\n<td><code>CallbackRef&lt;HTMLDivElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="commandempty" tabindex="-1"><a class="header-anchor" href="#commandempty">CommandEmpty</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>ref</code></td>\n<td><code>CallbackRef&lt;HTMLDivElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="commandgroup" tabindex="-1"><a class="header-anchor" href="#commandgroup">CommandGroup</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>heading</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>headingId</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>ref</code></td>\n<td><code>CallbackRef&lt;HTMLDivElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="commanditem" tabindex="-1"><a class="header-anchor" href="#commanditem">CommandItem</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>value</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>textValue</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>keywords</code></td>\n<td><code>string[]</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>disabled</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>onSelect</code></td>\n<td><code>(value: string) =&gt; void</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>ref</code></td>\n<td><code>CallbackRef&lt;HTMLDivElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="commandseparator" tabindex="-1"><a class="header-anchor" href="#commandseparator">CommandSeparator</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>ref</code></td>\n<td><code>CallbackRef&lt;HTMLDivElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="commandshortcut" tabindex="-1"><a class="header-anchor" href="#commandshortcut">CommandShortcut</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>ref</code></td>\n<td><code>CallbackRef&lt;HTMLSpanElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="commanddialog" tabindex="-1"><a class="header-anchor" href="#commanddialog">CommandDialog</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>open</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>onOpenChange</code></td>\n<td><code>(open: boolean) =&gt; void</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>title</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>description</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>showCloseButton</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>container</code></td>\n<td><code>Node</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>ref</code></td>\n<td><code>CallbackRef&lt;HTMLDivElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h2 id="related-docs" tabindex="-1"><a class="header-anchor" href="#related-docs">Related docs</a></h2>\n<ul>\n<li><a href="/docs/components/combobox">Combobox</a></li>\n<li><a href="/docs/components/dialog">Dialog</a></li>\n<li><a href="/docs/components/kbd">Kbd</a></li>\n</ul>\n',
		toc: [
			{
				depth: 2,
				title: 'Registry install',
				href: '#registry-install',
			},
			{
				depth: 2,
				title: 'Package usage',
				href: '#package-usage',
			},
			{
				depth: 2,
				title: 'Highlights',
				href: '#highlights',
			},
			{
				depth: 2,
				title: 'Foundation behavior',
				href: '#foundation-behavior',
			},
			{
				depth: 2,
				title: 'Registry dependencies',
				href: '#registry-dependencies',
			},
			{
				depth: 2,
				title: 'API reference',
				href: '#api-reference',
			},
			{
				depth: 3,
				title: 'Command',
				href: '#command',
			},
			{
				depth: 3,
				title: 'CommandInput',
				href: '#commandinput',
			},
			{
				depth: 3,
				title: 'CommandList',
				href: '#commandlist',
			},
			{
				depth: 3,
				title: 'CommandEmpty',
				href: '#commandempty',
			},
			{
				depth: 3,
				title: 'CommandGroup',
				href: '#commandgroup',
			},
			{
				depth: 3,
				title: 'CommandItem',
				href: '#commanditem',
			},
			{
				depth: 3,
				title: 'CommandSeparator',
				href: '#commandseparator',
			},
			{
				depth: 3,
				title: 'CommandShortcut',
				href: '#commandshortcut',
			},
			{
				depth: 3,
				title: 'CommandDialog',
				href: '#commanddialog',
			},
			{
				depth: 2,
				title: 'Related docs',
				href: '#related-docs',
			},
		],
	},
	{
		slug: 'components/context-menu',
		url: '/docs/components/context-menu',
		title: 'ContextMenu',
		description: 'A SolidJS context menu with keyboard opening, selectable items, and nested branches.',
		html: '<blockquote>\n<p>Use ContextMenu for pointer or keyboard-invoked actions with checkbox, radio, and submenu branches.</p>\n</blockquote>\n<h2 id="registry-install" tabindex="-1"><a class="header-anchor" href="#registry-install">Registry install</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#953800;--shiki-dark:#B392F0">pnpm</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> dlx</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> shadcn@latest</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> add</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> @tile-ui/context-menu</span></span>\n<span class="line"></span></code></pre><h2 id="package-usage" tabindex="-1"><a class="header-anchor" href="#package-usage">Package usage</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">import</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> { ContextMenu } </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">from</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> \'@tile-ui/solid\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">ContextMenu</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">ContextMenuTrigger</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> tabindex</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"0"</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>Right-click or press Shift+F10&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">ContextMenuTrigger</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">ContextMenuContent</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">ContextMenuItem</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>Open&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">ContextMenuItem</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">ContextMenuContent</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">ContextMenu</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"></span></code></pre><h2 id="highlights" tabindex="-1"><a class="header-anchor" href="#highlights">Highlights</a></h2>\n<ul>\n<li>Pointer contextmenu and Shift+F10 keyboard opening</li>\n<li>Checkbox, radio, and nested submenu branches</li>\n<li>Focus returns through the shared menu Foundation</li>\n</ul>\n<h2 id="foundation-behavior" tabindex="-1"><a class="header-anchor" href="#foundation-behavior">Foundation behavior</a></h2>\n<p>This Solid implementation uses native nested primitives and does not expose <code>asChild</code>. Controlled state uses Solid accessors and explicit callbacks such as <code>onOpenChange</code>, <code>onValueChange</code>, or <code>onSearchChange</code> where the family supports them.</p>\n<p>Portal content is omitted from the server response and mounted during hydration into the resolved document or nested portal scope. Closed and default-open roots keep deterministic trigger IDs and ARIA relationships without a hydration mismatch.</p>\n<p>Keyboard behavior follows the shared Foundation: focus and Tab order, Escape dismissal, arrow-key movement, typeahead, submenu branches, and trigger restoration are applied according to the component role.</p>\n<h2 id="registry-dependencies" tabindex="-1"><a class="header-anchor" href="#registry-dependencies">Registry dependencies</a></h2>\n<table>\n<thead>\n<tr>\n<th>Item</th>\n<th>Purpose</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>context-menu</code></td>\n<td>Component source and module styles</td>\n</tr>\n<tr>\n<td><code>core</code></td>\n<td>Framework-agnostic logic helpers</td>\n</tr>\n<tr>\n<td><code>dropdown-menu</code></td>\n<td>Registry component dependency</td>\n</tr>\n<tr>\n<td><code>styles</code></td>\n<td>Shared SCSS tokens and globals</td>\n</tr>\n</tbody>\n</table>\n<h2 id="api-reference" tabindex="-1"><a class="header-anchor" href="#api-reference">API reference</a></h2>\n<h3 id="contextmenu" tabindex="-1"><a class="header-anchor" href="#contextmenu">ContextMenu</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>open</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>defaultOpen</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>onOpenChange</code></td>\n<td><code>(open: boolean) =&gt; void</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="contextmenutrigger" tabindex="-1"><a class="header-anchor" href="#contextmenutrigger">ContextMenuTrigger</a></h3>\n<p>No custom props.</p>\n<h3 id="contextmenuitem" tabindex="-1"><a class="header-anchor" href="#contextmenuitem">ContextMenuItem</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>inset</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>variant</code></td>\n<td><code>\'default\' | \'destructive\'</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>disabled</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>onSelect</code></td>\n<td><code>(event: Event) =&gt; void</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="contextmenucheckboxitem" tabindex="-1"><a class="header-anchor" href="#contextmenucheckboxitem">ContextMenuCheckboxItem</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>checked</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>defaultChecked</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>onCheckedChange</code></td>\n<td><code>(checked: boolean) =&gt; void</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>disabled</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="contextmenuradiogroup" tabindex="-1"><a class="header-anchor" href="#contextmenuradiogroup">ContextMenuRadioGroup</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>value</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>defaultValue</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>onValueChange</code></td>\n<td><code>(value: string) =&gt; void</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="contextmenuradioitem" tabindex="-1"><a class="header-anchor" href="#contextmenuradioitem">ContextMenuRadioItem</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>value</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>disabled</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="contextmenulabel" tabindex="-1"><a class="header-anchor" href="#contextmenulabel">ContextMenuLabel</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>inset</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="contextmenusub" tabindex="-1"><a class="header-anchor" href="#contextmenusub">ContextMenuSub</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>open</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>defaultOpen</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>onOpenChange</code></td>\n<td><code>(open: boolean) =&gt; void</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="contextmenusubtrigger" tabindex="-1"><a class="header-anchor" href="#contextmenusubtrigger">ContextMenuSubTrigger</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>inset</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>disabled</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="contextmenuportal" tabindex="-1"><a class="header-anchor" href="#contextmenuportal">ContextMenuPortal</a></h3>\n<p>No custom props.</p>\n<h3 id="contextmenucontent" tabindex="-1"><a class="header-anchor" href="#contextmenucontent">ContextMenuContent</a></h3>\n<p>No custom props.</p>\n<h3 id="contextmenugroup" tabindex="-1"><a class="header-anchor" href="#contextmenugroup">ContextMenuGroup</a></h3>\n<p>No custom props.</p>\n<h3 id="contextmenuseparator" tabindex="-1"><a class="header-anchor" href="#contextmenuseparator">ContextMenuSeparator</a></h3>\n<p>No custom props.</p>\n<h3 id="contextmenushortcut" tabindex="-1"><a class="header-anchor" href="#contextmenushortcut">ContextMenuShortcut</a></h3>\n<p>No custom props.</p>\n<h3 id="contextmenusubcontent" tabindex="-1"><a class="header-anchor" href="#contextmenusubcontent">ContextMenuSubContent</a></h3>\n<p>No custom props.</p>\n<h2 id="related-docs" tabindex="-1"><a class="header-anchor" href="#related-docs">Related docs</a></h2>\n<ul>\n<li><a href="/docs/components/dropdown-menu">DropdownMenu</a></li>\n<li><a href="/docs/components/menubar">Menubar</a></li>\n<li><a href="/docs/components/command">Command</a></li>\n</ul>\n',
		toc: [
			{
				depth: 2,
				title: 'Registry install',
				href: '#registry-install',
			},
			{
				depth: 2,
				title: 'Package usage',
				href: '#package-usage',
			},
			{
				depth: 2,
				title: 'Highlights',
				href: '#highlights',
			},
			{
				depth: 2,
				title: 'Foundation behavior',
				href: '#foundation-behavior',
			},
			{
				depth: 2,
				title: 'Registry dependencies',
				href: '#registry-dependencies',
			},
			{
				depth: 2,
				title: 'API reference',
				href: '#api-reference',
			},
			{
				depth: 3,
				title: 'ContextMenu',
				href: '#contextmenu',
			},
			{
				depth: 3,
				title: 'ContextMenuTrigger',
				href: '#contextmenutrigger',
			},
			{
				depth: 3,
				title: 'ContextMenuItem',
				href: '#contextmenuitem',
			},
			{
				depth: 3,
				title: 'ContextMenuCheckboxItem',
				href: '#contextmenucheckboxitem',
			},
			{
				depth: 3,
				title: 'ContextMenuRadioGroup',
				href: '#contextmenuradiogroup',
			},
			{
				depth: 3,
				title: 'ContextMenuRadioItem',
				href: '#contextmenuradioitem',
			},
			{
				depth: 3,
				title: 'ContextMenuLabel',
				href: '#contextmenulabel',
			},
			{
				depth: 3,
				title: 'ContextMenuSub',
				href: '#contextmenusub',
			},
			{
				depth: 3,
				title: 'ContextMenuSubTrigger',
				href: '#contextmenusubtrigger',
			},
			{
				depth: 3,
				title: 'ContextMenuPortal',
				href: '#contextmenuportal',
			},
			{
				depth: 3,
				title: 'ContextMenuContent',
				href: '#contextmenucontent',
			},
			{
				depth: 3,
				title: 'ContextMenuGroup',
				href: '#contextmenugroup',
			},
			{
				depth: 3,
				title: 'ContextMenuSeparator',
				href: '#contextmenuseparator',
			},
			{
				depth: 3,
				title: 'ContextMenuShortcut',
				href: '#contextmenushortcut',
			},
			{
				depth: 3,
				title: 'ContextMenuSubContent',
				href: '#contextmenusubcontent',
			},
			{
				depth: 2,
				title: 'Related docs',
				href: '#related-docs',
			},
		],
	},
	{
		slug: 'components/dialog',
		url: '/docs/components/dialog',
		title: 'Dialog',
		description: 'Accessible SolidJS dialog primitives with controlled and uncontrolled state.',
		html: '<blockquote>\n<p>Use Dialog for accessible SolidJS modal interactions with focus management.</p>\n</blockquote>\n<h2 id="registry-install" tabindex="-1"><a class="header-anchor" href="#registry-install">Registry install</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#953800;--shiki-dark:#B392F0">pnpm</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> dlx</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> shadcn@latest</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> add</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> @tile-ui/dialog</span></span>\n<span class="line"></span></code></pre><h2 id="package-usage" tabindex="-1"><a class="header-anchor" href="#package-usage">Package usage</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">import</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, Button } </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">from</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> \'@tile-ui/solid\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Dialog</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">DialogTrigger</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>Open&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">DialogTrigger</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">DialogContent</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">DialogHeader</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t\t\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">DialogTitle</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>Edit profile&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">DialogTitle</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t\t\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">DialogDescription</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>Make changes to your profile.&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">DialogDescription</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t\t&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">DialogHeader</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">DialogFooter</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t\t\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Button</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>Save&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Button</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t\t&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">DialogFooter</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">DialogContent</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Dialog</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"></span></code></pre><h2 id="highlights" tabindex="-1"><a class="header-anchor" href="#highlights">Highlights</a></h2>\n<ul>\n<li>Trigger, overlay, and content</li>\n<li>Header, footer, title, and description</li>\n<li>Close button</li>\n</ul>\n<h2 id="registry-dependencies" tabindex="-1"><a class="header-anchor" href="#registry-dependencies">Registry dependencies</a></h2>\n<table>\n<thead>\n<tr>\n<th>Item</th>\n<th>Purpose</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>dialog</code></td>\n<td>Component source and module styles</td>\n</tr>\n<tr>\n<td><code>core</code></td>\n<td>Framework-agnostic logic helpers</td>\n</tr>\n<tr>\n<td><code>utils</code></td>\n<td>Shared utility helpers</td>\n</tr>\n<tr>\n<td><code>button</code></td>\n<td>Registry component dependency</td>\n</tr>\n<tr>\n<td><code>styles</code></td>\n<td>Shared SCSS tokens and globals</td>\n</tr>\n</tbody>\n</table>\n<h2 id="api-reference" tabindex="-1"><a class="header-anchor" href="#api-reference">API reference</a></h2>\n<h3 id="dialog" tabindex="-1"><a class="header-anchor" href="#dialog">Dialog</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>open</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>defaultOpen</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>onOpenChange</code></td>\n<td><code>(open: boolean) =&gt; void</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>children</code></td>\n<td><code>JSX.Element</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="dialogtrigger" tabindex="-1"><a class="header-anchor" href="#dialogtrigger">DialogTrigger</a></h3>\n<p>No custom props.</p>\n<h3 id="dialogclose" tabindex="-1"><a class="header-anchor" href="#dialogclose">DialogClose</a></h3>\n<p>No custom props.</p>\n<h3 id="dialogoverlay" tabindex="-1"><a class="header-anchor" href="#dialogoverlay">DialogOverlay</a></h3>\n<p>No custom props.</p>\n<h3 id="dialogcontent" tabindex="-1"><a class="header-anchor" href="#dialogcontent">DialogContent</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>showCloseButton</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>container</code></td>\n<td><code>Node</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>overlayClass</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>id</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="dialogheader" tabindex="-1"><a class="header-anchor" href="#dialogheader">DialogHeader</a></h3>\n<p>No custom props.</p>\n<h3 id="dialogfooter" tabindex="-1"><a class="header-anchor" href="#dialogfooter">DialogFooter</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>showCloseButton</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="dialogtitle" tabindex="-1"><a class="header-anchor" href="#dialogtitle">DialogTitle</a></h3>\n<p>No custom props.</p>\n<h3 id="dialogdescription" tabindex="-1"><a class="header-anchor" href="#dialogdescription">DialogDescription</a></h3>\n<p>No custom props.</p>\n<h2 id="related-docs" tabindex="-1"><a class="header-anchor" href="#related-docs">Related docs</a></h2>\n<ul>\n<li><a href="/docs/components/alert-dialog">AlertDialog</a></li>\n<li><a href="/docs/components/sheet">Sheet</a></li>\n<li><a href="/docs/components/drawer">Drawer</a></li>\n</ul>\n',
		toc: [
			{
				depth: 2,
				title: 'Registry install',
				href: '#registry-install',
			},
			{
				depth: 2,
				title: 'Package usage',
				href: '#package-usage',
			},
			{
				depth: 2,
				title: 'Highlights',
				href: '#highlights',
			},
			{
				depth: 2,
				title: 'Registry dependencies',
				href: '#registry-dependencies',
			},
			{
				depth: 2,
				title: 'API reference',
				href: '#api-reference',
			},
			{
				depth: 3,
				title: 'Dialog',
				href: '#dialog',
			},
			{
				depth: 3,
				title: 'DialogTrigger',
				href: '#dialogtrigger',
			},
			{
				depth: 3,
				title: 'DialogClose',
				href: '#dialogclose',
			},
			{
				depth: 3,
				title: 'DialogOverlay',
				href: '#dialogoverlay',
			},
			{
				depth: 3,
				title: 'DialogContent',
				href: '#dialogcontent',
			},
			{
				depth: 3,
				title: 'DialogHeader',
				href: '#dialogheader',
			},
			{
				depth: 3,
				title: 'DialogFooter',
				href: '#dialogfooter',
			},
			{
				depth: 3,
				title: 'DialogTitle',
				href: '#dialogtitle',
			},
			{
				depth: 3,
				title: 'DialogDescription',
				href: '#dialogdescription',
			},
			{
				depth: 2,
				title: 'Related docs',
				href: '#related-docs',
			},
		],
	},
	{
		slug: 'components/direction',
		url: '/docs/components/direction',
		title: 'Direction',
		description: 'A reactive SolidJS reading-direction provider and accessor hook.',
		html: '<blockquote>\n<p>Use DirectionProvider and useDirection when layout behavior must react to LTR or RTL reading direction.</p>\n</blockquote>\n<h2 id="registry-install" tabindex="-1"><a class="header-anchor" href="#registry-install">Registry install</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#953800;--shiki-dark:#B392F0">pnpm</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> dlx</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> shadcn@latest</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> add</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> @tile-ui/direction</span></span>\n<span class="line"></span></code></pre><h2 id="package-usage" tabindex="-1"><a class="header-anchor" href="#package-usage">Package usage</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">import</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> { DirectionProvider } </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">from</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> \'@tile-ui/solid\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">DirectionProvider</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> dir</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"rtl"</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">App</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> /></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">DirectionProvider</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"></span></code></pre><h2 id="highlights" tabindex="-1"><a class="header-anchor" href="#highlights">Highlights</a></h2>\n<ul>\n<li>Reactive provider value</li>\n<li><code>useDirection</code> accessor hook</li>\n<li>Normalized LTR and RTL DOM direction</li>\n</ul>\n<h2 id="registry-dependencies" tabindex="-1"><a class="header-anchor" href="#registry-dependencies">Registry dependencies</a></h2>\n<table>\n<thead>\n<tr>\n<th>Item</th>\n<th>Purpose</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>direction</code></td>\n<td>Component source and module styles</td>\n</tr>\n<tr>\n<td><code>core</code></td>\n<td>Framework-agnostic logic helpers</td>\n</tr>\n<tr>\n<td><code>styles</code></td>\n<td>Shared SCSS tokens and globals</td>\n</tr>\n</tbody>\n</table>\n<h2 id="api-reference" tabindex="-1"><a class="header-anchor" href="#api-reference">API reference</a></h2>\n<h3 id="directionprovider" tabindex="-1"><a class="header-anchor" href="#directionprovider">DirectionProvider</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>dir</code></td>\n<td><code>\'ltr\' | \'rtl\'</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>direction</code></td>\n<td><code>DirectionValue</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="usedirection" tabindex="-1"><a class="header-anchor" href="#usedirection">useDirection</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>return</code></td>\n<td><code>Accessor&lt;DirectionValue&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h2 id="related-docs" tabindex="-1"><a class="header-anchor" href="#related-docs">Related docs</a></h2>\n<ul>\n<li><a href="/docs/components/sidebar">Sidebar</a></li>\n<li><a href="/docs/components/form">Form</a></li>\n<li><a href="/docs/components/message">Message</a></li>\n</ul>\n',
		toc: [
			{
				depth: 2,
				title: 'Registry install',
				href: '#registry-install',
			},
			{
				depth: 2,
				title: 'Package usage',
				href: '#package-usage',
			},
			{
				depth: 2,
				title: 'Highlights',
				href: '#highlights',
			},
			{
				depth: 2,
				title: 'Registry dependencies',
				href: '#registry-dependencies',
			},
			{
				depth: 2,
				title: 'API reference',
				href: '#api-reference',
			},
			{
				depth: 3,
				title: 'DirectionProvider',
				href: '#directionprovider',
			},
			{
				depth: 3,
				title: 'useDirection',
				href: '#usedirection',
			},
			{
				depth: 2,
				title: 'Related docs',
				href: '#related-docs',
			},
		],
	},
	{
		slug: 'components/drawer',
		url: '/docs/components/drawer',
		title: 'Drawer',
		description: 'A directional SolidJS drawer with modal and non-modal behavior.',
		html: '<blockquote>\n<p>Use Drawer for directional modal or non-modal panels while preserving native Solid state callbacks.</p>\n</blockquote>\n<h2 id="registry-install" tabindex="-1"><a class="header-anchor" href="#registry-install">Registry install</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#953800;--shiki-dark:#B392F0">pnpm</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> dlx</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> shadcn@latest</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> add</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> @tile-ui/drawer</span></span>\n<span class="line"></span></code></pre><h2 id="package-usage" tabindex="-1"><a class="header-anchor" href="#package-usage">Package usage</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">import</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> { Drawer } </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">from</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> \'@tile-ui/solid\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Drawer</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> direction</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"bottom"</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> modal</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#0550AE;--shiki-dark:#79B8FF">false</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">}</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> onOpenChange</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#953800;--shiki-dark:#FFAB70">open</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">) </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=></span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> console.</span><span style="--shiki-light:#8250DF;--shiki-dark:#B392F0">log</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">(open)</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">}</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">DrawerTrigger</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>Open&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">DrawerTrigger</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">DrawerContent</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">DrawerTitle</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>Activity&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">DrawerTitle</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">DrawerDescription</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>Recent builds.&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">DrawerDescription</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">DrawerContent</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Drawer</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"></span></code></pre><h2 id="highlights" tabindex="-1"><a class="header-anchor" href="#highlights">Highlights</a></h2>\n<ul>\n<li>Four directions with modal or non-modal policy</li>\n<li>Focus containment and outside blocking in modal mode</li>\n<li><code>open</code> and <code>onOpenChange</code> support controlled state</li>\n</ul>\n<h2 id="foundation-behavior" tabindex="-1"><a class="header-anchor" href="#foundation-behavior">Foundation behavior</a></h2>\n<p>This Solid implementation uses native nested primitives and does not expose <code>asChild</code>. Controlled state uses Solid accessors and explicit callbacks such as <code>onOpenChange</code>, <code>onValueChange</code>, or <code>onSearchChange</code> where the family supports them.</p>\n<p>Portal content is omitted from the server response and mounted during hydration into the resolved document or nested portal scope. Closed and default-open roots keep deterministic trigger IDs and ARIA relationships without a hydration mismatch.</p>\n<p>Keyboard behavior follows the shared Foundation: focus and Tab order, Escape dismissal, arrow-key movement, typeahead, submenu branches, and trigger restoration are applied according to the component role.</p>\n<h2 id="registry-dependencies" tabindex="-1"><a class="header-anchor" href="#registry-dependencies">Registry dependencies</a></h2>\n<table>\n<thead>\n<tr>\n<th>Item</th>\n<th>Purpose</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>drawer</code></td>\n<td>Component source and module styles</td>\n</tr>\n<tr>\n<td><code>core</code></td>\n<td>Framework-agnostic logic helpers</td>\n</tr>\n<tr>\n<td><code>utils</code></td>\n<td>Shared utility helpers</td>\n</tr>\n<tr>\n<td><code>styles</code></td>\n<td>Shared SCSS tokens and globals</td>\n</tr>\n</tbody>\n</table>\n<h2 id="api-reference" tabindex="-1"><a class="header-anchor" href="#api-reference">API reference</a></h2>\n<h3 id="drawer" tabindex="-1"><a class="header-anchor" href="#drawer">Drawer</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>direction</code></td>\n<td><code>\'top\' | \'bottom\' | \'left\' | \'right\'</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>modal</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>open</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>defaultOpen</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>onOpenChange</code></td>\n<td><code>(open: boolean) =&gt; void</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>children</code></td>\n<td><code>JSX.Element</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="drawertrigger" tabindex="-1"><a class="header-anchor" href="#drawertrigger">DrawerTrigger</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>ref</code></td>\n<td><code>CallbackRef&lt;HTMLButtonElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="drawerclose" tabindex="-1"><a class="header-anchor" href="#drawerclose">DrawerClose</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>ref</code></td>\n<td><code>CallbackRef&lt;HTMLButtonElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="draweroverlay" tabindex="-1"><a class="header-anchor" href="#draweroverlay">DrawerOverlay</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>ref</code></td>\n<td><code>CallbackRef&lt;HTMLDivElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="drawercontent" tabindex="-1"><a class="header-anchor" href="#drawercontent">DrawerContent</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>ref</code></td>\n<td><code>CallbackRef&lt;HTMLDivElement&gt;</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>showCloseButton</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>container</code></td>\n<td><code>Node</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>overlayClass</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>onEscapeKeyDown</code></td>\n<td><code>(event: DismissableLayerEvent&lt;KeyboardEvent&gt;) =&gt; void</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>onPointerDownOutside</code></td>\n<td><code>(event: DismissableLayerEvent&lt;PointerEvent&gt;) =&gt; void</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>onFocusOutside</code></td>\n<td><code>(event: DismissableLayerEvent&lt;FocusEvent&gt;) =&gt; void</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>onInteractOutside</code></td>\n<td><code>(event: DismissableLayerEvent&lt;DismissableLayerOutsideEvent&gt;) =&gt; void</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="drawerheader" tabindex="-1"><a class="header-anchor" href="#drawerheader">DrawerHeader</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>ref</code></td>\n<td><code>CallbackRef&lt;HTMLDivElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="drawerfooter" tabindex="-1"><a class="header-anchor" href="#drawerfooter">DrawerFooter</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>ref</code></td>\n<td><code>CallbackRef&lt;HTMLDivElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="drawertitle" tabindex="-1"><a class="header-anchor" href="#drawertitle">DrawerTitle</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>ref</code></td>\n<td><code>CallbackRef&lt;HTMLHeadingElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="drawerdescription" tabindex="-1"><a class="header-anchor" href="#drawerdescription">DrawerDescription</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>ref</code></td>\n<td><code>CallbackRef&lt;HTMLParagraphElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h2 id="related-docs" tabindex="-1"><a class="header-anchor" href="#related-docs">Related docs</a></h2>\n<ul>\n<li><a href="/docs/components/sheet">Sheet</a></li>\n<li><a href="/docs/components/dialog">Dialog</a></li>\n<li><a href="/docs/components/sidebar">Sidebar</a></li>\n</ul>\n',
		toc: [
			{
				depth: 2,
				title: 'Registry install',
				href: '#registry-install',
			},
			{
				depth: 2,
				title: 'Package usage',
				href: '#package-usage',
			},
			{
				depth: 2,
				title: 'Highlights',
				href: '#highlights',
			},
			{
				depth: 2,
				title: 'Foundation behavior',
				href: '#foundation-behavior',
			},
			{
				depth: 2,
				title: 'Registry dependencies',
				href: '#registry-dependencies',
			},
			{
				depth: 2,
				title: 'API reference',
				href: '#api-reference',
			},
			{
				depth: 3,
				title: 'Drawer',
				href: '#drawer',
			},
			{
				depth: 3,
				title: 'DrawerTrigger',
				href: '#drawertrigger',
			},
			{
				depth: 3,
				title: 'DrawerClose',
				href: '#drawerclose',
			},
			{
				depth: 3,
				title: 'DrawerOverlay',
				href: '#draweroverlay',
			},
			{
				depth: 3,
				title: 'DrawerContent',
				href: '#drawercontent',
			},
			{
				depth: 3,
				title: 'DrawerHeader',
				href: '#drawerheader',
			},
			{
				depth: 3,
				title: 'DrawerFooter',
				href: '#drawerfooter',
			},
			{
				depth: 3,
				title: 'DrawerTitle',
				href: '#drawertitle',
			},
			{
				depth: 3,
				title: 'DrawerDescription',
				href: '#drawerdescription',
			},
			{
				depth: 2,
				title: 'Related docs',
				href: '#related-docs',
			},
		],
	},
	{
		slug: 'components/dropdown-menu',
		url: '/docs/components/dropdown-menu',
		title: 'DropdownMenu',
		description: 'A SolidJS dropdown menu with checkbox, radio, and nested submenu items.',
		html: '<blockquote>\n<p>Use DropdownMenu to compose keyboard-ready actions, selectable items, and nested menus from native primitives.</p>\n</blockquote>\n<h2 id="registry-install" tabindex="-1"><a class="header-anchor" href="#registry-install">Registry install</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#953800;--shiki-dark:#B392F0">pnpm</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> dlx</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> shadcn@latest</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> add</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> @tile-ui/dropdown-menu</span></span>\n<span class="line"></span></code></pre><h2 id="package-usage" tabindex="-1"><a class="header-anchor" href="#package-usage">Package usage</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">import</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> { DropdownMenu } </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">from</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> \'@tile-ui/solid\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">DropdownMenu</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">DropdownMenuTrigger</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>Menu&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">DropdownMenuTrigger</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">DropdownMenuContent</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">DropdownMenuCheckboxItem</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> checked</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>Grid&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">DropdownMenuCheckboxItem</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">DropdownMenuSub</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">DropdownMenuSubTrigger</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>Share&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">DropdownMenuSubTrigger</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">DropdownMenuSubContent</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">DropdownMenuItem</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>Copy link&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">DropdownMenuItem</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">DropdownMenuSubContent</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">DropdownMenuSub</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">DropdownMenuContent</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">DropdownMenu</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"></span></code></pre><h2 id="highlights" tabindex="-1"><a class="header-anchor" href="#highlights">Highlights</a></h2>\n<ul>\n<li>Checkbox, radio, group, label, and separator primitives</li>\n<li>Nested submenu keyboard branches</li>\n<li>Controlled root and selectable item callbacks</li>\n</ul>\n<h2 id="foundation-behavior" tabindex="-1"><a class="header-anchor" href="#foundation-behavior">Foundation behavior</a></h2>\n<p>This Solid implementation uses native nested primitives and does not expose <code>asChild</code>. Controlled state uses Solid accessors and explicit callbacks such as <code>onOpenChange</code>, <code>onValueChange</code>, or <code>onSearchChange</code> where the family supports them.</p>\n<p>Portal content is omitted from the server response and mounted during hydration into the resolved document or nested portal scope. Closed and default-open roots keep deterministic trigger IDs and ARIA relationships without a hydration mismatch.</p>\n<p>Keyboard behavior follows the shared Foundation: focus and Tab order, Escape dismissal, arrow-key movement, typeahead, submenu branches, and trigger restoration are applied according to the component role.</p>\n<h2 id="registry-dependencies" tabindex="-1"><a class="header-anchor" href="#registry-dependencies">Registry dependencies</a></h2>\n<table>\n<thead>\n<tr>\n<th>Item</th>\n<th>Purpose</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>dropdown-menu</code></td>\n<td>Component source and module styles</td>\n</tr>\n<tr>\n<td><code>core</code></td>\n<td>Framework-agnostic logic helpers</td>\n</tr>\n<tr>\n<td><code>utils</code></td>\n<td>Shared utility helpers</td>\n</tr>\n<tr>\n<td><code>styles</code></td>\n<td>Shared SCSS tokens and globals</td>\n</tr>\n</tbody>\n</table>\n<h2 id="api-reference" tabindex="-1"><a class="header-anchor" href="#api-reference">API reference</a></h2>\n<h3 id="dropdownmenu" tabindex="-1"><a class="header-anchor" href="#dropdownmenu">DropdownMenu</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>open</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>defaultOpen</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>onOpenChange</code></td>\n<td><code>(open: boolean) =&gt; void</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="dropdownmenutrigger" tabindex="-1"><a class="header-anchor" href="#dropdownmenutrigger">DropdownMenuTrigger</a></h3>\n<p>No custom props.</p>\n<h3 id="dropdownmenucontent" tabindex="-1"><a class="header-anchor" href="#dropdownmenucontent">DropdownMenuContent</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>side</code></td>\n<td><code>\'top\' | \'right\' | \'bottom\' | \'left\'</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>align</code></td>\n<td><code>\'start\' | \'center\' | \'end\'</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>sideOffset</code></td>\n<td><code>number</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>alignOffset</code></td>\n<td><code>number</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="dropdownmenuitem" tabindex="-1"><a class="header-anchor" href="#dropdownmenuitem">DropdownMenuItem</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>inset</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>variant</code></td>\n<td><code>\'default\' | \'destructive\'</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>disabled</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>onSelect</code></td>\n<td><code>(event: Event) =&gt; void</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="dropdownmenucheckboxitem" tabindex="-1"><a class="header-anchor" href="#dropdownmenucheckboxitem">DropdownMenuCheckboxItem</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>checked</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>defaultChecked</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>onCheckedChange</code></td>\n<td><code>(checked: boolean) =&gt; void</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>disabled</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>onSelect</code></td>\n<td><code>(event: Event) =&gt; void</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="dropdownmenuradiogroup" tabindex="-1"><a class="header-anchor" href="#dropdownmenuradiogroup">DropdownMenuRadioGroup</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>value</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>defaultValue</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>onValueChange</code></td>\n<td><code>(value: string) =&gt; void</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="dropdownmenuradioitem" tabindex="-1"><a class="header-anchor" href="#dropdownmenuradioitem">DropdownMenuRadioItem</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>value</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>disabled</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>onSelect</code></td>\n<td><code>(event: Event) =&gt; void</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="dropdownmenulabel" tabindex="-1"><a class="header-anchor" href="#dropdownmenulabel">DropdownMenuLabel</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>inset</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="dropdownmenusub" tabindex="-1"><a class="header-anchor" href="#dropdownmenusub">DropdownMenuSub</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>open</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>defaultOpen</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>onOpenChange</code></td>\n<td><code>(open: boolean) =&gt; void</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="dropdownmenusubtrigger" tabindex="-1"><a class="header-anchor" href="#dropdownmenusubtrigger">DropdownMenuSubTrigger</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>inset</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>disabled</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="dropdownmenuportal" tabindex="-1"><a class="header-anchor" href="#dropdownmenuportal">DropdownMenuPortal</a></h3>\n<p>No custom props.</p>\n<h3 id="dropdownmenugroup" tabindex="-1"><a class="header-anchor" href="#dropdownmenugroup">DropdownMenuGroup</a></h3>\n<p>No custom props.</p>\n<h3 id="dropdownmenuseparator" tabindex="-1"><a class="header-anchor" href="#dropdownmenuseparator">DropdownMenuSeparator</a></h3>\n<p>No custom props.</p>\n<h3 id="dropdownmenushortcut" tabindex="-1"><a class="header-anchor" href="#dropdownmenushortcut">DropdownMenuShortcut</a></h3>\n<p>No custom props.</p>\n<h3 id="dropdownmenusubcontent" tabindex="-1"><a class="header-anchor" href="#dropdownmenusubcontent">DropdownMenuSubContent</a></h3>\n<p>No custom props.</p>\n<h2 id="related-docs" tabindex="-1"><a class="header-anchor" href="#related-docs">Related docs</a></h2>\n<ul>\n<li><a href="/docs/components/context-menu">ContextMenu</a></li>\n<li><a href="/docs/components/menubar">Menubar</a></li>\n<li><a href="/docs/components/select">Select</a></li>\n</ul>\n',
		toc: [
			{
				depth: 2,
				title: 'Registry install',
				href: '#registry-install',
			},
			{
				depth: 2,
				title: 'Package usage',
				href: '#package-usage',
			},
			{
				depth: 2,
				title: 'Highlights',
				href: '#highlights',
			},
			{
				depth: 2,
				title: 'Foundation behavior',
				href: '#foundation-behavior',
			},
			{
				depth: 2,
				title: 'Registry dependencies',
				href: '#registry-dependencies',
			},
			{
				depth: 2,
				title: 'API reference',
				href: '#api-reference',
			},
			{
				depth: 3,
				title: 'DropdownMenu',
				href: '#dropdownmenu',
			},
			{
				depth: 3,
				title: 'DropdownMenuTrigger',
				href: '#dropdownmenutrigger',
			},
			{
				depth: 3,
				title: 'DropdownMenuContent',
				href: '#dropdownmenucontent',
			},
			{
				depth: 3,
				title: 'DropdownMenuItem',
				href: '#dropdownmenuitem',
			},
			{
				depth: 3,
				title: 'DropdownMenuCheckboxItem',
				href: '#dropdownmenucheckboxitem',
			},
			{
				depth: 3,
				title: 'DropdownMenuRadioGroup',
				href: '#dropdownmenuradiogroup',
			},
			{
				depth: 3,
				title: 'DropdownMenuRadioItem',
				href: '#dropdownmenuradioitem',
			},
			{
				depth: 3,
				title: 'DropdownMenuLabel',
				href: '#dropdownmenulabel',
			},
			{
				depth: 3,
				title: 'DropdownMenuSub',
				href: '#dropdownmenusub',
			},
			{
				depth: 3,
				title: 'DropdownMenuSubTrigger',
				href: '#dropdownmenusubtrigger',
			},
			{
				depth: 3,
				title: 'DropdownMenuPortal',
				href: '#dropdownmenuportal',
			},
			{
				depth: 3,
				title: 'DropdownMenuGroup',
				href: '#dropdownmenugroup',
			},
			{
				depth: 3,
				title: 'DropdownMenuSeparator',
				href: '#dropdownmenuseparator',
			},
			{
				depth: 3,
				title: 'DropdownMenuShortcut',
				href: '#dropdownmenushortcut',
			},
			{
				depth: 3,
				title: 'DropdownMenuSubContent',
				href: '#dropdownmenusubcontent',
			},
			{
				depth: 2,
				title: 'Related docs',
				href: '#related-docs',
			},
		],
	},
	{
		slug: 'components/empty',
		url: '/docs/components/empty',
		title: 'Empty',
		description: 'Composable SolidJS empty-state primitives.',
		html: '<blockquote>\n<p>Use Empty to explain missing content and offer a next action.</p>\n</blockquote>\n<h2 id="registry-install" tabindex="-1"><a class="header-anchor" href="#registry-install">Registry install</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#953800;--shiki-dark:#B392F0">pnpm</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> dlx</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> shadcn@latest</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> add</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> @tile-ui/empty</span></span>\n<span class="line"></span></code></pre><h2 id="package-usage" tabindex="-1"><a class="header-anchor" href="#package-usage">Package usage</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">import</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> { Empty, EmptyMedia, EmptyTitle, EmptyDescription } </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">from</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> \'@tile-ui/solid\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Empty</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">EmptyMedia</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> variant</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"icon"</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>+&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">EmptyMedia</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">EmptyTitle</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>No results&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">EmptyTitle</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">EmptyDescription</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>Try adjusting your search.&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">EmptyDescription</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Empty</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"></span></code></pre><h2 id="highlights" tabindex="-1"><a class="header-anchor" href="#highlights">Highlights</a></h2>\n<ul>\n<li>Header, media, title, and description</li>\n<li>Default and icon media variants</li>\n</ul>\n<h2 id="registry-dependencies" tabindex="-1"><a class="header-anchor" href="#registry-dependencies">Registry dependencies</a></h2>\n<table>\n<thead>\n<tr>\n<th>Item</th>\n<th>Purpose</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>empty</code></td>\n<td>Component source and module styles</td>\n</tr>\n<tr>\n<td><code>core</code></td>\n<td>Framework-agnostic logic helpers</td>\n</tr>\n<tr>\n<td><code>styles</code></td>\n<td>Shared SCSS tokens and globals</td>\n</tr>\n</tbody>\n</table>\n<h2 id="api-reference" tabindex="-1"><a class="header-anchor" href="#api-reference">API reference</a></h2>\n<h3 id="emptymedia" tabindex="-1"><a class="header-anchor" href="#emptymedia">EmptyMedia</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>variant</code></td>\n<td><code>\'default\' | \'icon\'</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="empty" tabindex="-1"><a class="header-anchor" href="#empty">Empty</a></h3>\n<p>No custom props.</p>\n<h3 id="emptyheader" tabindex="-1"><a class="header-anchor" href="#emptyheader">EmptyHeader</a></h3>\n<p>No custom props.</p>\n<h3 id="emptytitle" tabindex="-1"><a class="header-anchor" href="#emptytitle">EmptyTitle</a></h3>\n<p>No custom props.</p>\n<h3 id="emptydescription" tabindex="-1"><a class="header-anchor" href="#emptydescription">EmptyDescription</a></h3>\n<p>No custom props.</p>\n<h3 id="emptycontent" tabindex="-1"><a class="header-anchor" href="#emptycontent">EmptyContent</a></h3>\n<p>No custom props.</p>\n<h2 id="related-docs" tabindex="-1"><a class="header-anchor" href="#related-docs">Related docs</a></h2>\n<ul>\n<li><a href="/docs/components/alert">Alert</a></li>\n<li><a href="/docs/components/item">Item</a></li>\n<li><a href="/docs/components/card">Card</a></li>\n</ul>\n',
		toc: [
			{
				depth: 2,
				title: 'Registry install',
				href: '#registry-install',
			},
			{
				depth: 2,
				title: 'Package usage',
				href: '#package-usage',
			},
			{
				depth: 2,
				title: 'Highlights',
				href: '#highlights',
			},
			{
				depth: 2,
				title: 'Registry dependencies',
				href: '#registry-dependencies',
			},
			{
				depth: 2,
				title: 'API reference',
				href: '#api-reference',
			},
			{
				depth: 3,
				title: 'EmptyMedia',
				href: '#emptymedia',
			},
			{
				depth: 3,
				title: 'Empty',
				href: '#empty',
			},
			{
				depth: 3,
				title: 'EmptyHeader',
				href: '#emptyheader',
			},
			{
				depth: 3,
				title: 'EmptyTitle',
				href: '#emptytitle',
			},
			{
				depth: 3,
				title: 'EmptyDescription',
				href: '#emptydescription',
			},
			{
				depth: 3,
				title: 'EmptyContent',
				href: '#emptycontent',
			},
			{
				depth: 2,
				title: 'Related docs',
				href: '#related-docs',
			},
		],
	},
	{
		slug: 'components/field',
		url: '/docs/components/field',
		title: 'Field',
		description: 'SolidJS field primitives with stable label, description, message, and control IDs.',
		html: '<blockquote>\n<p>Use Field to connect a native control to stable labels, descriptions, and messages.</p>\n</blockquote>\n<h2 id="registry-install" tabindex="-1"><a class="header-anchor" href="#registry-install">Registry install</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#953800;--shiki-dark:#B392F0">pnpm</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> dlx</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> shadcn@latest</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> add</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> @tile-ui/field</span></span>\n<span class="line"></span></code></pre><h2 id="package-usage" tabindex="-1"><a class="header-anchor" href="#package-usage">Package usage</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">import</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> { Field, FieldLabel, FieldDescription, FieldMessage } </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">from</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> \'@tile-ui/solid\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Field</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> name</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"email"</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> required</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">FieldLabel</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>Email&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">FieldLabel</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">FieldDescription</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>We never share your email.&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">FieldDescription</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">FieldMessage</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>Ready.&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">FieldMessage</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Field</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"></span></code></pre><h2 id="highlights" tabindex="-1"><a class="header-anchor" href="#highlights">Highlights</a></h2>\n<ul>\n<li>Label, description, and message</li>\n<li>Invalid and required states</li>\n<li>Message variants</li>\n</ul>\n<h2 id="registry-dependencies" tabindex="-1"><a class="header-anchor" href="#registry-dependencies">Registry dependencies</a></h2>\n<table>\n<thead>\n<tr>\n<th>Item</th>\n<th>Purpose</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>field</code></td>\n<td>Component source and module styles</td>\n</tr>\n<tr>\n<td><code>core</code></td>\n<td>Framework-agnostic logic helpers</td>\n</tr>\n<tr>\n<td><code>utils</code></td>\n<td>Shared utility helpers</td>\n</tr>\n<tr>\n<td><code>styles</code></td>\n<td>Shared SCSS tokens and globals</td>\n</tr>\n</tbody>\n</table>\n<h2 id="api-reference" tabindex="-1"><a class="header-anchor" href="#api-reference">API reference</a></h2>\n<h3 id="field" tabindex="-1"><a class="header-anchor" href="#field">Field</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>name</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>invalid</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>required</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="fieldlabel" tabindex="-1"><a class="header-anchor" href="#fieldlabel">FieldLabel</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>htmlFor</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="fielddescription" tabindex="-1"><a class="header-anchor" href="#fielddescription">FieldDescription</a></h3>\n<p>No custom props.</p>\n<h3 id="fieldmessage" tabindex="-1"><a class="header-anchor" href="#fieldmessage">FieldMessage</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>variant</code></td>\n<td><code>\'default\' | \'error\' | \'warning\' | \'success\' | \'info\'</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h2 id="related-docs" tabindex="-1"><a class="header-anchor" href="#related-docs">Related docs</a></h2>\n<ul>\n<li><a href="/docs/components/input">Input</a></li>\n<li><a href="/docs/components/label">Label</a></li>\n<li><a href="/docs/components/form">Form</a></li>\n</ul>\n',
		toc: [
			{
				depth: 2,
				title: 'Registry install',
				href: '#registry-install',
			},
			{
				depth: 2,
				title: 'Package usage',
				href: '#package-usage',
			},
			{
				depth: 2,
				title: 'Highlights',
				href: '#highlights',
			},
			{
				depth: 2,
				title: 'Registry dependencies',
				href: '#registry-dependencies',
			},
			{
				depth: 2,
				title: 'API reference',
				href: '#api-reference',
			},
			{
				depth: 3,
				title: 'Field',
				href: '#field',
			},
			{
				depth: 3,
				title: 'FieldLabel',
				href: '#fieldlabel',
			},
			{
				depth: 3,
				title: 'FieldDescription',
				href: '#fielddescription',
			},
			{
				depth: 3,
				title: 'FieldMessage',
				href: '#fieldmessage',
			},
			{
				depth: 2,
				title: 'Related docs',
				href: '#related-docs',
			},
		],
	},
	{
		slug: 'components/form',
		url: '/docs/components/form',
		title: 'Form',
		description: 'Reactive SolidJS form state and accessible field primitives.',
		html: '<blockquote>\n<p>Use Form primitives to connect reactive field state, validation, and ARIA metadata.</p>\n</blockquote>\n<h2 id="registry-install" tabindex="-1"><a class="header-anchor" href="#registry-install">Registry install</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#953800;--shiki-dark:#B392F0">pnpm</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> dlx</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> shadcn@latest</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> add</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> @tile-ui/form</span></span>\n<span class="line"></span></code></pre><h2 id="package-usage" tabindex="-1"><a class="header-anchor" href="#package-usage">Package usage</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">import</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> { Form, FormField, FormItem, FormLabel, FormControl, Input, FormDescription, FormMessage } </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">from</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> \'@tile-ui/solid\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Form</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> defaultValues</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">{ email: </span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">""</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> }</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">}</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">FormField</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> name</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"email"</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">({ </span><span style="--shiki-light:#953800;--shiki-dark:#FFAB70">field</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> }) </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=></span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> &#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">FormItem</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> descriptionId</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"email-help"</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> messageId</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"email-error"</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">FormLabel</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>Email&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">FormLabel</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">FormControl</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#953800;--shiki-dark:#FFAB70">control</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">) </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=></span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> &#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Input</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8"> {</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">...</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">control</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">}</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> value</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#8250DF;--shiki-dark:#B392F0">String</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">(field.value </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">??</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> ""</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">)</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">}</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> onChangeValue</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">field.onChange</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">}</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> /></span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">}</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">FormControl</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">FormDescription</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> id</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"email-help"</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>Enter a reachable address.&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">FormDescription</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">FormMessage</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> id</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"email-error"</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> />&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">FormItem</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">}</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">FormField</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Form</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"></span></code></pre><h2 id="highlights" tabindex="-1"><a class="header-anchor" href="#highlights">Highlights</a></h2>\n<ul>\n<li><code>useForm</code> hook</li>\n<li>Field, label, control, and message</li>\n<li>Resolver validation</li>\n</ul>\n<h2 id="registry-dependencies" tabindex="-1"><a class="header-anchor" href="#registry-dependencies">Registry dependencies</a></h2>\n<table>\n<thead>\n<tr>\n<th>Item</th>\n<th>Purpose</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>form</code></td>\n<td>Component source and module styles</td>\n</tr>\n<tr>\n<td><code>core</code></td>\n<td>Framework-agnostic logic helpers</td>\n</tr>\n<tr>\n<td><code>utils</code></td>\n<td>Shared utility helpers</td>\n</tr>\n<tr>\n<td><code>label</code></td>\n<td>Registry component dependency</td>\n</tr>\n<tr>\n<td><code>styles</code></td>\n<td>Shared SCSS tokens and globals</td>\n</tr>\n</tbody>\n</table>\n<h2 id="api-reference" tabindex="-1"><a class="header-anchor" href="#api-reference">API reference</a></h2>\n<h3 id="form" tabindex="-1"><a class="header-anchor" href="#form">Form</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>defaultValues</code></td>\n<td><code>Record&lt;string, unknown&gt;</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>resolver</code></td>\n<td><code>(values: FormValues) =&gt; FormErrors | Promise&lt;FormErrors&gt;</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>form</code></td>\n<td><code>unknown</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>children</code></td>\n<td><code>JSX.Element</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="formfield" tabindex="-1"><a class="header-anchor" href="#formfield">FormField</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>name</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>children</code></td>\n<td><code>(props: { field: FormControllerField }) =&gt; JSX.Element</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>render</code></td>\n<td><code>(props: { field: FormControllerField }) =&gt; JSX.Element</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="formitem" tabindex="-1"><a class="header-anchor" href="#formitem">FormItem</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>descriptionId</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>messageId</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="formlabel" tabindex="-1"><a class="header-anchor" href="#formlabel">FormLabel</a></h3>\n<p>No custom props.</p>\n<h3 id="formcontrolrender" tabindex="-1"><a class="header-anchor" href="#formcontrolrender">FormControlRender</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>id</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>name</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>\'aria-describedby\'</code></td>\n<td><code>string | undefined</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>\'aria-invalid\'</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>\'aria-required\'</code></td>\n<td><code>boolean | undefined</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>required</code></td>\n<td><code>boolean | undefined</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>\'data-slot\'</code></td>\n<td><code>\'form-control\'</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="formcontrol" tabindex="-1"><a class="header-anchor" href="#formcontrol">FormControl</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>children</code></td>\n<td><code>(props: FormControlRenderProps) =&gt; JSX.Element</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="formdescription" tabindex="-1"><a class="header-anchor" href="#formdescription">FormDescription</a></h3>\n<p>No custom props.</p>\n<h3 id="formmessage" tabindex="-1"><a class="header-anchor" href="#formmessage">FormMessage</a></h3>\n<p>No custom props.</p>\n<h2 id="related-docs" tabindex="-1"><a class="header-anchor" href="#related-docs">Related docs</a></h2>\n<ul>\n<li><a href="/docs/components/field">Field</a></li>\n<li><a href="/docs/components/input">Input</a></li>\n<li><a href="/docs/components/checkbox">Checkbox</a></li>\n</ul>\n',
		toc: [
			{
				depth: 2,
				title: 'Registry install',
				href: '#registry-install',
			},
			{
				depth: 2,
				title: 'Package usage',
				href: '#package-usage',
			},
			{
				depth: 2,
				title: 'Highlights',
				href: '#highlights',
			},
			{
				depth: 2,
				title: 'Registry dependencies',
				href: '#registry-dependencies',
			},
			{
				depth: 2,
				title: 'API reference',
				href: '#api-reference',
			},
			{
				depth: 3,
				title: 'Form',
				href: '#form',
			},
			{
				depth: 3,
				title: 'FormField',
				href: '#formfield',
			},
			{
				depth: 3,
				title: 'FormItem',
				href: '#formitem',
			},
			{
				depth: 3,
				title: 'FormLabel',
				href: '#formlabel',
			},
			{
				depth: 3,
				title: 'FormControlRender',
				href: '#formcontrolrender',
			},
			{
				depth: 3,
				title: 'FormControl',
				href: '#formcontrol',
			},
			{
				depth: 3,
				title: 'FormDescription',
				href: '#formdescription',
			},
			{
				depth: 3,
				title: 'FormMessage',
				href: '#formmessage',
			},
			{
				depth: 2,
				title: 'Related docs',
				href: '#related-docs',
			},
		],
	},
	{
		slug: 'components/hover-card',
		url: '/docs/components/hover-card',
		title: 'HoverCard',
		description: 'A delayed SolidJS hover preview with crossing-safe pointer intent.',
		html: '<blockquote>\n<p>Use HoverCard for delayed previews that remain open while the pointer crosses from trigger to content.</p>\n</blockquote>\n<h2 id="registry-install" tabindex="-1"><a class="header-anchor" href="#registry-install">Registry install</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#953800;--shiki-dark:#B392F0">pnpm</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> dlx</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> shadcn@latest</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> add</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> @tile-ui/hover-card</span></span>\n<span class="line"></span></code></pre><h2 id="package-usage" tabindex="-1"><a class="header-anchor" href="#package-usage">Package usage</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">import</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> { HoverCard } </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">from</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> \'@tile-ui/solid\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">HoverCard</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> openDelay</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#0550AE;--shiki-dark:#79B8FF">250</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">}</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> closeDelay</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#0550AE;--shiki-dark:#79B8FF">350</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">}</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">HoverCardTrigger</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>@tile-ui/solid&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">HoverCardTrigger</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">HoverCardContent</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>Solid registry preview.&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">HoverCardContent</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">HoverCard</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"></span></code></pre><h2 id="highlights" tabindex="-1"><a class="header-anchor" href="#highlights">Highlights</a></h2>\n<ul>\n<li>Open and close delays</li>\n<li>Crossing-safe pointer intent between trigger and content</li>\n<li>Controlled <code>open</code> and <code>onOpenChange</code> callbacks</li>\n</ul>\n<h2 id="foundation-behavior" tabindex="-1"><a class="header-anchor" href="#foundation-behavior">Foundation behavior</a></h2>\n<p>This Solid implementation uses native nested primitives and does not expose <code>asChild</code>. Controlled state uses Solid accessors and explicit callbacks such as <code>onOpenChange</code>, <code>onValueChange</code>, or <code>onSearchChange</code> where the family supports them.</p>\n<p>Portal content is omitted from the server response and mounted during hydration into the resolved document or nested portal scope. Closed and default-open roots keep deterministic trigger IDs and ARIA relationships without a hydration mismatch.</p>\n<p>Keyboard behavior follows the shared Foundation: focus and Tab order, Escape dismissal, arrow-key movement, typeahead, submenu branches, and trigger restoration are applied according to the component role.</p>\n<h2 id="registry-dependencies" tabindex="-1"><a class="header-anchor" href="#registry-dependencies">Registry dependencies</a></h2>\n<table>\n<thead>\n<tr>\n<th>Item</th>\n<th>Purpose</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>hover-card</code></td>\n<td>Component source and module styles</td>\n</tr>\n<tr>\n<td><code>core</code></td>\n<td>Framework-agnostic logic helpers</td>\n</tr>\n<tr>\n<td><code>utils</code></td>\n<td>Shared utility helpers</td>\n</tr>\n<tr>\n<td><code>styles</code></td>\n<td>Shared SCSS tokens and globals</td>\n</tr>\n</tbody>\n</table>\n<h2 id="api-reference" tabindex="-1"><a class="header-anchor" href="#api-reference">API reference</a></h2>\n<h3 id="hovercard" tabindex="-1"><a class="header-anchor" href="#hovercard">HoverCard</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>open</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>defaultOpen</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>openDelay</code></td>\n<td><code>number</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>closeDelay</code></td>\n<td><code>number</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>onOpenChange</code></td>\n<td><code>(open: boolean) =&gt; void</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>contentId</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>ref</code></td>\n<td><code>CallbackRef&lt;HTMLDivElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="hovercardtrigger" tabindex="-1"><a class="header-anchor" href="#hovercardtrigger">HoverCardTrigger</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>ref</code></td>\n<td><code>CallbackRef&lt;HTMLButtonElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="hovercardcontent" tabindex="-1"><a class="header-anchor" href="#hovercardcontent">HoverCardContent</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>side</code></td>\n<td><code>\'top\' | \'right\' | \'bottom\' | \'left\'</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>align</code></td>\n<td><code>\'start\' | \'center\' | \'end\'</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>sideOffset</code></td>\n<td><code>number</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>container</code></td>\n<td><code>Node</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>ref</code></td>\n<td><code>CallbackRef&lt;HTMLDivElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h2 id="related-docs" tabindex="-1"><a class="header-anchor" href="#related-docs">Related docs</a></h2>\n<ul>\n<li><a href="/docs/components/popover">Popover</a></li>\n<li><a href="/docs/components/tooltip">Tooltip</a></li>\n<li><a href="/docs/components/avatar">Avatar</a></li>\n</ul>\n',
		toc: [
			{
				depth: 2,
				title: 'Registry install',
				href: '#registry-install',
			},
			{
				depth: 2,
				title: 'Package usage',
				href: '#package-usage',
			},
			{
				depth: 2,
				title: 'Highlights',
				href: '#highlights',
			},
			{
				depth: 2,
				title: 'Foundation behavior',
				href: '#foundation-behavior',
			},
			{
				depth: 2,
				title: 'Registry dependencies',
				href: '#registry-dependencies',
			},
			{
				depth: 2,
				title: 'API reference',
				href: '#api-reference',
			},
			{
				depth: 3,
				title: 'HoverCard',
				href: '#hovercard',
			},
			{
				depth: 3,
				title: 'HoverCardTrigger',
				href: '#hovercardtrigger',
			},
			{
				depth: 3,
				title: 'HoverCardContent',
				href: '#hovercardcontent',
			},
			{
				depth: 2,
				title: 'Related docs',
				href: '#related-docs',
			},
		],
	},
	{
		slug: 'components/input',
		url: '/docs/components/input',
		title: 'Input',
		description: 'An accessible SolidJS text input with helper and validation messaging.',
		html: '<blockquote>\n<p>Use Input for SolidJS single-line text entry with aligned messaging.</p>\n</blockquote>\n<h2 id="registry-install" tabindex="-1"><a class="header-anchor" href="#registry-install">Registry install</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#953800;--shiki-dark:#B392F0">pnpm</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> dlx</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> shadcn@latest</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> add</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> @tile-ui/input</span></span>\n<span class="line"></span></code></pre><h2 id="package-usage" tabindex="-1"><a class="header-anchor" href="#package-usage">Package usage</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">import</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> { Input } </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">from</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> \'@tile-ui/solid\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Input</span></span>\n<span class="line"><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0">\tlabel</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"Project name"</span></span>\n<span class="line"><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0">\thelperText</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"Used in your dashboard and generated URLs."</span></span>\n<span class="line"><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0">\tplaceholder</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"Tile UI Docs"</span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">/></span></span>\n<span class="line"></span></code></pre><h2 id="highlights" tabindex="-1"><a class="header-anchor" href="#highlights">Highlights</a></h2>\n<ul>\n<li>Label and helper text</li>\n<li>Error state</li>\n<li>Pairs with Field and Form</li>\n</ul>\n<h2 id="registry-dependencies" tabindex="-1"><a class="header-anchor" href="#registry-dependencies">Registry dependencies</a></h2>\n<table>\n<thead>\n<tr>\n<th>Item</th>\n<th>Purpose</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>input</code></td>\n<td>Component source and module styles</td>\n</tr>\n<tr>\n<td><code>core</code></td>\n<td>Framework-agnostic logic helpers</td>\n</tr>\n<tr>\n<td><code>utils</code></td>\n<td>Shared utility helpers</td>\n</tr>\n<tr>\n<td><code>styles</code></td>\n<td>Shared SCSS tokens and globals</td>\n</tr>\n</tbody>\n</table>\n<h2 id="api-reference" tabindex="-1"><a class="header-anchor" href="#api-reference">API reference</a></h2>\n<h3 id="input" tabindex="-1"><a class="header-anchor" href="#input">Input</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>label</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>error</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>helperText</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>controlSize</code></td>\n<td><code>\'default\' | \'xs\' | \'sm\' | \'lg\'</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>defaultValue</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>onChangeValue</code></td>\n<td><code>(value: string) =&gt; void</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h2 id="related-docs" tabindex="-1"><a class="header-anchor" href="#related-docs">Related docs</a></h2>\n<ul>\n<li><a href="/docs/components/textarea">Textarea</a></li>\n<li><a href="/docs/components/label">Label</a></li>\n<li><a href="/docs/components/field">Field</a></li>\n</ul>\n',
		toc: [
			{
				depth: 2,
				title: 'Registry install',
				href: '#registry-install',
			},
			{
				depth: 2,
				title: 'Package usage',
				href: '#package-usage',
			},
			{
				depth: 2,
				title: 'Highlights',
				href: '#highlights',
			},
			{
				depth: 2,
				title: 'Registry dependencies',
				href: '#registry-dependencies',
			},
			{
				depth: 2,
				title: 'API reference',
				href: '#api-reference',
			},
			{
				depth: 3,
				title: 'Input',
				href: '#input',
			},
			{
				depth: 2,
				title: 'Related docs',
				href: '#related-docs',
			},
		],
	},
	{
		slug: 'components/input-group',
		url: '/docs/components/input-group',
		title: 'InputGroup',
		description: 'Composable SolidJS input addons, controls, and embedded buttons.',
		html: '<blockquote>\n<p>Use InputGroup to combine a control with contextual text and embedded actions.</p>\n</blockquote>\n<h2 id="registry-install" tabindex="-1"><a class="header-anchor" href="#registry-install">Registry install</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#953800;--shiki-dark:#B392F0">pnpm</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> dlx</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> shadcn@latest</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> add</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> @tile-ui/input-group</span></span>\n<span class="line"></span></code></pre><h2 id="package-usage" tabindex="-1"><a class="header-anchor" href="#package-usage">Package usage</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">import</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> { InputGroup, InputGroupAddon, InputGroupInput } </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">from</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> \'@tile-ui/solid\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">InputGroup</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">InputGroupAddon</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>https://&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">InputGroupAddon</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">InputGroupInput</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> placeholder</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"example.com"</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> /></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">InputGroup</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"></span></code></pre><h2 id="highlights" tabindex="-1"><a class="header-anchor" href="#highlights">Highlights</a></h2>\n<ul>\n<li>Addon, button, and text</li>\n<li>Input and textarea</li>\n<li>Addon alignment</li>\n</ul>\n<h2 id="registry-dependencies" tabindex="-1"><a class="header-anchor" href="#registry-dependencies">Registry dependencies</a></h2>\n<table>\n<thead>\n<tr>\n<th>Item</th>\n<th>Purpose</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>input-group</code></td>\n<td>Component source and module styles</td>\n</tr>\n<tr>\n<td><code>core</code></td>\n<td>Framework-agnostic logic helpers</td>\n</tr>\n<tr>\n<td><code>utils</code></td>\n<td>Shared utility helpers</td>\n</tr>\n<tr>\n<td><code>button</code></td>\n<td>Registry component dependency</td>\n</tr>\n<tr>\n<td><code>styles</code></td>\n<td>Shared SCSS tokens and globals</td>\n</tr>\n</tbody>\n</table>\n<h2 id="api-reference" tabindex="-1"><a class="header-anchor" href="#api-reference">API reference</a></h2>\n<h3 id="inputgroup" tabindex="-1"><a class="header-anchor" href="#inputgroup">InputGroup</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>variant</code></td>\n<td><code>\'default\' | \'outline\'</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="inputgroupaddon" tabindex="-1"><a class="header-anchor" href="#inputgroupaddon">InputGroupAddon</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>variant</code></td>\n<td><code>\'default\' | \'outline\'</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>align</code></td>\n<td><code>\'inline-start\' | \'inline-end\' | \'block-start\' | \'block-end\'</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="inputgroupbutton" tabindex="-1"><a class="header-anchor" href="#inputgroupbutton">InputGroupButton</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>variant</code></td>\n<td><code>ButtonVariant</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>size</code></td>\n<td><code>ButtonSize</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="inputgrouptext" tabindex="-1"><a class="header-anchor" href="#inputgrouptext">InputGroupText</a></h3>\n<p>No custom props.</p>\n<h3 id="inputgroupinput" tabindex="-1"><a class="header-anchor" href="#inputgroupinput">InputGroupInput</a></h3>\n<p>No custom props.</p>\n<h3 id="inputgrouptextarea" tabindex="-1"><a class="header-anchor" href="#inputgrouptextarea">InputGroupTextarea</a></h3>\n<p>No custom props.</p>\n<h2 id="related-docs" tabindex="-1"><a class="header-anchor" href="#related-docs">Related docs</a></h2>\n<ul>\n<li><a href="/docs/components/input">Input</a></li>\n<li><a href="/docs/components/button">Button</a></li>\n<li><a href="/docs/components/native-select">NativeSelect</a></li>\n</ul>\n',
		toc: [
			{
				depth: 2,
				title: 'Registry install',
				href: '#registry-install',
			},
			{
				depth: 2,
				title: 'Package usage',
				href: '#package-usage',
			},
			{
				depth: 2,
				title: 'Highlights',
				href: '#highlights',
			},
			{
				depth: 2,
				title: 'Registry dependencies',
				href: '#registry-dependencies',
			},
			{
				depth: 2,
				title: 'API reference',
				href: '#api-reference',
			},
			{
				depth: 3,
				title: 'InputGroup',
				href: '#inputgroup',
			},
			{
				depth: 3,
				title: 'InputGroupAddon',
				href: '#inputgroupaddon',
			},
			{
				depth: 3,
				title: 'InputGroupButton',
				href: '#inputgroupbutton',
			},
			{
				depth: 3,
				title: 'InputGroupText',
				href: '#inputgrouptext',
			},
			{
				depth: 3,
				title: 'InputGroupInput',
				href: '#inputgroupinput',
			},
			{
				depth: 3,
				title: 'InputGroupTextarea',
				href: '#inputgrouptextarea',
			},
			{
				depth: 2,
				title: 'Related docs',
				href: '#related-docs',
			},
		],
	},
	{
		slug: 'components/input-otp',
		url: '/docs/components/input-otp',
		title: 'InputOtp',
		description: 'SolidJS one-time password slots with keyboard, paste, composition, and form support.',
		html: '<blockquote>\n<p>Use InputOTP to collect short codes with efficient keyboard, paste, and composition input.</p>\n</blockquote>\n<h2 id="registry-install" tabindex="-1"><a class="header-anchor" href="#registry-install">Registry install</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#953800;--shiki-dark:#B392F0">pnpm</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> dlx</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> shadcn@latest</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> add</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> @tile-ui/input-otp</span></span>\n<span class="line"></span></code></pre><h2 id="package-usage" tabindex="-1"><a class="header-anchor" href="#package-usage">Package usage</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">import</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> { InputOTP, InputOTPGroup, InputOTPSlot } </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">from</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> \'@tile-ui/solid\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">InputOTP</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> maxLength</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#0550AE;--shiki-dark:#79B8FF">4</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">}</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">InputOTPGroup</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">InputOTPSlot</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> index</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#0550AE;--shiki-dark:#79B8FF">0</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">}</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> />&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">InputOTPSlot</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> index</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#0550AE;--shiki-dark:#79B8FF">1</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">}</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> />&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">InputOTPSlot</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> index</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#0550AE;--shiki-dark:#79B8FF">2</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">}</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> />&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">InputOTPSlot</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> index</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#0550AE;--shiki-dark:#79B8FF">3</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">}</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> />&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">InputOTPGroup</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">InputOTP</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"></span></code></pre><h2 id="highlights" tabindex="-1"><a class="header-anchor" href="#highlights">Highlights</a></h2>\n<ul>\n<li>Numeric, alphanumeric, and text modes</li>\n<li>Slots and groups</li>\n<li>Completion callback</li>\n</ul>\n<h2 id="registry-dependencies" tabindex="-1"><a class="header-anchor" href="#registry-dependencies">Registry dependencies</a></h2>\n<table>\n<thead>\n<tr>\n<th>Item</th>\n<th>Purpose</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>input-otp</code></td>\n<td>Component source and module styles</td>\n</tr>\n<tr>\n<td><code>core</code></td>\n<td>Framework-agnostic logic helpers</td>\n</tr>\n<tr>\n<td><code>utils</code></td>\n<td>Shared utility helpers</td>\n</tr>\n<tr>\n<td><code>styles</code></td>\n<td>Shared SCSS tokens and globals</td>\n</tr>\n</tbody>\n</table>\n<h2 id="api-reference" tabindex="-1"><a class="header-anchor" href="#api-reference">API reference</a></h2>\n<h3 id="inputotp" tabindex="-1"><a class="header-anchor" href="#inputotp">InputOtp</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>value</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>defaultValue</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>maxLength</code></td>\n<td><code>number</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>disabled</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>onChange</code></td>\n<td><code>(value: string) =&gt; void</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>onComplete</code></td>\n<td><code>(value: string) =&gt; void</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>mode</code></td>\n<td><code>\'numeric\' | \'alphanumeric\' | \'text\'</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>allowPaste</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="inputotpslot" tabindex="-1"><a class="header-anchor" href="#inputotpslot">InputOtpSlot</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>index</code></td>\n<td><code>number</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="inputotp-1" tabindex="-1"><a class="header-anchor" href="#inputotp-1">InputOTP</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>containerClass</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>name</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>form</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="inputotpgroup" tabindex="-1"><a class="header-anchor" href="#inputotpgroup">InputOTPGroup</a></h3>\n<p>No custom props.</p>\n<h3 id="inputotpslot-1" tabindex="-1"><a class="header-anchor" href="#inputotpslot-1">InputOTPSlot</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>inputClass</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>inputProps</code></td>\n<td><code>Omit&lt;JSX.InputHTMLAttributes&lt;HTMLInputElement&gt;, \'value\' | \'disabled\' | \'name\'&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="inputotpseparator" tabindex="-1"><a class="header-anchor" href="#inputotpseparator">InputOTPSeparator</a></h3>\n<p>No custom props.</p>\n<h2 id="related-docs" tabindex="-1"><a class="header-anchor" href="#related-docs">Related docs</a></h2>\n<ul>\n<li><a href="/docs/components/input">Input</a></li>\n<li><a href="/docs/components/input-group">InputGroup</a></li>\n<li><a href="/docs/components/form">Form</a></li>\n</ul>\n',
		toc: [
			{
				depth: 2,
				title: 'Registry install',
				href: '#registry-install',
			},
			{
				depth: 2,
				title: 'Package usage',
				href: '#package-usage',
			},
			{
				depth: 2,
				title: 'Highlights',
				href: '#highlights',
			},
			{
				depth: 2,
				title: 'Registry dependencies',
				href: '#registry-dependencies',
			},
			{
				depth: 2,
				title: 'API reference',
				href: '#api-reference',
			},
			{
				depth: 3,
				title: 'InputOtp',
				href: '#inputotp',
			},
			{
				depth: 3,
				title: 'InputOtpSlot',
				href: '#inputotpslot',
			},
			{
				depth: 3,
				title: 'InputOTP',
				href: '#inputotp',
			},
			{
				depth: 3,
				title: 'InputOTPGroup',
				href: '#inputotpgroup',
			},
			{
				depth: 3,
				title: 'InputOTPSlot',
				href: '#inputotpslot',
			},
			{
				depth: 3,
				title: 'InputOTPSeparator',
				href: '#inputotpseparator',
			},
			{
				depth: 2,
				title: 'Related docs',
				href: '#related-docs',
			},
		],
	},
	{
		slug: 'components/item',
		url: '/docs/components/item',
		title: 'Item',
		description: 'SolidJS item layout primitives for media, content, and actions.',
		html: '<blockquote>\n<p>Use Item for compact media, content, and action rows.</p>\n</blockquote>\n<h2 id="registry-install" tabindex="-1"><a class="header-anchor" href="#registry-install">Registry install</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#953800;--shiki-dark:#B392F0">pnpm</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> dlx</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> shadcn@latest</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> add</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> @tile-ui/item</span></span>\n<span class="line"></span></code></pre><h2 id="package-usage" tabindex="-1"><a class="header-anchor" href="#package-usage">Package usage</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">import</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> { Item, ItemContent, ItemTitle } </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">from</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> \'@tile-ui/solid\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Item</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> variant</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"outline"</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">ItemContent</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">ItemTitle</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>Solid registry&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">ItemTitle</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">ItemContent</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Item</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"></span></code></pre><h2 id="highlights" tabindex="-1"><a class="header-anchor" href="#highlights">Highlights</a></h2>\n<ul>\n<li>Media, content, and action regions</li>\n<li>Native div root</li>\n<li>Outline and muted variants</li>\n</ul>\n<h2 id="registry-dependencies" tabindex="-1"><a class="header-anchor" href="#registry-dependencies">Registry dependencies</a></h2>\n<table>\n<thead>\n<tr>\n<th>Item</th>\n<th>Purpose</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>item</code></td>\n<td>Component source and module styles</td>\n</tr>\n<tr>\n<td><code>core</code></td>\n<td>Framework-agnostic logic helpers</td>\n</tr>\n<tr>\n<td><code>styles</code></td>\n<td>Shared SCSS tokens and globals</td>\n</tr>\n</tbody>\n</table>\n<h2 id="api-reference" tabindex="-1"><a class="header-anchor" href="#api-reference">API reference</a></h2>\n<h3 id="item" tabindex="-1"><a class="header-anchor" href="#item">Item</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>variant</code></td>\n<td><code>\'default\' | \'outline\' | \'muted\'</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>size</code></td>\n<td><code>\'default\' | \'sm\'</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="itemmedia" tabindex="-1"><a class="header-anchor" href="#itemmedia">ItemMedia</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>variant</code></td>\n<td><code>\'default\' | \'icon\' | \'image\'</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="itemgroup" tabindex="-1"><a class="header-anchor" href="#itemgroup">ItemGroup</a></h3>\n<p>No custom props.</p>\n<h3 id="itemseparator" tabindex="-1"><a class="header-anchor" href="#itemseparator">ItemSeparator</a></h3>\n<p>No custom props.</p>\n<h3 id="itemcontent" tabindex="-1"><a class="header-anchor" href="#itemcontent">ItemContent</a></h3>\n<p>No custom props.</p>\n<h3 id="itemtitle" tabindex="-1"><a class="header-anchor" href="#itemtitle">ItemTitle</a></h3>\n<p>No custom props.</p>\n<h3 id="itemactions" tabindex="-1"><a class="header-anchor" href="#itemactions">ItemActions</a></h3>\n<p>No custom props.</p>\n<h3 id="itemheader" tabindex="-1"><a class="header-anchor" href="#itemheader">ItemHeader</a></h3>\n<p>No custom props.</p>\n<h3 id="itemfooter" tabindex="-1"><a class="header-anchor" href="#itemfooter">ItemFooter</a></h3>\n<p>No custom props.</p>\n<h3 id="itemdescription" tabindex="-1"><a class="header-anchor" href="#itemdescription">ItemDescription</a></h3>\n<p>No custom props.</p>\n<h2 id="related-docs" tabindex="-1"><a class="header-anchor" href="#related-docs">Related docs</a></h2>\n<ul>\n<li><a href="/docs/components/avatar">Avatar</a></li>\n<li><a href="/docs/components/badge">Badge</a></li>\n<li><a href="/docs/components/message">Message</a></li>\n</ul>\n',
		toc: [
			{
				depth: 2,
				title: 'Registry install',
				href: '#registry-install',
			},
			{
				depth: 2,
				title: 'Package usage',
				href: '#package-usage',
			},
			{
				depth: 2,
				title: 'Highlights',
				href: '#highlights',
			},
			{
				depth: 2,
				title: 'Registry dependencies',
				href: '#registry-dependencies',
			},
			{
				depth: 2,
				title: 'API reference',
				href: '#api-reference',
			},
			{
				depth: 3,
				title: 'Item',
				href: '#item',
			},
			{
				depth: 3,
				title: 'ItemMedia',
				href: '#itemmedia',
			},
			{
				depth: 3,
				title: 'ItemGroup',
				href: '#itemgroup',
			},
			{
				depth: 3,
				title: 'ItemSeparator',
				href: '#itemseparator',
			},
			{
				depth: 3,
				title: 'ItemContent',
				href: '#itemcontent',
			},
			{
				depth: 3,
				title: 'ItemTitle',
				href: '#itemtitle',
			},
			{
				depth: 3,
				title: 'ItemActions',
				href: '#itemactions',
			},
			{
				depth: 3,
				title: 'ItemHeader',
				href: '#itemheader',
			},
			{
				depth: 3,
				title: 'ItemFooter',
				href: '#itemfooter',
			},
			{
				depth: 3,
				title: 'ItemDescription',
				href: '#itemdescription',
			},
			{
				depth: 2,
				title: 'Related docs',
				href: '#related-docs',
			},
		],
	},
	{
		slug: 'components/kbd',
		url: '/docs/components/kbd',
		title: 'Kbd',
		description: 'SolidJS keyboard key and shortcut-group primitives.',
		html: '<blockquote>\n<p>Use Kbd and KbdGroup to display keyboard shortcuts.</p>\n</blockquote>\n<h2 id="registry-install" tabindex="-1"><a class="header-anchor" href="#registry-install">Registry install</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#953800;--shiki-dark:#B392F0">pnpm</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> dlx</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> shadcn@latest</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> add</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> @tile-ui/kbd</span></span>\n<span class="line"></span></code></pre><h2 id="package-usage" tabindex="-1"><a class="header-anchor" href="#package-usage">Package usage</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">import</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> { Kbd } </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">from</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> \'@tile-ui/solid\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Kbd</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>Ctrl&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Kbd</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">> &#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Kbd</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>K&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Kbd</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"></span></code></pre><h2 id="highlights" tabindex="-1"><a class="header-anchor" href="#highlights">Highlights</a></h2>\n<ul>\n<li>Single keys and key groups</li>\n<li>Pairs with Command and Menubar shortcuts</li>\n</ul>\n<h2 id="registry-dependencies" tabindex="-1"><a class="header-anchor" href="#registry-dependencies">Registry dependencies</a></h2>\n<table>\n<thead>\n<tr>\n<th>Item</th>\n<th>Purpose</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>kbd</code></td>\n<td>Component source and module styles</td>\n</tr>\n<tr>\n<td><code>core</code></td>\n<td>Framework-agnostic logic helpers</td>\n</tr>\n<tr>\n<td><code>styles</code></td>\n<td>Shared SCSS tokens and globals</td>\n</tr>\n</tbody>\n</table>\n<h2 id="api-reference" tabindex="-1"><a class="header-anchor" href="#api-reference">API reference</a></h2>\n<h3 id="kbd" tabindex="-1"><a class="header-anchor" href="#kbd">Kbd</a></h3>\n<p>No custom props.</p>\n<h3 id="kbdgroup" tabindex="-1"><a class="header-anchor" href="#kbdgroup">KbdGroup</a></h3>\n<p>No custom props.</p>\n<h2 id="related-docs" tabindex="-1"><a class="header-anchor" href="#related-docs">Related docs</a></h2>\n<ul>\n<li><a href="/docs/components/command">Command</a></li>\n<li><a href="/docs/components/tooltip">Tooltip</a></li>\n<li><a href="/docs/components/badge">Badge</a></li>\n</ul>\n',
		toc: [
			{
				depth: 2,
				title: 'Registry install',
				href: '#registry-install',
			},
			{
				depth: 2,
				title: 'Package usage',
				href: '#package-usage',
			},
			{
				depth: 2,
				title: 'Highlights',
				href: '#highlights',
			},
			{
				depth: 2,
				title: 'Registry dependencies',
				href: '#registry-dependencies',
			},
			{
				depth: 2,
				title: 'API reference',
				href: '#api-reference',
			},
			{
				depth: 3,
				title: 'Kbd',
				href: '#kbd',
			},
			{
				depth: 3,
				title: 'KbdGroup',
				href: '#kbdgroup',
			},
			{
				depth: 2,
				title: 'Related docs',
				href: '#related-docs',
			},
		],
	},
	{
		slug: 'components/label',
		url: '/docs/components/label',
		title: 'Label',
		description: 'A native SolidJS label with required-state styling.',
		html: '<blockquote>\n<p>Use Label with native for/id association for form controls.</p>\n</blockquote>\n<h2 id="registry-install" tabindex="-1"><a class="header-anchor" href="#registry-install">Registry install</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#953800;--shiki-dark:#B392F0">pnpm</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> dlx</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> shadcn@latest</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> add</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> @tile-ui/label</span></span>\n<span class="line"></span></code></pre><h2 id="package-usage" tabindex="-1"><a class="header-anchor" href="#package-usage">Package usage</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">import</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> { Label, Input } </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">from</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> \'@tile-ui/solid\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Label</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> for</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"email"</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> required</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>Email&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Label</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Input</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> id</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"email"</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> type</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"email"</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> /></span></span>\n<span class="line"></span></code></pre><h2 id="highlights" tabindex="-1"><a class="header-anchor" href="#highlights">Highlights</a></h2>\n<ul>\n<li>Required indicator</li>\n<li>Pairs with native and custom fields</li>\n</ul>\n<h2 id="registry-dependencies" tabindex="-1"><a class="header-anchor" href="#registry-dependencies">Registry dependencies</a></h2>\n<table>\n<thead>\n<tr>\n<th>Item</th>\n<th>Purpose</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>label</code></td>\n<td>Component source and module styles</td>\n</tr>\n<tr>\n<td><code>core</code></td>\n<td>Framework-agnostic logic helpers</td>\n</tr>\n<tr>\n<td><code>styles</code></td>\n<td>Shared SCSS tokens and globals</td>\n</tr>\n</tbody>\n</table>\n<h2 id="api-reference" tabindex="-1"><a class="header-anchor" href="#api-reference">API reference</a></h2>\n<h3 id="label" tabindex="-1"><a class="header-anchor" href="#label">Label</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>required</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h2 id="related-docs" tabindex="-1"><a class="header-anchor" href="#related-docs">Related docs</a></h2>\n<ul>\n<li><a href="/docs/components/input">Input</a></li>\n<li><a href="/docs/components/field">Field</a></li>\n<li><a href="/docs/components/form">Form</a></li>\n</ul>\n',
		toc: [
			{
				depth: 2,
				title: 'Registry install',
				href: '#registry-install',
			},
			{
				depth: 2,
				title: 'Package usage',
				href: '#package-usage',
			},
			{
				depth: 2,
				title: 'Highlights',
				href: '#highlights',
			},
			{
				depth: 2,
				title: 'Registry dependencies',
				href: '#registry-dependencies',
			},
			{
				depth: 2,
				title: 'API reference',
				href: '#api-reference',
			},
			{
				depth: 3,
				title: 'Label',
				href: '#label',
			},
			{
				depth: 2,
				title: 'Related docs',
				href: '#related-docs',
			},
		],
	},
	{
		slug: 'components/liveline',
		url: '/docs/components/liveline',
		title: 'Liveline',
		description: 'A real-time SolidJS canvas chart for line, multi-series, candlestick, and market-data displays.',
		html: '<blockquote>\n<p>Liveline keeps drawing in a shared canvas engine while Solid signals own lifecycle, controls, accessibility, and transitions.</p>\n</blockquote>\n<h2 id="demo-guide" tabindex="-1"><a class="header-anchor" href="#demo-guide">Demo guide</a></h2>\n<p>Six separate upstream-style scenarios use the same deterministic feed model as React and Vue. Each panel owns its state, feed, theme, cadence, and window.</p>\n<ul>\n<li><strong>Live line:</strong> real appended history, four volatility levels, 50ms to 1s cadence, 10s to 5m windows, fill, momentum, grid, pulse, and scrubbing.</li>\n<li><strong>Crypto:</strong> BTC/USD with an hour of seeded history, 5m/15m/1h windows, live orderbook depth, an opening-price reference, and opt-in degen effects.</li>\n<li><strong>Multi-line:</strong> two to four independent walks with stable series identities and built-in visibility chips. Fill and momentum controls are disabled because this category does not use them.</li>\n<li><strong>Candlesticks:</strong> genuine 1s/2s/5s/10s OHLC buckets. Completed bars go to <code>candles</code>; the active bucket goes to <code>liveCandle</code>. Candle-to-line morphing keeps <code>mode=&quot;candle&quot;</code> and changes <code>lineMode</code>, using the original ticks as <code>lineData</code> and <code>lineValue</code>.</li>\n<li><strong>Dashboard:</strong> four independently updated compact metrics.</li>\n<li><strong>Size variants:</strong> upstream 320 x 180, 240 x 120, 160 x 100, and 120 x 80 panels, suppressing badge, grid, and momentum below 200px. Width shrinks only when necessary to fit the viewport.</li>\n</ul>\n<h3 id="feed-state-contract" tabindex="-1"><a class="header-anchor" href="#feed-state-contract">Feed state contract</a></h3>\n<p><strong>Live</strong> restores seeded history and starts automatic appends. <strong>Loading</strong> clears all relevant inputs: history, series data, committed and live candles, morph ticks, and market overlays. <strong>Empty</strong> clears the same inputs without the loading animation. Neither changes category. <strong>Pause</strong> stops the producer and chart scrolling; <strong>Resume</strong> continues history. <strong>Next tick</strong> calls the automatic feed function and is disabled outside Live or while paused.</p>\n<p>Status text exposes state, point count, tick count, window, cadence, and live OHLC. History is bounded to 3,800 seconds and 76,000 points per feed. Seeded values are deterministic; timestamps are anchored on mount, not rewritten on updates. These are simulations, not market data.</p>\n<p>Light/dark controls match the palette and opaque panel background. Public copied examples include their pure data helpers and scoped styles, without private documentation imports.</p>\n<h2 id="registry-install" tabindex="-1"><a class="header-anchor" href="#registry-install">Registry install</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#953800;--shiki-dark:#B392F0">pnpm</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> dlx</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> shadcn@latest</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> add</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> @tile-ui/liveline</span></span>\n<span class="line"></span></code></pre><p>The item installs <code>liveline-core</code>, the Solid component and transition, and the Liveline SCSS module. Core files retain their relative source tree under <code>components/ui/lib/liveline</code>.</p>\n<h2 id="package-usage" tabindex="-1"><a class="header-anchor" href="#package-usage">Package usage</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">import</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> { Liveline } </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">from</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> \'@tile-ui/solid\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">const</span><span style="--shiki-light:#0550AE;--shiki-dark:#79B8FF"> now</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583"> =</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> Math.</span><span style="--shiki-light:#8250DF;--shiki-dark:#B392F0">floor</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">(Date.</span><span style="--shiki-light:#8250DF;--shiki-dark:#B392F0">now</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">() </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">/</span><span style="--shiki-light:#0550AE;--shiki-dark:#79B8FF"> 1000</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">);</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Liveline</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> aria-label</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"ETH/USD live price, 105.10"</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> data</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">[{ time: now </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">-</span><span style="--shiki-light:#0550AE;--shiki-dark:#79B8FF"> 5</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">, value: </span><span style="--shiki-light:#0550AE;--shiki-dark:#79B8FF">101.2</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> }, { time: now, value: </span><span style="--shiki-light:#0550AE;--shiki-dark:#79B8FF">105.1</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> }]</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">}</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> value</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#0550AE;--shiki-dark:#79B8FF">105.1</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">}</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> windows</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">[{ label: </span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">\'30s\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">, secs: </span><span style="--shiki-light:#0550AE;--shiki-dark:#79B8FF">30</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> }, { label: </span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">\'1m\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">, secs: </span><span style="--shiki-light:#0550AE;--shiki-dark:#79B8FF">60</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> }]</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">}</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> style</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">{ height: </span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">\'320px\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> }</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">}</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> /></span></span>\n<span class="line"></span></code></pre><h2 id="highlights" tabindex="-1"><a class="header-anchor" href="#highlights">Highlights</a></h2>\n<ul>\n<li><strong>Line and multi-series:</strong> use <code>data</code>/<code>value</code> for one line or <code>series</code> for colored, toggleable lines.</li>\n<li><strong>Candles and morphing:</strong> provide OHLC <code>candles</code>, <code>candleWidth</code>, and candle <code>mode</code>; use <code>lineMode</code>, <code>lineData</code>, <code>lineValue</code>, and <code>onModeChange</code> for morphing.</li>\n<li><strong>Loading, empty, and pause:</strong> <code>loading</code> draws a placeholder, empty data uses <code>emptyText</code>, and <code>paused</code> freezes scrolling.</li>\n<li><strong>Windows and momentum:</strong> built-in range controls and inferred or forced <code>up</code>, <code>down</code>, and <code>flat</code> momentum.</li>\n<li><strong>Orderbook and degen:</strong> optional bid/ask depth, reference line, particles, and momentum shake.</li>\n</ul>\n<h2 id="accessibility" tabindex="-1"><a class="header-anchor" href="#accessibility">Accessibility</a></h2>\n<p>The canvas has <code>role=&quot;img&quot;</code>; provide an <code>aria-label</code> with instrument and current value and use <code>aria-describedby</code> for a summary or table. Range, mode, and series controls are native buttons with <code>aria-pressed</code>. <code>showValue</code> is visual-only, so use a live region when tick announcements are required.</p>\n<p><code>LivelineTransition</code> immediately swaps content for <code>prefers-reduced-motion: reduce</code>. Applications can also stop canvas motion by setting <code>paused</code>, disabling <code>pulse</code> and <code>degen</code>, and avoiding animated tick updates for that query.</p>\n<h2 id="registry-dependencies" tabindex="-1"><a class="header-anchor" href="#registry-dependencies">Registry dependencies</a></h2>\n<table>\n<thead>\n<tr>\n<th>Item</th>\n<th>Purpose</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>liveline</code></td>\n<td>Solid component, transition, and module styles</td>\n</tr>\n<tr>\n<td><code>liveline-core</code></td>\n<td>Canvas engine, drawing modules, themes, and math</td>\n</tr>\n<tr>\n<td><code>styles</code></td>\n<td>Shared SCSS tokens and globals</td>\n</tr>\n</tbody>\n</table>\n<h2 id="api-reference" tabindex="-1"><a class="header-anchor" href="#api-reference">API reference</a></h2>\n<h3 id="liveline" tabindex="-1"><a class="header-anchor" href="#liveline">Liveline</a></h3>\n<p><code>style</code> sizes and styles the complete widget, including controls. Use <code>surfaceStyle</code> and <code>surfaceClassName</code> for chart-only styling on the engine’s measured surface. For example, <code>surfaceStyle={{ height: \'240px\' }}</code> sets the chart height; use an auto-height root when controls should add to that height. An explicit surface height is not clamped to a smaller root. The surface does not clip badges or tooltips unless you explicitly set overflow.</p>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>data</code>, <code>value</code></td>\n<td><code>LivelinePoint[]</code>, <code>number</code></td>\n<td>required</td>\n</tr>\n<tr>\n<td><code>series</code></td>\n<td><code>LivelineSeries[]</code></td>\n<td>–</td>\n</tr>\n<tr>\n<td><code>theme</code>, <code>color</code></td>\n<td><code>\'light\' | \'dark\'</code>, <code>string</code></td>\n<td><code>\'dark\'</code>, <code>\'#3b82f6\'</code></td>\n</tr>\n<tr>\n<td><code>window</code>, <code>windows</code>, <code>onWindowChange</code>, <code>windowStyle</code></td>\n<td><code>number</code>, <code>WindowOption[]</code>, callback, <code>WindowStyle</code></td>\n<td><code>30</code>, --, --, <code>\'default\'</code></td>\n</tr>\n<tr>\n<td><code>mode</code>, <code>candles</code>, <code>candleWidth</code>, <code>liveCandle</code></td>\n<td>line/candle mode and OHLC data</td>\n<td><code>\'line\'</code>, –</td>\n</tr>\n<tr>\n<td><code>lineMode</code>, <code>lineData</code>, <code>lineValue</code>, <code>onModeChange</code></td>\n<td>morph state, tick data/value, callback</td>\n<td>–</td>\n</tr>\n<tr>\n<td><code>loading</code>, <code>paused</code>, <code>emptyText</code></td>\n<td><code>boolean</code>, <code>boolean</code>, <code>string</code></td>\n<td><code>false</code>, <code>false</code>, default text</td>\n</tr>\n<tr>\n<td><code>grid</code>, <code>badge</code>, <code>fill</code>, <code>scrub</code>, <code>pulse</code></td>\n<td><code>boolean</code></td>\n<td><code>true</code></td>\n</tr>\n<tr>\n<td><code>momentum</code></td>\n<td><code>boolean | Momentum</code></td>\n<td><code>true</code></td>\n</tr>\n<tr>\n<td><code>degen</code>, <code>orderbook</code>, <code>referenceLine</code></td>\n<td><code>boolean | DegenOptions</code>, <code>OrderbookData</code>, <code>ReferenceLine</code></td>\n<td>–</td>\n</tr>\n<tr>\n<td><code>showValue</code>, <code>valueMomentumColor</code>, <code>exaggerate</code></td>\n<td><code>boolean</code></td>\n<td><code>false</code></td>\n</tr>\n<tr>\n<td><code>badgeTail</code>, <code>badgeVariant</code></td>\n<td><code>boolean</code>, <code>BadgeVariant</code></td>\n<td><code>true</code>, <code>\'default\'</code></td>\n</tr>\n<tr>\n<td><code>tooltipY</code>, <code>tooltipOutline</code>, <code>cursor</code>, <code>lineWidth</code></td>\n<td><code>number</code>, <code>boolean</code>, <code>string</code>, <code>number</code></td>\n<td><code>14</code>, <code>true</code>, <code>\'crosshair\'</code>, <code>2</code></td>\n</tr>\n<tr>\n<td><code>formatValue</code>, <code>formatTime</code>, <code>lerpSpeed</code>, <code>padding</code></td>\n<td>formatters, <code>number</code>, <code>Padding</code></td>\n<td>built-ins, <code>0.08</code>, built-in padding</td>\n</tr>\n<tr>\n<td><code>onHover</code>, <code>onSeriesToggle</code>, <code>seriesToggleCompact</code></td>\n<td>callbacks, <code>boolean</code></td>\n<td>–, --, <code>false</code></td>\n</tr>\n<tr>\n<td><code>aria-label</code>, <code>aria-describedby</code>, <code>class</code>, <code>className</code>, <code>style</code>, <code>ref</code></td>\n<td>Solid host props</td>\n<td>–</td>\n</tr>\n</tbody>\n</table>\n<p>Times are Unix seconds. Candles contain <code>open</code>, <code>high</code>, <code>low</code>, and <code>close</code>; series contain <code>id</code>, <code>data</code>, <code>value</code>, <code>color</code>, and optional <code>label</code>.</p>\n<h3 id="livelinetransition" tabindex="-1"><a class="header-anchor" href="#livelinetransition">LivelineTransition</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>active</code></td>\n<td><code>string</code> passed to the chart factory</td>\n<td>required</td>\n</tr>\n<tr>\n<td><code>children</code></td>\n<td><code>(key: string) =&gt; JSX.Element</code></td>\n<td>required</td>\n</tr>\n<tr>\n<td><code>duration</code></td>\n<td><code>number</code> in milliseconds</td>\n<td><code>300</code></td>\n</tr>\n<tr>\n<td><code>class</code>, <code>className</code>, <code>style</code>, <code>ref</code></td>\n<td>Solid host props</td>\n<td>–</td>\n</tr>\n</tbody>\n</table>\n<p>Pass a lazy factory, not pre-created JSX or elements marked with <code>data-liveline-key</code>. Each factory invocation runs inside its keyed layer owner so removing an outgoing layer disposes its chart engine. Use the supplied key to select the layer’s content, rather than the current active signal.</p>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">import</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> { createSignal } </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">from</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> \'solid-js\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">;</span></span>\n<span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">import</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> { Liveline, LivelineTransition } </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">from</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> \'@tile-ui/solid\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">function</span><span style="--shiki-light:#8250DF;--shiki-dark:#B392F0"> ChartTransition</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">() {</span></span>\n<span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">\tconst</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> [</span><span style="--shiki-light:#0550AE;--shiki-dark:#79B8FF">active</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">, </span><span style="--shiki-light:#0550AE;--shiki-dark:#79B8FF">setActive</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">] </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#8250DF;--shiki-dark:#B392F0"> createSignal</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">\'primary\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">);</span></span>\n<span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">\tconst</span><span style="--shiki-light:#0550AE;--shiki-dark:#79B8FF"> data</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583"> =</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> [{ time: </span><span style="--shiki-light:#0550AE;--shiki-dark:#79B8FF">1700000000</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">, value: </span><span style="--shiki-light:#0550AE;--shiki-dark:#79B8FF">100</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> }, { time: </span><span style="--shiki-light:#0550AE;--shiki-dark:#79B8FF">1700000001</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">, value: </span><span style="--shiki-light:#0550AE;--shiki-dark:#79B8FF">105</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> }];</span></span>\n<span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">\treturn</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> (</span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t\t&#x3C;></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t\t\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#85E89D">button</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> onClick</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">() </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=></span><span style="--shiki-light:#8250DF;--shiki-dark:#B392F0"> setActive</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#8250DF;--shiki-dark:#B392F0">active</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">() </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">===</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> \'primary\'</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583"> ?</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> \'secondary\'</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583"> :</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> \'primary\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">)</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">}</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>Switch chart&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#85E89D">button</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t\t\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">LivelineTransition</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> active</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#8250DF;--shiki-dark:#B392F0">active</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">()</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">}</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> style</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">{ height: </span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">\'320px\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> }</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">}</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">\t\t\t\t{</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#953800;--shiki-dark:#FFAB70">key</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">) </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=></span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> &#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Liveline</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> data</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">data</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">}</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> value</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#0550AE;--shiki-dark:#79B8FF">105</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">}</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> color</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">key </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">===</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> \'primary\'</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583"> ?</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> \'#3b82f6\'</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583"> :</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> \'#22c55e\'</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">}</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> /></span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">}</span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t\t\t&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">LivelineTransition</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t\t&#x3C;/></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t);</span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">}</span></span>\n<span class="line"></span></code></pre><h2 id="related-docs" tabindex="-1"><a class="header-anchor" href="#related-docs">Related docs</a></h2>\n<ul>\n<li><a href="/docs/components/chart">Chart</a></li>\n<li><a href="/docs/components/progress">Progress</a></li>\n<li><a href="/docs/components/table">Table</a></li>\n</ul>\n',
		toc: [
			{
				depth: 2,
				title: 'Demo guide',
				href: '#demo-guide',
			},
			{
				depth: 3,
				title: 'Feed state contract',
				href: '#feed-state-contract',
			},
			{
				depth: 2,
				title: 'Registry install',
				href: '#registry-install',
			},
			{
				depth: 2,
				title: 'Package usage',
				href: '#package-usage',
			},
			{
				depth: 2,
				title: 'Highlights',
				href: '#highlights',
			},
			{
				depth: 2,
				title: 'Accessibility',
				href: '#accessibility',
			},
			{
				depth: 2,
				title: 'Registry dependencies',
				href: '#registry-dependencies',
			},
			{
				depth: 2,
				title: 'API reference',
				href: '#api-reference',
			},
			{
				depth: 3,
				title: 'Liveline',
				href: '#liveline',
			},
			{
				depth: 3,
				title: 'LivelineTransition',
				href: '#livelinetransition',
			},
			{
				depth: 2,
				title: 'Related docs',
				href: '#related-docs',
			},
		],
	},
	{
		slug: 'components/marker',
		url: '/docs/components/marker',
		title: 'Marker',
		description: 'SolidJS content marker primitives with divider variants.',
		html: '<blockquote>\n<p>Use Marker to annotate or divide supporting content.</p>\n</blockquote>\n<h2 id="registry-install" tabindex="-1"><a class="header-anchor" href="#registry-install">Registry install</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#953800;--shiki-dark:#B392F0">pnpm</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> dlx</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> shadcn@latest</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> add</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> @tile-ui/marker</span></span>\n<span class="line"></span></code></pre><h2 id="package-usage" tabindex="-1"><a class="header-anchor" href="#package-usage">Package usage</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">import</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> { Marker, MarkerIcon, MarkerContent } </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">from</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> \'@tile-ui/solid\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Marker</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> variant</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"separator"</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">MarkerIcon</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> /></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">MarkerContent</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>Status&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">MarkerContent</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Marker</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"></span></code></pre><h2 id="highlights" tabindex="-1"><a class="header-anchor" href="#highlights">Highlights</a></h2>\n<ul>\n<li>Default, separator, and border variants</li>\n<li>Native div root</li>\n<li>Optional icon primitive</li>\n</ul>\n<h2 id="registry-dependencies" tabindex="-1"><a class="header-anchor" href="#registry-dependencies">Registry dependencies</a></h2>\n<table>\n<thead>\n<tr>\n<th>Item</th>\n<th>Purpose</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>marker</code></td>\n<td>Component source and module styles</td>\n</tr>\n<tr>\n<td><code>core</code></td>\n<td>Framework-agnostic logic helpers</td>\n</tr>\n<tr>\n<td><code>styles</code></td>\n<td>Shared SCSS tokens and globals</td>\n</tr>\n</tbody>\n</table>\n<h2 id="api-reference" tabindex="-1"><a class="header-anchor" href="#api-reference">API reference</a></h2>\n<h3 id="marker" tabindex="-1"><a class="header-anchor" href="#marker">Marker</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>variant</code></td>\n<td><code>\'default\' | \'separator\' | \'border\'</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="markericon" tabindex="-1"><a class="header-anchor" href="#markericon">MarkerIcon</a></h3>\n<p>No custom props.</p>\n<h3 id="markercontent" tabindex="-1"><a class="header-anchor" href="#markercontent">MarkerContent</a></h3>\n<p>No custom props.</p>\n<h2 id="related-docs" tabindex="-1"><a class="header-anchor" href="#related-docs">Related docs</a></h2>\n<ul>\n<li><a href="/docs/components/badge">Badge</a></li>\n<li><a href="/docs/components/item">Item</a></li>\n<li><a href="/docs/components/empty">Empty</a></li>\n</ul>\n',
		toc: [
			{
				depth: 2,
				title: 'Registry install',
				href: '#registry-install',
			},
			{
				depth: 2,
				title: 'Package usage',
				href: '#package-usage',
			},
			{
				depth: 2,
				title: 'Highlights',
				href: '#highlights',
			},
			{
				depth: 2,
				title: 'Registry dependencies',
				href: '#registry-dependencies',
			},
			{
				depth: 2,
				title: 'API reference',
				href: '#api-reference',
			},
			{
				depth: 3,
				title: 'Marker',
				href: '#marker',
			},
			{
				depth: 3,
				title: 'MarkerIcon',
				href: '#markericon',
			},
			{
				depth: 3,
				title: 'MarkerContent',
				href: '#markercontent',
			},
			{
				depth: 2,
				title: 'Related docs',
				href: '#related-docs',
			},
		],
	},
	{
		slug: 'components/menubar',
		url: '/docs/components/menubar',
		title: 'Menubar',
		description: 'A desktop-style SolidJS menubar with roving focus and menu switching.',
		html: '<blockquote>\n<p>Use Menubar for desktop-style menus whose roving triggers and open panels switch with arrow keys.</p>\n</blockquote>\n<h2 id="registry-install" tabindex="-1"><a class="header-anchor" href="#registry-install">Registry install</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#953800;--shiki-dark:#B392F0">pnpm</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> dlx</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> shadcn@latest</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> add</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> @tile-ui/menubar</span></span>\n<span class="line"></span></code></pre><h2 id="package-usage" tabindex="-1"><a class="header-anchor" href="#package-usage">Package usage</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">import</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> { Menubar } </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">from</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> \'@tile-ui/solid\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Menubar</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">MenubarMenu</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> value</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"file"</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">MenubarTrigger</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>File&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">MenubarTrigger</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">MenubarContent</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">MenubarItem</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>New&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">MenubarItem</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">MenubarContent</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">MenubarMenu</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">MenubarMenu</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> value</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"view"</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">MenubarTrigger</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>View&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">MenubarTrigger</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">MenubarContent</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">MenubarCheckboxItem</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> checked</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>Sidebar&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">MenubarCheckboxItem</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">MenubarContent</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">MenubarMenu</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Menubar</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"></span></code></pre><h2 id="highlights" tabindex="-1"><a class="header-anchor" href="#highlights">Highlights</a></h2>\n<ul>\n<li>Arrow-key switching between menus</li>\n<li>Checkbox, radio, and nested submenu branches</li>\n<li>Roving trigger tabstops from the menu Foundation</li>\n</ul>\n<h2 id="foundation-behavior" tabindex="-1"><a class="header-anchor" href="#foundation-behavior">Foundation behavior</a></h2>\n<p>This Solid implementation uses native nested primitives and does not expose <code>asChild</code>. Controlled state uses Solid accessors and explicit callbacks such as <code>onOpenChange</code>, <code>onValueChange</code>, or <code>onSearchChange</code> where the family supports them.</p>\n<p>Portal content is omitted from the server response and mounted during hydration into the resolved document or nested portal scope. Closed and default-open roots keep deterministic trigger IDs and ARIA relationships without a hydration mismatch.</p>\n<p>Keyboard behavior follows the shared Foundation: focus and Tab order, Escape dismissal, arrow-key movement, typeahead, submenu branches, and trigger restoration are applied according to the component role.</p>\n<h2 id="registry-dependencies" tabindex="-1"><a class="header-anchor" href="#registry-dependencies">Registry dependencies</a></h2>\n<table>\n<thead>\n<tr>\n<th>Item</th>\n<th>Purpose</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>menubar</code></td>\n<td>Component source and module styles</td>\n</tr>\n<tr>\n<td><code>core</code></td>\n<td>Framework-agnostic logic helpers</td>\n</tr>\n<tr>\n<td><code>dropdown-menu</code></td>\n<td>Registry component dependency</td>\n</tr>\n<tr>\n<td><code>styles</code></td>\n<td>Shared SCSS tokens and globals</td>\n</tr>\n</tbody>\n</table>\n<h2 id="api-reference" tabindex="-1"><a class="header-anchor" href="#api-reference">API reference</a></h2>\n<h3 id="menubar" tabindex="-1"><a class="header-anchor" href="#menubar">Menubar</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>value</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>defaultValue</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>onValueChange</code></td>\n<td><code>(value: string | undefined) =&gt; void</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="menubarmenu" tabindex="-1"><a class="header-anchor" href="#menubarmenu">MenubarMenu</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>value</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="menubartrigger" tabindex="-1"><a class="header-anchor" href="#menubartrigger">MenubarTrigger</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>disabled</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="menubarcontent" tabindex="-1"><a class="header-anchor" href="#menubarcontent">MenubarContent</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>side</code></td>\n<td><code>\'top\' | \'right\' | \'bottom\' | \'left\'</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>align</code></td>\n<td><code>\'start\' | \'center\' | \'end\'</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>sideOffset</code></td>\n<td><code>number</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>alignOffset</code></td>\n<td><code>number</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="menubaritem" tabindex="-1"><a class="header-anchor" href="#menubaritem">MenubarItem</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>inset</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>variant</code></td>\n<td><code>\'default\' | \'destructive\'</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>disabled</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>onSelect</code></td>\n<td><code>(event: Event) =&gt; void</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="menubarcheckboxitem" tabindex="-1"><a class="header-anchor" href="#menubarcheckboxitem">MenubarCheckboxItem</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>checked</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>defaultChecked</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>onCheckedChange</code></td>\n<td><code>(checked: boolean) =&gt; void</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>disabled</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="menubarradiogroup" tabindex="-1"><a class="header-anchor" href="#menubarradiogroup">MenubarRadioGroup</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>value</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>defaultValue</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>onValueChange</code></td>\n<td><code>(value: string) =&gt; void</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="menubarradioitem" tabindex="-1"><a class="header-anchor" href="#menubarradioitem">MenubarRadioItem</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>value</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>disabled</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="menubarlabel" tabindex="-1"><a class="header-anchor" href="#menubarlabel">MenubarLabel</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>inset</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="menubarsub" tabindex="-1"><a class="header-anchor" href="#menubarsub">MenubarSub</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>open</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>defaultOpen</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>onOpenChange</code></td>\n<td><code>(open: boolean) =&gt; void</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="menubarsubtrigger" tabindex="-1"><a class="header-anchor" href="#menubarsubtrigger">MenubarSubTrigger</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>inset</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>disabled</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="menubarportal" tabindex="-1"><a class="header-anchor" href="#menubarportal">MenubarPortal</a></h3>\n<p>No custom props.</p>\n<h3 id="menubargroup" tabindex="-1"><a class="header-anchor" href="#menubargroup">MenubarGroup</a></h3>\n<p>No custom props.</p>\n<h3 id="menubarseparator" tabindex="-1"><a class="header-anchor" href="#menubarseparator">MenubarSeparator</a></h3>\n<p>No custom props.</p>\n<h3 id="menubarshortcut" tabindex="-1"><a class="header-anchor" href="#menubarshortcut">MenubarShortcut</a></h3>\n<p>No custom props.</p>\n<h3 id="menubarsubcontent" tabindex="-1"><a class="header-anchor" href="#menubarsubcontent">MenubarSubContent</a></h3>\n<p>No custom props.</p>\n<h2 id="related-docs" tabindex="-1"><a class="header-anchor" href="#related-docs">Related docs</a></h2>\n<ul>\n<li><a href="/docs/components/dropdown-menu">DropdownMenu</a></li>\n<li><a href="/docs/components/navigation-menu">NavigationMenu</a></li>\n<li><a href="/docs/components/context-menu">ContextMenu</a></li>\n</ul>\n',
		toc: [
			{
				depth: 2,
				title: 'Registry install',
				href: '#registry-install',
			},
			{
				depth: 2,
				title: 'Package usage',
				href: '#package-usage',
			},
			{
				depth: 2,
				title: 'Highlights',
				href: '#highlights',
			},
			{
				depth: 2,
				title: 'Foundation behavior',
				href: '#foundation-behavior',
			},
			{
				depth: 2,
				title: 'Registry dependencies',
				href: '#registry-dependencies',
			},
			{
				depth: 2,
				title: 'API reference',
				href: '#api-reference',
			},
			{
				depth: 3,
				title: 'Menubar',
				href: '#menubar',
			},
			{
				depth: 3,
				title: 'MenubarMenu',
				href: '#menubarmenu',
			},
			{
				depth: 3,
				title: 'MenubarTrigger',
				href: '#menubartrigger',
			},
			{
				depth: 3,
				title: 'MenubarContent',
				href: '#menubarcontent',
			},
			{
				depth: 3,
				title: 'MenubarItem',
				href: '#menubaritem',
			},
			{
				depth: 3,
				title: 'MenubarCheckboxItem',
				href: '#menubarcheckboxitem',
			},
			{
				depth: 3,
				title: 'MenubarRadioGroup',
				href: '#menubarradiogroup',
			},
			{
				depth: 3,
				title: 'MenubarRadioItem',
				href: '#menubarradioitem',
			},
			{
				depth: 3,
				title: 'MenubarLabel',
				href: '#menubarlabel',
			},
			{
				depth: 3,
				title: 'MenubarSub',
				href: '#menubarsub',
			},
			{
				depth: 3,
				title: 'MenubarSubTrigger',
				href: '#menubarsubtrigger',
			},
			{
				depth: 3,
				title: 'MenubarPortal',
				href: '#menubarportal',
			},
			{
				depth: 3,
				title: 'MenubarGroup',
				href: '#menubargroup',
			},
			{
				depth: 3,
				title: 'MenubarSeparator',
				href: '#menubarseparator',
			},
			{
				depth: 3,
				title: 'MenubarShortcut',
				href: '#menubarshortcut',
			},
			{
				depth: 3,
				title: 'MenubarSubContent',
				href: '#menubarsubcontent',
			},
			{
				depth: 2,
				title: 'Related docs',
				href: '#related-docs',
			},
		],
	},
	{
		slug: 'components/message',
		url: '/docs/components/message',
		title: 'Message',
		description: 'Composable SolidJS message layout primitives for static conversation content.',
		html: '<blockquote>\n<p>Use Message primitives to compose semantic conversation rows without adding state management.</p>\n</blockquote>\n<h2 id="registry-install" tabindex="-1"><a class="header-anchor" href="#registry-install">Registry install</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#953800;--shiki-dark:#B392F0">pnpm</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> dlx</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> shadcn@latest</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> add</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> @tile-ui/message</span></span>\n<span class="line"></span></code></pre><h2 id="package-usage" tabindex="-1"><a class="header-anchor" href="#package-usage">Package usage</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">import</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> { MessageGroup, Message, MessageContent, MessageFooter } </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">from</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> \'@tile-ui/solid\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">MessageGroup</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Message</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> align</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"end"</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">MessageContent</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>Registry complete.&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">MessageContent</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">MessageFooter</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>Now&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">MessageFooter</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Message</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">MessageGroup</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"></span></code></pre><h2 id="highlights" tabindex="-1"><a class="header-anchor" href="#highlights">Highlights</a></h2>\n<ul>\n<li>Start and end alignment</li>\n<li>Avatar, header, content, and footer primitives</li>\n<li>Native static message markup</li>\n</ul>\n<h2 id="registry-dependencies" tabindex="-1"><a class="header-anchor" href="#registry-dependencies">Registry dependencies</a></h2>\n<table>\n<thead>\n<tr>\n<th>Item</th>\n<th>Purpose</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>message</code></td>\n<td>Component source and module styles</td>\n</tr>\n<tr>\n<td><code>core</code></td>\n<td>Framework-agnostic logic helpers</td>\n</tr>\n<tr>\n<td><code>styles</code></td>\n<td>Shared SCSS tokens and globals</td>\n</tr>\n</tbody>\n</table>\n<h2 id="api-reference" tabindex="-1"><a class="header-anchor" href="#api-reference">API reference</a></h2>\n<h3 id="message" tabindex="-1"><a class="header-anchor" href="#message">Message</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>align</code></td>\n<td><code>\'start\' | \'end\'</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="messagegroup" tabindex="-1"><a class="header-anchor" href="#messagegroup">MessageGroup</a></h3>\n<p>No custom props.</p>\n<h3 id="messageavatar" tabindex="-1"><a class="header-anchor" href="#messageavatar">MessageAvatar</a></h3>\n<p>No custom props.</p>\n<h3 id="messagecontent" tabindex="-1"><a class="header-anchor" href="#messagecontent">MessageContent</a></h3>\n<p>No custom props.</p>\n<h3 id="messageheader" tabindex="-1"><a class="header-anchor" href="#messageheader">MessageHeader</a></h3>\n<p>No custom props.</p>\n<h3 id="messagefooter" tabindex="-1"><a class="header-anchor" href="#messagefooter">MessageFooter</a></h3>\n<p>No custom props.</p>\n<h2 id="related-docs" tabindex="-1"><a class="header-anchor" href="#related-docs">Related docs</a></h2>\n<ul>\n<li><a href="/docs/components/bubble">Bubble</a></li>\n<li><a href="/docs/components/message-scroller">MessageScroller</a></li>\n<li><a href="/docs/components/avatar">Avatar</a></li>\n</ul>\n',
		toc: [
			{
				depth: 2,
				title: 'Registry install',
				href: '#registry-install',
			},
			{
				depth: 2,
				title: 'Package usage',
				href: '#package-usage',
			},
			{
				depth: 2,
				title: 'Highlights',
				href: '#highlights',
			},
			{
				depth: 2,
				title: 'Registry dependencies',
				href: '#registry-dependencies',
			},
			{
				depth: 2,
				title: 'API reference',
				href: '#api-reference',
			},
			{
				depth: 3,
				title: 'Message',
				href: '#message',
			},
			{
				depth: 3,
				title: 'MessageGroup',
				href: '#messagegroup',
			},
			{
				depth: 3,
				title: 'MessageAvatar',
				href: '#messageavatar',
			},
			{
				depth: 3,
				title: 'MessageContent',
				href: '#messagecontent',
			},
			{
				depth: 3,
				title: 'MessageHeader',
				href: '#messageheader',
			},
			{
				depth: 3,
				title: 'MessageFooter',
				href: '#messagefooter',
			},
			{
				depth: 2,
				title: 'Related docs',
				href: '#related-docs',
			},
		],
	},
	{
		slug: 'components/message-scroller',
		url: '/docs/components/message-scroller',
		title: 'MessageScroller',
		description: 'A provider-backed SolidJS message viewport with observed scroll controls.',
		html: '<blockquote>\n<p>Use MessageScrollerProvider around the viewport, content, items, controls, and hooks that share scroll state.</p>\n</blockquote>\n<h2 id="registry-install" tabindex="-1"><a class="header-anchor" href="#registry-install">Registry install</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#953800;--shiki-dark:#B392F0">pnpm</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> dlx</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> shadcn@latest</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> add</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> @tile-ui/message-scroller</span></span>\n<span class="line"></span></code></pre><h2 id="package-usage" tabindex="-1"><a class="header-anchor" href="#package-usage">Package usage</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">import</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> { MessageScrollerProvider, MessageScroller, MessageScrollerViewport, MessageScrollerContent, MessageScrollerItem, MessageScrollerButton } </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">from</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> \'@tile-ui/solid\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">MessageScrollerProvider</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">MessageScroller</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">MessageScrollerViewport</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t\t\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">MessageScrollerContent</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t\t\t\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">MessageScrollerItem</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> scrollAnchor</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>Message one&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">MessageScrollerItem</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t\t\t&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">MessageScrollerContent</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t\t&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">MessageScrollerViewport</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">MessageScrollerButton</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> /></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">MessageScroller</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">MessageScrollerProvider</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"></span></code></pre><h2 id="highlights" tabindex="-1"><a class="header-anchor" href="#highlights">Highlights</a></h2>\n<ul>\n<li>Provider-owned viewport observation</li>\n<li>Start and end controls</li>\n<li>Scrollable and visibility hooks</li>\n</ul>\n<h2 id="registry-dependencies" tabindex="-1"><a class="header-anchor" href="#registry-dependencies">Registry dependencies</a></h2>\n<table>\n<thead>\n<tr>\n<th>Item</th>\n<th>Purpose</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>message-scroller</code></td>\n<td>Component source and module styles</td>\n</tr>\n<tr>\n<td><code>core</code></td>\n<td>Framework-agnostic logic helpers</td>\n</tr>\n<tr>\n<td><code>utils</code></td>\n<td>Shared utility helpers</td>\n</tr>\n<tr>\n<td><code>styles</code></td>\n<td>Shared SCSS tokens and globals</td>\n</tr>\n</tbody>\n</table>\n<h2 id="api-reference" tabindex="-1"><a class="header-anchor" href="#api-reference">API reference</a></h2>\n<h3 id="messagescrolleritem" tabindex="-1"><a class="header-anchor" href="#messagescrolleritem">MessageScrollerItem</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>scrollAnchor</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="messagescrollerbutton" tabindex="-1"><a class="header-anchor" href="#messagescrollerbutton">MessageScrollerButton</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>direction</code></td>\n<td><code>\'start\' | \'end\'</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="messagescrollerprovider" tabindex="-1"><a class="header-anchor" href="#messagescrollerprovider">MessageScrollerProvider</a></h3>\n<p>No custom props.</p>\n<h3 id="messagescroller" tabindex="-1"><a class="header-anchor" href="#messagescroller">MessageScroller</a></h3>\n<p>No custom props.</p>\n<h3 id="messagescrollerviewport" tabindex="-1"><a class="header-anchor" href="#messagescrollerviewport">MessageScrollerViewport</a></h3>\n<p>No custom props.</p>\n<h3 id="messagescrollercontent" tabindex="-1"><a class="header-anchor" href="#messagescrollercontent">MessageScrollerContent</a></h3>\n<p>No custom props.</p>\n<h3 id="usemessagescroller" tabindex="-1"><a class="header-anchor" href="#usemessagescroller">useMessageScroller</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>return</code></td>\n<td><code>MessageScrollerContextValue</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="usemessagescrollerscrollable" tabindex="-1"><a class="header-anchor" href="#usemessagescrollerscrollable">useMessageScrollerScrollable</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>return</code></td>\n<td><code>{ scrollable: Accessor&lt;boolean&gt;; isScrollable: Accessor&lt;boolean&gt; }</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="usemessagescrollervisibility" tabindex="-1"><a class="header-anchor" href="#usemessagescrollervisibility">useMessageScrollerVisibility</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>direction</code></td>\n<td><code>\'start\' | \'end\'</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>return</code></td>\n<td><code>MessageScrollerVisibilityAccessors</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h2 id="related-docs" tabindex="-1"><a class="header-anchor" href="#related-docs">Related docs</a></h2>\n<ul>\n<li><a href="/docs/components/message">Message</a></li>\n<li><a href="/docs/components/bubble">Bubble</a></li>\n<li><a href="/docs/components/scroll-area">ScrollArea</a></li>\n</ul>\n',
		toc: [
			{
				depth: 2,
				title: 'Registry install',
				href: '#registry-install',
			},
			{
				depth: 2,
				title: 'Package usage',
				href: '#package-usage',
			},
			{
				depth: 2,
				title: 'Highlights',
				href: '#highlights',
			},
			{
				depth: 2,
				title: 'Registry dependencies',
				href: '#registry-dependencies',
			},
			{
				depth: 2,
				title: 'API reference',
				href: '#api-reference',
			},
			{
				depth: 3,
				title: 'MessageScrollerItem',
				href: '#messagescrolleritem',
			},
			{
				depth: 3,
				title: 'MessageScrollerButton',
				href: '#messagescrollerbutton',
			},
			{
				depth: 3,
				title: 'MessageScrollerProvider',
				href: '#messagescrollerprovider',
			},
			{
				depth: 3,
				title: 'MessageScroller',
				href: '#messagescroller',
			},
			{
				depth: 3,
				title: 'MessageScrollerViewport',
				href: '#messagescrollerviewport',
			},
			{
				depth: 3,
				title: 'MessageScrollerContent',
				href: '#messagescrollercontent',
			},
			{
				depth: 3,
				title: 'useMessageScroller',
				href: '#usemessagescroller',
			},
			{
				depth: 3,
				title: 'useMessageScrollerScrollable',
				href: '#usemessagescrollerscrollable',
			},
			{
				depth: 3,
				title: 'useMessageScrollerVisibility',
				href: '#usemessagescrollervisibility',
			},
			{
				depth: 2,
				title: 'Related docs',
				href: '#related-docs',
			},
		],
	},
	{
		slug: 'components/native-select',
		url: '/docs/components/native-select',
		title: 'NativeSelect',
		description: 'A styled native SolidJS select with SSR-safe initial values and reset behavior.',
		html: '<blockquote>\n<p>Use NativeSelect when native option behavior and form reset semantics are preferred.</p>\n</blockquote>\n<h2 id="registry-install" tabindex="-1"><a class="header-anchor" href="#registry-install">Registry install</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#953800;--shiki-dark:#B392F0">pnpm</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> dlx</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> shadcn@latest</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> add</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> @tile-ui/native-select</span></span>\n<span class="line"></span></code></pre><h2 id="package-usage" tabindex="-1"><a class="header-anchor" href="#package-usage">Package usage</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">import</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> { NativeSelect, NativeSelectOption } </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">from</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> \'@tile-ui/solid\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">NativeSelect</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> defaultValue</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"a"</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">NativeSelectOption</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> value</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"a"</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>Option A&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">NativeSelectOption</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">NativeSelectOption</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> value</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"b"</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>Option B&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">NativeSelectOption</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">NativeSelect</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"></span></code></pre><h2 id="highlights" tabindex="-1"><a class="header-anchor" href="#highlights">Highlights</a></h2>\n<ul>\n<li>Two sizes</li>\n<li>Option and optgroup</li>\n<li>Custom chevron</li>\n</ul>\n<h2 id="registry-dependencies" tabindex="-1"><a class="header-anchor" href="#registry-dependencies">Registry dependencies</a></h2>\n<table>\n<thead>\n<tr>\n<th>Item</th>\n<th>Purpose</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>native-select</code></td>\n<td>Component source and module styles</td>\n</tr>\n<tr>\n<td><code>core</code></td>\n<td>Framework-agnostic logic helpers</td>\n</tr>\n<tr>\n<td><code>utils</code></td>\n<td>Shared utility helpers</td>\n</tr>\n<tr>\n<td><code>styles</code></td>\n<td>Shared SCSS tokens and globals</td>\n</tr>\n</tbody>\n</table>\n<h2 id="api-reference" tabindex="-1"><a class="header-anchor" href="#api-reference">API reference</a></h2>\n<h3 id="nativeselect" tabindex="-1"><a class="header-anchor" href="#nativeselect">NativeSelect</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>size</code></td>\n<td><code>\'sm\' | \'default\'</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>value</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>defaultValue</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>onValueChange</code></td>\n<td><code>(value: string) =&gt; void</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="nativeselectoption" tabindex="-1"><a class="header-anchor" href="#nativeselectoption">NativeSelectOption</a></h3>\n<p>No custom props.</p>\n<h3 id="nativeselectoptgroup" tabindex="-1"><a class="header-anchor" href="#nativeselectoptgroup">NativeSelectOptGroup</a></h3>\n<p>No custom props.</p>\n<h2 id="related-docs" tabindex="-1"><a class="header-anchor" href="#related-docs">Related docs</a></h2>\n<ul>\n<li><a href="/docs/components/select">Select</a></li>\n<li><a href="/docs/components/combobox">Combobox</a></li>\n<li><a href="/docs/components/input">Input</a></li>\n</ul>\n',
		toc: [
			{
				depth: 2,
				title: 'Registry install',
				href: '#registry-install',
			},
			{
				depth: 2,
				title: 'Package usage',
				href: '#package-usage',
			},
			{
				depth: 2,
				title: 'Highlights',
				href: '#highlights',
			},
			{
				depth: 2,
				title: 'Registry dependencies',
				href: '#registry-dependencies',
			},
			{
				depth: 2,
				title: 'API reference',
				href: '#api-reference',
			},
			{
				depth: 3,
				title: 'NativeSelect',
				href: '#nativeselect',
			},
			{
				depth: 3,
				title: 'NativeSelectOption',
				href: '#nativeselectoption',
			},
			{
				depth: 3,
				title: 'NativeSelectOptGroup',
				href: '#nativeselectoptgroup',
			},
			{
				depth: 2,
				title: 'Related docs',
				href: '#related-docs',
			},
		],
	},
	{
		slug: 'components/navigation-menu',
		url: '/docs/components/navigation-menu',
		title: 'NavigationMenu',
		description: 'A SolidJS navigation menu with shared and local viewport modes.',
		html: '<blockquote>\n<p>Use NavigationMenu for primary links with either a shared viewport or local content panels.</p>\n</blockquote>\n<h2 id="registry-install" tabindex="-1"><a class="header-anchor" href="#registry-install">Registry install</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#953800;--shiki-dark:#B392F0">pnpm</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> dlx</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> shadcn@latest</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> add</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> @tile-ui/navigation-menu</span></span>\n<span class="line"></span></code></pre><h2 id="package-usage" tabindex="-1"><a class="header-anchor" href="#package-usage">Package usage</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">import</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> { NavigationMenu } </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">from</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> \'@tile-ui/solid\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">NavigationMenu</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> viewport</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#0550AE;--shiki-dark:#79B8FF">false</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">}</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">NavigationMenuList</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">NavigationMenuItem</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> value</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"docs"</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">NavigationMenuTrigger</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>Docs&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">NavigationMenuTrigger</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">NavigationMenuContent</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">NavigationMenuLink</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> href</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"/docs"</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>Overview&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">NavigationMenuLink</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">NavigationMenuContent</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">NavigationMenuItem</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">NavigationMenuList</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">NavigationMenu</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"></span></code></pre><h2 id="highlights" tabindex="-1"><a class="header-anchor" href="#highlights">Highlights</a></h2>\n<ul>\n<li>Shared viewport and <code>viewport={false}</code> local modes</li>\n<li>Roving trigger tabstops and native links</li>\n<li>Controlled <code>value</code> and <code>onValueChange</code> callbacks</li>\n</ul>\n<h2 id="foundation-behavior" tabindex="-1"><a class="header-anchor" href="#foundation-behavior">Foundation behavior</a></h2>\n<p>This Solid implementation uses native nested primitives and does not expose <code>asChild</code>. Controlled state uses Solid accessors and explicit callbacks such as <code>onOpenChange</code>, <code>onValueChange</code>, or <code>onSearchChange</code> where the family supports them.</p>\n<p>Portal content is omitted from the server response and mounted during hydration into the resolved document or nested portal scope. Closed and default-open roots keep deterministic trigger IDs and ARIA relationships without a hydration mismatch.</p>\n<p>Keyboard behavior follows the shared Foundation: focus and Tab order, Escape dismissal, arrow-key movement, typeahead, submenu branches, and trigger restoration are applied according to the component role.</p>\n<h2 id="registry-dependencies" tabindex="-1"><a class="header-anchor" href="#registry-dependencies">Registry dependencies</a></h2>\n<table>\n<thead>\n<tr>\n<th>Item</th>\n<th>Purpose</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>navigation-menu</code></td>\n<td>Component source and module styles</td>\n</tr>\n<tr>\n<td><code>core</code></td>\n<td>Framework-agnostic logic helpers</td>\n</tr>\n<tr>\n<td><code>utils</code></td>\n<td>Shared utility helpers</td>\n</tr>\n<tr>\n<td><code>styles</code></td>\n<td>Shared SCSS tokens and globals</td>\n</tr>\n</tbody>\n</table>\n<h2 id="api-reference" tabindex="-1"><a class="header-anchor" href="#api-reference">API reference</a></h2>\n<h3 id="navigationmenu" tabindex="-1"><a class="header-anchor" href="#navigationmenu">NavigationMenu</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>viewport</code></td>\n<td><code>boolean</code></td>\n<td>true</td>\n</tr>\n<tr>\n<td><code>value</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>defaultValue</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>onValueChange</code></td>\n<td><code>(value: string | undefined) =&gt; void</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>ref</code></td>\n<td><code>CallbackRef&lt;HTMLElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="navigationmenuitem" tabindex="-1"><a class="header-anchor" href="#navigationmenuitem">NavigationMenuItem</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>value</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>disabled</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>ref</code></td>\n<td><code>CallbackRef&lt;HTMLLIElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="navigationmenulink" tabindex="-1"><a class="header-anchor" href="#navigationmenulink">NavigationMenuLink</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>active</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>ref</code></td>\n<td><code>CallbackRef&lt;HTMLAnchorElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="navigationmenulist" tabindex="-1"><a class="header-anchor" href="#navigationmenulist">NavigationMenuList</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>ref</code></td>\n<td><code>CallbackRef&lt;HTMLUListElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="navigationmenutrigger" tabindex="-1"><a class="header-anchor" href="#navigationmenutrigger">NavigationMenuTrigger</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>ref</code></td>\n<td><code>CallbackRef&lt;HTMLButtonElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="navigationmenucontent" tabindex="-1"><a class="header-anchor" href="#navigationmenucontent">NavigationMenuContent</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>ref</code></td>\n<td><code>CallbackRef&lt;HTMLDivElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="navigationmenuviewport" tabindex="-1"><a class="header-anchor" href="#navigationmenuviewport">NavigationMenuViewport</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>ref</code></td>\n<td><code>CallbackRef&lt;HTMLDivElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="navigationmenuindicator" tabindex="-1"><a class="header-anchor" href="#navigationmenuindicator">NavigationMenuIndicator</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>ref</code></td>\n<td><code>CallbackRef&lt;HTMLDivElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h2 id="related-docs" tabindex="-1"><a class="header-anchor" href="#related-docs">Related docs</a></h2>\n<ul>\n<li><a href="/docs/components/menubar">Menubar</a></li>\n<li><a href="/docs/components/breadcrumb">Breadcrumb</a></li>\n<li><a href="/docs/components/sidebar">Sidebar</a></li>\n</ul>\n',
		toc: [
			{
				depth: 2,
				title: 'Registry install',
				href: '#registry-install',
			},
			{
				depth: 2,
				title: 'Package usage',
				href: '#package-usage',
			},
			{
				depth: 2,
				title: 'Highlights',
				href: '#highlights',
			},
			{
				depth: 2,
				title: 'Foundation behavior',
				href: '#foundation-behavior',
			},
			{
				depth: 2,
				title: 'Registry dependencies',
				href: '#registry-dependencies',
			},
			{
				depth: 2,
				title: 'API reference',
				href: '#api-reference',
			},
			{
				depth: 3,
				title: 'NavigationMenu',
				href: '#navigationmenu',
			},
			{
				depth: 3,
				title: 'NavigationMenuItem',
				href: '#navigationmenuitem',
			},
			{
				depth: 3,
				title: 'NavigationMenuLink',
				href: '#navigationmenulink',
			},
			{
				depth: 3,
				title: 'NavigationMenuList',
				href: '#navigationmenulist',
			},
			{
				depth: 3,
				title: 'NavigationMenuTrigger',
				href: '#navigationmenutrigger',
			},
			{
				depth: 3,
				title: 'NavigationMenuContent',
				href: '#navigationmenucontent',
			},
			{
				depth: 3,
				title: 'NavigationMenuViewport',
				href: '#navigationmenuviewport',
			},
			{
				depth: 3,
				title: 'NavigationMenuIndicator',
				href: '#navigationmenuindicator',
			},
			{
				depth: 2,
				title: 'Related docs',
				href: '#related-docs',
			},
		],
	},
	{
		slug: 'components/pagination',
		url: '/docs/components/pagination',
		title: 'Pagination',
		description: 'Semantic SolidJS pagination primitives built from native links.',
		html: '<blockquote>\n<p>Use Pagination to expose page destinations as native links with current-page semantics.</p>\n</blockquote>\n<h2 id="registry-install" tabindex="-1"><a class="header-anchor" href="#registry-install">Registry install</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#953800;--shiki-dark:#B392F0">pnpm</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> dlx</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> shadcn@latest</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> add</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> @tile-ui/pagination</span></span>\n<span class="line"></span></code></pre><h2 id="package-usage" tabindex="-1"><a class="header-anchor" href="#package-usage">Package usage</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">import</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext } </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">from</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> \'@tile-ui/solid\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Pagination</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">PaginationContent</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">PaginationItem</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">PaginationPrevious</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> href</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"?page=1"</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> />&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">PaginationItem</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">PaginationItem</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">PaginationLink</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> href</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"?page=2"</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> isActive</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>2&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">PaginationLink</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">PaginationItem</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">PaginationItem</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">PaginationNext</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> href</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"?page=3"</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> />&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">PaginationItem</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">PaginationContent</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Pagination</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"></span></code></pre><h2 id="highlights" tabindex="-1"><a class="header-anchor" href="#highlights">Highlights</a></h2>\n<ul>\n<li>Native anchor navigation</li>\n<li>Current-page semantics</li>\n<li>Previous, next, and decorative ellipsis primitives</li>\n</ul>\n<h2 id="registry-dependencies" tabindex="-1"><a class="header-anchor" href="#registry-dependencies">Registry dependencies</a></h2>\n<table>\n<thead>\n<tr>\n<th>Item</th>\n<th>Purpose</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>pagination</code></td>\n<td>Component source and module styles</td>\n</tr>\n<tr>\n<td><code>core</code></td>\n<td>Framework-agnostic logic helpers</td>\n</tr>\n<tr>\n<td><code>styles</code></td>\n<td>Shared SCSS tokens and globals</td>\n</tr>\n</tbody>\n</table>\n<h2 id="api-reference" tabindex="-1"><a class="header-anchor" href="#api-reference">API reference</a></h2>\n<h3 id="pagination" tabindex="-1"><a class="header-anchor" href="#pagination">Pagination</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>ref</code></td>\n<td><code>CallbackRef&lt;HTMLElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="paginationcontent" tabindex="-1"><a class="header-anchor" href="#paginationcontent">PaginationContent</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>ref</code></td>\n<td><code>CallbackRef&lt;HTMLUListElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="paginationitem" tabindex="-1"><a class="header-anchor" href="#paginationitem">PaginationItem</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>ref</code></td>\n<td><code>CallbackRef&lt;HTMLLIElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="paginationlink" tabindex="-1"><a class="header-anchor" href="#paginationlink">PaginationLink</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>isActive</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>size</code></td>\n<td><code>\'default\' | \'sm\' | \'lg\' | \'icon\'</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>ref</code></td>\n<td><code>CallbackRef&lt;HTMLAnchorElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="paginationellipsis" tabindex="-1"><a class="header-anchor" href="#paginationellipsis">PaginationEllipsis</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>ref</code></td>\n<td><code>CallbackRef&lt;HTMLSpanElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="paginationprevious" tabindex="-1"><a class="header-anchor" href="#paginationprevious">PaginationPrevious</a></h3>\n<p>No custom props.</p>\n<h3 id="paginationnext" tabindex="-1"><a class="header-anchor" href="#paginationnext">PaginationNext</a></h3>\n<p>No custom props.</p>\n<h2 id="related-docs" tabindex="-1"><a class="header-anchor" href="#related-docs">Related docs</a></h2>\n<ul>\n<li><a href="/docs/components/table">Table</a></li>\n<li><a href="/docs/components/breadcrumb">Breadcrumb</a></li>\n<li><a href="/docs/components/select">Select</a></li>\n</ul>\n',
		toc: [
			{
				depth: 2,
				title: 'Registry install',
				href: '#registry-install',
			},
			{
				depth: 2,
				title: 'Package usage',
				href: '#package-usage',
			},
			{
				depth: 2,
				title: 'Highlights',
				href: '#highlights',
			},
			{
				depth: 2,
				title: 'Registry dependencies',
				href: '#registry-dependencies',
			},
			{
				depth: 2,
				title: 'API reference',
				href: '#api-reference',
			},
			{
				depth: 3,
				title: 'Pagination',
				href: '#pagination',
			},
			{
				depth: 3,
				title: 'PaginationContent',
				href: '#paginationcontent',
			},
			{
				depth: 3,
				title: 'PaginationItem',
				href: '#paginationitem',
			},
			{
				depth: 3,
				title: 'PaginationLink',
				href: '#paginationlink',
			},
			{
				depth: 3,
				title: 'PaginationEllipsis',
				href: '#paginationellipsis',
			},
			{
				depth: 3,
				title: 'PaginationPrevious',
				href: '#paginationprevious',
			},
			{
				depth: 3,
				title: 'PaginationNext',
				href: '#paginationnext',
			},
			{
				depth: 2,
				title: 'Related docs',
				href: '#related-docs',
			},
		],
	},
	{
		slug: 'components/popover',
		url: '/docs/components/popover',
		title: 'Popover',
		description: 'An anchored SolidJS popover with focus-aware dismissal and controlled state.',
		html: '<blockquote>\n<p>Use Popover for interactive anchored content that participates in natural Tab order and outside dismissal.</p>\n</blockquote>\n<h2 id="registry-install" tabindex="-1"><a class="header-anchor" href="#registry-install">Registry install</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#953800;--shiki-dark:#B392F0">pnpm</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> dlx</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> shadcn@latest</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> add</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> @tile-ui/popover</span></span>\n<span class="line"></span></code></pre><h2 id="package-usage" tabindex="-1"><a class="header-anchor" href="#package-usage">Package usage</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">import</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> { Popover } </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">from</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> \'@tile-ui/solid\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Popover</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> onOpenChange</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#953800;--shiki-dark:#FFAB70">open</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">) </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=></span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> console.</span><span style="--shiki-light:#8250DF;--shiki-dark:#B392F0">log</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">(open)</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">}</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">PopoverTrigger</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>Edit&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">PopoverTrigger</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">PopoverContent</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#85E89D">input</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> aria-label</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"Title"</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> />&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#85E89D">button</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> type</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"button"</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>Apply&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#85E89D">button</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">PopoverContent</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Popover</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"></span></code></pre><h2 id="highlights" tabindex="-1"><a class="header-anchor" href="#highlights">Highlights</a></h2>\n<ul>\n<li>Anchored positioning and outside dismissal</li>\n<li>Natural Tab order inside interactive content</li>\n<li>Controlled <code>open</code> and <code>onOpenChange</code> callbacks</li>\n</ul>\n<h2 id="foundation-behavior" tabindex="-1"><a class="header-anchor" href="#foundation-behavior">Foundation behavior</a></h2>\n<p>This Solid implementation uses native nested primitives and does not expose <code>asChild</code>. Controlled state uses Solid accessors and explicit callbacks such as <code>onOpenChange</code>, <code>onValueChange</code>, or <code>onSearchChange</code> where the family supports them.</p>\n<p>Portal content is omitted from the server response and mounted during hydration into the resolved document or nested portal scope. Closed and default-open roots keep deterministic trigger IDs and ARIA relationships without a hydration mismatch.</p>\n<p>Keyboard behavior follows the shared Foundation: focus and Tab order, Escape dismissal, arrow-key movement, typeahead, submenu branches, and trigger restoration are applied according to the component role.</p>\n<h2 id="registry-dependencies" tabindex="-1"><a class="header-anchor" href="#registry-dependencies">Registry dependencies</a></h2>\n<table>\n<thead>\n<tr>\n<th>Item</th>\n<th>Purpose</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>popover</code></td>\n<td>Component source and module styles</td>\n</tr>\n<tr>\n<td><code>core</code></td>\n<td>Framework-agnostic logic helpers</td>\n</tr>\n<tr>\n<td><code>utils</code></td>\n<td>Shared utility helpers</td>\n</tr>\n<tr>\n<td><code>styles</code></td>\n<td>Shared SCSS tokens and globals</td>\n</tr>\n</tbody>\n</table>\n<h2 id="api-reference" tabindex="-1"><a class="header-anchor" href="#api-reference">API reference</a></h2>\n<h3 id="popover" tabindex="-1"><a class="header-anchor" href="#popover">Popover</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>open</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>defaultOpen</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>onOpenChange</code></td>\n<td><code>(open: boolean) =&gt; void</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>triggerId</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>contentId</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>ref</code></td>\n<td><code>CallbackRef&lt;HTMLDivElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="popovertrigger" tabindex="-1"><a class="header-anchor" href="#popovertrigger">PopoverTrigger</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>ref</code></td>\n<td><code>CallbackRef&lt;HTMLButtonElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="popovercontent" tabindex="-1"><a class="header-anchor" href="#popovercontent">PopoverContent</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>side</code></td>\n<td><code>\'top\' | \'right\' | \'bottom\' | \'left\'</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>align</code></td>\n<td><code>\'start\' | \'center\' | \'end\'</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>sideOffset</code></td>\n<td><code>number</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>container</code></td>\n<td><code>Node</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>ref</code></td>\n<td><code>CallbackRef&lt;HTMLDivElement&gt;</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>onEscapeKeyDown</code></td>\n<td><code>(event: DismissableLayerEvent&lt;KeyboardEvent&gt;) =&gt; void</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>onPointerDownOutside</code></td>\n<td><code>(event: DismissableLayerEvent&lt;PointerEvent&gt;) =&gt; void</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>onFocusOutside</code></td>\n<td><code>(event: DismissableLayerEvent&lt;FocusEvent&gt;) =&gt; void</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>onInteractOutside</code></td>\n<td><code>(event: DismissableLayerEvent&lt;DismissableLayerOutsideEvent&gt;) =&gt; void</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h2 id="related-docs" tabindex="-1"><a class="header-anchor" href="#related-docs">Related docs</a></h2>\n<ul>\n<li><a href="/docs/components/tooltip">Tooltip</a></li>\n<li><a href="/docs/components/hover-card">HoverCard</a></li>\n<li><a href="/docs/components/dropdown-menu">DropdownMenu</a></li>\n</ul>\n',
		toc: [
			{
				depth: 2,
				title: 'Registry install',
				href: '#registry-install',
			},
			{
				depth: 2,
				title: 'Package usage',
				href: '#package-usage',
			},
			{
				depth: 2,
				title: 'Highlights',
				href: '#highlights',
			},
			{
				depth: 2,
				title: 'Foundation behavior',
				href: '#foundation-behavior',
			},
			{
				depth: 2,
				title: 'Registry dependencies',
				href: '#registry-dependencies',
			},
			{
				depth: 2,
				title: 'API reference',
				href: '#api-reference',
			},
			{
				depth: 3,
				title: 'Popover',
				href: '#popover',
			},
			{
				depth: 3,
				title: 'PopoverTrigger',
				href: '#popovertrigger',
			},
			{
				depth: 3,
				title: 'PopoverContent',
				href: '#popovercontent',
			},
			{
				depth: 2,
				title: 'Related docs',
				href: '#related-docs',
			},
		],
	},
	{
		slug: 'components/progress',
		url: '/docs/components/progress',
		title: 'Progress',
		description: 'An accessible reactive SolidJS progress bar.',
		html: '<blockquote>\n<p>Use Progress to expose task completion with accessible range semantics.</p>\n</blockquote>\n<h2 id="registry-install" tabindex="-1"><a class="header-anchor" href="#registry-install">Registry install</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#953800;--shiki-dark:#B392F0">pnpm</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> dlx</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> shadcn@latest</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> add</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> @tile-ui/progress</span></span>\n<span class="line"></span></code></pre><h2 id="package-usage" tabindex="-1"><a class="header-anchor" href="#package-usage">Package usage</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">import</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> { Progress } </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">from</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> \'@tile-ui/solid\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Progress</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> value</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#0550AE;--shiki-dark:#79B8FF">40</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">}</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> /></span></span>\n<span class="line"></span></code></pre><h2 id="highlights" tabindex="-1"><a class="header-anchor" href="#highlights">Highlights</a></h2>\n<ul>\n<li>Value, min, and max props</li>\n<li>Accessible progress role</li>\n<li>Composes in forms and cards</li>\n</ul>\n<h2 id="registry-dependencies" tabindex="-1"><a class="header-anchor" href="#registry-dependencies">Registry dependencies</a></h2>\n<table>\n<thead>\n<tr>\n<th>Item</th>\n<th>Purpose</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>progress</code></td>\n<td>Component source and module styles</td>\n</tr>\n<tr>\n<td><code>core</code></td>\n<td>Framework-agnostic logic helpers</td>\n</tr>\n<tr>\n<td><code>styles</code></td>\n<td>Shared SCSS tokens and globals</td>\n</tr>\n</tbody>\n</table>\n<h2 id="api-reference" tabindex="-1"><a class="header-anchor" href="#api-reference">API reference</a></h2>\n<h3 id="progress" tabindex="-1"><a class="header-anchor" href="#progress">Progress</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>value</code></td>\n<td><code>number</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>min</code></td>\n<td><code>number</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>max</code></td>\n<td><code>number</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h2 id="related-docs" tabindex="-1"><a class="header-anchor" href="#related-docs">Related docs</a></h2>\n<ul>\n<li><a href="/docs/components/spinner">Spinner</a></li>\n<li><a href="/docs/components/skeleton">Skeleton</a></li>\n<li><a href="/docs/components/form">Form</a></li>\n</ul>\n',
		toc: [
			{
				depth: 2,
				title: 'Registry install',
				href: '#registry-install',
			},
			{
				depth: 2,
				title: 'Package usage',
				href: '#package-usage',
			},
			{
				depth: 2,
				title: 'Highlights',
				href: '#highlights',
			},
			{
				depth: 2,
				title: 'Registry dependencies',
				href: '#registry-dependencies',
			},
			{
				depth: 2,
				title: 'API reference',
				href: '#api-reference',
			},
			{
				depth: 3,
				title: 'Progress',
				href: '#progress',
			},
			{
				depth: 2,
				title: 'Related docs',
				href: '#related-docs',
			},
		],
	},
	{
		slug: 'components/radio-group',
		url: '/docs/components/radio-group',
		title: 'RadioGroup',
		description: 'A SolidJS native radio group with roving focus, validation, and reset behavior.',
		html: '<blockquote>\n<p>Use RadioGroup for one-of-many choices with native validation and arrow-key selection.</p>\n</blockquote>\n<h2 id="registry-install" tabindex="-1"><a class="header-anchor" href="#registry-install">Registry install</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#953800;--shiki-dark:#B392F0">pnpm</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> dlx</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> shadcn@latest</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> add</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> @tile-ui/radio-group</span></span>\n<span class="line"></span></code></pre><h2 id="package-usage" tabindex="-1"><a class="header-anchor" href="#package-usage">Package usage</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">import</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> { RadioGroup, RadioGroupItem } </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">from</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> \'@tile-ui/solid\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">RadioGroup</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> defaultValue</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"a"</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">RadioGroupItem</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> value</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"a"</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> /></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">RadioGroupItem</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> value</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"b"</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> /></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">RadioGroup</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"></span></code></pre><h2 id="highlights" tabindex="-1"><a class="header-anchor" href="#highlights">Highlights</a></h2>\n<ul>\n<li>Controlled and uncontrolled</li>\n<li>Horizontal and vertical</li>\n<li>Item disabled</li>\n</ul>\n<h2 id="registry-dependencies" tabindex="-1"><a class="header-anchor" href="#registry-dependencies">Registry dependencies</a></h2>\n<table>\n<thead>\n<tr>\n<th>Item</th>\n<th>Purpose</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>radio-group</code></td>\n<td>Component source and module styles</td>\n</tr>\n<tr>\n<td><code>core</code></td>\n<td>Framework-agnostic logic helpers</td>\n</tr>\n<tr>\n<td><code>utils</code></td>\n<td>Shared utility helpers</td>\n</tr>\n<tr>\n<td><code>styles</code></td>\n<td>Shared SCSS tokens and globals</td>\n</tr>\n</tbody>\n</table>\n<h2 id="api-reference" tabindex="-1"><a class="header-anchor" href="#api-reference">API reference</a></h2>\n<h3 id="radiogroup" tabindex="-1"><a class="header-anchor" href="#radiogroup">RadioGroup</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>value</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>defaultValue</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>onValueChange</code></td>\n<td><code>(value: string) =&gt; void</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>orientation</code></td>\n<td><code>\'horizontal\' | \'vertical\'</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>name</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>disabled</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>required</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>form</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="radiogroupitem" tabindex="-1"><a class="header-anchor" href="#radiogroupitem">RadioGroupItem</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>value</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>disabled</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h2 id="related-docs" tabindex="-1"><a class="header-anchor" href="#related-docs">Related docs</a></h2>\n<ul>\n<li><a href="/docs/components/checkbox">Checkbox</a></li>\n<li><a href="/docs/components/select">Select</a></li>\n<li><a href="/docs/components/form">Form</a></li>\n</ul>\n',
		toc: [
			{
				depth: 2,
				title: 'Registry install',
				href: '#registry-install',
			},
			{
				depth: 2,
				title: 'Package usage',
				href: '#package-usage',
			},
			{
				depth: 2,
				title: 'Highlights',
				href: '#highlights',
			},
			{
				depth: 2,
				title: 'Registry dependencies',
				href: '#registry-dependencies',
			},
			{
				depth: 2,
				title: 'API reference',
				href: '#api-reference',
			},
			{
				depth: 3,
				title: 'RadioGroup',
				href: '#radiogroup',
			},
			{
				depth: 3,
				title: 'RadioGroupItem',
				href: '#radiogroupitem',
			},
			{
				depth: 2,
				title: 'Related docs',
				href: '#related-docs',
			},
		],
	},
	{
		slug: 'components/resizable',
		url: '/docs/components/resizable',
		title: 'Resizable',
		description: 'SolidJS resizable panel groups with pointer, keyboard, and persistent layouts.',
		html: '<blockquote>\n<p>Use ResizablePanelGroup for pointer and keyboard split layouts; add an <code>id</code> only when the hydrated client should persist panel sizes.</p>\n</blockquote>\n<h2 id="registry-install" tabindex="-1"><a class="header-anchor" href="#registry-install">Registry install</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#953800;--shiki-dark:#B392F0">pnpm</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> dlx</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> shadcn@latest</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> add</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> @tile-ui/resizable</span></span>\n<span class="line"></span></code></pre><h2 id="package-usage" tabindex="-1"><a class="header-anchor" href="#package-usage">Package usage</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">import</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> { ResizablePanelGroup, ResizablePanel, ResizableHandle } </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">from</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> \'@tile-ui/solid\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">ResizablePanelGroup</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> id</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"workspace-layout"</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> panelIds</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">[</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"navigation"</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">, </span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"canvas"</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">]</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">}</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">ResizablePanel</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> id</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"navigation"</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>Navigation&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">ResizablePanel</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">ResizableHandle</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> withHandle</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> />&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">ResizablePanel</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> id</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"canvas"</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>Canvas&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">ResizablePanel</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">ResizablePanelGroup</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"></span></code></pre><h2 id="highlights" tabindex="-1"><a class="header-anchor" href="#highlights">Highlights</a></h2>\n<ul>\n<li>Pointer and keyboard separators</li>\n<li>Equal deterministic server layout</li>\n<li>Optional localStorage persistence after hydration</li>\n</ul>\n<h2 id="registry-dependencies" tabindex="-1"><a class="header-anchor" href="#registry-dependencies">Registry dependencies</a></h2>\n<table>\n<thead>\n<tr>\n<th>Item</th>\n<th>Purpose</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>resizable</code></td>\n<td>Component source and module styles</td>\n</tr>\n<tr>\n<td><code>core</code></td>\n<td>Framework-agnostic logic helpers</td>\n</tr>\n<tr>\n<td><code>styles</code></td>\n<td>Shared SCSS tokens and globals</td>\n</tr>\n</tbody>\n</table>\n<h2 id="api-reference" tabindex="-1"><a class="header-anchor" href="#api-reference">API reference</a></h2>\n<h3 id="resizablepanelgroup" tabindex="-1"><a class="header-anchor" href="#resizablepanelgroup">ResizablePanelGroup</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>direction</code></td>\n<td><code>\'horizontal\' | \'vertical\'</code></td>\n<td>‘horizontal’</td>\n</tr>\n<tr>\n<td><code>id</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>panelIds</code></td>\n<td><code>readonly string[]</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="resizablepanel" tabindex="-1"><a class="header-anchor" href="#resizablepanel">ResizablePanel</a></h3>\n<p>No custom props.</p>\n<h3 id="resizablehandle" tabindex="-1"><a class="header-anchor" href="#resizablehandle">ResizableHandle</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>withHandle</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h2 id="related-docs" tabindex="-1"><a class="header-anchor" href="#related-docs">Related docs</a></h2>\n<ul>\n<li><a href="/docs/components/sidebar">Sidebar</a></li>\n<li><a href="/docs/components/sheet">Sheet</a></li>\n<li><a href="/docs/components/table">Table</a></li>\n</ul>\n',
		toc: [
			{
				depth: 2,
				title: 'Registry install',
				href: '#registry-install',
			},
			{
				depth: 2,
				title: 'Package usage',
				href: '#package-usage',
			},
			{
				depth: 2,
				title: 'Highlights',
				href: '#highlights',
			},
			{
				depth: 2,
				title: 'Registry dependencies',
				href: '#registry-dependencies',
			},
			{
				depth: 2,
				title: 'API reference',
				href: '#api-reference',
			},
			{
				depth: 3,
				title: 'ResizablePanelGroup',
				href: '#resizablepanelgroup',
			},
			{
				depth: 3,
				title: 'ResizablePanel',
				href: '#resizablepanel',
			},
			{
				depth: 3,
				title: 'ResizableHandle',
				href: '#resizablehandle',
			},
			{
				depth: 2,
				title: 'Related docs',
				href: '#related-docs',
			},
		],
	},
	{
		slug: 'components/scroll-area',
		url: '/docs/components/scroll-area',
		title: 'ScrollArea',
		description: 'A native SolidJS scroll viewport with optional custom scrollbars.',
		html: '<blockquote>\n<p>Use ScrollArea with one or more ScrollBar primitives when custom controls should augment native scrolling.</p>\n</blockquote>\n<h2 id="registry-install" tabindex="-1"><a class="header-anchor" href="#registry-install">Registry install</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#953800;--shiki-dark:#B392F0">pnpm</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> dlx</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> shadcn@latest</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> add</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> @tile-ui/scroll-area</span></span>\n<span class="line"></span></code></pre><h2 id="package-usage" tabindex="-1"><a class="header-anchor" href="#package-usage">Package usage</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">import</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> { ScrollArea, ScrollBar } </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">from</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> \'@tile-ui/solid\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">ScrollArea</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#85E89D">div</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> style</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">{ height: </span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"20rem"</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> }</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">}</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>Long content.&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#85E89D">div</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">ScrollBar</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> /></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">ScrollArea</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"></span></code></pre><h2 id="highlights" tabindex="-1"><a class="header-anchor" href="#highlights">Highlights</a></h2>\n<ul>\n<li>Native scroll viewport</li>\n<li>Vertical and horizontal <code>ScrollBar</code> primitives</li>\n<li>Keyboard and pointer scrollbar control</li>\n</ul>\n<h2 id="registry-dependencies" tabindex="-1"><a class="header-anchor" href="#registry-dependencies">Registry dependencies</a></h2>\n<table>\n<thead>\n<tr>\n<th>Item</th>\n<th>Purpose</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>scroll-area</code></td>\n<td>Component source and module styles</td>\n</tr>\n<tr>\n<td><code>core</code></td>\n<td>Framework-agnostic logic helpers</td>\n</tr>\n<tr>\n<td><code>utils</code></td>\n<td>Shared utility helpers</td>\n</tr>\n<tr>\n<td><code>styles</code></td>\n<td>Shared SCSS tokens and globals</td>\n</tr>\n</tbody>\n</table>\n<h2 id="api-reference" tabindex="-1"><a class="header-anchor" href="#api-reference">API reference</a></h2>\n<h3 id="scrollarea" tabindex="-1"><a class="header-anchor" href="#scrollarea">ScrollArea</a></h3>\n<p>No custom props.</p>\n<h3 id="scrollbar" tabindex="-1"><a class="header-anchor" href="#scrollbar">ScrollBar</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>orientation</code></td>\n<td><code>\'vertical\' | \'horizontal\'</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h2 id="related-docs" tabindex="-1"><a class="header-anchor" href="#related-docs">Related docs</a></h2>\n<ul>\n<li><a href="/docs/components/message-scroller">MessageScroller</a></li>\n<li><a href="/docs/components/dialog">Dialog</a></li>\n<li><a href="/docs/components/table">Table</a></li>\n</ul>\n',
		toc: [
			{
				depth: 2,
				title: 'Registry install',
				href: '#registry-install',
			},
			{
				depth: 2,
				title: 'Package usage',
				href: '#package-usage',
			},
			{
				depth: 2,
				title: 'Highlights',
				href: '#highlights',
			},
			{
				depth: 2,
				title: 'Registry dependencies',
				href: '#registry-dependencies',
			},
			{
				depth: 2,
				title: 'API reference',
				href: '#api-reference',
			},
			{
				depth: 3,
				title: 'ScrollArea',
				href: '#scrollarea',
			},
			{
				depth: 3,
				title: 'ScrollBar',
				href: '#scrollbar',
			},
			{
				depth: 2,
				title: 'Related docs',
				href: '#related-docs',
			},
		],
	},
	{
		slug: 'components/select',
		url: '/docs/components/select',
		title: 'Select',
		description: 'An accessible SolidJS custom select with grouped options and logical Tab behavior.',
		html: '<blockquote>\n<p>Use Select for a styled single-value picker with escaped labels, grouped items, typeahead, and logical Tab exit.</p>\n</blockquote>\n<h2 id="registry-install" tabindex="-1"><a class="header-anchor" href="#registry-install">Registry install</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#953800;--shiki-dark:#B392F0">pnpm</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> dlx</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> shadcn@latest</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> add</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> @tile-ui/select</span></span>\n<span class="line"></span></code></pre><h2 id="package-usage" tabindex="-1"><a class="header-anchor" href="#package-usage">Package usage</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">import</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> { Select } </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">from</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> \'@tile-ui/solid\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Select</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> defaultValue</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"solid"</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> selectedText</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"Solid &#x3C;SSR>"</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">SelectTrigger</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">SelectValue</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> placeholder</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"Choose"</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> />&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">SelectTrigger</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">SelectContent</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">SelectItem</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> value</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"solid"</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>Solid </span><span style="--shiki-light:#CF222E;--shiki-dark:#79B8FF">&#x26;lt;</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">SSR</span><span style="--shiki-light:#CF222E;--shiki-dark:#79B8FF">&#x26;gt;</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">SelectItem</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">SelectContent</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Select</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"></span></code></pre><h2 id="highlights" tabindex="-1"><a class="header-anchor" href="#highlights">Highlights</a></h2>\n<ul>\n<li>Grouped options and escaped selected labels</li>\n<li>Arrow navigation, typeahead, selection, and logical Tab exit</li>\n<li>Controlled <code>value</code> and <code>onValueChange</code> callbacks</li>\n</ul>\n<h2 id="foundation-behavior" tabindex="-1"><a class="header-anchor" href="#foundation-behavior">Foundation behavior</a></h2>\n<p>This Solid implementation uses native nested primitives and does not expose <code>asChild</code>. Controlled state uses Solid accessors and explicit callbacks such as <code>onOpenChange</code>, <code>onValueChange</code>, or <code>onSearchChange</code> where the family supports them.</p>\n<p>Portal content is omitted from the server response and mounted during hydration into the resolved document or nested portal scope. Closed and default-open roots keep deterministic trigger IDs and ARIA relationships without a hydration mismatch.</p>\n<p>Keyboard behavior follows the shared Foundation: focus and Tab order, Escape dismissal, arrow-key movement, typeahead, submenu branches, and trigger restoration are applied according to the component role.</p>\n<h2 id="registry-dependencies" tabindex="-1"><a class="header-anchor" href="#registry-dependencies">Registry dependencies</a></h2>\n<table>\n<thead>\n<tr>\n<th>Item</th>\n<th>Purpose</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>select</code></td>\n<td>Component source and module styles</td>\n</tr>\n<tr>\n<td><code>core</code></td>\n<td>Framework-agnostic logic helpers</td>\n</tr>\n<tr>\n<td><code>utils</code></td>\n<td>Shared utility helpers</td>\n</tr>\n<tr>\n<td><code>styles</code></td>\n<td>Shared SCSS tokens and globals</td>\n</tr>\n</tbody>\n</table>\n<h2 id="api-reference" tabindex="-1"><a class="header-anchor" href="#api-reference">API reference</a></h2>\n<h3 id="select" tabindex="-1"><a class="header-anchor" href="#select">Select</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>open</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>defaultOpen</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>onOpenChange</code></td>\n<td><code>(open: boolean) =&gt; void</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>value</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>defaultValue</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>onValueChange</code></td>\n<td><code>(value: string) =&gt; void</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>triggerId</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>contentId</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>selectedText</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>ref</code></td>\n<td><code>CallbackRef&lt;HTMLDivElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="selecttrigger" tabindex="-1"><a class="header-anchor" href="#selecttrigger">SelectTrigger</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>size</code></td>\n<td><code>\'sm\' | \'default\'</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>ref</code></td>\n<td><code>CallbackRef&lt;HTMLButtonElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="selectcontent" tabindex="-1"><a class="header-anchor" href="#selectcontent">SelectContent</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>position</code></td>\n<td><code>\'item-aligned\' | \'popper\'</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>align</code></td>\n<td><code>\'start\' | \'center\' | \'end\'</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>sideOffset</code></td>\n<td><code>number</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>container</code></td>\n<td><code>Node</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>ref</code></td>\n<td><code>CallbackRef&lt;HTMLDivElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="selectitem" tabindex="-1"><a class="header-anchor" href="#selectitem">SelectItem</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>value</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>disabled</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>textValue</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>ref</code></td>\n<td><code>CallbackRef&lt;HTMLDivElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="selectvalue" tabindex="-1"><a class="header-anchor" href="#selectvalue">SelectValue</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>placeholder</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>ref</code></td>\n<td><code>CallbackRef&lt;HTMLSpanElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="selectgroup" tabindex="-1"><a class="header-anchor" href="#selectgroup">SelectGroup</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>labelId</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>ref</code></td>\n<td><code>CallbackRef&lt;HTMLDivElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="selectlabel" tabindex="-1"><a class="header-anchor" href="#selectlabel">SelectLabel</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>ref</code></td>\n<td><code>CallbackRef&lt;HTMLDivElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="selectseparator" tabindex="-1"><a class="header-anchor" href="#selectseparator">SelectSeparator</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>ref</code></td>\n<td><code>CallbackRef&lt;HTMLDivElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="selectscrollbutton" tabindex="-1"><a class="header-anchor" href="#selectscrollbutton">SelectScrollButton</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>ref</code></td>\n<td><code>CallbackRef&lt;HTMLDivElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h2 id="related-docs" tabindex="-1"><a class="header-anchor" href="#related-docs">Related docs</a></h2>\n<ul>\n<li><a href="/docs/components/combobox">Combobox</a></li>\n<li><a href="/docs/components/native-select">NativeSelect</a></li>\n<li><a href="/docs/components/dropdown-menu">DropdownMenu</a></li>\n</ul>\n',
		toc: [
			{
				depth: 2,
				title: 'Registry install',
				href: '#registry-install',
			},
			{
				depth: 2,
				title: 'Package usage',
				href: '#package-usage',
			},
			{
				depth: 2,
				title: 'Highlights',
				href: '#highlights',
			},
			{
				depth: 2,
				title: 'Foundation behavior',
				href: '#foundation-behavior',
			},
			{
				depth: 2,
				title: 'Registry dependencies',
				href: '#registry-dependencies',
			},
			{
				depth: 2,
				title: 'API reference',
				href: '#api-reference',
			},
			{
				depth: 3,
				title: 'Select',
				href: '#select',
			},
			{
				depth: 3,
				title: 'SelectTrigger',
				href: '#selecttrigger',
			},
			{
				depth: 3,
				title: 'SelectContent',
				href: '#selectcontent',
			},
			{
				depth: 3,
				title: 'SelectItem',
				href: '#selectitem',
			},
			{
				depth: 3,
				title: 'SelectValue',
				href: '#selectvalue',
			},
			{
				depth: 3,
				title: 'SelectGroup',
				href: '#selectgroup',
			},
			{
				depth: 3,
				title: 'SelectLabel',
				href: '#selectlabel',
			},
			{
				depth: 3,
				title: 'SelectSeparator',
				href: '#selectseparator',
			},
			{
				depth: 3,
				title: 'SelectScrollButton',
				href: '#selectscrollbutton',
			},
			{
				depth: 2,
				title: 'Related docs',
				href: '#related-docs',
			},
		],
	},
	{
		slug: 'components/separator',
		url: '/docs/components/separator',
		title: 'Separator',
		description: 'A horizontal or vertical divider for SolidJS layouts.',
		html: '<blockquote>\n<p>Use Separator to divide SolidJS sections without extra structural markup.</p>\n</blockquote>\n<h2 id="registry-install" tabindex="-1"><a class="header-anchor" href="#registry-install">Registry install</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#953800;--shiki-dark:#B392F0">pnpm</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> dlx</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> shadcn@latest</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> add</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> @tile-ui/separator</span></span>\n<span class="line"></span></code></pre><h2 id="package-usage" tabindex="-1"><a class="header-anchor" href="#package-usage">Package usage</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">import</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> { Separator } </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">from</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> \'@tile-ui/solid\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Separator</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> /></span></span>\n<span class="line"></span></code></pre><h2 id="highlights" tabindex="-1"><a class="header-anchor" href="#highlights">Highlights</a></h2>\n<ul>\n<li>Horizontal and vertical orientation</li>\n<li>Decorative mode for accessibility</li>\n</ul>\n<h2 id="registry-dependencies" tabindex="-1"><a class="header-anchor" href="#registry-dependencies">Registry dependencies</a></h2>\n<table>\n<thead>\n<tr>\n<th>Item</th>\n<th>Purpose</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>separator</code></td>\n<td>Component source and module styles</td>\n</tr>\n<tr>\n<td><code>core</code></td>\n<td>Framework-agnostic logic helpers</td>\n</tr>\n<tr>\n<td><code>styles</code></td>\n<td>Shared SCSS tokens and globals</td>\n</tr>\n</tbody>\n</table>\n<h2 id="api-reference" tabindex="-1"><a class="header-anchor" href="#api-reference">API reference</a></h2>\n<h3 id="separator" tabindex="-1"><a class="header-anchor" href="#separator">Separator</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>orientation</code></td>\n<td><code>\'horizontal\' | \'vertical\'</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>decorative</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h2 id="related-docs" tabindex="-1"><a class="header-anchor" href="#related-docs">Related docs</a></h2>\n<ul>\n<li><a href="/docs/components/dropdown-menu">DropdownMenu</a></li>\n<li><a href="/docs/components/menubar">Menubar</a></li>\n<li><a href="/docs/components/sidebar">Sidebar</a></li>\n</ul>\n',
		toc: [
			{
				depth: 2,
				title: 'Registry install',
				href: '#registry-install',
			},
			{
				depth: 2,
				title: 'Package usage',
				href: '#package-usage',
			},
			{
				depth: 2,
				title: 'Highlights',
				href: '#highlights',
			},
			{
				depth: 2,
				title: 'Registry dependencies',
				href: '#registry-dependencies',
			},
			{
				depth: 2,
				title: 'API reference',
				href: '#api-reference',
			},
			{
				depth: 3,
				title: 'Separator',
				href: '#separator',
			},
			{
				depth: 2,
				title: 'Related docs',
				href: '#related-docs',
			},
		],
	},
	{
		slug: 'components/sheet',
		url: '/docs/components/sheet',
		title: 'Sheet',
		description: 'A SolidJS modal sheet that mounts from any viewport edge.',
		html: '<blockquote>\n<p>Use Sheet for modal edge panels with focus containment, outside blocking, and trigger restoration.</p>\n</blockquote>\n<h2 id="registry-install" tabindex="-1"><a class="header-anchor" href="#registry-install">Registry install</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#953800;--shiki-dark:#B392F0">pnpm</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> dlx</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> shadcn@latest</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> add</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> @tile-ui/sheet</span></span>\n<span class="line"></span></code></pre><h2 id="package-usage" tabindex="-1"><a class="header-anchor" href="#package-usage">Package usage</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">import</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> { Sheet } </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">from</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> \'@tile-ui/solid\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Sheet</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> onOpenChange</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#953800;--shiki-dark:#FFAB70">open</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">) </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=></span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> console.</span><span style="--shiki-light:#8250DF;--shiki-dark:#B392F0">log</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">(open)</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">}</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">SheetTrigger</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>Open&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">SheetTrigger</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">SheetContent</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> side</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"right"</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">SheetTitle</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>Settings&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">SheetTitle</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">SheetDescription</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>Workspace settings.&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">SheetDescription</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">SheetContent</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Sheet</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"></span></code></pre><h2 id="highlights" tabindex="-1"><a class="header-anchor" href="#highlights">Highlights</a></h2>\n<ul>\n<li>Four edge positions with modal focus containment</li>\n<li>Outside interaction blocking and trigger restoration</li>\n<li>Controlled <code>open</code> and <code>onOpenChange</code> callbacks</li>\n</ul>\n<h2 id="foundation-behavior" tabindex="-1"><a class="header-anchor" href="#foundation-behavior">Foundation behavior</a></h2>\n<p>This Solid implementation uses native nested primitives and does not expose <code>asChild</code>. Controlled state uses Solid accessors and explicit callbacks such as <code>onOpenChange</code>, <code>onValueChange</code>, or <code>onSearchChange</code> where the family supports them.</p>\n<p>Portal content is omitted from the server response and mounted during hydration into the resolved document or nested portal scope. Closed and default-open roots keep deterministic trigger IDs and ARIA relationships without a hydration mismatch.</p>\n<p>Keyboard behavior follows the shared Foundation: focus and Tab order, Escape dismissal, arrow-key movement, typeahead, submenu branches, and trigger restoration are applied according to the component role.</p>\n<h2 id="registry-dependencies" tabindex="-1"><a class="header-anchor" href="#registry-dependencies">Registry dependencies</a></h2>\n<table>\n<thead>\n<tr>\n<th>Item</th>\n<th>Purpose</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>sheet</code></td>\n<td>Component source and module styles</td>\n</tr>\n<tr>\n<td><code>core</code></td>\n<td>Framework-agnostic logic helpers</td>\n</tr>\n<tr>\n<td><code>utils</code></td>\n<td>Shared utility helpers</td>\n</tr>\n<tr>\n<td><code>styles</code></td>\n<td>Shared SCSS tokens and globals</td>\n</tr>\n</tbody>\n</table>\n<h2 id="api-reference" tabindex="-1"><a class="header-anchor" href="#api-reference">API reference</a></h2>\n<h3 id="sheet" tabindex="-1"><a class="header-anchor" href="#sheet">Sheet</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>open</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>defaultOpen</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>onOpenChange</code></td>\n<td><code>(open: boolean) =&gt; void</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>children</code></td>\n<td><code>JSX.Element</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="sheettrigger" tabindex="-1"><a class="header-anchor" href="#sheettrigger">SheetTrigger</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>ref</code></td>\n<td><code>CallbackRef&lt;HTMLButtonElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="sheetclose" tabindex="-1"><a class="header-anchor" href="#sheetclose">SheetClose</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>ref</code></td>\n<td><code>CallbackRef&lt;HTMLButtonElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="sheetoverlay" tabindex="-1"><a class="header-anchor" href="#sheetoverlay">SheetOverlay</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>ref</code></td>\n<td><code>CallbackRef&lt;HTMLDivElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="sheetcontent" tabindex="-1"><a class="header-anchor" href="#sheetcontent">SheetContent</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>ref</code></td>\n<td><code>CallbackRef&lt;HTMLDivElement&gt;</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>side</code></td>\n<td><code>SheetSide</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>showCloseButton</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>container</code></td>\n<td><code>Node</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>overlayClass</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>onEscapeKeyDown</code></td>\n<td><code>(event: DismissableLayerEvent&lt;KeyboardEvent&gt;) =&gt; void</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>onPointerDownOutside</code></td>\n<td><code>(event: DismissableLayerEvent&lt;PointerEvent&gt;) =&gt; void</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>onFocusOutside</code></td>\n<td><code>(event: DismissableLayerEvent&lt;FocusEvent&gt;) =&gt; void</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>onInteractOutside</code></td>\n<td><code>(event: DismissableLayerEvent&lt;DismissableLayerOutsideEvent&gt;) =&gt; void</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="sheetheader" tabindex="-1"><a class="header-anchor" href="#sheetheader">SheetHeader</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>ref</code></td>\n<td><code>CallbackRef&lt;HTMLDivElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="sheetfooter" tabindex="-1"><a class="header-anchor" href="#sheetfooter">SheetFooter</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>ref</code></td>\n<td><code>CallbackRef&lt;HTMLDivElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="sheettitle" tabindex="-1"><a class="header-anchor" href="#sheettitle">SheetTitle</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>ref</code></td>\n<td><code>CallbackRef&lt;HTMLHeadingElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="sheetdescription" tabindex="-1"><a class="header-anchor" href="#sheetdescription">SheetDescription</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>ref</code></td>\n<td><code>CallbackRef&lt;HTMLParagraphElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h2 id="related-docs" tabindex="-1"><a class="header-anchor" href="#related-docs">Related docs</a></h2>\n<ul>\n<li><a href="/docs/components/dialog">Dialog</a></li>\n<li><a href="/docs/components/drawer">Drawer</a></li>\n<li><a href="/docs/components/sidebar">Sidebar</a></li>\n</ul>\n',
		toc: [
			{
				depth: 2,
				title: 'Registry install',
				href: '#registry-install',
			},
			{
				depth: 2,
				title: 'Package usage',
				href: '#package-usage',
			},
			{
				depth: 2,
				title: 'Highlights',
				href: '#highlights',
			},
			{
				depth: 2,
				title: 'Foundation behavior',
				href: '#foundation-behavior',
			},
			{
				depth: 2,
				title: 'Registry dependencies',
				href: '#registry-dependencies',
			},
			{
				depth: 2,
				title: 'API reference',
				href: '#api-reference',
			},
			{
				depth: 3,
				title: 'Sheet',
				href: '#sheet',
			},
			{
				depth: 3,
				title: 'SheetTrigger',
				href: '#sheettrigger',
			},
			{
				depth: 3,
				title: 'SheetClose',
				href: '#sheetclose',
			},
			{
				depth: 3,
				title: 'SheetOverlay',
				href: '#sheetoverlay',
			},
			{
				depth: 3,
				title: 'SheetContent',
				href: '#sheetcontent',
			},
			{
				depth: 3,
				title: 'SheetHeader',
				href: '#sheetheader',
			},
			{
				depth: 3,
				title: 'SheetFooter',
				href: '#sheetfooter',
			},
			{
				depth: 3,
				title: 'SheetTitle',
				href: '#sheettitle',
			},
			{
				depth: 3,
				title: 'SheetDescription',
				href: '#sheetdescription',
			},
			{
				depth: 2,
				title: 'Related docs',
				href: '#related-docs',
			},
		],
	},
	{
		slug: 'components/sidebar',
		url: '/docs/components/sidebar',
		title: 'Sidebar',
		description: 'A responsive SolidJS application sidebar with desktop rail and mobile sheet behavior.',
		html: '<blockquote>\n<p>Use SidebarProvider around the full layout. Server output starts in the desktop mode, then the client media query selects the mobile sheet when required.</p>\n</blockquote>\n<h2 id="registry-install" tabindex="-1"><a class="header-anchor" href="#registry-install">Registry install</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#953800;--shiki-dark:#B392F0">pnpm</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> dlx</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> shadcn@latest</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> add</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> @tile-ui/sidebar</span></span>\n<span class="line"></span></code></pre><h2 id="package-usage" tabindex="-1"><a class="header-anchor" href="#package-usage">Package usage</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">import</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> { SidebarProvider, Sidebar, SidebarHeader, SidebarInput, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset, SidebarTrigger } </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">from</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> \'@tile-ui/solid\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">SidebarProvider</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Sidebar</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> collapsible</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"icon"</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">SidebarHeader</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">SidebarInput</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> aria-label</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"Search"</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> />&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">SidebarHeader</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">SidebarContent</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">SidebarGroup</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">SidebarGroupLabel</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>Workspace&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">SidebarGroupLabel</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">SidebarGroupContent</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">SidebarMenu</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">SidebarMenuItem</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">SidebarMenuButton</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> tooltip</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"Overview"</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>Overview&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">SidebarMenuButton</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">SidebarMenuItem</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">SidebarMenu</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">SidebarGroupContent</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">SidebarGroup</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">SidebarContent</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Sidebar</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">SidebarInset</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">SidebarTrigger</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> />&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">SidebarInset</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">SidebarProvider</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"></span></code></pre><h2 id="highlights" tabindex="-1"><a class="header-anchor" href="#highlights">Highlights</a></h2>\n<ul>\n<li>Collapsible desktop rail</li>\n<li>Mobile sheet selected from the client media query</li>\n<li>Provider state, trigger, menu, skeleton, and tooltip families</li>\n</ul>\n<h2 id="registry-dependencies" tabindex="-1"><a class="header-anchor" href="#registry-dependencies">Registry dependencies</a></h2>\n<table>\n<thead>\n<tr>\n<th>Item</th>\n<th>Purpose</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>sidebar</code></td>\n<td>Component source and module styles</td>\n</tr>\n<tr>\n<td><code>core</code></td>\n<td>Framework-agnostic logic helpers</td>\n</tr>\n<tr>\n<td><code>button</code></td>\n<td>Registry component dependency</td>\n</tr>\n<tr>\n<td><code>input</code></td>\n<td>Registry component dependency</td>\n</tr>\n<tr>\n<td><code>separator</code></td>\n<td>Registry component dependency</td>\n</tr>\n<tr>\n<td><code>sheet</code></td>\n<td>Registry component dependency</td>\n</tr>\n<tr>\n<td><code>skeleton</code></td>\n<td>Registry component dependency</td>\n</tr>\n<tr>\n<td><code>tooltip</code></td>\n<td>Registry component dependency</td>\n</tr>\n<tr>\n<td><code>utils</code></td>\n<td>Shared utility helpers</td>\n</tr>\n<tr>\n<td><code>styles</code></td>\n<td>Shared SCSS tokens and globals</td>\n</tr>\n</tbody>\n</table>\n<h2 id="api-reference" tabindex="-1"><a class="header-anchor" href="#api-reference">API reference</a></h2>\n<h3 id="sidebar" tabindex="-1"><a class="header-anchor" href="#sidebar">Sidebar</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>side</code></td>\n<td><code>\'left\' | \'right\'</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>variant</code></td>\n<td><code>\'sidebar\' | \'floating\' | \'inset\'</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>collapsible</code></td>\n<td><code>\'offcanvas\' | \'icon\' | \'none\'</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>ref</code></td>\n<td><code>CallbackRef&lt;HTMLDivElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="sidebarprovider" tabindex="-1"><a class="header-anchor" href="#sidebarprovider">SidebarProvider</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>defaultOpen</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>open</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>onOpenChange</code></td>\n<td><code>(open: boolean) =&gt; void</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>ref</code></td>\n<td><code>CallbackRef&lt;HTMLDivElement&gt;</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>sidebarId</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="sidebartrigger" tabindex="-1"><a class="header-anchor" href="#sidebartrigger">SidebarTrigger</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>ref</code></td>\n<td><code>CallbackRef&lt;HTMLButtonElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="sidebarrail" tabindex="-1"><a class="header-anchor" href="#sidebarrail">SidebarRail</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>ref</code></td>\n<td><code>CallbackRef&lt;HTMLButtonElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="sidebarinset" tabindex="-1"><a class="header-anchor" href="#sidebarinset">SidebarInset</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>ref</code></td>\n<td><code>CallbackRef&lt;HTMLElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="sidebarinput" tabindex="-1"><a class="header-anchor" href="#sidebarinput">SidebarInput</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>ref</code></td>\n<td><code>CallbackRef&lt;HTMLInputElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="sidebarheader" tabindex="-1"><a class="header-anchor" href="#sidebarheader">SidebarHeader</a></h3>\n<p>No custom props.</p>\n<h3 id="sidebarfooter" tabindex="-1"><a class="header-anchor" href="#sidebarfooter">SidebarFooter</a></h3>\n<p>No custom props.</p>\n<h3 id="sidebarseparator" tabindex="-1"><a class="header-anchor" href="#sidebarseparator">SidebarSeparator</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>ref</code></td>\n<td><code>CallbackRef&lt;HTMLDivElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="sidebarcontent" tabindex="-1"><a class="header-anchor" href="#sidebarcontent">SidebarContent</a></h3>\n<p>No custom props.</p>\n<h3 id="sidebargroup" tabindex="-1"><a class="header-anchor" href="#sidebargroup">SidebarGroup</a></h3>\n<p>No custom props.</p>\n<h3 id="sidebargrouplabel" tabindex="-1"><a class="header-anchor" href="#sidebargrouplabel">SidebarGroupLabel</a></h3>\n<p>No custom props.</p>\n<h3 id="sidebargroupcontent" tabindex="-1"><a class="header-anchor" href="#sidebargroupcontent">SidebarGroupContent</a></h3>\n<p>No custom props.</p>\n<h3 id="sidebargroupaction" tabindex="-1"><a class="header-anchor" href="#sidebargroupaction">SidebarGroupAction</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>ref</code></td>\n<td><code>CallbackRef&lt;HTMLButtonElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="sidebarmenu" tabindex="-1"><a class="header-anchor" href="#sidebarmenu">SidebarMenu</a></h3>\n<p>No custom props.</p>\n<h3 id="sidebarmenuitem" tabindex="-1"><a class="header-anchor" href="#sidebarmenuitem">SidebarMenuItem</a></h3>\n<p>No custom props.</p>\n<h3 id="sidebarmenubutton" tabindex="-1"><a class="header-anchor" href="#sidebarmenubutton">SidebarMenuButton</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>ref</code></td>\n<td><code>CallbackRef&lt;HTMLButtonElement&gt;</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>isActive</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>tooltip</code></td>\n<td><code>SidebarMenuButtonTooltip</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>variant</code></td>\n<td><code>SidebarMenuButtonVariant</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>size</code></td>\n<td><code>SidebarMenuButtonSize</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="sidebarmenuaction" tabindex="-1"><a class="header-anchor" href="#sidebarmenuaction">SidebarMenuAction</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>ref</code></td>\n<td><code>CallbackRef&lt;HTMLButtonElement&gt;</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>showOnHover</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="sidebarmenubadge" tabindex="-1"><a class="header-anchor" href="#sidebarmenubadge">SidebarMenuBadge</a></h3>\n<p>No custom props.</p>\n<h3 id="sidebarmenuskeleton" tabindex="-1"><a class="header-anchor" href="#sidebarmenuskeleton">SidebarMenuSkeleton</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>showIcon</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>width</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="sidebarmenusub" tabindex="-1"><a class="header-anchor" href="#sidebarmenusub">SidebarMenuSub</a></h3>\n<p>No custom props.</p>\n<h3 id="sidebarmenusubitem" tabindex="-1"><a class="header-anchor" href="#sidebarmenusubitem">SidebarMenuSubItem</a></h3>\n<p>No custom props.</p>\n<h3 id="sidebarmenusubbutton" tabindex="-1"><a class="header-anchor" href="#sidebarmenusubbutton">SidebarMenuSubButton</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>ref</code></td>\n<td><code>CallbackRef&lt;HTMLAnchorElement&gt;</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>size</code></td>\n<td><code>\'sm\' | \'md\'</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>isActive</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="usesidebar" tabindex="-1"><a class="header-anchor" href="#usesidebar">useSidebar</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>return</code></td>\n<td><code>SidebarContextValue</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h2 id="related-docs" tabindex="-1"><a class="header-anchor" href="#related-docs">Related docs</a></h2>\n<ul>\n<li><a href="/docs/components/navigation-menu">NavigationMenu</a></li>\n<li><a href="/docs/components/sheet">Sheet</a></li>\n<li><a href="/docs/components/breadcrumb">Breadcrumb</a></li>\n</ul>\n',
		toc: [
			{
				depth: 2,
				title: 'Registry install',
				href: '#registry-install',
			},
			{
				depth: 2,
				title: 'Package usage',
				href: '#package-usage',
			},
			{
				depth: 2,
				title: 'Highlights',
				href: '#highlights',
			},
			{
				depth: 2,
				title: 'Registry dependencies',
				href: '#registry-dependencies',
			},
			{
				depth: 2,
				title: 'API reference',
				href: '#api-reference',
			},
			{
				depth: 3,
				title: 'Sidebar',
				href: '#sidebar',
			},
			{
				depth: 3,
				title: 'SidebarProvider',
				href: '#sidebarprovider',
			},
			{
				depth: 3,
				title: 'SidebarTrigger',
				href: '#sidebartrigger',
			},
			{
				depth: 3,
				title: 'SidebarRail',
				href: '#sidebarrail',
			},
			{
				depth: 3,
				title: 'SidebarInset',
				href: '#sidebarinset',
			},
			{
				depth: 3,
				title: 'SidebarInput',
				href: '#sidebarinput',
			},
			{
				depth: 3,
				title: 'SidebarHeader',
				href: '#sidebarheader',
			},
			{
				depth: 3,
				title: 'SidebarFooter',
				href: '#sidebarfooter',
			},
			{
				depth: 3,
				title: 'SidebarSeparator',
				href: '#sidebarseparator',
			},
			{
				depth: 3,
				title: 'SidebarContent',
				href: '#sidebarcontent',
			},
			{
				depth: 3,
				title: 'SidebarGroup',
				href: '#sidebargroup',
			},
			{
				depth: 3,
				title: 'SidebarGroupLabel',
				href: '#sidebargrouplabel',
			},
			{
				depth: 3,
				title: 'SidebarGroupContent',
				href: '#sidebargroupcontent',
			},
			{
				depth: 3,
				title: 'SidebarGroupAction',
				href: '#sidebargroupaction',
			},
			{
				depth: 3,
				title: 'SidebarMenu',
				href: '#sidebarmenu',
			},
			{
				depth: 3,
				title: 'SidebarMenuItem',
				href: '#sidebarmenuitem',
			},
			{
				depth: 3,
				title: 'SidebarMenuButton',
				href: '#sidebarmenubutton',
			},
			{
				depth: 3,
				title: 'SidebarMenuAction',
				href: '#sidebarmenuaction',
			},
			{
				depth: 3,
				title: 'SidebarMenuBadge',
				href: '#sidebarmenubadge',
			},
			{
				depth: 3,
				title: 'SidebarMenuSkeleton',
				href: '#sidebarmenuskeleton',
			},
			{
				depth: 3,
				title: 'SidebarMenuSub',
				href: '#sidebarmenusub',
			},
			{
				depth: 3,
				title: 'SidebarMenuSubItem',
				href: '#sidebarmenusubitem',
			},
			{
				depth: 3,
				title: 'SidebarMenuSubButton',
				href: '#sidebarmenusubbutton',
			},
			{
				depth: 3,
				title: 'useSidebar',
				href: '#usesidebar',
			},
			{
				depth: 2,
				title: 'Related docs',
				href: '#related-docs',
			},
		],
	},
	{
		slug: 'components/skeleton',
		url: '/docs/components/skeleton',
		title: 'Skeleton',
		description: 'A SolidJS loading placeholder hidden from assistive technology by default.',
		html: '<blockquote>\n<p>Use Skeleton to reserve layout while content loads.</p>\n</blockquote>\n<h2 id="registry-install" tabindex="-1"><a class="header-anchor" href="#registry-install">Registry install</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#953800;--shiki-dark:#B392F0">pnpm</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> dlx</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> shadcn@latest</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> add</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> @tile-ui/skeleton</span></span>\n<span class="line"></span></code></pre><h2 id="package-usage" tabindex="-1"><a class="header-anchor" href="#package-usage">Package usage</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">import</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> { Skeleton } </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">from</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> \'@tile-ui/solid\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Skeleton</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> /></span></span>\n<span class="line"></span></code></pre><h2 id="highlights" tabindex="-1"><a class="header-anchor" href="#highlights">Highlights</a></h2>\n<ul>\n<li>Pulse animation</li>\n<li>Sizes to its container</li>\n<li>Composes inside Card and Table</li>\n</ul>\n<h2 id="registry-dependencies" tabindex="-1"><a class="header-anchor" href="#registry-dependencies">Registry dependencies</a></h2>\n<table>\n<thead>\n<tr>\n<th>Item</th>\n<th>Purpose</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>skeleton</code></td>\n<td>Component source and module styles</td>\n</tr>\n<tr>\n<td><code>core</code></td>\n<td>Framework-agnostic logic helpers</td>\n</tr>\n<tr>\n<td><code>styles</code></td>\n<td>Shared SCSS tokens and globals</td>\n</tr>\n</tbody>\n</table>\n<h2 id="api-reference" tabindex="-1"><a class="header-anchor" href="#api-reference">API reference</a></h2>\n<h3 id="skeleton" tabindex="-1"><a class="header-anchor" href="#skeleton">Skeleton</a></h3>\n<p>No custom props.</p>\n<h2 id="related-docs" tabindex="-1"><a class="header-anchor" href="#related-docs">Related docs</a></h2>\n<ul>\n<li><a href="/docs/components/card">Card</a></li>\n<li><a href="/docs/components/progress">Progress</a></li>\n<li><a href="/docs/components/spinner">Spinner</a></li>\n</ul>\n',
		toc: [
			{
				depth: 2,
				title: 'Registry install',
				href: '#registry-install',
			},
			{
				depth: 2,
				title: 'Package usage',
				href: '#package-usage',
			},
			{
				depth: 2,
				title: 'Highlights',
				href: '#highlights',
			},
			{
				depth: 2,
				title: 'Registry dependencies',
				href: '#registry-dependencies',
			},
			{
				depth: 2,
				title: 'API reference',
				href: '#api-reference',
			},
			{
				depth: 3,
				title: 'Skeleton',
				href: '#skeleton',
			},
			{
				depth: 2,
				title: 'Related docs',
				href: '#related-docs',
			},
		],
	},
	{
		slug: 'components/slider',
		url: '/docs/components/slider',
		title: 'Slider',
		description: 'SolidJS slider primitives with horizontal and vertical pointer and keyboard input.',
		html: '<blockquote>\n<p>Use Slider for pointer and keyboard selection along horizontal or vertical ranges.</p>\n</blockquote>\n<h2 id="registry-install" tabindex="-1"><a class="header-anchor" href="#registry-install">Registry install</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#953800;--shiki-dark:#B392F0">pnpm</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> dlx</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> shadcn@latest</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> add</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> @tile-ui/slider</span></span>\n<span class="line"></span></code></pre><h2 id="package-usage" tabindex="-1"><a class="header-anchor" href="#package-usage">Package usage</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">import</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> { Slider, SliderTrack, SliderRange, SliderThumb } </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">from</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> \'@tile-ui/solid\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Slider</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> defaultValue</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#0550AE;--shiki-dark:#79B8FF">40</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">}</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">SliderTrack</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">SliderRange</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> />&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">SliderTrack</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">SliderThumb</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> aria-label</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"Volume"</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> />&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Slider</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"></span></code></pre><h2 id="highlights" tabindex="-1"><a class="header-anchor" href="#highlights">Highlights</a></h2>\n<ul>\n<li>Min, max, and step</li>\n<li>Horizontal and vertical</li>\n<li>Track, range, and thumb</li>\n</ul>\n<h2 id="registry-dependencies" tabindex="-1"><a class="header-anchor" href="#registry-dependencies">Registry dependencies</a></h2>\n<table>\n<thead>\n<tr>\n<th>Item</th>\n<th>Purpose</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>slider</code></td>\n<td>Component source and module styles</td>\n</tr>\n<tr>\n<td><code>core</code></td>\n<td>Framework-agnostic logic helpers</td>\n</tr>\n<tr>\n<td><code>utils</code></td>\n<td>Shared utility helpers</td>\n</tr>\n<tr>\n<td><code>styles</code></td>\n<td>Shared SCSS tokens and globals</td>\n</tr>\n</tbody>\n</table>\n<h2 id="api-reference" tabindex="-1"><a class="header-anchor" href="#api-reference">API reference</a></h2>\n<h3 id="slider" tabindex="-1"><a class="header-anchor" href="#slider">Slider</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>orientation</code></td>\n<td><code>\'horizontal\' | \'vertical\'</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>min</code></td>\n<td><code>number</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>max</code></td>\n<td><code>number</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>step</code></td>\n<td><code>number</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>value</code></td>\n<td><code>number</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>defaultValue</code></td>\n<td><code>number</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>onValueChange</code></td>\n<td><code>(value: number) =&gt; void</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>disabled</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>name</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>form</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="slidertrack" tabindex="-1"><a class="header-anchor" href="#slidertrack">SliderTrack</a></h3>\n<p>No custom props.</p>\n<h3 id="sliderrange" tabindex="-1"><a class="header-anchor" href="#sliderrange">SliderRange</a></h3>\n<p>No custom props.</p>\n<h3 id="sliderthumb" tabindex="-1"><a class="header-anchor" href="#sliderthumb">SliderThumb</a></h3>\n<p>No custom props.</p>\n<h2 id="related-docs" tabindex="-1"><a class="header-anchor" href="#related-docs">Related docs</a></h2>\n<ul>\n<li><a href="/docs/components/progress">Progress</a></li>\n<li><a href="/docs/components/switch">Switch</a></li>\n<li><a href="/docs/components/form">Form</a></li>\n</ul>\n',
		toc: [
			{
				depth: 2,
				title: 'Registry install',
				href: '#registry-install',
			},
			{
				depth: 2,
				title: 'Package usage',
				href: '#package-usage',
			},
			{
				depth: 2,
				title: 'Highlights',
				href: '#highlights',
			},
			{
				depth: 2,
				title: 'Registry dependencies',
				href: '#registry-dependencies',
			},
			{
				depth: 2,
				title: 'API reference',
				href: '#api-reference',
			},
			{
				depth: 3,
				title: 'Slider',
				href: '#slider',
			},
			{
				depth: 3,
				title: 'SliderTrack',
				href: '#slidertrack',
			},
			{
				depth: 3,
				title: 'SliderRange',
				href: '#sliderrange',
			},
			{
				depth: 3,
				title: 'SliderThumb',
				href: '#sliderthumb',
			},
			{
				depth: 2,
				title: 'Related docs',
				href: '#related-docs',
			},
		],
	},
	{
		slug: 'components/sonner',
		url: '/docs/components/sonner',
		title: 'Sonner',
		description: 'External-store backed SolidJS toast notifications with an imperative API.',
		html: '<blockquote>\n<p>Mount Toaster in a client-visible layout and call the imperative toast API from interactions. Server rendering is an empty no-op and does not retain notifications between requests.</p>\n</blockquote>\n<h2 id="registry-install" tabindex="-1"><a class="header-anchor" href="#registry-install">Registry install</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#953800;--shiki-dark:#B392F0">pnpm</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> dlx</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> shadcn@latest</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> add</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> @tile-ui/sonner</span></span>\n<span class="line"></span></code></pre><h2 id="package-usage" tabindex="-1"><a class="header-anchor" href="#package-usage">Package usage</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">import</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> { toast, Toaster } </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">from</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> \'@tile-ui/solid\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;>&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#85E89D">button</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> type</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"button"</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> onClick</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">() </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=></span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> toast.</span><span style="--shiki-light:#8250DF;--shiki-dark:#B392F0">success</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">(</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"Saved"</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">)</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">}</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>Notify&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#85E89D">button</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Toaster</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> richColors</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> />&#x3C;/></span></span>\n<span class="line"></span></code></pre><h2 id="highlights" tabindex="-1"><a class="header-anchor" href="#highlights">Highlights</a></h2>\n<ul>\n<li>Imperative toast variants and updates</li>\n<li>Dismiss lifecycle and external-store subscriptions</li>\n<li>Empty server output with no cross-request store leakage</li>\n</ul>\n<h2 id="registry-dependencies" tabindex="-1"><a class="header-anchor" href="#registry-dependencies">Registry dependencies</a></h2>\n<table>\n<thead>\n<tr>\n<th>Item</th>\n<th>Purpose</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>sonner</code></td>\n<td>Component source and module styles</td>\n</tr>\n<tr>\n<td><code>core</code></td>\n<td>Framework-agnostic logic helpers</td>\n</tr>\n<tr>\n<td><code>utils</code></td>\n<td>Shared utility helpers</td>\n</tr>\n<tr>\n<td><code>styles</code></td>\n<td>Shared SCSS tokens and globals</td>\n</tr>\n</tbody>\n</table>\n<h2 id="api-reference" tabindex="-1"><a class="header-anchor" href="#api-reference">API reference</a></h2>\n<h3 id="toaster" tabindex="-1"><a class="header-anchor" href="#toaster">Toaster</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>position</code></td>\n<td><code>\'top-left\' | \'top-right\' | \'bottom-left\' | \'bottom-right\' | \'top-center\' | \'bottom-center\'</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>duration</code></td>\n<td><code>number</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>closeButton</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>richColors</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>theme</code></td>\n<td><code>\'light\' | \'dark\' | \'system\'</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="toast" tabindex="-1"><a class="header-anchor" href="#toast">toast</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>call</code></td>\n<td><code>(title: string, options?: SonnerAddInput) =&gt; string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>success / info / warning / error / loading</code></td>\n<td><code>(title: string, options?: SonnerAddInput) =&gt; string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>update</code></td>\n<td><code>(id: string, update: SonnerToastUpdate) =&gt; void</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>dismiss</code></td>\n<td><code>(id?: string) =&gt; void</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="usetoast" tabindex="-1"><a class="header-anchor" href="#usetoast">useToast</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>return</code></td>\n<td><code>UseToastReturn</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h2 id="related-docs" tabindex="-1"><a class="header-anchor" href="#related-docs">Related docs</a></h2>\n<ul>\n<li><a href="/docs/components/alert">Alert</a></li>\n<li><a href="/docs/components/form">Form</a></li>\n<li><a href="/docs/components/spinner">Spinner</a></li>\n</ul>\n',
		toc: [
			{
				depth: 2,
				title: 'Registry install',
				href: '#registry-install',
			},
			{
				depth: 2,
				title: 'Package usage',
				href: '#package-usage',
			},
			{
				depth: 2,
				title: 'Highlights',
				href: '#highlights',
			},
			{
				depth: 2,
				title: 'Registry dependencies',
				href: '#registry-dependencies',
			},
			{
				depth: 2,
				title: 'API reference',
				href: '#api-reference',
			},
			{
				depth: 3,
				title: 'Toaster',
				href: '#toaster',
			},
			{
				depth: 3,
				title: 'toast',
				href: '#toast',
			},
			{
				depth: 3,
				title: 'useToast',
				href: '#usetoast',
			},
			{
				depth: 2,
				title: 'Related docs',
				href: '#related-docs',
			},
		],
	},
	{
		slug: 'components/spinner',
		url: '/docs/components/spinner',
		title: 'Spinner',
		description: 'An accessible SolidJS loading status icon.',
		html: '<blockquote>\n<p>Use Spinner for short indeterminate loading states.</p>\n</blockquote>\n<h2 id="registry-install" tabindex="-1"><a class="header-anchor" href="#registry-install">Registry install</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#953800;--shiki-dark:#B392F0">pnpm</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> dlx</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> shadcn@latest</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> add</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> @tile-ui/spinner</span></span>\n<span class="line"></span></code></pre><h2 id="package-usage" tabindex="-1"><a class="header-anchor" href="#package-usage">Package usage</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">import</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> { Spinner } </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">from</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> \'@tile-ui/solid\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Spinner</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> /></span></span>\n<span class="line"></span></code></pre><h2 id="highlights" tabindex="-1"><a class="header-anchor" href="#highlights">Highlights</a></h2>\n<ul>\n<li>Three sizes</li>\n<li>Pulse animation</li>\n</ul>\n<h2 id="registry-dependencies" tabindex="-1"><a class="header-anchor" href="#registry-dependencies">Registry dependencies</a></h2>\n<table>\n<thead>\n<tr>\n<th>Item</th>\n<th>Purpose</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>spinner</code></td>\n<td>Component source and module styles</td>\n</tr>\n<tr>\n<td><code>core</code></td>\n<td>Framework-agnostic logic helpers</td>\n</tr>\n<tr>\n<td><code>styles</code></td>\n<td>Shared SCSS tokens and globals</td>\n</tr>\n</tbody>\n</table>\n<h2 id="api-reference" tabindex="-1"><a class="header-anchor" href="#api-reference">API reference</a></h2>\n<h3 id="spinner" tabindex="-1"><a class="header-anchor" href="#spinner">Spinner</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>size</code></td>\n<td><code>\'sm\' | \'default\' | \'lg\'</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h2 id="related-docs" tabindex="-1"><a class="header-anchor" href="#related-docs">Related docs</a></h2>\n<ul>\n<li><a href="/docs/components/progress">Progress</a></li>\n<li><a href="/docs/components/skeleton">Skeleton</a></li>\n<li><a href="/docs/components/button">Button</a></li>\n</ul>\n',
		toc: [
			{
				depth: 2,
				title: 'Registry install',
				href: '#registry-install',
			},
			{
				depth: 2,
				title: 'Package usage',
				href: '#package-usage',
			},
			{
				depth: 2,
				title: 'Highlights',
				href: '#highlights',
			},
			{
				depth: 2,
				title: 'Registry dependencies',
				href: '#registry-dependencies',
			},
			{
				depth: 2,
				title: 'API reference',
				href: '#api-reference',
			},
			{
				depth: 3,
				title: 'Spinner',
				href: '#spinner',
			},
			{
				depth: 2,
				title: 'Related docs',
				href: '#related-docs',
			},
		],
	},
	{
		slug: 'components/switch',
		url: '/docs/components/switch',
		title: 'Switch',
		description: 'An accessible SolidJS switch with controlled and native form state.',
		html: '<blockquote>\n<p>Use Switch for controlled or uncontrolled boolean settings that submit with a form.</p>\n</blockquote>\n<h2 id="registry-install" tabindex="-1"><a class="header-anchor" href="#registry-install">Registry install</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#953800;--shiki-dark:#B392F0">pnpm</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> dlx</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> shadcn@latest</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> add</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> @tile-ui/switch</span></span>\n<span class="line"></span></code></pre><h2 id="package-usage" tabindex="-1"><a class="header-anchor" href="#package-usage">Package usage</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">import</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> { Switch } </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">from</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> \'@tile-ui/solid\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Switch</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> /></span></span>\n<span class="line"></span></code></pre><h2 id="highlights" tabindex="-1"><a class="header-anchor" href="#highlights">Highlights</a></h2>\n<ul>\n<li>Two sizes</li>\n<li>Accessible switch role</li>\n<li>Pairs with Field and Form</li>\n</ul>\n<h2 id="registry-dependencies" tabindex="-1"><a class="header-anchor" href="#registry-dependencies">Registry dependencies</a></h2>\n<table>\n<thead>\n<tr>\n<th>Item</th>\n<th>Purpose</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>switch</code></td>\n<td>Component source and module styles</td>\n</tr>\n<tr>\n<td><code>core</code></td>\n<td>Framework-agnostic logic helpers</td>\n</tr>\n<tr>\n<td><code>utils</code></td>\n<td>Shared utility helpers</td>\n</tr>\n<tr>\n<td><code>styles</code></td>\n<td>Shared SCSS tokens and globals</td>\n</tr>\n</tbody>\n</table>\n<h2 id="api-reference" tabindex="-1"><a class="header-anchor" href="#api-reference">API reference</a></h2>\n<h3 id="switch" tabindex="-1"><a class="header-anchor" href="#switch">Switch</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>size</code></td>\n<td><code>\'default\' | \'sm\'</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>checked</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>defaultChecked</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>onCheckedChange</code></td>\n<td><code>(checked: boolean) =&gt; void</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>name</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>value</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>form</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>required</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h2 id="related-docs" tabindex="-1"><a class="header-anchor" href="#related-docs">Related docs</a></h2>\n<ul>\n<li><a href="/docs/components/checkbox">Checkbox</a></li>\n<li><a href="/docs/components/toggle">Toggle</a></li>\n<li><a href="/docs/components/form">Form</a></li>\n</ul>\n',
		toc: [
			{
				depth: 2,
				title: 'Registry install',
				href: '#registry-install',
			},
			{
				depth: 2,
				title: 'Package usage',
				href: '#package-usage',
			},
			{
				depth: 2,
				title: 'Highlights',
				href: '#highlights',
			},
			{
				depth: 2,
				title: 'Registry dependencies',
				href: '#registry-dependencies',
			},
			{
				depth: 2,
				title: 'API reference',
				href: '#api-reference',
			},
			{
				depth: 3,
				title: 'Switch',
				href: '#switch',
			},
			{
				depth: 2,
				title: 'Related docs',
				href: '#related-docs',
			},
		],
	},
	{
		slug: 'components/table',
		url: '/docs/components/table',
		title: 'Table',
		description: 'Native SolidJS table primitives in a responsive overflow container.',
		html: '<blockquote>\n<p>Use Table primitives for semantic tabular data with horizontal overflow support.</p>\n</blockquote>\n<h2 id="registry-install" tabindex="-1"><a class="header-anchor" href="#registry-install">Registry install</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#953800;--shiki-dark:#B392F0">pnpm</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> dlx</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> shadcn@latest</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> add</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> @tile-ui/table</span></span>\n<span class="line"></span></code></pre><h2 id="package-usage" tabindex="-1"><a class="header-anchor" href="#package-usage">Package usage</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">import</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">from</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> \'@tile-ui/solid\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Table</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">TableHeader</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">TableRow</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t\t\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">TableHead</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>Name&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">TableHead</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t\t&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">TableRow</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">TableHeader</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">TableBody</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">TableRow</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t\t\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">TableCell</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>Tile UI&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">TableCell</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t\t&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">TableRow</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">TableBody</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Table</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"></span></code></pre><h2 id="highlights" tabindex="-1"><a class="header-anchor" href="#highlights">Highlights</a></h2>\n<ul>\n<li>Header, body, footer, and caption</li>\n<li>Row, head, and cell primitives</li>\n<li>Pairs with Pagination</li>\n</ul>\n<h2 id="registry-dependencies" tabindex="-1"><a class="header-anchor" href="#registry-dependencies">Registry dependencies</a></h2>\n<table>\n<thead>\n<tr>\n<th>Item</th>\n<th>Purpose</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>table</code></td>\n<td>Component source and module styles</td>\n</tr>\n<tr>\n<td><code>core</code></td>\n<td>Framework-agnostic logic helpers</td>\n</tr>\n<tr>\n<td><code>styles</code></td>\n<td>Shared SCSS tokens and globals</td>\n</tr>\n</tbody>\n</table>\n<h2 id="api-reference" tabindex="-1"><a class="header-anchor" href="#api-reference">API reference</a></h2>\n<h3 id="table" tabindex="-1"><a class="header-anchor" href="#table">Table</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>containerClass</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>containerProps</code></td>\n<td><code>JSX.HTMLAttributes&lt;HTMLDivElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="tableheader" tabindex="-1"><a class="header-anchor" href="#tableheader">TableHeader</a></h3>\n<p>No custom props.</p>\n<h3 id="tablebody" tabindex="-1"><a class="header-anchor" href="#tablebody">TableBody</a></h3>\n<p>No custom props.</p>\n<h3 id="tablefooter" tabindex="-1"><a class="header-anchor" href="#tablefooter">TableFooter</a></h3>\n<p>No custom props.</p>\n<h3 id="tablerow" tabindex="-1"><a class="header-anchor" href="#tablerow">TableRow</a></h3>\n<p>No custom props.</p>\n<h3 id="tablehead" tabindex="-1"><a class="header-anchor" href="#tablehead">TableHead</a></h3>\n<p>No custom props.</p>\n<h3 id="tablecell" tabindex="-1"><a class="header-anchor" href="#tablecell">TableCell</a></h3>\n<p>No custom props.</p>\n<h3 id="tablecaption" tabindex="-1"><a class="header-anchor" href="#tablecaption">TableCaption</a></h3>\n<p>No custom props.</p>\n<h2 id="related-docs" tabindex="-1"><a class="header-anchor" href="#related-docs">Related docs</a></h2>\n<ul>\n<li><a href="/docs/components/pagination">Pagination</a></li>\n<li><a href="/docs/components/card">Card</a></li>\n<li><a href="/docs/components/badge">Badge</a></li>\n</ul>\n',
		toc: [
			{
				depth: 2,
				title: 'Registry install',
				href: '#registry-install',
			},
			{
				depth: 2,
				title: 'Package usage',
				href: '#package-usage',
			},
			{
				depth: 2,
				title: 'Highlights',
				href: '#highlights',
			},
			{
				depth: 2,
				title: 'Registry dependencies',
				href: '#registry-dependencies',
			},
			{
				depth: 2,
				title: 'API reference',
				href: '#api-reference',
			},
			{
				depth: 3,
				title: 'Table',
				href: '#table',
			},
			{
				depth: 3,
				title: 'TableHeader',
				href: '#tableheader',
			},
			{
				depth: 3,
				title: 'TableBody',
				href: '#tablebody',
			},
			{
				depth: 3,
				title: 'TableFooter',
				href: '#tablefooter',
			},
			{
				depth: 3,
				title: 'TableRow',
				href: '#tablerow',
			},
			{
				depth: 3,
				title: 'TableHead',
				href: '#tablehead',
			},
			{
				depth: 3,
				title: 'TableCell',
				href: '#tablecell',
			},
			{
				depth: 3,
				title: 'TableCaption',
				href: '#tablecaption',
			},
			{
				depth: 2,
				title: 'Related docs',
				href: '#related-docs',
			},
		],
	},
	{
		slug: 'components/tabs',
		url: '/docs/components/tabs',
		title: 'Tabs',
		description: 'Accessible SolidJS tabs with deterministic relationships and keyboard activation.',
		html: '<blockquote>\n<p>Use Tabs to switch related panels with automatic arrow-key activation and stable ARIA relationships.</p>\n</blockquote>\n<h2 id="registry-install" tabindex="-1"><a class="header-anchor" href="#registry-install">Registry install</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#953800;--shiki-dark:#B392F0">pnpm</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> dlx</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> shadcn@latest</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> add</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> @tile-ui/tabs</span></span>\n<span class="line"></span></code></pre><h2 id="package-usage" tabindex="-1"><a class="header-anchor" href="#package-usage">Package usage</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">import</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> { Tabs, TabsList, TabsTrigger, TabsContent } </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">from</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> \'@tile-ui/solid\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Tabs</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> defaultValue</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"account"</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">TabsList</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">TabsTrigger</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> value</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"account"</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>Account&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">TabsTrigger</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">TabsTrigger</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> value</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"settings"</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>Settings&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">TabsTrigger</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">TabsList</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">TabsContent</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> value</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"account"</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>Account content.&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">TabsContent</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">TabsContent</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> value</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"settings"</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>Settings content.&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">TabsContent</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Tabs</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"></span></code></pre><h2 id="highlights" tabindex="-1"><a class="header-anchor" href="#highlights">Highlights</a></h2>\n<ul>\n<li>Automatic keyboard activation</li>\n<li>Nested tab lists keep overlapping values independent</li>\n<li>Stable custom or generated tab/panel IDs</li>\n</ul>\n<h2 id="registry-dependencies" tabindex="-1"><a class="header-anchor" href="#registry-dependencies">Registry dependencies</a></h2>\n<table>\n<thead>\n<tr>\n<th>Item</th>\n<th>Purpose</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>tabs</code></td>\n<td>Component source and module styles</td>\n</tr>\n<tr>\n<td><code>core</code></td>\n<td>Framework-agnostic logic helpers</td>\n</tr>\n<tr>\n<td><code>utils</code></td>\n<td>Shared utility helpers</td>\n</tr>\n<tr>\n<td><code>styles</code></td>\n<td>Shared SCSS tokens and globals</td>\n</tr>\n</tbody>\n</table>\n<h2 id="api-reference" tabindex="-1"><a class="header-anchor" href="#api-reference">API reference</a></h2>\n<h3 id="tabs" tabindex="-1"><a class="header-anchor" href="#tabs">Tabs</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>value</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>defaultValue</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>onValueChange</code></td>\n<td><code>(value: string) =&gt; void</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>orientation</code></td>\n<td><code>\'horizontal\' | \'vertical\'</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>ref</code></td>\n<td><code>CallbackRef&lt;HTMLDivElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="tabslist" tabindex="-1"><a class="header-anchor" href="#tabslist">TabsList</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>variant</code></td>\n<td><code>\'default\' | \'line\'</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>ref</code></td>\n<td><code>CallbackRef&lt;HTMLDivElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="tabstrigger" tabindex="-1"><a class="header-anchor" href="#tabstrigger">TabsTrigger</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>value</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>disabled</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>ref</code></td>\n<td><code>CallbackRef&lt;HTMLButtonElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="tabscontent" tabindex="-1"><a class="header-anchor" href="#tabscontent">TabsContent</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>value</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>ref</code></td>\n<td><code>CallbackRef&lt;HTMLDivElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h2 id="related-docs" tabindex="-1"><a class="header-anchor" href="#related-docs">Related docs</a></h2>\n<ul>\n<li><a href="/docs/components/accordion">Accordion</a></li>\n<li><a href="/docs/components/toggle-group">ToggleGroup</a></li>\n<li><a href="/docs/components/command">Command</a></li>\n</ul>\n',
		toc: [
			{
				depth: 2,
				title: 'Registry install',
				href: '#registry-install',
			},
			{
				depth: 2,
				title: 'Package usage',
				href: '#package-usage',
			},
			{
				depth: 2,
				title: 'Highlights',
				href: '#highlights',
			},
			{
				depth: 2,
				title: 'Registry dependencies',
				href: '#registry-dependencies',
			},
			{
				depth: 2,
				title: 'API reference',
				href: '#api-reference',
			},
			{
				depth: 3,
				title: 'Tabs',
				href: '#tabs',
			},
			{
				depth: 3,
				title: 'TabsList',
				href: '#tabslist',
			},
			{
				depth: 3,
				title: 'TabsTrigger',
				href: '#tabstrigger',
			},
			{
				depth: 3,
				title: 'TabsContent',
				href: '#tabscontent',
			},
			{
				depth: 2,
				title: 'Related docs',
				href: '#related-docs',
			},
		],
	},
	{
		slug: 'components/textarea',
		url: '/docs/components/textarea',
		title: 'Textarea',
		description: 'An accessible SolidJS textarea with SSR-safe initial values and messaging.',
		html: '<blockquote>\n<p>Use Textarea for multi-line values that remain stable through SSR, hydration, and reset.</p>\n</blockquote>\n<h2 id="registry-install" tabindex="-1"><a class="header-anchor" href="#registry-install">Registry install</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#953800;--shiki-dark:#B392F0">pnpm</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> dlx</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> shadcn@latest</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> add</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> @tile-ui/textarea</span></span>\n<span class="line"></span></code></pre><h2 id="package-usage" tabindex="-1"><a class="header-anchor" href="#package-usage">Package usage</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">import</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> { Textarea } </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">from</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> \'@tile-ui/solid\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Textarea</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> label</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"Summary"</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> defaultValue</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"SSR-safe initial value"</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> /></span></span>\n<span class="line"></span></code></pre><h2 id="highlights" tabindex="-1"><a class="header-anchor" href="#highlights">Highlights</a></h2>\n<ul>\n<li>Label and helper text</li>\n<li>Error state</li>\n<li>Resizable by default</li>\n</ul>\n<h2 id="registry-dependencies" tabindex="-1"><a class="header-anchor" href="#registry-dependencies">Registry dependencies</a></h2>\n<table>\n<thead>\n<tr>\n<th>Item</th>\n<th>Purpose</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>textarea</code></td>\n<td>Component source and module styles</td>\n</tr>\n<tr>\n<td><code>core</code></td>\n<td>Framework-agnostic logic helpers</td>\n</tr>\n<tr>\n<td><code>utils</code></td>\n<td>Shared utility helpers</td>\n</tr>\n<tr>\n<td><code>styles</code></td>\n<td>Shared SCSS tokens and globals</td>\n</tr>\n</tbody>\n</table>\n<h2 id="api-reference" tabindex="-1"><a class="header-anchor" href="#api-reference">API reference</a></h2>\n<h3 id="textarea" tabindex="-1"><a class="header-anchor" href="#textarea">Textarea</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>label</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>error</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>helperText</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>defaultValue</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>onChangeValue</code></td>\n<td><code>(value: string) =&gt; void</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h2 id="related-docs" tabindex="-1"><a class="header-anchor" href="#related-docs">Related docs</a></h2>\n<ul>\n<li><a href="/docs/components/input">Input</a></li>\n<li><a href="/docs/components/label">Label</a></li>\n<li><a href="/docs/components/field">Field</a></li>\n</ul>\n',
		toc: [
			{
				depth: 2,
				title: 'Registry install',
				href: '#registry-install',
			},
			{
				depth: 2,
				title: 'Package usage',
				href: '#package-usage',
			},
			{
				depth: 2,
				title: 'Highlights',
				href: '#highlights',
			},
			{
				depth: 2,
				title: 'Registry dependencies',
				href: '#registry-dependencies',
			},
			{
				depth: 2,
				title: 'API reference',
				href: '#api-reference',
			},
			{
				depth: 3,
				title: 'Textarea',
				href: '#textarea',
			},
			{
				depth: 2,
				title: 'Related docs',
				href: '#related-docs',
			},
		],
	},
	{
		slug: 'components/toggle',
		url: '/docs/components/toggle',
		title: 'Toggle',
		description: 'A controlled or uncontrolled SolidJS toggle button.',
		html: '<blockquote>\n<p>Use Toggle for controlled or uncontrolled binary state in SolidJS.</p>\n</blockquote>\n<h2 id="registry-install" tabindex="-1"><a class="header-anchor" href="#registry-install">Registry install</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#953800;--shiki-dark:#B392F0">pnpm</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> dlx</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> shadcn@latest</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> add</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> @tile-ui/toggle</span></span>\n<span class="line"></span></code></pre><h2 id="package-usage" tabindex="-1"><a class="header-anchor" href="#package-usage">Package usage</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">import</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> { Toggle } </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">from</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> \'@tile-ui/solid\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Toggle</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> variant</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"outline"</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>Bold&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Toggle</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"></span></code></pre><h2 id="highlights" tabindex="-1"><a class="header-anchor" href="#highlights">Highlights</a></h2>\n<ul>\n<li>Three variants</li>\n<li>Three sizes</li>\n<li>Pressed state</li>\n</ul>\n<h2 id="registry-dependencies" tabindex="-1"><a class="header-anchor" href="#registry-dependencies">Registry dependencies</a></h2>\n<table>\n<thead>\n<tr>\n<th>Item</th>\n<th>Purpose</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>toggle</code></td>\n<td>Component source and module styles</td>\n</tr>\n<tr>\n<td><code>core</code></td>\n<td>Framework-agnostic logic helpers</td>\n</tr>\n<tr>\n<td><code>utils</code></td>\n<td>Shared utility helpers</td>\n</tr>\n<tr>\n<td><code>styles</code></td>\n<td>Shared SCSS tokens and globals</td>\n</tr>\n</tbody>\n</table>\n<h2 id="api-reference" tabindex="-1"><a class="header-anchor" href="#api-reference">API reference</a></h2>\n<h3 id="toggle" tabindex="-1"><a class="header-anchor" href="#toggle">Toggle</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>variant</code></td>\n<td><code>\'default\' | \'outline\' | \'ghost\'</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>size</code></td>\n<td><code>\'sm\' | \'default\' | \'lg\'</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>pressed</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>defaultPressed</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>onPressedChange</code></td>\n<td><code>(pressed: boolean) =&gt; void</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h2 id="related-docs" tabindex="-1"><a class="header-anchor" href="#related-docs">Related docs</a></h2>\n<ul>\n<li><a href="/docs/components/toggle-group">ToggleGroup</a></li>\n<li><a href="/docs/components/switch">Switch</a></li>\n<li><a href="/docs/components/checkbox">Checkbox</a></li>\n</ul>\n',
		toc: [
			{
				depth: 2,
				title: 'Registry install',
				href: '#registry-install',
			},
			{
				depth: 2,
				title: 'Package usage',
				href: '#package-usage',
			},
			{
				depth: 2,
				title: 'Highlights',
				href: '#highlights',
			},
			{
				depth: 2,
				title: 'Registry dependencies',
				href: '#registry-dependencies',
			},
			{
				depth: 2,
				title: 'API reference',
				href: '#api-reference',
			},
			{
				depth: 3,
				title: 'Toggle',
				href: '#toggle',
			},
			{
				depth: 2,
				title: 'Related docs',
				href: '#related-docs',
			},
		],
	},
	{
		slug: 'components/toggle-group',
		url: '/docs/components/toggle-group',
		title: 'ToggleGroup',
		description: 'A controlled or uncontrolled SolidJS single or multiple toggle group.',
		html: '<blockquote>\n<p>Use ToggleGroup for single or multiple toolbar choices with roving focus.</p>\n</blockquote>\n<h2 id="registry-install" tabindex="-1"><a class="header-anchor" href="#registry-install">Registry install</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#953800;--shiki-dark:#B392F0">pnpm</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> dlx</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> shadcn@latest</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> add</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> @tile-ui/toggle-group</span></span>\n<span class="line"></span></code></pre><h2 id="package-usage" tabindex="-1"><a class="header-anchor" href="#package-usage">Package usage</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">import</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> { ToggleGroup, ToggleGroupItem } </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">from</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> \'@tile-ui/solid\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">ToggleGroup</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> type</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"single"</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> defaultValue</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"a"</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">ToggleGroupItem</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> value</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"a"</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>A&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">ToggleGroupItem</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">ToggleGroupItem</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> value</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"b"</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>B&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">ToggleGroupItem</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">ToggleGroup</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"></span></code></pre><h2 id="highlights" tabindex="-1"><a class="header-anchor" href="#highlights">Highlights</a></h2>\n<ul>\n<li>Single and multiple modes</li>\n<li>Item variants and sizes</li>\n</ul>\n<h2 id="registry-dependencies" tabindex="-1"><a class="header-anchor" href="#registry-dependencies">Registry dependencies</a></h2>\n<table>\n<thead>\n<tr>\n<th>Item</th>\n<th>Purpose</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>toggle-group</code></td>\n<td>Component source and module styles</td>\n</tr>\n<tr>\n<td><code>core</code></td>\n<td>Framework-agnostic logic helpers</td>\n</tr>\n<tr>\n<td><code>utils</code></td>\n<td>Shared utility helpers</td>\n</tr>\n<tr>\n<td><code>styles</code></td>\n<td>Shared SCSS tokens and globals</td>\n</tr>\n</tbody>\n</table>\n<h2 id="api-reference" tabindex="-1"><a class="header-anchor" href="#api-reference">API reference</a></h2>\n<h3 id="togglegroup" tabindex="-1"><a class="header-anchor" href="#togglegroup">ToggleGroup</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>type</code></td>\n<td><code>\'single\' | \'multiple\'</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>value</code></td>\n<td><code>ToggleGroupValue</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>defaultValue</code></td>\n<td><code>ToggleGroupValue</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>onValueChange</code></td>\n<td><code>(value: ToggleGroupValue) =&gt; void</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>disabled</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>orientation</code></td>\n<td><code>RadioGroupOrientation</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="togglegroupitem" tabindex="-1"><a class="header-anchor" href="#togglegroupitem">ToggleGroupItem</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>value</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>variant</code></td>\n<td><code>ToggleVariant</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>size</code></td>\n<td><code>ToggleSize</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h2 id="related-docs" tabindex="-1"><a class="header-anchor" href="#related-docs">Related docs</a></h2>\n<ul>\n<li><a href="/docs/components/toggle">Toggle</a></li>\n<li><a href="/docs/components/button-group">ButtonGroup</a></li>\n<li><a href="/docs/components/tabs">Tabs</a></li>\n</ul>\n',
		toc: [
			{
				depth: 2,
				title: 'Registry install',
				href: '#registry-install',
			},
			{
				depth: 2,
				title: 'Package usage',
				href: '#package-usage',
			},
			{
				depth: 2,
				title: 'Highlights',
				href: '#highlights',
			},
			{
				depth: 2,
				title: 'Registry dependencies',
				href: '#registry-dependencies',
			},
			{
				depth: 2,
				title: 'API reference',
				href: '#api-reference',
			},
			{
				depth: 3,
				title: 'ToggleGroup',
				href: '#togglegroup',
			},
			{
				depth: 3,
				title: 'ToggleGroupItem',
				href: '#togglegroupitem',
			},
			{
				depth: 2,
				title: 'Related docs',
				href: '#related-docs',
			},
		],
	},
	{
		slug: 'components/tooltip',
		url: '/docs/components/tooltip',
		title: 'Tooltip',
		description: 'A delayed SolidJS tooltip for pointer hover and keyboard focus.',
		html: '<blockquote>\n<p>Use TooltipProvider and nested Tooltip primitives for delayed pointer help and immediate keyboard-focus descriptions.</p>\n</blockquote>\n<h2 id="registry-install" tabindex="-1"><a class="header-anchor" href="#registry-install">Registry install</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#953800;--shiki-dark:#B392F0">pnpm</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> dlx</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> shadcn@latest</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> add</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> @tile-ui/tooltip</span></span>\n<span class="line"></span></code></pre><h2 id="package-usage" tabindex="-1"><a class="header-anchor" href="#package-usage">Package usage</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">import</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8"> { Tooltip } </span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">from</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> \'@tile-ui/solid\'</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">TooltipProvider</span><span style="--shiki-light:#0550AE;--shiki-dark:#B392F0"> delayDuration</span><span style="--shiki-light:#CF222E;--shiki-dark:#F97583">=</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">{</span><span style="--shiki-light:#0550AE;--shiki-dark:#79B8FF">400</span><span style="--shiki-light:#CF222E;--shiki-dark:#E1E4E8">}</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Tooltip</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">TooltipTrigger</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>Focus or hover&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">TooltipTrigger</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">TooltipContent</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>Keyboard help.&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">TooltipContent</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">>&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">Tooltip</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">&#x3C;/</span><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">TooltipProvider</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">></span></span>\n<span class="line"></span></code></pre><h2 id="highlights" tabindex="-1"><a class="header-anchor" href="#highlights">Highlights</a></h2>\n<ul>\n<li>Provider-level pointer delay timing</li>\n<li>Pointer hover and keyboard focus opening</li>\n<li>Escape dismissal and stable description IDs</li>\n</ul>\n<h2 id="foundation-behavior" tabindex="-1"><a class="header-anchor" href="#foundation-behavior">Foundation behavior</a></h2>\n<p>This Solid implementation uses native nested primitives and does not expose <code>asChild</code>. Controlled state uses Solid accessors and explicit callbacks such as <code>onOpenChange</code>, <code>onValueChange</code>, or <code>onSearchChange</code> where the family supports them.</p>\n<p>Portal content is omitted from the server response and mounted during hydration into the resolved document or nested portal scope. Closed and default-open roots keep deterministic trigger IDs and ARIA relationships without a hydration mismatch.</p>\n<p>Keyboard behavior follows the shared Foundation: focus and Tab order, Escape dismissal, arrow-key movement, typeahead, submenu branches, and trigger restoration are applied according to the component role.</p>\n<h2 id="registry-dependencies" tabindex="-1"><a class="header-anchor" href="#registry-dependencies">Registry dependencies</a></h2>\n<table>\n<thead>\n<tr>\n<th>Item</th>\n<th>Purpose</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>tooltip</code></td>\n<td>Component source and module styles</td>\n</tr>\n<tr>\n<td><code>core</code></td>\n<td>Framework-agnostic logic helpers</td>\n</tr>\n<tr>\n<td><code>utils</code></td>\n<td>Shared utility helpers</td>\n</tr>\n<tr>\n<td><code>styles</code></td>\n<td>Shared SCSS tokens and globals</td>\n</tr>\n</tbody>\n</table>\n<h2 id="api-reference" tabindex="-1"><a class="header-anchor" href="#api-reference">API reference</a></h2>\n<h3 id="tooltipprovider" tabindex="-1"><a class="header-anchor" href="#tooltipprovider">TooltipProvider</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>delayDuration</code></td>\n<td><code>number</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>children</code></td>\n<td><code>JSX.Element</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="tooltip" tabindex="-1"><a class="header-anchor" href="#tooltip">Tooltip</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>open</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>defaultOpen</code></td>\n<td><code>boolean</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>onOpenChange</code></td>\n<td><code>(open: boolean) =&gt; void</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>triggerId</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>contentId</code></td>\n<td><code>string</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>ref</code></td>\n<td><code>CallbackRef&lt;HTMLDivElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="tooltiptrigger" tabindex="-1"><a class="header-anchor" href="#tooltiptrigger">TooltipTrigger</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>ref</code></td>\n<td><code>CallbackRef&lt;HTMLButtonElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h3 id="tooltipcontent" tabindex="-1"><a class="header-anchor" href="#tooltipcontent">TooltipContent</a></h3>\n<table>\n<thead>\n<tr>\n<th>Prop</th>\n<th>Type</th>\n<th>Default</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>side</code></td>\n<td><code>\'top\' | \'right\' | \'bottom\' | \'left\'</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>sideOffset</code></td>\n<td><code>number</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>container</code></td>\n<td><code>Node</code></td>\n<td>—</td>\n</tr>\n<tr>\n<td><code>ref</code></td>\n<td><code>CallbackRef&lt;HTMLDivElement&gt;</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table>\n<h2 id="related-docs" tabindex="-1"><a class="header-anchor" href="#related-docs">Related docs</a></h2>\n<ul>\n<li><a href="/docs/components/popover">Popover</a></li>\n<li><a href="/docs/components/hover-card">HoverCard</a></li>\n<li><a href="/docs/components/kbd">Kbd</a></li>\n</ul>\n',
		toc: [
			{
				depth: 2,
				title: 'Registry install',
				href: '#registry-install',
			},
			{
				depth: 2,
				title: 'Package usage',
				href: '#package-usage',
			},
			{
				depth: 2,
				title: 'Highlights',
				href: '#highlights',
			},
			{
				depth: 2,
				title: 'Foundation behavior',
				href: '#foundation-behavior',
			},
			{
				depth: 2,
				title: 'Registry dependencies',
				href: '#registry-dependencies',
			},
			{
				depth: 2,
				title: 'API reference',
				href: '#api-reference',
			},
			{
				depth: 3,
				title: 'TooltipProvider',
				href: '#tooltipprovider',
			},
			{
				depth: 3,
				title: 'Tooltip',
				href: '#tooltip',
			},
			{
				depth: 3,
				title: 'TooltipTrigger',
				href: '#tooltiptrigger',
			},
			{
				depth: 3,
				title: 'TooltipContent',
				href: '#tooltipcontent',
			},
			{
				depth: 2,
				title: 'Related docs',
				href: '#related-docs',
			},
		],
	},
	{
		slug: 'registry',
		url: '/docs/registry',
		title: 'Registry',
		description: 'Installable SolidJS source artifacts generated from the Tile UI Solid manifest.',
		html: '<p>The Solid registry is built from <code>packages/solid/src/registry/manifest.ts</code> and published by this application under <code>/r</code>.</p>\n<h2 id="current-inventory" tabindex="-1"><a class="header-anchor" href="#current-inventory">Current inventory</a></h2>\n<p>The manifest contains exactly 71 independently installable items: 62 UI components, 3 primitive hooks, and 6 shared items for core logic, Liveline’s source-preserving engine, utility helpers, styles, the default theme, and an independent theme.</p>\n<h2 id="build-output" tabindex="-1"><a class="header-anchor" href="#build-output">Build output</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#953800;--shiki-dark:#B392F0">corepack</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> pnpm</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> registry:build:solid</span></span>\n<span class="line"></span></code></pre><p>The command writes <code>registry.json</code> and item JSON files to <code>apps/solid/public/r</code>. Development runs the registry watcher beside SolidStart on port 3003.</p>\n<h2 id="install-an-item" tabindex="-1"><a class="header-anchor" href="#install-an-item">Install an item</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#953800;--shiki-dark:#B392F0">pnpm</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> dlx</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> shadcn@latest</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> add</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> https://solid.tileui.zmorg.cn/r/dialog.json</span></span>\n<span class="line"></span></code></pre><p>Generated component source contains no residual <code>@tile-ui/core</code> or <code>@tile-ui/styles</code> imports. Build transforms rewrite shared dependencies into owned local files.</p>\n<p>See <a href="/docs/themes">Theme resources</a> for independent appearances and their dedicated setup guides.</p>\n<h2 id="related-docs" tabindex="-1"><a class="header-anchor" href="#related-docs">Related docs</a></h2>\n<ul>\n<li><a href="/docs/installation">Installation</a></li>\n<li><a href="/docs/components">Components</a></li>\n</ul>\n',
		toc: [
			{
				depth: 2,
				title: 'Current inventory',
				href: '#current-inventory',
			},
			{
				depth: 2,
				title: 'Build output',
				href: '#build-output',
			},
			{
				depth: 2,
				title: 'Install an item',
				href: '#install-an-item',
			},
			{
				depth: 2,
				title: 'Related docs',
				href: '#related-docs',
			},
		],
	},
	{
		slug: 'registry/getting-started',
		url: '/docs/registry/getting-started',
		title: 'Getting Started',
		description: 'Configure the Tile UI Solid registry namespace and install the current component slice.',
		html: '<p>The Solid registry is assembled from <code>packages/solid/src/registry</code> and published under <code>apps/solid/public/r</code>.</p>\n<h2 id="consumer-setup" tabindex="-1"><a class="header-anchor" href="#consumer-setup">Consumer setup</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">{</span></span>\n<span class="line"><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">\t"registries"</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">: {</span></span>\n<span class="line"><span style="--shiki-light:#116329;--shiki-dark:#79B8FF">\t\t"@tile-ui"</span><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">: </span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF">"https://solid.tileui.zmorg.cn/r/{name}.json"</span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">\t}</span></span>\n<span class="line"><span style="--shiki-light:#1F2328;--shiki-dark:#E1E4E8">}</span></span>\n<span class="line"></span></code></pre><h2 id="install-an-item" tabindex="-1"><a class="header-anchor" href="#install-an-item">Install an item</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#953800;--shiki-dark:#B392F0">pnpm</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> dlx</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> shadcn@latest</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> add</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> @tile-ui/button</span></span>\n<span class="line"></span></code></pre><p>Registry dependencies bring in shared core logic, styles, and Solid event helpers automatically.</p>\n<h2 id="optional-themes" tabindex="-1"><a class="header-anchor" href="#optional-themes">Optional themes</a></h2>\n<p>See <a href="/docs/themes">Theme resources</a> for available themes and <a href="/docs/themes/kumo">the Kumo guide</a> for its package and registry setup.</p>\n<h2 id="build-flow" tabindex="-1"><a class="header-anchor" href="#build-flow">Build flow</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span style="--shiki-light:#953800;--shiki-dark:#B392F0">corepack</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> pnpm</span><span style="--shiki-light:#0A3069;--shiki-dark:#9ECBFF"> registry:build:solid</span></span>\n<span class="line"></span></code></pre><h2 id="current-scope" tabindex="-1"><a class="header-anchor" href="#current-scope">Current scope</a></h2>\n<p>The registry contains 71 items: 62 UI components spanning actions, forms, data display, feedback, navigation, overlays, layout, and internationalization; 3 primitive hooks; and 6 shared items, including optional theme resources. The <a href="/docs/components">component index</a> remains component-focused and is validated against the 62 UI items in the source manifest.</p>\n<h2 id="related-docs" tabindex="-1"><a class="header-anchor" href="#related-docs">Related docs</a></h2>\n<ul>\n<li><a href="/docs/registry">Registry</a></li>\n<li><a href="/docs/theming">Theming</a></li>\n</ul>\n',
		toc: [
			{
				depth: 2,
				title: 'Consumer setup',
				href: '#consumer-setup',
			},
			{
				depth: 2,
				title: 'Install an item',
				href: '#install-an-item',
			},
			{
				depth: 2,
				title: 'Optional themes',
				href: '#optional-themes',
			},
			{
				depth: 2,
				title: 'Build flow',
				href: '#build-flow',
			},
			{
				depth: 2,
				title: 'Current scope',
				href: '#current-scope',
			},
			{
				depth: 2,
				title: 'Related docs',
				href: '#related-docs',
			},
		],
	},
	{
		slug: 'registry/examples',
		url: '/docs/registry/examples',
		title: 'Registry Examples',
		description: 'Install and compose the 71-item Solid registry: 62 UI components, 3 primitive hooks, and 6 shared items.',
		html: '<p>The registry examples cover the complete 62-component Solid manifest.</p>\n<h2 id="settings-surface" tabindex="-1"><a class="header-anchor" href="#settings-surface">Settings surface</a></h2>\n<p>Combine Card, Input, Separator, and Button for a server-rendered settings panel.</p>\n<h2 id="status-surface" tabindex="-1"><a class="header-anchor" href="#status-surface">Status surface</a></h2>\n<p>Use Card and Badge to present deployment or account state.</p>\n<h2 id="confirmed-action" tabindex="-1"><a class="header-anchor" href="#confirmed-action">Confirmed action</a></h2>\n<p>Use Dialog, Button, and Toggle for a hydrated confirmation flow with controlled Solid state.</p>\n<h2 id="view-live-examples" tabindex="-1"><a class="header-anchor" href="#view-live-examples">View live examples</a></h2>\n<p>The component pages render the exact demo files whose source appears in each preview. Start with <a href="/docs/components/card">Card</a>, <a href="/docs/components/toggle">Toggle</a>, and <a href="/docs/components/dialog">Dialog</a>.</p>\n<h2 id="related-docs" tabindex="-1"><a class="header-anchor" href="#related-docs">Related docs</a></h2>\n<ul>\n<li><a href="/docs/examples">Examples</a></li>\n<li><a href="/docs/components">Components</a></li>\n</ul>\n',
		toc: [
			{
				depth: 2,
				title: 'Settings surface',
				href: '#settings-surface',
			},
			{
				depth: 2,
				title: 'Status surface',
				href: '#status-surface',
			},
			{
				depth: 2,
				title: 'Confirmed action',
				href: '#confirmed-action',
			},
			{
				depth: 2,
				title: 'View live examples',
				href: '#view-live-examples',
			},
			{
				depth: 2,
				title: 'Related docs',
				href: '#related-docs',
			},
		],
	},
	{
		slug: 'registry/faq',
		url: '/docs/registry/faq',
		title: 'Registry FAQ',
		description: 'Clarify Solid package exports, registry ownership, styles, SSR, and the complete 62-component scope.',
		html: '<h2 id="is-the-solid-registry-independent" tabindex="-1"><a class="header-anchor" href="#is-the-solid-registry-independent">Is the Solid registry independent?</a></h2>\n<p>Yes. The Solid docs app owns its manifest output, build command, watcher, and <code>/r</code> public assets.</p>\n<h2 id="do-registry-items-require-the-package" tabindex="-1"><a class="header-anchor" href="#do-registry-items-require-the-package">Do registry items require the package?</a></h2>\n<p>No. Registry installation copies transformed source into the consumer project. Package installation is an alternative distribution path.</p>\n<h2 id="which-package-build-does-the-docs-app-use" tabindex="-1"><a class="header-anchor" href="#which-package-build-does-the-docs-app-use">Which package build does the docs app use?</a></h2>\n<p>The app resolves <code>@tile-ui/solid</code> through package conditional exports: <code>dist/server.js</code> for SSR and <code>dist/browser.js</code> for the hydrated client.</p>\n<h2 id="are-styles-duplicated-per-framework" tabindex="-1"><a class="header-anchor" href="#are-styles-duplicated-per-framework">Are styles duplicated per framework?</a></h2>\n<p>No. Solid components use the same <code>@tile-ui/styles</code> SCSS modules and semantic variables as React and Vue.</p>\n<h2 id="how-many-components-are-included" tabindex="-1"><a class="header-anchor" href="#how-many-components-are-included">How many components are included?</a></h2>\n<p>The Solid manifest contains 71 items: 62 UI components, 3 primitive hooks, and 6 shared items, including optional theme resources. Component docs, demos, and generated previews are checked as an exact 62-item component set; primitives have their own dedicated doc, demo, and preview checks.</p>\n<h2 id="related-docs" tabindex="-1"><a class="header-anchor" href="#related-docs">Related docs</a></h2>\n<ul>\n<li><a href="/docs/registry/schema">Schema</a></li>\n<li><a href="/docs/theming">Theming</a></li>\n</ul>\n',
		toc: [
			{
				depth: 2,
				title: 'Is the Solid registry independent?',
				href: '#is-the-solid-registry-independent',
			},
			{
				depth: 2,
				title: 'Do registry items require the package?',
				href: '#do-registry-items-require-the-package',
			},
			{
				depth: 2,
				title: 'Which package build does the docs app use?',
				href: '#which-package-build-does-the-docs-app-use',
			},
			{
				depth: 2,
				title: 'Are styles duplicated per framework?',
				href: '#are-styles-duplicated-per-framework',
			},
			{
				depth: 2,
				title: 'How many components are included?',
				href: '#how-many-components-are-included',
			},
			{
				depth: 2,
				title: 'Related docs',
				href: '#related-docs',
			},
		],
	},
	{
		slug: 'registry/schema',
		url: '/docs/registry/schema',
		title: 'Schema',
		description: 'Review Solid registry item types, dependencies, transforms, and destination paths.',
		html: '<p>Tile UI Solid uses the shadcn registry schema with Solid-specific source transforms.</p>\n<h2 id="item-types" tabindex="-1"><a class="header-anchor" href="#item-types">Item types</a></h2>\n<ul>\n<li><code>registry:ui</code> for Solid component source.</li>\n<li><code>registry:lib</code> for shared runtime helpers.</li>\n<li><code>registry:style</code> and <code>registry:file</code> for theme and Sass files.</li>\n</ul>\n<h2 id="dependencies" tabindex="-1"><a class="header-anchor" href="#dependencies">Dependencies</a></h2>\n<p><code>dependencies</code> contains npm runtime packages such as <code>solid-js</code>. <code>registryDependencies</code> references Tile items such as <code>@tile-ui/core</code>, <code>@tile-ui/utils</code>, and <code>@tile-ui/styles</code>.</p>\n<h2 id="source-transforms" tabindex="-1"><a class="header-anchor" href="#source-transforms">Source transforms</a></h2>\n<p>Solid component and barrel transforms rewrite package imports to consumer-owned relative paths. Generated component JSON must not retain <code>@tile-ui/core</code> or <code>@tile-ui/styles</code> imports.</p>\n<h2 id="target-paths" tabindex="-1"><a class="header-anchor" href="#target-paths">Target paths</a></h2>\n<pre class="shiki shiki-themes github-light-default github-dark" style="--shiki-light:#1f2328;--shiki-dark:#e1e4e8;--shiki-light-bg:#ffffff;--shiki-dark-bg:#24292e" tabindex="0"><code><span class="line"><span>components/ui/&#x3C;name>/*</span></span>\n<span class="line"><span>components/ui/lib/*</span></span>\n<span class="line"><span>styles/*</span></span>\n<span class="line"><span></span></span></code></pre><h2 id="related-docs" tabindex="-1"><a class="header-anchor" href="#related-docs">Related docs</a></h2>\n<ul>\n<li><a href="/docs/registry/getting-started">Getting started</a></li>\n<li><a href="/docs/registry/faq">Registry FAQ</a></li>\n</ul>\n',
		toc: [
			{
				depth: 2,
				title: 'Item types',
				href: '#item-types',
			},
			{
				depth: 2,
				title: 'Dependencies',
				href: '#dependencies',
			},
			{
				depth: 2,
				title: 'Source transforms',
				href: '#source-transforms',
			},
			{
				depth: 2,
				title: 'Target paths',
				href: '#target-paths',
			},
			{
				depth: 2,
				title: 'Related docs',
				href: '#related-docs',
			},
		],
	},
	{
		slug: 'examples',
		url: '/docs/examples',
		title: 'Examples',
		description: 'Hydrated Solid interactions rendered by the same demo files shown throughout the component docs.',
		html: '<p>The 62 component pages are the example gallery for the Solid registry. Every preview is rendered from <code>apps/solid/components/demos/&lt;slug&gt;.tsx</code>, and the displayed source is generated by reading that exact file.</p>\n<h2 id="interactive-examples" tabindex="-1"><a class="header-anchor" href="#interactive-examples">Interactive examples</a></h2>\n<ul>\n<li><a href="/docs/components/toggle">Toggle</a> updates fine-grained local state after hydration.</li>\n<li><a href="/docs/components/dialog">Dialog</a> portals content, manages focus, closes on Escape, and restores focus.</li>\n<li><a href="/docs/components/input">Input</a> demonstrates accessible labels, helper text, and validation messaging.</li>\n<li><a href="/docs/components/attachment">Attachment</a> proves action isolation from card preview behavior.</li>\n<li><a href="/docs/components/avatar">Avatar</a> demonstrates deterministic image load and fallback transitions.</li>\n<li><a href="/docs/components/aspect-ratio">Aspect Ratio</a> preserves constrained responsive geometry across SSR and hydration.</li>\n<li><a href="/docs/components/accordion">Accordion</a> and <a href="/docs/components/tabs">Tabs</a> demonstrate disabled-aware keyboard navigation and stable IDs.</li>\n<li><a href="/docs/components/calendar">Calendar</a> pins its SSR clock and initial month while exposing date-grid navigation.</li>\n<li><a href="/docs/components/message-scroller">Message Scroller</a> demonstrates observed scrolling, controls, and remount behavior.</li>\n</ul>\n<h2 id="composed-surfaces" tabindex="-1"><a class="header-anchor" href="#composed-surfaces">Composed surfaces</a></h2>\n<ul>\n<li><a href="/docs/components/card">Card</a> combines content and actions.</li>\n<li><a href="/docs/components/button">Button</a>, <a href="/docs/components/badge">Badge</a>, and <a href="/docs/components/separator">Separator</a> demonstrate the shared visual language.</li>\n</ul>\n<h2 id="source-guarantee" tabindex="-1"><a class="header-anchor" href="#source-guarantee">Source guarantee</a></h2>\n<p>There are no separately maintained display snippets. <code>docs:build</code> derives highlighted preview source from the demo files before the SolidStart production build.</p>\n',
		toc: [
			{
				depth: 2,
				title: 'Interactive examples',
				href: '#interactive-examples',
			},
			{
				depth: 2,
				title: 'Composed surfaces',
				href: '#composed-surfaces',
			},
			{
				depth: 2,
				title: 'Source guarantee',
				href: '#source-guarantee',
			},
		],
	},
];
