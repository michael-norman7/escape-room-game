"use client";
import React, { useState, useEffect } from "react";
import Modal from "./components/Modal";
import InventoryDetailModal from "./components/InventoryDetailModal";
import Alert from "./components/Alert";
import { inventoryItems, room1Objects } from "./data/roomObjects";

export default function Home() {
  const [currentRoom, setCurrentRoom] = useState(0);
  const [transition, setTransition] = useState(false);

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

    // transition
    if (roomData[currentRoom].transitionVideoSrc !== "") {
      console.log("Transitioning...");
      setTransition(true);
      setTimeout(() => {
        setTransition(false);
        setCurrentRoom(
          Math.max((currentRoom + 1) % Object.keys(roomData).length, 1)
        );
        console.log("Transitioned to next room");
      }, 7000);
    } else {
      if (currentRoom === 0) {
        // Start the game
        setCurrentRoom(1);
      } else if (currentRoom < Object.keys(roomData).length - 1) {
        console.log("Next room");
        setCurrentRoom(currentRoom + 1);
      } else {
        console.log("First room");
        setCurrentRoom(1);
      }
    }
  }

  const roomData = {
    0: {
      videoSrc: "rooms/start_page.mp4",
      transitionVideoSrc: "",
      objects: [],
    },
    1: {
      videoSrc: "rooms/Red_Flicker.mp4",
      transitionVideoSrc: "rooms/Zoom_Out.mp4",
      objects: room1Objects,
    },
    2: {
      videoSrc: "rooms/Red_Green_Flicker.mp4",
      transitionVideoSrc: "rooms/Exit_Room.mp4",
      objects: [],
    },
  };

  // Clear any active alert timeout when component unmounts
  useEffect(() => {
    return () => {
      if (window.alertTimeout) {
        clearTimeout(window.alertTimeout);
      }
    };
  }, []);

  return (
    <main>
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

          {/* Overlay for the first room */}
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
                onClick={handleNextRoom}
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
                    top: obj.top,
                    left: obj.left,
                    width: obj.width,
                    height: obj.height,
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
            {inventory.map((item, index) => (
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
          addToInventory={(item) => {
            setInventory([...inventory, item]);
            showAlert(`Added ${item.name} to inventory!`, "success");
          }}
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
