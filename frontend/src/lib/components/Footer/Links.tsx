"use client";

import { title } from "process";
import { useState } from "react";

type Links = { href: string; label: string }[];

type Props = {
  links?: Links;
  title?: string;
};

export default function FooterLinks({
  links = [
    { label: "Help Centre", href: "#" },
    { label: "Help Centre", href: "#" },
    { label: "Help Centre", href: "#" },
    { label: "Help Centre", href: "#" },
    { label: "Help Centre", href: "#" },
    { label: "Help Centre", href: "#" },
    { label: "Help Centre", href: "#" },
  ],
  title,
}: Props) {
  return (
    <div className="flex flex-col gap-4 md:w-max w-full border-b md:border-none border-b-gray-300 md:pb-0 pb-5">
      <h1 className="text-sm font-semibold text-gray-700">{title}</h1>

      {links.map((link, idx) => (
        <a
          className="text-sm hover:underline text-gray-800"
          key={idx}
          href={link.href}
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}
