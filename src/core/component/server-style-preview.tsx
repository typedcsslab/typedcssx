import { getServerCSS } from '../../_internal/utils/inject-server-css';
import { isDevServer } from '../../_internal/utils/helper';
import { RefreshOnNavigate } from './refresh-on-navigate';

export const ServerStylePreview = (): JSX.Element | null => {
  if (!isDevServer) return null;

  const serverCSS = getServerCSS();

  return (
    <>
      <RefreshOnNavigate />
      <style dangerouslySetInnerHTML={{ __html: serverCSS }} />
    </>
  );
};
