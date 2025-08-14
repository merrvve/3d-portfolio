import { motion } from "framer-motion";
import {Section} from "./Section";

export const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend",
      icon: "💻",
      skills: [
        { name: "Angular (16-18)", level: 90 },
        { name: "Astro.js", level: 90 },
        { name: "React.js", level: 80 },
        { name: "Three.js/R3F", level: 80 },
        { name: "Tailwind/SCSS", level: 95 },
        { name: "Framer Motion", level: 85 },        
      ],
    },
    {
      title: "Backend",
      icon: "⚙️",
      skills: [
        { name: "Python (Flask/Django)", level: 90 },
        { name: "REST APIs", level: 85 },
        { name: "MongoDB/Firebase", level: 85 },
        { name: "SQL/Neo4j", level: 75 },
        { name: "Docker/Nginx", level: 70 },
      ],
    },
    {
      title: "AI/Data",
      icon: "🧠",
      skills: [
        { name: "Python Data Stack", level: 85 },
        { name: "Scikit-learn/Keras", level: 60 },
        { name: "OpenCV/Pillow", level: 75 },
        { name: "Knowledge Graphs", level: 60 },
        { name: "ML Algorithms", level: 65 },
      ],
    },
    {
      title: "Tools",
      icon: "🛠️",
      skills: [
        { name: "Git/GitHub", level: 95 },
        { name: "CLI/Linux", level: 95 },
        { name: "Web Scraping", level: 60 },
        { name: "GCP/Netlify", level: 75 },
      ],
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const categoryItem = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const skillItem = {
    hidden: { opacity: 0, x: -20 },
    show: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.05 + 0.4 },
    }),
  };

  return (
    <Section className=" p-2">
      <h1 className="text-2xl md:text-6xl font-extrabold leading-snug mb-4">Skills</h1>
      <p className=" md:text-lg text-gray-600 mb-12 max-w-2xl">
        Full-stack development with focus on interactive web applications, API
        integrations, and data-driven solutions
      </p>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-10 w-full"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        {skillCategories.map((category) => (
          <motion.div
            key={category.title}
            variants={categoryItem}
            whileHover={{ y: -5 }}
            className="bg-white border-2 border-black rounded-xl p-3 md:p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="md:text-2xl">{category.icon}</span>
              <h3 className="md:text-xl font-bold">{category.title}</h3>
            </div>
            <ul className="space-y-3">
              {category.skills.map((skill, i) => (
                <motion.li
                  key={skill.name}
                  custom={i}
                  variants={skillItem}
                  className="flex items-center gap-2"
                >
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className="bg-slate-800 h-2 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 0.8, delay: 0.2 + i * 0.05 }}
                      viewport={{ once: true }}
                    />
                  </div>
                  <span className="text-sm font-medium min-w-[8rem]">
                    {skill.name}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="mt-16 p-6 mb-10 bg-slate-100 border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        viewport={{ once: true }}
      >
        <h4 className="font-bold text-sm md:text-lg mb-3">Also experienced with:</h4>
        <div className="flex flex-wrap gap-2">
          {[
            "Blender",
            "Angular Material",
            "PrimeNG",
            "OpenCV",
            "Pandas",
            "Tkinter",
            "Firebase Auth",
            "PDF parsing",
            "Web scraping",
            "npm packages",

          ].map((skill) => (
            <motion.span
              key={skill}
              whileHover={{
                scale: 1.05,
                backgroundColor: "#1e293b",
                color: "white",
              }}
              className="px-3 py-1 bg-white border border-black rounded-full text-xs md:text-sm cursor-default"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </Section>
  );
};