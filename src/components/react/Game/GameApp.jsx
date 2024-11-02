export function GameApp() {
    return (
        <>
        <div className="flex h-screen justify-center items-center">
            <div className="grid grid-cols-3 gap-5">
                <div className="w-[150px] h-[150px] border border-gray-500 rounded-lg">
                    <img src="/assets/elephant.webp" className="w-full h-full filter grayscale blur-sm contrast-150 hover:filter-none transition duration-500"/>
                </div>
                <div className="w-[150px] h-[150px] border border-gray-500 rounded-lg">
                    <img src="/assets/monkey.webp" className="w-full h-full filter grayscale blur-sm contrast-150 hover:filter-none transition duration-500"/>
                </div>
                <div className="w-[150px] h-[150px] border border-gray-500 rounded-lg">
                    <img src="/assets/lion.webp" className="w-full h-full filter grayscale blur-sm contrast-150 hover:filter-none transition duration-500"/>
                </div>
                
            </div>
        </div>
        </>
    )
}