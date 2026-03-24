import { defineComponent, h, type PropType } from 'vue';
import { cardStyleKeys } from '@tile-ui/core';
import type { CardElement } from '@tile-ui/core';
import styles from '@tile-ui/styles/scss/components/card.module.scss';

export const TCard = defineComponent({
  name: 'TCard',
  props: {
    as: {
      type: String as PropType<CardElement>,
      default: 'div',
    },
  },
  setup(props, { slots }) {
    return () => h(props.as!, { class: styles[cardStyleKeys.card] }, slots.default?.());
  },
});

export const TCardHeader = defineComponent({
  name: 'TCardHeader',
  setup(_, { slots }) {
    return () => h('div', { class: styles[cardStyleKeys.header] }, slots.default?.());
  },
});

export const TCardTitle = defineComponent({
  name: 'TCardTitle',
  setup(_, { slots }) {
    return () => h('h3', { class: styles[cardStyleKeys.title] }, slots.default?.());
  },
});

export const TCardDescription = defineComponent({
  name: 'TCardDescription',
  setup(_, { slots }) {
    return () => h('p', { class: styles[cardStyleKeys.description] }, slots.default?.());
  },
});

export const TCardContent = defineComponent({
  name: 'TCardContent',
  setup(_, { slots }) {
    return () => h('div', { class: styles[cardStyleKeys.content] }, slots.default?.());
  },
});

export const TCardFooter = defineComponent({
  name: 'TCardFooter',
  setup(_, { slots }) {
    return () => h('div', { class: styles[cardStyleKeys.footer] }, slots.default?.());
  },
});

export default TCard;
