"use client";

import { useState } from "react";
import { Tab } from "../Tab/Tab";
import FooterTab from "./TabPanel";
import FooterLinks from "./Links";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandX,
  IconCurrencyPound,
  IconWorld,
} from "@tabler/icons-react";

type Type = "primary" | "secondary";
type Links = { href: string; label: string }[];

type Props = {
  type?: Type;
  links?: Links;
  title?: string;
};

export default function Footer({}: Props) {
  const footerBarLinks = [
    { href: "#", label: "Privacy" },
    { href: "#", label: "Terms" },
    { href: "#", label: "Sitemap" },
    { href: "#", label: "UK Modern Slavery Act" },
    { href: "#", label: "Company details" },
    { href: "#", label: "Airbnb UK Limited S.172 Statement" },
    { href: "#", label: "Airbnb Payments UK Limited S.172 Statement" },
  ];

  return (
    <footer className="bg-primary-100 w-full h-max flex flex-col pt-12 pb- md:py-12 px-6 md:px-12 mt-10">
      <div className="max-w-[1440px] m-auto w-full flex flex-col">
        <h1 className="text-xl text-start mb-5 font-semibold">
          Inspiration for future getaways
        </h1>

        <Tab defaultIndex={0}>
          <Tab.List>
            <Tab.Button index={0}>Home</Tab.Button>
            <Tab.Button index={1}>Profile</Tab.Button>
            <Tab.Button index={2}>Settings</Tab.Button>
          </Tab.List>

          <Tab.Body>
            <Tab.Panel index={0}>
              <FooterTab />
            </Tab.Panel>
            <Tab.Panel index={1}>
              <FooterTab />
            </Tab.Panel>
            <Tab.Panel index={2}>
              <FooterTab />
            </Tab.Panel>
          </Tab.Body>
        </Tab>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 py-8 gap-8">
        <FooterLinks title="Support" />
        <FooterLinks title="Support" />
        <FooterLinks title="Support" />
      </div>

      <div className="py-6 border-t-none md:border-t border-gray-300 text-gray-800 flex lg:flex-row gap-5 justify-between  flex-col-reverse">
        <div className="flex flex-col gap-1">
          <p className="text-sm ">© 2025 Airbnb, Inc.</p>

          <div className="flex flex-wrap">
            {footerBarLinks.map((link, idx) => (
              <div className="flex" key={idx}>
                <a className="text-sm hover:underline" href={link.href}>
                  {link.label}
                </a>
                {idx < footerBarLinks.length - 1 ? (
                  <span className="leading-3 px-1.5">.</span>
                ) : (
                  <span className="leading-3">.</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-5 flex-col sm:flex-row items-start sm:items-center justify-between">
          <div className="flex gap-5">
            <button className="flex gap-1 items-center">
              <IconWorld size={17} />

              <p className="text-sm font-semibold">English (GB)</p>
            </button>

            <button className="flex gap-1 items-center">
              <IconCurrencyPound size={17} />

              <p className="text-sm font-semibold">GBP</p>
            </button>
          </div>

          <div className="flex gap-5 ">
            <IconBrandFacebook size={17} />
            <IconBrandX size={17} />
            <IconBrandInstagram size={17} />
          </div>
        </div>
      </div>
    </footer>
  );
}
