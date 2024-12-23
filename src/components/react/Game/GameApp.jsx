import { useState, useEffect } from "react";
import ConfettiExplosion from "react-confetti-explosion";
import useSound from 'use-sound';

export function GameApp() {
  
  const initialAnimals = ["elephant", "monkey", "lion", "cat", "dog", "cockerel", "bear", "duck", "sheep", "mouse"];
  const [animals, setAnimals] = useState(initialAnimals);
  const [gameState, setGameState] = useState("waiting");
  const [animalToFind, setAnimalToFind] = useState(
    animals[Math.floor(Math.random() * animals.length)]
  );

  // Preload sounds for animals
  const [playDog] = useSound('/audios/dog.wav');
  const [playCat] = useSound('/audios/cat.wav');

  const animalSounds = {
    dog: playDog,
    cat: playCat,
    // add more sounds for animals here if available
  };

  function handleGuess(animal) {
    if (animal === animalToFind) {
      setGameState("success");

      // Play corresponding animal sound if available
      if (animalSounds[animal]) animalSounds[animal]();

      const guessedIndex = animals.indexOf(animalToFind);
      if (guessedIndex !== -1) {
        const newAnimals = animals.toSpliced(guessedIndex, 1);
        setAnimals(newAnimals);
      }

      // Delay for success animation and choose new animal or complete game
      setTimeout(() => {
        if (animals.length > 1) {
          setGameState("waiting");
        } else {
          setGameState("completed");
        }
      }, 1500);
    } else {
      setGameState("fail");
      setTimeout(() => {
        setGameState("waiting");
      }, 1000);
    }
  }

  useEffect(() => {
    if (animals.length > 0 && gameState === "waiting") {
      setAnimalToFind(animals[Math.floor(Math.random() * animals.length)]);
    }
  }, [animals, gameState]);

  function resetGame() {
    setAnimals(initialAnimals);
    setGameState("waiting");
    setAnimalToFind(initialAnimals[Math.floor(Math.random() * initialAnimals.length)]);
  }

  return (
    <>
      <div className="flex flex-col min-h-screen gap-10 justify-center items-center bg-gradient-to-b from-sky-200 to-sky-700 text-white pb-5">
        <div className="flex flex-col gap-3 justify-center items-center h-[10%] my-10">
          {gameState === "waiting" && (
            <>
              <h1 className="text-3xl text-slate-900">Can you find the {animalToFind}?</h1>
              <div
                key={animalToFind}
                className="w-[100px] h-[100px] border border-gray-500 rounded-lg mb-10"
              >
                <img
                  src={`/assets/${animalToFind}.webp`}
                  alt={`Image of a ${animalToFind}`}
                  className="w-full h-full"
                />
              </div>
            </>
          )}
          {gameState === "success" && <ConfettiExplosion />}
          {gameState === "success" && (
            <div className="flex flex-col justify-center items-center gap-2 z-10 text-5xl text-green-900 font-extrabold">
                <h2>Good Job!</h2>
              <svg
                width="50"
                height="50"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.49991 0.877045C3.84222 0.877045 0.877075 3.84219 0.877075 7.49988C0.877075 11.1575 3.84222 14.1227 7.49991 14.1227C11.1576 14.1227 14.1227 11.1575 14.1227 7.49988C14.1227 3.84219 11.1576 0.877045 7.49991 0.877045ZM1.82708 7.49988C1.82708 4.36686 4.36689 1.82704 7.49991 1.82704C10.6329 1.82704 13.1727 4.36686 13.1727 7.49988C13.1727 10.6329 10.6329 13.1727 7.49991 13.1727C4.36689 13.1727 1.82708 10.6329 1.82708 7.49988ZM10.1589 5.53774C10.3178 5.31191 10.2636 5.00001 10.0378 4.84109C9.81194 4.68217 9.50004 4.73642 9.34112 4.96225L6.51977 8.97154L5.35681 7.78706C5.16334 7.59002 4.84677 7.58711 4.64973 7.78058C4.45268 7.97404 4.44978 8.29061 4.64325 8.48765L6.22658 10.1003C6.33054 10.2062 6.47617 10.2604 6.62407 10.2483C6.77197 10.2363 6.90686 10.1591 6.99226 10.0377L10.1589 5.53774Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          )}
          {gameState === "fail" && (
            <div className="flex flex-col justify-center items-center gap-2 z-10 text-5xl text-red-900 font-extrabold">
                <h2>No!</h2>
              <svg
                width="50"
                height="50"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.877075 7.49988C0.877075 3.84219 3.84222 0.877045 7.49991 0.877045C11.1576 0.877045 14.1227 3.84219 14.1227 7.49988C14.1227 11.1575 11.1576 14.1227 7.49991 14.1227C3.84222 14.1227 0.877075 11.1575 0.877075 7.49988ZM7.49991 1.82704C4.36689 1.82704 1.82708 4.36686 1.82708 7.49988C1.82708 10.6329 4.36689 13.1727 7.49991 13.1727C10.6329 13.1727 13.1727 10.6329 13.1727 7.49988C13.1727 4.36686 10.6329 1.82704 7.49991 1.82704ZM9.85358 5.14644C10.0488 5.3417 10.0488 5.65829 9.85358 5.85355L8.20713 7.49999L9.85358 9.14644C10.0488 9.3417 10.0488 9.65829 9.85358 9.85355C9.65832 10.0488 9.34173 10.0488 9.14647 9.85355L7.50002 8.2071L5.85358 9.85355C5.65832 10.0488 5.34173 10.0488 5.14647 9.85355C4.95121 9.65829 4.95121 9.3417 5.14647 9.14644L6.79292 7.49999L5.14647 5.85355C4.95121 5.65829 4.95121 5.3417 5.14647 5.14644C5.34173 4.95118 5.65832 4.95118 5.85358 5.14644L7.50002 6.79289L9.14647 5.14644C9.34173 4.95118 9.65832 4.95118 9.85358 5.14644Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          )}
          {gameState === "completed" && (
            <div className="text-3xl font-bold text-center text-slate-900">
              You found all the animals! 🎉
              <button
                onClick={resetGame}
                className="bg-blue-600 px-4 py-2 rounded-lg text-white mt-5 hover:bg-blue-500"
              >
                Play Again
              </button>
            </div>
          )}
        </div>
        <div className="flex gap-4 flex-wrap w-[95%] justify-center h-[10%]">
          {animals.map((animal) => (
            <button
              key={animal}
              onClick={() => handleGuess(animal)}
              className="w-[125px] h-[125px] sm:w-[150px] sm:h-[150px] rounded-lg border border-slate-300 shadow-md flex justify-center items-center bg-white"
            >
              <img
                src={`/assets/${animal}.webp`}
                alt={`Image of a ${animal}`}
                onError={(e) => (e.target.src = "/assets/placeholder.webp")}
                className="w-full h-full filter grayscale blur-sm contrast-150 hover:filter-none active:filter-none transition duration-500"
              />
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
