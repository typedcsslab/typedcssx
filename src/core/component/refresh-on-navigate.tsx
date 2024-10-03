'use client';

import { useLayoutEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

export const RefreshOnNavigate = () => {
  const router = useRouter();
  const handleClick = useCallback(
    (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const targetAnchor = target.closest('a');
      if (targetAnchor instanceof HTMLAnchorElement) router.refresh();
    },
    [router]
  );

  useLayoutEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [handleClick]);

  return null;
};
