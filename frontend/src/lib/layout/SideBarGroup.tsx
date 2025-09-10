"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Button from "../components/Buttons/Button";
import { IconMenu, IconX } from "@tabler/icons-react";

const SideBarGroup: React.FC = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setOpen(true);
      } else {
        setOpen(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={`fixed top-2 lg:top-0 left-0 bg-primary-950 ${
        open ? "translate-x-0" : "-translate-x-full"
      } lg:relative flex transition-all`}
    >
      <Sidebar />

      <Sidebar type="secondary" title="Sections" />

      <div className="relative right-0 top-0">
        <Button
          onClick={() => setOpen(!open)}
          className={`absolute bg-transparent lg:hidden block hover:bg-transparent text-white rounded-full p-2 transition-all right-[-40px] top-2`}
        >
          {open ? <IconX size={15} /> : <IconMenu size={15} />}
        </Button>
      </div>
    </div>
  );
};

export default SideBarGroup;
