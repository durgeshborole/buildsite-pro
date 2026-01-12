import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { MapPin, Ruler, Building } from "lucide-react";
import industrialImg from "@/assets/industrial-construction.jpg";
import commercialImg from "@/assets/commercial-construction.jpg";

type Project = {
  name: string;
  location: string;
  type: string;
  architect: string;
  area: string;
  status: "ongoing" | "completed";
  image: string;
};

const projects: Project[] = [
  {
    name: "Envirochem Tech Solutions",
    location: "R-854, Rabale MIDC",
    type: "Data Centre",
    architect: "Amol Velankar",
    area: "2,00,000 Sqft",
    status: "ongoing",
    image: commercialImg,
  },
  {
    name: "Aditya Engineering",
    location: "R-362, Rabale",
    type: "Factory Building",
    architect: "Nalavade",
    area: "30,000 Sqft",
    status: "ongoing",
    image: industrialImg,
  },
  {
    name: "Shavo Norgren",
    location: "R-524/525, Rabale MIDC",
    type: "Factory RCC",
    architect: "Mr. Sybill",
    area: "70,000 Sqft",
    status: "completed",
    image: industrialImg,
  },
  {
    name: "Well Finish",
    location: "R-975, Rabale",
    type: "Factory Building",
    architect: "Mr. Borgaonkar",
    area: "10,760 Sqft",
    status: "completed",
    image: industrialImg,
  },
  {
    name: "Parth Enterprises",
    location: "R-916, Rabale MIDC",
    type: "Factory Building",
    architect: "Mr. Nalavade",
    area: "16,000 Sqft",
    status: "completed",
    image: industrialImg,
  },
  {
    name: "Vista Inn",
    location: "Rabale MIDC",
    type: "Hotel",
    architect: "Mr. Jirge",
    area: "7,000 Sqft",
    status: "completed",
    image: commercialImg,
  },
];

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [filter, setFilter] = useState<"all" | "ongoing" | "completed">("all");

  const filteredProjects = projects.filter(
    (project) => filter === "all" || project.status === filter
  );

  return (
    <section id="projects" className="py-24 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-primary font-medium uppercase tracking-wider text-sm">
            Our Portfolio
          </span>
          <h2 className="font-display text-4xl md:text-6xl text-foreground mt-4">
            Projects of the Last Five Years
          </h2>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center gap-4 mb-12"
        >
          {(["all", "ongoing", "completed"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-6 py-3 font-medium text-sm uppercase tracking-wider transition-all ${
                filter === status
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {status === "all" ? "All Projects" : status}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden bg-card border border-border"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-construction-dark/90 to-transparent" />

                {/* Status Badge */}
                <div
                  className={`absolute top-4 left-4 px-3 py-1 text-xs font-medium uppercase tracking-wider ${
                    project.status === "ongoing"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {project.status}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-display text-xl text-foreground mb-4">
                  {project.name}
                </h3>

                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{project.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-primary" />
                    <span>{project.type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Ruler className="w-4 h-4 text-primary" />
                    <span>{project.area}</span>
                  </div>
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
