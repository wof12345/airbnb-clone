import { NextIntlClientProvider } from "next-intl";
import "./globals.css";
import RTKWrapper from "@/lib/components/RTKWrapper";

type Props = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: Props) {
  return (
    <html>
      <body>
        <RTKWrapper>
          <NextIntlClientProvider>{children}</NextIntlClientProvider>
        </RTKWrapper>
      </body>
    </html>
  );
}
