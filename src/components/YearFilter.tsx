import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";

export interface YearFilterProps {
  /** currently selected year */
  selectedYear: number;
  onYearChange: (year: number) => void;
  /** optional range: defaults to currentYear - 10 through currentYear + 0 */
  startYear?: number;
  endYear?: number;
}

export const YearFilter: React.FC<YearFilterProps> = React.memo(
  ({ selectedYear, onYearChange, startYear, endYear }) => {
    const currentYear = new Date().getFullYear();
    const minYear = startYear ?? currentYear - 10;
    const maxYear = endYear ?? currentYear;

    const years = Array.from(
      { length: maxYear - minYear + 1 },
      (_, i) => maxYear - i
    );

    return (
      <Select
        value={String(selectedYear)}
        onValueChange={(val) => onYearChange(parseInt(val, 10))}
      >
        <SelectTrigger className="cursor-pointer w-[180px]">
          <Filter className="mr-2 h-4 w-4" />
          <SelectValue>{selectedYear}</SelectValue>
        </SelectTrigger>

        <SelectContent>
          {years.map((year) => (
            <SelectItem key={year} value={String(year)}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }
);
