# Next.js UI Starter

Next.js (App Router) + JavaScript, no TypeScript.

## Run

```bash
npm install
npm run dev
```

## Structure

```
src/
├── app/
│   ├── layout.js          # fonts + global css
│   ├── globals.css
│   ├── page.js            # demo page
│   └── page.module.css
├── components/ui/
│   ├── Heading/           # Host Grotesk 700, 56px / 70px, #09041D
│   ├── Paragraph/         # Inter 400, 16px / 24.8px, #333743
│   ├── Button/            # 136x48, radius 8, gradient bg, Inter 500
│   └── index.js           # barrel export
└── lib/
    ├── fonts.js           # Inter + Host Grotesk (next/font)
    └── utils.js           # cn() helper
```

## Usage

```jsx
import { Heading, Paragraph, Button } from "@/components/ui";

<Heading className="my-class">Title</Heading>
<Heading as="h2">Sub title</Heading>
<Paragraph className="my-class">Text</Paragraph>
<Button className="my-class" onClick={handleClick}>Click</Button>
```

Har component `className` prop leta hai, jo default styles ke saath merge hota hai.
