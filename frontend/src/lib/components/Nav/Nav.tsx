"use client";

import { useState } from "react";
import Button from "../Buttons/Button";
import { IconBrandAirbnb, IconMenu2, IconWorld } from "@tabler/icons-react";
import NavTab from "./Tab";
import NavSearch from "./Search";
import { navigationItems } from "@/lib/data/nav";

type Type = "primary" | "secondary";
type Links = { href: string; label: string }[];

type Props = {
  type?: Type;
  links?: Links;
  title?: string;
};

export default function Nav({}: Props) {
  return (
    <nav className="bg-primary-100 w-full h-max flex items-center flex-col py-3.5 justify-center">
      <div className="max-w-[1801px] w-full flex justify-between items-center px-6">
        <div className="w-25 h-12">
          <img
            className="w-full h-full hidden md:block"
            src="./logo.svg"
            alt=""
          />

          <div className="md:hidden block text-secondary-600">
            <IconBrandAirbnb size={40} stroke={1.5} />
          </div>
        </div>

        <NavTab items={navigationItems} />

        <div className="flex gap-2">
          <Button variant="icon">
            <IconWorld size={18} />
          </Button>

          <Button variant="icon">
            <IconMenu2 size={18} />
          </Button>
        </div>
      </div>

      <NavSearch />
    </nav>
  );
}
