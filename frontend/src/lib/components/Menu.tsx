"use client";

import { useState, useRef, useEffect } from "react";

type Props = {
  title: string;
  subTitle: string;
  anchorRef?: React.RefObject<HTMLElement>;
  open: boolean;
};

export default function Menu({
  title,
  subTitle,
  anchorRef,
  open = false,
}: Props) {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  // Calculate position relative to anchor
  const updatePosition = () => {
    const anchor = anchorRef?.current;
    if (anchor) {
      const rect = anchor.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        anchorRef?.current &&
        !anchorRef.current.contains(e.target as Node)
      ) {
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [anchorRef]);

  useEffect(() => {
    updatePosition();
  }, [open]);

  useEffect(() => {
    const handleResize = () => updatePosition();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [anchorRef]);

  return (
    <>
      {open && (
        <div
          ref={menuRef}
          style={{ top: position.top, left: position.left }}
          className="absolute top-0 z-50 bg-white shadow-lg rounded p-4 min-w-[200px]"
        >
          <h1 className="text-sm font-semibold text-gray-800">{title}</h1>
          <p className="text-sm text-gray-500">{subTitle}</p>
        </div>
      )}
      {/* optional internal trigger button */}
      {!anchorRef && (
        <button
          onClick={openMenu}
          className="px-4 py-2 bg-blue-500 text-white rounded mt-2"
        >
          Open Menu
        </button>
      )}
    </>
  );
}
