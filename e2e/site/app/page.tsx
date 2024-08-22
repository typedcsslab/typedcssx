import { E2ETest } from '@/component/style-create.css';
import { Conflict } from '@/component/style-not-conflict.css';
import Link from 'next/link';
export default function Home() {
  return (
    <main>
      Typed CSS X E2E Test <Link href="/server">Server Page</Link>
      <E2ETest />
      <Conflict />
    </main>
  );
}
