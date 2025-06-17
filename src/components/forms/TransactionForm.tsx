import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DatePicker } from "../DatePicker";
import TransactionToggle from "../TransactionToggle";

export const TransactionFormSchema = z.object({
  transactionType: z.enum(["expense", "income"]),
  name: z.string().min(1, "Name is required"),
  amount: z.coerce.number({
    required_error: "Amount is required",
    invalid_type_error: "Amount must be a number",
  }),
  description: z.string().min(1, "Description is required"),
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

  const createTransaction = (data: z.infer<typeof TransactionFormSchema>) => {
    console.log(data);
    setDialogOpen(false); // close dialog on submit
  };

  console.log("formstate ", form.formState);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="cursor-pointer">
          Add transaction
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>New Transaction</DialogTitle>
          <DialogDescription>
            Fill out the form below to record a new income or expense.
          </DialogDescription>
        </DialogHeader>

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
                  <FormLabel>Transaction Type</FormLabel>
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
                  <FormLabel>name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={
                        watchedTransactionType === "income"
                          ? "e.g. Salary, Freelance payment"
                          : "e.g. Grocery store, Gas station"
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
                  <FormLabel>Description</FormLabel>
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
                    <FormLabel>Source</FormLabel>
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
                Save {watchedTransactionType}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
