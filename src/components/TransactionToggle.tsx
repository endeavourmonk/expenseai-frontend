interface TransactionToggleProps {
  value: string;
  onValueChange: (value: string) => void;
}

export default function TransactionToggle({
  value,
  onValueChange,
}: TransactionToggleProps) {
  return (
    <div className="relative flex rounded-lg border border-input bg-background p-1">
      {/* Animated background indicator */}
      <div
        className={`absolute top-1 bottom-1 w-[calc(50%-2px)] rounded-md bg-primary shadow-sm transition-all duration-300 ease-out ${
          value === "income" ? "translate-x-[calc(100%+4px)]" : "translate-x-0"
        }`}
      />

      <button
        type="button"
        onClick={() => onValueChange("expense")}
        className={`relative z-10 flex-1 rounded-md px-6 py-3 text-sm font-medium transition-all duration-300 cursor-pointer ${
          value === "expense"
            ? "text-primary-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        Expense
      </button>
      <button
        type="button"
        onClick={() => onValueChange("income")}
        className={`relative z-10 flex-1 rounded-md px-6 py-3 text-sm font-medium transition-all duration-300 cursor-pointer ${
          value === "income"
            ? "text-primary-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        Income
      </button>
    </div>
  );
}
