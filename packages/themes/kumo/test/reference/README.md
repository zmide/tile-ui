# Actual Kumo Source Comparison

This is independent of Tile's cross-framework theme/browser checks. It imports the actual Button, Input, Checkbox, Switch, Tabs and Tooltip TSX files from the Kumo checkout pinned at `7e0ff40546f08405d05bc9754f0ff0fd009ece0a`. It neither reimplements those components nor uses Tile's generated tokens as the reference. The runner refuses a different commit or tracked modifications to reference src.

## Optional Dependencies

Keep this optional dependency installation outside the repository. Set `KUMO_REFERENCE_DEPS` to a project directory containing `node_modules` (not to `node_modules` itself):

```sh
export KUMO_REFERENCE_DEPS="$(mktemp -d "${TMPDIR%/}/opencode/kumo-reference-deps-XXXXXX")"
npm install --prefix "$KUMO_REFERENCE_DEPS" --no-audit --no-fund \
  @base-ui/react@1.9.0 @phosphor-icons/react@2.1.10 \
  @tailwindcss/cli@4.1.17 tailwindcss@4.1.17 cn@0.4.0 \
  react@19.1.0 react-dom@19.1.0
pnpm --filter @tile-ui/theme-kumo test:reference
```

Normal workspace dependencies must already be installed, including Playwright, its Chromium browser, and `apps/solid`'s Vite and Sass. The runner uses Vite's automatic JSX transform, without a React plugin. It aliases React and React DOM to the same isolated versions for both pages and their transitive dependencies. Missing or incompatible reference dependencies fail with instructions; no network installation or root lockfile changes happen automatically.

## What Is Compared

- Separate browser pages prevent reference Tailwind from styling Tile.
- The actual Kumo `styles/kumo.css` is imported **before** consumer Tailwind, preserving the upstream consumer order (including Tailwind's theme defaults). Explicit `@source` entries scan actual reference source and this fixture.
- A neutral host uses root/rem 16px, body 14px, and identical system sans fonts. Kumo's 12/13/14px utility typography comes from its compiled theme. Tile only imports its opt-in Kumo SCSS. Host CSS has no control-specific corrections.
- Both modes are switched dynamically on the root using `.dark` **and** `data-mode="dark"`. The browser's OS preference stays light, exercising the explicit mode selector rather than accidentally relying on OS dark mode.
- Buttons map Tile `default` to Kumo `primary`, and `secondary` to `secondary`; size `default` maps to `base`. All four sizes, hover, keyboard focus and disabled states are covered. Input `controlSize` maps to Kumo `size`.
- Real DOM bounds, padding, radius, font metrics, computed paint styles and screenshots are compared. Checkbox states, two switch sizes, segmented/line tabs and an open portaled tooltip provide additional, nonidentical-DOM cases.

## Results And Limits

Each invocation writes `report.json`, compiled reference CSS, and independent per-case PNGs beneath the OS temporary `opencode` directory. It prints the artifact directory and exits nonzero for any unexcepted mismatch or runner error. The JSON contains exact values, source DOM, screenshot paths, pixel statistics, and all exceptions. Nothing is written into the reference checkout or root deps.

Geometry tolerance is 0.1 CSS px. Pixel comparisons permit channel differences up to 2/255, but allow **zero** pixels beyond that tolerance. No percentage-based mismatch allowance hides a large mismatch. This is intentionally a strict iterative review tool, not a promise that current Tile matches Kumo.

The `sharedGeometry` flag identifies Button/Input mappings; it does not suppress failures for the other components. All differences remain findings. Explicit DOM-specific exceptions are limited to primary-button gradient/highlight layer placement and measured glyph masks for Phosphor checkbox marks / tooltip arrows. The complete button remains pixel-gated. Glyph masks do not exempt popup/control surfaces or geometry. Exact invisible Tailwind shadow slots are normalized.

This is React-only, not full interaction/accessibility coverage, not a responsive matrix, and not the full Kumo library. Font rasterization varies between hosts. Inspect actual screenshots and the remaining findings before claiming fidelity; passing this subset is not a pixel-perfect claim for the library.
