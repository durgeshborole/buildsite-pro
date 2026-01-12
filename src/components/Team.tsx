import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { User } from "lucide-react";

const technicalStaff = [
  {
    position: "Project Co-ordinator",
    count: 1,
    qualification: "B.E. Civil",
    experience: "15-20 Years Industrial",
  },
  {
    position: "Project Manager",
    count: 1,
    qualification: "B.E. Civil / DCE Civil",
    experience: "12-15 Years Industrial",
  },
  {
    position: "Sr. Site Engineer",
    count: 1,
    qualification: "B.E. Civil / DCE",
    experience: "10-12 Years Industrial",
  },
  {
    position: "BIM Engineer",
    count: 1,
    qualification: "B.E. Civil / DCE",
    experience: "5-8 Years Industrial",
  },
  {
    position: "Site Supervisor",
    count: 2,
    qualification: "Graduate / ITI",
    experience: "10-15 Years Industrial",
  },
  {
    position: "Safety Manager / Officer",
    count: 1,
    qualification: "Safety Course / Safety Graduate",
    experience: "8-12 Years Industrial",
  },
];

const administrativeStaff = [
  {
    position: "Accountants",
    count: 1,
    qualification: "C.A. / B.Com",
    experience: "10-12 Years Industrial",
  },
  {
    position: "Purchase / Store",
    count: 1,
    qualification: "Technical / Any Graduation",
    experience: "8-10 Years Industrial",
  },
];

const managementTeam = [
  {
    name: "Anil Shrimant Pawar",
    role: "Founder",
    description: "Visionary leader with decades of experience in construction industry",
  },
  {
    name: "Pratik Pawar",
    role: "Director",
    description: "Overseeing strategic operations and business development",
  },
  {
    name: "Kaustubh Pawar",
    role: "Co-Founder",
    description: "Driving innovation and sustainable construction practices",
  },
  {
    name: "Simab Borkar",
    role: "Chief Operating Officer",
    description: "Managing day-to-day operations and project execution",
  },
  {
    name: "Vishal Patil",
    role: "Senior Engineer",
    description: "Technical expertise in structural and civil engineering",
  },
];

interface StaffTableProps {
  title: string;
  data: typeof technicalStaff;
  isInView: boolean;
  delay?: number;
}

const StaffTable = ({ title, data, isInView, delay = 0 }: StaffTableProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.5, delay }}
    className="mb-12"
  >
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th className="bg-primary text-primary-foreground py-3 px-4 text-left font-medium uppercase tracking-wider text-sm">
              {title}
            </th>
            <th className="bg-[hsl(var(--construction-teal))] text-white py-3 px-4 text-center font-medium uppercase tracking-wider text-sm">
              Number of Staff
            </th>
            <th className="bg-construction-steel text-construction-dark py-3 px-4 text-left font-medium uppercase tracking-wider text-sm">
              Qualification
            </th>
            <th className="bg-[hsl(var(--construction-teal))] text-white py-3 px-4 text-left font-medium uppercase tracking-wider text-sm">
              Experience
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((staff, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              } hover:bg-gray-100 transition-colors`}
            >
              <td className="py-3 px-4 text-construction-dark border-b border-gray-200">
                {staff.position}
              </td>
              <td className="py-3 px-4 text-construction-dark text-center border-b border-gray-200 font-semibold">
                {String(staff.count).padStart(2, "0")}
              </td>
              <td className="py-3 px-4 text-construction-dark border-b border-gray-200">
                {staff.qualification}
              </td>
              <td className="py-3 px-4 text-construction-dark border-b border-gray-200">
                {staff.experience}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </motion.div>
);

const Team = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const totalStaff = technicalStaff.reduce((acc, s) => acc + s.count, 0) + 
                     administrativeStaff.reduce((acc, s) => acc + s.count, 0);

  return (
    <section id="team" className="py-24 bg-construction-dark" ref={ref}>
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
          <h2 className="font-display text-4xl md:text-6xl text-secondary-foreground mt-4">
            Manpower Resources
          </h2>
        </motion.div>

        {/* Staff Tables */}
        <div className="bg-white/5 backdrop-blur-sm p-6 md:p-8 rounded-lg mb-16">
          <StaffTable
            title="Technical Staff"
            data={technicalStaff}
            isInView={isInView}
            delay={0.2}
          />
          <StaffTable
            title="Administrative Staff"
            data={administrativeStaff}
            isInView={isInView}
            delay={0.4}
          />
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-center text-secondary-foreground font-display text-xl mt-4"
          >
            Total Staff: <span className="text-primary">{totalStaff}</span>
          </motion.p>
        </div>

        {/* Management Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mb-12"
        >
          <h3 className="font-display text-3xl text-secondary-foreground">
            Management Team
          </h3>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {managementTeam.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              className={`group relative overflow-hidden ${
                index === 0 ? "lg:col-span-2" : ""
              }`}
            >
              <div className="bg-construction-charcoal border border-construction-steel/30 p-8 h-full hover:border-primary/50 transition-all">
                <div className="flex items-start gap-6">
                  {/* Avatar */}
                  <div className="w-20 h-20 bg-construction-steel flex items-center justify-center flex-shrink-0">
                    <User className="w-10 h-10 text-construction-concrete" />
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <h3 className="font-display text-2xl text-secondary-foreground mb-1">
                      {member.name}
                    </h3>
                    <p className="text-primary font-medium mb-3">{member.role}</p>
                    <p className="text-construction-concrete text-sm leading-relaxed">
                      {member.description}
                    </p>
                  </div>
                </div>

                {/* Accent Line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
