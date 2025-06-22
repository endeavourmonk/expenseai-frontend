import { z } from "zod";

export const IncomeSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  amount: z.number().positive("Amount must be positive"),
  description: z.string().min(1, "Description is required"),
  source: z.string().min(1, "Source is required").optional(),
  date: z.date(),
  userId: z.string(),
  categoryIds: z.string().array().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

// Create Income DTO Schema
export const CreateIncomeDtoSchema = z.object({
  name: z.string().min(1, "Name is required"),
  amount: z.number().positive("Amount must be positive"),
  description: z.string().min(1, "Description is required"),
  source: z.string().min(1, "Source is required").optional(),
  date: z
    .string()
    .or(z.date())
    .transform((val) => new Date(val)),
  categoryIds: z.string().array().optional(),
});

// Update Income DTO Schema
export const UpdateIncomeDtoSchema = z
  .object({
    name: z.string().min(1, "Name is required").optional(),
    amount: z.number().positive("Amount must be positive").optional(),
    description: z.string().min(1, "Description is required").optional(),
    source: z.string().min(1, "Source is required").optional(),
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

// Income Response Schema
export const IncomeResponseSchema = z.object({
  status: z.literal("success"),
  data: z.object({
    income: IncomeSchema,
  }),
});

// Incomes List Response Schema
export const IncomesListResponseSchema = z.object({
  status: z.literal("success"),
  data: z.object({
    incomes: z.array(IncomeSchema),
    total: z.number(),
    page: z.number(),
    limit: z.number(),
    totalPages: z.number(),
  }),
});

// Type definitions derived from Zod schemas
export type CreateIncomeDTO = z.infer<typeof CreateIncomeDtoSchema>;
export type UpdateIncomeDTO = z.infer<typeof UpdateIncomeDtoSchema>;
export type Income = z.infer<typeof IncomeSchema>;

// Export schemas for validation
export const IncomeSchemas = {
  createIncome: CreateIncomeDtoSchema,
  updateIncome: UpdateIncomeDtoSchema,
  Income: IncomeSchema,
};
