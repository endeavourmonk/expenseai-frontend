import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { buttonVariants } from "./variants";
import TransactionForm from "../forms/TransactionForm";
import { MonthFilter } from "../MonthFilter";

interface DashboardHeaderProps {
  selectedMonth: number;
  onMonthChange: (period: number) => void;
}

export const DashboardHeader = ({
  selectedMonth,
  onMonthChange,
}: DashboardHeaderProps) => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    {/* Header Lines */}
    <div>
      <motion.h1
        className="text-3xl font-bold text-gray-900 dark:text-white"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, type: "spring" }}
      >
        Dashboard
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

      {/* Transaction Form */}
      <TransactionForm />
    </motion.div>
  </div>
);
