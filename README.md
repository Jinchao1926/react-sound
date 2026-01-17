# React Sound

A Netease Music clone with all pre-login features. Built with React & TypeScript for exploring modern web development practices.

## Tech Stack

| Layer                | Technology                |
| -------------------- | ------------------------- |
| **UI Framework**     | React 18.3                |
| **Build Tool**       | Vite 5                    |
| **Language**         | TypeScript 5.4            |
| **Routing**          | React Router 6            |
| **State Management** | TanStack React Query 5.81 |
| **HTTP Client**      | Axios 1.3                 |
| **Styling**          | Styled Components 5.3     |
| **Code Quality**     | ESLint 8 + Prettier 3     |

## Architecture

```
src/
├── modules/          # Feature modules (Discover, Mine, Friend, DJRadio, Detail, Download)
│   └── [Feature]
│       ├── components/   # Feature-specific components
│       ├── hooks/        # Feature-specific hooks
│       ├── routes.tsx    # Route definitions
│       └── index.tsx
├── components/       # Shared UI components
├── hooks/           # Custom hooks
├── providers/       # React Context providers
├── routers/         # Global route configuration
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
├── constants/       # Application constants
├── App.tsx          # Root component
└── index.tsx        # Entry point
```

## Quick Start

```bash
yarn install          # Install dependencies
yarn dev              # Start dev server (http://localhost:3000)
yarn build            # Build for production
yarn test             # Run tests
yarn lint             # Check code quality
yarn type-check       # TypeScript type checking
```

## Configuration

Create `.env` in project root:

```env
VITE_API_BASE_URL=https://api.example.com
```

## Credits

API provided by [NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)

---

📊 View [Optimization Log](./optimization.md) for project optimization metrics
