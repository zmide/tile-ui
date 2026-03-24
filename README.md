# Tile UI

基于 SCSS + CSS Module 的轻量级 React + Vue 双架构组件库，遵循 shadcn registry 规范进行组件分发。

## 项目结构

```
tile-ui/
├── packages/
│   ├── core/                    # @tile-ui/core - 框架无关的类型、逻辑、工具函数
│   ├── styles/                  # @tile-ui/styles - SCSS 设计系统
│   ├── react/                   # @tile-ui/react - React 组件 + Hooks
│   └── vue/                     # @tile-ui/vue - Vue TSX 组件 + Composables
├── apps/
│   ├── react-demo/              # Next.js 15 演示站
│   └── vue-demo/                # Nuxt 3 演示站
├── registry/
│   └── tile-ui/                 # shadcn registry 分发目录（自包含组件源码）
│       ├── button/              # Button 组件
│       ├── input/               # Input 组件
│       ├── textarea/            # Textarea 组件
│       ├── label/               # Label 组件
│       ├── card/                # Card 组件
│       ├── hooks/               # React Hooks
│       ├── lib/                 # 工具函数
│       └── styles/              # SCSS 全局样式 + 变量
├── registry.json                # shadcn registry 清单
├── components.json              # shadcn CLI 配置
└── scripts/
    └── build-registry.js        # 同步 packages/ -> registry/tile-ui/
```

## 组件

| 组件 | 描述 |
|---|---|
| **Button** | 多变体按钮，支持 loading、asChild、6 种变体、4 种尺寸 |
| **Input** | 输入框，支持 label、error 校验、helperText |
| **Textarea** | 文本域，支持 label、error 校验、helperText |
| **Label** | 表单标签，基于 Radix Label，支持必填标记 |
| **Card** | 卡片容器，含 Header/Title/Description/Content/Footer |

## Hooks

| Hook | 描述 |
|---|---|
| `useLocalStorage` / `useSessionStorage` | 存储管理 |
| `useWindowSize` / `useMediaQuery` / `useIsMobile` | 响应式 |
| `useOnlineStatus` | 网络状态 |
| `useScrollPosition` | 滚动位置 |
| `useCopyToClipboard` | 剪贴板 |
| `useClickOutside` | 点击外部检测 |
| `useKeyPress` | 键盘事件 |
| `useMousePosition` | 鼠标位置 |

## 使用方式

### 通过 shadcn CLI 安装组件

```bash
# 从部署的 registry 安装
pnpm dlx shadcn@latest add https://tile-ui.dev/r/button.json
pnpm dlx shadcn@latest add https://tile-ui.dev/r/card.json
pnpm dlx shadcn@latest add https://tile-ui.dev/r/use-local-storage.json
```

### 通过 npm 包使用

```bash
pnpm add @tile-ui/react @tile-ui/styles @tile-ui/core
```

```tsx
import { Button, Card, Input } from '@tile-ui/react';
import '@tile-ui/styles/scss/globals.scss';
```

## 开发

```bash
pnpm install
pnpm build              # 构建所有包
pnpm dev                # 启动所有 dev server
pnpm registry:build     # 同步 + 生成 registry JSON
```

## 许可证

MIT
