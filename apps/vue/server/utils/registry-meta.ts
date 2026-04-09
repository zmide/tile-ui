import registry from '../../public/r/registry.json';

export const vueRegistryMeta = registry;
export const vueRegistryItemNames = registry.items.map((item) => item.name);
