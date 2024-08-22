'use client';

import Style from 'typedcssx';

const styles = Style.create({
  test_conflict: {
    fontSize: 14,
    color: 'pink',
  },
});

export function Conflict() {
  return (
    <span className={styles.test_conflict} data-testid="e2e-test-span">
      Not conflict test
    </span>
  );
}
