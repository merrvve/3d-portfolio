import { motion } from "framer-motion";
import { AnimatedText } from "./Animations.jsx/AnimatedText";
import { useState, useEffect } from "react";
import { Cards } from "./Cards";

const Section = (props) => {
  const { children } = props;
  return (
    <motion.section
      className={`
        h-screen w-screen max-w-screen-2xl mx-auto p-12
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
    >
      {children}
    </motion.section>
  );
};

const About = () => {
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
        <p className="text-lg text-gray-600 mt-4">Based in Istanbul</p>
        <button className="border border-black bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-950 mt-16 transition duration-500">
          Contact Me
        </button>
        <a href="/game" className="border border-black bg-transparent text-black px-4 py-2 rounded-lg hover:bg-slate-950 hover:text-white mt-16 mx-2 transition duration-500">
          Toddler Playground
        </a>
      </div>
    </motion.section>
  );
};

const Contact = () => {
  return (
    <Section>
      <h1 className="text-6xl font-extrabold leading-snug">Contact Me</h1>
      <div className="grid sm:grid-cols-2 items-start gap-16 p-10 max-w-4xl">
        <form className="ml-auto space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full rounded-md py-3 px-4  border  border-black bg-gray-100 text-gray-800 text-sm outline-slate-800 transition duration-300 focus:bg-transparent"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-md py-3 px-4  border  border-black bg-gray-100 text-gray-800 text-sm outline-slate-800 transition duration-300 focus:bg-transparent"
          />
          <input
            type="text"
            placeholder="Subject"
            className="w-full rounded-md py-3 px-4  border  border-black bg-gray-100 text-gray-800 text-sm outline-slate-800 transition duration-300 focus:bg-transparent"
          />
          <textarea
            placeholder="Message"
            rows="6"
            className="w-full rounded-md px-4  border  border-black bg-gray-100 text-gray-800 text-sm pt-3 outline-slate-800 focus:bg-transparent"
          ></textarea>
          <button
            className="border border-black bg-slate-800 text-white rounded-lg hover:bg-slate-950 
                 transition duration-500 tracking-wide  text-sm px-4 py-3 w-full !mt-6"
          >
            Send
          </button>
        </form>
        <div>
          <div className="mt-12">
            <h2 className=" text-base font-bold">Email</h2>
            <ul className="mt-4">
              <li className="flex items-center">
                <div className="bg-[#e6e6e6cf] border  border-black h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20px"
                    height="20px"
                    fill="black"
                    viewBox="0 0 479.058 479.058"
                  >
                    <path
                      d="M434.146 59.882H44.912C20.146 59.882 0 80.028 0 104.794v269.47c0 24.766 20.146 44.912 44.912 44.912h389.234c24.766 0 44.912-20.146 44.912-44.912v-269.47c0-24.766-20.146-44.912-44.912-44.912zm0 29.941c2.034 0 3.969.422 5.738 1.159L239.529 264.631 39.173 90.982a14.902 14.902 0 0 1 5.738-1.159zm0 299.411H44.912c-8.26 0-14.971-6.71-14.971-14.971V122.615l199.778 173.141c2.822 2.441 6.316 3.655 9.81 3.655s6.988-1.213 9.81-3.655l199.778-173.141v251.649c-.001 8.26-6.711 14.97-14.971 14.97z"
                      data-original="#000000"
                    />
                  </svg>
                </div>
                <a href="/" className=" text-sm ml-4">
                  <small className="block">Mail</small>
                  <strong>info@example.com</strong>
                </a>
              </li>
            </ul>
          </div>

          <div className="mt-12">
            <h2 className="text-gray-800 text-base font-bold">Socials</h2>

            <ul className="flex mt-4 space-x-4">
              <li className="bg-[#e6e6e6cf] border  border-black h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                <a href="/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20px"
                    height="20px"
                    fill="black"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M6.812 13.937H9.33v9.312c0 .414.335.75.75.75l4.007.001a.75.75 0 0 0 .75-.75v-9.312h2.387a.75.75 0 0 0 .744-.657l.498-4a.75.75 0 0 0-.744-.843h-2.885c.113-2.471-.435-3.202 1.172-3.202 1.088-.13 2.804.421 2.804-.75V.909a.75.75 0 0 0-.648-.743A26.926 26.926 0 0 0 15.071 0c-7.01 0-5.567 7.772-5.74 8.437H6.812a.75.75 0 0 0-.75.75v4c0 .414.336.75.75.75zm.75-3.999h2.518a.75.75 0 0 0 .75-.75V6.037c0-2.883 1.545-4.536 4.24-4.536.878 0 1.686.043 2.242.087v2.149c-.402.205-3.976-.884-3.976 2.697v2.755c0 .414.336.75.75.75h2.786l-.312 2.5h-2.474a.75.75 0 0 0-.75.75V22.5h-2.505v-9.312a.75.75 0 0 0-.75-.75H7.562z"
                      data-original="#000000"
                    />
                  </svg>
                </a>
              </li>
              <li className="bg-[#e6e6e6cf] border  border-black h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                <a href="/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20px"
                    height="20px"
                    fill="black"
                    viewBox="0 0 511 512"
                  >
                    <path
                      d="M111.898 160.664H15.5c-8.285 0-15 6.719-15 15V497c0 8.285 6.715 15 15 15h96.398c8.286 0 15-6.715 15-15V175.664c0-8.281-6.714-15-15-15zM96.898 482H30.5V190.664h66.398zM63.703 0C28.852 0 .5 28.352.5 63.195c0 34.852 28.352 63.2 63.203 63.2 34.848 0 63.195-28.352 63.195-63.2C126.898 28.352 98.551 0 63.703 0zm0 96.395c-18.308 0-33.203-14.891-33.203-33.2C30.5 44.891 45.395 30 63.703 30c18.305 0 33.195 14.89 33.195 33.195 0 18.309-14.89 33.2-33.195 33.2zm289.207 62.148c-22.8 0-45.273 5.496-65.398 15.777-.684-7.652-7.11-13.656-14.942-13.656h-96.406c-8.281 0-15 6.719-15 15V497c0 8.285 6.719 15 15 15h96.406c8.285 0 15-6.715 15-15V320.266c0-22.735 18.5-41.23 41.235-41.23 22.734 0 41.226 18.495 41.226 41.23V497c0 8.285 6.719 15 15 15h96.403c8.285 0 15-6.715 15-15V302.066c0-79.14-64.383-143.523-143.524-143.523zM466.434 482h-66.399V320.266c0-39.278-31.953-71.23-71.226-71.23-39.282 0-71.239 31.952-71.239 71.23V482h-66.402V190.664h66.402v11.082c0 5.77 3.309 11.027 8.512 13.524a15.01 15.01 0 0 0 15.875-1.82c20.313-16.294 44.852-24.907 70.953-24.907 62.598 0 113.524 50.926 113.524 113.523zm0 0"
                      data-original="#000000"
                    />
                  </svg>
                </a>
              </li>
              <li className="bg-[#e6e6e6cf] border  border-black h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                <a href="/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20px"
                    height="20px"
                    fill="black"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 9.3a2.7 2.7 0 1 0 0 5.4 2.7 2.7 0 0 0 0-5.4Zm0-1.8a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Zm5.85-.225a1.125 1.125 0 1 1-2.25 0 1.125 1.125 0 0 1 2.25 0ZM12 4.8c-2.227 0-2.59.006-3.626.052-.706.034-1.18.128-1.618.299a2.59 2.59 0 0 0-.972.633 2.601 2.601 0 0 0-.634.972c-.17.44-.265.913-.298 1.618C4.805 9.367 4.8 9.714 4.8 12c0 2.227.006 2.59.052 3.626.034.705.128 1.18.298 1.617.153.392.333.674.632.972.303.303.585.484.972.633.445.172.918.267 1.62.3.993.047 1.34.052 3.626.052 2.227 0 2.59-.006 3.626-.052.704-.034 1.178-.128 1.617-.298.39-.152.674-.333.972-.632.304-.303.485-.585.634-.972.171-.444.266-.918.299-1.62.047-.993.052-1.34.052-3.626 0-2.227-.006-2.59-.052-3.626-.034-.704-.128-1.18-.299-1.618a2.619 2.619 0 0 0-.633-.972 2.595 2.595 0 0 0-.972-.634c-.44-.17-.914-.265-1.618-.298-.993-.047-1.34-.052-3.626-.052ZM12 3c2.445 0 2.75.009 3.71.054.958.045 1.61.195 2.185.419A4.388 4.388 0 0 1 19.49 4.51c.457.45.812.994 1.038 1.595.222.573.373 1.227.418 2.185.042.96.054 1.265.054 3.71 0 2.445-.009 2.75-.054 3.71-.045.958-.196 1.61-.419 2.185a4.395 4.395 0 0 1-1.037 1.595 4.44 4.44 0 0 1-1.595 1.038c-.573.222-1.227.373-2.185.418-.96.042-1.265.054-3.71.054-2.445 0-2.75-.009-3.71-.054-.958-.045-1.61-.196-2.185-.419A4.402 4.402 0 0 1 4.51 19.49a4.414 4.414 0 0 1-1.037-1.595c-.224-.573-.374-1.227-.419-2.185C3.012 14.75 3 14.445 3 12c0-2.445.009-2.75.054-3.71s.195-1.61.419-2.185A4.392 4.392 0 0 1 4.51 4.51c.45-.458.994-.812 1.595-1.037.574-.224 1.226-.374 2.185-.419C9.25 3.012 9.555 3 12 3Z"></path>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
};

const SpeechBubble = ({setQuestions}) => {
  const [currentText, setCurrentText] = useState([
    "Hi, Welcome to my",
    "portfolio website.",
    "I am a fullstack developer.",
    "Trying to be a creative one.",
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
        "What type of Projects have you worked on?",
        "What is your main tech stack?",
        "What type of services you provide?",
        "What are you working on now?",
        "Do you offer ongoing support after project completion?",
        "How is this website built?",
        "How can I get in touch with you?"
    ])
    }, 9000);

    return () => clearTimeout(timeout); // Clean up the timeout
  }, []);

  return (
    <>
      <AnimatedText
        key={currentText}
        el="h2"
        text={currentText} // Text updates when `currentText` changes
        className="text-base md:text-lg border border-black p-3 m-2 rounded-t-lg rounded-bl-lg bg-slate-50 md:ml-72"
        repeatDelay={100}
      />
    </>
  );
};

const Questions = ({questions}) => {
  return (
    <>
      {
        questions.map((question) => (
        <motion.button key={question} 
        initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
            transition: {
              duration: 0.5,
              delay: 0.5,
            },
          }}
        className="text-xs md:text-sm px-3 py-2 border border-black rounded-lg hover:bg-black hover:text-white transition duration-300">{question}</motion.button>
      ))
    }
    </>
  );
};

export const Interface = () => { 
    const [questions, setQuestions] = useState([]);
  return (
    <div className="flex flex-col w-screen">
      <SocialIcons />
      <div
        className="h-screen w-screen max-w-screen-2xl mx-auto p-8
        flex md:flex-row flex-col items-center"
      >
        <div className="flex flex-col items-start">
          <SpeechBubble setQuestions={setQuestions} />
          <About />
        </div>
        <div className="flex items-end justify-end">
          <div className="ml-72 flex flex-col gap-3">
            <Questions questions={questions} />
          </div>
        </div>
      </div>

      <Skills />
      <Projects />
      <Contact />
    </div>
  );
};

const Skills = () => {
  return(
    <Section>
      <h1 className="text-6xl font-extrabold leading-snug">Skills</h1>
    </Section>
  )
}

const Projects = () => {
  const tags = ["Web Applications","Animated Web Pages","Miscellaneus"]
  return(
    <Section>
      <h1 className="text-6xl font-extrabold leading-snug mb-5">Projects</h1>
      <div>
      {
        tags.map(tag=>(
          <span key={tag} className="m-1 inline cursor-pointer border border-black rounded-lg text-xs px-2 py-1 hover:bg-black hover:text-white">{tag}</span>
        ))
      }
      
      </div>
      <div className="p-10 flex flex-row gap-5 justify-center">
          <Cards />
      </div>
      
    </Section>
  )
}

const SocialIcons = ()=> {
  return(
    <div className="w-screen flex gap-3 justify-end items-end p-5 text-gray-600 relative">
      <a href="https://github.com/merrvve" target="_blank">
      <svg className="hover:text-gray-900 hover:scale-110 hover:-rotate-12 cursor-pointer transition duration-500 sticky z-50" width="25" height="25" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.49933 0.25C3.49635 0.25 0.25 3.49593 0.25 7.50024C0.25 10.703 2.32715 13.4206 5.2081 14.3797C5.57084 14.446 5.70302 14.2222 5.70302 14.0299C5.70302 13.8576 5.69679 13.4019 5.69323 12.797C3.67661 13.235 3.25112 11.825 3.25112 11.825C2.92132 10.9874 2.44599 10.7644 2.44599 10.7644C1.78773 10.3149 2.49584 10.3238 2.49584 10.3238C3.22353 10.375 3.60629 11.0711 3.60629 11.0711C4.25298 12.1788 5.30335 11.8588 5.71638 11.6732C5.78225 11.205 5.96962 10.8854 6.17658 10.7043C4.56675 10.5209 2.87415 9.89918 2.87415 7.12104C2.87415 6.32925 3.15677 5.68257 3.62053 5.17563C3.54576 4.99226 3.29697 4.25521 3.69174 3.25691C3.69174 3.25691 4.30015 3.06196 5.68522 3.99973C6.26337 3.83906 6.8838 3.75895 7.50022 3.75583C8.1162 3.75895 8.73619 3.83906 9.31523 3.99973C10.6994 3.06196 11.3069 3.25691 11.3069 3.25691C11.7026 4.25521 11.4538 4.99226 11.3795 5.17563C11.8441 5.68257 12.1245 6.32925 12.1245 7.12104C12.1245 9.9063 10.4292 10.5192 8.81452 10.6985C9.07444 10.9224 9.30633 11.3648 9.30633 12.0413C9.30633 13.0102 9.29742 13.7922 9.29742 14.0299C9.29742 14.2239 9.42828 14.4496 9.79591 14.3788C12.6746 13.4179 14.75 10.7025 14.75 7.50024C14.75 3.49593 11.5036 0.25 7.49933 0.25Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
      </a>
      <a href="https://www.linkedin.com/in/merve-keskin-776550157/" target="_blank">
      <svg className="hover:text-gray-900 hover:scale-110 hover:-rotate-12 cursor-pointer transition duration-500 sticky z-50" width="25" height="25" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 1C1.44772 1 1 1.44772 1 2V13C1 13.5523 1.44772 14 2 14H13C13.5523 14 14 13.5523 14 13V2C14 1.44772 13.5523 1 13 1H2ZM3.05 6H4.95V12H3.05V6ZM5.075 4.005C5.075 4.59871 4.59371 5.08 4 5.08C3.4063 5.08 2.925 4.59871 2.925 4.005C2.925 3.41129 3.4063 2.93 4 2.93C4.59371 2.93 5.075 3.41129 5.075 4.005ZM12 8.35713C12 6.55208 10.8334 5.85033 9.67449 5.85033C9.29502 5.83163 8.91721 5.91119 8.57874 6.08107C8.32172 6.21007 8.05265 6.50523 7.84516 7.01853H7.79179V6.00044H6V12.0047H7.90616V8.8112C7.8786 8.48413 7.98327 8.06142 8.19741 7.80987C8.41156 7.55832 8.71789 7.49825 8.95015 7.46774H9.02258C9.62874 7.46774 10.0786 7.84301 10.0786 8.78868V12.0047H11.9847L12 8.35713Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
      
      </a>
      </div>
  )
}