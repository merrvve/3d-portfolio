import { Environment} from "@react-three/drei";
import { motion } from "framer-motion-3d";

import { Avatar } from "./Avatar";

export const Experience = () => {
  
  
  return (
    <>
    <motion.group position={[0, -1, 5]} scale={3}
          rotation-y={-Math.PI / 8}
          animate={{
            y: -1,
            scale: 2
          }}
        >
          <Avatar  />
          <Environment preset="sunset" />
        </motion.group>
       
      
      
    </>
  );
};
