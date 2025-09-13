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
  const navState = useSelector((state: RootState) => state.nav.navState);
  const subNavState = useSelector((state: RootState) => state.nav.subNavState);

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

  function setActiveIndicatorBar(active: number) {
    const activeTab = tabRefs.current[active];
    const indicator = indicatorRef.current;

    if (activeTab && indicator) {
      indicator.style.width = `${activeTab.offsetWidth}px`;
      indicator.style.left = `${activeTab.offsetLeft}px`;
    }
  }

  useEffect(() => {
    setActiveIndicatorBar(active);
  }, [active]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const onResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => setActiveIndicatorBar(active), 100);
    };

    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, [active]);

  return (
    <div
      className={`nav-tab-container flex flex-col gap-4 text-gray-700 relative py-0.5 pt-2 md:py-2 mx-10 md:mx-0 w-[500px] ${
        navState && !subNavState ? "md:-translate-y-[200%]" : ""
      }`}
      onMouseOut={(e) => handleMouseOut(e)}
    >
      <div
        ref={indicatorRef}
        className="nav-tab-indicator absolute bottom-0 h-[3px] bg-gray-800 transition-all duration-300"
      ></div>

      <div className="flex gap-6 items-center justify-between md:justify-center relative">
        {items.map((item, i) => (
          <button
            key={i}
            ref={(el) => (tabRefs.current[i] = el)}
            onClick={() => dispatch(setActiveIndex(i))}
            onMouseEnter={(e) => handleMouseIn(i)}
            className={`nav-tab nav-tab-${i} flex md:flex-row flex-col gap-0.5 md:gap-2 items-center justify-between relative py-1 w-max
              ${active === i ? "text-gray-800 font-semibold" : "text-gray-500"}
            `}
          >
            <div
              className={`relative ${navState ? "hidden md:flex" : ""} ${
                hover === i || active === i ? "scale-100" : "scale-100"
              }`}
            >
              {item.icon || <IconHome size={28} />}

              {item.hasNew && (
                <div
                  className={`absolute -top-1.5 -right-8.5 md:-top-4 md:left-5 bg-[#627A98] text-white text-xs px-1 rounded-t-lg rounded-br-lg p-0.5 text-shadow-sm ${
                    hover === i || active === i ? "scale-100" : "scale-80"
                  }`}
                >
                  New
                </div>
              )}
            </div>
            <div className="text-sm relative">
              <p className="invisible font-bold">{item.label}</p>
              <p className="absolute top-0 left-0">{item.label}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
