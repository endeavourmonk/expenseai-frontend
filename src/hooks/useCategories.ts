import { useCallback, useState } from "react";
import { queryClient } from "@/lib/tanstackQuery";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { Category, CategoryApiResponse } from "@expenseai/expenseai-shared";
import { searchCategoriesFn, createCategoryFn } from "@/lib/apis/category.api";

export const useCategories = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Search categories query
  const {
    data: searchResponse,
    isLoading,
    error: searchError,
  } = useQuery<CategoryApiResponse>({
    queryKey: ["categories", "search", searchQuery],
    queryFn: () => searchCategoriesFn(searchQuery),
    enabled: searchQuery.trim().length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  });

  const searchResults = searchResponse?.data.categories || [];

  // Create category mutation
  const createCategoryMutation = useMutation({
    mutationFn: createCategoryFn,
    onSuccess: (newCategory) => {
      // Invalidate and refetch categories
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });

      // Optimistically add to current search results if applicable
      if (searchQuery.trim().length > 0) {
        queryClient.setQueryData(
          ["categories", "search", searchQuery],
          (old: Category[] = []) => [...old, newCategory]
        );
      }

      toast.success("Category created successfully!");
    },
    onError: (error) => {
      console.error("Failed to create category:", error);
      toast.error("Failed to create category. Please try again.");
    },
  });

  const searchCategoriesByName = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const createNewCategory = useCallback(
    async (name: string): Promise<Category | null> => {
      try {
        const newCategory = await createCategoryMutation.mutateAsync({
          name,
        });
        return newCategory?.data?.category;
      } catch (error) {
        console.error("Error creating category:", error);
        return null;
      }
    },
    [createCategoryMutation]
  );

  return {
    searchResults,
    isLoading,
    isCreating: createCategoryMutation.isPending,
    searchError,
    searchCategoriesByName,
    createNewCategory,
    createCategoryMutation,
  };
};
