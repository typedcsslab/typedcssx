'use client';

import { useEffect, useTransition } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export const RefreshOn = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [, startTransition] = useTransition();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const targetAnchor = target.closest('a');
      if (pathname && targetAnchor instanceof HTMLAnchorElement && targetAnchor.origin === window.location.origin) router.refresh();
    };
    let isRefreshing = false; // Debounce processing
    const observeStyleSheets = () => {
      const styleObserver = new MutationObserver(mutations => {
        if (isRefreshing) return;
        for (const mutation of mutations) {
          if (mutation.type === 'childList') {
            const addedNodes = Array.from(mutation.addedNodes);
            if (
              addedNodes.some(
                node =>
                  node instanceof HTMLStyleElement || (node instanceof HTMLLinkElement && !(node.rel === 'preload' && node.getAttribute('as') === 'style'))
              )
            ) {
              startTransition(() => {
                isRefreshing = true;
                router.refresh();
                setTimeout(() => {
                  isRefreshing = false;
                }, 100);
              });
              break;
            }
          }
        }
      });

      styleObserver.observe(document.head, {
        childList: true,
        subtree: false,
      });

      return styleObserver;
    };

    document.addEventListener('click', handleClick);
    const cssObserver = observeStyleSheets();

    return () => {
      document.removeEventListener('click', handleClick);
      cssObserver.disconnect();
    };
  }, [router, pathname]);

  return null;
};
