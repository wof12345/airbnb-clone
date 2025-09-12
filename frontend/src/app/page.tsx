import Menu from "@/lib/components/Menu";
import ProductSlider from "@/lib/components/Product/Slider";
import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations("HomePage");

  <Menu open={true} />;
  return (
    <div>
      {/* <h1>{t("title")}</h1> */}
      <ProductSlider />
      <ProductSlider />
      <ProductSlider />
    </div>
  );
}
