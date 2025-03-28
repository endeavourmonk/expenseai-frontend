import { motion } from "framer-motion";
import { Button } from "../ui/button";

export function Hero() {
  return (
    <section className="container mx-auto px-4 pt-32 pb-32 space-y-8 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-primary to-[#646cff] bg-clip-text text-transparent">
          Take Control of Your Finances
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          ExpenseAI simplifies money management with intelligent tracking,
          actionable insights, and seamless synchronization.
        </p>
      </motion.div>

      <motion.div
        className="flex justify-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.div whileTap={{ scale: 0.95 }}>
          <Button size="lg" className="hover:scale-105 transition-transform">
            Get Started
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button variant="outline" size="lg">
            Learn More
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
