import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";

export interface MonthFilterProps {
  /** zero‑based month index (0 = January) */
  selectedMonth: number;
  onMonthChange: (month: number) => void;
}

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const MonthFilter: React.FC<MonthFilterProps> = React.memo(
  ({ selectedMonth, onMonthChange }) => {
    return (
      <Select
        value={String(selectedMonth)}
        onValueChange={(val) => {
          const monthIndex = parseInt(val, 10);
          onMonthChange(monthIndex);
        }}
      >
        <SelectTrigger className="cursor-pointer w-[180px]">
          <Filter className="mr-2 h-4 w-4" />
          <SelectValue>{labels[selectedMonth]}</SelectValue>
        </SelectTrigger>

        <SelectContent>
          {labels.map((label, index) => (
            <SelectItem key={index} value={String(index)}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }
);
