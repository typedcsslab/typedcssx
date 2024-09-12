'use client';

import cssx from 'typedcssx';

const css = cssx.create({
  test_conflict: {
    fontSize: 14,
    color: 'pink',
  },
});

export function Conflict() {
  return (
    <span className={css.test_conflict} data-testid="e2e-test-span">
      Not conflict test
    </span>
  );
}
