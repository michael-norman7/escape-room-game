"use client";
import { useState } from "react";
import Modal from "./components/Modal";

const room1Objects = [
  {
    id: "puzzle1",
    top: "420px",
    left: "230px",
    width: "110px",
    height: "90px",
    title: "Puzzle 1",
    content: "This is Puzzle 1 content.",
  },
  {
    id: "puzzle2",
    top: "420px",
    left: "340px",
    width: "110px",
    height: "90px",
    title: "Puzzle 2",
    content: "This is Puzzle 2 content.",
  },
  {
    id: "puzzle3",
    top: "420px",
    left: "450px",
    width: "110px",
    height: "90px",
    title: "Puzzle 3",
    content: "This is Puzzle 3 content.",
  },
  {
    id: "puzzle4",
    top: "350px",
    left: "900px",
    width: "80px",
    height: "380px",
    title: "Puzzle 4",
    content: "This is Puzzle 4 content.",
  },
  {
    id: "puzzle5",
    top: "640px",
    left: "100px",
    width: "350px",
    height: "130px",
    title: "Puzzle 5",
    content: "This is Puzzle 5 content.",
  },
];

const roomData = {
  0: { videoSrc: "rooms/start_page.mp4", objects: [] },
  1: { videoSrc: "rooms/Red_Flicker.mp4", objects: room1Objects },
  2: { videoSrc: "rooms/Zoom_Out.mp4", objects: [] },
  3: { videoSrc: "rooms/Red_Green_Flicker.mp4", objects: [] },
  4: { videoSrc: "rooms/Exit_Room.mp4", objects: [] },
};

export default function Home() {
  const [currentRoom, setCurrentRoom] = useState(0);

  const [activeObject, setActiveObject] = useState(null);

  const [inventory, setInventory] = useState([
    { name: "Key", imageSrc: "items/key.png" },
    { name: "6396", imageSrc: "items/note.png" },
    { name: "Key", imageSrc: "items/key.png" },
    { name: "0375", imageSrc: "items/note.png" },
  ]);

  function handleNextRoom() {
    if (currentRoom < Object.keys(roomData).length - 1) {
      setCurrentRoom(currentRoom + 1);
    } else {
      setCurrentRoom(1);
    }
    setActiveObject(null);
  }

  return (
    <main>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="w-[1280px] h-[768px] overflow-hidden relative">
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

          {roomData[currentRoom].objects.map((obj) => (
            <button
              key={obj.id}
              onClick={() => setActiveObject(obj)}
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
          ))}
        </div>
      </div>

      <button
        onClick={handleNextRoom}
        className="fixed p-2 text-white rounded bottom-4 right-4 bg-slate-500 hover:bg-slate-700"
      >
        Next Room
      </button>

      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-slate-300 rounded-lg w-[500px] h-20">
        <div className="flex items-center justify-center h-full space-x-4">
          {inventory.map((item, index) => (
            <div key={index} className="relative group">
              <img
                src={item.imageSrc}
                alt={item.name}
                className="object-contain w-16 h-16"
              />
              <span className="absolute bottom-0 px-2 py-1 text-white transform -translate-x-1/2 bg-gray-700 rounded-lg opacity-0 text-s translate-y-3/4 left-1/2 group-hover:opacity-100">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {activeObject && (
        <Modal
          title={activeObject.title}
          content={activeObject.content}
          onClose={() => setActiveObject(null)}
        />
      )}
    </main>
  );
}
