# Tallest Tiptoes — Developer Setup Guide

## Prerequisites

Install these if you don't have them:

1. **Node.js** (v18 or later) — https://nodejs.org
2. **Git** — https://git-scm.com
3. **A code editor** — VS Code recommended (https://code.visualstudio.com)

To check if you have them, open Terminal and run:
```
node --version
git --version
```

---

## Step 1: Clone your repo

```bash
git clone https://github.com/estelle-botton1/tallest-tiptoes.git
cd tallest-tiptoes
```

---

## Step 2: Create a React project

We'll use Vite (fast, modern React setup):

```bash
npm create vite@latest . -- --template react
```

If it asks to overwrite files, say yes (it won't touch your pages/ or docs/ folders).

Then install dependencies:

```bash
npm install
```

---

## Step 3: Install the fonts

The wireframes use Google Fonts. Open `index.html` in the root and add this inside the `<head>` tag:

```html
<link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Serif+Display:ital@0;1&family=Dancing+Script:wght@400;500;600&display=swap" rel="stylesheet">
```

---

## Step 4: Set up routing

Install React Router so each page has its own URL:

```bash
npm install react-router-dom
```

Then replace the contents of `src/App.jsx` with:

```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "../pages/homepage-final";
import TheForum from "../pages/the-forum";
import TheEdit from "../pages/the-edit";
import TheShop from "../pages/the-shop";
import HisNotHers from "../pages/his-not-hers";
import TheGuide from "../pages/the-guide";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/the-forum" element={<TheForum />} />
        <Route path="/the-edit" element={<TheEdit />} />
        <Route path="/the-shop" element={<TheShop />} />
        <Route path="/his-not-hers" element={<HisNotHers />} />
        <Route path="/the-guide" element={<TheGuide />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

---

## Step 5: Clean up default styles

Replace the contents of `src/index.css` with:

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Hide scrollbars on nav */
::-webkit-scrollbar {
  display: none;
}
```

Delete `src/App.css` (you won't need it).

---

## Step 6: Run it

```bash
npm run dev
```

Open the URL it shows (usually http://localhost:5173). You should see the homepage.

Navigate to:
- http://localhost:5173/the-forum
- http://localhost:5173/the-edit
- http://localhost:5173/the-shop
- http://localhost:5173/his-not-hers
- http://localhost:5173/the-guide

---

## Step 7: Make the nav links work

Right now the nav links in each page are just styled spans. To make them actually navigate, you'll want to replace the nav spans with React Router Links. For example, in any page file, change:

```jsx
// From this:
<span style={{...}}>The Forum</span>

// To this (add import at top of file):
import { Link } from "react-router-dom";

<Link to="/the-forum" style={{...textDecoration: "none"}}>The Forum</Link>
```

Do this across all page files for the section nav.

---

## Step 8: Deploy

When you're ready to go live, the easiest options:

### Vercel (recommended, free)
1. Push your code to GitHub
2. Go to https://vercel.com
3. Sign in with GitHub
4. Click "Import Project" and select your repo
5. It auto-detects Vite and deploys
6. You get a URL like tallest-tiptoes.vercel.app
7. Connect your custom domain later

### Netlify (also free)
1. Go to https://netlify.com
2. Sign in with GitHub
3. "New site from Git" → select your repo
4. Build command: `npm run build`
5. Publish directory: `dist`

---

## Folder Structure (after setup)

```
tallest-tiptoes/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── App.jsx          ← routing
│   ├── main.jsx         ← entry point (don't touch)
│   └── index.css        ← global styles
├── pages/
│   ├── homepage-final.jsx
│   ├── the-forum.jsx
│   ├── the-edit.jsx
│   ├── the-shop.jsx
│   ├── his-not-hers.jsx
│   └── the-guide.jsx
├── docs/
│   └── tallest-tiptoes-creative-brief.md
└── README.md
```

---

## Next Steps After Running

1. Replace placeholder image blocks with real images
2. Replace placeholder text with real content
3. Swap the SVG tiptoes drawing with your actual gif
4. Add real product data to The Shop
5. Connect a CMS (like Sanity, Contentful, or Notion) for blog posts
6. Add Shopify Buy Button or Stripe for payments in The Shop
7. Build the Honesty Box with a form service (Formspree, Tally, or custom)
