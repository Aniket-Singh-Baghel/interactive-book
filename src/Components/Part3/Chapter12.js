// src/Components/Part3/Chapter12Desktop.jsx
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { Link } from "react-router-dom";

// Lucide (keep the same set you used earlier for taskbar/apps, but visuals flattened)
import {
  Trash2,
  Globe,
  Image as ImageIcon,
  Music as MusicIcon,
  Calendar as CalendarIcon,
  Mail,
  Settings as SettingsIcon,
  StickyNote,
  X,
  Minus,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Search,
  Wifi,
  Volume2,
  Battery,
  Power,
  HardDrive,
  Monitor,
} from "lucide-react";

// Strictly use FaFolder / FaFolderOpen for folders + desktop icons
import { FaFolder, FaFolderOpen, FaWindows } from "react-icons/fa";

/* ---------------- Inline SVG components kept for taskbar pins (flat look) ---------------- */

// Edge (custom simplified svg)
const EdgeIcon = (props) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <linearGradient id="e1" x1="0" x2="1">
        <stop offset="0" stopColor="#00A4EF" />
        <stop offset="1" stopColor="#0078D7" />
      </linearGradient>
    </defs>
    <circle cx="24" cy="24" r="20" fill="url(#e1)" />
    <path d="M24 10c7.7 0 14 6.3 14 14s-6.3 14-14 14-14-6.3-14-14S16.3 10 24 10z" fill="#fff" opacity="0.06" />
  </svg>
);

// Chrome
const ChromeIcon = (props) => (
  <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path fill="#EA4335" d="M24 24l12.08-7.18A18 18 0 0 0 24 6a18.2 18.2 0 0 0-2 .1L24 24z" />
    <path fill="#FBBC05" d="M24 24L36 31.1A18 18 0 0 1 24 42a18 18 0 0 1-12.8-5.1L24 24z" />
    <path fill="#34A853" d="M24 24L11.2 18.9A18 18 0 0 0 6 24c0 2.7.6 5.1 1.7 7.3L24 24z" />
    <circle cx="24" cy="24" r="6.5" fill="#4285F4" />
  </svg>
);

// Brave
const BraveIcon = (props) => (
  <svg viewBox="0 0 24 24" {...props} xmlns="http://www.w3.org/2000/svg">
    <path fill="#F59E0B" d="M12 2l7 4v8l-7 6-7-6V6z" />
    <path fill="#FF6F00" d="M12 4l5 3v7l-5 4-5-4V7z" opacity="0.95" />
    <circle cx="12" cy="11" r="2.2" fill="#fff" opacity="0.08" />
  </svg>
);

// VS Code (simplified)
const VscodeIcon = (props) => (
  <svg viewBox="0 0 24 24" {...props} xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="3" fill="#007ACC" />
    <path d="M5 6l8 6-8 6V6z" fill="#001F3F" opacity="0.9" />
    <path d="M13.5 6.5L20 12l-6.5 5.5" stroke="#fff" strokeWidth="0.9" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
  </svg>
);

// Photoshop
const PhotoshopIcon = (props) => (
  <svg viewBox="0 0 64 64" {...props} xmlns="http://www.w3.org/2000/svg">
    <rect width="64" height="64" rx="6" fill="#001E36" />
    <text x="50%" y="58%" textAnchor="middle" fontSize="36" fontFamily="Arial" fill="#31A8FF" fontWeight="700">Ps</text>
  </svg>
);

// Illustrator
const IllustratorIcon = (props) => (
  <svg viewBox="0 0 64 64" {...props} xmlns="http://www.w3.org/2000/svg">
    <rect width="64" height="64" rx="6" fill="#2A1300" />
    <text x="50%" y="58%" textAnchor="middle" fontSize="36" fontFamily="Arial" fill="#FF9A00" fontWeight="700">Ai</text>
  </svg>
);

// Telegram
const TelegramIcon = (props) => (
  <svg viewBox="0 0 240 240" {...props} xmlns="http://www.w3.org/2000/svg">
    <circle cx="120" cy="120" r="120" fill="#0088cc" />
    <path d="M50 120l120-60-30 120-40-30-20 20-30-50z" fill="#fff" />
  </svg>
);

