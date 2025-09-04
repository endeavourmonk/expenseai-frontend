import { motion } from "framer-motion";
import { buttonVariants } from "./variants";
import TransactionForm from "../forms/TransactionForm";
import { MonthFilter } from "../MonthFilter";
import { YearFilter } from "../YearFilter";
import { monthNames } from "@/lib/constants";

interface DashboardHeaderProps {
  /* Month filter props */
  selectedMonth: number;
  onMonthChange: (period: number) => void;

  /* Year filter props */
  selectedYear: number;
  onYearChange: (year: number) => void;
}

export const DashboardHeader = ({
  selectedMonth,
  onMonthChange,
  selectedYear,
  onYearChange,
}: DashboardHeaderProps) => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    {/* Header Lines */}
    <div>
      {/* <motion.h1
        className="text-3xl font-bold text-gray-900 dark:text-white"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, type: "spring" }}
      >
        Dashboard for {monthNames[selectedMonth]}, {selectedYear}
      </motion.h1> */}

      <motion.h1
        className="text-3xl font-bold text-gray-900 dark:text-white relative inline-block"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, type: "spring" }}
      >
        Dashboard for{" "}
        <span className="relative inline-block">
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent font-extrabold">
            {monthNames[selectedMonth]}, {selectedYear}
          </span>

          {/* Main animated underline */}
          <motion.div
            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              delay: 0.6,
              duration: 0.8,
              ease: [0.4, 0, 0.2, 1],
            }}
            style={{ transformOrigin: "left" }}
          />

          {/* Subtle glow */}
          <motion.div
            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400 rounded-full blur-sm opacity-50"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              delay: 0.6,
              duration: 0.8,
              ease: [0.4, 0, 0.2, 1],
            }}
            style={{ transformOrigin: "left" }}
          />
        </span>
      </motion.h1>

      <motion.p
        className="text-gray-600 dark:text-gray-400 mt-1"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        Track and manage your finances
      </motion.p>
    </div>

    {/* Filters */}
    <motion.div
      className="flex items-center gap-3"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 }}
    >
      <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
        <MonthFilter
          selectedMonth={selectedMonth}
          onMonthChange={onMonthChange}
        />
      </motion.div>

      <YearFilter
        selectedYear={selectedYear}
        startYear={2000}
        onYearChange={onYearChange}
      />

      {/* Transaction Form */}
      <TransactionForm />
    </motion.div>
  </div>
);
