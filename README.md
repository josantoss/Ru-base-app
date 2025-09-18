### Ru Base App

A starter React application demonstrating authentication, role-based authorization, and a clean routing setup using React Router. Built with TypeScript and Vite, styled with Tailwind CSS.

---

### Tech stack
- **React 19** with **TypeScript**
- **Vite 7** for dev/build
- **React Router v6** for routing
- **Tailwind CSS v4** for styling
- **ESLint 9** + TypeScript ESLint
- **jwt-decode** for parsing JWTs

---

### Getting started
1) Install dependencies
```bash
npm install
```

2) Run the dev server
```bash
npm run dev
```

3) Build for production
```bash
npm run build
```

4) Preview the production build
```bash
npm run preview
```

Lint (optional)
```bash
npm run lint
```

---

### Project structure
```text
Ru-base-app/
  public/
  src/
    assets/
    contexts/            # Auth context provider and definitions
    data/repositories/   # Example repository layer (e.g., Authrepository)
    domain/              # Entities and use cases (clean architecture style)
    hooks/               # Reusable hooks: useAuth, useAuthorization
    presentation/
      components/        # Layout, Navbar, ProtectedRoute, RoleGuard
      pages/             # Landing, Home, About, Login, Signup, Categories, Users, Roles
      routes/            # Route objects and router setup
    types/
    App.tsx
    main.tsx
  index.html
  vite.config.ts
  tailwind.config.js
  postcss.config.js
  tsconfig*.json
  eslint.config.js
```

---

### Routing and authorization
- Public routes: `Landing`, `Home`, `About`, `Login`, `Signup`
- Protected routes: `Categories`, `Users`, `Roles`
- `ProtectedRoute` ensures authentication; `RoleGuard` enforces required roles per route.
- Example route configuration is defined in `src/presentation/routes/routeObjects.ts` with loaders for mock data.

Required roles by page (defaults in the repo):
- `Categories`: `user`
- `Users`: `moderator`
- `Roles`: `admin`

---

### Authentication model
- `AuthProvider` wraps the app (`src/main.tsx`) and exposes auth state via context.
- Tokens are decoded with `jwt-decode`. You can integrate real login flows in `data/repositories/Authrepository.ts` and `domain/usecases/AuthUseCases.ts`.

---

### Styling
- Tailwind CSS v4 is configured. Global styles in `src/index.css` and `src/App.css`.
- `vite.config.ts` includes PostCSS and Less preprocessor options with a primary color set to `#014582`.

---

### Environment variables
Create a `.env` or `.env.local` in the project root for any runtime configuration. Vite exposes variables prefixed with `VITE_`.
```env
VITE_API_BASE_URL=https://api.example.com
```

Use via `import.meta.env.VITE_API_BASE_URL`.

---

### Scripts
- `npm run dev`: start the dev server
- `npm run build`: type-check + production build
- `npm run preview`: preview the production build
- `npm run lint`: run ESLint

---

### Development notes
- Routes are defined as objects and composed under a top-level layout. Errors render a friendly fallback with a link back to `Home`.
- Mock loaders simulate network calls; replace with real data fetching as needed.
- Keep domain/usecase layers framework-agnostic; presentation stays in React.

---

### Deployment
Any static host works (e.g., Vercel, Netlify, GitHub Pages). Build the app and deploy the `dist/` folder.
```bash
npm run build
# deploy ./dist
```

---

### License
MIT
