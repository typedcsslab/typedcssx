# Typed CSS X

**Zero-runtime CSS in JS and Compiler**

- For Next.js App router(RSC)
- Console lover
- Client Component (Non async Server Component)
- Zero-runtime (statically generated during build)
- Hot Reload (A smooth development experience)
- Hard Type (AutoComplete with TypeScript is works)
- Media (Media Query provides modern functions)

All types are property(camelCase): String | Number.  
The compiler assigns px to number unless there is an exception.

The className property and style are converted to an underscore with a hash as className.  
This can be written directly to a css.ts or css.tsx file.

In development mode with we can see hot reloading preview by adding 'use client'.

## Style.create and Style.set

```ts
import { Style } from 'typedcssx';

export const styles = Style.create({
  header_nav: {
    position: 'absolute',
    top: 0,
  },
});

export const navStyle = Style.set({
  '& a': {
    fontSize: 16,
    color: '#333',
  },
});
```

## Example of use

```tsx
import { styles, navStyle } from './style.css';

const Header = () => {
  return (
    <header className={styles.header_nav}>
      <nav className={navStyle}>
        <a>content</a>
        <a>home</a>
      </nav>
    </header>
  );
};
```

## Global function

Style.gloabl and Style.root is do not use it in a variable scope.  
Wherever they are, the compiler reads them and writes them to the StyleSheet.

development there preview it, you need to load it in the 'use client' place and render it.

```ts
Style.global({
  h1: {
    color: 'var(--color-font)',
    background: 'var(--color-background)',
  },
  'h2:hover': {
    color: 'skyblue',
  },
});

Style.root({
  '--color-font': '#333',
  '--color-background': '#fff',
});
```

## MediaQuery

```ts
import { Style, media } from 'typedcssx';
const small = media('300px <= width <= 600px');
const large = media('200px <= width <= 1400px');

export const styles = Style.create({
  header_nav: {
    fontSize: 18,
    color: 'white',
    ...small({
      fontSize: 12,
      color: 'pink',
    }),
  },
  footer_nav: {
    margin: 0,
    padding: 0,
  },
  ...large({
    footer_nav: {
      margin: 24,
      padding: 24,
    },
  }),
});
```

It's can enclose selectors or properties directly.  
media is a higher-order function, so you can directly create wrapper functions for small, large, etc.

## Build Setting and Global CSS

add file extension in tsconfig.json

```json
  "include": ["**/*.css.ts", "**/*.css.tsx"]
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
