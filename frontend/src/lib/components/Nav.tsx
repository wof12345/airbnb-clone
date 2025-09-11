"use client";

import { useState } from "react";
import Button from "./Buttons/Button";
import {
  IconBrandAirbnb,
  IconGlobe,
  IconHome,
  IconMenu,
  IconMenu2,
  IconWorld,
} from "@tabler/icons-react";

type Type = "primary" | "secondary";
type Links = { href: string; label: string }[];

type Props = {
  type?: Type;
  links?: Links;
  title?: string;
};

export default function Nav({}: Props) {
  const [open, setOpen] = useState(true);

  return (
    <nav className="bg-primary-100 w-full h-24 flex items-center justify-center">
      <div className="max-w-[1801px] w-full flex justify-between items-center px-6">
        <div className="w-25 h-12 text-red-400">
          <img className="w-full h-full" src="./logo.svg" alt="" />
        </div>

        <div className="flex flex-col gap-4 text-black">
          <div className="flex gap-3">
            <IconHome />
            <p>Homes</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="icon">
            <IconWorld size={18} />
          </Button>

          <Button variant="icon">
            <IconMenu2 size={18} />
          </Button>
        </div>
      </div>
    </nav>
  );
}
