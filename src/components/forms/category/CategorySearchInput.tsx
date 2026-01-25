import { Search, Plus } from "lucide-react";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { useEffect, useState } from "react";
import { CategoryApiSchema } from "@expenseai/expenseai-shared";

interface CategorySearchInputProps {
  onSearch: (query: string) => void;
  searchResults: CategoryApiSchema[];
  onCreateCategory: (name: string) => void;
  isLoading: boolean;
  isCreating: boolean;
  placeholder?: string;
}

export const CategorySearchInput: React.FC<CategorySearchInputProps> = ({
  onSearch,
  searchResults,
  onCreateCategory,
  isCreating,
  isLoading,
  placeholder = "Search categories...",
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const isSearchTermPresent = searchResults.some(
    (category) => category.name.toLowerCase() === searchQuery.toLowerCase()
  );
  console.log("isSearchTermPresent ------->", isSearchTermPresent);

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

      {/* If that serach query is not present in the searchResults,
       then we can show the create button */}
      {searchQuery.trim() && !isSearchTermPresent && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleCreateCategory}
          disabled={isCreating || isLoading}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          {isCreating ? "Creating..." : `Create "${searchQuery}"`}
        </Button>
      )}
    </div>
  );
};
