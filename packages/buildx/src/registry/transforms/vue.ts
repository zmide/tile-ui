import type { TransformFileInput, TransformFileOutput } from '../types';

export async function transformVueFile(
  input: TransformFileInput
): Promise<TransformFileOutput> {
  if (input.file.transform === 'vue-component') {
    const content = input.content
      .replace(/from '@tile-ui\/core';/g, "from '../lib/core';")
      .replace(
        /import styles from '@tile-ui\/styles\/scss\/components\/(.+?)\.module\.scss';/g,
        "import styles from './$1.module.scss';"
      );

    return {
      content,
      target: input.file.target ?? `components/ui/${input.item.name}/${input.item.name}.tsx`,
    };
  }

  if (input.file.transform === 'vue-composable') {
    return {
      content: input.content,
      target: input.file.target,
    };
  }

  return {
    content: input.content,
    target:
      input.file.target ??
      (input.file.transform === 'style'
        ? `components/ui/${input.item.name}/${input.item.name}.module.scss`
        : undefined),
  };
}
