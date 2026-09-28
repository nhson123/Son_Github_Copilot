# React + Vite

## API configuration

For Codespaces, define `VITE_CODESPACE_NAME` in `octofit-tracker/frontend/.env.local` using the Codespace name only, without a protocol or domain:

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

Restart Vite after changing the value. When it is unset, the API client safely uses `http://localhost:8000` and never builds an `https://undefined-8000...` URL.

Start the presentation tier with `npm run dev` from `octofit-tracker/frontend`. The backend API is expected on port `8000`.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
