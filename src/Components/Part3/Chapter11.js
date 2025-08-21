    import React, { useEffect, useMemo, useRef, useState } from "react";
    import { motion, AnimatePresence } from "framer-motion";
    import {
    Home,
    Scissors,
    Copy,
    Clipboard,
    Trash2,
    File,
    Folder,
    Sparkles,
    Undo2,
    } from "lucide-react";

    /**
     * Chapter 11 – Copy, Cut, Paste, Delete (bounded draggables)
     * - Drag constrained inside each Zone using framer-motion's dragConstraints (zone ref)
     * - All original features preserved
     */

    export default function Chapter11Pro() {
    /** ---------- DATA MODELS ---------- */
    const [desktop, setDesktop] = useState([
        makeFile("MyDocument.txt"),
        makeFile("Notes.md"),
        makeFile("Photo.png"),
    ]);
    const [folder, setFolder] = useState([makeFile("Report.docx")]);

    // selection, clipboard, and history
    const [selectedIds, setSelectedIds] = useState(new Set());
    const [clipboard, setClipboard] = useState({ items: [], mode: null }); // mode: "copy" | "cut" | null
    const [history, setHistory] = useState([]);

    // UI/FX
    const [toast, setToast] = useState(null);
    const [burstAt, setBurstAt] = useState(null); // {x,y} for confetti
    const [hoverZone, setHoverZone] = useState(null); // "desktop" | "folder" | null

    // refs / bounds
    const desktopRef = useRef(null);
    const folderRef = useRef(null);

    /** ---------- HELPERS ---------- */
    function makeFile(name) {
        return { id: cryptoRandom(), name };
    }
    function cryptoRandom() {
        return Math.random().toString(36).slice(2) + Date.now().toString(36);
    }

    const isMac =
        typeof navigator !== "undefined" &&
        /Mac|iPod|iPhone|iPad/.test(navigator.platform);

    function showToast(text) {
        setToast(text);
        const t = setTimeout(() => setToast(null), 1400);
        return () => clearTimeout(t);
    }

    function pushHistory(entry) {
        setHistory((h) =>
        [{ id: cryptoRandom(), time: new Date(), ...entry }, ...h].slice(0, 12)
        );
    }

    /** ---------- SELECTION ---------- */
    const toggleSelect = (id, multi = false) => {
        setSelectedIds((prev) => {
        const next = new Set(multi ? prev : []);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        return next;
        });
    };
    const clearSelection = () => setSelectedIds(new Set());

    /** ---------- FINDERS ---------- */
    const removeFrom = (list, ids) => list.filter((f) => !ids.has(f.id));

    /** ---------- KEYBOARD SHORTCUTS ---------- */
    useEffect(() => {
        const handler = (e) => {
        const mod = isMac ? e.metaKey : e.ctrlKey;
        if (mod && e.key.toLowerCase() === "c") {
            e.preventDefault();
            doCopy();
        } else if (mod && e.key.toLowerCase() === "x") {
            e.preventDefault();
            doCut();
        } else if (mod && e.key.toLowerCase() === "v") {
            e.preventDefault();
            doPaste();
        } else if (e.key === "Delete" || (isMac && e.key === "Backspace")) {
            e.preventDefault();
            doDelete();
        } else if (mod && e.key.toLowerCase() === "z") {
            e.preventDefault();
            doUndo();
        }
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedIds, clipboard, desktop, folder]);

    /** ---------- COMMANDS ---------- */
    const doCopy = () => {
        if (selectedIds.size === 0) return showToast("Nothing selected");
        const items = getSelectedFiles();
        setClipboard({ items, mode: "copy" });
        pushHistory({ action: "Copy", detail: items.map((i) => i.name).join(", ") });
        showToast(`Copied ${items.length} item${items.length > 1 ? "s" : ""}`);
    };

    const doCut = () => {
        if (selectedIds.size === 0) return showToast("Nothing selected");
        const items = getSelectedFiles();
        setClipboard({ items, mode: "cut" });
        // Visually dim cut items by removing them and showing ghost in clipboard
        const ids = new Set(items.map((i) => i.id));
        setDesktop((d) => removeFrom(d, ids));
        setFolder((f) => removeFrom(f, ids));
        clearSelection();
        pushHistory({
        action: "Cut",
        detail: items.map((i) => i.name).join(", "),
        });
        showToast(`Cut ${items.length} item${items.length > 1 ? "s" : ""}`);
    };

    const doPaste = (target = hoverZone || "desktop") => {
        if (!clipboard.mode || clipboard.items.length === 0)
        return showToast("Clipboard empty");
        const items = clipboard.items.map((it) => ({ ...it, id: cryptoRandom() }));

        const pasteInto = (setter) =>
        setter((curr) => {
            const placed = layoutInto(curr, items);
            return placed;
        });

        if (target === "folder") pasteInto(setFolder);
        else pasteInto(setDesktop);

        // confetti burst center (approx) of target zone
        const rect = (target === "folder" ? folderRef : desktopRef).current?.getBoundingClientRect();
        if (rect) setBurstAt({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
        setTimeout(() => setBurstAt(null), 900);

        pushHistory({ action: "Paste", detail: `${items.length} item(s) → ${target}` });

        if (clipboard.mode === "copy") {
        showToast(`Pasted ${items.length} item${items.length > 1 ? "s" : ""}`);
        setClipboard({ items: [], mode: null });
        } else if (clipboard.mode === "cut") {
        showToast(`Moved ${items.length} item${items.length > 1 ? "s" : ""}`);
        setClipboard({ items: [], mode: null });
        }
    };

    const doDelete = () => {
        if (selectedIds.size === 0) {
        if (clipboard.items.length) {
            setClipboard({ items: [], mode: null });
            pushHistory({ action: "Clear Clipboard", detail: "" });
            return showToast("Clipboard cleared");
        }
        return showToast("Nothing selected");
        }
        const ids = new Set([...selectedIds]);
        setDesktop((d) => removeFrom(d, ids));
        setFolder((f) => removeFrom(f, ids));
        pushHistory({ action: "Delete", detail: `${ids.size} item(s)` });
        clearSelection();
        showToast("Deleted");
    };

    const doUndo = () => {
        // Simple demonstration: restore last clipboard (if any) onto desktop
        if (clipboard.items.length) {
        setDesktop((d) =>
            layoutInto(d, clipboard.items.map((i) => ({ ...i, id: cryptoRandom() })))
        );
        setClipboard({ items: [], mode: null });
        pushHistory({ action: "Undo (from Clipboard)", detail: "" });
        showToast("Undo from clipboard");
        return;
        }
        showToast("Nothing to undo");
    };

    function layoutInto(current, incoming) {
        // place incoming after current with grid positions (virtual)
        const combined = [...current];
        const count = combined.length;
        const placed = incoming.map((it, idx) => {
        const n = count + idx;
        return { ...it, _gridIndex: n };
        });
        return [...combined, ...placed];
    }

    function getSelectedFiles() {
        const inDesk = desktop.filter((f) => selectedIds.has(f.id));
        const inFold = folder.filter((f) => selectedIds.has(f.id));
        return [...inDesk, ...inFold];
    }

    /** ---------- DRAG & DROP ---------- */
    const onDragStart = (zone) => () => {
        setHoverZone(zone);
    };

    const onDragEnd = (file, zone) => (_e, info) => {
        setHoverZone(null);
        const overFolder = isOver(info.point, folderRef.current);
        const overDesktop = isOver(info.point, desktopRef.current);

        // if dropped over the *other* zone → move there
        if (zone === "desktop" && overFolder) {
        setDesktop((d) => d.filter((x) => x.id !== file.id));
        setFolder((f) => layoutInto(f, [{ ...file }]));
        pushHistory({ action: "Move", detail: `${file.name} → folder` });
        showToast("Moved to Folder");
        burstAtPoint(info.point);
        // clean selection state
        setSelectedIds((s) => {
            const n = new Set(s);
            n.delete(file.id);
            return n;
        });
        return;
        }
        if (zone === "folder" && overDesktop) {
        setFolder((d) => d.filter((x) => x.id !== file.id));
        setDesktop((f) => layoutInto(f, [{ ...file }]));
        pushHistory({ action: "Move", detail: `${file.name} → desktop` });
        showToast("Moved to Desktop");
        burstAtPoint(info.point);
        setSelectedIds((s) => {
            const n = new Set(s);
            n.delete(file.id);
            return n;
        });
        return;
        }
        // else: snap inside its zone (handled by layout grid visuals)
    };

    function isOver(point, el) {
        if (!el) return false;
        const r = el.getBoundingClientRect();
        return point.x >= r.left && point.x <= r.right && point.y >= r.top && point.y <= r.bottom;
    }

    function burstAtPoint(p) {
        setBurstAt({ x: p.x, y: p.y });
        setTimeout(() => setBurstAt(null), 900);
    }

    /** ---------- RENDER ---------- */
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex flex-col items-center p-6">
        {/* Top Bar */}
        <motion.div
            className="flex items-center justify-between w-full max-w-6xl mb-6"
            initial={{ y: -24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
        >
            <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow hover:shadow-md">
            <Home className="text-indigo-600 w-5 h-5" />
            <span className="text-indigo-700 font-semibold">Home</span>
            </button>
            <div className="flex gap-2">
            <kbd className="px-2 py-1 bg-white rounded shadow text-xs">{isMac ? "⌘" : "Ctrl"}+C</kbd>
            <kbd className="px-2 py-1 bg-white rounded shadow text-xs">{isMac ? "⌘" : "Ctrl"}+X</kbd>
            <kbd className="px-2 py-1 bg-white rounded shadow text-xs">{isMac ? "⌘" : "Ctrl"}+V</kbd>
            <kbd className="px-2 py-1 bg-white rounded shadow text-xs">Del</kbd>
            <kbd className="px-2 py-1 bg-white rounded shadow text-xs">{isMac ? "⌘" : "Ctrl"}+Z</kbd>
            </div>
        </motion.div>

        {/* Title + Concept Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full max-w-6xl">
            <motion.div
            className="lg:col-span-2 bg-white/80 backdrop-blur p-6 rounded-2xl shadow"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            >
            <h1 className="text-3xl font-bold mb-2">Chapter 11: Copy, Cut, Paste, and Delete</h1>
            <p className="text-gray-700">
                <b>Concept:</b> Core editing commands to manage files and text fast. Use them with
                keyboard shortcuts to work like a pro.
            </p>
            <div className="mt-4 grid sm:grid-cols-2 gap-4">
                <InfoCard icon={<Copy className="text-blue-500" />} title="Copy (Duplicate)" hotkey={`${isMac ? "⌘" : "Ctrl"} + C`}>
                Makes a duplicate. Original stays where it is.
                </InfoCard>
                <InfoCard icon={<Scissors className="text-red-500" />} title="Cut (Move)" hotkey={`${isMac ? "⌘" : "Ctrl"} + X`}>
                Prepares the item to move. Removes from source.
                </InfoCard>
                <InfoCard icon={<Clipboard className="text-green-600" />} title="Paste (Place)" hotkey={`${isMac ? "⌘" : "Ctrl"} + V`}>
                Inserts the copied/cut item at the target location.
                </InfoCard>
                <InfoCard icon={<Trash2 className="text-gray-700" />} title="Delete (Remove)" hotkey={`Del`}>
                Removes selected items (or clears clipboard if none selected).
                </InfoCard>
            </div>
            <div className="mt-4 rounded-xl bg-yellow-50 px-4 py-3 text-sm">
                <b>Analogy:</b> Copy = Xerox; Cut = pick up and move; Paste = place; Delete = trash.
            </div>
            </motion.div>

            {/* Clipboard & Actions */}
            <motion.div
            className="bg-white p-6 rounded-2xl shadow flex flex-col gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            >
            <h3 className="font-semibold flex items-center gap-2">
                <Sparkles className="w-5 h-5" /> Clipboard
            </h3>
            <div
                className={`rounded-xl border-2 border-dashed p-3 min-h-[64px] flex items-center justify-center
                ${clipboard.items.length ? (clipboard.mode === "cut" ? "bg-amber-50 border-amber-300" : "bg-emerald-50 border-emerald-300") : "bg-gray-50 border-gray-200"}`}
            >
                {clipboard.items.length ? (
                <span className="text-sm font-medium text-gray-700">
                    {clipboard.mode?.toUpperCase()} • {clipboard.items.length} item{clipboard.items.length > 1 ? "s" : ""}
                </span>
                ) : (
                <span className="text-sm text-gray-400">Empty</span>
                )}
            </div>
            <div className="grid grid-cols-2 gap-2">
                <ToolBtn onClick={doCopy} Icon={Copy} label="Copy" />
                <ToolBtn onClick={doCut} Icon={Scissors} label="Cut" />
                <ToolBtn onClick={() => doPaste("desktop")} Icon={Clipboard} label="Paste → Desktop" />
                <ToolBtn onClick={() => doPaste("folder")} Icon={Clipboard} label="Paste → Folder" />
                <ToolBtn onClick={doDelete} Icon={Trash2} label="Delete" />
                <ToolBtn onClick={doUndo} Icon={Undo2} label="Undo" />
            </div>

            {/* History */}
            <div className="mt-4">
                <p className="text-sm font-semibold mb-1">History</p>
                <div className="rounded-lg bg-gray-50 border border-gray-200 max-h-40 overflow-auto text-sm">
                {history.length === 0 ? (
                    <div className="p-3 text-gray-400">No actions yet</div>
                ) : (
                    history.map((h) => (
                    <div key={h.id} className="p-2 border-b last:border-b-0">
                        <span className="font-medium">{h.action}</span>
                        <span className="text-gray-500"> — {h.detail}</span>
                    </div>
                    ))
                )}
                </div>
            </div>
            </motion.div>
        </div>

        {/* INTERACTIVE PLAYGROUND */}
        <motion.div
            className="w-full max-w-6xl mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
        >
            {/* Desktop Zone */}
            <Zone
            title="Desktop"
            refEl={desktopRef}
            glow={hoverZone === "desktop"}
            hint="Drag files or paste here"
            bg="from-sky-100 to-sky-200"
            >
            <FileGrid
                zone="desktop"
                zoneRef={desktopRef}
                files={desktop}
                selectedIds={selectedIds}
                onToggleSelect={toggleSelect}
                onDragStart={onDragStart("desktop")}
                onDragEnd={onDragEnd}
            />
            </Zone>

            {/* Folder Zone */}
            <Zone
            title="Folder"
            refEl={folderRef}
            glow={hoverZone === "folder"}
            hint="Drop to move here"
            bg="from-indigo-100 to-indigo-200"
            icon={<Folder className="w-5 h-5 text-indigo-600" />}
            >
            <FileGrid
                zone="folder"
                zoneRef={folderRef}
                files={folder}
                selectedIds={selectedIds}
                onToggleSelect={toggleSelect}
                onDragStart={onDragStart("folder")}
                onDragEnd={onDragEnd}
            />
            </Zone>
        </motion.div>

        {/* Toast */}
        <AnimatePresence>
            {toast && (
            <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 40, opacity: 0 }}
                className="fixed bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/80 text-white rounded-full shadow"
            >
                {toast}
            </motion.div>
            )}
        </AnimatePresence>

        {/* Confetti Burst */}
        <AnimatePresence>
            {burstAt && <ConfettiBurst x={burstAt.x} y={burstAt.y} />}
        </AnimatePresence>
        </div>
    );
    }

    /** ---------- SUBCOMPONENTS ---------- */

    function InfoCard({ icon, title, hotkey, children }) {
    return (
        <motion.div
        whileHover={{ scale: 1.02 }}
        className="p-3 rounded-xl border bg-white/80 shadow flex items-start gap-3"
        >
        <div className="p-2 rounded-lg bg-gray-50">{icon}</div>
        <div className="flex-1">
            <div className="flex items-center justify-between">
            <p className="font-semibold">{title}</p>
            {hotkey && <kbd className="px-2 py-1 bg-gray-100 rounded text-xs shadow">{hotkey}</kbd>}
            </div>
            <p className="text-sm text-gray-600">{children}</p>
        </div>
        </motion.div>
    );
    }

    function ToolBtn({ onClick, Icon, label }) {
    return (
        <button
        onClick={onClick}
        className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-white border hover:bg-gray-50 shadow-sm"
        >
        <Icon className="w-4 h-4" />
        <span className="text-sm">{label}</span>
        </button>
    );
    }

    function Zone({ title, refEl, children, glow, hint, bg, icon }) {
    return (
        <div
        ref={refEl}
        className={`relative min-h-[320px] rounded-2xl p-4 border shadow-lg bg-gradient-to-b ${bg} overflow-hidden`}
        >
        <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
            {icon}
            <p className="font-semibold">{title}</p>
            </div>
            <p className="text-xs text-gray-600">{hint}</p>
        </div>
        <div
            className={`absolute inset-0 pointer-events-none rounded-2xl transition shadow-[0_0_0_3px_rgba(99,102,241,0)] ${
            glow ? "ring-4 ring-indigo-300/60" : ""
            }`}
        />
        <div className="relative">{children}</div>
        {/* Subtle blueprint grid */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_1px_1px,#000_1px,transparent_1px)] [background-size:20px_20px]" />
        </div>
    );
    }

    /**
     * FileGrid
     * - zoneRef: ref of the parent Zone (used for dragConstraints so items can't leave)
     * - files: array of file objects (no position saved; layout by grid index)
     */
    function FileGrid({ zone, zoneRef, files, selectedIds, onToggleSelect, onDragStart, onDragEnd }) {
    // compute positions by grid index to make snapping feel real
    const placed = useMemo(() => {
        return files.map((f, i) => {
        const col = i % 4;
        const row = Math.floor(i / 4);
        const x = 16 + col * 110;
        const y = 16 + row * 110;
        return { ...f, x, y };
        });
    }, [files]);

    return (
        <div className="relative min-h-[280px]">
        <AnimatePresence>
            {placed.map((file) => {
            const selected = selectedIds.has(file.id);
            return (
                <motion.div
                key={file.id}
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                className="absolute"
                style={{ left: file.x, top: file.y }}
                >
                <motion.div
                    drag
                    dragMomentum={false}
                    dragConstraints={zoneRef}         // <-- CONSTRAINS DRAG TO THE ZONE
                    dragElastic={0}                  // <-- prevents elastic escape
                    onDragStart={onDragStart}
                    onDragEnd={onDragEnd(file, zone)}
                    whileDrag={{ scale: 1.06, boxShadow: "0px 8px 24px rgba(0,0,0,0.25)" }}
                    className={`group w-[96px] select-none cursor-grab active:cursor-grabbing rounded-xl p-3 
                    ${selected ? "bg-white/80 ring-2 ring-indigo-400" : "bg-white/70 border"} shadow`}
                    onClick={(e) => onToggleSelect(file.id, e.shiftKey || e.metaKey || e.ctrlKey)}
                >
                    <div className="flex flex-col items-center">
                    <div className="p-3 rounded-lg bg-gradient-to-b from-white to-gray-100 shadow-inner">
                        <File className="w-7 h-7 text-blue-600" />
                    </div>
                    <p className="mt-2 text-[12px] font-medium text-center line-clamp-2">{file.name}</p>
                    </div>
                    {/* hover badge */}
                    <div className="opacity-0 group-hover:opacity-100 transition text-[10px] mt-1 text-center text-gray-500">
                    Drag me
                    </div>
                </motion.div>
                </motion.div>
            );
            })}
        </AnimatePresence>
        </div>
    );
    }

    function ConfettiBurst({ x, y }) {
    const particles = Array.from({ length: 28 }).map((_, i) => {
        const angle = (i / 28) * Math.PI * 2;
        const radius = 60 + Math.random() * 40;
        const dx = Math.cos(angle) * radius;
        const dy = Math.sin(angle) * radius;
        const duration = 0.6 + Math.random() * 0.5;
        const size = 4 + Math.random() * 6;
        return { id: i, dx, dy, duration, size };
    });

    return (
        <div className="fixed inset-0 pointer-events-none">
        {particles.map((p) => (
            <motion.span
            key={p.id}
            initial={{ x, y, opacity: 1, scale: 1 }}
            animate={{ x: x + p.dx, y: y + p.dy, opacity: 0, scale: 0.8 }}
            transition={{ duration: p.duration, ease: "easeOut" }}
            className="absolute rounded"
            style={{
                width: p.size,
                height: p.size,
                background:
                ["#6366F1", "#22C55E", "#F59E0B", "#EF4444", "#06B6D4"][p.id % 5],
            }}
            />
        ))}
        </div>
    );
    }
