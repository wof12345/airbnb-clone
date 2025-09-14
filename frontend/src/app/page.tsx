"use client";

import ProductCard from "@/lib/components/Product/Card";
import ProductSlider from "@/lib/components/Product/Slider";
import { navigationItems } from "@/lib/data/nav";
import { setSearchIndicator } from "@/lib/store/navSlice";
import { IService, setServices } from "@/lib/store/serviceSlice";
import { RootState } from "@/lib/store/store";
import { expItems, homeItems, serviceItems } from "@/lib/utils/dummyUtils";

import { useTranslations } from "next-intl";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

export default function HomePage() {
  const t = useTranslations("HomePage");
  const dispatch = useDispatch();

  const activeIndex = useSelector((state: RootState) => state.nav.activeIndex);
  const navState = useSelector((state: RootState) => state.nav.navState);
  const subNavState = useSelector((state: RootState) => state.nav.subNavState);

  const destination = useSelector(
    (state: RootState) => state.filter.destination
  );
  const checkIn = useSelector((state: RootState) => state.filter.checkIn);
  const checkOut = useSelector((state: RootState) => state.filter.checkOut);
  const date = useSelector((state: RootState) => state.filter.date);
  const guests = useSelector((state: RootState) => state.filter.guests);
  const service = useSelector((state: RootState) => state.filter.service);
  const services = useSelector((state: RootState) => state.service.services);

  const searchIndicator = useSelector(
    (state: RootState) => state.nav.searchIndicator
  );

  useEffect(() => {
    if (!searchIndicator) return;

    const fetchServices = async () => {
      let queryParams = `type=${navigationItems[activeIndex].slug}&&`;

      const desCol = destination?.split(",");

      let city;
      let country;

      if (desCol && desCol.length > 0) {
        city = desCol[0].trim();
        country = desCol[1]?.trim();
      } else {
        city = desCol;
      }

      if (city) queryParams += `city=${city}&&`;

      if (country) queryParams += `country=${country}&&`;

      if (checkIn) queryParams += `start_date=${checkIn}&&`;

      if (checkOut) queryParams += `end_date=${checkOut}&&`;

      if (date) queryParams += `date=${date}&&`;

      const guestFilters = Object.entries(guests)
        .filter(([_, count]) => count > 0)
        .map(([type, count]) => `${type}:${count}`)
        .join(",");

      if (guestFilters) {
        queryParams += `guests=${encodeURIComponent(guestFilters)}&&`;
      }

      if (service && service?.length > 0) {
        queryParams += `service_types=${service.join(",")}&&`;
      }

      try {
        const res = await fetch(`/services?${queryParams}`);
        const data = await res.json();

        dispatch(setServices(data));
        dispatch(setSearchIndicator(0));
        if (queryParams === `type=${navigationItems[activeIndex].slug}&&`) {
          dispatch(setServices(undefined));
        }
      } catch (err) {
        console.error("Failed to fetch services:", err);
      } finally {
      }
    };

    fetchServices();
  }, [searchIndicator]);

  useEffect(() => {
    console.log(services, "service");
  }, [services]);

  return (
    <div
      className={`max-w-[1440px] m-auto ${
        navState && !subNavState ? "pt-56" : "pt-38 md:pt-48"
      }`}
    >
      {services ? (
        <div className="w-full flex flex-wrap gap-4 gap-y-10 p-6 py-10 justify-evenly">
          {services.map((service: IService, idx: number) => (
            <ProductCard
              className={"md:max-w-[250px] self-start"}
              item={service}
              key={idx}
            />
          ))}
        </div>
      ) : (
        <></>
      )}

      {!services &&
        navigationItems[activeIndex].slug === "home" &&
        homeItems.map((item, idx: number) => (
          <ProductSlider
            key={idx}
            title={`${item.title} ${item.city}`}
            item={item}
            type={navigationItems[activeIndex].slug}
          />
        ))}

      {!services &&
        navigationItems[activeIndex].slug === "experience" &&
        expItems.map((item, idx: number) => (
          <ProductSlider
            key={idx}
            title={`${item.title} ${item.city}`}
            item={item}
            type={navigationItems[activeIndex].slug}
          />
        ))}

      {!services &&
        navigationItems[activeIndex].slug === "service" &&
        serviceItems.map((item, idx: number) => (
          <ProductSlider
            key={idx}
            title={`${item.service}`}
            item={item}
            type={navigationItems[activeIndex].slug}
          />
        ))}
    </div>
  );
}
