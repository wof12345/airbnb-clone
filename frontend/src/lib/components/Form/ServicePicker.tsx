import { addService, removeService } from "@/lib/store/filterSlice";
import { RootState } from "@reduxjs/toolkit/query";
import {
  IconBottle,
  IconBottleFilled,
  IconCake,
  IconCamera,
  IconChefHat,
  IconMassage,
  IconMeat,
  IconScissors,
  IconStopwatch,
  IconTemperature,
} from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";

const hardCodedServices = [
  {
    name: "Photography",
    icon: <IconCamera size={22} />,
  },
  {
    name: "Chefs",
    icon: <IconChefHat size={22} />,
  },
  {
    name: "Prepared meals",
    icon: <IconMeat size={22} />,
  },
  {
    name: "Massage",
    icon: <IconMassage size={22} />,
  },
  {
    name: "Training",
    icon: <IconStopwatch size={22} />,
  },
  {
    name: "Makeup",
    icon: <IconBottle size={22} />,
  },
  {
    name: "Hair",
    icon: <IconScissors size={22} />,
  },
  {
    name: "Spa treatments",
    icon: <IconTemperature size={22} />,
  },
  {
    name: "Catering",
    icon: <IconCake size={22} />,
  },
  {
    name: "Nails",
    icon: <IconBottleFilled size={22} />,
  },
];

export function ServicePicker() {
  const dispatch = useDispatch();
  const services: string[] = useSelector(
    (state: RootState) => state.filter.service
  );

  return (
    <div className="p-2 py-3 flex flex-wrap gap-2">
      {hardCodedServices.map((hservice, idx: number) => (
        <button
          onClick={() => {
            if (!services.find((service) => service === hservice.name))
              dispatch(addService(hservice.name));
            else dispatch(removeService(hservice.name));
          }}
          key={idx}
          className={`flex gap-2 text-md items-center hover:text-gray-800 p-3 py-2 rounded-full hover:border-gray-800 hover:cursor-pointer ${
            services.find((service) => service === hservice.name)
              ? "text-gray-800 border border-gray-800"
              : "text-gray-600 border border-gray-300"
          } `}
        >
          <div>{hservice.icon}</div>

          <p>{hservice.name}</p>
        </button>
      ))}
    </div>
  );
}
