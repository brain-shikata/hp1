import "./globals.css";

export const metadata = {
  title: "Sample Company | 私たちについて",
  description:
    "私たちは、お客様の課題に真摯に向き合い、確かな技術と創造性で最適なソリューションをお届けします。",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
