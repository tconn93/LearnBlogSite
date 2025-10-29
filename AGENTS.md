# AGENTS.md

## Build/Lint/Test Commands

### Backend (Node.js/Express/Sequelize)
- Start dev server: `cd backend && npm run dev` (uses nodemon)
- No build command defined.
- Tests: None configured (`npm test` echoes error). Add Jest/Mocha if needed.
- Run single test: N/A (implement tests first, e.g., `npm test -- --testNamePattern=TestName` with Jest).

### Frontend (React/Vite)
- Start dev server: `cd frontend && npm run dev`
- Build: `cd frontend && npm run build`
- Lint: `cd frontend && npm run lint` (ESLint)
- Preview build: `cd frontend && npm run preview`
- Tests: None configured. Use Vitest/Jest for React tests.
- Run single test: N/A (add tests, e.g., `npm test -- src/components/MyTest.jsx` with Vitest).

Run from root: Use `npm run` in respective dirs. No monorepo scripts.

## Code Style Guidelines

- **Language**: JavaScript (ES6+ modules in frontend: `"type": "module"`).
- **Naming**: PascalCase for React components (e.g., HomePage.jsx), camelCase for functions/variables, kebab-case for CSS files.
- **Imports**: ES6 `import/export`. Relative paths (e.g., `import Blog from '../models/Blog.js'`). No absolute imports unless configured.
- **Formatting**: Use ESLint (frontend: plugins for React hooks/refresh). Run `npm run lint` before commits. Assume 2-space indent, semicolons.
- **Types**: Plain JS, no TypeScript. Use JSDoc for docs if needed.
- **Error Handling**: Backend: Try-catch in routes, Sequelize error handling. Frontend: Error boundaries in React, axios error catches.
- **Conventions**: Follow React functional components/hooks. Backend: RESTful Express routes, Sequelize models/migrations.
- **Security**: Never commit secrets (.env ignored). Use CORS in backend.
- **Files**: Backend in /backend (models in JS), Frontend in /frontend (components in src/admin, src/viewer, etc.).
- No Prettier config found; align with existing code style.

No Cursor rules (.cursor/rules/) or Copilot instructions (.github/copilot-instructions.md) present.
