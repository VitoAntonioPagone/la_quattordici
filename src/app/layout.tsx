import "./globals.css";

export const metadata = {
  title: "La Quattordici - Luxury Ostuni Rental",
  description: "Ostuni • Puglia"
};



export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon_io/favicon.ico" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon_io/favicon-16x16.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon_io/favicon-32x32.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon_io/apple-touch-icon.png" />
      <link rel="manifest" href="/favicon_io/site.webmanifest" />

        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <style>{`
          ::-webkit-scrollbar { width: 8px; }
          ::-webkit-scrollbar-track { background: #f1f1f1; }
          ::-webkit-scrollbar-thumb { background: #ccc; border-radius: 4px; }
          ::-webkit-scrollbar-thumb:hover { background: #999; }
        `}</style>
      </head>

      <body className="bg-paper text-charcoal font-sans antialiased selection:bg-olive selection:text-white">
        {children}
      </body>
    </html>
  );
}
