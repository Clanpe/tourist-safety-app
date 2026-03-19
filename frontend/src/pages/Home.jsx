import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Import Google Font in index.html:
// <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&display=swap" rel="stylesheet">

function Home() {
  const navigate = useNavigate();

  const fullText =
    "“Your travel companion that ensures safety, guides you through secure paths.”🚀";
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(fullText.slice(0, index + 1));
      index++;
      if (index === fullText.length) clearInterval(interval);
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex relative font-[Sora]">
      {/* Globe Guard top-left */}
        <div className="absolute top-6 left-6 flex items-center space-x-3">
        <span className="text-3xl animate-bounce">🌍</span>
        <span className="relative text-2xl font-bold text-white px-4 py-1 rounded-xl bg-gradient-to-r from-green-400 to-blue-500 shadow-lg transform hover:scale-110 transition-all duration-300 cursor-pointer">
          Globe Guard
          <span className="absolute -top-2 -right-2 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></span>
        </span>
        </div>


      {/* Left Content */}
      <div className="flex-1 flex flex-col justify-center items-center px-12 text-center space-y-6">
        <motion.h1
          className="text-5xl font-extrabold text-blue-800 tracking-wide leading-tight"
          whileHover={{ color: ["#3b82f6", "#ef4444"] }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "mirror" }}
        >
          Smart Tourist Safety
        </motion.h1>

        <p className="text-2xl text-gray-700 italic font-medium max-w-xl">
          {displayedText}
        </p>

        {/* Button slightly below the text */}
        <motion.button
          className="
            mt-6
            px-6 py-3
            bg-blue-600
            text-white
            font-semibold
            rounded-lg
            shadow-md
            relative
            z-0
            overflow-hidden
          "
          whileHover={{
            backgroundColor: "#ef4444",
            scale: 1.05,
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
          onClick={() => navigate("/login")}
        >
          Get Started
        </motion.button>
      </div>

      {/* Right: Full height image */}
      <div className="flex-1">
        <img
          src="/map.png"
          alt="Tourist Safety"
          className="w-full h-screen object-cover"
        />
      </div>
    </div>
  );
}

export default Home;
