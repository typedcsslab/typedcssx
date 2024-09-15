# TypedCSSX

A type-first CSS library for stably building user interfaces.

## Key features:

- Type first
- Type safe
- Scaleble
- Maintainable
- Easy API
- All Pure CSS compiler
- Zero-runtime
- Zero-config
- RSC Full support

## Why TypedCSSX ?

TypedCSSX allows you to write CSS as TypeScript, making your styles type safe and maintainable  
and integrated with your development environment. With features like static CSS generation  
Theoretical perfect performance while keeping your CSS code clean and scalable.

## Documentation

For full documentation, visit [typedcssx site](https://typedcssx.vercel.app/).  
To the check out the version information, visit [release notes](https://github.com/typedcsslab/typedcssx/releases).

## Quick Start

```typescript
import cssx from 'typedcssx';

const css = cssx.create({
  blue: {
    fontSize: 18,
    color: 'blue',
  },
});

const Page = () => <div className={css.blue}>Hello World</div>;
```

## Community

For help, discuss best practices and please join the conversation here:  
[Discuss TypedCSSX on GitHub](https://github.com/typedcsslab/typedcssx/discussions)
