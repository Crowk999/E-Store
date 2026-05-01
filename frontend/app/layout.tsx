import "./globals.css";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import { Layout } from "lucide-react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased`}
    >
    <body>
      <header>
        <NavBar />
      </header>

      <main>{children}</main>
      <Footer />
    
    </body>
    </html>
  );
}
