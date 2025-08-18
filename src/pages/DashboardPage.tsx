import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { CategoryBreakdown } from "@/components/dashboard/CategoryBreakdown";
import { containerVariants } from "@/components/dashboard/variants";
import {
  BaseTransactionParams,
  Expense,
  Income,
} from "@expenseai/expenseai-shared";

import { DashboardTransaction } from "@/types/Dashboard.type";

import { getIncomeFn } from "@/lib/apis/income.api";
import { getExpenseFn } from "@/lib/apis/expense.api";

const DashboardPage = () => {
  // getMonth() returns 0–11 (0 = January, 11 = December)
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  const currentYear = new Date().getFullYear();
  const params = {
    startDate: `${currentYear}-${selectedMonth + 1}-01`,
    endDate: `${currentYear}-${selectedMonth + 1}-31`,
  };

  console.log("selectedMonth ------>", selectedMonth);

  // Fetch expenses
  const {
    data: expensesData,
    isLoading: expensesLoading,
    error: expensesError,
  } = useQuery({
    queryKey: ["expenses", params],
    queryFn: ({ queryKey }) => {
      const [, params] = queryKey;
      return getExpenseFn(params as BaseTransactionParams);
    },
  });

  // Fetch incomes
  const {
    data: incomesData,
    isLoading: incomesLoading,
    error: incomesError,
  } = useQuery({
    queryKey: ["incomes", params],
    queryFn: ({ queryKey }) => {
      const [, params] = queryKey;
      return getIncomeFn(params as BaseTransactionParams);
    },
  });

  console.log("expensesData ------>", expensesData);

  // Combine and format transactions
  const formatTransactions = (): DashboardTransaction[] => {
    const expenses: DashboardTransaction[] = (
      expensesData?.data?.expenses || []
    ).map((expense: Expense) => ({
      ...expense,
      type: "expense" as const,
    }));

    const incomes: DashboardTransaction[] = (
      incomesData?.data?.incomes || []
    ).map((income: Income) => ({
      ...income,
      type: "income" as const,
    }));

    const dashboardTransaction = [...incomes, ...expenses].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return dashboardTransaction;
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto space-y-6">
        <DashboardHeader
          selectedMonth={selectedMonth}
          onMonthChange={setSelectedMonth}
        />

        <DashboardStats />

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Recent Transactions */}
          <div className="lg:col-span-2 space-y-6">
            <RecentTransactions transactions={formatTransactions()} />
          </div>

          <div className="space-y-6">
            <QuickActions />
            <CategoryBreakdown />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DashboardPage;
