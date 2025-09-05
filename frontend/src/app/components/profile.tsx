"use client";

import { useRef, useState } from "react";

export default function Profile() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="mt-40 flex items-center justify-center gap-20 xl:gap-40">
      <div className="text-text max-w-1/3">
        <p className="text-5xl font-bold ">Profile City</p>
        <p className="text-lg mt-2 text-justify whitespace-pre-line">
          Our city envisions a future where growth and sustainability walk hand
          in hand. Guided by a commitment to innovation, inclusivity, and
          environmental stewardship, we strive to create a city that not only
          thrives today but also preserves its resources for generations to
          come. With a mission to balance economic development, social
          well-being, and ecological harmony, we are building a resilient,
          livable, and green city—where every citizen contributes to and
          benefits from a sustainable way of life.
        </p>
      </div>
      <div className="relative">
        {/* Video */}
        <video
          ref={videoRef}
          src="/videos/profile.mp4"
          autoPlay
          muted
          loop
          className="w-[500px] rounded-2xl shadow-lg cursor-pointer"
          onClick={togglePlay}
        />

        {/* Overlay play icon hanya muncul saat pause */}
        {!isPlaying && (
          <div
            className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-2xl cursor-pointer"
            onClick={togglePlay}
          >
            {/* Ikon Play */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-20 w-20 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
