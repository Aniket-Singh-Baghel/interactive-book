import React from "react";
import { motion } from "framer-motion";

export default function ErrorAnimation() {
  return (
    <div className="relative flex h-screen w-full items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 overflow-hidden">
      {/* 404 Big Text */}
      <h1 className="relative z-10 flex text-[14rem] sm:text-[20rem] md:text-[28rem] font-extrabold text-white/80">
        <span>4</span>
        <span className="relative inline-block">
          {/* Ball Animation through the 0 */}
          <motion.div
            className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
            animate={{ x: [0, 100, 0] }} // ball goes right then back
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          />
          0
        </span>
        <span>4</span>
      </h1>
    </div>
  );
}
