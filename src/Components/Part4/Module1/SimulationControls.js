
import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, FastForward, Sliders } from 'lucide-react';

const SimulationControls = ({
  networkType,
  setNetworkType,
  speed,
  setSpeed,
  isRealWorld,
  setIsRealWorld,
  isAnalogy,
  setIsAnalogy,
  lang,
}) => {
  const tabs = ['PAN', 'LAN', 'WAN'];
  const t = {
    en: {
      speed: 'Speed',
      realWorld: 'Real-Life Example',
      analogy: 'Analogy Mode',
    },
    hi: {
      speed: 'गति',
      realWorld: 'वास्तविक उदाहरण',
      analogy: 'सादृश्य मोड',
    },
  };

  return (
    <div className="bg-white/70 backdrop-blur-md rounded-2xl p-4 shadow-lg mt-4">
      <div className="flex items-center justify-between">
        <div className="flex bg-slate-200/80 rounded-full p-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setNetworkType(tab)}
              className={`${
                networkType === tab ? 'bg-sky-500 text-white' : ''
              } px-4 py-1.5 text-sm font-semibold rounded-full transition-colors`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Sliders size={18} className="text-slate-600" />
            <label htmlFor="speed" className="text-sm font-medium text-slate-700">
              {t[lang].speed}
            </label>
            <input
              id="speed"
              type="range"
              min="0.5"
              max="5"
              step="0.1"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              className="w-24"
            />
          </div>
          <div className="flex items-center gap-2">
            <motion.div
              className="w-10 h-6 bg-slate-300 rounded-full flex items-center p-1 cursor-pointer"
              onClick={() => setIsRealWorld(!isRealWorld)}
              animate={{ justifyContent: isRealWorld ? 'flex-end' : 'flex-start' }}
            >
              <motion.div className="w-4 h-4 bg-white rounded-full" layout />
            </motion.div>
            <span className="text-sm font-medium text-slate-700">{t[lang].realWorld}</span>
          </div>
          <div className="flex items-center gap-2">
            <motion.div
              className="w-10 h-6 bg-slate-300 rounded-full flex items-center p-1 cursor-pointer"
              onClick={() => setIsAnalogy(!isAnalogy)}
              animate={{ justifyContent: isAnalogy ? 'flex-end' : 'flex-start' }}
            >
              <motion.div className="w-4 h-4 bg-white rounded-full" layout />
            </motion.div>
            <span className="text-sm font-medium text-slate-700">{t[lang].analogy}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimulationControls;
