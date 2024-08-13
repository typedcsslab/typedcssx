'use client';

import Style from 'typedcssx';

const styles = Style.create({
  test_conflict: {
    fontSize: 14,
  },
});

export function Conflict() {
  return (
    <span className={styles.test_conflict} data-testid="e2e-test-span">
      not conflict
    </span>
  );
}
