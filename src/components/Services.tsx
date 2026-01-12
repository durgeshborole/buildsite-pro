import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Home, Building, Factory, HardHat, KeyRound, ArrowUpRight } from "lucide-react";
import residentialImg from "@/assets/residential-construction.jpg";
import commercialImg from "@/assets/commercial-construction.jpg";
import industrialImg from "@/assets/industrial-construction.jpg";
import civilImg from "@/assets/civil-engineering.jpg";

const services = [
  {
    icon: Home,
    title: "Residential Construction",
    description:
      "Building quality homes with modern designs and durable construction for comfortable living spaces.",
    image: residentialImg,
  },
  {
    icon: Building,
    title: "Commercial Construction",
    description:
      "Office buildings, retail spaces, and commercial complexes built to meet business requirements.",
    image: commercialImg,
  },
  {
    icon: Factory,
    title: "Industrial Construction",
    description:
      "Factory buildings, warehouses, and manufacturing facilities with robust structural engineering.",
    image: industrialImg,
  },
  {
    icon: HardHat,
    title: "Civil & Structural Engineering",
    description:
      "Expert engineering solutions for infrastructure projects with precision and safety standards.",
    image: civilImg,
  },
  {
    icon: KeyRound,
    title: "Turnkey Projects",
    description:
      "Complete end-to-end project solutions from design to handover, ensuring seamless execution.",
    image: null,
  },
];

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="services"
      className="py-24 bg-construction-dark relative overflow-hidden"
      ref={ref}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 20px, white 20px, white 21px)",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium uppercase tracking-wider text-sm">
            What We Do
          </span>
          <h2 className="font-display text-4xl md:text-6xl text-secondary-foreground mt-4">
            Our Offered Services
          </h2>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group relative overflow-hidden bg-construction-charcoal border border-construction-steel/30 hover:border-primary/50 transition-all duration-300 ${
                index === 4 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              {/* Image Background */}
              {service.image && (
                <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-construction-charcoal via-construction-charcoal/80 to-transparent" />
                </div>
              )}

              {/* Content */}
              <div className="relative p-8">
                <div className="w-14 h-14 bg-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                  <service.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>

                <h3 className="font-display text-2xl text-secondary-foreground mb-4">
                  {service.title}
                </h3>

                <p className="text-construction-concrete leading-relaxed mb-6">
                  {service.description}
                </p>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all"
                >
                  Learn More
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>

              {/* Hover Accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
