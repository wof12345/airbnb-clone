import Nav from "@/lib/components/Nav/Nav";
import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations("HomePage");
  return (
    <div>
      <Nav />

      <h1>{t("title")}</h1>
    </div>
  );
}
