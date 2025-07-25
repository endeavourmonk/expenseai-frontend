import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { DashboardTransaction } from "@/types/Dashboard.type";
import { buttonVariants, itemVariants } from "./variants";
import { format } from "date-fns";

interface RecentTransactionsProps {
  transactions: DashboardTransaction[];
}

export const RecentTransactions = ({
  transactions,
}: RecentTransactionsProps) => (
  <motion.div variants={itemVariants} initial="hidden" animate="visible">
    <Card className="border-0 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">
          Recent Transactions
        </CardTitle>
        <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
          <Button
            variant="ghost"
            size="sm"
            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-950 cursor-pointer"
          >
            View All
          </Button>
        </motion.div>
      </CardHeader>

      <CardContent className="space-y-4">
        <AnimatePresence>
          {transactions.map((transaction, index) => (
            <motion.div
              key={transaction.id}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{
                scale: 1.02,
                transition: { type: "spring", stiffness: 300 },
              }}
              layout
            >
              <div className="flex items-center gap-3">
                {/* Trending Icon */}
                <motion.div
                  className={`p-2 rounded-full ${
                    transaction.type === "income"
                      ? "bg-emerald-100 dark:bg-emerald-900"
                      : "bg-red-100 dark:bg-red-900"
                  }`}
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <motion.div
                    animate={
                      transaction.type === "income"
                        ? { y: [0, -2, 0] }
                        : { y: [0, 2, 0] }
                    }
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.2,
                    }}
                  >
                    {transaction.type === "income" ? (
                      <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-600 dark:text-red-400" />
                    )}
                  </motion.div>
                </motion.div>
                <div>
                  {/* Transaction Name */}
                  <motion.div
                    className="font-medium text-gray-900 dark:text-white"
                    whileHover={{ x: 5 }}
                  >
                    {transaction.name}
                  </motion.div>
                  {/* Transaction Categories */}
                  <div className="text-sm text-gray-500">
                    {transaction?.categories
                      ?.map((ctg) => ctg?.name)
                      .join(", ") || "Uncategorized"}{" "}
                    • {format(new Date(transaction.date), "yyyy-MM-dd")}
                  </div>
                </div>
              </div>

              {/* Transaction Amount */}
              <motion.div
                className={`font-semibold ${
                  transaction.type === "income"
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-red-600 dark:text-red-400"
                }`}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
                whileHover={{ scale: 1.1 }}
              >
                {transaction.type === "income" ? "+" : "-"}${" "}
                {Math.abs(transaction.amount).toFixed(2)}
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </CardContent>
    </Card>
  </motion.div>
);
