import "./globals.css";

export const metadata = {
  title: "OptiDeal - On cherche, on compare, vous choisissez",
  description: "Comparateur de produits intelligent",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
