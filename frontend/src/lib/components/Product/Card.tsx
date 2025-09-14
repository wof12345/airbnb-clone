"use client";

import { IService } from "@/lib/store/serviceSlice";
import { formatDateRange } from "@/lib/utils/date";
import { formatPrice } from "@/lib/utils/price";
import { IconHeart, IconStarFilled } from "@tabler/icons-react";
import Image from "next/image";
import React, { useEffect } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  item: IService;
};

function ProductCard({ item, ...props }: Props) {
  function getSubTitle() {
    if (item.type === "home") {
      return formatDateRange(item.start_date, item.end_date);
    }
  }

  function getPriceTally() {
    if (item.type === "home") {
      if (item.days && item.days_unit)
        return `${formatPrice(item.price, "GBP")} for ${item.days} ${
          item.days_unit
        }`;
      else return formatPrice(item.price, "GBP");
    }
  }

  return (
    <div
      className={twMerge(
        `product-card flex flex-col gap-3 w-full max-w-[300px] md:max-w-[350px] relative`,
        props.className
      )}
    >
      {item.tag ? (
        <div className="absolute top-3 left-3 py-1.5 px-2 z-10 text-xs shadow-sm font-semibold text-gray-700 rounded-full bg-primary-100">
          <button>{item.tag}</button>
        </div>
      ) : (
        <></>
      )}

      <div className="absolute top-3 right-3 text-xs shadow-sm z-10 font-semibold text-gray-100 rounded-full ">
        <button type="button" className="hover:scale-110">
          <IconHeart fill="#60594F" fillOpacity={0.5} />
        </button>
      </div>

      <div className="aspect-square bg-gray-500 overflow-hidden rounded-3xl relative">
        {/* <Image
          fill
          className="object-center object-cover"
          src="/dummy-product.jpg"
          alt="dummy-image"
        /> */}
      </div>

      <div className="flex flex-col gap-0.5">
        <h3 className="text-sm font-semibold text-gray-700 ">{item.title}</h3>

        <p className="text-xs text-gray-500">{getSubTitle()}</p>

        <div className="flex gap-0.5 text-xs text-gray-500">
          <p> {getPriceTally()}</p>

          <span className="text-lg leading-1.5 text-gray-400">.</span>

          <div className="flex gap-[2px] items-center">
            <IconStarFilled size={8} /> <p>{item.rating}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(ProductCard);
