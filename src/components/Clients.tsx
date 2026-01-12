import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const clients = [
  "Ajanta Auto",
  "KingFisher",
  "R.B. Sukhramani",
  "Wellfinish",
  "Shavo Norgren",
  "Hilda Automation",
  "Vikas Patil",
  "Vista Inn",
  "Envirochem Tech Solutions",
  "Parth Enterprises",
];

const Clients = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-muted/50" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium uppercase tracking-wider text-sm">
            Trusted By
          </span>
          <h2 className="font-display text-4xl md:text-6xl text-foreground mt-4">
            Our Valued Clients
          </h2>
        </motion.div>

        {/* Clients Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {clients.map((client, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group p-6 bg-card border border-border hover:border-primary/50 hover:shadow-lg transition-all text-center"
            >
              <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                {client}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;
