"use client";
import { useState } from "react";
import Alert from "./Alert";

export default function Modal({
  title,
  content,
  onClose,
  inventory,
  addToInventory,
  handleNextRoom,
}) {
  const [showPuzzle, setShowPuzzle] = useState(true);

  // Helper function to consume keys from inventory
  const consumeKeys = (puzzle) => {
    if (puzzle.consume_key) {
      if (puzzle.type === "terminal_security" && puzzle.requiredItems) {
        puzzle.requiredItems.forEach((item) => {
          const itemIndex = inventory.findIndex(
            (invItem) => invItem.name === item
          );
          if (itemIndex !== -1) {
            inventory.splice(itemIndex, 1);
          }
        });
      } else if (puzzle.key) {
        const keyIndex = inventory.findIndex(
          (item) => item.name === puzzle.key
        );
        if (keyIndex !== -1) {
          inventory.splice(keyIndex, 1);
        }
      }
    }
  };

  function SolvedPuzzleReward({ reward, addToInventory }) {
    if (!reward) {
      return <></>;
    }

    const rewards = Array.isArray(reward) ? reward : [reward];

    return (
      <div className="bg-white p-6 rounded-lg text-center">
        <h3 className="text-xl mb-4">You found something!</h3>

        <div className="flex flex-wrap justify-center gap-4">
          {rewards.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              {!item.claimed ? (
                <>
                  <img
                    src={item.imageSrc}
                    alt={item.name}
                    className="w-24 h-24 object-contain cursor-pointer hover:opacity-80 bg-slate-300 rounded-lg"
                    onClick={() => {
                      item.claimed = true;
                      addToInventory(item);
                    }}
                  />
                  <p className="mt-2 text-sm">{item.name}</p>
                </>
              ) : (
                <>
                  <div className="w-24 h-24 opacity-50 bg-slate-300 rounded-lg" />
                  <p className="mt-2 text-sm text-gray-500">
                    {item.name} (collected)
                  </p>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="relative w-[75%] max-w-[900px] p-6 text-black bg-white rounded-lg max-h-[750px] min-h-72 overflow-y-auto">
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
        {/* Text */}
        {content.text && <div className="text-xl">{content.text}</div>}
        {/* Image */}
        {content.image && (
          <div className="mt-4">
            <img
              src={content.image}
              alt="Content image"
              className="max-w-[700px] max-h-[650px] w-auto h-auto rounded-lg mx-auto object-contain"
            />
          </div>
        )}

        {/* Terminal Security Puzzle */}
        {content.puzzle &&
          content.puzzle.type === "terminal_security" &&
          (content.puzzle.solved ? (
            <div className="mt-6 text-center">
              <div className="p-4 bg-green-100 text-green-800 rounded-lg">
                {content.puzzle.messages.success}
              </div>
            </div>
          ) : (
            <TerminalPuzzle
              puzzle={content.puzzle}
              inventory={inventory}
              solvePuzzle={() => {
                consumeKeys(content.puzzle);
                content.puzzle.solved = true;
                setShowPuzzle(false); // Force re-render
              }}
              onClose={onClose}
              handleNextRoom={handleNextRoom}
            />
          ))}

        {/* 4 digit code Puzzle */}
        {content.puzzle &&
          content.puzzle.type === "4 digit code" &&
          (content.puzzle.solved ? (
            <SolvedPuzzleReward
              reward={content.puzzle.reward}
              addToInventory={addToInventory}
            />
          ) : (
            <FourDigitCodePuzzle
              puzzle={content.puzzle}
              solvePuzzle={() => {
                consumeKeys(content.puzzle);
                content.puzzle.solved = true;
                setShowPuzzle(false); // Force re-render
              }}
            />
          ))}

        {/* Locked box Puzzle */}
        {content.puzzle &&
          content.puzzle.type === "locked_box" &&
          (content.puzzle.solved ? (
            <SolvedPuzzleReward
              reward={content.puzzle.reward}
              addToInventory={addToInventory}
            />
          ) : (
            <LockedBoxPuzzle
              puzzle={content.puzzle}
              hasKey={
                content.puzzle.key === null ||
                inventory.some((item) => item.name === content.puzzle.key)
              }
              solvePuzzle={() => {
                consumeKeys(content.puzzle);
                content.puzzle.solved = true;
                setShowPuzzle(false); // Force re-render
              }}
              inventory={inventory}
            />
          ))}
      </div>
    </div>
  );
}

function TerminalPuzzle({
  puzzle,
  inventory,
  solvePuzzle,
  onClose,
  handleNextRoom,
}) {
  const hasBionicEye = inventory.some((item) => item.name === "Bionic Eye");
  const hasKeyCard = inventory.some((item) => item.name === "Key Card");
  const [eyeAccepted, setEyeAccepted] = useState(false);
  const [cardAccepted, setCardAccepted] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  let messageToShow = "";
  if (hasBionicEye && hasKeyCard) {
    messageToShow = puzzle.messages.success;
  } else if (hasBionicEye && !hasKeyCard) {
    messageToShow = puzzle.messages.bionicEyeNoKeyCard;
  } else if (!hasBionicEye && hasKeyCard) {
    messageToShow = puzzle.messages.noBionicEyeKeyCard;
  } else {
    messageToShow = puzzle.messages.noBionicEyeNoKeyCard;
  }

  const handleScannerClick = (scannerType) => {
    if (scannerType === "optical") {
      if (hasBionicEye) {
        setAlertMessage("The eye scanner glows green with approval.");
        setEyeAccepted(true);
        // Remove the bionic eye from inventory when used
        const bionicEyeIndex = inventory.findIndex(
          (item) => item.name === "Bionic Eye"
        );
        if (bionicEyeIndex !== -1) {
          inventory.splice(bionicEyeIndex, 1);
        }
      } else {
        setAlertMessage("The optical scanner needs a compatible bionic eye.");
      }
    } else if (scannerType === "card") {
      if (hasKeyCard) {
        setAlertMessage("The card scanner accepts your key card.");
        setCardAccepted(true);
        // Remove the card scanner from inventory when used
        const keyCardIndex = inventory.findIndex(
          (item) => item.name === "Key Card"
        );
        if (keyCardIndex !== -1) {
          inventory.splice(keyCardIndex, 1);
        }
      } else {
        setAlertMessage("The card scanner is waiting for a key card.");
      }
    }

    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleTerminalAccess = () => {
    solvePuzzle();

    setTimeout(() => {
      onClose();
      handleNextRoom();
    }, 500);
  };

  return (
    <div className="mt-6 flex flex-col items-center">
      <div className="p-4 bg-gray-100 text-gray-800 rounded-lg max-w-2xl text-center">
        {messageToShow}
      </div>

      {/* Optical Scanner Button */}
      <button
        onClick={() => handleScannerClick("optical")}
        style={{
          position: "absolute",
          top: puzzle.messages.opticalScannerPosition.top,
          left: puzzle.messages.opticalScannerPosition.left,
          width: puzzle.messages.opticalScannerPosition.width,
          height: puzzle.messages.opticalScannerPosition.height,
          background: "transparent",
          border: "none",
          cursor: "pointer",
        }}
        aria-label="Optical Scanner"
      />

      {/* Card Scanner Button */}
      <button
        onClick={() => handleScannerClick("card")}
        style={{
          position: "absolute",
          top: puzzle.messages.cardScannerPosition.top,
          left: puzzle.messages.cardScannerPosition.left,
          width: puzzle.messages.cardScannerPosition.width,
          height: puzzle.messages.cardScannerPosition.height,
          background: "transparent",
          border: "none",
          cursor: "pointer",
        }}
        aria-label="Card Scanner"
      />

      {eyeAccepted && cardAccepted && (
        <button
          className="px-6 py-2 mt-6 text-white bg-green-600 rounded hover:bg-green-700"
          onClick={handleTerminalAccess}
        >
          Access Terminal
        </button>
      )}

      {showAlert && <Alert message={alertMessage} type="info" />}
    </div>
  );
}

function LockedBoxPuzzle({ puzzle, hasKey, solvePuzzle, inventory }) {
  const [showAlert, setShowAlert] = useState(false);

  const handlePuzzleSolve = () => {
    if (hasKey) {
      solvePuzzle();
    } else {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  return (
    <div className="mt-6 flex flex-col items-center">
      <button
        key={puzzle.id}
        onClick={handlePuzzleSolve}
        style={{
          position: "absolute",
          top: puzzle.position.top,
          left: puzzle.position.left,
          width: puzzle.position.width,
          height: puzzle.position.height,
          background: "transparent",
          border: "none",
          cursor: "pointer",
        }}
      />

      {showAlert && <Alert message={puzzle.hint} type="info" />}
    </div>
  );
}

function FourDigitCodePuzzle({ puzzle, solvePuzzle }) {
  const [digits, setDigits] = useState([0, 0, 0, 0]);
  const [showAlert, setShowAlert] = useState(false);

  if (!puzzle.colors) {
    puzzle.colors = ["", "", "", ""];
  }

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

  const getColorClass = (color) => {
    switch (color) {
      case "blue":
        return "bg-blue-500";
      case "green":
        return "bg-green-500";
      case "orange":
        return "bg-orange-500";
      case "red":
        return "bg-red-500";
      default:
        return "bg-gray-300";
    }
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
              className={`flex items-center justify-center w-12 h-16 my-2 text-3xl font-bold ${getColorClass(puzzle.colors[index])} rounded`}
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
