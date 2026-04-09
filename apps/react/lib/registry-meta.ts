import registry from '../public/r/registry.json';

export const reactRegistryMeta = registry;
export const reactRegistryItemNames = registry.items.map((item) => item.name);
