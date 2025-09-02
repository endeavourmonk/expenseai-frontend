import { Badge } from "@/components/ui/badge";
import { CategoryApiSchema } from "@expenseai/expenseai-shared";
import { cn } from "@/lib/utils";

interface CategoryBtnProps {
  category: CategoryApiSchema;
  onClick?: (category: CategoryApiSchema) => void;
  variant?: "default" | "outline" | "secondary";
  size?: "sm" | "default" | "lg";
  className?: string;
}

export const CategoryBtn = ({
  category,
  onClick,
  variant = "default",
  size = "default",
  className,
}: CategoryBtnProps) => {
  const isClickable = !!onClick;

  return (
    <Badge
      variant={variant}
      className={cn(
        "inline-flex items-center gap-2 font-medium transition-colors m-1 rounded-sm",
        // Size variants
        size === "sm" && "text-xs px-2 py-1",
        size === "default" && "text-sm px-3 py-1.5",
        size === "lg" && "text-base px-4 py-2",
        // Clickable styles
        isClickable &&
          "cursor-pointer hover:opacity-80 active:scale-95 transition-all duration-150",
        `border border-gray-200 dark:border-gray-700 text-white`,
        className
      )}
      style={{
        backgroundColor: category.color,
      }}
      onClick={isClickable ? () => onClick(category) : undefined}
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={
        isClickable
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick(category);
              }
            }
          : undefined
      }
    >
      {/* Category name */}
      <span className="truncate max-w-[120px]">{category.name}</span>
    </Badge>
  );
};
