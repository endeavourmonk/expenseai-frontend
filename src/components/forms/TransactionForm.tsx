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

import { queryClient } from "@/lib/tanstackQuery";
import { createExpense } from "@/api/expense";
import { createIncome } from "@/api/income";
import {
  TrendingDown,
  TrendingUp,
  Receipt,
  FileText,
  DollarSign,
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
      transactionType: "income",
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
        `😕 Whoops! We couldn’t record your ${watchedTransactionType}. Give it another go?`
      );
    },
  });

  const createTransaction = (data: z.infer<typeof TransactionFormSchema>) => {
    const payload = {
      ...data,
      description: data.description ?? "",
    };
    mutation.mutate(payload);
    setDialogOpen(false); // close dialog on submit
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

            {/* TransactionName */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What is this for?</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={
                        watchedTransactionType === "income"
                          ? "e.g. Salary, Freelance payment"
                          : "e.g. Grocery, Gas station"
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
                <FormItem>
                  <FormLabel>Notes (optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={
                        watchedTransactionType === "income"
                          ? "e.g. Monthly salary payment"
                          : "e.g. Weekly grocery shopping"
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
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...field}
                    />
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
                  <FormItem>
                    <FormLabel>Received from</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Company name, Client name, Investment"
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
                <FormItem>
                  <FormLabel>Choose a date</FormLabel>
                  <FormControl>
                    <DatePicker
                      value={field.value}
                      onSelect={(date) => {
                        // Handle both selection and deselection
                        field.onChange(date || null);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2">
              {/* Cancel button that closes the dialog */}
              <DialogClose asChild>
                <Button variant="outline" className="cursor-pointer">
                  Cancel
                </Button>
              </DialogClose>

              <Button type="submit" className="cursor-pointer">
                Log {watchedTransactionType}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
