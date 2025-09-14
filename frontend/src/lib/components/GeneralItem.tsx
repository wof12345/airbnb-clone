"use client";

import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  title: string;
  subTitle: string;
  icon: boolean;
  children: ReactNode;
};

export default function GeneralItem({
  title = "",
  subTitle = "",
  icon = false,
  children,
  ...props
}: Props) {
  return (
    <button
      onClick={props.onClick}
      className={twMerge(
        `group flex flex-row gap-4 items-start justify-start relative hover:cursor-pointer`,
        props.className
      )}
    >
      {icon ? (
        <div className="flex items-center justify-center p-2 rounded-lg bg-gray-200">
          {children}
        </div>
      ) : (
        <></>
      )}

      <div className="group flex flex-col gap-[1px] items-start justify-center relative">
        <h1 className="text-sm font-semibold text-start text-gray-800">
          {title}
        </h1>
        <p className="text-sm text-gray-500 font-normal group-hover:text-gray-800 leading-4">
          {subTitle}
        </p>
      </div>
    </button>
  );
}
