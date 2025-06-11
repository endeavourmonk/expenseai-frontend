import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Search, Loader2, Plus } from "lucide-react";
import { CategoryItem } from "../CategoryItem";

type Category = {
  id: string;
  name: string;
  description: string;
  color: string;
  createdAt: string;
};

type Response = {
  status: "success";
  results: number;
  data: {
    categories: Category[];
  };
};

export function Category() {
  const [name, setName] = useState("");

  const { data, isLoading, isError } = useQuery<Response, Error>({
    queryKey: ["categories", name],
    enabled: name.length > 0,
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:8000/api/v1/categories?name=${encodeURIComponent(
          name
        )}`,
        {
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!res.ok) throw new Error("Network response was not ok");
      return (await res.json()) as Response;
    },
  });

  const handleCreateCategory = () => {
    console.log(`Create category: ${name}`);
  };

  // Smooth spring animation config
  const springConfig = {
    type: "spring" as const,
    stiffness: 260,
    damping: 20,
    mass: 1,
  };

  const smoothTransition = {
    type: "spring" as const,
    stiffness: 400,
    damping: 25,
    mass: 0.8,
  };

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={smoothTransition}
        className="relative"
      >
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder="Search or Create Category"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="pl-10 h-10 border-2 focus:border-primary transition-all duration-200 rounded-lg"
        />
      </motion.div>

      {/* Loading State */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={smoothTransition}
            className="flex items-center justify-center py-6"
          >
            <div className="flex items-center space-x-3 text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Searching categories...</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error State */}
      <AnimatePresence mode="wait">
        {isError && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={smoothTransition}
          >
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 text-center">
              <div className="text-destructive font-medium">
                Error loading categories
              </div>
              <p className="text-muted-foreground text-sm mt-1">
                Please try again later
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Categories Grid or Create Button */}
      <AnimatePresence mode="wait">
        {data?.data.categories.length ? (
          <motion.div
            key="categories-grid"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={smoothTransition}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {data.data.categories.map((category) => (
                <CategoryItem key={category.id} {...category} />
              ))}
            </div>
          </motion.div>
        ) : (
          // Create category button when no results
          name.length > 0 &&
          !isLoading && (
            <motion.div
              key="create-category"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={springConfig}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
            >
              <motion.button
                whileHover={{
                  scale: 1.02,
                  y: -1,
                  transition: { ...smoothTransition, duration: 0.15 },
                }}
                whileTap={{
                  scale: 0.98,
                  transition: { duration: 0.1 },
                }}
                onClick={handleCreateCategory}
                className="group relative overflow-hidden rounded-lg p-4 text-left transition-all duration-200 bg-card border-2 border-dashed border-muted-foreground/30 hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 hover:bg-primary/5"
              >
                {/* Plus icon indicator */}
                <motion.div
                  className="absolute top-0 left-0 w-1 h-full bg-primary"
                  animate={{
                    width: "4px",
                  }}
                  whileHover={{
                    width: "8px",
                    transition: { duration: 0.2 },
                  }}
                />

                {/* Content */}
                <div className="relative flex items-center space-x-2">
                  <motion.div
                    whileHover={{
                      rotate: 90,
                      transition: { duration: 0.2 },
                    }}
                  >
                    <Plus className="h-4 w-4 text-primary" />
                  </motion.div>
                  <div className="font-semibold text-primary">
                    Create "{name}"
                  </div>
                </div>

                {/* Hover effect overlay */}
                <motion.div
                  className="absolute inset-0 bg-primary pointer-events-none rounded-lg"
                  initial={{ opacity: 0 }}
                  whileHover={{
                    opacity: 0.05,
                    transition: { duration: 0.2 },
                  }}
                />
              </motion.button>
            </motion.div>
          )
        )}
      </AnimatePresence>
    </div>
  );
}
