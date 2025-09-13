"use client";

import Button from "../Buttons/Button";
import { IconBrandAirbnb, IconMenu2, IconWorld } from "@tabler/icons-react";
import NavTab from "./Tab";
import NavSearch from "./Search";
import { navigationItems } from "@/lib/data/nav";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveNavState,
  setActiveSubNavState,
  setAppBarState,
} from "@/lib/store/navSlice";
import { RootState } from "@reduxjs/toolkit/query";
import NavSearchResponsive from "./SearchResponsive";
import Modal from "../Modal";
import { setLanguageModal } from "@/lib/store/modalSlice";

type Type = "primary" | "secondary";
type Links = { href: string; label: string }[];

type Props = {
  type?: Type;
  links?: Links;
  title?: string;
};

export default function Nav({}: Props) {
  const dispatch = useDispatch();
  const navState = useSelector((state: RootState) => state.nav.navState);
  const subNavState = useSelector((state: RootState) => state.nav.subNavState);
  const languageModal = useSelector((state: RootState) => state.modal.language);

  useEffect(() => {
    const threshold = 100;
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const scrolled = window.scrollY;
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;

      //  AppBar state logic
      if (atBottom) {
        setAppBarState(1);
      } else if (scrolled > lastScrollY) {
        setAppBarState(0);
      } else if (scrolled < lastScrollY) {
        setAppBarState(1);
      }

      if (scrolled > threshold && navState !== 1) {
        dispatch(setActiveNavState(1));
        dispatch(setActiveSubNavState(0));
      } else if (scrolled <= threshold && navState !== 0) {
        dispatch(setActiveNavState(0));
        dispatch(setActiveSubNavState(1));
      }

      lastScrollY = scrolled;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dispatch, navState]);

  return (
    <>
      {navState && subNavState ? (
        <div
          onClick={(e) => {
            dispatch(setActiveSubNavState(0));
          }}
          className="fixed opacity-30 bg-gray-800 w-screen h-screen z-5 left-0 top-0"
        ></div>
      ) : (
        <></>
      )}

      <nav
        className={`bg-primary-100 shadow-lg flex items-center flex-col pt-3.5 md:py-3.5 md:gap-0 gap-2 justify-end md:justify-start z-[100] w-full fixed top-0 ${
          navState && !subNavState
            ? "h-[110px] md:h-[80px]"
            : "h-[150px] md:h-[200px]"
        }`}
      >
        <NavSearchResponsive />

        <div className="max-w-[1801px] w-full flex justify-between items-center px-6">
          <div className="w-25 h-12 md:flex hidden">
            <img
              className="w-full h-full hidden lg:block"
              src="./logo.svg"
              alt=""
            />

            <div className="lg:hidden block text-secondary-600">
              <IconBrandAirbnb size={40} stroke={1.5} />
            </div>
          </div>

          <NavTab items={navigationItems} />

          <div className="hidden md:flex gap-2">
            <Button
              onClick={() => dispatch(setLanguageModal(1))}
              variant="icon"
            >
              <IconWorld size={18} />
            </Button>

            <Modal
              state={languageModal}
              setState={(value: number) => dispatch(setLanguageModal(value))}
            />

            <Button variant="icon">
              <IconMenu2 size={18} />
            </Button>
          </div>
        </div>

        <NavSearch />
      </nav>
    </>
  );
}
