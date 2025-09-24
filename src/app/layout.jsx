import "./globals.css";
import Layout from "@/components/layout/Layout";
export const metadata = {
  title: "ایمن پرداز",
  icons: {
    icon: "/logo.png", // مسیر فایل داخل public
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body  cz-shortcut-listen="true" dir="rtl">
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
