"use client";

import { IconHeart, IconStarFilled } from "@tabler/icons-react";
import { useState } from "react";

type Item = { href: string; label: string }[];

type Props = {
  item: Item;
};

export default function ProductCard({ item = {} }: Props) {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex flex-col gap-3 max-w-[300px] relative">
      <div className="absolute top-3 left-3 py-1.5 px-2 text-xs shadow-sm font-semibold text-gray-700 rounded-full bg-primary-100">
        <button>Guest favourite</button>
      </div>

      <div className="absolute top-3 right-3 text-xs shadow-sm font-semibold text-gray-100 rounded-full ">
        <button className="hover:scale-110">
          <IconHeart fill="#60594F" fillOpacity={0.5} />
        </button>
      </div>

      <div className="h-full aspect-square bg-gray-500 overflow-hidden rounded-3xl max-w-[12rem] md:max-w-[14rem]">
        <img
          className="object-center object-cover w-full h-full"
          src="/dummy-product.jpg"
          alt=""
        />
      </div>

      <div className="flex flex-col gap-0.5">
        <h3 className="text-sm font-semibold text-gray-700">
          Room in Phra Nakhon
        </h3>

        <p className="text-xs text-gray-500">24-26 Oct</p>

        <div className="flex gap-0.5 text-xs text-gray-500">
          <p> £20 for 2 nights</p>

          <span className="text-lg leading-2 text-gray-400">.</span>

          <div className="flex gap-[2px] items-center">
            <IconStarFilled size={8} /> <p>5.0</p>
          </div>
        </div>
      </div>
    </div>
  );
}
