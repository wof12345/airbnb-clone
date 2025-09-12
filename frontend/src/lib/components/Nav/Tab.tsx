"use client";

import { useEffect, useRef, useState } from "react";
import { IconHome } from "@tabler/icons-react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store/store";
import { RootState } from "@reduxjs/toolkit/query";
import { setActiveIndex } from "@/lib/store/navSlice";

type Item = {
  label: string;
  links: string[];
  hasNew: boolean;
  icon?: React.ReactNode;
};

type Props = {
  items?: Item[];
};

export default function NavTab({ items = [] }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const active = useSelector((state: RootState) => state.nav.activeIndex);
  const [hover, setHover] = useState(-1);

  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const indicatorRef = useRef<HTMLDivElement | null>(null);

  function handleMouseIn(index: number) {
    setHover(index);
  }

  function handleMouseOut(e: MouseEvent) {
    if (!e.target?.closest(".nav-tab")) {
      setHover(-1);
    }
  }

  useEffect(() => {
    const activeTab = tabRefs.current[active];
    const indicator = indicatorRef.current;

    if (activeTab && indicator) {
      indicator.style.width = `${activeTab.offsetWidth}px`;
      indicator.style.left = `${activeTab.offsetLeft}px`;
    }
  }, [active, items]);

  return (
    <div
      className="nav-tab-container flex flex-col gap-4 text-gray-700 relative py-2 w-[500px]"
      onMouseOut={(e) => handleMouseOut(e)}
    >
      <div
        ref={indicatorRef}
        className="nav-tab-indicator absolute bottom-0 h-[3px] bg-gray-800 transition-all duration-300"
      ></div>

      <div className="flex gap-6 items-center justify-center relative">
        {items.map((item, i) => (
          <button
            key={i}
            ref={(el) => (tabRefs.current[i] = el)}
            onClick={() => dispatch(setActiveIndex(i))}
            onMouseEnter={(e) => handleMouseIn(i)}
            className={`nav-tab nav-tab-${i} flex gap-2 items-center justify-between relative px-1 mb-1 py-1 w-max
              ${active === i ? "text-gray-800 font-semibold" : "text-gray-500"}
            `}
          >
            <div
              className={`${
                hover === i || active === i ? "scale-100" : "scale-100"
              }`}
            >
              {item.icon || <IconHome size={28} />}
            </div>
            <div className="text-sm relative">
              <p className="invisible font-bold">{item.label}</p>
              <p className="absolute top-0 left-0">{item.label}</p>
            </div>

            {item.hasNew && (
              <div
                className={`absolute -top-3.5 left-3 bg-[#627A98] text-white text-xs px-1 rounded-t-lg rounded-br-lg p-0.5 text-shadow-sm ${
                  hover === i || active === i ? "scale-100" : "scale-80"
                }`}
              >
                New
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
