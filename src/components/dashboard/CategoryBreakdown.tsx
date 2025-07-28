import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import { CategoryData } from "@/types/Dashboard.type";
import { itemVariants, progressBarVariants } from "./variants";

const categories: CategoryData[] = [
  {
    name: "Food & Dining",
    amount: 1240,
    percentage: 35,
    color: "bg-orange-500",
  },
  { name: "Transportation", amount: 680, percentage: 19, color: "bg-blue-500" },
  {
    name: "Entertainment",
    amount: 520,
    percentage: 15,
    color: "bg-purple-500",
  },
  { name: "Shopping", amount: 450, percentage: 13, color: "bg-pink-500" },
  {
    name: "Bills & Utilities",
    amount: 380,
    percentage: 11,
    color: "bg-teal-500",
  },
  { name: "Others", amount: 240, percentage: 7, color: "bg-gray-500" },
];

export const CategoryBreakdown = () => (
  <motion.div variants={itemVariants} initial="hidden" animate="visible">
    <Card className="border-0 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">
          Spending by Category
        </CardTitle>
        <motion.div
          whileHover={{ rotate: 90 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </motion.div>
      </CardHeader>
      <CardContent className="space-y-4">
        {categories.map((category, index) => (
          <motion.div
            key={index}
            className="space-y-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.3 }}
            whileHover={{ x: 5 }}
          >
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <motion.div
                  className={`w-3 h-3 rounded-full ${category.color}`}
                  whileHover={{ scale: 1.5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  {category.name}
                </span>
              </div>
              <div className="text-right">
                <motion.div
                  className="font-semibold text-gray-900 dark:text-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                >
                  ${category.amount}
                </motion.div>
                <div className="text-xs text-gray-500">
                  {category.percentage}%
                </div>
              </div>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
              <motion.div
                className={`h-2 rounded-full ${category.color}`}
                variants={progressBarVariants}
                initial="hidden"
                animate="visible"
                custom={category.percentage}
              />
            </div>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  </motion.div>
);
