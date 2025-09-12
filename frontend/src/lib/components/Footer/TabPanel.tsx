"use client";

import { useState } from "react";
import GeneralItem from "../GeneralItem";
import { IconChevronDown } from "@tabler/icons-react";

type Item = { title: string; subTitle: string };

type Props = {
  items?: Item[];
  limit?: number;
};

export default function FooterTab({
  items = Array.from({ length: 20 }, (_, i) => ({
    title: `Dubai ${i + 1}`,
    subTitle: "Cabin rentals",
  })),
  limit = 11,
}: Props) {
  const [show, setShow] = useState(false);

  const displayedItems = show ? items : items.slice(0, limit);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-5">
      {displayedItems.map((item, idx) => (
        <GeneralItem key={idx} title={item.title} subTitle={item.subTitle} />
      ))}

      {items.length > limit && (
        <button
          className="text-sm font-semibold text-gray-800 flex gap-0.5 items-center hover:underline mt-2"
          onClick={() => setShow(!show)}
        >
          {show ? "Show less" : "Show more"}{" "}
          <IconChevronDown
            className={`mt-0.5 transition-transform duration-200 ${
              show ? "rotate-180" : ""
            }`}
            size={16}
            stroke={3}
          />
        </button>
      )}
    </div>
  );
}
