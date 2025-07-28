import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { motion } from "framer-motion";
import { StatCardProps } from "@/types/Dashboard.type";
import { cardHoverVariants } from "./variants";

export const StatCard = ({
  title,
  amount,
  change,
  changeType,
  icon,
  color,
  index,
}: StatCardProps) => (
  <motion.div
    initial="hidden"
    animate="visible"
    transition={{ delay: index * 0.1 }}
    whileHover="hover"
    variants={cardHoverVariants}
  >
    <Card className="relative overflow-hidden border-0 shadow-sm bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 cursor-pointer">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {title}
        </CardTitle>
        <motion.div
          className={`p-2 rounded-lg ${color}`}
          whileHover={{ rotate: 5, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {icon}
        </motion.div>
      </CardHeader>
      <CardContent>
        <motion.div
          className="text-2xl font-bold text-gray-900 dark:text-white"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
        >
          {amount}
        </motion.div>
        <motion.div
          className="flex items-center text-xs mt-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 + 0.5 }}
        >
          <motion.div
            animate={{
              rotate: changeType === "positive" ? [0, -10, 0] : [0, 10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
              ease: "easeInOut",
            }}
          >
            {changeType === "positive" ? (
              <ArrowUpRight className="h-3 w-3 text-emerald-500 mr-1" />
            ) : (
              <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
            )}
          </motion.div>
          <span
            className={
              changeType === "positive" ? "text-emerald-600" : "text-red-600"
            }
          >
            {change}
          </span>
          <span className="text-gray-500 ml-1">from last month</span>
        </motion.div>
      </CardContent>
    </Card>
  </motion.div>
);
