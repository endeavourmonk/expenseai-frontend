import { CategoryApiSchema } from "@expenseai/expenseai-shared";

import { Loader2 } from "lucide-react";

interface CategorySearchResultsProps {
  categories: CategoryApiSchema[];
  selectedCategoryIds: string[];
  onSelectCategory: (categoryId: string) => void;
  isLoading: boolean;
}

export const CategorySearchResults: React.FC<CategorySearchResultsProps> = ({
  categories,
  selectedCategoryIds,
  onSelectCategory,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-4">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span className="ml-2 text-sm text-gray-500">Searching...</span>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="text-center py-4 text-sm text-gray-500">
        No categories found
      </div>
    );
  }

  return (
    <div className="max-h-48 overflow-y-auto border rounded-md">
      {categories?.map((category) => {
        const isSelected = selectedCategoryIds.includes(category.id);

        return (
          <button
            key={category.id}
            type="button"
            onClick={() => onSelectCategory(category.id)}
            className={`w-full text-left px-3 py-2 hover:bg-accent border-b last:border-b-0 transition-colors ${
              isSelected ? "bg-accent/55 text-blue-700" : ""
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">{category.name}</span>
              {isSelected && (
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  Selected
                </span>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
};
