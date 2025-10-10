// Improved responsive version of LiveSimulation component with better UI/UX
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaUser, FaBroadcastTower, FaSatelliteDish, FaServer } from 'react-icons/fa';

const nodes = [
  { id: 'user', icon: <FaUser />, label: 'You', x: 15, y: 80 },
  { id: 'tower', icon: <FaBroadcastTower />, label: 'Cell Tower', x: 35, y: 55 },
  { id: 'satellite', icon: <FaSatelliteDish />, label: 'Satellite', x: 70, y: 10 },
  { id: 'server', icon: <FaServer />, label: 'Server', x: 90, y: 80 },
];

const getNode = (id) => nodes.find(n => n.id === id);

const Packet = ({ path, duration, color, delay = 0 }) => (
  <motion.div
    className="absolute w-2 h-2 md:w-3 md:h-3 rounded-full z-10"
    style={{ backgroundColor: color, offsetPath: `path(${path})` }}
    initial={{ offsetDistance: '0%', opacity: 0 }}
    animate={{ offsetDistance: '100%', opacity: [0, 1, 1, 0] }}
    transition={{ duration, delay, ease: 'linear' }}
  />
);

const AnimatedPath = ({ d, duration, delay, color }) => (
  <motion.path
    d={d}
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeDasharray="4 4"
    initial={{ pathLength: 0, opacity: 0 }}
    animate={{ pathLength: 1, opacity: 1 }}
    transition={{ duration, delay, ease: 'linear' }}
  />
);

export default function LiveSimulation({ t }) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleRequest = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 9000);
  };

  return (
    <div className="relative w-full max-w-5xl h-[400px] md:h-[500px] bg-gray-900 rounded-xl overflow-hidden p-4 flex flex-col items-center justify-between shadow-lg">
      <div className="relative w-full h-full">
        {nodes.map(node => (
          <div key={node.id} className="absolute text-white text-center z-20"
            style={{ left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%, -50%)' }}>
            <div className="text-2xl md:text-4xl text-cyan-400 drop-shadow-lg">{node.icon}</div>
            <div className="text-xs md:text-sm mt-1 font-medium">{node.label}</div>
          </div>
        ))}

        <svg className="absolute w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          <line x1={getNode('user').x} y1={getNode('user').y} x2={getNode('tower').x} y2={getNode('tower').y} stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="2 2" />
          <line x1={getNode('tower').x} y1={getNode('tower').y} x2={getNode('satellite').x} y2={getNode('satellite').y} stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="2 2" />
          <line x1={getNode('satellite').x} y1={getNode('satellite').y} x2={getNode('server').x} y2={getNode('server').y} stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="2 2" />

          <AnimatePresence>
            {isAnimating && (
              <>
                <AnimatedPath d={`M ${getNode('user').x} ${getNode('user').y} L ${getNode('tower').x} ${getNode('tower').y}`} duration={1.5} delay={0} color="#34D399" />
                <AnimatedPath d={`M ${getNode('tower').x} ${getNode('tower').y} L ${getNode('satellite').x} ${getNode('satellite').y}`} duration={1.5} delay={1.5} color="#34D399" />
                <AnimatedPath d={`M ${getNode('satellite').x} ${getNode('satellite').y} L ${getNode('server').x} ${getNode('server').y}`} duration={1.5} delay={3} color="#34D399" />
                <AnimatedPath d={`M ${getNode('server').x} ${getNode('server').y} L ${getNode('satellite').x} ${getNode('satellite').y}`} duration={1.5} delay={4.5} color="#60A5FA" />
                <AnimatedPath d={`M ${getNode('satellite').x} ${getNode('satellite').y} L ${getNode('tower').x} ${getNode('tower').y}`} duration={1.5} delay={6} color="#60A5FA" />
                <AnimatedPath d={`M ${getNode('tower').x} ${getNode('tower').y} L ${getNode('user').x} ${getNode('user').y}`} duration={1.5} delay={7.5} color="#60A5FA" />
              </>
            )}
          </AnimatePresence>
        </svg>

        <AnimatePresence>
          {isAnimating && (
            <>
              <Packet path={`M ${getNode('user').x} ${getNode('user').y} L ${getNode('tower').x} ${getNode('tower').y}`} duration={1.5} delay={0} color="#A7F3D0" />
              <Packet path={`M ${getNode('tower').x} ${getNode('tower').y} L ${getNode('satellite').x} ${getNode('satellite').y}`} duration={1.5} delay={1.5} color="#A7F3D0" />
              <Packet path={`M ${getNode('satellite').x} ${getNode('satellite').y} L ${getNode('server').x} ${getNode('server').y}`} duration={1.5} delay={3} color="#A7F3D0" />
              <Packet path={`M ${getNode('server').x} ${getNode('server').y} L ${getNode('satellite').x} ${getNode('satellite').y}`} duration={1.5} delay={4.5} color="#BFDBFE" />
              <Packet path={`M ${getNode('satellite').x} ${getNode('satellite').y} L ${getNode('tower').x} ${getNode('tower').y}`} duration={1.5} delay={6} color="#BFDBFE" />
              <Packet path={`M ${getNode('tower').x} ${getNode('tower').y} L ${getNode('user').x} ${getNode('user').y}`} duration={1.5} delay={7.5} color="#BFDBFE" />
            </>
          )}
        </AnimatePresence>
      </div>

      <button
        onClick={handleRequest}
        disabled={isAnimating}
        className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-all disabled:bg-gray-500 disabled:cursor-not-allowed z-10 mt-4"
      >
        <FaPlay />
        {t.request_data}
      </button>
    </div>
  );
}