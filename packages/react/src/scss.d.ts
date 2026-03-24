declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.scss' {
  const content: string;
  export default content;
}

declare module '@tile-ui/styles/scss/components/button.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '@tile-ui/styles/scss/components/input.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '@tile-ui/styles/scss/components/textarea.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '@tile-ui/styles/scss/components/label.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '@tile-ui/styles/scss/components/card.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
