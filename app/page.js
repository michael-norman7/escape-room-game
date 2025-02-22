import Image from "next/image";

export default function Home() {
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      style={{
        position: "fixed",
        left: 0,
        bottom: 0,
        width: "100%",
        height: "1000px",
        zIndex: -1,
      }}
    >
      <source src="/Red_Flicker.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