// WhatsApp
const WhatsappIcon = (props) => (
  <svg viewBox="0 0 48 48" {...props} xmlns="http://www.w3.org/2000/svg">
    <path fill="#25D366" d="M24 4a20 20 0 0 0-17.3 30L4 44l10.5-2.7A20 20 0 1 0 24 4z" />
    <path fill="#fff" d="M20 18c1.3 0 2.4.7 3 1.7l.6 1c.3.6.8 1 1.5 1 .3 0 .9 0 1.4-.4.5-.4 1.6-1.6 2.2-2.4.7-1 1.7-1.1 2.4-1.1.7 0 1.3.1 1.9.3.6.2 1 .7 1.1 1.3.1.8-.1 1.6-.5 2.8-.4 1.2-1.1 2.6-1.8 3.8s-2 2.8-3 3.7c-1 .9-2.3 1.8-3.7 2.4-1.4.6-2.9 1-4.4 1.2-1.5.2-2.9.2-4.4.1-1.4 0-2.9-.4-4.1-1.1L11 33l2.4-6.6C14.4 23 15.9 18 20 18z" opacity="0.95" />
  </svg>
);

// LinkedIn
const LinkedInIcon = (props) => (
  <svg viewBox="0 0 448 512" {...props} xmlns="http://www.w3.org/2000/svg">
    <rect width="448" height="512" rx="24" fill="#0077B5" />
    <path d="M100 480H24V165h76zM62 108a38 38 0 1 1 0-76 38 38 0 0 1 0 76zM448 480h-76V328c0-36-12-60-42-60-22 0-36 15-42 30-3 6-4 15-4 24V480h-76s1-257 0-284h76v40c12-18 33-44 80-44 58 0 102 38 102 120z" fill="#fff" />
  </svg>
);

/* ---------------- end inline SVGs ---------------- */

/* REGISTER GSAP PLUGIN safely */
if (typeof gsap !== "undefined" && gsap.registerPlugin && !gsap.core.globals().Draggable) {
  gsap.registerPlugin(Draggable);
}

/* small helper uid */
const uid = () => Math.random().toString(36).slice(2, 9);

/* App definitions (icons + subtle accent colors) — keep logic, flatten visuals */
const APP_DEFS = {
  Explorer: { name: "Explorer", icon: FaFolder, color: "text-amber-400" },
  Browser: { name: "Browser", icon: Globe, color: "text-blue-400" },
  Documents: { name: "Documents", icon: StickyNote, color: "text-emerald-400" },
  Gallery: { name: "Gallery", icon: ImageIcon, color: "text-purple-400" },
  Music: { name: "Music", icon: MusicIcon, color: "text-rose-400" },
  Calendar: { name: "Calendar", icon: CalendarIcon, color: "text-amber-400" },
  Mail: { name: "Mail", icon: Mail, color: "text-orange-400" },
  Settings: { name: "Settings", icon: SettingsIcon, color: "text-cyan-400" },
  Recycle: { name: "Recycle Bin", icon: Trash2, color: "text-red-400" },
  "This PC": { name: "This PC", icon: HardDrive, color: "text-slate-300" },
};

const ALL_APPS = [
  APP_DEFS.Explorer,
  APP_DEFS.Browser,
  APP_DEFS.Documents,
  APP_DEFS.Gallery,
  APP_DEFS.Music,
  APP_DEFS.Calendar,
  APP_DEFS.Mail,
  APP_DEFS.Settings,
  APP_DEFS.Recycle,
];

/* Calendar helpers */
function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}
function endOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}
function daysGrid(date) {
  const start = startOfMonth(date);
  const end = endOfMonth(date);
  const grid = [];
  const prevDays = (start.getDay() + 6) % 7; // Mon=0
  for (let i = prevDays; i > 0; i--) {
    const d = new Date(start);
    d.setDate(d.getDate() - i);
    grid.push({ date: d, outside: true });
  }
  for (let d = 1; d <= end.getDate(); d++) {
    grid.push({ date: new Date(date.getFullYear(), date.getMonth(), d), outside: false });
  }
  while (grid.length % 7 !== 0) {
    const last = grid[grid.length - 1].date;
    const d = new Date(last);
    d.setDate(d.getDate() + 1);
    grid.push({ date: d, outside: true });
  }
  return grid;
}

