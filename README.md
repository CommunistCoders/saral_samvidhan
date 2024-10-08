## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

For backend server

```bash
node server.js
```

```
saral_samvidhan/
├── app/                      # App Router directory
│   ├── blog/                 # Blog page folder
│   │   └── page.js           # Blog page component
│   ├── layout.js             # Layout for the entire app
│   ├── page.js               # Home page component
│   └── about/                # About page folder (if applicable)
│       └── page.js           # About page component (if applicable)
├── components/               # Reusable components
│   └── Navbar.jsx            # Navbar component
├── public/                   # Public static assets
│   ├── favicon.ico           # Favicon file
│   ├── fonts/                # Custom fonts folder
│   │   ├── MyCustomFont-Regular.woff2
│   │   └── MyCustomFont-Bold.woff2
│   └── images/               # Images folder (if needed)
├── styles/                   # CSS files
│   └── globals.css           # Global styles
├── package.json              # Project metadata and dependencies
├── next.config.js            # Next.js configuration (if any)
└── README.md                 # Project documentation
```
