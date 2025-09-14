import { navigationItems } from "@/lib/data/nav";
import {
  decrementGuest,
  GuestState,
  incrementGuest,
  setGuests,
} from "@/lib/store/filterSlice";
import { RootState } from "@/lib/store/store";
import { IconCircleMinus, IconCirclePlus } from "@tabler/icons-react";
import { useEffect } from "react";
import "react-calendar/dist/Calendar.css";
import { useDispatch, useSelector } from "react-redux";

export function GuestPicker() {
  const dispatch = useDispatch();
  const guests: GuestState = useSelector(
    (state: RootState) => state.filter.guests
  );
  const activeIndex = useSelector((state: RootState) => state.nav.activeIndex);

  useEffect(() => {
    console.log(guests, "guest", navigationItems[activeIndex].slug);
    if (navigationItems[activeIndex].slug === "experience") {
      dispatch(setGuests({ pets: 0 }));
    }
  }, [activeIndex]);

  return (
    <div className="flex flex-col gap-3 p-2 py-3">
      <div className="flex justify-between p-2 border-b border-gray-200 pb-5">
        <div>
          <div className="text-md font-semibold">Adults</div>
          <p className="text-sm text-gray-500">Ages 13 or above</p>
        </div>

        <div className="flex gap-3 items-center">
          <button
            onClick={() => {
              dispatch(decrementGuest("adults"));
            }}
            className="disabled:text-gray-300"
            disabled={guests.adults === 0}
          >
            <IconCircleMinus size={30} stroke={1} />
          </button>

          <span className="text-lg">{guests.adults}</span>

          <button
            onClick={() => {
              dispatch(incrementGuest("adults"));
            }}
            className=""
          >
            <IconCirclePlus size={30} stroke={1} />
          </button>
        </div>
      </div>

      <div className="flex justify-between p-2 border-b border-gray-200 pb-5">
        <div>
          <div className="text-md font-semibold">Children</div>
          <p className="text-sm text-gray-500">Ages 2 - 12</p>
        </div>

        <div className="flex gap-3 items-center">
          <button
            onClick={() => {
              dispatch(decrementGuest("children"));
            }}
            className="disabled:text-gray-300"
            disabled={guests.children === 0}
          >
            <IconCircleMinus size={30} stroke={1} />
          </button>

          <span className="text-lg">{guests.children}</span>

          <button
            onClick={() => {
              dispatch(incrementGuest("children"));
            }}
            className=""
          >
            <IconCirclePlus size={30} stroke={1} />
          </button>
        </div>
      </div>

      <div
        className={`flex justify-between p-2 ${
          navigationItems[activeIndex].slug === "experience"
            ? ""
            : "border-b border-gray-200"
        } pb-5`}
      >
        <div>
          <div className="text-md font-semibold">Infants</div>
          <p className="text-sm text-gray-500">Under 2</p>
        </div>

        <div className="flex gap-3 items-center">
          <button
            onClick={() => {
              dispatch(decrementGuest("infants"));
            }}
            className="disabled:text-gray-300"
            disabled={guests.infants === 0}
          >
            <IconCircleMinus size={30} stroke={1} />
          </button>

          <span className="text-lg">{guests.infants}</span>

          <button
            onClick={() => {
              dispatch(incrementGuest("infants"));
            }}
            className=""
          >
            <IconCirclePlus size={30} stroke={1} />
          </button>
        </div>
      </div>

      {navigationItems[activeIndex].slug === "home" && (
        <div className="flex justify-between p-2 pb-5">
          <div>
            <div className="text-md font-semibold">Pets</div>
            <p className="text-sm text-gray- underline">
              Bringing a service animal?
            </p>
          </div>

          <div className="flex gap-3 items-center">
            <button
              onClick={() => {
                dispatch(decrementGuest("pets"));
              }}
              className="disabled:text-gray-300"
              disabled={guests.pets === 0}
            >
              <IconCircleMinus size={30} stroke={1} />
            </button>

            <span className="text-lg">{guests.pets}</span>

            <button
              onClick={() => {
                dispatch(incrementGuest("pets"));
              }}
              className=""
            >
              <IconCirclePlus size={30} stroke={1} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