/* ---------------- main component (minimal flat re-skin) ---------------- */
export default function Chapter11Desktop() {
  // system & UI state
  const [openWins, setOpenWins] = useState([]); // windows
  const [zTop, setZTop] = useState(20);
  const [startOpen, setStartOpen] = useState(false);
  const [qsOpen, setQsOpen] = useState(false);
  const [calOpen, setCalOpen] = useState(false);
  const [searchPanel, setSearchPanel] = useState(false);
  const [searchQ, setSearchQ] = useState("");
  const [now, setNow] = useState(new Date());

  // recycle bin content (demo)
  const [recycleItems, setRecycleItems] = useState([
    { id: uid(), name: "old_photo.png" },
    { id: uid(), name: "draft_notes.txt" },
  ]);

  // update clock
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // helper: bring a window to front
  const focusWin = (id) => {
    setZTop((prevZ) => {
      const newZ = prevZ + 1;
      setOpenWins((prev) => prev.map((w) => (w.id === id ? { ...w, z: newZ } : w)));
      return newZ;
    });
  };

  // open an app by canonical name (maps Desktop names to apps)
  const openApp = (appName) => {
    // map some desktop names to canonical apps
    const canonical =
      appName === "green anaconda" ? "Documents" :
      appName === "extras" ? "Explorer" :
      appName === "vasuki indicus" ? "Gallery" :
      appName === "gyanganj" ? "Explorer" :
      appName === "GEOlayers 3" ? "Browser" :
      appName === "Shorts" ? "Gallery" :
      appName;

    let def = ALL_APPS.find((a) => a.name === canonical);
    if (!def) {
      if (canonical.toLowerCase().includes("photoshop") || canonical === "Photoshop") {
        def = { name: "Photoshop", icon: APP_DEFS.Gallery.icon, color: "text-violet-400" };
      } else if (canonical.toLowerCase().includes("illustrator") || canonical === "Illustrator") {
        def = { name: "Illustrator", icon: APP_DEFS.Gallery.icon, color: "text-orange-400" };
      } else {
        def = APP_DEFS.Explorer;
      }
    }

    const existing = openWins.find((w) => w.app === def.name);
    if (existing) {
      if (existing.minimized) restoreWin(existing.id);
      focusWin(existing.id);
      setStartOpen(false);
      setSearchPanel(false);
      return;
    }

    // create window object
    const id = uid();
    const win = {
      id,
      app: def.name,
      title: def.name,
      icon: def.icon,
      color: def.color,
      x: 120 + (openWins.length % 3) * 38,
      y: 80 + (openWins.length % 3) * 28,
      w: 860,
      h: 540,
      z: zTop + 2,
      minimized: false,
      maximized: false,
    };
    setZTop((z) => z + 3);
    setOpenWins((arr) => [...arr, win]);
    setStartOpen(false);
    setSearchPanel(false);
  };

  const closeWin = (id) => setOpenWins((arr) => arr.filter((w) => w.id !== id));
  const minimizeWin = (id) => setOpenWins((arr) => arr.map((w) => (w.id === id ? { ...w, minimized: true } : w)));
  const restoreWin = (id) => setOpenWins((arr) => arr.map((w) => (w.id === id ? { ...w, minimized: false } : w)));
  const toggleMax = (id) => setOpenWins((arr) => arr.map((w) => (w.id === id ? { ...w, maximized: !w.maximized } : w)));

  const isOpen = (name) => !!openWins.find((w) => w.app === name);

  // desktop icons (folders only, minimal)
  const desktopIcons = [
    { label: "Recycle Bin", app: "Recycle", icon: Trash2, color: "text-slate-200" },
    { label: "green anaconda", app: "Documents", icon: FaFolder, color: "text-amber-400" },
    { label: "extras", app: "Explorer", icon: FaFolder, color: "text-amber-400" },
    { label: "vasuki indicus", app: "Gallery", icon: FaFolder, color: "text-amber-400" },
    { label: "gyanganj", app: "Explorer", icon: FaFolder, color: "text-amber-400" },
    { label: "GEOlayers 3", app: "Browser", icon: FaFolder, color: "text-amber-400" },
    { label: "Shorts", app: "Gallery", icon: FaFolder, color: "text-amber-400" },
  ];

  const filteredApps = useMemo(() => ALL_APPS.filter((a) => a.name.toLowerCase().includes(searchQ.toLowerCase())), [searchQ]);

  // Desktop ref to detect clicks on empty space
  const desktopRef = useRef(null);

  // ---- Nested UI components: AppWindow + WindowContent + Apps (all in same file) ----
  function AppWindow({ win }) {
    const ref = useRef(null);
    const isMax = win.maximized;

    // draggable + intro animation
    useLayoutEffect(() => {
      if (!ref.current) return;
      const drag = Draggable.create(ref.current, {
        bounds: "parent",
        trigger: ".win-header",
        onDragStart: () => focusWin(win.id),
        onPressInit: () => focusWin(win.id),
      })[0];

      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.22, ease: "power2.out" }
      );

      return () => drag && drag.kill();
    }, [win.id]);

    // minimized animation toggle
    useEffect(() => {
      if (!ref.current) return;
      if (win.minimized) {
        gsap.to(ref.current, {
          y: 30,
          opacity: 0,
          duration: 0.18,
          ease: "power2.inOut",
          onComplete: () => {
            if (ref.current) ref.current.style.pointerEvents = "none";
          },
        });
      } else {
        if (ref.current) ref.current.style.pointerEvents = "auto";
        gsap.to(ref.current, { y: 0, opacity: 1, duration: 0.18, ease: "power2.out" });
      }
    }, [win.minimized]);

    return (
      <div
        ref={ref}
        className={`absolute select-none ${win.minimized ? "opacity-0" : ""}`}
        style={{
          left: isMax ? 0 : win.x,
          top: isMax ? 0 : win.y,
          width: isMax ? "100%" : win.w,
          height: isMax ? "100%" : win.h,
          zIndex: win.z,
        }}
        onMouseDown={() => focusWin(win.id)}
      >
        <div className="win h-full flex flex-col rounded-lg border border-slate-700 bg-[#1a1d29] shadow-[0_4px_18px_rgba(0,0,0,0.35)]">
          {/* header */}
          <div className="win-header h-10 px-3 flex items-center justify-between bg-[#171923] border-b border-slate-700 cursor-grab">
            <div className="flex items-center gap-2">
              {/* When using FaFolder as app icon, size it exactly */}
              <win.icon className={`w-4 h-4 ${win.color}`} />
              <span className="text-sm font-medium text-slate-100">{win.title}</span>
            </div>
            <div className="flex items-center gap-1">
              <button title="Minimize" onClick={() => minimizeWin(win.id)} className="p-1 rounded hover:bg-slate-800">
                <Minus className="w-4 h-4" />
              </button>
              <button title={isMax ? "Restore" : "Maximize"} onClick={() => toggleMax(win.id)} className="p-1 rounded hover:bg-slate-800">
                <Maximize2 className="w-4 h-4" />
              </button>
              <button title="Close" onClick={() => closeWin(win.id)} className="p-1 rounded hover:bg-red-700/30 hover:text-red-300">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* content */}
          <div className="flex-1 overflow-auto p-4 text-slate-100 text-sm">
            <WindowContent win={win} />
          </div>
        </div>
      </div>
    );
  }

  function WindowContent({ win }) {
    switch (win.app) {
      case "Explorer":
        return <ExplorerApp onOpen={openApp} />;
      case "Documents":
        return <NotesApp />;
      case "Gallery":
        return <GalleryApp />;
      case "Browser":
        return <BrowserApp />;
      case "Recycle Bin":
      case "Recycle":
        return <RecycleApp items={recycleItems} onEmpty={() => setRecycleItems([])} />;
      case "Calendar":
        return <CalendarInline />;
      case "Settings":
        return <SettingsApp />;
      case "Music":
        return <MusicApp />;
      case "Mail":
        return <MailApp />;
      case "Photoshop":
      case "Illustrator":
        return <GraphicPlaceholder name={win.app} />;
      default:
        return <div className="text-center opacity-80">This is the {win.app} window.</div>;
    }
  }

  function ExplorerApp({ onOpen }) {
    // Treat everything as folders, use FaFolder / FaFolderOpen
    const entries = [
      { name: "Documents" },
      { name: "Gallery" },
      { name: "Downloads" },
      { name: "Music" },
      { name: "This PC" },
    ];
    const [active, setActive] = useState(null);

    return (
      <div className="h-full flex flex-col">
        <div className="mb-3 flex gap-2 items-center text-slate-300">
          <FaFolder className="w-4 h-4 text-amber-400" />
          <span className="text-xs sm:text-sm">Quick access · Desktop · Documents · Downloads</span>
        </div>

        <div className="grid grid-cols-5 gap-3">
          {entries.map((e) => {
            const isActive = active === e.name;
            const IconX = isActive ? FaFolderOpen : FaFolder;
            return (
              <button
                key={e.name}
                onMouseDown={() => setActive(e.name)}
                onDoubleClick={() => onOpen(e.name)}
                className={`group p-2 rounded-lg border border-slate-700 bg-[#151822] hover:bg-[#1b1f2b] text-left`}
              >
                <div className="w-full aspect-square rounded-md flex items-center justify-center">
                  <IconX className="w-8 h-8 text-amber-400" />
                </div>
                <div className="mt-2 text-xs text-slate-200 truncate">{e.name}</div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  function NotesApp() {
    const [text, setText] = useState("");
    const downloadTxt = () => {
      const blob = new Blob([text], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "notes.txt";
      a.click();
      URL.revokeObjectURL(url);
    };
    return (
      <div className="h-full flex flex-col">
        <div className="mb-2 flex items-center gap-2">
          <button onClick={downloadTxt} className="px-3 py-1 rounded border border-slate-700 bg-[#151822] hover:bg-[#1b1f2b] text-xs">
            Save / Download
          </button>
          <span className="opacity-60 text-xs">Double-click a folder in Explorer to open here.</span>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 bg-[#0f121a] text-slate-100 outline-none resize-none leading-6 rounded-lg border border-slate-700 p-3"
          placeholder="Type your notes here..."
        />
      </div>
    );
  }

  function GalleryApp() {
    const images = [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1526483360412-f4dbaf036963?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1499084732479-de2c02d45fc4?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=800&auto=format&fit=crop",
    ];
    const [active, setActive] = useState(images[0]);
    return (
      <div className="grid grid-cols-3 gap-3 h-full">
        <div className="col-span-2 rounded-lg overflow-hidden border border-slate-700 bg-[#0f121a]">
          <img src={active} alt="preview" className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col gap-2 overflow-auto">
          {images.map((src) => (
            <button key={src} onClick={() => setActive(src)} className="rounded-lg overflow-hidden border border-slate-700 bg-[#151822] hover:bg-[#1b1f2b]">
              <img src={src} alt="thumb" className="w-full h-24 object-cover" />
            </button>
          ))}
        </div>
      </div>
    );
  }

  function BrowserApp() {
    const [url, setUrl] = useState("https://example.com");
    const go = () => {
      gsap.fromTo("#fake-web", { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.22 });
    };
    return (
      <div className="h-full flex flex-col">
        <div className="flex items-center gap-2 mb-3 border border-slate-700 rounded-lg p-2 bg-[#151822]">
          <Globe className="w-4 h-4 text-blue-400" />
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 bg-transparent outline-none text-slate-200 placeholder:text-slate-500"
            placeholder="Type a URL"
          />
          <button onClick={go} className="px-2 py-1 text-xs border border-slate-700 rounded bg-[#0f121a] hover:bg-[#181b25]">
            Go
          </button>
        </div>
        <div
          id="fake-web"
          className="rounded-lg border border-slate-700 p-6 text-center text-slate-300 flex-1 flex flex-col items-center justify-center bg-[#0f121a]"
        >
          <p className="text-base sm:text-lg">Simulated page</p>
          <p className="text-xs opacity-80 mt-1">
            You entered: <span className="opacity-100 font-mono">{url}</span>
          </p>
        </div>
      </div>
    );
  }

  function RecycleApp({ items, onEmpty }) {
    return (
      <div className="h-full flex flex-col">
        <div className="mb-2 flex items-center gap-2">
          <button onClick={onEmpty} className="px-3 py-1 rounded border border-slate-700 bg-[#23171a] hover:bg-[#2b1b20] text-xs text-red-300">
            Empty Recycle Bin
          </button>
          <span className="text-xs opacity-70">{items.length} item(s)</span>
        </div>
        <div className="rounded-lg border border-slate-700 divide-y divide-slate-700 bg-[#0f121a]">
          {items.length === 0 ? (
            <div className="p-4 text-sm text-slate-400">Recycle Bin is empty.</div>
          ) : (
            items.map((it) => (
              <div key={it.id} className="p-3 text-sm">
                {it.name}
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  function CalendarInline() {
    const [month, setMonth] = useState(new Date());
    const today = new Date();
    const grid = useMemo(() => daysGrid(month), [month]);
    return (
      <div>
        <div className="flex items-center justify-between mb-2">
          <button onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))} className="p-1 rounded hover:bg-[#1b1f2b] border border-transparent hover:border-slate-700">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="font-medium">
            {month.toLocaleString("default", { month: "long" })} {month.getFullYear()}
          </div>
          <button onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))} className="p-1 rounded hover:bg-[#1b1f2b] border border-transparent hover:border-slate-700">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-xs text-slate-300">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
            <div key={d} className="text-center opacity-70">
              {d}
            </div>
          ))}
          {grid.map((g, i) => {
            const isToday = g.date.toDateString() === today.toDateString();
            return (
              <div
                key={i}
                className={`h-9 rounded flex items-center justify-center border border-slate-700 ${g.outside ? "opacity-40" : ""} ${
                  isToday ? "bg-[#1d2433] border-slate-600" : "bg-[#0f121a]"
                }`}
              >
                {g.date.getDate()}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  function SettingsApp() {
    return (
      <div className="grid grid-cols-2 gap-3">
        {[{ label: "Wi-Fi", icon: Wifi }, { label: "Sound", icon: Volume2 }, { label: "Battery Saver", icon: Battery }, { label: "Display", icon: Monitor }].map((s) => (
          <button key={s.label} className="flex items-center gap-2 p-3 rounded-lg border border-slate-700 bg-[#151822] hover:bg-[#1b1f2b]">
            <s.icon className="w-4 h-4" /> <span className="text-sm">{s.label}</span>
          </button>
        ))}
      </div>
    );
  }

  function MusicApp() {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <div className="w-40 h-40 rounded-lg bg-[#0f121a] border border-slate-700" />
        <div>
          Playing: <span className="font-medium">Lo-fi beats</span>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1 rounded border border-slate-700 bg-[#151822] hover:bg-[#1b1f2b]">Prev</button>
          <button className="px-3 py-1 rounded border border-slate-700 bg-[#151822] hover:bg-[#1b1f2b]">Play/Pause</button>
          <button className="px-3 py-1 rounded border border-slate-700 bg-[#151822] hover:bg-[#1b1f2b]">Next</button>
        </div>
      </div>
    );
  }

  function MailApp() {
    return (
      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-1 border-r border-slate-700 pr-3">
          {["Welcome!", "System Update", "Meeting 5pm", "Photos shared"].map((s, i) => (
            <div key={i} className="p-2 rounded hover:bg-[#1b1f2b] cursor-pointer">
              {s}
            </div>
          ))}
        </div>
        <div className="col-span-2">
          <h3 className="font-medium mb-2">Welcome!</h3>
          <p className="opacity-80">Thanks for trying the desktop simulation. All interactions are functional.</p>
        </div>
      </div>
    );
  }

  function GraphicPlaceholder({ name }) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center opacity-85">
          <div className="text-2xl font-semibold mb-2">{name}</div>
          <div className="text-sm text-slate-300">This is a placeholder demo window for {name}.</div>
        </div>
      </div>
    );
  }

  function DesktopIcon({ label, Icon, color, onDoubleClick }) {
    const ref = useRef(null);

    useEffect(() => {
      if (!ref.current) return;
      // Minimal idle float is fine; keep super subtle
      gsap.to(ref.current, { y: -1, duration: 2.2, repeat: -1, yoyo: true, ease: "sine.inOut" });
    }, []);

    return (
      <div ref={ref} onDoubleClick={onDoubleClick} className="cursor-default select-none w-28">
        {/* FLAT: no blur, no glow, just a quiet tile */}
        <div className="w-16 h-16 rounded-md border border-slate-700 bg-[#151822] hover:bg-[#1b1f2b] transition flex items-center justify-center">
          <Icon className={`w-7 h-7 ${color}`} />
        </div>
        <div className="mt-1 text-[12px] text-center leading-tight text-slate-100">{label}</div>
      </div>
    );
  }

  // ---------- RETURN JSX (desktop + taskbar + menus) ----------
  return (
    <div className="h-screen w-screen overflow-hidden bg-[#0e1118] text-slate-100 font-sans">
      {/* wallpaper (subtle, slightly darkened) */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2574&auto=format&fit=crop)",
          filter: "brightness(0.78) saturate(0.9)",
        }}
      />

      {/* no vignette / no glass overlay */}

      <Link to="/part3" className="absolute top-3 left-4 z-[1000] text-slate-300 hover:text-white text-sm">
        ← Back to Part 3
      </Link>

      {/* desktop grid area */}
      <div
        ref={desktopRef}
        className="relative z-10 h-full w-full p-6 grid grid-cols-[repeat(auto-fill,100px)] auto-rows-[120px] gap-4 content-start"
        onMouseDown={(e) => {
          if (e.target === desktopRef.current) {
            setStartOpen(false);
            setQsOpen(false);
            setCalOpen(false);
            setSearchPanel(false);
          }
        }}
      >
        {/* Desktop icons (folders/Recycling only) */}
        {desktopIcons.map((ic) => (
          <DesktopIcon
            key={ic.label}
            label={ic.label}
            Icon={ic.icon}
            color={ic.color}
            onDoubleClick={() => openApp(ic.app)}
          />
        ))}

        {/* render open windows */}
        <AnimatePresence>
          {openWins.map((w) => (
            <AppWindow key={w.id} win={w} />
          ))}
        </AnimatePresence>
      </div>

      {/* taskbar (kept as-is in structure; visuals flattened slightly) */}
      <div className="absolute left-0 right-0 bottom-0 z-[100] h-14 bg-[#0b0d13] border-t border-slate-800 flex items-center px-2">
        {/* Start (windows) */}
        <button
          className={`w-11 h-11 rounded-md flex items-center justify-center hover:bg-[#151822] ${startOpen ? "bg-[#151822]" : ""}`}
          title="Start"
          onClick={() => {
            setStartOpen((v) => !v);
            setQsOpen(false);
            setCalOpen(false);
            setSearchPanel(false);
          }}
        >
          <FaWindows className="w-5 h-5" />
        </button>

        {/* Search */}
        <button
          className={`ml-1 w-11 h-11 rounded-md flex items-center justify-center hover:bg-[#151822] ${searchPanel ? "bg-[#151822]" : ""}`}
          title="Search"
          onClick={() => {
            setSearchPanel((v) => !v);
            setStartOpen(false);
            setQsOpen(false);
            setCalOpen(false);
          }}
        >
          <Search className="w-5 h-5" />
        </button>

        {/* Pinned icons (left side) */}
        <div className="flex items-center gap-1 ml-2">
          {[
            { title: "Explorer", Icon: FaFolder, color: "text-amber-400" },
            { title: "Browser", Icon: EdgeIcon, color: "" },
            { title: "Chrome", Icon: ChromeIcon, color: "" },
            { title: "Brave", Icon: BraveIcon, color: "" },
            { title: "Photoshop", Icon: PhotoshopIcon, color: "" },
            { title: "Illustrator", Icon: IllustratorIcon, color: "" },
            { title: "VSCode", Icon: VscodeIcon, color: "" },
            { title: "Telegram", Icon: TelegramIcon, color: "" },
            { title: "WhatsApp", Icon: WhatsappIcon, color: "" },
            { title: "LinkedIn", Icon: LinkedInIcon, color: "" },
          ].map((btn) => {
            const name = btn.title;
            const active = isOpen(
              name === "Chrome"
                ? "Browser"
                : name === "VSCode"
                ? "Explorer"
                : name === "Photoshop"
                ? "Photoshop"
                : name === "Illustrator"
                ? "Illustrator"
                : name
            );
            const IconX = btn.Icon;
            return (
              <button
                key={name}
                title={name}
                className={`relative w-11 h-11 rounded-md flex items-center justify-center hover:bg-[#151822] ${active ? "bg-[#151822]" : ""}`}
                onClick={() => {
                  const mapName = name === "Chrome" ? "Browser" : name === "VSCode" ? "Explorer" : name;
                  const existing = openWins.find((w) => w.app === mapName);
                  if (existing) {
                    if (existing.minimized) restoreWin(existing.id);
                    else minimizeWin(existing.id);
                    focusWin(existing.id);
                  } else {
                    openApp(mapName);
                  }
                }}
              >
                <IconX className={`w-5 h-5 ${btn.color}`} />
                {active && <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-blue-400" />}
              </button>
            );
          })}
        </div>

        {/* spacer */}
        <div className="flex-1" />

        {/* quick settings */}
        <button
          className={`mx-1 px-2 h-11 rounded-md flex items-center gap-2 hover:bg-[#151822] ${qsOpen ? "bg-[#151822]" : ""}`}
          onClick={() => {
            setQsOpen((v) => !v);
            setStartOpen(false);
            setCalOpen(false);
            setSearchPanel(false);
          }}
          title="Quick settings"
        >
          <Wifi className="w-4 h-4" />
          <Volume2 className="w-4 h-4" />
          <Battery className="w-4 h-4" />
        </button>

        {/* clock / date (calendar popup) */}
        <button
          className={`px-3 h-11 rounded-md hover:bg-[#151822] ${calOpen ? "bg-[#151822]" : ""}`}
          onClick={() => {
            setCalOpen((v) => !v);
            setStartOpen(false);
            setQsOpen(false);
            setSearchPanel(false);
          }}
          title="Show calendar"
        >
          <div className="text-[11px] leading-4 text-right">
            <div>{now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
            <div className="opacity-70">{now.toLocaleDateString()}</div>
          </div>
        </button>
      </div>

      {/* Start menu */}
      <AnimatePresence>
        {startOpen && (
          <motion.div
            initial={{ y: 36, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 18, opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
            className="absolute left-3 bottom-16 w-[720px] rounded-lg bg-[#0f121a] border border-slate-800 shadow-[0_12px_40px_rgba(0,0,0,0.45)] overflow-hidden z-40"
          >
            <div className="p-4 border-b border-slate-800">
              <div className="flex items-center gap-2 border border-slate-800 rounded-md px-3 py-2 bg-[#0b0d13]">
                <Search className="w-4 h-4 text-slate-300" />
                <input
                  value={searchQ}
                  onChange={(e) => setSearchQ(e.target.value)}
                  placeholder="Search for apps"
                  className="flex-1 bg-transparent outline-none placeholder:text-slate-500 text-slate-200"
                />
              </div>
            </div>

            <div className="p-4 grid grid-cols-3 gap-4">
              <div>
                <div className="text-xs uppercase tracking-wide text-slate-400 mb-2">Pinned</div>
                <div className="grid grid-cols-4 gap-3">
                  {["Explorer", "Browser", "Documents", "Gallery", "Settings"].map((name) => {
                    const def =
                      name === "Documents"
                        ? APP_DEFS.Documents
                        : name === "Gallery"
                        ? APP_DEFS.Gallery
                        : ALL_APPS.find((a) => a.name === name) || APP_DEFS[name];
                    if (!def) return null;
                    const IconX = name === "Explorer" ? FaFolder : def.icon;
                    return (
                      <button
                        key={name}
                        onClick={() => openApp(name)}
                        className="p-3 rounded-md border border-slate-800 bg-[#0b0d13] hover:bg-[#131722] flex flex-col items-center"
                        title={name}
                      >
                        <IconX className={`w-6 h-6 ${def.color}`} />
                        <span className="mt-1 text-xs text-slate-200">{name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="col-span-2">
                <div className="text-xs uppercase tracking-wide text-slate-400 mb-2">All apps</div>
                <div className="grid grid-cols-3 gap-2 max-h-60 overflow-auto pr-2">
                  {ALL_APPS.map((a) => {
                    const IconX = a.name === "Explorer" ? FaFolder : a.icon;
                    return (
                      <button
                        key={a.name}
                        onClick={() => openApp(a.name)}
                        className="flex items-center gap-2 p-2 rounded-md border border-slate-800 bg-[#0b0d13] hover:bg-[#131722]"
                      >
                        <IconX className={`w-5 h-5 ${a.color}`} />
                        <span className="text-sm text-slate-200">{a.name}</span>
                      </button>
                    );
                  })}
                  {/* common apps */}
                  <div className="col-span-3 pt-2 text-xs text-slate-400">Common apps</div>
                  <div className="flex items-center gap-2 col-span-3 flex-wrap">
                    <button onClick={() => openApp("Photoshop")} className="p-2 rounded-md border border-slate-800 bg-[#0b0d13] hover:bg-[#131722] flex items-center gap-2">
                      <PhotoshopIcon className="w-5 h-5" /> <span className="text-slate-200 text-sm">Photoshop</span>
                    </button>
                    <button onClick={() => openApp("Illustrator")} className="p-2 rounded-md border border-slate-800 bg-[#0b0d13] hover:bg-[#131722] flex items-center gap-2">
                      <IllustratorIcon className="w-5 h-5" /> <span className="text-slate-200 text-sm">Illustrator</span>
                    </button>
                    <button onClick={() => openApp("Browser")} className="p-2 rounded-md border border-slate-800 bg-[#0b0d13] hover:bg-[#131722] flex items-center gap-2">
                      <EdgeIcon className="w-5 h-5" /> <span className="text-slate-200 text-sm">Edge</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search panel */}
      <AnimatePresence>
        {searchPanel && (
          <motion.div
            initial={{ y: 36, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 18, opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
            className="absolute left-16 bottom-16 w-[560px] rounded-lg bg-[#0f121a] border border-slate-800 shadow-[0_12px_40px_rgba(0,0,0,0.45)] overflow-hidden z-40"
          >
            <div className="p-3 border-b border-slate-800 flex items-center gap-2">
              <Search className="w-4 h-4 text-slate-300" />
              <input
                value={searchQ}
                onChange={(e) => setSearchQ(e.target.value)}
                placeholder="Type to search apps"
                className="flex-1 bg-transparent outline-none placeholder:text-slate-500 text-slate-200"
              />
            </div>
            <div className="p-3 grid grid-cols-2 gap-2 max-h-60 overflow-auto">
              {filteredApps.length === 0 ? (
                <div className="text-sm text-slate-400 col-span-2">No results</div>
              ) : (
                filteredApps.map((a) => {
                  const IconX = a.name === "Explorer" ? FaFolder : a.icon;
                  return (
                    <button key={a.name} onClick={() => openApp(a.name)} className="flex items-center gap-2 p-2 rounded-md border border-slate-800 bg-[#0b0d13] hover:bg-[#131722]">
                      <IconX className={`w-5 h-5 ${a.color}`} />
                      <span className="text-sm text-slate-200">{a.name}</span>
                    </button>
                  );
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick settings */}
      <AnimatePresence>
        {qsOpen && (
          <motion.div
            initial={{ y: 36, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 18, opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
            className="absolute right-3 bottom-16 w-[340px] rounded-lg bg-[#0f121a] border border-slate-800 shadow-[0_12px_40px_rgba(0,0,0,0.45)] overflow-hidden z-40"
          >
            <div className="grid grid-cols-2 gap-2 p-3">
              {[{ label: "Wi-Fi", icon: Wifi }, { label: "Volume", icon: Volume2 }, { label: "Battery", icon: Battery }, { label: "Power", icon: Power }].map((i) => (
                <button key={i.label} className="h-20 rounded-md border border-slate-800 bg-[#0b0d13] hover:bg-[#131722] flex flex-col items-center justify-center gap-2">
                  <i.icon className="w-5 h-5" />
                  <span className="text-xs text-slate-200">{i.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Calendar popup */}
      <AnimatePresence>
        {calOpen && (
          <motion.div
            initial={{ y: 36, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 18, opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
            className="absolute right-2 bottom-16 w-[320px] rounded-lg bg-[#0f121a] border border-slate-800 shadow-[0_12px_40px_rgba(0,0,0,0.45)] overflow-hidden p-3 z-40"
          >
            <CalendarInline />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
