import { E2ETest } from '@/component/style-create';
import { Conflict } from '@/component/style-not-conflict';
export default function Home() {
  return (
    <main>
      Typed CSS X E2E Test
      <E2ETest />
      <Conflict />
    </main>
  );
}
