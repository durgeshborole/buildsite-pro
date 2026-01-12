import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const equipment = [
  { name: "Props", quantity: "20,000" },
  { name: "Brass Shuttering Materials", quantity: "5,000" },
  { name: "Concrete Mixers", quantity: "15" },
  { name: "Diesel Concrete Mixers", quantity: "5" },
  { name: "Concrete Vibrators", quantity: "20" },
  { name: "Vibratory Compactors", quantity: "10" },
  { name: "Steel Bending Machines", quantity: "10" },
  { name: "Concrete Lift Machines", quantity: "7" },
];

const Equipment = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-muted/30" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium uppercase tracking-wider text-sm">
            Our Resources
          </span>
          <h2 className="font-display text-4xl md:text-6xl text-foreground mt-4">
            Machinery Inventory
          </h2>
        </motion.div>

        {/* Equipment Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {equipment.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-card border border-border p-6 text-center hover:border-primary/50 hover:shadow-lg transition-all group"
            >
              <p className="font-display text-3xl md:text-4xl text-primary mb-2 group-hover:scale-110 transition-transform">
                {item.quantity}
              </p>
              <p className="text-sm text-muted-foreground">{item.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Equipment;
