import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
})

export const metadata = {
  title: " BBA in Accounting-4A",
  description: "Explore details about Daffodil International University BBA Accounting program, Batch 4 Section A and student information.",
  keywords: [
    "Daffodil International University",
    "DIU BBA Accounting",
    "Batch 4 Section A",
    "Accounting Department",
    "Undergraduate Program",
    "DIU BBA",
    "BBA in Accounting",
    "DIU Accounting"
  ],
  authors: [
    { name: "Md.Rofson Jame Abu Siam" },
  ],

};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} antialiased`}
      >
        <section>
          <Navbar />
          {children}
          <Toaster position="top-center" />
        </section>
      </body>
    </html>
  );
}
