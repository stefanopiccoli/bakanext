"use client";
import { Volume2, VolumeX } from "lucide-react";
import { useState } from "react";

export default function RadioPlayer() {
  const [isMuted, setIsMuted] = useState(true);
  return (
    <>
      <video
        controls
        autoPlay
        muted={isMuted}
        playsInline
        className="invisible"
      >
        <source src="https://rradio.fastserv.com/hifi" type="audio/mpeg" />
      </video>
      <div
        onClick={() => setIsMuted((state) => !state)}
        className="text-white fixed bottom-6 right-6 rounded-full border-2 p-1"
      >
        {isMuted ? <Volume2 /> : <VolumeX />}
      </div>
    </>
  );
}
