import { getServerCSS } from './inject-server-css';
import { isDevServer } from '..';
import { ReloadAnchorComponent } from './reload-link';

export const PreviewServerCSS = ({ reload = false }: { reload?: boolean }): JSX.Element => {
  const serverCSS = isDevServer ? getServerCSS() : null;

  return (
    <>
      {serverCSS && (
        <>
          {reload && <ReloadAnchorComponent />}
          <style dangerouslySetInnerHTML={{ __html: serverCSS }} />
        </>
      )}
    </>
  );
};
