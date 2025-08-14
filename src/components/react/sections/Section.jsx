import { motion } from "framer-motion";

export const Section = (props) => {
  const { children } = props;
  return (
    <motion.section
      className={`
        w-full max-w-screen-2xl mx-auto p-2 md:p-12
        flex flex-col items-start
      `}
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
      viewport={{ margin: "-100px" }} 
    >
      {children}
    </motion.section>
  );
};