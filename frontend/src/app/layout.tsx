import { NextIntlClientProvider } from "next-intl";
import "./globals.css";
import RTKWrapper from "@/lib/components/RTKWrapper";
import Nav from "@/lib/components/Nav/Nav";
import Footer from "@/lib/components/Footer/Footer";
import { Inter, Lato } from "next/font/google";
import FooterBar from "@/lib/components/Footer/Bar";

const inter = Inter({ subsets: ["latin"] });
const lato = Lato({ weight: ["100", "300", "400", "700", "900"] });

type Props = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: Props) {
  return (
    <html>
      <body className={lato.className}>
        <RTKWrapper>
          <NextIntlClientProvider>
            <Nav />
            {children}
            <Footer />
            <FooterBar />
          </NextIntlClientProvider>
        </RTKWrapper>
      </body>
    </html>
  );
}
