import "./globals.css";
import { Orbitron, Inter, JetBrains_Mono } from "next/font/google";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

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
    <html lang="en" className={`${orbitron.variable} ${inter.variable} ${jetbrains.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
