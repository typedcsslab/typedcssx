# Typed CSS X

**Zero-runtime CSS in JS and Compiler**

- For Next.js App router(RSC)
- Console lover
- Server Component
- Client Component
- Zero-runtime (statically generated during build)
- Hot Reload (A smooth development experience)
- Hard Type (Benefit from type completion development experience)
- Media (Media Query provides modern functions)

All types are Property(CamelCase): String and can't write directly to a tsx file.  
In development mode with we can see hot reloading preview by adding 'use client'.

## Scoped.style

```ts
import { Scoped } from 'typedcssx';

export const style = Scoped.style({
  fontSize: '16px',
  color: 'black',
});
```

## Scoped.sheet

```ts
export const styles = Scoped.sheet({
  header_nav: {
    position: 'absolute',
    top: '0',
  },
});
```

## Example of use

```tsx
import { styles } from './style.css';

const Header = () => {
  return (
    <header className={styles.header_nav}>
      <nav>
        <a>content</a>
        <a>home</a>
      </nav>
    </header>
  );
};
```

## Global API

Scoped.gloabl and Scoped.root is do not use it in a variable scope.  
Wherever they are, the compiler reads them and writes them to the StyleSheet.

```ts
Scoped.global({
  h1: {
    color: 'var(--color-font)',
    background: 'var(--color-background)',
  },
});

Scoped.root({
  '--color-font': '#333',
  '--color-background': '#fff',
});
```

## MediaQuery

```ts
import { Scoped, media } from 'typedcssx';
const small = media('300px <= width <= 600px');
const xlarge = media('200px <= width <= 1400px');

export const styles = Scoped.sheet({
  header_nav: {
    fontSize: '18px',
    color: 'white',
    ...small({
      fontSize: '12px',
      color: 'pink',
    }),
  },
  ...small({
    footer_nav: {
      margin: '24px'
      padding: '24px'
    },
  })
});
```

It's can enclose selectors or properties directly.  
media is a higher-order function, so you can directly create wrapper functions for small, large, etc.

## Build Setting and Global CSS

add file extension in tsconfig.json

```json
  "include": ["**/*.css.ts"]
```

add package.json scripts field.

```json
  "scripts": {
    "build": "npm run compile && next build",
    "compile": "cd node_modules/typedcssx && npm run compile"
  }
```

import the global style in layout.tsx

```tsx
import '../../node_modules/typedcssx/dist/core/styles/global.css';
```

## License

MIT License
