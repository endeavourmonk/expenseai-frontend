interface TransactionToggleProps {
  value: string;
  onValueChange: (value: string) => void;
}

export default function TransactionToggle({
  value,
  onValueChange,
}: TransactionToggleProps) {
  return (
    <div className="flex rounded-lg border border-input bg-background p-1">
      <button
        type="button"
        onClick={() => onValueChange("expense")}
        className={`flex-1 rounded-md px-6 py-3 text-sm font-medium transition-all ${
          value === "expense"
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        Expense
      </button>
      <button
        type="button"
        onClick={() => onValueChange("income")}
        className={`flex-1 rounded-md px-6 py-3 text-sm font-medium transition-all ${
          value === "income"
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        Income
      </button>
    </div>
  );
}
