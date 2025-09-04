import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { TransactionList } from "@/components/dashboard/TransactionList";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { CategoryChartPieLabelList } from "@/components/dashboard/CategoryChartPieLabelList";
import { containerVariants } from "@/components/dashboard/variants";
import {
  BaseTransactionParams,
  Expense,
  Income,
} from "@expenseai/expenseai-shared";

import { DashboardTransaction } from "@/types/Dashboard.type";

import { getIncomeFn } from "@/lib/apis/income.api";
import { getExpenseFn } from "@/lib/apis/expense.api";
import { TransactionListShimmer } from "@/components/dashboard/TransactionListShimmer";
import { CategoryChartPieShimmer } from "@/components/dashboard/CategoryChartPieShimmer";

const DashboardPage = () => {
  // getMonth() returns 0–11 (0 = January, 11 = December)
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // const currentYear = new Date().getFullYear();
  const params = {
    startDate: `${selectedYear}-${selectedMonth + 1}-01`,
    endDate: `${selectedYear}-${selectedMonth + 1}-31`,
  };

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
          selectedYear={selectedYear}
          onYearChange={setSelectedYear}
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
            {incomesLoading || expensesLoading ? (
              <TransactionListShimmer />
            ) : (
              <TransactionList
                transactions={formatTransactions()}
                month={selectedMonth}
              />
            )}
          </div>

          {/* <QuickActions /> */}
          {incomesLoading || expensesLoading ? (
            <div className="space-y-6">
              <CategoryChartPieShimmer
                isExpenses={true}
                monthIndex={selectedMonth}
              />
              <CategoryChartPieShimmer
                isExpenses={false}
                monthIndex={selectedMonth}
              />
            </div>
          ) : (
            <div className="space-y-6">
              <CategoryChartPieLabelList
                transactions={expensesData}
                monthIndex={selectedMonth}
              />
              <CategoryChartPieLabelList
                transactions={incomesData}
                monthIndex={selectedMonth}
              />
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DashboardPage;
