
import "./globals.css";

export const metadata = {
  title: "Login Critter Demo",
  description: "Demo",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
