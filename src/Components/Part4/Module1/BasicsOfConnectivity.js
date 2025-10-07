import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function ConnectivityVisualizer() {
  const [running, setRunning] = useState(true);
  const [speed, setSpeed] = useState(1); // 0.25 .. 3
  const [showWired, setShowWired] = useState(true);
  const [showWireless, setShowWireless] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const [selectedNode, setSelectedNode] = useState(null);

  const nodes = [
    { id: "router", label: "Router", x: 300, y: 60, type: "network" },
    { id: "laptop", label: "Laptop", x: 160, y: 180, type: "endpoint" },
    { id: "desktop", label: "Desktop", x: 440, y: 180, type: "endpoint" },
    { id: "printer", label: "Printer", x: 80, y: 300, type: "peripheral" },
    { id: "camera", label: "IP Camera", x: 520, y: 300, type: "iot" },
    { id: "phone", label: "Phone", x: 300, y: 320, type: "mobile" },
  ];

  const links = [
    { id: "l1", a: "router", b: "laptop", medium: "wireless" },
    { id: "l2", a: "router", b: "desktop", medium: "wired" },
    { id: "l3", a: "laptop", b: "printer", medium: "wired" },
    { id: "l4", a: "router", b: "camera", medium: "wireless" },
    { id: "l5", a: "router", b: "phone", medium: "wireless" },
  ];

  const nodeById = Object.fromEntries(nodes.map((n) => [n.id, n]));

  const packetRefs = useRef({});

  useEffect(() => {
  }, [running, speed, showWired, showWireless]);

  function delta(a, b) {
    return { dx: b.x - a.x, dy: b.y - a.y };
  }

  // Visual helpers
  function nodeColor(type) {
    switch (type) {
      case "network":
        return "bg-indigo-500 text-white";
      case "endpoint":
        return "bg-sky-500 text-white";
      case "peripheral":
        return "bg-emerald-500 text-white";
      case "iot":
        return "bg-amber-500 text-white";
      case "mobile":
        return "bg-fuchsia-500 text-white";
      default:
        return "bg-gray-400 text-white";
    }
  }

  // UI layout: left panel = canvas, right panel = controls & info
  return (
    <div className="p-4 md:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Canvas */}
      <div className="lg:col-span-2 bg-white/70 dark:bg-slate-900/60 rounded-2xl shadow-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold">Connectivity Visualizer</h2>
            <span className="text-sm text-slate-500">(Wired & Wireless — Live simulation)</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setRunning((r) => !r)}
              className="px-3 py-1 rounded-full border text-sm hover:bg-slate-50"
              aria-pressed={!running}
            >
              {running ? "Pause" : "Play"}
            </button>
            <div className="text-sm text-slate-500">Speed</div>
            <input
              aria-label="animation speed"
              type="range"
              min={0.25}
              max={3}
              step={0.25}
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-36"
            />
          </div>
        </div>

        <div className="relative w-full h-[420px] rounded-xl border border-slate-200/60 overflow-hidden bg-gradient-to-b from-slate-50 to-white">
          {/* SVG layer for links */}
          <svg viewBox="0 0 600 380" className="w-full h-full">
            {/* Draw links */}
            {links.map((link) => {
              const a = nodeById[link.a];
              const b = nodeById[link.b];
              const show = (link.medium === "wired" && showWired) || (link.medium === "wireless" && showWireless);
              if (!show) return null;

              const wired = link.medium === "wired";
              // For wireless draw a curved quadratic path
              const mx = (a.x + b.x) / 2;
              const my = (a.y + b.y) / 2 - (wired ? 0 : 40);
              const path = wired
                ? `M ${a.x} ${a.y} L ${b.x} ${b.y}`
                : `M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`;

              return (
                <g key={link.id}>
                  <path
                    d={path}
                    fill="none"
                    stroke={wired ? "#0f766e" : "#7c3aed"}
                    strokeWidth={wired ? 3 : 2}
                    strokeDasharray={wired ? "" : "8 6"}
                    opacity={0.9}
                  />

                  <motion.circle
                    initial={false}
                    animate={
                      running
                        ? { cx: [a.x, b.x, a.x], cy: [a.y, b.y, a.y] }
                        : { cx: [a.x], cy: [a.y] }
                    }
                    transition={{
                      repeat: Infinity,
                      duration: Math.max(1.2, 3 / speed),
                      ease: "linear",
                      repeatType: "loop",
                    }}
                    r={5}
                    fill={wired ? "#10b981" : "#8b5cf6"}
                    opacity={0.95}
                  />
                </g>
              );
            })}

            {/* Draw nodes on top */}
            {nodes.map((n) => (
              <g key={n.id} transform={`translate(${n.x - 36}, ${n.y - 18})`}>
                <rect
                  width={72}
                  height={36}
                  rx={10}
                  className={`${nodeColor(n.type)} shadow-md`}
                />
                <text x={36} y={22} textAnchor="middle" fontSize={12} fill="white">
                  {n.label}
                </text>
              </g>
            ))}
          </svg>

          {/* small floating tooltip for selected node */}
          {selectedNode && (
            <div className="absolute bottom-4 left-4 bg-white/90 p-3 rounded-lg shadow-md text-sm w-64">
              <div className="font-semibold">{selectedNode.label}</div>
              <div className="text-slate-600 text-xs mt-1">Type: {selectedNode.type}</div>
              <div className="text-slate-500 text-xs mt-2">Daily use: {dailyUseFor(selectedNode.type)}</div>
            </div>
          )}
        </div>

        {/* Legend and mini controls */}
        <div className="mt-3 flex items-center justify-between text-sm text-slate-600">
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={showWired} onChange={(e) => setShowWired(e.target.checked)} />
              Wired
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={showWireless} onChange={(e) => setShowWireless(e.target.checked)} />
              Wireless
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={showLabels} onChange={(e) => setShowLabels(e.target.checked)} />
              Labels
            </label>
          </div>

          <div className="text-xs text-slate-400">Tip: Click any node in the info panel to highlight it.</div>
        </div>
      </div>

      {/* Right panel: controls, concept, analogy, examples */}
      <aside className="space-y-4">
        <div className="bg-white/80 dark:bg-slate-900/60 p-4 rounded-2xl shadow">
          <h3 className="font-semibold">Basics of Connectivity</h3>
          <p className="text-sm text-slate-600 mt-2">
            Concept: How devices are linked together, both with and without wires. This panel explains the core ideas,
            shows analogies, and provides concrete daily-life examples that connect the visualization to reality.
          </p>
        </div>

        <div className="bg-white/80 dark:bg-slate-900/60 p-4 rounded-2xl shadow">
          <h4 className="font-semibold">Analogy</h4>
          <p className="text-sm text-slate-600 mt-2">
            Think of wired networks as roads — stable and predictable lanes (fiber, ethernet). Wireless networks are like
            flight paths — flexible and great for mobility but affected by weather and interference. Packets are like cars
            or planes carrying cargo.
          </p>
        </div>

        <div className="bg-white/80 dark:bg-slate-900/60 p-4 rounded-2xl shadow">
          <h4 className="font-semibold">Daily-life examples</h4>
          <ul className="text-sm text-slate-600 mt-2 list-disc pl-5 space-y-1">
            <li>Wired: Desktop connected to office switch (stable video conferencing).</li>
            <li>Wired: Printer using ethernet for large print jobs (reliable throughput).</li>
            <li>Wireless: Phone switching between Wi‑Fi and mobile data while on the move.</li>
            <li>Wireless: Smart camera streams video over Wi‑Fi; subject to interference from walls.</li>
          </ul>
        </div>

        <div className="bg-white/80 dark:bg-slate-900/60 p-4 rounded-2xl shadow">
          <h4 className="font-semibold">Common devices</h4>
          <div className="grid grid-cols-2 gap-2 text-sm mt-2">
            <div className="p-2 rounded-lg border">Router / Switch</div>
            <div className="p-2 rounded-lg border">Laptop / Desktop</div>
            <div className="p-2 rounded-lg border">Printer / NAS</div>
            <div className="p-2 rounded-lg border">IP Camera / IoT</div>
            <div className="p-2 rounded-lg border">Smartphone / Tablet</div>
            <div className="p-2 rounded-lg border">Access Point</div>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-slate-900/60 p-4 rounded-2xl shadow">
          <h4 className="font-semibold">Learning checkpoints</h4>
          <ol className="text-sm mt-2 list-decimal pl-5 text-slate-600 space-y-1">
            <li>Identify wired vs wireless links on a small network diagram.</li>
            <li>Explain when to choose wired (latency-sensitive) vs wireless (mobility).</li>
            <li>Recognize factors that degrade wireless performance (distance, obstacles, interference).</li>
          </ol>
        </div>

        {/* Small interactive list to select nodes */}
        <div className="bg-white/80 dark:bg-slate-900/60 p-3 rounded-2xl shadow">
          <h4 className="font-semibold mb-2">Select device</h4>
          <div className="flex flex-wrap gap-2">
            {nodes.map((n) => (
              <button
                key={n.id}
                onClick={() => setSelectedNode(n)}
                className="px-3 py-1 rounded-full border text-xs"
              >
                {n.label}
              </button>
            ))}
            <button onClick={() => setSelectedNode(null)} className="px-3 py-1 rounded-full border text-xs">
              Clear
            </button>
          </div>
        </div>
      </aside>

      {/* Footer: expandable deep-dive */}
      <div className="lg:col-span-3 mt-4 bg-white/70 dark:bg-slate-900/60 p-4 rounded-2xl shadow">
        <h4 className="font-semibold">Deep dive — How data actually flows</h4>
        <p className="text-sm text-slate-600 mt-2">
          Packets are units of data with headers that carry addresses. In wired networks packets travel through switches
          and routers using physical copper or fiber, which offer low packet loss and predictable latency. Wireless
          networks encapsulate packets into radio transmissions, which can be affected by signal strength, interference,
          and multi-path reflections. The visual simulator above demonstrates these differences by animating packets
          along wired straight paths and wireless curved paths. Increase speed to see traffic congestion effects.
        </p>
      </div>
    </div>
  );
}

// Helper used inside the component but defined after (keeps code tidy)
function dailyUseFor(type) {
  switch (type) {
    case "network":
      return "Connects multiple devices: home router, ISP gateway.";
    case "endpoint":
      return "Used for work, browsing, streaming — usually stable when wired.";
    case "peripheral":
      return "Office accessories like printers and scanners.";
    case "iot":
      return "Smart devices and cameras that stream small continuous data.";
    case "mobile":
      return "Handheld devices that often switch networks while moving.";
    default:
      return "Everyday device.";
  }
}
