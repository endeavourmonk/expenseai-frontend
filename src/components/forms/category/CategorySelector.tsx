import { Category } from "@expenseai/expenseai-shared";
import { useCategories } from "@/hooks/useCategories";
import { CategorySearchInput } from "./CategorySearchInput";

import { useState } from "react";
import { CategorySearchResults } from "./CategorySearchResults";
import { SelectedCategories } from "./SelectedCategories";

interface CategorySelectorProps {
  selectedCategoriesIds: string[] | undefined;
  onSelect: (categoryIds: string[]) => void; // Updated to pass the entire array
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedCategoriesIds = [],
  onSelect,
}) => {
  const {
    searchResults,
    isLoading,
    isCreating,
    searchCategoriesByName,
    createNewCategory,
  } = useCategories();

  console.log("searchResults ------->", searchResults);
  const [showResults, setShowResults] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

  const handleSearch = (query: string) => {
    searchCategoriesByName(query);
    setShowResults(query.trim().length > 0);
  };

  const handleSelectCategory = (categoryId: string) => {
    const currentIds = selectedCategoriesIds || [];
    let updatedIds: string[];

    if (currentIds.includes(categoryId)) {
      // Remove category
      updatedIds = currentIds.filter((id) => id !== categoryId);
      setSelectedCategories((prev) =>
        prev.filter((cat) => cat.id !== categoryId)
      );
    } else {
      // Add category
      updatedIds = [...currentIds, categoryId];

      // Find the category object from search results and add to selected categories
      const categoryToAdd = searchResults.find(
        (cat: Category) => cat.id === categoryId
      );
      if (categoryToAdd)
        setSelectedCategories((prev) => [...prev, categoryToAdd]);
    }

    onSelect(updatedIds);
  };

  const handleCreateCategory = async (name: string) => {
    const newCategory = await createNewCategory(name);
    if (newCategory) {
      console.log("newCategory ------->", newCategory);
      const updatedIds = [...(selectedCategoriesIds || []), newCategory.id];
      setSelectedCategories((prev) => [...prev, newCategory]);
      onSelect(updatedIds);
      setShowResults(false);
    }
  };

  const handleRemoveCategory = (categoryId: string) => {
    const updatedIds = (selectedCategoriesIds || []).filter(
      (id) => id !== categoryId
    );
    setSelectedCategories((prev) =>
      prev.filter((cat) => cat.id !== categoryId)
    );
    onSelect(updatedIds);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <CategorySearchInput
          onSearch={handleSearch}
          searchResults={searchResults}
          onCreateCategory={handleCreateCategory}
          isCreating={isCreating}
          isLoading={isLoading}
        />

        {showResults && (
          <CategorySearchResults
            categories={searchResults}
            selectedCategoryIds={selectedCategoriesIds}
            onSelectCategory={handleSelectCategory}
            isLoading={isLoading}
          />
        )}
      </div>

      <SelectedCategories
        categories={selectedCategories}
        onRemoveCategory={handleRemoveCategory}
      />
    </div>
  );
};
