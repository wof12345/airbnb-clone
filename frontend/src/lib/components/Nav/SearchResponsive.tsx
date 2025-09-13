"use client";

import { useDispatch, useSelector } from "react-redux";

import { IconSearch } from "@tabler/icons-react";

export default function NavSearchResponsive() {
  const dispatch = useDispatch();
  return (
    <button
      className={`nav-search-container md:hidden relative rounded-full w-[90%] flex gap-2 items-center text-gray-700 justify-center p-4 hover:text-gray-950 `}
      style={{ boxShadow: "0px 0px 40px -7px rgba(0,0,0,0.30)" }}
    >
      <IconSearch size={15} />

      <p className="text-sm  font-semibold">Start your search</p>
    </button>
  );
}
