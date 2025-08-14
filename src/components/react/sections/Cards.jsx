import { useState } from "react";
import { motion } from "framer-motion";

export const Cards = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  
  const projects = [
    {
      title: "CRIV.eu Astro.js Website",
      description: "Developed frontend for CRIV.eu website using Astro.js, TypeScript and React.js",
      skills: ["astro.js", "TypeScript", "React.js", "Netlify"],
      category: "Website",
      url: "https://criv.eu",
      img: "/projects/criv.gif"
    },
    {
      title: "Saba Portfolio",
      description: "Industrial designer portfolio website using Astro, React and Framer Motion (Ongoing)",
      skills: ["astro.js", "React.js", "Framer Motion"],
      category: "Website", 
      url: "https://saba-design.netlify.app/",
      img: "/projects/saba.gif"
    },
    {
      title: "Tender/Bid Management Software",
      description: "Specialized domain tender management software with Angular 17 and Firebase",
      skills: ["Angular", "PrimeNG", "Firebase", "TypeScript"],
      category: "Web Application",
      url: "https://github.com/merrvve/ihaleapp-angular17",
      img: "/projects/ihaleapp.gif"
    },
    {
      title: "OFRO - Financial Feasibility Tool",
      description: "Automated financial feasibility reports from Excel to web application",
      skills: ["Angular", "Flask", "MongoDB", "Firebase"],
      category: "Web Application",
      url: "https://uygulanabilirlik.com",
      img: "/projects/ofro.gif"
    },
    {
      title: "PDF Image Extractor",
      description: "CLI tool to extract images from PDF files based on byte signatures",
      skills: ["Python", "Linux", "CLI"],
      category: "Automation",
      url: "https://github.com/merrvve/pdf-image-extract",
      img: "pdf-extractor.png"
    },
    {
      title: "Background Remover",
      description: "Desktop app for removing image backgrounds using U2Net models",
      skills: ["Python", "OpenCV", "Tkinter", "Pillow"],
      category: "Desktop App",
      url: "https://github.com/merrvve/background-remover",
      img: "bg-remover.png"
    },
    {
      title: "Knowledge Graph Builder",
      description: "Created graph database and vector indices from unstructured data",
      skills: ["Neo4j", "Python", "OpenAI API", "Knowledge Graphs"],
      category: "Data Science",
      url: "https://github.com/merrvve/llm-vectors-unstructured-neo4j",
      img: "knowledge-graph.png"
    },
    {
      title: "3D Avatar Builder",
      description: "3D character customization tool with React Three Fiber",
      skills: ["React", "r3f", "Three.js", "Tailwind CSS"],
      category: "Web Application",
      url: "https://github.com/merrvve/r3f-character",
      img: "avatar-builder.png"
    },
    {
      title: "Astro On Scroll Reveal",
      description: "npm package for scroll animations in Astro projects",
      skills: ["astro.js", "TypeScript", "npm", "JavaScript"],
      category: "Package",
      url: "https://github.com/merrvve/astro-on-scroll-reveal",
      img: "scroll-reveal.png"
    }
  ];

  const categories = ["All", ...new Set(projects.map(p => p.category))];
  const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="w-full p-2">
      <motion.div 
        className="flex flex-wrap gap-3 mb-8"
        initial="hidden"
        animate="show"
        variants={container}
      >
        {categories.map(category => (
          <motion.button
            key={category}
            variants={item}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveFilter(category)}
            className={`px-2 md:px-4 py-2 rounded-full md:text-sm text-xs border border-black ${
              activeFilter === category 
                ? 'bg-black text-white' 
                : 'bg-white hover:bg-gray-100'
            }`}
          >
            {category}
          </motion.button>
        ))}
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 p-2"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {filteredProjects.map((project, index) => (
          <motion.a 
            key={index}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            variants={item}
            whileHover={{ y: -5 }}
            className="group"
          >
            <motion.div 
              className="h-full border-2 border-black rounded-xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all bg-white"
              whileHover={{ scale: 1.02 }}
            >
              <div className="h-48 bg-gray-200 overflow-hidden">
                {project.img ? (
                  <motion.img 
                    src={project.img}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-600 text-slate text-lg md:text-2xl font-bold">
                    {project.title.charAt(0)}
                  </div>
                )}
              </div>
              
              <div className="p-5">
                <h3 className="text-lg md:text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4 text-sm">{project.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {project.skills.map((skill, i) => (
                    <motion.span
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      className="px-2 py-1 bg-gray-100 rounded-full text-xs border border-black"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
                
                <motion.div 
                  className="mt-4 flex items-center text-sm font-medium text-slate-800"
                  whileHover={{ x: 5 }}
                >
                  View Project
                  <svg 
                    width="16" 
                    height="16" 
                    viewBox="0 0 15 15" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-1"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 13C12.5523 13 13 12.5523 13 12V3C13 2.44771 12.5523 2 12 2H3C2.44771 2 2 2.44771 2 3V6.5C2 6.77614 2.22386 7 2.5 7C2.77614 7 3 6.77614 3 6.5V3H12V12H8.5C8.22386 12 8 12.2239 8 12.5C8 12.7761 8.22386 13 8.5 13H12ZM9 6.5C9 6.5001 9 6.50021 9 6.50031V6.50035V9.5C9 9.77614 8.77614 10 8.5 10C8.22386 10 8 9.77614 8 9.5V7.70711L2.85355 12.8536C2.65829 13.0488 2.34171 13.0488 2.14645 12.8536C1.95118 12.6583 1.95118 12.3417 2.14645 12.1464L7.29289 7H5.5C5.22386 7 5 6.77614 5 6.5C5 6.22386 5.22386 6 5.5 6H8.5C8.56779 6 8.63244 6.01349 8.69139 6.03794C8.74949 6.06198 8.80398 6.09744 8.85143 6.14433C8.94251 6.23434 8.9992 6.35909 8.99999 6.49708L8.99999 6.49738"
                      fill="currentColor"
                    />
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
};