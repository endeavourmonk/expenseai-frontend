import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface Category {
  id: string;
  name: string;
  description: string;
  color: string;
  createdAt: string;
}

export function CategoryItem(category: Category) {
  const [isHovered, setIsHovered] = useState(false);

  const handleCategoryClick = (categoryName: string) => {
    console.log(categoryName);
  };

  return (
    <div className="relative">
      <motion.button
        onClick={() => handleCategoryClick(category.name)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className=" relative overflow-hidden rounded-md p-2 text-left transition-all duration-200 ease-out bg-card border border-border hover:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 group"
        style={{
          background: `linear-gradient(135deg, ${category.color}12, ${category.color}06)`,
        }}
        whileHover={{
          scale: 1.015,
          transition: { duration: 0.2, ease: "easeOut" },
        }}
        whileTap={{
          scale: 0.985,
          transition: { duration: 0.1, ease: "easeInOut" },
        }}
        layout
      >
        {/* Color indicator */}
        <motion.div
          className="absolute left-0 top-0 w-0.5 h-full"
          style={{ backgroundColor: category.color }}
          animate={{
            width: isHovered ? "10px" : "8px",
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        />

        {/* Content */}
        <div className="pl-2.5">
          <motion.div
            className="font-medium text-xs text-foreground"
            animate={{
              color: isHovered ? category.color : undefined,
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {category.name}
          </motion.div>
        </div>

        {/* Hover effect overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent to-primary/5"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        />
      </motion.button>

      {/* Animated Tooltip */}
      <AnimatePresence>
        {category.description && isHovered && (
          <motion.div
            initial={{
              opacity: 0,
              y: 8,
              scale: 0.96,
              filter: "blur(4px)",
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
            }}
            exit={{
              opacity: 0,
              y: 8,
              scale: 0.96,
              filter: "blur(4px)",
            }}
            transition={{
              duration: 0.15,
              ease: [0.25, 0.46, 0.45, 0.94], // Custom easing for smooth animation
            }}
            className="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2.5 py-1.5 text-xs text-white bg-gray-900 rounded-md shadow-lg max-w-xs whitespace-normal border border-gray-700"
            style={{
              backdropFilter: "blur(8px)",
              backgroundColor: "rgba(17, 24, 39, 0.95)",
            }}
          >
            {category.description}
            {/* Animated Tooltip arrow */}
            <motion.div
              className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-3 border-r-3 border-t-3 border-l-transparent border-r-transparent border-t-gray-900"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.1, delay: 0.05 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
