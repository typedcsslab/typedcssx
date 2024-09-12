import { E2ETest } from '@/component/style-create';
import { Conflict } from '@/component/style-not-conflict';
import Link from 'next/link';
import cssx from 'typedcssx';

const css = cssx.create({
  page: {
    color: 'orange',
  },
});

export default function Home() {
  return (
    <main>
      <h1>Typed CSS X E2E Test</h1>
      <h2 className={css.page}>page.tsx in cssx</h2>
      <Link href="/server">Server Page</Link>
      <E2ETest />
      <Conflict />
    </main>
  );
}
