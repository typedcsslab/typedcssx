import { getServerCSS } from '../../_internal/utils/inject-server-css';
import { isDevServer } from '../../_internal/utils/helper';
import { ReloadAnchorComponent } from './reload-link';

export const PreviewServerCSS = ({ anchorEnabled = false }: { anchorEnabled?: boolean }): JSX.Element | null => {
  if (!isDevServer) return null;

  const serverCSS = getServerCSS();

  return (
    <>
      {anchorEnabled && <ReloadAnchorComponent />}
      <style dangerouslySetInnerHTML={{ __html: serverCSS }} />
    </>
  );
};
