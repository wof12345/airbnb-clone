import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  IconChevronLeft,
  IconChevronRight,
  IconLoader,
} from "@tabler/icons-react";
import ProductCard from "./Card";
import { IService } from "@/lib/store/serviceSlice";
import Button from "../Buttons/Button";
import { Type } from "@/lib/data/nav";

type Item = {
  city?: string;
  start_date?: Date | string;
  service?: string;
};

type Props = {
  type?: Type | undefined;
  item: Item | undefined;
  items?: IService[];
  title?: string;
};

function ProductSlider({ type = "home", title = "Documents", item }: Props) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [cardWidth, setCardWidth] = useState(0);
  const [scrollState, setScrollState] = useState(0);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;

      if (scrollLeft === 0) {
        setScrollState(0);
      } else if (scrollLeft + clientWidth >= scrollWidth - 1) {
        setScrollState(1);
      } else {
        setScrollState(-1);
      }
    };

    container.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => container.removeEventListener("scroll", handleScroll);
  }, [cardWidth]);

  useEffect(() => {
    const fetchServices = async () => {
      let queryParams = `type=${type}&&`;

      if (item?.city) queryParams += `city=${item.city}&&`;
      if (item?.start_date) queryParams += `start_date=${item.start_date}&&`;
      if (item?.service) queryParams += `service_types=${item.service}&&`;

      try {
        const res = await fetch(`/api/services?${queryParams}`);
        const data = await res.json();
        setItems(data);
      } catch (err) {
        console.error("Failed to fetch services:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, [type]);

  useEffect(() => {
    const card = document.querySelector(".product-card") as HTMLElement;

    const scrollBy = 3;

    if (card)
      setCardWidth(
        (card.offsetWidth + parseInt(getComputedStyle(card).marginRight)) *
          scrollBy
      );
  }, [items]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -cardWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: cardWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="flex flex-col gap-3 px-8 my-8">
      <div className="flex justify-between items-center">
        <button className="flex gap-0.5 items-center">
          <h1 className="text-lg font-bold text-gray-800 first-letter:uppercase">
            {title}
          </h1>
          <IconChevronRight size={16} />
        </button>

        <div className="flex gap-1">
          <Button
            className={`${
              scrollState === 0
                ? "p-[1px] text-gray-300 bg-transparent border-gray-300 border"
                : "p-0.5"
            }`}
            variant="icon"
            onClick={scrollLeft}
          >
            <IconChevronLeft size={17} />
          </Button>
          <Button
            className={`${
              scrollState === 1
                ? "p-[1px] text-gray-300 bg-transparent border-gray-300 border"
                : "p-0.5"
            }`}
            variant="icon"
            onClick={scrollRight}
          >
            <IconChevronRight size={17} />
          </Button>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className="overflow-x-auto hidden-scrollbar w-full"
      >
        <div className="w-max flex gap-3">
          {loading ? <IconLoader /> : null}
          {items.map((pitem, idx) => (
            <ProductCard key={idx} item={pitem} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default React.memo(ProductSlider);
