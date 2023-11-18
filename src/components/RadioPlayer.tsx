"use client";
import { Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function RadioPlayer() {
  const [isMuted, setIsMuted] = useState(true);
  const videoPlayer = useRef<any>(null);
  useEffect(() => {
    videoPlayer.current && videoPlayer.current.play();
  }, []);
  return (
    <>
      <video
        controls
        autoPlay
        muted={isMuted}
        playsInline
        className="invisible w-0 h-0"
        ref={videoPlayer}
      >
        <source src="https://rradio.fastserv.com/hifi" type="audio/mpeg" />
      </video>
      <div
        onClick={() => setIsMuted((state) => !state)}
        className="text-white fixed bottom-6 right-6 rounded-full border-2 p-1"
      >
        {isMuted ? <VolumeX /> : <Volume2 />}
      </div>
    </>
  );
}
