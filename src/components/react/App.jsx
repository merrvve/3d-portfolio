import { Canvas } from "@react-three/fiber";
import { Experience } from "./Experience";
import { ScrollControls, Scroll } from "@react-three/drei";
import { Interface } from "./Interface";
import { useState, useEffect } from "react";
import { ScrollManager } from "./ScrollManager";
import { MotionConfig } from "framer-motion";
import "../../styles/spinner.css"
export function App() {
  const [section, setSection] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center p-10 h-screen">
          <div className="spinner m-2 block"></div>
          <p className="block m-2">Loading...</p>
        </div>
      ) : (
        <MotionConfig
          transition={{
            type: "spring",
            mass: 5,
            stiffness: 50,
            damping: 50,
            restDelta: 0.01,
          }}
        >
          <Canvas shadows camera={{ position: [0, 3, 10], fov: 42 }}>
            <color attach="background" args={["#ececaa"]} />
            <ScrollControls pages={4} damping={0.1}>
              <ScrollManager section={section} onSectionChange={setSection} />
              <Scroll>
                <Experience />
              </Scroll>

              <Scroll html>
                <Interface />
              </Scroll>
            </ScrollControls>
          </Canvas>
        </MotionConfig>
      )}
    </>
  );
}
