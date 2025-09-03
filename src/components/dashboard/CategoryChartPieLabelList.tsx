import { TrendingUp, TrendingDown } from "lucide-react";
import { LabelList, Pie, PieChart, ResponsiveContainer, Cell } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  ExpensesApiResponse,
  IncomeApiResponse,
} from "@expenseai/expenseai-shared";
import { useAuthStore } from "@/stores/authStore";

// Types & type guards
type Data = ExpensesApiResponse["data"] | IncomeApiResponse["data"];
type CommonTx = {
  amount: number;
  date: Date | string;
  categories?: { name: string; color?: string }[];
};

function isExpensesData(data: Data): data is ExpensesApiResponse["data"] {
  return "expenses" in data;
}
function isIncomesData(data: Data): data is IncomeApiResponse["data"] {
  return "incomes" in data;
}

// Utilities
const toKey = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const formatNumberIN = new Intl.NumberFormat("en-IN", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

const formatCurrency = (symbol: string | undefined, amount: number) =>
  `${symbol ?? "₹"}${formatNumberIN.format(amount)}`;

const monthLabelFromDates = (dates: (Date | string)[]) => {
  const ds = dates.map((d) => new Date(d));
  if (!ds.length || ds.some((d) => isNaN(+d))) return "This period";
  const min = new Date(Math.min(...ds.map((d) => +d)));
  const max = new Date(Math.max(...ds.map((d) => +d)));
  const sameMonth =
    min.getUTCFullYear() === max.getUTCFullYear() &&
    min.getUTCMonth() === max.getUTCMonth();
  const full = new Intl.DateTimeFormat("en-IN", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
  if (sameMonth) return full.format(min);
  const short = new Intl.DateTimeFormat("en-IN", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
  return `${short.format(min)}–${short.format(max)}`;
};

// Build ChartConfig dynamically from category rows.
// Also returns Recharts-ready rows with CSS var fills.
function buildChartConfig(
  raw: { name: string; value: number; fill?: string }[],
  isExpenses: boolean
) {
  const palette = [
    "var(--chart-1)",
    "var(--chart-2)",
    "var(--chart-3)",
    "var(--chart-4)",
    "var(--chart-5)",
  ];

  const cfg: ChartConfig = {
    value: { label: isExpenses ? "Spent" : "Received" },
  } as ChartConfig;

  const rows = raw.map((d, i) => {
    const key = toKey(d.name) || `cat-${i}`;
    // Use API hex if provided; otherwise cycle palette
    const baseColor = d.fill?.startsWith("#")
      ? d.fill
      : palette[i % palette.length];
    cfg[key] = { label: d.name, color: baseColor };
    return { ...d, key, fill: `var(--color-${key})` };
  });

  return { cfg, rows };
}

export function CategoryChartPieLabelList({
  transactions,
}: {
  transactions: ExpensesApiResponse | IncomeApiResponse | null | undefined;
}) {
  if (!transactions || !transactions.data) return <div>Loading data...</div>;

  // Normalize items to a common shape
  const items: CommonTx[] = isExpensesData(transactions.data)
    ? transactions.data.expenses
    : isIncomesData(transactions.data)
      ? transactions.data.incomes
      : [];

  if (!items.length) return <div>No data available</div>;

  // Aggregate by category
  const totals = new Map<string, { amount: number; color?: string }>();

  for (const tx of items) {
    const cats =
      tx.categories && tx.categories.length
        ? tx.categories
        : [{ name: "Others", color: undefined }];

    const share = Number((tx.amount / cats.length).toFixed(2));
    for (const c of cats) {
      const key = c.name ?? "Others";
      const cur = totals.get(key) || { amount: 0, color: c.color };
      totals.set(key, {
        amount: cur.amount + share,
        color: cur.color ?? c.color,
      });
    }
  }

  // Recharts data: { name, value, fill }
  const chartData = Array.from(totals.entries()).map(
    ([name, { amount, color }]) => ({
      name,
      value: amount,
      fill: color, // may be hex; buildChartConfig will handle palette fallback
    })
  );

  const isExpenses = isExpensesData(transactions.data);
  const dates = items.map((i) => i.date);
  const monthLabel = monthLabelFromDates(dates);
  const title = isExpenses
    ? `Where your money went — ${monthLabel}`
    : `Where your money came from — ${monthLabel}`;
  const subTitle = `${items.length} ${isExpenses ? "transactions" : "payments"}`;

  const total = chartData.reduce((s, d) => s + d.value, 0);
  const top = [...chartData].sort((a, b) => b.value - a.value)[0];
  const topPct = total ? (top.value / total) * 100 : 0;

  const currencySymbol =
    useAuthStore.getState()?.user?.defaultCurrency?.symbol ?? "₹";
  const topLine = `Top: ${top.name} — ${formatCurrency(currencySymbol, top.value)} (${topPct.toFixed(1)}%)`;
  const totalLine = isExpenses
    ? `Total spent: ${formatCurrency(currencySymbol, total)}`
    : `Total received: ${formatCurrency(currencySymbol, total)}`;

  // Build dynamic chart config + rows with CSS var fills
  const { cfg: dynamicConfig, rows: pieData } = buildChartConfig(
    chartData,
    isExpenses
  );

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-center">
          <div className="flex items-center justify-center gap-2">
            {title}
            {isExpenses ? (
              <TrendingDown className="h-5 w-5 text-red-500" />
            ) : (
              <TrendingUp className="h-5 w-5 text-green-500" />
            )}
          </div>
        </CardTitle>
        <CardDescription>{subTitle}</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={dynamicConfig}
          className="[&_.recharts-text]:fill-background mx-auto aspect-square max-h-[260px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              {/* Use your UI Kit tooltip for consistent theming */}
              <ChartTooltip
                content={<ChartTooltipContent nameKey="name" hideLabel />}
              />
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius="80%"
                isAnimationActive
              >
                {/* Labels show category names */}
                <LabelList
                  dataKey="name"
                  className="fill-background"
                  stroke="none"
                  fontSize={12}
                  formatter={(value: string) => value}
                />
                {/* Cells ensure slice colors match our dynamic CSS vars */}
                {pieData.map((d, i) => (
                  <Cell key={i} fill={d.fill} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          {topLine}
        </div>
        <div className="text-muted-foreground leading-none">{totalLine}</div>
      </CardFooter>
    </Card>
  );
}
