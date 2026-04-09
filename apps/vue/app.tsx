import { defineComponent } from 'vue';

export default defineComponent({
  name: 'VueApp',
  setup() {
    return () => (
      <div class="docs-app-shell">
        <header class="docs-app-header">
          <div class="docs-app-header__inner">
            <NuxtLink to="/" class="docs-app-brand">Tile UI Vue</NuxtLink>
            <nav class="docs-app-nav">
              <NuxtLink to="/docs">Docs</NuxtLink>
              <NuxtLink to="/docs/components">Components</NuxtLink>
              <NuxtLink to="/docs/registry">Registry</NuxtLink>
              <NuxtLink to="/docs/examples">Examples</NuxtLink>
            </nav>
          </div>
        </header>
        <NuxtPage />
      </div>
    );
  },
});
