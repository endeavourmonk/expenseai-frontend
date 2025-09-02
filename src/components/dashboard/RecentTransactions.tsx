import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { DashboardTransaction } from "@/types/Dashboard.type";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuthStore } from "@/stores/authStore";
import { useMemo } from "react";
import { CategoryBtn } from "../CategoryBtn";
import { monthNames } from "@/lib/constants";

interface RecentTransactionsProps {
  transactions: DashboardTransaction[];
  month: number;
}

export const RecentTransactions = ({
  transactions,
  month,
}: RecentTransactionsProps) => {
  // calculate total income and expense
  const { totalIncome, totalExpense } = useMemo(() => {
    return transactions.reduce(
      (acc, transaction) => {
        if (transaction.type === "income") {
          console.log("transaction ----- ", transaction);
          acc.totalIncome += transaction.amount;
        } else {
          acc.totalExpense += Math.abs(transaction.amount);
        }
        return acc;
      },
      { totalIncome: 0, totalExpense: 0 }
    );
  }, [transactions]);

  const currencySymbol = useAuthStore.getState()?.user?.defaultCurrency.symbol;

  return (
    <Card className="border-0 shadow-sm flex flex-col max-h-[500px]">
      <CardHeader className="flex flex-row items-center justify-between flex-shrink-0">
        <CardTitle className="text-lg font-semibold">
          Recent Transactions for {monthNames[month]}
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0 flex-1 flex flex-col min-h-0">
        {/* Fixed Header */}
        <div className="flex-shrink-0 border-b">
          <Table>
            <TableHeader>
              <TableRow>
                {/* <TableHead className="w-[50px]"></TableHead> For icon */}
                <TableHead className="text-center">Name</TableHead>
                <TableHead className="text-center">Date</TableHead>
                <TableHead className="text-center">Amount</TableHead>
                <TableHead className="text-center">Categories</TableHead>
                <TableHead className="text-center">Description</TableHead>
              </TableRow>
            </TableHeader>
          </Table>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <Table>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  {/* Symbol */}
                  {/* <TableCell className="px-6 w-[50px]">
                    <div
                      className={`p-2 rounded-full inline-flex items-center justify-center ${
                        transaction.type === "income"
                          ? "bg-emerald-100 dark:bg-emerald-900"
                          : "bg-red-100 dark:bg-red-900"
                      }`}
                    >
                      {transaction.type === "income" ? (
                        <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-600 dark:text-red-400" />
                      )}
                    </div>
                  </TableCell> */}

                  {/* Name */}
                  <TableCell className="font-medium px-6 text-center">
                    {transaction.name}
                  </TableCell>

                  {/* Date */}
                  <TableCell className="text-gray-500 px-6 text-center">
                    {(() => {
                      const d = new Date(transaction.date);
                      return `${d.getDate()} ${monthNames[d.getMonth()].slice(0, 3)}, ${d.getFullYear()}`;
                    })()}{" "}
                  </TableCell>

                  {/* Amount */}
                  <TableCell
                    className={`text-center font-semibold px-6 ${
                      transaction.type === "income"
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {currencySymbol}
                    {Math.abs(transaction.amount).toFixed(2)}
                  </TableCell>

                  <TableCell className="text-gray-500 px-6 text-center">
                    {transaction?.categories?.map((ctg) => (
                      <CategoryBtn category={ctg} size="sm" />
                    )) || "Uncategorized"}
                  </TableCell>

                  {/* Description */}
                  <TableCell className="text-gray-500 px-6 text-center">
                    {transaction.description}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Total Income and Expense */}
        <div className="flex-shrink-0 border-t bg-gray-50 dark:bg-gray-900 p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="p-1 rounded-full bg-emerald-100 dark:bg-emerald-900">
                  <TrendingUp className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Total Income:
                </span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  {currencySymbol}
                  {totalIncome.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="p-1 rounded-full bg-red-100 dark:bg-red-900">
                  <TrendingDown className="h-3 w-3 text-red-600 dark:text-red-400" />
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Total Expenses:
                </span>
                <span className="font-semibold text-red-600 dark:text-red-400">
                  {currencySymbol}
                  {totalExpense.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
