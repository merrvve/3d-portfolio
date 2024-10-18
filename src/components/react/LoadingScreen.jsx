import { useProgress } from "@react-three/drei";


export const LoadingScreen = () => {
    const { progress, total, loaded, item } = useProgress();
    let prog = 0;
    useEffect(()=>{
      prog = progress;
    },[progress])
    return (
        
          prog==100 ? ( <div className="flex justify-center items-center p-10 h-screen w-screen">
          <div className="spinner m-2 block"></div>
          <p className="block m-2">Loading...</p>
        </div>
         ) : (<></>)
        
        

        
    )
}