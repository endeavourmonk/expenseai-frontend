import { StatCard } from "./StatCard";
import { Wallet, TrendingUp, TrendingDown, CreditCard } from "lucide-react";
import { motion } from "framer-motion";
import { DashboardStats as DashboardStatsTypes } from "@/types/Dashboard.type";
import { containerVariants } from "./variants";

const stats: DashboardStatsTypes[] = [
  {
    title: "Total Balance",
    amount: "$12,450.80",
    change: "+12.5%",
    changeType: "positive",
    icon: <Wallet className="h-4 w-4 text-white" />,
    color: "bg-gradient-to-br from-blue-500 to-blue-600",
  },
  {
    title: "Total Income",
    amount: "$8,920.00",
    change: "+8.2%",
    changeType: "positive",
    icon: <TrendingUp className="h-4 w-4 text-white" />,
    color: "bg-gradient-to-br from-emerald-500 to-emerald-600",
  },
  {
    title: "Total Expenses",
    amount: "$3,510.20",
    change: "-3.1%",
    changeType: "positive",
    icon: <TrendingDown className="h-4 w-4 text-white" />,
    color: "bg-gradient-to-br from-orange-500 to-orange-600",
  },
  {
    title: "Savings",
    amount: "$5,409.80",
    change: "+15.3%",
    changeType: "positive",
    icon: <CreditCard className="h-4 w-4 text-white" />,
    color: "bg-gradient-to-br from-purple-500 to-purple-600",
  },
];

export const DashboardStats = () => (
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
);
