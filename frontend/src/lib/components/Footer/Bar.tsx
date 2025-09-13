"use client";

import { useDispatch, useSelector } from "react-redux";

import { IconHeart, IconSearch, IconUserCircle } from "@tabler/icons-react";
import { useState } from "react";

export default function FooterBar() {
  const items = [
    {
      icon: <IconSearch size={30} stroke={2} />,
      label: "Explore",
    },
    {
      icon: <IconHeart size={30} stroke={1} />,
      label: "Wishlists",
    },
    {
      icon: <IconUserCircle size={30} stroke={1} />,
      label: "Log in",
    },
  ];

  const state = useSelector((state: RootState) => state.nav.appBarState);
  const [active, setActive] = useState<number>(0);

  return (
    <button
      className={`nav-search-container md:hidden sticky w-full flex bg-primary-50  items-center text-gray-400 justify-evenly py-2.5 px-4  ${
        state ? "bottom-0" : "-bottom-56"
      }`}
      style={{ boxShadow: "0px 0px 40px -20px rgba(0,0,0,0.30)" }}
    >
      {items.map((item, idx) => (
        <div
          key={idx}
          className={`flex flex-col gap-1 items-center hover:text-gray-700 ${
            active === idx ? "text-secondary-600" : ""
          }`}
        >
          {item.icon}

          <p className="text-[10px] font-semibold">{item.label}</p>
        </div>
      ))}
    </button>
  );
}
