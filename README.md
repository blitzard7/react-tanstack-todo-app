# 📝 React Todo App (Demo)

This is a small React Todo app built just for fun — mainly to play around with different tools and libraries in a modern stack. It's **not** production-ready, just a playground/demo project.

## 🚀 Tech Stack

Here's what this project is using:

- ⚛️ [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) – bootstrapped with [create-tsrouter-app](https://github.com/TanStack/create-tsrouter-app/tree/main/cli/create-tsrouter-app) by TanStack
- 🧭 [TanStack Router](https://tanstack.com/router/latest) – for routing
- 🧠 [Zustand](https://zustand.docs.pmnd.rs/getting-started/introduction) – for simple and minimal state management
- 🎨 [TailwindCSS](https://tailwindcss.com/) – for utility-first styling
- 🧾 [react-hook-form](https://react-hook-form.com/) – for handling forms
- 🔒 [Zod](https://zod.dev/) – for schema validation

## ▶️ Getting Started

1. **Clone the repo**:
   ```bash
   git clone https://github.com/blitzard7/react-tanstack-todo-app.git
   cd todo-demo
   ```
2. **Install dependencies**:
   ```bash
   pnpm install
   ```
3. **Start the dev server**:
   ```bash
   pnpm dev
   ```

## Current Features

➕ Add new todos with:

- Title
- Description
- Deadline (no past dates allowed)
- Priority (Low, Medium, High)

🔍 Search todos
