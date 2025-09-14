import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export function DatePicker({ onSelect = (value: string | Date) => {} }) {
  const [value, onChange] = useState<Value>(null);

  useEffect(() => {
    if (!value) return;
    onSelect(value?.toISOString());
  }, [value]);

  return (
    <div>
      <Calendar onChange={onChange} value={value} />
    </div>
  );
}
