import { TrendingUp, TrendingDown } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { monthNames } from "@/lib/constants";

interface CategoryChartPieLabelListShimmerProps {
  isExpenses?: boolean;
  monthIndex?: number;
}

// Shimmer animation component
const Shimmer = ({ className }: { className?: string }) => (
  <div
    className={cn(
      "animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 bg-[length:400%_100%] rounded",
      className
    )}
    style={{
      animation: "shimmer 2s ease-in-out infinite",
    }}
  />
);

// Shimmer CSS (add to global styles or use style tag)
const shimmerStyles = `
  @keyframes shimmer {
    0% { background-position: 100% 0; }
    100% { background-position: -100% 0; }
  }
`;

// Legend shimmer items
const LegendShimmer = () => {
  return (
    <div className="flex flex-wrap gap-2 justify-center mt-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="flex items-center gap-2 basis-1/4 justify-center"
        >
          <Shimmer className="w-3 h-3 rounded-full" />
          <Shimmer
            className={cn(
              "h-3",
              // Vary legend item widths
              index % 3 === 0 ? "w-12" : index % 3 === 1 ? "w-16" : "w-10"
            )}
          />
        </div>
      ))}
    </div>
  );
};

// Alternative version with more detailed pie chart simulation
export function CategoryChartPieShimmer({
  isExpenses = true,
  monthIndex = new Date().getMonth(),
}: CategoryChartPieLabelListShimmerProps) {
  const monthLabel = monthNames[monthIndex];
  const title = isExpenses
    ? `Where your money went — ${monthLabel}`
    : `Where your money came from — ${monthLabel}`;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: shimmerStyles }} />

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
          <CardDescription>
            <Shimmer className="h-4 w-24 mx-auto" />
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-1 pb-0">
          {/* More detailed pie chart with individual segments */}
          <div className="mx-auto aspect-square max-h-[260px] w-full relative flex items-center justify-center">
            <div className="relative w-52 h-52">
              {/* Multiple concentric circles to simulate pie segments */}
              <div className="absolute inset-0 rounded-full opacity-70">
                <Shimmer className="w-full h-full rounded-full" />
              </div>
              <div className="absolute inset-2 rounded-full opacity-50">
                <Shimmer className="w-full h-full rounded-full" />
              </div>
              <div className="absolute inset-4 rounded-full opacity-30">
                <Shimmer className="w-full h-full rounded-full" />
              </div>

              {/* Center hole */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-white dark:bg-gray-800 rounded-full" />
              </div>
            </div>
          </div>

          <LegendShimmer />
        </CardContent>

        <CardFooter className="flex-col gap-2 text-sm">
          <div className="flex items-center justify-center gap-2 leading-none font-medium">
            <Shimmer className="h-4 w-40" />
          </div>
          <div className="text-muted-foreground leading-none flex justify-center">
            <Shimmer className="h-4 w-32" />
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
