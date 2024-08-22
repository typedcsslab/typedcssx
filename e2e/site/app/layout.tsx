import { PreviewServerCSS } from 'typedcssx';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <PreviewServerCSS />
      </head>
      <body>{children}</body>
    </html>
  );
}
