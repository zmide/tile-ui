# Tile themes

Themes are small, opt-in Sass packages. A theme owns appearance only: palettes, typography, dimensions, borders, shadows, state styling, and visual motion. Use Sass for organization and CSS custom properties for dynamic light/dark modes. No theme Provider, component copy, token generator, or JavaScript runtime is needed.

## Ownership

- `packages/themes/<name>`: theme Sass, CSS build, attribution, and visual contracts.
- `packages/styles`: shared component CSS, default fallbacks, and visual variable interfaces.
- `packages/core`: framework-neutral state, measurement, and rendering behavior.
- `packages/react`, `packages/vue`, `packages/solid`: component structure, attributes, lifecycle, and public API adapters.
- Registry/build scripts: packaging and source distribution, not theme behavior.

Dependency direction is theme -> shared visual interfaces, never core -> a theme. Core, framework adapters, and shared component styles must not identify, import, or branch on a concrete theme. Concrete theme names belong only to theme packages, application selection, and distribution/integration fixtures. Attribution notices remain intact regardless of runtime ownership. Theme compatibility tests may inspect component interfaces; core tests must not import a particular theme. Cross-framework browser tests are integration tests.

## Adding a theme

1. Create `packages/themes/<name>` with a package manifest, Sass entry, license, and a direct Sass-to-CSS build. Export `theme.scss` and `theme.css`.
2. Set semantic variables first, then existing component visual variables. Keep imports internal and relative. Add a small visual selector override only when variables are not a natural fit; document any import-order requirement.
3. Provide default light values and explicit light/dark root markers. Applications own persistence, system preferences, fonts, reset, and initial mode selection.
4. Test standalone Sass, mode switching, component consumption, default regression, and packed distribution. Add optional registry distribution if needed.

## When Sass cannot solve it

Do not add DOM manipulation, observers, theme-specific props, or framework forks to a theme. Reproduce the missing capability and identify its proper owner:

| Missing capability                          | Main-framework adaptation                                     |
| ------------------------------------------- | ------------------------------------------------------------- |
| Stable state/part styling access            | Shared state attributes or a supported part/slot interface    |
| Visual property pinned by component CSS     | A generic visual variable with the original-value fallback    |
| Indicator geometry or resize tracking       | Framework-neutral measurement plus lifecycle adapters         |
| Canvas/SVG appearance not following CSS     | Generic rendering input and repaint/invalidation support      |
| Different composition or real DOM structure | A reusable composition/slot API, not CSS that fakes semantics |

Adaptations must have theme-neutral names, preserve current defaults, and apply consistently to all three frameworks. Test behavior without the requesting theme, then let the theme consume the new interface. If the structure remains unsupported, document the visual limitation instead of hiding it with CSS or broadening scope.
