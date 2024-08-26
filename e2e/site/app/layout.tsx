import { PreviewServerCSS } from 'typedcssx';
import 'styles/typedcssx-global.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <PreviewServerCSS anchorEnabled={true} />
      </head>
      <body>{children}</body>
    </html>
  );
}
