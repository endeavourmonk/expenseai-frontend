import { Category } from "@expenseai/expenseai-shared";
import { useCategories } from "@/hooks/useCategories";

// components/CategorySearchInput.tsx
// import { useState, useEffect } from "react";
import { Search, Plus } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface CategorySearchInputProps {
  onSearch: (query: string) => void;
  onCreateCategory: (name: string) => void;
  isCreating: boolean;
  placeholder?: string;
}

export const CategorySearchInput: React.FC<CategorySearchInputProps> = ({
  onSearch,
  onCreateCategory,
  isCreating,
  placeholder = "Search categories...",
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, onSearch]);

  const handleCreateCategory = () => {
    if (searchQuery.trim()) {
      onCreateCategory(searchQuery.trim());
      setSearchQuery("");
    }
  };

  return (
    <div className="space-y-2">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {searchQuery.trim() && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleCreateCategory}
          disabled={isCreating}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          {isCreating ? "Creating..." : `Create "${searchQuery}"`}
        </Button>
      )}
    </div>
  );
};

// components/CategorySearchResults.tsx
import { Loader2 } from "lucide-react";
// import { Category } from "../types/category";

interface CategorySearchResultsProps {
  categories: Category[];
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
  console.log("categories sr ---------->", categories);
  return (
    <div className="max-h-48 overflow-y-auto border rounded-md">
      {categories?.map((category) => {
        const isSelected = selectedCategoryIds.includes(category.id);

        return (
          <button
            key={category.id}
            type="button"
            onClick={() => onSelectCategory(category.id)}
            className={`w-full text-left px-3 py-2 hover:bg-gray-50 border-b last:border-b-0 transition-colors ${
              isSelected ? "bg-blue-50 text-blue-700" : ""
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

// components/SelectedCategories.tsx
// import React from "react";
import { X } from "lucide-react";
import { Badge } from "../ui/badge";
import { useEffect, useState } from "react";
// import { Category } from "../types/category";

interface SelectedCategoriesProps {
  categories: Category[];
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
              className="ml-1 hover:bg-gray-300 rounded-full p-0.5 transition-colors"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
    </div>
  );
};

// components/CategorySelector.tsx (Main Component)
// import React, { useState, useEffect } from "react";
// import { Category } from "../types/category";
// import { useCategories } from "../hooks/useCategories";
// import { CategorySearchInput } from "./CategorySearchInput";
// import { CategorySearchResults } from "./CategorySearchResults";
// import { SelectedCategories } from "./SelectedCategories";

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

  console.log("searchResults------->", searchResults);
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
      if (categoryToAdd) {
        setSelectedCategories((prev) => [...prev, categoryToAdd]);
      }
    }

    onSelect(updatedIds);
  };

  const handleCreateCategory = async (name: string) => {
    const newCategory = await createNewCategory(name);
    if (newCategory) {
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
          onCreateCategory={handleCreateCategory}
          isCreating={isCreating}
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

// Usage Example in your form
/*
const TransactionForm = () => {
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategoryIds(prev => {
      if (prev.includes(categoryId)) {
        // Remove category
        const updated = prev.filter(id => id !== categoryId);
        setSelectedCategories(cats => cats.filter(cat => cat.id !== categoryId));
        return updated;
      } else {
        // Add category (you'd need to fetch the full category object here)
        return [...prev, categoryId];
      }
    });
  };

  return (
    <form>
      <CategorySelector
        selectedCategoriesIds={selectedCategoryIds}
        selectedCategories={selectedCategories}
        onSelect={handleCategorySelect}
      />
    </form>
  );
};
*/
