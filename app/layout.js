import { Inter } from "next/font/google";
import "@/app/t/(main)/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "WhispTalk",
  description: "This is whispTalk",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
