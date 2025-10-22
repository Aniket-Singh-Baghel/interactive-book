
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const DeviceNode = ({ device, position, lang }) => {
  const [isHovered, setIsHovered] = useState(false);
  const t = device[lang];

  return (
    <motion.g
      transform={`translate(${position.x}, ${position.y})`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="cursor-pointer"
    >
      <motion.circle
        r="28"
        fill="#fff"
        stroke="#38bdf8"
        strokeWidth="3"
        whileHover={{ scale: 1.1, filter: 'url(#glow)' }}
        transition={{ type: 'spring', stiffness: 300 }}
      />
      <foreignObject x="-20" y="-20" width="40" height="40" className="text-sky-600 flex items-center justify-center">
        <div className="w-full h-full flex items-center justify-center">
         {device.icon}
        </div>
      </foreignObject>

      {isHovered && (
        <foreignObject x="-75" y="35" width="150" height="100">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-lg text-center"
          >
            <p className="font-bold text-sm text-sky-800">{t.type}</p>
            <p className="text-xs text-slate-600">{t.function}</p>
          </motion.div>
        </foreignObject>
      )}
    </motion.g>
  );
};

export default DeviceNode;
