import Script from "next/script";
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
<link
  href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Lato:wght@300;400;700&family=Great+Vibes&display=swap"
  rel="stylesheet"
/>

        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Lato:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />

        <style>{`
          .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
          }
          .material-symbols-filled {
            font-variation-settings: 'FILL' 1, 'wght' 300, 'GRAD' 0, 'opsz' 24;
          }
          ::-webkit-scrollbar { width: 8px; }
          ::-webkit-scrollbar-track { background: #f1f1f1; }
          ::-webkit-scrollbar-thumb { background: #ccc; border-radius: 4px; }
          ::-webkit-scrollbar-thumb:hover { background: #999; }
        `}</style>
      </head>

      <body className="bg-paper text-charcoal font-sans antialiased selection:bg-olive selection:text-white">
        <Script
          src="https://cdn.tailwindcss.com?plugins=forms,container-queries"
          strategy="beforeInteractive"
        />
        <Script
          id="tailwind-config"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              tailwind.config = {
                theme: {
                  extend: {
                    colors: {
                      "olive": "#6B705C",
                      "olive-dark": "#484C3D",
                      "cream": "#F5F5F0",
                      "paper": "#FDFBF7",
                      "charcoal": "#1A1A1A",
                      "stone": "#E6E2DD",
                    },
                    fontFamily: {
                      "serif": ["Playfair Display", "serif"],
                      "sans": ["Lato", "sans-serif"],
                    },
                    letterSpacing: {
                      'widest-xl': '0.2em',
                    }
                  },
                },
              };
            `
          }}
        />
        {children}
      </body>
    </html>
  );
}
