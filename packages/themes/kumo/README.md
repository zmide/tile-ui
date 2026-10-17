# @tile-ui/theme-kumo

[English](./README.md) | [简体中文](./README.zh-CN.md)

Give your Tile UI components a Kumo-inspired appearance. Works with React, Vue, and Solid, with light and dark modes included.

**Already using Tile UI? Install this package, replace your default theme import, and keep using your components as before.** No extra Provider or component props are needed.

## 1. Install

```bash
pnpm add @tile-ui/theme-kumo @tile-ui/styles
```

This is a theme, not a component library. Keep your existing `@tile-ui/react`, `@tile-ui/vue`, or `@tile-ui/solid` package and component imports. It requires `@tile-ui/styles` version `^1.1.3`.

## 2. Import once

Add these imports to your application's root entry:

```ts
import '@tile-ui/theme-kumo/theme.css';
import '@tile-ui/styles/reset.css'; // Optional if you already have a CSS reset.
```

Keep your existing component style imports. The theme provides appearance values; it does not include component CSS or download fonts.

**Remove the old default theme import**, such as `@tile-ui/styles/theme.css` or `@tile-ui/styles/globals.css` (including their Sass or `/css/` equivalents). Do not load both palettes. The theme already includes Tile's extension variables, so a separate `tokens.css` import is unnecessary.

### Where to import

| Application        | Recommended location |
| ------------------ | -------------------- |
| React / Vite       | `src/main.tsx`       |
| Next.js App Router | `app/layout.tsx`     |
| Vue / Vite         | `src/main.ts`        |
| Solid / Vite       | `src/index.tsx`      |
| SolidStart         | `src/app.tsx`        |

For Nuxt, add the styles to `nuxt.config.ts` instead:

```ts
export default defineNuxtConfig({
	css: [
		'@tile-ui/theme-kumo/theme.css',
		'@tile-ui/styles/reset.css', // Optional.
	],
});
```

### Using Sass instead?

If your build supports Sass, replace the CSS imports with:

```scss
@use '@tile-ui/theme-kumo/theme.scss';
@use '@tile-ui/styles/reset.scss'; // Optional.
```

Choose CSS **or** Sass; you do not need both. CSS is the simplest option and does not require Sass tooling.

## 3. Switch light and dark modes

The theme starts in light mode. Set `data-theme` on the page's `<html>` element to switch modes:

```html
<html data-theme="dark"></html>
```

In client-side code:

```js
// Dark mode.
document.documentElement.setAttribute('data-theme', 'dark');

// Back to light mode.
document.documentElement.setAttribute('data-theme', 'light');
```

If your application already uses `.light` / `.dark` classes, those work too. Use one convention, or keep the class and attribute consistent. There is no need to reload CSS or add a theme Provider.

Your application decides how to save the preference or follow the system setting. Keep using your existing mode manager. For server-rendered applications, set the initial mode before first paint where possible and keep server and client markup consistent to avoid a flash or hydration mismatch.

## Make small adjustments

Load your overrides after the theme. For example:

```css
:root {
	--tile-font-sans: 'Avenir Next', sans-serif;
	--tile-button-height: 2.5rem;
}
```

Fonts must be available on the user's device or loaded by your application. This package does not fetch them.

## Using the registry instead of packages

With your framework's Tile UI registry configured, run:

```bash
pnpm dlx shadcn@latest add @tile-ui/theme-kumo
```

Then import the copied `styles/themes/kumo.scss` from your application root using its local path. In Nuxt, add that path to the `css` list instead.

Keep the accompanying Sass partials and `LICENSE.kumo`. Import only the entry file, not each partial. Installation does not activate the theme automatically, and you should still remove competing default theme imports. Use either this local registry copy or the package stylesheet, not both.

## Common questions

### The appearance has not changed. What should I check?

Check that the theme is imported at the root, component styles are still loaded, and no default theme or existing host palette overrides it. Inline variables written by `createThemeVariables` / `applyThemeVariables` can also override the stylesheet; those helpers generate Tile's default palette and are not needed for switching this theme's modes.

### Do dialogs and tooltips follow dark mode?

Set the mode on `html` so overlays rendered under `body` inherit it too. Arbitrary nested light/dark theme combinations are not guaranteed.

### Do I need to change my components?

No. Keep Tile's component props, defaults, and behavior. This is a Kumo-inspired appearance, not the upstream Kumo component library or a promise of identical pixels. Some structures and rendering engines differ. Test contrast, focus visibility, and your own customizations in your application.

### What about charts?

Chart uses the theme's CSS variables unless you supply explicit colors. Liveline follows the stylesheet's mode when its `theme` prop is omitted; an explicit `theme="light"` or `theme="dark"` takes priority.

## More help

- [React theme guide](https://react.tileui.zmorg.cn/docs/themes/kumo)
- [Vue theme guide](https://vue.tileui.zmorg.cn/docs/themes/kumo)
- [Solid theme guide](https://solid.tileui.zmorg.cn/docs/themes/kumo)

## License

MIT. Adapted from [Cloudflare Kumo](https://github.com/cloudflare/kumo/tree/7e0ff40546f08405d05bc9754f0ff0fd009ece0a). The complete upstream notice is included in [LICENSE](./LICENSE); retain it when redistributing this theme.
