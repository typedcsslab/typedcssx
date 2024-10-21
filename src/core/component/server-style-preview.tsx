import { getServerCSS } from '../../_internal/utils/inject-server-css';
import { isDevServer } from '../../_internal/utils/helper';
import { RefreshOn } from './refresh-on';

export const ServerStylePreview = (): JSX.Element | null => {
  if (!isDevServer) return null;

  const serverCSS = getServerCSS();

  return (
    <>
      <RefreshOn />
      <style dangerouslySetInnerHTML={{ __html: serverCSS }} />
    </>
  );
};
