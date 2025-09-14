"use client";

import { useState, useRef, useEffect } from "react";
import { twMerge } from "tailwind-merge";

type Type = "type-1" | "type-2" | "type-3" | "type-4" | "custom";

type Props = {
  anchorRef?: HTMLElement;
  containerRef?: React.RefObject<HTMLElement>;
  open: boolean;
  children: React.ReactNode;
  type: Type;
};

export default function Menu({
  anchorRef,
  containerRef,
  open = false,
  children,
  type = "type-1",
  ...props
}: Props) {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [styles, setStyles] = useState({ top: 0, left: 0, width: "100%" });

  function getStyleByType(type: Type, rect: DOMRect, containerRect: DOMRect) {
    const topGap = 15;

    const relativeTop = rect.bottom - containerRect.top + topGap;
    const relativeLeft = rect.left - containerRect.left;

    switch (type) {
      case "type-1":
        return {
          top: relativeTop,
          left: 0,
          width: "50%",
        };
      case "type-2":
        return {
          top: relativeTop,
          left: 0,
          width: "100%",
        };
      case "type-3":
        return {
          top: relativeTop,
          left: "20%",
          width: "70%",
        };
      case "type-4":
        return {
          top: relativeTop,
          left: "40%",
          width: "60%",
        };
      default:
        return {
          top: relativeTop,
          left: relativeLeft,
          width: rect.width,
        };
    }
  }

  const updatePosition = () => {
    const anchor = anchorRef;

    setTimeout(() => {
      if (anchor) {
        const rect = anchor.getBoundingClientRect();
        const containerRect = containerRef?.current.getBoundingClientRect();

        setStyles(getStyleByType(type, rect, containerRect));
      }
    }, 130);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        anchorRef &&
        !anchorRef.contains(e.target as Node)
      ) {
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [anchorRef]);

  useEffect(() => {
    updatePosition();
  }, [open, anchorRef]);

  useEffect(() => {
    const handleResize = () => updatePosition();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [anchorRef]);

  return (
    <div
      ref={menuRef}
      style={{ top: styles.top, left: styles.left, width: styles.width }}
      className={twMerge(
        `absolute top-0 left-0 z-50 min-h-[200px] h-max bg-white shadow-lg rounded-4xl p-4 min-w-[200px] delay-700 ${
          open
            ? "scale-100 opacity-100"
            : "scale-0 pointer-events-none opacity-0"
        }`,
        props.className
      )}
    >
      {children}
    </div>
  );
}
