import "./globals.css";

export const metadata = {
  title: "Noel Siby — Software Developer | Cloud & Security Enthusiast",
  description:
    "Cinematic 3D portfolio of Noel Siby — Software Developer specializing in Cloud Computing, Cybersecurity, and modern web technologies.",
  keywords: [
    "Noel Siby",
    "Software Developer",
    "Cloud Computing",
    "Cybersecurity",
    "Portfolio",
    "3D",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
