"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "@reduxjs/toolkit/query";
import { navigationItems, SubItem } from "@/lib/data/nav";
import Button from "../Buttons/Button";
import { IconSearch } from "@tabler/icons-react";

export default function NavSearch() {
  const active = useSelector((state: RootState) => state.nav.activeIndex);
  const [hover, setHover] = useState();

  const [subItems, setSubItems] = useState<SubItem[]>(
    navigationItems[0].subItems
  );

  useEffect(() => {
    setSubItems(navigationItems[active].subItems);
  }, [active]);

  return (
    <div className="nav-search-container relative flex gap-2 bg-white text-gray-700 relative w-[95%] rounded-full h-18 m-5 my-6 shadow-lg max-w-[850px]">
      {subItems?.map((subItem, i) => (
        <button
          key={i}
          onMouseEnter={() => setHover(i)} // optional hover state
          onMouseLeave={() => setHover(-1)}
          className={`relative flex flex-col gap-1 rounded-full text-start p-4 px-7 hover:bg-gray-200 w-full ${
            i === 0 || i === subItems.length - 1
              ? "flex-2 max-w-[280px]"
              : "flex-1"
          }`}
        >
          {i !== subItems.length - 1 && (
            <span
              className={`absolute top-[24%] right-0 h-[50%] border-r border-gray-300 transition-opacity duration-200 ${
                hover === i || hover === i + 1 ? "opacity-0" : "opacity-100"
              }`}
            ></span>
          )}

          <p className="text-xs font-semibold">{subItem.label}</p>
          <p className="text-sm text-gray-500">{subItem.action.title}</p>
        </button>
      ))}

      <div className="absolute top-[20%] right-[10px]">
        <Button
          variant="icon"
          className="text-white bg-secondary-500 hover:bg-secondary-800 p-3"
        >
          <IconSearch size={19} />
        </Button>
      </div>
    </div>
  );
}
