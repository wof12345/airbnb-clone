"use client";

import { allowed_cities, allowed_service_types } from "./allowedData";
import { randomChoice } from "./rng";

const thirtyDaysFromNow = new Date();
thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

export const homeItems = [
  {
    title: "Popular in ",
    city: randomChoice(allowed_cities),
  },
  {
    title: "Available next month in ",
    city: randomChoice(allowed_cities),
    date: thirtyDaysFromNow,
  },
  {
    title: "Stay in ",
    city: randomChoice(allowed_cities),
  },
  {
    title: "Available next month in ",
    city: randomChoice(allowed_cities),
    date: thirtyDaysFromNow,
  },
  {
    title: "Homes in ",
    city: randomChoice(allowed_cities),
  },
  {
    title: "Available next month in ",
    city: randomChoice(allowed_cities),
    date: thirtyDaysFromNow,
  },
  {
    title: "Places to stay in ",
    city: randomChoice(allowed_cities),
  },
  {
    title: "Checkout homes in ",
    city: randomChoice(allowed_cities),
  },
];

export const expItems = [
  {
    title: "Airbnb Originals",
    city: randomChoice(allowed_cities),
  },
  {
    title: "Popular experiences in ",
    city: randomChoice(allowed_cities),
  },
  {
    title: "All experiences in ",
    city: randomChoice(allowed_cities),
  },
  {
    title: "Available next month in ",
    city: randomChoice(allowed_cities),
    date: thirtyDaysFromNow,
  },
  {
    title: "Popular with travelers from your area",
    items: [
      {
        title: "Experiences in ",
        city: randomChoice(allowed_cities),
      },
      {
        title: "Experiences in ",
        city: randomChoice(allowed_cities),
        date: thirtyDaysFromNow,
      },
      {
        title: "Experiences in ",
        city: randomChoice(allowed_cities),
      },
      {
        title: "Experiences in ",
        city: randomChoice(allowed_cities),
      },
    ],
  },
];

export const serviceItems = [
  {
    service: randomChoice(allowed_service_types),
  },
  {
    service: randomChoice(allowed_service_types),
  },
  {
    service: randomChoice(allowed_service_types),
  },
];
