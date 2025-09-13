"use client";

import ProductSlider from "@/lib/components/Product/Slider";
import { RootState } from "@reduxjs/toolkit/query";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";

export default function HomePage() {
  const t = useTranslations("HomePage");
  const navState = useSelector((state: RootState) => state.nav.navState);
  const subNavState = useSelector((state: RootState) => state.nav.subNavState);

  return (
    <div
      className={`max-w-[1440px] m-auto ${
        navState && !subNavState ? "pt-56" : "pt-38 md:pt-48"
      }`}
    >
      <ProductSlider />
      <ProductSlider />
      <ProductSlider />
    </div>
  );
}
