import { z } from "zod";

export const ExpenseSchema = z.object({
  id: z.string(),
  name: z.string(),
  amount: z.number().positive("Amount must be positive"),
  description: z.string(),
  date: z.date(),
  userId: z.string(),
  categoryId: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

// Create Expense DTO Schema
export const CreateExpenseDtoSchema = z.object({
  name: z.string().min(1, "Name is required"),
  amount: z.number().positive("Amount must be positive"),
  description: z.string().min(1, "Description is required"),
  date: z
    .string()
    .or(z.date())
    .transform((val) => new Date(val)),
  categoryIds: z.string().array().optional(),
});

// Update Expense DTO Schema
export const UpdateExpenseDtoSchema = z
  .object({
    name: z.string().min(1, "Name is required").optional(),
    amount: z.number().positive("Amount must be positive").optional(),
    description: z.string().min(1, "Description is required").optional(),
    date: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val))
      .optional(),
    addedCategoryIds: z.string().array().optional(),
    removedCategoryIds: z.string().array().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update",
  });

// Expense Response Schema
export const ExpenseResponseSchema = z.object({
  status: z.literal("success"),
  data: z.object({
    expense: ExpenseSchema,
  }),
});

// Expenses List Response Schema
export const ExpensesListResponseSchema = z.object({
  status: z.literal("success"),
  data: z.object({
    expenses: z.array(ExpenseSchema),
    total: z.number(),
    page: z.number(),
    limit: z.number(),
    totalPages: z.number(),
  }),
});

// Type definitions derived from Zod schemas
export type CreateExpenseDTO = z.infer<typeof CreateExpenseDtoSchema>;
export type UpdateExpenseDTO = z.infer<typeof UpdateExpenseDtoSchema>;
export type Expense = z.infer<typeof ExpenseSchema>;

// Export schemas for validation
export const ExpenseSchemas = {
  createExpense: CreateExpenseDtoSchema,
  updateExpense: UpdateExpenseDtoSchema,
  Expense: ExpenseSchema,
};
