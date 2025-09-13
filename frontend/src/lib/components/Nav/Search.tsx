"use client";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@reduxjs/toolkit/query";
import { navigationItems, SubItem } from "@/lib/data/nav";
import Button from "../Buttons/Button";
import { IconSearch } from "@tabler/icons-react";
import Menu from "../Menu";
import { setActiveSubNavState } from "@/lib/store/navSlice";

export default function NavSearch() {
  const dispatch = useDispatch();

  const active = useSelector((state: RootState) => state.nav.activeIndex);
  const navState = useSelector((state: RootState) => state.nav.navState);
  const subNavState = useSelector((state: RootState) => state.nav.subNavState);

  const [hover, setHover] = useState<number>(-1);
  const [activeSubitem, setActiveSubItem] = useState<number>(-1);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [subItems, setSubItems] = useState<SubItem[]>(
    navigationItems[0].subItems
  );

  const indicatorRef = useRef<HTMLDivElement | null>(null);
  const subItemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function getMenuType(activeSubitem: number) {
    if (activeSubitem === 0) {
      return "type-1";
    } else if ((activeSubitem === 1 || activeSubitem === 2) && active === 0) {
      return "type-2";
    } else if (activeSubitem === subItems.length - 1) {
      return "type-4";
    } else {
      return "type-3";
    }
  }

  // update subItems when parent tab changes
  useEffect(() => {
    setSubItems(navigationItems[active].subItems);
    setActiveSubItem(-1);
  }, [active]);

  // move indicator on active change
  useEffect(() => {
    setTimeout(() => {
      const indicator = indicatorRef.current;
      const activeBtn = subItemRefs.current[activeSubitem];

      if (indicator && activeBtn) {
        indicator.style.width = `${activeBtn.offsetWidth}px`;
        indicator.style.left = `${activeBtn.offsetLeft}px`;
      }
    }, 200);
  }, [activeSubitem, subItems]);

  useEffect(() => {
    const handleResize = () => {
      console.log("resize");
      if (activeSubitem > -1) {
        const activeBtn = subItemRefs.current[activeSubitem];
        if (indicatorRef.current && activeBtn) {
          indicatorRef.current.style.width = `${activeBtn.offsetWidth}px`;
          indicatorRef.current.style.left = `${activeBtn.offsetLeft}px`;
        }
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeSubitem, subNavState]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setActiveSubItem(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`nav-search-container gap-0 hidden md:flex absolute ${
        activeSubitem > -1 ? "bg-gray-200" : "bg-white"
      } text-gray-700 ${
        navState && !subNavState
          ? "-top-1.5 w-[55%] max-w-[378px] h-12"
          : "top-16 w-[95%]  max-w-[850px] h-18"
      } rounded-full  m-5 my-6 shadow-lg`}
    >
      {/* Indicator */}
      <div
        ref={indicatorRef}
        className={`absolute top-0 left-0 h-full rounded-full bg-white shadow-md  transition-all duration-300 ease-in-out ${
          activeSubitem > -1 && subNavState ? "scale-100" : "scale-0"
        }`}
        style={{ width: 0 }}
      ></div>

      {subItems?.map((subItem, i) => (
        <button
          key={i}
          ref={(el) => (subItemRefs.current[i] = el)}
          onClick={() => {
            if (navState && !subNavState) {
              dispatch(setActiveSubNavState(1));
            }
            setActiveSubItem(i);
          }}
          onMouseEnter={() => setHover(i)}
          onMouseLeave={() => setHover(-1)}
          className={`relative flex flex-col gap-1 justify-center rounded-full text-start ${
            navState && !subNavState && subItem.label === "Check out"
              ? "hidden"
              : ""
          }  ${navState && !subNavState ? "p-2.5 h-full" : "p-4 px-7"} ${
            activeSubitem > -1
              ? "hover:bg-gray-300 hover:w-[200px]"
              : "hover:bg-gray-200"
          } w-full z-10
            ${
              i === 0 || i === subItems.length - 1
                ? "flex-2 max-w-[280px]"
                : "flex-1"
            }
          `}
        >
          {i !== subItems.length - 1 && (
            <span
              className={`absolute top-[24%] right-0 h-[50%] border-r border-gray-300 transition-opacity duration-200 
                ${
                  hover === i ||
                  hover === i + 1 ||
                  activeSubitem === i ||
                  activeSubitem === i + 1
                    ? "opacity-0"
                    : "opacity-100"
                }
              `}
            ></span>
          )}
          {navState && !subNavState ? (
            <div className="text-sm text-gray-600 font-semibold pl-3">
              Anytime
            </div>
          ) : (
            <>
              <p className="text-xs font-semibold">{subItem.label}</p>
              <p className="text-sm text-gray-500">{subItem.action.title}</p>
            </>
          )}
        </button>
      ))}

      <Menu
        open={activeSubitem > -1 && subNavState}
        type={getMenuType(activeSubitem)}
        anchorRef={subItemRefs.current[activeSubitem] as HTMLElement}
        containerRef={containerRef}
      />

      <div
        className={`absolute z-11  ${
          navState && !subNavState
            ? "top-[15%] right-[6px]"
            : "top-[20%] right-[10px]"
        }`}
      >
        <Button
          variant="icon"
          className={`text-white overflow-hidden flex items-center gap-2 bg-secondary-500 hover:bg-secondary-800 ${
            navState && !subNavState ? "p-1" : " p-3"
          } ${
            activeSubitem > -1 && subNavState
              ? "w-[100px]"
              : navState && !subNavState
              ? "w-[32px] pl-2"
              : "w-[46px] gap-0 pl-3.5"
          }`}
        >
          <IconSearch size={navState && !subNavState ? 15 : 19} stroke={3} />

          <p
            className={`${
              activeSubitem > -1 && subNavState
                ? ""
                : "-mr-20 opacity-0 font-bold"
            }`}
          >
            Search
          </p>
        </Button>
      </div>
    </div>
  );
}
