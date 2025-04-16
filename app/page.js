"use client";
import React, { useState, useEffect, useRef } from "react";
import Modal from "./components/Modal";
import InventoryDetailModal from "./components/InventoryDetailModal";
import Alert from "./components/Alert";
import { roomData } from "./data/roomData";

export default function Home() {
  const [currentRoom, setCurrentRoom] = useState(2);
  const [transition, setTransition] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  const [activeObject, setActiveObject] = useState(null);
  const [activeInventoryItem, setActiveInventoryItem] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState("info");

  const [inventory, setInventory] = useState([]);

  // Function to check if the user has a specific key
  const hasKey = (keyName) => {
    return inventory.some((item) => item.name === keyName);
  };

  // Show alert message with type
  const showAlert = (message, type = "info") => {
    setAlertMessage(message);
    setAlertType(type);

    // Clear any existing timeout
    if (window.alertTimeout) {
      clearTimeout(window.alertTimeout);
    }

    // Set a new timeout to clear the alert
    window.alertTimeout = setTimeout(() => {
      setAlertMessage(null);
    }, 3000);
  };

  // Function to toggle mute state
  const toggleMute = () => {
    if (audioRef.current) {
      const newMuteState = !isMuted;
      audioRef.current.muted = newMuteState;
      setIsMuted(newMuteState);
    }
  };

  // Function to start background music
  const startBackgroundMusic = () => {
    if (audioRef.current && !isMusicPlaying) {
      audioRef.current
        .play()
        .then(() => {
          setIsMusicPlaying(true);
          audioRef.current.muted = isMuted; // Apply current mute state
        })
        .catch((error) => {
          console.error("Audio playback failed:", error);
        });
    }
  };

  // Handle click on an object with key check
  const handleObjectClick = (obj) => {
    // Check if the object directly requires a key
    if (obj.key && !hasKey(obj.key)) {
      showAlert(
        obj.hint || `You need a ${obj.key} to interact with this.`,
        "info"
      );
      return;
    }

    // If we reach here, either no key is required or the user has the key
    setActiveObject(obj);
  };

  function handleNextRoom() {
    if (transition) return -1;

    setActiveObject(null);

    // Remove items specified in current room's remove_item array
    if (
      roomData[currentRoom].remove_item &&
      roomData[currentRoom].remove_item.length > 0
    ) {
      setInventory((prevInventory) =>
        prevInventory.filter(
          (invItem) =>
            !roomData[currentRoom].remove_item.some(
              (removeItem) => removeItem.name === invItem.name
            )
        )
      );
    }

    // transition
    if (roomData[currentRoom].transitionVideoSrc !== "") {
      console.log("Transitioning...");
      setTransition(true);
      setTimeout(() => {
        setTransition(false);
        setCurrentRoom(currentRoom + 1);
        console.log("Transitioned to next room");
      }, 7000);
    } else {
      if (currentRoom === 0) {
        // Start the game
        setCurrentRoom(1);
      } else {
        // Simply move to next room if no transition video
        setCurrentRoom(currentRoom + 1);
      }
    }
  }

  return (
    <main onClick={startBackgroundMusic}>
      {/* Background Music */}
      <audio
        ref={audioRef}
        src="audio/mysterious-music.mp3"
        loop
        preload="auto"
        muted={isMuted}
      />

      {/* Mute button */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevent triggering startBackgroundMusic
          toggleMute();
        }}
        className="fixed top-4 right-4 z-50 p-2 bg-gray-800 bg-opacity-70 text-white rounded-full hover:bg-opacity-90 transition-all"
        aria-label={isMuted ? "Unmute audio" : "Mute audio"}
      >
        {isMuted ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
            />
          </svg>
        )}
      </button>

      {/* Alert component positioned above the game window */}
      <Alert message={alertMessage} type={alertType} />

      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="w-[1280px] h-[768px] overflow-hidden relative">
          {transition ? (
            <video
              key={roomData[currentRoom].transitionVideoSrc}
              autoPlay
              muted
              playsInline
              className="object-cover w-full h-full"
            >
              <source
                src={roomData[currentRoom].transitionVideoSrc}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          ) : roomData[currentRoom].videoSrc.match(
              /\.(jpg|jpeg|png|gif|webp)$/i
            ) ? (
            <img
              src={roomData[currentRoom].videoSrc}
              alt={`Room ${currentRoom} background`}
              className="object-cover w-full h-full"
            />
          ) : (
            <video
              key={roomData[currentRoom].videoSrc}
              autoPlay
              loop
              muted
              playsInline
              className="object-cover w-full h-full"
            >
              <source src={roomData[currentRoom].videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}

          {/* Overlay for the start room */}
          {currentRoom === 0 ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="p-8 bg-black bg-opacity-70 rounded-lg text-white max-w-2xl text-center mb-8">
                <h1 className="text-4xl font-bold mb-4">Museum Escape Room</h1>
                <p className="text-xl mb-6">
                  You've been locked inside a mysterious museum after hours.
                  Solve the puzzles, find hidden clues, and uncover the secrets
                  to escape before morning comes.
                </p>
                <p className="text-lg mb-4">
                  Click on objects to interact with them and collect items in
                  your inventory. Use items to solve puzzles and progress
                  through the rooms.
                </p>
              </div>
              <button
                onClick={() => {
                  startBackgroundMusic();
                  handleNextRoom();
                }}
                className="px-8 py-4 bg-gray-600 text-white text-2xl font-bold rounded-lg hover:bg-gray-700 transition-colors"
              >
                Start Game
              </button>
            </div>
          ) : (
            roomData[currentRoom].objects
              .filter(
                (obj) =>
                  !obj.hiddenBy ||
                  inventory.some((item) => item.name === obj.hiddenBy.name)
              )
              .map((obj) => (
                <button
                  key={obj.id}
                  onClick={() => handleObjectClick(obj)}
                  style={{
                    position: "absolute",
                    top: obj.position.top,
                    left: obj.position.left,
                    width: obj.position.width,
                    height: obj.position.height,
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                  }}
                />
              ))
          )}
        </div>
      </div>

      {/* Inventory bar */}
      {currentRoom !== 0 && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-slate-300 rounded-lg w-[700px] h-20">
          <div className="flex items-center justify-center h-full space-x-4">
            {inventory
              .filter(item => item.imageSrc)
              .map((item, index) => (
              <div key={index} className="relative group">
                <img
                  src={item.imageSrc}
                  alt={item.name}
                  className="object-contain w-16 h-16 cursor-pointer"
                  onClick={() => setActiveInventoryItem(item)}
                />
                <span className="absolute bottom-0 px-2 py-1 text-white transform -translate-x-1/2 bg-gray-700 rounded-lg opacity-0 text-s translate-y-3/4 left-1/2 group-hover:opacity-100 whitespace-nowrap">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal for room objects */}
      {activeObject && (
        <Modal
          title={activeObject.title}
          content={activeObject.content}
          onClose={() => setActiveObject(null)}
          inventory={inventory}
          setInventory={setInventory}
          addToInventory={(item) => {
            setInventory([...inventory, item]);
            showAlert(`Added ${item.name} to inventory!`, "success");
          }}
          handleNextRoom={handleNextRoom}
        />
      )}

      {/* Modal for inventory item details */}
      {activeInventoryItem && activeInventoryItem.detailImageSrc && (
        <InventoryDetailModal
          item={activeInventoryItem}
          onClose={() => setActiveInventoryItem(null)}
        />
      )}
    </main>
  );
}
