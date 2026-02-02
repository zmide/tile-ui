# Tile UI - 基于 shadcn registry 规范的 React 组件库

## 简介

Tile UI 是一套基于 **SCSS + CSS Module + TSX + Hooks API + BaseUI** 机制的 React 组件库，遵循 shadcn registry 规范进行组件分发。

## 核心特性

1. **SCSS + CSS Module**：所有样式使用 SCSS 变量和 CSS Module，避免样式冲突
2. **移除 TailwindCSS**：精简依赖，仅保留 sass 作为样式预处理器
3. **Hooks API**：提供可复用的自定义 hooks
4. **BaseUI**：使用 Radix UI 作为基础组件
5. **shadcn registry 规范**：支持使用 shadcn CLI 进行组件分发

## 项目结构

```
tile-ui/
├── registry/                    # shadcn registry 规范目录
│   └── new-york/
│       └── ui/                  # 组件源码
│           ├── button/          # 按钮组件
│           ├── input/           # 输入框组件
│           ├── textarea/        # 文本域组件
│           ├── label/           # 标签组件
│           └── card/            # 卡片组件
├── styles/                      # SCSS 样式系统
│   ├── variables/_colors.scss   # 颜色、字体、间距等变量
│   ├── mixins/_utils.scss       # 混入工具
│   └── globals.scss             # 全局基础样式
├── hooks/                       # 自定义 Hooks
│   ├── use-local-storage.ts     # 本地存储
│   ├── use-media.ts             # 媒体查询
│   └── use-event.ts             # 事件处理
├── lib/                         # 工具函数
│   └── utils.ts                 # cn 类名合并等
├── public/r/                    # 公开的 registry 索引
│   └── registry.json            # 组件注册表
├── components.json              # shadcn CLI 配置
└── registry.json                # 内部 registry 配置
```

## 组件

### UI 组件

- **Button** - 支持多种变体（default、destructive、outline、secondary、ghost、link）和尺寸
- **Input** - 支持标签、错误提示、辅助文本
- **Textarea** - 多行文本输入，支持验证状态
- **Label** - 表单标签，支持必填标记
- **Card** - 卡片容器，包含 Header、Title、Description、Content、Footer

### Hooks

- `useLocalStorage` / `useSessionStorage` - 存储管理
- `useWindowSize` / `useMediaQuery` / `useIsMobile` - 响应式
- `useOnlineStatus` - 网络状态
- `useScrollPosition` - 滚动位置
- `useCopyToClipboard` - 剪贴板操作
- `useClickOutside` - 点击外部检测
- `useKeyPress` - 键盘事件
- `useMousePosition` - 鼠标位置

## 使用方法

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 构建

```bash
npm run build
```

## shadcn Registry 集成

本项目遵循 shadcn registry 规范，支持使用 shadcn CLI 添加组件：

```bash
# 添加组件到项目
npx shadcn@latest add button
```

## 样式定制

所有样式变量定义在 `styles/variables/_colors.scss`，可以通过覆盖这些变量来自定义主题：

```scss
$primary: #your-color;
$radius: 0.5rem;
// 等等...
```

## 许可证

MIT
