"use client";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@reduxjs/toolkit/query";
import { ActionType, navigationItems, SubItem } from "@/lib/data/nav";
import Button from "../Buttons/Button";
import { IconSearch, IconX } from "@tabler/icons-react";
import Menu from "../Menu";
import { setActiveSubNavState, setSearchIndicator } from "@/lib/store/navSlice";
import { LocationMenu } from "../LocationMenu";
import { DatePicker } from "../Form/DatePicker";
import { GuestPicker } from "../Form/GuestPicker";
import {
  GuestState,
  setCheckIn,
  setCheckOut,
  setDate,
  setDestination,
  setGuests,
  setService,
} from "@/lib/store/filterSlice";
import { ServicePicker } from "../Form/ServicePicker";
import { Checkout } from "../Form/CheckInPicker";
import { CheckIn } from "../Form/CheckOutPicker";
import { convertToReadable } from "@/lib/utils/date";

export default function NavSearch() {
  const dispatch = useDispatch();

  const active = useSelector((state: RootState) => state.nav.activeIndex);
  const navState = useSelector((state: RootState) => state.nav.navState);
  const subNavState = useSelector((state: RootState) => state.nav.subNavState);
  const searchIndicator = useSelector(
    (state: RootState) => state.nav.searchIndicator
  );

  const destination = useSelector(
    (state: RootState) => state.filter.destination
  );
  const checkIn = useSelector((state: RootState) => state.filter.checkIn);
  const checkOut = useSelector((state: RootState) => state.filter.checkOut);
  const date = useSelector((state: RootState) => state.filter.date);
  const guests = useSelector((state: RootState) => state.filter.guests);
  const services = useSelector((state: RootState) => state.filter.service);

  const [hover, setHover] = useState<number>(-1);
  const [activeSubitem, setActiveSubItem] = useState<number>(-1);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [subItems, setSubItems] = useState<SubItem[]>(
    navigationItems[0].subItems
  );

  const indicatorRef = useRef<HTMLDivElement | null>(null);
  const subItemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function getMenuComponent(active: number) {
    const subItem = subItems[active];

    if (!subItem) return <></>;

    const type: ActionType = subItem.action.type;

    switch (type) {
      case "location-search-dropdown":
        return <LocationMenu />;
      case "checkout":
        return <Checkout />;
      case "checkin":
        return <CheckIn />;
      case "date":
        return <DatePicker onSelect={(value) => dispatch(setDate(value))} />;
      case "invitation-menu":
        return <GuestPicker />;
      case "location-search":
        return <LocationMenu />;
      case "service-selection":
        return <ServicePicker />;

      default:
        return <></>;
    }
  }

  const handleChange = (e) => {
    dispatch(setDestination(e.target.value));
  };

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

  function getComponentOrValue(subItem: SubItem) {
    if (subItem.action.type === "location-search-dropdown") {
      return (
        <input
          onFocus={() => setActiveSubItem(0)}
          onInput={handleChange}
          className="outline-none text-sm placeholder:text-sm placeholder:text-gray-500"
          placeholder={subItem.action.title}
          value={destination}
          type="text"
          name=""
          id=""
        />
      );
    } else if (
      subItem.action.type === "invitation-menu" &&
      generateGuestText(subItem) !== subItem.action.title
    ) {
      return (
        <div className="max-w-[120px] text-sm text-gray-500">
          <p className="truncate">{generateGuestText(subItem)}</p>
        </div>
      );
    } else if (
      subItem.action.type === "service-selection" &&
      generateServiceText(subItem) !== subItem.action.title
    ) {
      return (
        <div className="max-w-[130px] text-sm text-gray-500">
          <p className="truncate">{generateServiceText(subItem)}</p>
        </div>
      );
    } else if (subItem.action.type === "checkin" && checkIn) {
      return (
        <div className="max-w-[70px] text-sm text-gray-500">
          <p className="truncate">{convertToReadable(checkIn)}</p>
        </div>
      );
    } else if (subItem.action.type === "date" && date) {
      return (
        <div className="max-w-[70px] text-sm text-gray-500">
          <p className="truncate">{convertToReadable(date)}</p>
        </div>
      );
    } else if (subItem.action.type === "checkout" && checkOut) {
      return (
        <div className="max-w-[70px] text-sm text-gray-500">
          <p className="truncate">{convertToReadable(checkOut)}</p>
        </div>
      );
    } else {
      return <p className="text-sm text-gray-500">{subItem.action.title}</p>;
    }
  }

  useEffect(() => {
    console.log(checkIn, checkOut);
  }, [checkIn, checkOut]);

  function getIfValueSelected(subItem: SubItem) {
    if (subItem.action.type === "location-search-dropdown" && destination) {
      return (
        <Button
          onClick={() => dispatch(setDestination(""))}
          variant="icon"
          className="absolute my-auto right-2 p-1 bg-white hover:bg-gray-100"
        >
          <IconX size={15} />
        </Button>
      );
    } else if (
      subItem.action.type === "invitation-menu" &&
      generateGuestText(subItem) !== subItem.action.title
    ) {
      return (
        <Button
          onClick={() =>
            dispatch(setGuests({ adults: 0, pets: 0, children: 0, infants: 0 }))
          }
          variant="icon"
          className={`absolute my-auto ${
            navState ? "right-12" : "right-30"
          } p-1 bg-white hover:bg-gray-100`}
        >
          <IconX size={15} />
        </Button>
      );
    } else if (
      subItem.action.type === "service-selection" &&
      generateServiceText(subItem) !== subItem.action.title
    ) {
      return (
        <Button
          onClick={() => dispatch(setService([]))}
          variant="icon"
          className={`absolute my-auto ${
            navState ? "right-12" : "right-28"
          } p-1 bg-white hover:bg-gray-100`}
        >
          <IconX size={15} />
        </Button>
      );
    } else if (subItem.action.type === "checkin" && checkIn) {
      return (
        <Button
          onClick={() => dispatch(setCheckIn(undefined))}
          variant="icon"
          className={`absolute my-auto ${
            navState ? "right-2" : "right-2"
          } p-1 bg-white hover:bg-gray-100`}
        >
          <IconX size={15} />
        </Button>
      );
    } else if (subItem.action.type === "date" && date) {
      return (
        <Button
          onClick={() => dispatch(setDate(undefined))}
          variant="icon"
          className={`absolute my-auto ${
            navState ? "right-2" : "right-2"
          } p-1 bg-white hover:bg-gray-100`}
        >
          <IconX size={15} />
        </Button>
      );
    } else if (subItem.action.type === "checkout" && checkOut) {
      return (
        <Button
          onClick={() => dispatch(setCheckOut(undefined))}
          variant="icon"
          className={`absolute my-auto ${
            navState ? "right-2" : "right-2"
          } p-1 bg-white hover:bg-gray-100`}
        >
          <IconX size={15} />
        </Button>
      );
    } else {
      // return <p className="text-sm text-gray-500">{subItem.action.title}</p>;
    }
  }

  function getShrunkMenuContent(subItem: SubItem) {
    console.log("checkInTimestamp", checkIn);
    if (subItem.action.type === "location-search-dropdown" && destination) {
      return (
        <div className="max-w-[70px] text-sm text-gray-500">
          <p className="truncate">{destination}</p>
        </div>
      );
    } else if (
      subItem.action.type === "invitation-menu" &&
      generateGuestText(subItem) !== subItem.action.title
    ) {
      return (
        <div className="max-w-[70px] text-sm text-gray-500">
          <p className="truncate">{generateGuestText(subItem)}</p>
        </div>
      );
    } else if (
      subItem.action.type === "service-selection" &&
      generateServiceText(subItem) !== subItem.action.title
    ) {
      return (
        <div className="max-w-[70px] text-sm text-gray-500">
          <p className="truncate">{generateServiceText(subItem)}</p>
        </div>
      );
    } else if (subItem.action.type === "checkin" && checkIn) {
      return (
        <div className="max-w-[70px] text-sm text-gray-500">
          <p className="truncate">{convertToReadable(checkIn)}</p>
        </div>
      );
    } else if (subItem.action.type === "date" && date) {
      return (
        <div className="max-w-[70px] text-sm text-gray-500">
          <p className="truncate">{convertToReadable(date)}</p>
        </div>
      );
    } else if (subItem.action.type === "checkout" && checkOut) {
      return (
        <div className="max-w-[70px] text-sm text-gray-500">
          <p className="truncate">{convertToReadable(checkOut)}</p>
        </div>
      );
    } else {
      if (subItem.action.type === "location-search-dropdown") {
        return "Anywhere";
      } else if (subItem.action.type.includes("date")) {
        return "Anytime";
      } else if (subItem.action.type === "service-selection") {
        return "Any";
      } else {
        return "Anyone";
      }
    }
  }

  function generateGuestText(subItem: SubItem): string {
    const roleLabels: Record<keyof GuestState, string> = {
      adults: "adult",
      children: "child",
      infants: "infant",
      pets: "pet",
    };

    const parts: string[] = [];

    (Object.keys(guests) as (keyof GuestState)[]).forEach((key) => {
      const value = guests[key];
      if (value > 0) {
        const label = roleLabels[key];

        parts.push(`${value} ${label}${value > 1 ? "s" : ""}`);
      }
    });

    return parts.length === 0 ? subItem.action.title : parts.join(", ");
  }

  function generateServiceText(subItem: SubItem): string {
    return services.length === 0 ? subItem.action.title : services.join(", ");
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
    }, 0);
  }, [activeSubitem, subItems]);

  useEffect(() => {
    const handleResize = () => {
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
      <div
        ref={indicatorRef}
        className={`absolute top-0 left-0 h-full rounded-full bg-white shadow-md  transition-all duration-300 ease-in-out ${
          activeSubitem > -1 && subNavState ? "scale-100" : "scale-0"
        }`}
        style={{ width: 0 }}
      ></div>

      {subItems?.map((subItem, i) => (
        <div
          key={i}
          ref={(el) => (subItemRefs.current[i] = el)}
          onClick={() => {
            if (navState && !subNavState) {
              dispatch(setActiveSubNavState(1));
            } else setActiveSubItem(i);
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
              {getShrunkMenuContent(subItem)}
            </div>
          ) : (
            <>
              <p className="text-xs font-semibold">{subItem.label}</p>

              {getComponentOrValue(subItem)}
            </>
          )}

          {getIfValueSelected(subItem)}
        </div>
      ))}

      <Menu
        open={activeSubitem > -1 && subNavState}
        type={getMenuType(activeSubitem)}
        anchorRef={subItemRefs.current[activeSubitem] as HTMLElement}
        containerRef={containerRef}
      >
        {getMenuComponent(activeSubitem)}
      </Menu>

      <div
        className={`absolute z-11  ${
          navState && !subNavState
            ? "top-[17%] right-[6px]"
            : "top-[20%] right-[10px]"
        }`}
      >
        <Button
          onClick={() => {
            if (!searchIndicator) {
              dispatch(setSearchIndicator(1));
            }
          }}
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
