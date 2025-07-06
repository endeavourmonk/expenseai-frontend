import { Expense } from "./Expnese.type";
import { Income } from "./Income.type";

export type DashboardTransaction = (Expense | Income) & {
  type: "income" | "expense";
};

export interface StatCardProps {
  title: string;
  amount: string;
  change: string;
  changeType: "positive" | "negative";
  icon: React.ReactNode;
  color: string;
  index: number;
}

export interface CategoryData {
  name: string;
  amount: number;
  percentage: number;
  color: string;
}

export interface DashboardStats {
  title: string;
  amount: string;
  change: string;
  changeType: "positive" | "negative";
  icon: React.ReactNode;
  color: string;
}
