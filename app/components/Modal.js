"use client";
import { useState } from "react";
import Alert from "./Alert";

export default function Modal({
  title,
  content,
  onClose,
  inventory,
  addToInventory,
}) {
  const [showPuzzle, setShowPuzzle] = useState(true);

  function SolvedPuzzleReward({ reward, addToInventory, onClose }) {
    return (
      <div className="bg-white p-6 rounded-lg text-center">
        <h3 className="text-xl mb-4">You found a key!</h3>
        {!inventory.some((item) => item.name === reward.name) ? (
          <>
            <img
              src={reward.imageSrc}
              alt={reward.name}
              className="w-32 h-auto mx-auto cursor-pointer hover:opacity-80 bg-slate-300 rounded-lg"
              onClick={() => {
                addToInventory(reward);
                onClose();
              }}
            />
            <p className="mt-4 text-sm">
              Click the key to add it to your inventory
            </p>
          </>
        ) : (
          <div className="w-32 h-32 h-auto mx-auto opacity-50 bg-slate-300 rounded-lg" />
        )}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="relative w-[75%] max-w-[900px] p-6 text-black bg-white rounded-lg max-h-[75%] min-h-72 overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute p-2 text-black bg-gray-300 rounded-lg top-4 right-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="mb-4 text-2xl font-bold">{title}</div>
        {content.text && <div className="text-xl">{content.text}</div>}
        {content.image && (
          <div className="mt-4">
            <img
              src={content.image}
              alt="Content image"
              className="max-w-full h-auto rounded-lg mx-auto"
            />
          </div>
        )}
        {content.puzzle &&
          content.puzzle.type === "4 digit code" &&
          (content.puzzle.solved ? (
            <SolvedPuzzleReward
              reward={content.puzzle.reward}
              addToInventory={addToInventory}
              onClose={onClose}
            />
          ) : (
            <FourDigitCodePuzzle
              puzzle={content.puzzle}
              onClose={onClose}
              addToInventory={addToInventory}
              solved={content.puzzle.solved}
              solvePuzzle={() => {
                content.puzzle.solved = true;
                setShowPuzzle(false); // Force re-render
              }}
            />
          ))}
      </div>
    </div>
  );
}

function FourDigitCodePuzzle({
  puzzle,
  onClose,
  addToInventory,
  solved,
  solvePuzzle,
}) {
  const [digits, setDigits] = useState([0, 0, 0, 0]);
  const [showAlert, setShowAlert] = useState(false);

  const incrementDigit = (index) => {
    const newDigits = [...digits];
    newDigits[index] = (newDigits[index] + 1) % 10;
    setDigits(newDigits);
  };

  const decrementDigit = (index) => {
    const newDigits = [...digits];
    newDigits[index] = (newDigits[index] + 9) % 10;
    setDigits(newDigits);
  };

  return (
    <div className="mt-6 flex flex-col items-center">
      <div className="flex gap-6">
        {digits.map((digit, index) => (
          <div key={index} className="flex flex-col items-center">
            <button
              className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
              onClick={() => incrementDigit(index)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </button>
            <div
              className={`flex items-center justify-center w-12 h-16 my-2 text-3xl font-bold ${
                index === 0
                  ? "bg-blue-500"
                  : index === 1
                    ? "bg-green-500"
                    : index === 2
                      ? "bg-orange-500"
                      : "bg-red-500"
              } rounded`}
            >
              {digit}
            </div>
            <button
              className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
              onClick={() => decrementDigit(index)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>

      <button
        className="px-6 py-2 mt-6 text-white bg-blue-600 rounded hover:bg-blue-700"
        onClick={() => {
          const enteredCode = digits.join("");
          if (enteredCode === puzzle.code) {
            console.log("Correct code!");
            solvePuzzle();
          } else {
            console.log("Incorrect code.");
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
          }
        }}
      >
        Submit Code
      </button>

      {showAlert && <Alert message="Incorrect code. Try again." type="error" />}
    </div>
  );
}
