'use client';

import cssx, { max_lg } from 'typedcssx';

const css = cssx.create({
  e2e: {
    color: 'pink',
    [max_lg]: {
      color: 'aqua',
    },
  },
});

cssx.global({
  h1: {
    color: 'aqua',
  },
});

export function E2ETest() {
  return (
    <div className={css.e2e} data-testid="e2e-test-div">
      Component-attach-class and Responsive-design test
    </div>
  );
}
