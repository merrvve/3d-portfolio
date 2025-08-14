import { Canvas } from "@react-three/fiber";
import { Experience } from "./Experience";
import { ScrollControls, Scroll } from "@react-three/drei";
import { Interface } from "./Interface";
import { useState, useEffect, useRef } from "react";
import { ScrollManager } from "./ScrollManager";
import { MotionConfig } from "framer-motion";
import "../../styles/spinner.css";
import { LoadingScreen } from "./LoadingScreen";

export function App() {
  const [section, setSection] = useState(0);
  const [pages, setPages] = useState(5);
  const htmlRef = useRef();

  useEffect(() => {
    const updatePages = () => {
      if (htmlRef.current) {
        const viewportHeight = window.innerHeight;
        const contentHeight = htmlRef.current.scrollHeight;
        const calculatedPages = contentHeight / viewportHeight;
        setPages(calculatedPages);
      }
    };

    updatePages();
    window.addEventListener("resize", updatePages);
    return () => window.removeEventListener("resize", updatePages);
  }, []);

  return (
    <>
      <LoadingScreen />
      <MotionConfig
        transition={{
          type: "spring",
          mass: 5,
          stiffness: 50,
          damping: 50,
          restDelta: 0.01,
        }}
      >
        <Canvas
          shadows
          camera={{ position: [0, 3, 10], fov: window.innerWidth < 768 ? 50 : 42 }}
        >
          <color attach="background" args={["#ececaa"]} />
          <ScrollControls pages={pages} damping={window.innerWidth < 768 ? 0.3 : 0.1}>
            <ScrollManager section={section} onSectionChange={setSection} />
            <Experience />
            <Scroll html>
              <div ref={htmlRef}>
                <Interface />
              </div>
            </Scroll>
          </ScrollControls>
        </Canvas>
      </MotionConfig>
    </>
  );
}
