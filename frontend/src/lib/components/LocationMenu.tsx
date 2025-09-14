import "react-calendar/dist/Calendar.css";
import GeneralItem from "./GeneralItem";
import { IconTower } from "@tabler/icons-react";
import { useDispatch } from "react-redux";

import { setDestination } from "../store/filterSlice";

const hardCodedData = [
  {
    title: "Nearby",
    subTitle: `Find what's around you`,
    destination: "",
  },
  {
    title: "Bangkok, Thailand",
    subTitle: `Family Friendly`,
    destination: "Bangkok, Thailand",
  },
  {
    title: "Toronto, Canada",
    subTitle: `Find what's around you`,
    destination: "Toronto, Canada",
  },
  {
    title: "Kolkata, India",
    subTitle: `For it's top notch dining`,
    destination: "Kolkata, India",
  },
  {
    title: "Kolkata, India",
    subTitle: `For it's top notch dining`,
    destination: "Kolkata, India",
  },
  {
    title: "Kolkata, India",
    subTitle: `For it's top notch dining`,
    destination: "Kolkata, India",
  },
  {
    title: "Kolkata, India",
    subTitle: `For it's top notch dining`,
    destination: "Kolkata, India",
  },
];

export function LocationMenu() {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col gap-3 w-full p-2 py-3 max-h-[490px] overflow-auto">
      <div className="flex flex-col items-start gap-1">
        <p className="text-xs px-2">Recent Searches</p>
        <GeneralItem
          className="py-3 px-2 hover:bg-gray-200 rounded-lg w-full"
          title="London"
          subTitle="16-17 Sept"
          icon={true}
        >
          <IconTower />
        </GeneralItem>
      </div>

      <div className="flex flex-col items-start gap-1">
        <p className="text-xs px-2">Suggested destinations</p>
        {hardCodedData.map((data, idx) => (
          <GeneralItem
            key={idx}
            onClick={() => dispatch(setDestination(data.destination))}
            className="py-3 px-2 hover:bg-gray-200 rounded-lg w-full"
            title={data.title}
            subTitle={data.subTitle}
            icon={true}
          >
            <IconTower />
          </GeneralItem>
        ))}
      </div>
    </div>
  );
}
