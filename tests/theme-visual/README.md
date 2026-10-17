# Theme Browser Regression Fixture

Run from the repository root after the theme and component work is ready:

```sh
node scripts/theme-visual.mjs
```

Dependencies resolve from the existing workspace packages. No install, library build, root package change, or committed screenshot baseline is required. The runner starts separate Vite processes for React, Vue, and Solid, uses ephemeral ports, launches installed Playwright Chromium, and shuts everything down on success, failure, interruption, or the eight-minute suite deadline.

## Original Default Theme Regression

Provide the original SCSS tree (including `theme.scss`, `components/`, and `variables/`) to enable strict before/after geometry and computed-style checks:

```sh
TILE_THEME_BASELINE_SCSS=/absolute/path/to/original/packages/styles/scss \
  node scripts/theme-visual.mjs
```

Separate baseline Vite servers alias `@tile-ui/styles/scss` to that directory and import its original `theme.scss`. They serve **only default-theme pages**; baseline CSS cannot leak into a Kumo page. The current component source runs against both CSS versions. CSS module names are stable across servers, so screenshots do not differ solely because a file path hash changed. This is an original-style regression check, not a historical component implementation test.

## Fixture Pages And Controls

`tests/theme-visual/server.mjs` can be started independently:

```sh
node tests/theme-visual/server.mjs react
node tests/theme-visual/server.mjs vue
node tests/theme-visual/server.mjs solid
```

Each prints an ephemeral localhost URL. Visit `/default/light`, `/default/dark`, `/kumo/light`, or `/kumo/dark`. Each document statically imports exactly one theme entry. There is no runtime theme-style switcher. The browser harness changes only the document root class or `data-theme` through the fixture-only `window.__themeFixture.setMode(mode, selector)` test control.

For limited checks while other work is still in progress:

```sh
node scripts/theme-visual.mjs --compile-only
TILE_THEME_FRAMEWORKS=react node scripts/theme-visual.mjs
```

`--compile-only` checks Vite startup, HTML generation, and fixture entry transformation; it does not execute a browser or exhaustively compile transitive CSS. A framework filter intentionally reduces parity coverage and is recorded through the scenarios in the report.

## Assertions

- All three frameworks render equivalent Button size/variant matrices, Input, Checkbox, Switch, Tabs, Dialog, Select, Tooltip, Toaster, Chart, and Liveline.
- Separate default/Kumo pages are checked from both light and dark initial modes, with root class and `data-theme` mutation paths. Computed semantic variables, color scheme, and Kumo mode markers must be defined and respond.
- Known Button heights, square icon buttons, nonzero geometry, and a shared geometry subset must match across frameworks. Default and Kumo extra-small Button geometry must differ, proving independent theme-entry loading.
- Mode mutation must preserve the same input node, value, focus, selection, checkbox/switch state, selected tab, open surface nodes, and focused element. Dialog input selection is checked while its portal remains open.
- Dialog, Select, and Tooltip must escape the isolated application root and inherit the root mode. Toast state and computed appearance are checked too; Toast is not required to portal because the React/Vue adapters render inline. Fixture toasts use Sonner's persistent `duration: 0` contract; keyboard tooltip checks park the mouse outside the fixture to avoid unrelated hover-close timers.
- Focus rings, measured Tabs indicator alignment, semantic SVG chart strokes, nonempty Liveline canvas pixels, canvas backing dimensions, and canvas repaint after mode mutation have assertions. Canvas mode is not forced by fixture props; the component must follow the root appearance itself.
- Every scenario checks 375px horizontal overflow. Runtime, console, failed request, and HTTP error events fail the suite.
- Kumo-theme initial pages and open Dialog/Select surfaces run axe-core WCAG A/AA scans in both modes, with no rule exclusions or default-docs allowlist. Full violations and incomplete checks are retained in separate axe JSON artifacts. Axe violations accumulate so other scenarios and baseline comparisons can finish, then fail the suite; automated passes do not replace manual accessibility review.
- With the optional baseline directory, original/current default geometry and computed colors, shadows, outlines, fonts, padding, opacity, and radii must agree for the matrix and representative Dialog/Select/Tooltip/Toast surfaces.

## Artifacts And Limits

Screenshots, per-server logs, Vite caches, and `report.json` are written to a unique `os.tmpdir()/tile-ui-theme-visual-*` directory, printed on completion or failure. The report lists each completed assertion and scenario; a failure is not presented as a successful partial run. No binary artifacts enter the repo.

Screenshots support human inspection; they are **not pixel-diff tests**. The suite covers Chromium and a neutral Arial host reset, not arbitrary consumer fonts, all component variants, nested theme scopes, or all browser engines. It does **not** claim screenshot parity with the real `@cloudflare/kumo` components. Actual-reference work belongs to the separate `tests/theme-reference/` fixture and `scripts/kumo-reference.mjs` runner.
