# @tile-ui/styles

[English](./README.md) | [简体中文](./README.zh-CN.md)

Tile UI 运行时设计系统的共享 SCSS 源文件和编译后 CSS。

## 安装

```bash
pnpm add @tile-ui/styles
```

## 包含的资源

- Tile 扩展令牌：`@tile-ui/styles/tokens.css`、`@tile-ui/styles/tokens.scss`
- 可选默认主题：`@tile-ui/styles/theme.css`、`@tile-ui/styles/theme.scss`
- Reset 和全局基础样式：`@tile-ui/styles/reset.css`、`@tile-ui/styles/reset.scss`
- 向后兼容的组合入口：`@tile-ui/styles/globals.css`、`@tile-ui/styles/globals.scss`
- `@tile-ui/styles/css/*` 下的组件样式
- `@tile-ui/styles/scss/*` 下的 SCSS 模块和令牌

## 使用方式

```ts
import '@tile-ui/styles/globals.css';
import '@tile-ui/styles/css/components/button.css';
```

`globals.css` 是向后兼容的桥接入口。它同时安装 Tile 的默认 shadcn 调色板和 reset，以保留此包之前的行为。已经自行维护 shadcn 变量的应用应分别加载 Tile 扩展令牌、reset 和组件样式：

```ts
import '@tile-ui/styles/tokens.css';
import '@tile-ui/styles/reset.css';
import '@tile-ui/styles/css/components/button.css';
```

## 运行时主题

Tile 组件在运行时使用标准的 shadcn 语义变量：

```css
:root {
	--background: #ffffff;
	--foreground: #18181b;
	--card: #ffffff;
	--card-foreground: #18181b;
	--popover: #ffffff;
	--popover-foreground: #18181b;
	--primary: #18181b;
	--primary-foreground: #fafafa;
	--secondary: #f4f4f5;
	--secondary-foreground: #18181b;
	--muted: #f4f4f5;
	--muted-foreground: #71717a;
	--accent: #f4f4f5;
	--accent-foreground: #18181b;
	--destructive: #ef4444;
	--destructive-foreground: #fafafa;
	--border: #e4e4e7;
	--input: #e4e4e7;
	--ring: #18181b;
	--radius: 0.5rem;
}
```

可选默认主题还提供 `--chart-1` 到 `--chart-5` 以及标准的 `--sidebar*` 变量。`tokens.css` 只会在 `--tile-*` 命名空间下安装 Tile 专用的字面量默认值。由语义变量派生的值，例如悬停颜色、字段状态、阴影规则、字体别名和圆角层级，会直接以 `var(--tile-primary-hover, color-mix(...))` 这类 fallback 形式写入组件 CSS。这样既能让它们根据最近的作用域主题重新计算，又保留 `--tile-*` 作为显式覆盖入口。安装的默认值使用零选择器优先级，因此导入后不会替换应用已有的 `:root` 或 `.dark` 值。

当 Tile 需要负责默认的明暗 shadcn 调色板时，请先加载 `theme.css`，再加载 `reset.css`。与 `tokens.css` 不同，此入口会声明 `--background`、`--primary` 及其他标准语义变量；如果应用样式加载得更晚，仍遵循正常的 CSS 层叠顺序。

```ts
import '@tile-ui/styles/theme.css';
import '@tile-ui/styles/reset.css';
```

## 独立主题

共享组件样式通过带默认 fallback 的 CSS 自定义属性提供视觉接口。独立主题包负责提供外观值；本包不选择或识别具体主题。

在应用入口导入所选主题的 CSS 或 Sass。独立调色板不要与默认 `theme.*` 或 `globals.*` 调色板混用，组件样式照常导入。应用负责模式标记、持久化、系统偏好和字体；模式选择器和安装方式参阅所选主题自身的文档。

`createThemeVariables` 和 `applyThemeVariables` 生成默认调色板的具体值，不是独立主题的通用模式切换机制。

## Sass 兼容入口

```scss
@use '@tile-ui/styles/scss/variables/colors' as *;
@use '@tile-ui/styles/scss/mixins/utils' as *;
```

旧版 Sass 名称仍然可用，但面向主题的名称现在会编译为 CSS 变量引用，而不是固定的 Sass 颜色。

## 构建

此包使用 `node build.js` 将 `scss/` 编译到 `css/`。

```bash
pnpm --filter @tile-ui/styles build
pnpm --filter @tile-ui/styles lint
```
