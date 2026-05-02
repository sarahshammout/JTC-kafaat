<<<<<<< HEAD
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
=======
# kafaat-JTC
# JTC — Jordan Technology Center

> Part of the **Kafa'at** initiative — bridging the digital divide in Jordan.

JTC is a frontend web application that connects laptop donors with people in need. Donors submit their unused laptops through the public page, the team refurbishes them, and recipients receive working devices for education or work.

---

## Features

### Public Page (`/jtc`)
- **Donate a Laptop** — form with full validation, saves directly to the admin dashboard
- **Request a Laptop** — for students, job seekers, and families in need
- **Arabic / English toggle** — full RTL support with translated content
- **Floating K animation** — ambient background with Latin K and Arabic ك characters
- **Page transitions** — cinematic dark overlay with animated K between routes

### Admin Dashboard (`/jtc/admin`)
| Page | Description |
|---|---|
| Dashboard | Overview with date/city filters, stat cards, and laptop table |
| Laptops | Add, delete, and filter laptops by phase (Available / Fixing / Distributed) |
| Donations | All donation form submissions from the public page |
| Requests | All laptop request submissions from the public page |
| Store Products | Manage Mashghool handmade products |
| Store Orders | Track customer orders |

---

## Project Structure

```
src/
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── AppLayout.tsx        # Admin sidebar layout
│   ├── FloatingKs.tsx       # Ambient K particle animation
│   ├── LoadingPage.tsx      # Page transition wrapper
│   ├── MainNav.tsx          # Top navigation bar
│   └── ProjectLayout.tsx   # Theme wrapper (teal/JTC theme)
├── lib/
│   ├── adminShared.tsx      # Shared types + UI components (Th, Td, Modal...)
│   ├── laptopStore.ts       # localStorage CRUD for laptops
│   ├── submissionStore.ts   # localStorage for donation & request forms
│   ├── productStore.ts      # localStorage for products & orders
│   ├── translations.ts      # EN/AR content (full bilingual support)
│   └── utils.ts             # Tailwind class helpers
└── pages/
    ├── JTC.tsx              # Public-facing page
    ├── Dashboard.tsx        # Admin overview
    ├── Laptops.tsx          # Laptop management
    ├── Donations.tsx        # Donation submissions
    ├── Requests.tsx         # Laptop requests
    ├── StoreProducts.tsx    # Store product management
    └── StoreOrders.tsx      # Store order tracking
```

---

## Data Flow

```
User submits donate/request form (JTC.tsx)
        ↓
  Validation (required fields, email format)
        ↓
  addDonation() / addRequest()
        ↓
  localStorage (browser)
        ↓
  Admin Donations / Requests pages read & display
```

All data is stored in the browser's `localStorage` — no backend or database required.

| localStorage key | Contents |
|---|---|
| `jtc-laptops` | All laptops (seeded with mock data on first load) |
| `jtc-donations` | Donation form submissions |
| `jtc-requests` | Request form submissions |
| `jtc-products` | Store products (starts empty) |
| `jtc-orders` | Store orders (starts empty) |

---

## Tech Stack

| Technology | Usage |
|---|---|
| React + TypeScript | UI and type safety |
| Tailwind CSS | Styling |
| React Router v6 | Client-side routing |
| shadcn/ui | UI component library |
| Lucide React | Icons |
| localStorage | Frontend data persistence |
| Google Fonts | Space Grotesk + Inter |

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## Routes

| Path | Page |
|---|---|
| `/` | JTC public page |
| `/jtc` | JTC public page |
| `/jtc/admin` | Admin Dashboard |
| `/jtc/admin/laptops` | Laptop management |
| `/jtc/admin/donations` | Donation submissions |
| `/jtc/admin/requests` | Laptop requests |
| `/jtc/admin/store` | Store products |
| `/jtc/admin/orders` | Store orders |

---

## Internationalization

The app supports full Arabic (RTL) and English (LTR) switching on the JTC public page. All content including nav labels, form fields, placeholders, validation messages, and success states are translated in `src/lib/translations.ts`.

---

## Built With

Built as part of the **Kafa'at** multi-project platform — a Jordanian initiative empowering communities through technology.
---

*© 2026 Kafa'at — Jordan Technology Center (JTC
>>>>>>> 03f78ceb03637a07ad3f2d7e222d1600564e3ed9
