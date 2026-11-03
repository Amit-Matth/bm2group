import "./globals.css";

export const metadata = {
  title: "BM2GROUP",
  description: "Simple, elegant software by BM2GROUP.",
  icons: {
    icon: "/logo.jpg",
  },
};

// Runs before paint so there is no flash of the wrong theme (default: light)
const themeScript = `(function(){try{var t=localStorage.getItem('bm2-theme');if(!t){t='light'}document.documentElement.setAttribute('data-theme',t)}catch(e){document.documentElement.setAttribute('data-theme','light')}})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Allura&family=Great+Vibes&family=Outfit:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600&family=Space+Grotesk:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
