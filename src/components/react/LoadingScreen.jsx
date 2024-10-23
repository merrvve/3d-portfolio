import { useProgress } from '@react-three/drei';
import { motion, useSpring } from 'framer-motion';
import { useState, useEffect } from 'react';

export const LoadingScreen = () => {
  const { progress } = useProgress();
  const [prog, setProg] = useState(0);

  useEffect(() => {
    setProg(progress);
  }, [progress]);

 
  return (
    <>
    
      {/* Loading Screen */}
      {prog !== 100 && (
        <div className="relative h-screen w-screen">
        <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-2 bg-blue-500 origin-left"
      />
        <div className="flex justify-center items-center p-10 h-screen w-screen">
          <div className="spinner m-2 block"></div>
          <p className="block m-2">Loading 3D Model... {Math.round(prog)}%</p>
        </div>
        </div>
      )}
    </>
  );
};
