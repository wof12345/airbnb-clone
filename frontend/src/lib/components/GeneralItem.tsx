"use client";

type Props = {
  title: string;
  subTitle: string;
};

export default function GeneralItem({ title = "", subTitle = "" }: Props) {
  return (
    <button>
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
