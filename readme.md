# Typed cssx

### Zero-runtime CSS in TS Compiler

Typed CSS X is an innovative CSS in TypeScript solution designed for the Next.js App Router (RSC).  
Key features:

- TypeScript first: Write CSS in a high level, easy to read TypeScript format.
- Type safety: Enjoy compile time checks and intelligent autocompletion while writing styles.
- Hot Reloading: Experience a smooth development workflow with instant feedback as you edit styles.
- Pure CSS compiler: 100% pure CSS compiler, outputting static CSS files without a runtime.
- Zero-runtime: All CSS is statically generated during build time, high performance in production.
- Next.js RSC support: Full support for the Next.js App Router and React Server Components (RSC).

## Why Typed cssx?

Typed cssx allows you to write CSS as TypeScript, making your styles type safe and maintainable  
and integrated with your development environment. With features like static CSS generation  
high performance while keeping your CSS code clean and scalable.

### Let's write CSS in TypeScript

For detailed documentation, visit our [typedcssx site](https://typedcssx.vercel.app/).  
For the check out the latest version information, visit our [release notes](https://github.com/typedcsslab/typedcssx/releases).

## Quick Start

```typescript
import cssx from 'typedcssx';

const css = cssx.create({
  blue: {
    fontSize: 18,
    color: 'blue',
  },
});

const Header = () => <header className={css.blue}>Hello, Typed CSS X!</header>;
```
