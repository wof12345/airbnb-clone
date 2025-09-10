"use client";

import Link from "next/link";
import Button from "./Buttons/Button";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useState } from "react";

type Type = "primary" | "secondary";
type Links = { href: string; label: string }[];

type Props = {
  type?: Type;
  links?: Links;
  title?: string;
};

export default function Sidebar({
  links = [],
  type = "primary",
  title = "Documents",
}: Props) {
  const [open, setOpen] = useState(true);

  return (
    <aside
      className={`sticky left-0 top-0 bg-primary-950 transition-all my-auto  ${
        open
          ? `w-64 p-5  ${type === "primary" ? "h-screen " : "h-screen"}`
          : `w-12 p-2  ${
              type === "primary" ? "ml-2 h-[98vh] rounded-md" : "h-[98vh]"
            }`
      } `}
    >
      <div className="flex justify-between">
        {open ? <h1 className="text-lg font-semibold">{title}</h1> : null}

        <Button onClick={() => setOpen(!open)} className="rounded-full p-2">
          {open ? (
            <IconChevronLeft size={15} />
          ) : (
            <IconChevronRight size={15} />
          )}
        </Button>
      </div>

      <nav className="flex flex-col p-4 space-y-2">
        {links.length === 0 && open ? (
          <div className="flex flex-col gap-2">
            <p className="text-xs italic text-primary-200 my-auto">
              No {title} yet!
            </p>
            <Button className="text-sm py-1 px-2">Create</Button>
          </div>
        ) : null}

        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="px-3 py-2 rounded hover:bg-gray-200 transition"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
