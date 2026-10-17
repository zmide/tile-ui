# @tile-ui/theme-kumo

[English](./README.md) | [简体中文](./README.zh-CN.md)

为 Tile UI 组件换上 Kumo 风格的外观。React、Vue、Solid 都能使用，自带亮色和暗色模式。

**已经在用 Tile UI？安装这个包，替换默认主题的导入，组件继续照常使用。** 不需要额外添加 Provider，也不用修改组件属性。

## 1. 安装

```bash
pnpm add @tile-ui/theme-kumo @tile-ui/styles
```

这是主题包，不是组件库。继续保留项目中的 `@tile-ui/react`、`@tile-ui/vue` 或 `@tile-ui/solid` 及组件导入。需要搭配 `@tile-ui/styles` 的 `^1.1.3` 版本使用。

## 2. 在应用入口导入一次

```ts
import '@tile-ui/theme-kumo/theme.css';
import '@tile-ui/styles/reset.css'; // 可选：项目已有 CSS reset 时可以省略。
```

原有的组件样式导入继续保留。这个包负责提供外观值，不包含组件 CSS，也不会自动下载字体。

**请移除原来的默认主题导入**，例如 `@tile-ui/styles/theme.css`、`@tile-ui/styles/globals.css`，以及对应的 Sass 或 `/css/` 路径版本，避免两套调色板互相覆盖。主题已包含 Tile 的扩展变量，无需再单独导入 `tokens.css`。

### 应该写在哪个文件？

| 应用               | 建议位置         |
| ------------------ | ---------------- |
| React / Vite       | `src/main.tsx`   |
| Next.js App Router | `app/layout.tsx` |
| Vue / Vite         | `src/main.ts`    |
| Solid / Vite       | `src/index.tsx`  |
| SolidStart         | `src/app.tsx`    |

Nuxt 项目可以直接配置 `nuxt.config.ts`：

```ts
export default defineNuxtConfig({
	css: [
		'@tile-ui/theme-kumo/theme.css',
		'@tile-ui/styles/reset.css', // 可选。
	],
});
```

### 项目使用 Sass？

如果构建工具已支持 Sass，可以把上面的 CSS 导入换成：

```scss
@use '@tile-ui/theme-kumo/theme.scss';
@use '@tile-ui/styles/reset.scss'; // 可选。
```

CSS 和 Sass **选一种即可**，不必同时导入。直接用 CSS 最简单，不需要额外配置 Sass。

## 3. 切换亮色和暗色

默认是亮色。在页面的 `<html>` 上设置 `data-theme` 即可切换：

```html
<html data-theme="dark"></html>
```

在客户端代码中可以这样操作：

```js
// 切换为暗色。
document.documentElement.setAttribute('data-theme', 'dark');

// 切回亮色。
document.documentElement.setAttribute('data-theme', 'light');
```

项目原本使用 `.light` / `.dark` 类名也可以，继续沿用即可。类名和属性选一种；同时使用时，请保持它们一致。切换时不需要重新加载 CSS，也不需要添加主题 Provider。

是否记住用户选择、是否跟随系统，由应用决定；可以继续使用已有的亮暗模式管理工具。服务端渲染项目尽量在首屏显示前设置好模式，并保持服务端与客户端初始标记一致，避免闪屏或水合不一致。

## 想稍微调整一下外观？

在主题之后加载自己的覆盖样式即可，例如：

```css
:root {
	--tile-font-sans: 'Avenir Next', sans-serif;
	--tile-button-height: 2.5rem;
}
```

字体需要用户设备已安装，或由应用自行加载。主题包不会联网获取字体。

## 使用 registry 复制源码

如果项目已配置对应框架的 Tile UI registry，也可以不用安装主题 npm 包，改为执行：

```bash
pnpm dlx shadcn@latest add @tile-ui/theme-kumo
```

完成后，在应用入口按本地实际路径导入复制得到的 `styles/themes/kumo.scss`。Nuxt 项目也可以把本地路径加入 `css` 列表。

请保留一起复制的 Sass partial 文件和 `LICENSE.kumo`，只导入入口文件，不要逐个导入 partial。安装不会自动启用主题，仍需手动导入并移除冲突的默认主题。本地 registry 副本和 npm 包样式选一种，不要同时加载。

## 常见问题

### 导入了，但外观没有变化？

先确认主题已在应用入口加载、组件样式仍然存在，再检查是否还有默认主题或原项目的调色板覆盖它。`createThemeVariables` / `applyThemeVariables` 写入的行内变量也可能覆盖主题；这两个工具生成的是 Tile 默认调色板，切换本主题的亮暗模式不需要调用它们。

### 弹窗、提示框也会跟着变暗吗？

把模式设置在 `html` 上即可，让挂载到 `body` 下的浮层也能继承。任意多层嵌套的亮暗主题组合不在保证范围内。

### 组件的写法需要改吗？

不需要，继续使用 Tile 的组件属性、默认值和交互行为。这是 Kumo 风格的外观，不是上游 Kumo 组件库，也不承诺像素完全一致。部分组件结构和绘制方式不同；请结合自己的内容和定制检查对比度、键盘焦点等表现。

### 图表怎么跟随主题？

没有指定颜色时，Chart 使用主题的 CSS 变量。Liveline 未传入 `theme` 属性时跟随样式中的亮暗模式；显式设置 `theme="light"` 或 `theme="dark"` 则以该属性为准。

## 更多说明

- [React 主题指南](https://react.tileui.zmorg.cn/docs/themes/kumo)
- [Vue 主题指南](https://vue.tileui.zmorg.cn/docs/themes/kumo)
- [Solid 主题指南](https://solid.tileui.zmorg.cn/docs/themes/kumo)

## 许可

MIT。主题改编自 [Cloudflare Kumo](https://github.com/cloudflare/kumo/tree/7e0ff40546f08405d05bc9754f0ff0fd009ece0a)，完整上游许可已包含在 [LICENSE](./LICENSE) 中。重新分发本主题时请保留该文件。
