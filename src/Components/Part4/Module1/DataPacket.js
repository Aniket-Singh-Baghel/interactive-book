
import React from 'react';
import { motion } from 'framer-motion';

const DataPacket = ({ from, to, duration, delay, color = '#06b6d4', path, isAnalogy }) => {
  const animation = path
    ? {
        offset: [0, 1],
        opacity: [0, 1, 1, 0],
      }
    : {
        x: [from.x, to.x],
        y: [from.y, to.y],
        opacity: [0, 1, 1, 0],
      };

  const angle = Math.atan2(to.y - from.y, to.x - from.x) * (180 / Math.PI);

  return (
    <motion.g
      animate={animation}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatType: 'loop',
        ease: 'linear',
      }}
    >
      {isAnalogy ? (
        <use
          href="#car-icon"
          fill={color}
          transform={`rotate(${angle}) scale(1.5)`}
          filter="url(#glow)"
        />
      ) : (
        <circle r="5" fill={color} filter="url(#glow)" />
      )}
      {path && <motion.path d={path} fill="none" />}
    </motion.g>
  );
};

export default DataPacket;
