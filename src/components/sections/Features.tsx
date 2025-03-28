import { useState } from "react";
import { motion } from "framer-motion";

// Define the feature type for better type safety
interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export function Features() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  // Icons for each feature
  const SmartCategoryIcon = () => (
    <svg className="text-primary" viewBox="0 0 24 24" width="24" height="24">
      <path
        fill="currentColor"
        d="M12 2L3 9l3 3v8h12v-8l3-3l-9-7zM9 18v-4h6v4H9z"
      />
    </svg>
  );

  const SyncIcon = () => (
    <svg className="text-primary" viewBox="0 0 24 24" width="24" height="24">
      <path
        fill="currentColor"
        d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6c0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6c0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4l-4-4v3z"
      />
    </svg>
  );

  const ReportsIcon = () => (
    <svg className="text-primary" viewBox="0 0 24 24" width="24" height="24">
      <path
        fill="currentColor"
        d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"
      />
    </svg>
  );

  const SecurityIcon = () => (
    <svg className="text-primary" viewBox="0 0 24 24" width="24" height="24">
      <path
        fill="currentColor"
        d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12c5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"
      />
    </svg>
  );

  const features: Feature[] = [
    {
      title: "Smart Categorization",
      description: "AI-powered expense sorting",
      icon: <SmartCategoryIcon />,
    },
    {
      title: "Real-time Sync",
      description: "Instant multi-device updates",
      icon: <SyncIcon />,
    },
    {
      title: "Reports",
      description: "Beautiful financial visualizations",
      icon: <ReportsIcon />,
    },
    {
      title: "Security",
      description: "Bank-grade encryption",
      icon: <SecurityIcon />,
    },
  ];

  // Animation variants for staggered children
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className="container mx-auto px-4 py-20" id="features">
      <motion.h2
        className="text-3xl font-bold text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Powerful Features
      </motion.h2>

      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="p-8 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm transition-all duration-300 overflow-hidden relative group"
            onHoverStart={() => setHoveredFeature(index)}
            onHoverEnd={() => setHoveredFeature(null)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            animate={{
              y: hoveredFeature === index ? -5 : 0,
              borderColor:
                hoveredFeature === index
                  ? "hsl(var(--primary) / 0.3)"
                  : "hsl(var(--border) / 0.5)",
              boxShadow:
                hoveredFeature === index
                  ? "0 15px 30px -10px rgba(0, 0, 0, 0.1)"
                  : "none",
            }}
            variants={item}
          >
            {/* Background gradient that appears on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: hoveredFeature === index ? 1 : 0 }}
            />

            {/* Icon with animated background */}
            <motion.div
              className="size-14 mb-6 rounded-xl flex items-center justify-center relative z-10"
              animate={{
                backgroundColor:
                  hoveredFeature === index
                    ? "hsl(var(--primary) / 0.15)"
                    : "hsl(var(--primary) / 0.1)",
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                animate={{
                  scale: hoveredFeature === index ? 1.1 : 1,
                  rotate: hoveredFeature === index ? 5 : 0,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                {feature.icon}
              </motion.div>
            </motion.div>

            {/* Title with animated underline */}
            <div className="relative z-10">
              <h3 className="text-xl font-semibold mb-2 relative inline-block">
                {feature.title}
                <motion.span
                  className="absolute bottom-0 left-0 h-[2px] bg-primary/40 w-0 group-hover:w-full transition-all duration-300"
                  initial={{ width: 0 }}
                  animate={{ width: hoveredFeature === index ? "100%" : "0%" }}
                />
              </h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
