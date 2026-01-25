import { TrendingUp, TrendingDown } from "lucide-react";
import { Pie, PieChart, ResponsiveContainer, Cell } from "recharts";

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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  ExpensesApiResponse,
  IncomeApiResponse,
} from "@expenseai/expenseai-shared";
import { useAuthStore } from "@/stores/authStore";
import { monthNames } from "@/lib/constants";

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
    const baseColor = d.fill?.startsWith("#")
      ? d.fill
      : palette[i % palette.length];
    cfg[key] = { label: d.name, color: baseColor };
    return { ...d, key, fill: `var(--color-${key})` };
  });

  console.log("rows -----------", rows);
  return { cfg, rows };
}

export function CategoryChartPieLabelList({
  transactions,
  monthIndex,
}: {
  transactions: ExpensesApiResponse | IncomeApiResponse | null | undefined;
  monthIndex: number;
}) {
  if (!transactions || !transactions.data) return <div>Loading data...</div>;

  // Normalize items to a common shape
  const items: CommonTx[] = isExpensesData(transactions.data)
    ? transactions.data.expenses
    : isIncomesData(transactions.data)
      ? transactions.data.incomes
      : [];

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
  const monthLabel = monthNames[monthIndex];
  const title = isExpenses
    ? `Where your money went — ${monthLabel}`
    : `Where your money came from — ${monthLabel}`;
  const subTitle = `${items.length} ${isExpenses ? "transactions" : "payments"}`;

  const total = chartData.reduce((s, d) => s + d.value, 0);
  const hasData = chartData.length > 0 && total > 0;

  // Build dynamic chart config + rows with CSS var fills
  const { cfg: dynamicConfig, rows: pieData } = buildChartConfig(
    hasData ? chartData : [],
    isExpenses
  );

  // Empty-state pie (one neutral slice). Uses a generic token that should exist in your theme.
  const emptyPieData = [
    {
      name: "No data",
      key: "no-data",
      value: 1,
      // neutral color token; fallback to a subtle gray if your theme doesn't define --muted
      fill: "var(--muted, hsl(0 0% 90%))",
    },
  ] as const;

  const currencySymbol =
    useAuthStore.getState()?.user?.defaultCurrency?.symbol ?? "₹";

  const topLine = hasData
    ? (() => {
        const top = [...chartData].sort((a, b) => b.value - a.value)[0];
        const topPct = (top.value / total) * 100;
        return `Top: ${top.name} — ${formatCurrency(
          currencySymbol,
          top.value
        )} (${topPct.toFixed(1)}%)`;
      })()
    : "Top: —";

  const totalLine = isExpenses
    ? `Total spent: ${formatCurrency(currencySymbol, total)}`
    : `Total received: ${formatCurrency(currencySymbol, total)}`;

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
          // When empty, inject a config entry so legend (if shown) has a color,
          // though we hide legend in empty state to avoid confusion.
          config={
            hasData
              ? dynamicConfig
              : ({
                  value: {
                    label: isExpenses ? "Spent" : "Received",
                  },
                  "no-data": {
                    label: "No data",
                    color: "var(--muted, hsl(0 0% 90%))",
                  },
                } as ChartConfig)
          }
          className="[&_.recharts-text]:fill-background mx-auto aspect-square max-h-[260px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    nameKey="name"
                    hideLabel
                    formatter={(value, name) => [
                      name,
                      " ",
                      formatCurrency(currencySymbol, Number(value)),
                    ]}
                  />
                }
              />

              {/* Hide legend in empty state to avoid a lone "No data" pill */}
              {hasData && (
                <ChartLegend
                  content={<ChartLegendContent nameKey="key" />}
                  layout="horizontal"
                  verticalAlign="bottom"
                  align="center"
                  className="flex-wrap gap-2 *:basis-1/4 *:justify-center"
                />
              )}

              <Pie
                data={hasData ? pieData : (emptyPieData as any)}
                dataKey="value"
                nameKey="name"
                outerRadius="80%"
                isAnimationActive={hasData}
              >
                {(hasData ? pieData : emptyPieData).map((d, i) => (
                  <Cell key={i} fill={d.fill as string} />
                ))}
                {/* show labels only when there’s real data */}
                {/* {hasData && (
                  <LabelList dataKey="name" position="outside" offset={6} />
                )} */}
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
