import { motion } from "framer-motion";
import { AnimatedText } from "./Animations.jsx/AnimatedText";
import { useState, useEffect } from "react";

import Contact from "./sections/Contact";
import {Projects} from "./sections/Projects"
import {SocialIcons} from "./sections/SocialIcons"
import {Skills} from "./sections/Skills"
import { About } from "./sections/About";




const SpeechBubble = ({ setQuestions }) => {
  const [currentText, setCurrentText] = useState([
    "Hi, Welcome to my",
    "portfolio website.",
    "I am a fullstack developer,",
    "trying to be a creative one.",
  ]);

  // Use a timeout to change the text after 2 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrentText([
        "You can ask me questions",
        "from this list.",
        "Or you can scroll down",
        "to see more information about me.",
      ]);
      setQuestions([
        "What are you working on now?",
        "How is this website built?",
        "How can I get in touch with you?",
      ]);
    }, 9000);

    return () => clearTimeout(timeout); // Clean up the timeout
  }, []);

  return (
    <>
      <AnimatedText
        key={currentText}
        el="h2"
        text={currentText} // Text updates when `currentText` changes
        className="text-xs md:text-lg border border-black p-3 m-2 rounded-t-lg rounded-bl-lg bg-slate-50 md:ml-72"
        repeatDelay={100}
      />
    </>
  );
};

const Questions = ({ questions }) => {
  // Example: mapping questions to corresponding hrefs
  const questionLinks = {
    "What are you working on now?": "/now",
    "How is this website built?": "/how",
    "How can I get in touch with you?": "/contact",
  };

  return (
    <>
      {questions.map((question) => (
        <motion.a
          key={question}
          href={questionLinks[question] || "/"} // Default if no match
          initial={{ opacity: 0 }}
          whileInView={{
            opacity: 1,
            transition: {
              duration: 0.5,
              delay: 0.5,
            },
          }}
          className="text-xs md:text-base px-3 py-2 border border-black rounded-lg hover:bg-black hover:text-white transition duration-300 inline-block"
        >
          {question}
        </motion.a>
      ))}
    </>
  );
};


export const Interface = () => {
  const [questions, setQuestions] = useState([]);
  return (
    <div className="flex flex-col w-screen">
      <div className="flex  gap-5 justify-end items-end p-5 text-gray-600 relative">
         <a href="/now" class="hover:font-bold  hover:scale-110 hover:-rotate-6 cursor-pointer transition duration-500 ">Now</a>
         |
         <a href="/how" class="hover:font-bold  hover:scale-110 hover:-rotate-6 cursor-pointer transition duration-500 ">How</a>
        <SocialIcons />
       
      </div>

      <div
        className="min-h-screen w-screen max-w-screen-2xl mx-auto p-8
        flex md:flex-row flex-col items-center"
      >
        <div className="flex flex-col items-start">
          <SpeechBubble setQuestions={setQuestions} />
          <About />
        </div>
        <div className="flex items-end justify-end">
          <div className="mt-16 md:mt-0 ml-52 md:ml-72 flex flex-col gap-3">
            <Questions questions={questions} />
          </div>
        </div>
        <div className="md:hidden flex items-start mt-16">
          <a 
        href="/contact"
        className="border text-sm border-black bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-950 mt-10 transition duration-500">
          Contact Me
        </a>
        <a
          href="/game"
          className="border text-sm border-black bg-slate-50 text-black px-4 py-2 rounded-lg hover:bg-slate-950 hover:text-white mt-10 mx-2 transition duration-500"
        >
          Toddler Playground
        </a>
        </div>
      </div>

      <Skills />  
      <Projects />
      <Contact />
    </div>
  );
};





