import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { monthNames } from "@/lib/constants";
import { Filter } from "lucide-react";

export interface MonthFilterProps {
  /** zero‑based month index (0 = January) */
  selectedMonth: number;
  onMonthChange: (month: number) => void;
}

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
          <SelectValue>{monthNames[selectedMonth]}</SelectValue>
        </SelectTrigger>

        <SelectContent>
          {monthNames.map((label, index) => (
            <SelectItem key={index} value={String(index)}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }
);
