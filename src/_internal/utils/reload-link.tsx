'use client';

import { useEffect } from 'react';

export const ReloadAnchorComponent = () => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const targetAnchor = target.closest('a') as HTMLAnchorElement;

      if (targetAnchor) {
        e.preventDefault();
        window.location.href = targetAnchor.href;
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return null;
};
