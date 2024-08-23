'use client';

import { useEffect, useState, useCallback } from 'react';

export const ReloadAnchorComponent = () => {
  const [cachedUrls, setCachedUrls] = useState(() => {
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem('cachedUrls');
      return cached ? new Set(JSON.parse(cached)) : new Set();
    }
    return new Set();
  });

  const handleClick = useCallback(
    (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const targetAnchor = target.closest('a');
      if (targetAnchor instanceof HTMLAnchorElement) {
        e.preventDefault();
        const href = targetAnchor.href;
        if (!cachedUrls.has(href)) {
          setCachedUrls((prevCachedUrls) => {
            const updatedCachedUrls = new Set(prevCachedUrls);
            updatedCachedUrls.add(href);
            localStorage.setItem('cachedUrls', JSON.stringify(Array.from(updatedCachedUrls)));
            return updatedCachedUrls;
          });
          window.location.href = href;
        }
      }
    },
    [cachedUrls]
  );

  const resetCache = useCallback(() => {
    localStorage.removeItem('cachedUrls');
    setCachedUrls(new Set());
  }, []);

  useEffect(() => {
    document.addEventListener('click', handleClick);
    window.addEventListener('beforeunload', resetCache);

    return () => {
      document.removeEventListener('click', handleClick);
      window.removeEventListener('beforeunload', resetCache);
    };
  }, [handleClick, resetCache]);

  return null;
};
