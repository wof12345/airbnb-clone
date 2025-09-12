"use client";

import Link from "next/link";
import Button from "../Buttons/Button";
import {
  IconChevronCompactRight,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";
import { useState } from "react";
import ProductCard from "./Card";

type Type = "home" | "experience" | "service";
type Links = { href: string; label: string }[];

type Props = {
  type?: Type;
  items?: any;
  title?: string;
};

export default function ProductSlider({
  items = [],
  type = "home",
  title = "Documents",
}: Props) {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex flex-col gap-3 px-8 my-8">
      <div className="flex justify-between items-center">
        <button className="flex gap-0.5 items-center">
          <h1 className="text-lg font-bold text-gray-600">{title}</h1>{" "}
          <IconChevronRight size={16} />
        </button>

        <div className="flex gap-1">
          <Button
            className="p-[1px] text-gray-300 bg-transparent border-gray-300 border"
            variant="icon"
          >
            <IconChevronLeft size={17} />
          </Button>

          <Button className="p-0.5" variant="icon">
            <IconChevronRight size={17} />
          </Button>
        </div>
      </div>

      <div className="overflow-auto hidden-scrollbar w-full">
        <div className="w-max flex gap-3">
          <ProductCard item={{}} />
          <ProductCard item={{}} />
          <ProductCard item={{}} />
          <ProductCard item={{}} />
          <ProductCard item={{}} />
          <ProductCard item={{}} />
          <ProductCard item={{}} />
        </div>
      </div>
    </div>
  );
}
