import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { DatePicker } from "../DatePicker";
import TransactionToggle from "../TransactionToggle";

import { useAuthStore } from "@/stores/authStore";

import { queryClient } from "@/lib/tanstackQuery";
import { createExpense } from "@/api/expense";
import { createIncome } from "@/api/income";
import {
  TrendingDown,
  TrendingUp,
  Receipt,
  FileText,
  Building2,
  Calendar,
} from "lucide-react";

export const TransactionFormSchema = z.object({
  transactionType: z.enum(["expense", "income"]),
  name: z.string().min(1, "Name is required"),
  amount: z.coerce.number({
    required_error: "Amount is required",
    invalid_type_error: "Amount must be a number",
  }),
  description: z.string().optional(),
  source: z.string().optional(),
  date: z.date(),
  categoryIds: z.string().array().optional(),
});

export default function TransactionForm() {
  const [dialogOpen, setDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof TransactionFormSchema>>({
    resolver: zodResolver(TransactionFormSchema),
    defaultValues: {
      transactionType: "expense",
      name: "",
      amount: undefined,
      description: "",
      source: "",
      date: new Date(),
      categoryIds: [],
    },
  });

  const watchedTransactionType = form.watch("transactionType");

  const mutation = useMutation({
    mutationFn:
      watchedTransactionType === "expense" ? createExpense : createIncome,
    onSuccess: () => {
      toast.success(`Nice! Your ${watchedTransactionType} has been saved!`);
      queryClient.invalidateQueries();
    },
    onError: () => {
      toast.error(
        `😕 Whoops! We couldn't record your ${watchedTransactionType}. Give it another go?`
      );
    },
  });

  const createTransaction = (data: z.infer<typeof TransactionFormSchema>) => {
    const payload = {
      ...data,
      description: data.description ?? "",
    };
    mutation.mutate(payload);
    setDialogOpen(false);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="cursor-pointer">
          Add transaction
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        {/* Custom Dialog Header */}
        <div className="relative">
          <div className="flex items-center gap-3 pb-4">
            <div
              className={`p-2.5 rounded-xl transition-all duration-300 ${
                watchedTransactionType === "income"
                  ? "bg-emerald-100 dark:bg-emerald-900/20"
                  : "bg-red-100 dark:bg-red-900/20"
              }`}
            >
              {watchedTransactionType === "income" ? (
                <TrendingUp className="w-5 h-5 transition-colors duration-300 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <TrendingDown className="w-5 h-5 transition-colors duration-300 text-red-600 dark:text-red-400" />
              )}
            </div>

            <div className="flex-1">
              <DialogTitle className="text-xl font-semibold tracking-tight">
                Add{" "}
                {watchedTransactionType === "expense" ? "Expense" : "Income"}
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground mt-1">
                Quickly log your {watchedTransactionType} to stay on top of your
                finances
              </DialogDescription>
            </div>
          </div>

          {/* Subtle divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(createTransaction)}
            className="space-y-6"
          >
            {/* Transaction Type Toggle */}
            <FormField
              control={form.control}
              name="transactionType"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <TransactionToggle
                      value={field.value as string}
                      onValueChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Transaction Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Receipt className="w-4 h-4 text-muted-foreground" />
                    <FormLabel className="text-sm font-medium text-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Transaction Details
                    </FormLabel>
                  </div>
                  <FormControl>
                    <Input
                      className="border-0 border-b border-border/30 rounded-none bg-transparent focus:border-primary focus:outline-none focus:ring-0 transition-colors px-0 pb-2"
                      placeholder={
                        watchedTransactionType === "income"
                          ? "Salary, freelance payment, dividend..."
                          : "Grocery shopping, gas station, coffee..."
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    <FormLabel className="text-sm font-medium text-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Additional Notes
                      <span className="text-xs text-muted-foreground ml-1 font-normal">
                        (optional)
                      </span>
                    </FormLabel>
                  </div>
                  <FormControl>
                    <Input
                      className="border-0 border-b border-border/30 rounded-none bg-transparent focus:border-primary focus:outline-none focus:ring-0 transition-colors px-0 pb-2"
                      placeholder={
                        watchedTransactionType === "income"
                          ? "Monthly salary, Q4 bonus, client project..."
                          : "Weekly groceries, emergency repair, gift..."
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Amount */}
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">
                      {useAuthStore.getState()?.user?.defaultCurrency.symbol}
                    </span>
                    <FormLabel className="text-sm font-medium text-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Amount
                      <span className="text-xs text-muted-foreground ml-1 font-normal">
                        ({useAuthStore.getState()?.user?.defaultCurrency.code})
                      </span>
                    </FormLabel>
                  </div>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="number"
                        step="0.01"
                        className="border-0 border-b border-border/30 rounded-none bg-transparent focus:border-primary focus:outline-none focus:ring-0 transition-colors pl-8 pb-2"
                        placeholder="0.00"
                        {...field}
                      />
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        $
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Income Source - Only show when transaction type is income */}
            {watchedTransactionType === "income" && (
              <FormField
                control={form.control}
                name="source"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-muted-foreground" />
                      <FormLabel className="text-sm font-medium text-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Income Source
                        <span className="text-xs text-muted-foreground ml-1 font-normal">
                          (optional)
                        </span>
                      </FormLabel>
                    </div>
                    <FormControl>
                      <Input
                        className="border-0 border-b border-border/30 rounded-none bg-transparent focus:border-primary focus:outline-none focus:ring-0 transition-colors px-0 pb-2"
                        placeholder="Company name, client, investment platform..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Transaction Date */}
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <FormLabel className="text-sm font-medium text-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Transaction Date
                    </FormLabel>
                  </div>
                  <FormControl>
                    <DatePicker
                      value={field.value}
                      onSelect={(date) => {
                        field.onChange(date || null);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2 pt-4 border-t border-border/50">
              <DialogClose asChild>
                <Button variant="outline" className="cursor-pointer">
                  Cancel
                </Button>
              </DialogClose>

              <Button
                type="submit"
                className="cursor-pointer"
                disabled={mutation.isPending}
              >
                {mutation.isPending
                  ? "Saving..."
                  : `Log ${watchedTransactionType}`}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
