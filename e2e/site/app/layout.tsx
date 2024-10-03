import { ServerStylePreview } from 'typedcssx/next';
import 'styles/typedcssx-global.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <ServerStylePreview />
      </head>
      <body>{children}</body>
    </html>
  );
}
