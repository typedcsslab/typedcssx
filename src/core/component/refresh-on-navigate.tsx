'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export const RefreshOnNavigate = () => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const targetAnchor = target.closest('a');
      if (pathname && targetAnchor instanceof HTMLAnchorElement && targetAnchor.origin === window.location.origin) router.refresh();
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [router, pathname]);

  return null;
};
