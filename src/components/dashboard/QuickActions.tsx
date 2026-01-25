import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, TrendingUp, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { buttonVariants, itemVariants } from "./variants";

export const QuickActions = () => (
  <motion.div variants={itemVariants} initial="hidden" animate="visible">
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
          <Button className="w-full justify-start bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white border-0 relative overflow-hidden group">
            <motion.div
              className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10"
              initial={false}
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2 }}
            />
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
            </motion.div>
            Add Expense
          </Button>
        </motion.div>

        <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
          <Button
            variant="outline"
            className="w-full justify-start border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-800 dark:text-emerald-400 dark:hover:bg-emerald-950"
          >
            <motion.div
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <TrendingUp className="mr-2 h-4 w-4" />
            </motion.div>
            Add Income
          </Button>
        </motion.div>

        <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
          <Button
            variant="outline"
            className="w-full justify-start border-blue-200 text-blue-700 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-950"
          >
            <motion.div
              whileHover={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 0.5 }}
            >
              <Calendar className="mr-2 h-4 w-4" />
            </motion.div>
            View Reports
          </Button>
        </motion.div>
      </CardContent>
    </Card>
  </motion.div>
);
