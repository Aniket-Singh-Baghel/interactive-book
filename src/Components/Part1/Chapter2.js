// src/chapters/Chapter2.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom"
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";


const PartCard = ({ emoji, title, desc, visual }) => {
  return (
    <>
      <div className="bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-100 to-yellow-200 flex items-center justify-center text-3xl shadow-sm">
            <span aria-hidden>{emoji}</span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">{title}</h3>
            <p className="text-sm text-gray-600 mt-1">{desc}</p>
          </div>
        </div>

        {/* visual block */}
        <div className="mt-4 flex items-center justify-center">
          <div className="w-full max-w-xs">{visual}</div>
        </div>
      </div>
    </>
  );
};

const CartoonCPU = () => (
  <div className="p-4 rounded-xl bg-indigo-50 border-2 border-indigo-100">
    <svg viewBox="0 0 120 80" className="w-full h-28">
      <rect x="10" y="10" width="100" height="60" rx="8" fill="#EEF2FF" stroke="#C7D2FE" />
      <rect x="30" y="22" width="60" height="36" rx="4" fill="#4F46E5" />
      <text x="60" y="44" textAnchor="middle" fill="white" fontWeight="700" fontSize="10">
        CPU
      </text>
      {/* pins */}
      <g stroke="#C7D2FE" strokeWidth="2">
        <line x1="10" y1="20" x2="2" y2="20" />
        <line x1="10" y1="40" x2="2" y2="40" />
        <line x1="10" y1="60" x2="2" y2="60" />
        <line x1="110" y1="20" x2="118" y2="20" />
        <line x1="110" y1="40" x2="118" y2="40" />
        <line x1="110" y1="60" x2="118" y2="60" />
      </g>
    </svg>
  </div>
);

const CartoonRAM = () => (
  <div className="p-4 rounded-xl bg-yellow-50 border-2 border-yellow-100">
    <svg viewBox="0 0 120 60" className="w-full h-24">
      <rect x="8" y="12" width="104" height="36" rx="6" fill="#FFFBEB" stroke="#FDE68A" />
      <rect x="18" y="20" width="84" height="20" rx="3" fill="#F59E0B" />
      <text x="60" y="34" textAnchor="middle" fill="white" fontWeight="700" fontSize="9">
        RAM
      </text>
      <g fill="#FDE68A">
        <rect x="12" y="48" width="8" height="6" rx="2" />
        <rect x="28" y="48" width="8" height="6" rx="2" />
        <rect x="44" y="48" width="8" height="6" rx="2" />
        <rect x="60" y="48" width="8" height="6" rx="2" />
      </g>
    </svg>
  </div>
);

const CartoonStorage = () => (
  <div className="p-4 rounded-xl bg-green-50 border-2 border-green-100">
    <svg viewBox="0 0 120 70" className="w-full h-28">
      <rect x="12" y="16" width="96" height="38" rx="8" fill="#ECFDF5" stroke="#BBF7D0" />
      <rect x="22" y="22" width="76" height="8" rx="3" fill="#10B981" />
      <rect x="22" y="34" width="76" height="8" rx="3" fill="#059669" />
      <text x="60" y="54" textAnchor="middle" fill="#065F46" fontWeight="700" fontSize="9">
        Storage (HDD / SSD)
      </text>
    </svg>
  </div>
);

const CartoonMonitor = () => (
  <div className="p-3 rounded-xl bg-sky-50 border-2 border-sky-100">
    <svg viewBox="0 0 120 80" className="w-full h-28">
      <rect x="12" y="12" rx="8" width="96" height="56" fill="#EFF6FF" stroke="#BFDBFE" />
      <rect x="22" y="22" width="76" height="34" rx="4" fill="#3B82F6" />
      <circle cx="60" cy="40" r="4" fill="#BFDBFE" />
      <rect x="46" y="66" width="28" height="6" rx="3" fill="#94A3B8" />
    </svg>
  </div>
);

const CartoonKeyboard = () => (
  <div className="p-3 rounded-xl bg-pink-50 border-2 border-pink-100">
    <div className="w-full h-20 rounded-md bg-gradient-to-b from-pink-50 to-pink-100 p-3">
      <div className="grid grid-cols-8 gap-2">
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} className="h-4 rounded bg-white/90 shadow-inner" />
        ))}
      </div>
    </div>
  </div>
);

const CartoonMouse = () => (
  <div className="p-3 rounded-xl bg-amber-50 border-2 border-amber-100">
    <svg viewBox="0 0 120 60" className="w-full h-20">
      <ellipse cx="60" cy="30" rx="40" ry="22" fill="#FFFBEB" stroke="#FDE68A" />
      <rect x="57" y="8" width="6" height="30" rx="3" fill="#FDE68A" />
      <text x="60" y="46" textAnchor="middle" fontSize="9" fill="#92400E" fontWeight="600">
        Mouse
      </text>
    </svg>
  </div>
);

