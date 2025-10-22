
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Router, Smartphone, Laptop, Monitor, Server, Cloud } from 'lucide-react';
import DeviceNode from './DeviceNode';
import DataPacket from './DataPacket';
import PacketLabel from './PacketLabel';

const devices = {
    router: { name: 'Router', icon: <Router size={30} />, en: { type: 'Router', function: 'Connects all devices in the network' }, hi: { type: 'राउटर', function: 'सभी डिवाइसों को जोड़ता है' } },
    pc: { name: 'PC', icon: <Monitor size={25} />, en: { type: 'Personal Computer', function: 'A desktop computer for work or gaming' }, hi: { type: 'पर्सनल कंप्यूटर', function: 'काम या गेमिंग के लिए एक डेस्कटॉप कंप्यूटर' } },
    laptop: { name: 'Laptop', icon: <Laptop size={25} />, en: { type: 'Laptop', function: 'A portable personal computer' }, hi: { type: 'लैपटॉप', function: 'एक पोर्टेबल पर्सनल कंप्यूटर' } },
    phone: { name: 'Phone', icon: <Smartphone size={25} />, en: { type: 'Smartphone', function: 'A mobile device with various capabilities' }, hi: { type: 'स्मार्टफोन', function: 'विभिन्न क्षमताओं वाला एक मोबाइल डिवाइस' } },
    server: { name: 'Server', icon: <Server size={25} />, en: { type: 'Server', function: 'Stores and manages network resources' }, hi: { type: 'सर्वर', function: 'नेटवर्क संसाधनों को संग्रहीत और प्रबंधित करता है' } },
    cloud: { name: 'Cloud', icon: <Cloud size={30} />, en: { type: 'The Internet', function: 'A global network of computers' }, hi: { type: 'इंटरनेट', function: 'कंप्यूटरों का एक वैश्विक नेटवर्क' } },
  };

const getDevicePositions = (width, height) => {
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) / 3.5;

  return {
    router: { x: centerX, y: centerY },
    pc: { x: centerX + radius * Math.cos(-Math.PI / 4), y: centerY + radius * Math.sin(-Math.PI / 4) },
    laptop: { x: centerX + radius * Math.cos(Math.PI / 4), y: centerY + radius * Math.sin(Math.PI / 4) },
    phone: { x: centerX + radius * Math.cos(3 * Math.PI / 4), y: centerY + radius * Math.sin(3 * Math.PI / 4) },
    server: { x: centerX + radius * Math.cos(5 * Math.PI / 4), y: centerY + radius * Math.sin(5 * Math.PI / 4) },
    cloud: { x: width - 60, y: 60 },
  };
};

const InteractiveSimulation = ({
  t,
  lang,
  networkType,
  speed,
  isRealWorld,
  isAnalogy,
}) => {
  const width = 600;
  const height = 400;
  const positions = getDevicePositions(width, height);

  const getConnections = () => {
    switch (networkType) {
      case 'PAN':
        return [{ from: 'phone', to: 'laptop', type: 'wireless' }];
      case 'WAN':
        return [
          { from: 'router', to: 'cloud', type: 'wan' },
          { from: 'server', to: 'cloud', type: 'wan' },
        ];
      case 'LAN':
      default:
        return [
          { from: 'pc', to: 'router', type: 'wired' },
          { from: 'laptop', to: 'router', type: 'wireless' },
          { from: 'phone', to: 'router', type: 'wireless' },
          { from: 'server', to: 'router', type: 'wired' },
          { from: 'router', to: 'cloud', type: 'wan' },
        ];
    }
  };

  const connections = getConnections();

  const analogyText = {
    en: "Think of this like a city — the router is the traffic circle, roads are network cables or Wi-Fi, and vehicles are data packets traveling to deliver messages.",
    hi: "इसे एक शहर की तरह सोचें - राउटर ट्रैफिक सर्कल है, सड़कें नेटवर्क केबल या वाई-फाई हैं, और वाहन संदेश देने वाले डेटा पैकेट हैं।",
  };

  const packetMessages = [
    { en: '📨 Requesting webpage…', hi: '📨 वेबपेज का अनुरोध…' },
    { en: '✅ Response received', hi: '✅ प्रतिक्रिया मिली' },
    { en: '📡 Sending message to phone', hi: '📡 फोन पर संदेश भेजा जा रहा है' },
  ];

  return (
    <div className="w-full h-96 bg-gradient-to-br from-sky-100 to-white rounded-xl p-3 shadow-inner relative overflow-hidden">
      {isRealWorld && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-center bg-no-repeat"
          style={{ backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"><rect width="600" height="400" fill="%23f0f9ff" /><rect x="100" y="250" width="400" height="150" fill="%23e0f2fe" /><path d="M0 400 Q 300 200 600 400" fill="%23e0f2fe" /></svg>')` }}
        />
      )}
      {isAnalogy && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-2 left-2 right-2 bg-white/80 backdrop-blur-sm p-2 rounded-lg shadow-md text-center text-sm text-slate-700"
        >
          {analogyText[lang]}
        </motion.div>
      )}
      <motion.svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
        <defs>
          <g id="car-icon">
            <path d="M5.5 1.5A.5.5 0 0 0 5 2v2H3.12a.5.5 0 0 0-.498.404l-1.05 3.936A.5.5 0 0 0 2 9h12a.5.5 0 0 0 .448-.74l-1.05-3.936A.5.5 0 0 0 12.88 4H11V2a.5.5 0 0 0-.5-.5h-5zM4 5h8v1H4V5zm-1.998 3A1.5 1.5 0 0 0 3.5 9.5h9a1.5 1.5 0 0 0 1.498-1.5H2.002z" />
          </g>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g>
          <PacketLabel
            messages={packetMessages}
            lang={lang}
            duration={5 / speed}
            delay={1}
          />
          {connections.map((conn, i) => {
            const from = positions[conn.from];
            const to = positions[conn.to];
            if (conn.type === 'wan') {
              const controlX = (from.x + to.x) / 2;
              const controlY = (from.y + to.y) / 2 - 100;
              return (
                <path
                  key={i}
                  d={`M${from.x},${from.y} Q${controlX},${controlY} ${to.x},${to.y}`}
                  stroke="#bae6fd"
                  strokeWidth="3"
                  fill="none"
                />
              );
            }
            return (
              <line
                key={i}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke="#bae6fd"
                strokeWidth="3"
                strokeDasharray={conn.type === 'wireless' ? '8 4' : 'none'}
                strokeLinecap="round"
              />
            );
          })}
        </g>

        <g>
          {connections.map((conn, i) => {
            const from = positions[conn.from];
            const to = positions[conn.to];
            const path =
              conn.type === 'wan'
                ? `M${from.x},${from.y} Q${(from.x + to.x) / 2},${(from.y + to.y) / 2 - 100} ${to.x},${to.y}`
                : null;
            return (
              <DataPacket
                key={i}
                from={from}
                to={to}
                duration={5 / speed}
                delay={Math.random() * 2}
                path={path}
                isAnalogy={isAnalogy}
              />
            );
          })}
        </g>

        {Object.keys(devices).map((key) => (
          <DeviceNode
            key={key}
            device={devices[key]}
            position={positions[key]}
            lang={lang}
          />
        ))}

      </motion.svg>
    </div>
  );
};

export default InteractiveSimulation;
