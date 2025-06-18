import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001"),
  title: "Project Spotify",
  description: "Spotify replica project",
  icons: "/spotify-logo.png",
  openGraph: {
    title: "Project Spotify",
    description: "Spotify replica project",
    images: "/spotify-logo.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body 
        className={`antialiased`}
      >
        <Header />
    
        {children}
      </body>
    </html>
  );
}
