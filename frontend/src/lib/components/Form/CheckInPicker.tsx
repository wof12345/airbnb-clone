import { useDispatch, useSelector } from "react-redux";
import { DatePicker } from "./DatePicker";
import { setCheckOut } from "@/lib/store/filterSlice";
import { RootState } from "@/lib/store/store";

export function Checkout() {
  const dispatch = useDispatch();
  const checkIn = useSelector((state: RootState) => state.filter.checkIn);

  return (
    <div>
      <DatePicker
        onSelect={(value) => {
          dispatch(setCheckOut(value));
        }}
      />
    </div>
  );
}
