import "./globals.css";
import NavBar from "./Components/NavBar";

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
      <header>
        <NavBar />
      </header>

      <body>{children}</body>
    </html>
  );
}
