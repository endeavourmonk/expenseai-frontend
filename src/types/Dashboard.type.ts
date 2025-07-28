import {
  ExpenseWithCategoriesSchema,
  IncomeWithCategoriesSchema,
} from "@expenseai/expenseai-shared";
import z from "zod";

export const DashboardTransactionSchema = z.discriminatedUnion("type", [
  ExpenseWithCategoriesSchema.extend({ type: z.literal("expense") }),
  IncomeWithCategoriesSchema.extend({ type: z.literal("income") }),
]);

export type DashboardTransaction = z.infer<typeof DashboardTransactionSchema>;

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
