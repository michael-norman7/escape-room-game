"use client";

export default function InventoryDetailModal({ item, onClose }) {
  const detailImage = item.detailImageSrc;

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
        <div className="mb-4 text-2xl font-bold">{item.name}</div>

        <div className="mt-4">
          <img
            src={detailImage}
            alt={item.name}
            className="max-w-[700px] max-h-[650px] w-auto h-auto rounded-lg mx-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
}
