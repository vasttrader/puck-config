# @vasttrader/puck-config

Prebuilt Puck editor components with TinyMCE integration for Next.js applications.

## 🚀 Installation
```bash
npm install @vasttrader/puck-config
# or
yarn add @vasttrader/puck-config
# or
pnpm add @vasttrader/puck-config
```

## 📦 Peer Dependencies

Make sure you have these installed:
```bash
npm install react react-dom next @puckeditor/core
```

## 🎯 Components

- **Editor**: Rich text editor 
- **Space**: Flexible spacing component with responsive controls
- **Image**: Image component.
- **Accordion**: Collapsible accordion with multiple variants

## 📖 Usage

### Basic Setup
```typescript
// app/editor/page.tsx
"use client";

import { Puck } from "@puckeditor/core";
import { puckConfig } from "@vasttrader/puck-config";
import "@puckeditor/core/puck.css";

export default function EditorPage() {
  return (
    <Puck
      config={puckConfig}
      data={{
        content: [],
        root: {},
      }}
      onPublish={(data) => {
        console.log("Published:", data);
      }}
    />
  );
}
```

### Using Individual Components
```typescript
import type { Config } from "@puckeditor/core";
import { Editor, Space, Image, Accordion } from "@vasttrader/puck-config";

export const puckConfig: Config = {
  categories: {
    typography: {
      components: ["Editor"],
    },
    media: {
      components: ["Image"],
    },
    layout: {
      components: ["Space"],
    },
    surfaces: {
      components: ["Accordion"],
    },
  },
  components: {
    Editor,
    Image,
    Space,
    Accordion,
  },
};

```

## 🎨 Customization

All components include CSS classes for easy customization. See individual component documentation for class names.

### Example: Custom Accordion Styling
```css
.puck-accordion-trigger {
  background: linear-gradient(to right, #eff6ff, #ffffff);
}

.puck-accordion-title {
  color: #1e40af;
  font-family: 'Inter', sans-serif;
}
```

## 🔧 Next.js Configuration

For external images, configure `next.config.js`:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
```

## 📄 License

MIT © Vast Trader

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## 🐛 Issues

Report issues at: https://github.com/vasttrader/puck-config/issues
