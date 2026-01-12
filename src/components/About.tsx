import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Eye, CheckCircle2 } from "lucide-react";

const goals = [
  "Deliver High-Quality Projects on Time",
  "Build Long-Term Client Relationships",
  "Innovate and Grow Sustainably",
];

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium uppercase tracking-wider text-sm">
            About Us
          </span>
          <h2 className="font-display text-4xl md:text-6xl text-foreground mt-4">
            Building Excellence Since Day One
          </h2>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - About Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute -left-4 top-0 w-1 h-full bg-primary" />
              <div className="pl-8">
                <h3 className="font-display text-2xl md:text-3xl text-foreground mb-6">
                  About the Company
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Pawar Constructions is a trusted name in the field of civil construction
                  and engineering, committed to delivering high-quality infrastructure and
                  turnkey project solutions. With years of experience and a team of skilled
                  professionals, we specialize in residential, commercial, and industrial
                  construction projects.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Our focus is on safety, precision, timely delivery, and sustainable
                  construction practices. We believe in transforming blueprints into
                  reality with innovation, engineering excellence, and unmatched
                  workmanship.
                </p>
              </div>
            </div>

            {/* Goals */}
            <div className="mt-12 space-y-4">
              <h4 className="font-display text-xl text-foreground mb-4">Our Goals</h4>
              {goals.map((goal, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-3 p-4 bg-muted/50 border-l-4 border-primary"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground font-medium">{goal}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Mission & Vision */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-8"
          >
            {/* Mission Card */}
            <div className="bg-secondary p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 -translate-y-1/2 translate-x-1/2 rounded-full transition-transform group-hover:scale-150" />
              <div className="relative">
                <div className="w-14 h-14 bg-primary flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-display text-2xl text-secondary-foreground mb-4">
                  Our Mission
                </h3>
                <ul className="space-y-3 text-secondary-foreground/80">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    To deliver value-driven construction services with integrity
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    To uphold the highest standards in quality, safety, and project delivery
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    To foster lasting relationships with clients, partners, and communities
                  </li>
                </ul>
              </div>
            </div>

            {/* Vision Card */}
            <div className="bg-primary p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 -translate-y-1/2 translate-x-1/2 rounded-full transition-transform group-hover:scale-150" />
              <div className="relative">
                <div className="w-14 h-14 bg-secondary flex items-center justify-center mb-6">
                  <Eye className="w-7 h-7 text-secondary-foreground" />
                </div>
                <h3 className="font-display text-2xl text-primary-foreground mb-4">
                  Our Vision
                </h3>
                <p className="text-primary-foreground/90">
                  To be recognized as a leading construction and engineering company
                  known for quality, reliability, and commitment to excellence.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
