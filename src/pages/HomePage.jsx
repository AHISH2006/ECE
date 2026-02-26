import React, { useEffect, useRef } from "react";

const HomePage = () => {
  const reactorRef = useRef(null);
  const containerRef = useRef(null);

  // 🔊 Hover Sound Effect
  const playSound = () => {
    const audio = new Audio(
      "https://assets.mixkit.co/sfx/preview/mixkit-game-hover-click-1138.mp3"
    );
    audio.volume = 0.4;
    audio.play();
  };

  // ⚡ 3D Mouse Parallax Effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / 25;
      const y = (e.clientY - innerHeight / 2) / 25;

      if (containerRef.current) {
        containerRef.current.style.transform = `
          rotateY(${x}deg)
          rotateX(${-y}deg)
        `;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center overflow-hidden relative">
      
      {/* Background Glow */}
      <div className="absolute w-[600px] h-[600px] bg-cyan-500 opacity-20 blur-[150px] rounded-full"></div>

      {/* Main Container */}
      <div
        ref={containerRef}
        className="transition-transform duration-200 ease-out"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* 🎮 Animated Arc Reactor */}
        <div
          ref={reactorRef}
          onMouseEnter={playSound}
          className="relative w-72 h-72 flex items-center justify-center cursor-pointer group"
        >
          {/* Outer Rotating Ring */}
          <div className="absolute w-full h-full border-4 border-cyan-400 rounded-full animate-spin-slow"></div>

          {/* Middle Ring */}
          <div className="absolute w-56 h-56 border-4 border-cyan-300 rounded-full animate-spin-reverse"></div>

          {/* Core Glow */}
          <div className="w-32 h-32 bg-cyan-400 rounded-full blur-2xl opacity-80 animate-pulse"></div>

          {/* Center Core */}
          <div className="absolute w-20 h-20 bg-white rounded-full shadow-[0_0_60px_#00ffff]"></div>
        </div>

        {/* Text */}
        <h1
          onMouseEnter={playSound}
          className="text-center mt-10 text-4xl font-bold text-cyan-400 tracking-widest transition-all duration-300 hover:scale-110 hover:text-white"
        >
          PART OF THE JOURNEY IS THE END
        </h1>
      </div>

      {/* Custom Animations */}
      <style>
        {`
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes spinReverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }

        .animate-spin-slow {
          animation: spinSlow 8s linear infinite;
        }

        .animate-spin-reverse {
          animation: spinReverse 6s linear infinite;
        }
        `}
      </style>
    </div>
  );
};

export default HomePage;