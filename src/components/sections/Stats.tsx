import { motion } from "framer-motion";

interface StatItem {
  value: string;
  label: string;
}

export function Stats() {
  const stats: StatItem[] = [
    { value: "1M+", label: "Transactions Analyzed" },
    { value: "4.9/5", label: "User Rating" },
    { value: "150+", label: "Countries Supported" },
  ];

  return (
    <section className="container mx-auto px-4 py-20" id="stats">
      <div className="container">
        <motion.h2
          className="text-3xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          By The Numbers
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <motion.div
                className="text-4xl font-bold text-primary"
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  delay: 0.2 + index * 0.1,
                }}
              >
                {stat.value}
              </motion.div>
              <div className="text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
