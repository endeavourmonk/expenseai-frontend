import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  Banknote,
  Tag,
  FileText,
  SquarePen,
} from "lucide-react";
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
import { useMemo, useState } from "react";
import { CategoryBtn } from "../CategoryBtn";
import { monthNames } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface TransactionListProps {
  transactions: DashboardTransaction[];
  month: number;
}

export const TransactionList = ({
  transactions,
  month,
}: TransactionListProps) => {
  // Calculate total income and expense
  const { totalIncome, totalExpense } = useMemo(() => {
    return transactions.reduce(
      (acc, transaction) => {
        if (transaction.type === "income") {
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

  // State for expanded rows
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const handleRowClick = (id: string) => {
    setExpandedRow((prev) => (prev === id ? null : id));
  };

  return (
    <Card className="border-0 shadow-sm flex flex-col max-h-[500px]">
      <CardHeader className="flex flex-row items-center justify-between flex-shrink-0">
        <CardTitle className="text-lg font-semibold">
          Your Income and Expenses for {monthNames[month]}
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0 flex-1 flex flex-col min-h-0">
        {/* Scrollable Table Wrapper for Responsiveness */}
        <div className="overflow-x-auto flex-1 min-h-0">
          <Table>
            <TableHeader className="sticky top-0 bg-white dark:bg-gray-800 z-10">
              {" "}
              {/* Sticky header */}
              <TableRow>
                {/* For row icon */}
                <TableHead className="text-center min-w-[150px]">
                  <div className="flex items-center justify-center gap-2">
                    <SquarePen className="h-4 w-4" />
                    Name
                  </div>
                </TableHead>
                <TableHead className="text-center min-w-[120px]">
                  <div className="flex items-center justify-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Date
                  </div>
                </TableHead>
                <TableHead className="text-center min-w-[100px]">
                  <div className="flex items-center justify-center gap-2">
                    <Banknote className="h-4 w-4" />
                    Amount
                  </div>
                </TableHead>
                <TableHead className="text-center min-w-[150px]">
                  <div className="flex items-center justify-center gap-2">
                    <Tag className="h-4 w-4" />
                    Categories
                  </div>
                </TableHead>
                <TableHead className="text-center min-w-[200px]">
                  <div className="flex items-center justify-center gap-2">
                    <FileText className="h-4 w-4" />
                    Description
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {transactions.map((transaction) => (
                <TableRow
                  key={transaction.id}
                  onClick={() => handleRowClick(transaction.id)}
                  className={cn(
                    "cursor-pointer transition-all",
                    expandedRow === transaction.id ? "h-auto" : "h-10" // Adjust height on expansion
                  )}
                >
                  {/* Name */}
                  <TableCell
                    className={cn(
                      "font-medium px-4 text-center",
                      expandedRow !== transaction.id
                        ? "truncate max-w-[150px] whitespace-nowrap overflow-hidden text-ellipsis"
                        : "whitespace-normal"
                    )}
                  >
                    {transaction.name}
                  </TableCell>

                  {/* Date */}
                  <TableCell className="text-gray-500 px-4 text-center">
                    {(() => {
                      const d = new Date(transaction.date);
                      return `${d.getDate()} ${monthNames[d.getMonth()].slice(0, 3)}, ${d.getFullYear()}`;
                    })()}
                  </TableCell>

                  {/* Amount */}
                  <TableCell
                    className={`text-center font-semibold px-4 ${
                      transaction.type === "income"
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {currencySymbol}
                    {Math.abs(transaction.amount).toFixed(2)}
                  </TableCell>

                  {/* Categories */}
                  <TableCell className="text-gray-500 px-4 text-center">
                    {transaction?.categories?.map((ctg) => (
                      <CategoryBtn key={ctg.id} category={ctg} size="sm" />
                    )) || "Uncategorized"}
                  </TableCell>

                  {/* Description */}
                  <TableCell
                    className={cn(
                      "text-gray-500 px-4 text-center",
                      expandedRow !== transaction.id
                        ? "truncate max-w-[200px] whitespace-nowrap overflow-hidden text-ellipsis"
                        : "whitespace-normal"
                    )}
                  >
                    {transaction.description}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Total Income and Expense */}
        <div className="flex-shrink-0 border-t bg-gray-50 dark:bg-gray-900 p-4">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
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
            <div className="text-xs text-gray-400 mt-2 sm:mt-0">
              Click rows to expand text
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
