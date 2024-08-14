import { E2ETest } from '@/component/style-create.css';
import { Conflict } from '@/component/style-not-conflict.css';
export default function Home() {
  return (
    <main>
      Typed CSS X E2E Test
      <E2ETest />
      <Conflict />
    </main>
  );
}
