import { ServerStylePreview } from 'typedcssx/next';

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