const CartoonSpeakers = () => (
  <div className="p-3 rounded-xl bg-violet-50 border-2 border-violet-100">
    <div className="flex items-center justify-around">
      <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow">🔊</div>
      <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow">♪</div>
    </div>
  </div>
);

const Chapter2 = () => {
  const navigate = useNavigate()
  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">

      {/* Home Button */}
      <div className="flex justify-center">
        <Link
          to="/parts/prt1"
          className="px-6 py-2 bg-yellow-400 text-white font-semibold rounded-full shadow-lg hover:bg-yellow-500 transition"
        >
          🏠 Home
        </Link>
      </div>

      <header className="text-center">
        <h1 className="text-3xl font-extrabold text-gray-800">
          Chapter 2: The Main Parts (Hardware) ⚙️
        </h1>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
          A computer is made of many physical parts. These are called{" "}
          <strong>hardware</strong>. Below are the key parts with cartoon
          visuals and simple analogies to help students remember.
        </p>
      </header>

      {/* Memory trick */}
      <div className="bg-gradient-to-r from-indigo-50 to-pink-50 border-l-4 border-indigo-200 p-4 rounded-lg shadow-sm flex items-center justify-between">
        <div>
          <h3 className="font-bold text-indigo-700">
            Memory Trick — Robot Friend 🤖
          </h3>
          <p className="text-sm text-gray-700">
            Brain = CPU, Notepad = RAM, Cupboard = Storage, Eyes = Monitor,
            Hands = Keyboard, Pointer = Mouse, Voice = Speakers
          </p>
        </div>
        <div className="text-sm text-gray-500 italic">
          Say it out loud with the kids — helps it stick! 🎯
        </div>
      </div>

      {/* Cards grid */}
      <div className="grid gap-6 md:grid-cols-3">
        <PartCard
          emoji="🧠"
          title="CPU — The Brain"
          desc="Controls all actions, makes decisions and performs calculations."
          visual={<CartoonCPU />}
        />
        <PartCard
          emoji="🗒️"
          title="RAM — Short-Term Memory"
          desc="Temporary working space. Fast, but forgets when power is off."
          visual={<CartoonRAM />}
        />
        <PartCard
          emoji="📦"
          title="Storage — Long-Term Memory"
          desc="Stores files, photos, and programs permanently."
          visual={<CartoonStorage />}
        />
        <PartCard
          emoji="🖥️"
          title="Monitor — The Eyes"
          desc="Shows you what the computer is doing (text, images, videos)."
          visual={<CartoonMonitor />}
        />
        <PartCard
          emoji="⌨️"
          title="Keyboard — The Hands"
          desc="Type letters and numbers; give commands."
          visual={<CartoonKeyboard />}
        />
        <PartCard
          emoji="🖱️"
          title="Mouse — The Pointer"
          desc="Point, click, drag — helps you interact with the screen."
          visual={<CartoonMouse />}
        />
        <PartCard
          emoji="🔊"
          title="Speakers — The Voice"
          desc="Plays audio: music, alerts, and sounds from programs."
          visual={<CartoonSpeakers />}
        />
      </div>

      {/* Extra memory activities */}
      <section className="bg-gradient-to-r from-white to-slate-50 p-5 rounded-xl border border-gray-100 shadow-sm">
        <h3 className="text-xl font-semibold text-gray-800 mb-3">
          Fun Activities to Remember
        </h3>
        <ul className="list-disc pl-5 text-gray-700 space-y-2">
          <li>
            <strong>Match Game:</strong> Draw a robot and label its parts with
            hardware names.
          </li>
          <li>
            <strong>Explain in One Sentence:</strong> Kids say what each part
            does in their own words.
          </li>
          <li>
            <strong>Draw & Colour:</strong> Recreate the cartoon visuals and
            stick them on a poster.
          </li>
        </ul>
      </section>
      <div className="w-full flex justify-between items-center mt-10 p-4 bg-gray-100 rounded-lg shadow-md">
        <button
          onClick={() => navigate('/part1/chapters/ch1')}
          className="flex items-center gap-2 px-4 py-2 bg-purple-200 hover:bg-purple-300 text-purple-900 rounded-lg shadow transition"
        >
          <FaArrowLeft />
          Previous
        </button>

        <button
          onClick={() => navigate('/part1/chapters/ch3')}
          className="flex items-center gap-2 px-4 py-2 bg-green-200 hover:bg-green-300 text-green-900 rounded-lg shadow transition"
        >
          Next
          <FaArrowRight />
        </button>
      </div>

    </div>
  );
};
export default Chapter2;
