
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const PacketLabel = ({ messages, lang, duration, delay }) => {
  const [message, setMessage] = useState(messages[0][lang]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * messages.length);
      setMessage(messages[randomIndex][lang]);
    }, duration * 1000);

    return () => clearInterval(interval);
  }, [messages, lang, duration]);

  return (
    <motion.div
      className="absolute bg-sky-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-lg"
      initial={{ opacity: 0, y: -10, scale: 0.8 }}
      animate={{ opacity: [0, 1, 1, 0], y: -20, scale: 1 }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatType: 'loop',
        ease: 'easeInOut',
      }}
    >
      {message}
    </motion.div>
  );
};

export default PacketLabel;
