'use client';

import Style, { max_lg } from 'typedcssx';

const styles = Style.create({
  e2e: {
    color: 'pink',
    [max_lg]: {
      color: 'aqua',
    },
  },
});

export function E2ETest() {
  return (
    <div className={styles.e2e} data-testid="e2e-test-div">
      E2E Test
    </div>
  );
}
