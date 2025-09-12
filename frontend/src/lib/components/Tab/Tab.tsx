"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type TabContextType = {
  activeIndex: number;
  setActiveIndex: (i: number) => void;
};

const TabContext = createContext<TabContextType | undefined>(undefined);

function useTab() {
  const ctx = useContext(TabContext);
  if (!ctx) {
    return {
      activeIndex: 0,
      setActiveIndex: () => {},
    };
  }
  return ctx;
}

type TabProps = {
  children: ReactNode;
  defaultIndex?: number;
};

//main
export function Tab({ children, defaultIndex = 0 }: TabProps) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  return (
    <TabContext.Provider value={{ activeIndex, setActiveIndex }}>
      <div className="w-full">{children}</div>
    </TabContext.Provider>
  );
}

Tab.List = function TabList({ children }: { children: ReactNode }) {
  return <div className="flex gap-4 border-b border-gray-300">{children}</div>;
};

//tab button
Tab.Button = function TabButton({
  index,
  children,
}: {
  index: number;
  children: ReactNode;
}) {
  const { activeIndex, setActiveIndex } = useTab();
  const isActive = activeIndex === index;

  return (
    <button
      onClick={() => setActiveIndex(index)}
      className={`pb-2 text-sm border-b-2 ${
        isActive
          ? " border-primary-800 text-primary-700 font-semibold"
          : "text-gray-500 border-b-transparent"
      }`}
    >
      {children}
    </button>
  );
};

//tab body
Tab.Body = function TabBody({ children }: { children: ReactNode }) {
  return <div className="py-6">{children}</div>;
};

// tab panel
Tab.Panel = function TabPanel({
  index,
  children,
}: {
  index: number;
  children: ReactNode;
}) {
  const { activeIndex } = useTab();
  if (activeIndex !== index) return null;
  return <div>{children}</div>;
};
