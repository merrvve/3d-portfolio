import { motion } from "framer-motion";

export const About = () => {
  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 50,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 1,
          delay: 0.6,
        },
      }}
    >
      <div className="hidden md:block ml-20">
        <h1 className="text-6xl font-extrabold leading-snug">
          Hi, I am a
          <br />
          <span className="bg-white p-2 italic rounded-lg">Developer</span>
        </h1>
        <p className="text-lg text-gray-600 mt-4 mb-4">Based in Istanbul</p>
        <a 
        href="/contact"
        className="border border-black bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-950 mt-16 transition duration-500">
          Contact Me
        </a>
        <a
          href="/game"
          className="border border-black bg-transparent text-black px-4 py-2 rounded-lg hover:bg-slate-950 hover:text-white mt-16 mx-2 transition duration-500"
        >
          Toddler Playground
        </a>
      </div>
    </motion.section>
  );
};