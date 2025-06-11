import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  CreditCard,
  PlusCircle,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Filter,
  MoreHorizontal,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

// Types
interface Transaction {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
  type: "income" | "expense";
}

interface StatCardProps {
  title: string;
  amount: string;
  change: string;
  changeType: "positive" | "negative";
  icon: React.ReactNode;
  color: string;
  index: number;
}

interface CategoryData {
  name: string;
  amount: number;
  percentage: number;
  color: string;
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

const cardHoverVariants = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.02,
    y: -5,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
    },
  },
};

const buttonVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

const progressBarVariants = {
  hidden: { width: 0 },
  visible: (percentage: number) => ({
    width: `${percentage}%`,
    transition: {
      duration: 1.2,
      ease: "easeOut",
      delay: 0.5,
    },
  }),
};

// Stat Card Component
const StatCard: React.FC<StatCardProps> = ({
  title,
  amount,
  change,
  changeType,
  icon,
  color,
  index,
}) => (
  <motion.div
    variants={itemVariants}
    initial="hidden"
    animate="visible"
    transition={{ delay: index * 0.1 }}
    whileHover="hover"
    variants={cardHoverVariants}
    initial="rest"
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

// Quick Actions Component
const QuickActions: React.FC = () => (
  <motion.div variants={itemVariants} initial="hidden" animate="visible">
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
          <Button className="w-full justify-start bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white border-0 relative overflow-hidden group">
            <motion.div
              className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10"
              initial={false}
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2 }}
            />
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
            </motion.div>
            Add Expense
          </Button>
        </motion.div>

        <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
          <Button
            variant="outline"
            className="w-full justify-start border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-800 dark:text-emerald-400 dark:hover:bg-emerald-950"
          >
            <motion.div
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <TrendingUp className="mr-2 h-4 w-4" />
            </motion.div>
            Add Income
          </Button>
        </motion.div>

        <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
          <Button
            variant="outline"
            className="w-full justify-start border-blue-200 text-blue-700 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-950"
          >
            <motion.div
              whileHover={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 0.5 }}
            >
              <Calendar className="mr-2 h-4 w-4" />
            </motion.div>
            View Reports
          </Button>
        </motion.div>
      </CardContent>
    </Card>
  </motion.div>
);

// Category Breakdown Component
const CategoryBreakdown: React.FC = () => {
  const categories: CategoryData[] = [
    {
      name: "Food & Dining",
      amount: 1240,
      percentage: 35,
      color: "bg-orange-500",
    },
    {
      name: "Transportation",
      amount: 680,
      percentage: 19,
      color: "bg-blue-500",
    },
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

  return (
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
};

// Recent Transactions Component
const RecentTransactions: React.FC = () => {
  const transactions: Transaction[] = [
    {
      id: "1",
      title: "Starbucks Coffee",
      amount: -12.5,
      category: "Food",
      date: "2024-06-02",
      type: "expense",
    },
    {
      id: "2",
      title: "Salary Deposit",
      amount: 3500.0,
      category: "Income",
      date: "2024-06-01",
      type: "income",
    },
    {
      id: "3",
      title: "Uber Ride",
      amount: -25.8,
      category: "Transport",
      date: "2024-06-01",
      type: "expense",
    },
    {
      id: "4",
      title: "Netflix Subscription",
      amount: -15.99,
      category: "Entertainment",
      date: "2024-05-31",
      type: "expense",
    },
    {
      id: "5",
      title: "Freelance Payment",
      amount: 450.0,
      category: "Income",
      date: "2024-05-30",
      type: "income",
    },
  ];

  return (
    <motion.div variants={itemVariants} initial="hidden" animate="visible">
      <Card className="border-0 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold">
            Recent Transactions
          </CardTitle>
          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Button
              variant="ghost"
              size="sm"
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-950"
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
                    <motion.div
                      className="font-medium text-gray-900 dark:text-white"
                      whileHover={{ x: 5 }}
                    >
                      {transaction.title}
                    </motion.div>
                    <div className="text-sm text-gray-500">
                      {transaction.category} • {transaction.date}
                    </div>
                  </div>
                </div>
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
                  {transaction.type === "income" ? "+" : ""}$
                  {Math.abs(transaction.amount).toFixed(2)}
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Main Dashboard Component
const DashboardPage: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("This Month");

  const stats = [
    {
      title: "Total Balance",
      amount: "$12,450.80",
      change: "+12.5%",
      changeType: "positive" as const,
      icon: <Wallet className="h-4 w-4 text-white" />,
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
    },
    {
      title: "Total Income",
      amount: "$8,920.00",
      change: "+8.2%",
      changeType: "positive" as const,
      icon: <TrendingUp className="h-4 w-4 text-white" />,
      color: "bg-gradient-to-br from-emerald-500 to-emerald-600",
    },
    {
      title: "Total Expenses",
      amount: "$3,510.20",
      change: "-3.1%",
      changeType: "positive" as const,
      icon: <TrendingDown className="h-4 w-4 text-white" />,
      color: "bg-gradient-to-br from-orange-500 to-orange-600",
    },
    {
      title: "Savings",
      amount: "$5,409.80",
      change: "+15.3%",
      changeType: "positive" as const,
      icon: <CreditCard className="h-4 w-4 text-white" />,
      color: "bg-gradient-to-br from-purple-500 to-purple-600",
    },
  ];

  const { data, isLoading, error } = useQuery({
    queryKey: ["expenses"],
    queryFn: async () => {
      const response = await fetch("http://localhost:8000/api/v1/expenses", {
        method: "GET",
        // ← This line tells the browser to send cookies (and other credentials)
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          // if you need to send some custom header, add it here
        },
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${await response.text()}`);
      }

      return response.json();
    },
  });

  console.log(data);
  console.log(isLoading);
  console.log(error);

  return (
    <motion.div
      className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
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
              Track your expenses and manage your finances
            </motion.p>
          </div>
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Button
                variant="outline"
                size="sm"
                className="border-gray-200 dark:border-gray-700"
              >
                <Filter className="mr-2 h-4 w-4" />
                {selectedPeriod}
              </Button>
            </motion.div>
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Button className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white border-0 relative overflow-hidden group">
                <motion.div
                  className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <motion.div
                  whileHover={{ rotate: 180 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                </motion.div>
                Add Transaction
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} index={index} />
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Column - Transactions */}
          <div className="lg:col-span-2 space-y-6">
            <RecentTransactions />
          </div>

          {/* Right Column - Quick Actions & Categories */}
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
