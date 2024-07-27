# Typed CSS X

**Zero-runtime CSS in JS and Compiler**

Typed CSS X is an innovative CSS-in-JS solution designed for the Next.js App Router (RSC).  
Key features:

- Client Component support
- Zero-runtime (statically generated during build time)
- Hot Reload
- type check (compile time and autocomplete)

For detailed documentation, visit our [typedcssx site](https://typedcssx.vercel.app/).

## Quick Start

```typescript
// Header.css.tsx
import { Style } from 'typedcssx';

const styles = Style.create({
  header: {
    fontSize: 18,
    color: 'blue',
  },
});

const Header = () => <header className={styles.header}>Hello, Typed CSS X!</header>;
```
