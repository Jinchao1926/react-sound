# React Sound

A Netease Music-inspired web player built with React & TypeScript. Learning project exploring modern web development practices.

## Tech Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| **UI Framework** | React 18.3 | Modern hooks API, concurrent features, excellent ecosystem |
| **Build Tool** | Vite 5 | Lightning-fast HMR, optimized bundle splitting, native ES modules |
| **Language** | TypeScript 5.4 | Type safety, better IDE support, refactoring confidence |
| **Routing** | React Router 6 | Industry standard, flexible nested routes, first-class transitions support |
| **State Management** | TanStack React Query 5.81 | Server state management, automatic caching, request deduplication, built-in devtools |
| **HTTP Client** | Axios 1.3 | Promise-based, interceptors for auth/error handling, request cancellation |
| **Styling** | Styled Components 5.3 | CSS-in-JS, dynamic theming, scoped styles, better maintainability |
| **Code Quality** | ESLint 8 + Prettier 3 | Consistent code style, pre-commit hooks with Husky |

## Architecture

```
src/
├── modules/          # Feature modules (Discover, Mine, Friend, DJRadio, Detail, Download)
│   └── [Feature]
│       ├── components/   # Feature-specific components
│       ├── hooks/        # Feature-specific hooks
│       ├── routes.tsx    # Route definitions
│       └── index.tsx
├── components/       # Shared UI components (reusable across modules)
├── hooks/           # Custom hooks (usePlayerContext, usePlayer, etc.)
├── providers/       # React Context providers (AxiosProvider, QueryClientProvider)
├── routers/         # Global route configuration
├── types/           # TypeScript type definitions
├── utils/           # Utility functions (image formatting, storage, etc.)
├── constants/       # Application constants
├── App.tsx          # Root component
└── index.tsx        # Entry point
```

## Quick Start

```bash
yarn install      # Install dependencies
yarn dev          # Start dev server (http://localhost:3000)
yarn build        # Build for production
yarn build:analyze # Analyze bundle size
```

## Configuration

Create `.env` in project root:
```env
VITE_API_BASE_URL=https://api.example.com
```

## Key Features

- **Module-based organization**: Self-contained feature modules (Discover, Mine, Friend, DJRadio, Detail, Download)
- **React Query integration**: Server state management with automatic caching & deduplication
- **Performance optimized**: Bundle splitting, image optimization, code splitting
- **Type-safe routing**: RouteBuilder for type-safe route generation
- **Development tools**: ESLint + Prettier with pre-commit hooks

---

📊 查看 [优化记录](./optimization.md) 了解项目优化历程（-42.6% 包体积，-79.7% 图片加载）
