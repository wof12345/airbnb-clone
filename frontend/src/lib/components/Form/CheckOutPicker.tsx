import { useDispatch, useSelector } from "react-redux";
import { DatePicker } from "./DatePicker";
import { setCheckIn } from "@/lib/store/filterSlice";
import { RootState } from "@/lib/store/store";

export function CheckIn() {
  const dispatch = useDispatch();
  const checkOut = useSelector((state: RootState) => state.filter.checkOut);

  return (
    <div>
      <DatePicker
        onSelect={(value) => {
          dispatch(setCheckIn(value));
        }}
      />
    </div>
  );
}
