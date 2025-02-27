export default function Alert({ message, type = "info" }) {
  if (!message) return null;

  return (
    <div
      className={`fixed top-5 left-1/2 -translate-x-1/2 "opacity-100 translate-y-0" : "opacity-0 -translate-y-5" transition-all duration-300 ease-in-out z-50 w-auto max-w-[80%]`}
    >
      <div
        className={`px-5 py-3 rounded shadow-md text-white text-sm font-medium ${
          type === "error"
            ? "bg-red-500"
            : type === "success"
              ? "bg-green-500"
              : type === "warning"
                ? "bg-amber-500"
                : "bg-blue-500"
        }`}
      >
        {message}
      </div>
    </div>
  );
}
