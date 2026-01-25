import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export const TransactionListShimmer = () => {
  return (
    <Card className="border-0 shadow-sm flex flex-col max-h-[500px]">
      <CardHeader className="flex flex-row items-center justify-between flex-shrink-0">
        <Skeleton className="h-6 w-48" />
      </CardHeader>

      <CardContent className="p-0 flex-1 flex flex-col min-h-0">
        {/* Scrollable Table Wrapper for Responsiveness */}
        <div className="overflow-x-auto flex-1 min-h-0">
          <Table>
            <TableHeader className="sticky top-0 bg-white dark:bg-gray-800 z-10">
              <TableRow>
                {/* For row icon */}
                <TableHead className="text-center min-w-[150px]">
                  <div className="flex items-center justify-center gap-2">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </TableHead>
                <TableHead className="text-center min-w-[120px]">
                  <div className="flex items-center justify-center gap-2">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </TableHead>
                <TableHead className="text-center min-w-[100px]">
                  <div className="flex items-center justify-center gap-2">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </TableHead>
                <TableHead className="text-center min-w-[150px]">
                  <div className="flex items-center justify-center gap-2">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </TableHead>
                <TableHead className="text-center min-w-[200px]">
                  <div className="flex items-center justify-center gap-2">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index} className={cn("transition-all h-10")}>
                  {/* Name */}
                  <TableCell className="px-4 text-center">
                    <Skeleton className="h-4 w-32 mx-auto" />
                  </TableCell>

                  {/* Date */}
                  <TableCell className="px-4 text-center">
                    <Skeleton className="h-4 w-24 mx-auto" />
                  </TableCell>

                  {/* Amount */}
                  <TableCell className="text-center px-4">
                    <Skeleton className="h-4 w-20 mx-auto" />
                  </TableCell>

                  {/* Categories */}
                  <TableCell className="px-4 text-center">
                    <div className="flex justify-center gap-2">
                      <Skeleton className="h-6 w-20" />
                      <Skeleton className="h-6 w-20" />
                    </div>
                  </TableCell>

                  {/* Description */}
                  <TableCell className="px-4 text-center">
                    <Skeleton className="h-4 w-40 mx-auto" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Total Income and Expense */}
        <div className="flex-shrink-0 border-t bg-gray-50 dark:bg-gray-900 p-4">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="flex items-center space-x-2">
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-16" />
              </div>
              <div className="flex items-center space-x-2">
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
            <Skeleton className="h-3 w-32 mt-2 sm:mt-0" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
