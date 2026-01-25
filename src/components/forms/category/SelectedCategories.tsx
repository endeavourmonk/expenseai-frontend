import { X } from "lucide-react";
import { Badge } from "../../ui/badge";
import { CategoryApiSchema } from "@expenseai/expenseai-shared";

interface SelectedCategoriesProps {
  categories: CategoryApiSchema[];
  onRemoveCategory: (categoryId: string) => void;
}

export const SelectedCategories: React.FC<SelectedCategoriesProps> = ({
  categories,
  onRemoveCategory,
}) => {
  if (categories.length === 0) {
    return (
      <div className="text-sm text-gray-500 py-2">No categories selected</div>
    );
  }

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium text-gray-700">
        Selected Categories:
      </h4>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Badge
            key={category.id}
            variant="secondary"
            className="flex items-center gap-1 px-2 py-1"
          >
            <span>{category.name}</span>
            <button
              type="button"
              onClick={() => onRemoveCategory(category.id)}
              className="cursor-pointer ml-1 hover:bg-background rounded-full p-1 transition-colors"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
    </div>
  );
};
