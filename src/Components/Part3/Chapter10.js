import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHdd, FaFolder, FaFolderOpen, FaFileAlt,
  FaPlus, FaTrash, FaEdit, FaChevronRight, FaRegListAlt, FaChartBar, FaTerminal, FaHome, FaArrowLeft, FaArrowRight
} from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom'

/* ---------------- helpers ---------------- */
const uid = () => Math.random().toString(36).slice(2, 9);
const deep = (x) => JSON.parse(JSON.stringify(x));

const ICON = ({ item, open }) => {
  if (item.type === "drive") return <FaHdd className="text-blue-500" size={30} />;
  if (item.type === "folder") return open ? <FaFolderOpen className="text-amber-400" size={30} /> : <FaFolder className="text-amber-400" size={30} />;
  return <FaFileAlt className="text-gray-500" size={30} />;
};

const buildFS = () => ({
  id: "root",
  name: "This PC",
  type: "folder",
  children: [
    {
      id: "c", name: "Local Disk (C:)", type: "drive", children: [
        { id: "desk", name: "Desktop", type: "folder", children: [] },
        {
          id: "docs", name: "Documents", type: "folder", children: [
            { id: uid(), name: "Homework.docx", type: "file" },
            { id: uid(), name: "Project.pdf", type: "file" },
          ]
        },
        {
          id: "pics", name: "Pictures", type: "folder", children: [
            { id: uid(), name: "Vacation.png", type: "file" },
            { id: uid(), name: "Family.jpg", type: "file" },
          ]
        },
        {
          id: "down", name: "Downloads", type: "folder", children: [
            { id: uid(), name: "song.mp3", type: "file" },
          ]
        },
      ]
    },
    {
      id: "d", name: "Local Disk (D:)", type: "drive", children: [
        { id: uid(), name: "Games", type: "folder", children: [] },
        { id: uid(), name: "Software", type: "folder", children: [] },
      ]
    }
  ]
});

/* ---- lookup/mutations on the tree ---- */
const findNode = (node, id, path = []) => {
  if (node.id === id) return { node, path: [...path, node] };
  for (const ch of node.children || []) {
    const r = findNode(ch, id, [...path, node]);
    if (r) return r;
  }
  return null;
};
const addChild = (tree, parentId, child) => {
  const t = deep(tree);
  const rec = (n) => {
    if (n.id === parentId) {
      n.children ||= []; n.children.push(child); return true;
    }
    return (n.children || []).some(rec);
  };
  rec(t);
  return t;
};
const renameNode = (tree, id, name) => {
  const t = deep(tree);
  const rec = (n) => {
    if (n.id === id) { n.name = name; return true; }
    return (n.children || []).some(rec);
  };
  rec(t); return t;
};
const removeNode = (tree, id) => {
  const t = deep(tree);
  const rec = (n) => {
    if (!n.children) return null;
    const i = n.children.findIndex(c => c.id === id);
    if (i >= 0) return n.children.splice(i, 1)[0];
    for (const ch of n.children) {
      const r = rec(ch); if (r) return r;
    }
    return null;
  };
  const removed = rec(t);
  return { t, removed };
};
const moveNode = (tree, id, targetFolderId) => {
  const { t, removed } = removeNode(tree, id);
  if (!removed) return tree;
  return addChild(t, targetFolderId, removed);
};

/* ---------------- component ---------------- */
export default function ExplorerInteractive() {
  const navigate = useNavigate()
  const [fs, setFs] = useState(buildFS);
  const [currentId, setCurrentId] = useState("c");
  const [selectedId, setSelectedId] = useState(null);
  const [renamingId, setRenamingId] = useState(null);
  const [expanded, setExpanded] = useState(new Set(["c", "d"]));
  const [menu, setMenu] = useState(null); // {x,y,id}
  const [tasks, setTasks] = useState({ createdFolder: false, createdFile: false, renamed: false, deleted: false, moved: false });
  const [activeTab, setActiveTab] = useState("explorer"); // 'explorer', 'stats', 'terminal'
  const terminalInputRef = useRef(null);
  const [terminalHistory, setTerminalHistory] = useState([
    "Type 'help' to see available commands."
  ]);
  const [terminalInput, setTerminalInput] = useState("");

  const current = useMemo(() => findNode(fs, currentId)?.node, [fs, currentId]);
  const crumbs = useMemo(() => findNode(fs, currentId)?.path || [], [fs, currentId]);

  // keyboard shortcuts
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "F2" && selectedId) setRenamingId(selectedId);
      if (e.key === "Delete" && selectedId) onDelete(selectedId);
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "n") { e.preventDefault(); newFolder(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedId, fs, currentId]);

  const toggleExpand = (id) => {
    const n = new Set(expanded); n.has(id) ? n.delete(id) : n.add(id); setExpanded(n);
  };

  /* actions */
  const openFolder = (id) => { setCurrentId(id); setSelectedId(null); setRenamingId(null); };
  const newFolder = () => {
    const child = { id: uid(), name: "New Folder", type: "folder", children: [] };
    setFs(s => addChild(s, currentId, child));
    setSelectedId(child.id); setRenamingId(child.id);
    setTasks(t => ({ ...t, createdFolder: true }));
  };
  const newFile = () => {
    const child = { id: uid(), name: `New File ${Math.floor(Math.random() * 100)}.txt`, type: "file" };
    setFs(s => addChild(s, currentId, child));
    setSelectedId(child.id); setRenamingId(child.id);
    setTasks(t => ({ ...t, createdFile: true }));
  };
  const onRename = (id, name) => {
    setFs(s => renameNode(s, id, name || "Untitled")); setRenamingId(null);
    setTasks(t => ({ ...t, renamed: true }));
  };
  const onDelete = (id) => {
    setFs(s => removeNode(s, id).t); setSelectedId(null);
    setTasks(t => ({ ...t, deleted: true }));
  };
  const onDropInto = (targetId, e) => {
    e.preventDefault();
    const dragId = e.dataTransfer.getData("text/plain");
    if (!dragId || dragId === targetId) return;
    setFs(s => moveNode(s, dragId, targetId));
    setTasks(t => ({ ...t, moved: true }));
  };

  const handleTerminalCommand = (e) => {
    if (e.key === "Enter") {
      const command = terminalInput.trim();
      if (!command) return;

      const newHistory = [...terminalHistory, `> ${command}`];
      let output = "";

      const [cmd, ...args] = command.split(" ");
      const currentPath = crumbs.map(c => c.name).join("/") + "/";

      switch (cmd) {
        case "help":
          output = "Available commands: ls, cd [folder], mkdir [name], touch [name], rm [name], cls";
          break;
        case "ls":
          const childrenNames = (current?.children || []).map(ch => ch.name);
          output = childrenNames.length > 0 ? childrenNames.join("  ") : "This folder is empty.";
          break;
        case "cd":
          const targetName = args[0];
          const targetNode = (current?.children || []).find(ch => ch.name === targetName && ch.type === "folder");
          if (targetNode) {
            openFolder(targetNode.id);
            output = `Changed directory to ${targetName}`;
          } else {
            output = "Folder not found.";
          }
          break;
        case "mkdir":
          newFolder();
          output = "Created new folder.";
          break;
        case "touch":
          newFile();
          output = "Created new file.";
          break;
        case "rm":
          const fileToDelete = args[0];
          const nodeToDelete = (current?.children || []).find(ch => ch.name === fileToDelete);
          if (nodeToDelete) {
            onDelete(nodeToDelete.id);
            output = `Deleted ${fileToDelete}.`;
          } else {
            output = "File or folder not found.";
          }
          break;
        case "cls":
          setTerminalHistory(["Type 'help' to see available commands."]);
          setTerminalInput("");
          return;
        default:
          output = `Command not found: ${cmd}`;
      }
      setTerminalHistory([...newHistory, output]);
      setTerminalInput("");
    }
  };

  /* grid tile */
  const Tile = ({ item }) => {
    const isFolder = item.type !== "file";
    const isRename = renamingId === item.id;
    const inputRef = useRef(null);

    useEffect(() => {
      if (isRename && inputRef.current) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    }, [isRename]);

    return (
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className={`w-36 p-4 rounded-xl text-center cursor-pointer backdrop-blur-sm transition-all duration-200 ease-in-out
          ${selectedId === item.id ? "bg-white/80 ring-2 ring-blue-400 shadow-lg" : "bg-white/40 hover:bg-white/60 shadow"}`}
        draggable
        onDragStart={(e) => {
          e.dataTransfer.setData("text/plain", item.id);
          e.currentTarget.style.opacity = 0.5;
        }}
        onDragEnd={(e) => {
          e.currentTarget.style.opacity = 1;
        }}
        onDoubleClick={() => isFolder && openFolder(item.id)}
        onClick={() => setSelectedId(item.id)}
        onContextMenu={(e) => { e.preventDefault(); setMenu({ x: e.clientX, y: e.clientY, id: item.id }); }}
        onDragOver={(e) => { if (isFolder) e.preventDefault(); }}
        onDrop={(e) => { if (isFolder) onDropInto(item.id, e); }}
      >
        <div className="flex flex-col items-center gap-1">
          <ICON item={item} open={expanded.has(item.id)} />
          {isRename ? (
            <input
              ref={inputRef}
              defaultValue={item.name}
              className="border border-gray-300 rounded px-1 text-xs w-full text-center bg-white/80"
              onBlur={(e) => onRename(item.id, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") onRename(item.id, e.currentTarget.value);
                if (e.key === "Escape") setRenamingId(null);
              }}
            />
          ) : (
            <div className="text-xs font-semibold text-gray-800 truncate w-full text-center mt-1">{item.name}</div>
          )}
        </div>
      </motion.div>
    );
  };

  /* left tree row */
  const TreeRow = ({ node, depth = 0 }) => {
    const open = expanded.has(node.id);
    const isFolderLike = node.type !== "file";
    return (
      <div className="text-sm">
        <div
          className={`flex items-center gap-2 px-2 py-1 rounded-md transition-colors duration-150
            ${currentId === node.id ? "bg-blue-200/50" : "hover:bg-blue-50/50"}`}
          onClick={() => isFolderLike && (toggleExpand(node.id), setCurrentId(node.id))}
          onDoubleClick={() => isFolderLike && openFolder(node.id)}
          onContextMenu={(e) => { e.preventDefault(); setMenu({ x: e.clientX, y: e.clientY, id: node.id }); }}
          style={{ paddingLeft: 6 + depth * 12 }}
        >
          <span className="text-gray-400">{isFolderLike ? (open ? "▾" : "▸") : ""}</span>
          <ICON item={node} open={open} />
          <span className="font-medium text-gray-700">{node.name}</span>
        </div>
        <AnimatePresence>
          {open && (node.children || []).map(ch => (
            <motion.div
              key={ch.id}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <TreeRow node={ch} depth={depth + 1} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    );
  };

  const totalFiles = useMemo(() => {
    let count = 0;
    const countFiles = (node) => {
      if (node.type === "file") {
        count++;
      } else if (node.children) {
        node.children.forEach(countFiles);
      }
    };
    countFiles(fs);
    return count;
  }, [fs]);

  const totalFolders = useMemo(() => {
    let count = 0;
    const countFolders = (node) => {
      if (node.type !== "file" && node.id !== "root") {
        count++;
      }
      if (node.children) {
        node.children.forEach(countFolders);
      }
    };
    countFolders(fs);
    return count;
  }, [fs]);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-200 to-gray-400 p-8 flex flex-col items-center">
      <div className="flex justify-center mb-3 mt-2">
        <Link
          to="/parts/prt3"
          className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-md border border-gray-200 hover:bg-gray-100 transition"
        >
          <FaHome className="mr-2 text-lg text-indigo-600" />
          Home
        </Link>
      </div>
      <h1 className="text-4xl font-extrabold mb-6 text-center text-gray-800 tracking-wide">
        Chapter 10: <span className="text-blue-600">File System Explorer</span>
      </h1>

      <div className="w-full max-w-7xl grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <div className="col-span-3 bg-white/40 rounded-3xl shadow-xl backdrop-blur-lg border border-white/50 p-5 h-full">
          <div className="font-bold text-xl mb-3 text-gray-700">Navigation</div>
          <TreeRow node={fs} />
        </div>

        {/* Main Content */}
        <div className="col-span-9">
          <div className="bg-white/40 rounded-3xl shadow-xl backdrop-blur-lg border border-white/50 p-6">

            {/* Tabs */}
            <div className="flex gap-2 mb-4">
              <button
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors duration-200 ${activeTab === "explorer" ? "bg-white/80 text-blue-600 shadow-md" : "text-gray-600 hover:bg-white/50"}`}
                onClick={() => setActiveTab("explorer")}
              >
                <FaRegListAlt /> Explorer
              </button>
              <button
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors duration-200 ${activeTab === "stats" ? "bg-white/80 text-blue-600 shadow-md" : "text-gray-600 hover:bg-white/50"}`}
                onClick={() => setActiveTab("stats")}
              >
                <FaChartBar /> Dashboard
              </button>
              <button
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors duration-200 ${activeTab === "terminal" ? "bg-white/80 text-blue-600 shadow-md" : "text-gray-600 hover:bg-white/50"}`}
                onClick={() => setActiveTab("terminal")}
              >
                <FaTerminal /> Terminal
              </button>
            </div>

            {activeTab === "explorer" && (
              <>
                {/* Breadcrumb / Path */}
                <div className="flex items-center flex-wrap gap-1 text-sm bg-white/70 rounded-full px-4 py-2 mb-4 shadow-sm">
                  {crumbs.map((c, i) => (
                    <span key={c.id} className="flex items-center">
                      <button className={`px-2 py-1 rounded-full hover:bg-gray-100/50 transition-colors ${i === crumbs.length - 1 ? "font-bold text-gray-800" : "text-gray-600"}`} onClick={() => openFolder(c.id)}>{c.name}</button>
                      {i < crumbs.length - 1 && <FaChevronRight className="mx-1 text-gray-500" size={12} />}
                    </span>
                  ))}
                </div>

                {/* Toolbar */}
                <div className="flex flex-wrap gap-3 mb-5">
                  <button className="flex items-center gap-1 text-sm bg-blue-600 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-700 transition-colors" onClick={newFolder}><FaPlus /> New Folder</button>
                  <button className="flex items-center gap-1 text-sm bg-emerald-600 text-white px-4 py-2 rounded-full shadow-md hover:bg-emerald-700 transition-colors" onClick={newFile}><FaPlus /> New File</button>
                  <button className="flex items-center gap-1 text-sm bg-amber-500 text-white px-4 py-2 rounded-full shadow-md disabled:opacity-40" disabled={!selectedId} onClick={() => selectedId && setRenamingId(selectedId)}><FaEdit /> Rename (F2)</button>
                  <button className="flex items-center gap-1 text-sm bg-rose-500 text-white px-4 py-2 rounded-full shadow-md disabled:opacity-40" disabled={!selectedId} onClick={() => selectedId && onDelete(selectedId)}><FaTrash /> Delete</button>
                </div>

                {/* Grid */}
                <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 relative min-h-[300px]"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => onDropInto(currentId, e)}
                  onClick={(e) => {
                    if (e.target.closest('.w-36')) return;
                    setSelectedId(null);
                  }}
                >
                  <AnimatePresence>
                    {(current?.children || []).map((it) => (
                      <Tile key={it.id} item={it} />
                    ))}
                  </AnimatePresence>
                </motion.div>
              </>
            )}

            {activeTab === "stats" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white/70 rounded-2xl p-6 shadow-md"
              >
                <h3 className="font-bold text-2xl mb-4 text-gray-800">System Dashboard</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-xl">
                    <h4 className="font-semibold text-blue-700">Total Files</h4>
                    <p className="text-4xl font-extrabold text-blue-900 mt-2">{totalFiles}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-xl">
                    <h4 className="font-semibold text-green-700">Total Folders</h4>
                    <p className="text-4xl font-extrabold text-green-900 mt-2">{totalFolders}</p>
                  </div>
                  <div className="col-span-full bg-yellow-50 p-4 rounded-xl">
                    <h4 className="font-semibold text-yellow-700">Learning Tasks Status</h4>
                    <ul className="space-y-2 mt-2">
                      <li><span className="text-lg">{tasks.createdFolder ? "✅" : "⬜"}</span> Create a new folder</li>
                      <li><span className="text-lg">{tasks.createdFile ? "✅" : "⬜"}</span> Create a new file</li>
                      <li><span className="text-lg">{tasks.renamed ? "✅" : "⬜"}</span> Rename an item</li>
                      <li><span className="text-lg">{tasks.moved ? "✅" : "⬜"}</span> Drag an item into a folder</li>
                      <li><span className="text-lg">{tasks.deleted ? "✅" : "⬜"}</span> Delete an item</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "terminal" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-800 text-gray-200 rounded-xl p-4 font-mono shadow-xl"
                onClick={() => terminalInputRef.current?.focus()}
              >
                <div className="h-64 overflow-y-auto pr-2">
                  {terminalHistory.map((line, index) => (
                    <div key={index} className="whitespace-pre-wrap">{line}</div>
                  ))}
                </div>
                <div className="flex items-center mt-2">
                  <span className="text-green-400">user@explorer:~${crumbs.map(c => c.name).join("/")}</span>
                  <input
                    ref={terminalInputRef}
                    className="flex-1 bg-transparent border-none outline-none text-white ml-2 caret-white"
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    onKeyDown={handleTerminalCommand}
                    spellCheck="false"
                  />
                </div>
              </motion.div>
            )}

          </div>
        </div>
      </div>

      {/* Context menu */}
      <AnimatePresence>
        {menu && (
          <motion.ul
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.1 }}
            className="fixed z-50 bg-white/90 shadow-2xl rounded-xl p-2 text-sm backdrop-blur-md"
            style={{ top: menu.y, left: menu.x }}
            onMouseLeave={() => setMenu(null)}
          >
            <li><button className="px-4 py-2 rounded-md hover:bg-gray-100 w-full text-left"
              onClick={() => { const id = menu.id; setMenu(null); const item = findNode(fs, id)?.node; if (item?.type !== "file") openFolder(id); }}>
              ▶️ Open
            </button></li>
            <li><button className="px-4 py-2 rounded-md hover:bg-gray-100 w-full text-left"
              onClick={() => { setRenamingId(menu.id); setMenu(null); }}>
              ✏️ Rename
            </button></li>
            <li><button className="px-4 py-2 rounded-md hover:bg-gray-100 w-full text-left text-rose-600"
              onClick={() => { onDelete(menu.id); setMenu(null); }}>
              🗑️ Delete
            </button></li>
            <hr className="my-2 border-gray-200" />
            <li><button className="px-4 py-2 rounded-md hover:bg-gray-100 w-full text-left" onClick={() => { newFolder(); setMenu(null); }}>📁 New Folder</button></li>
            <li><button className="px-4 py-2 rounded-md hover:bg-gray-100 w-full text-left" onClick={() => { newFile(); setMenu(null); }}>📄 New File</button></li>
            <hr className="my-2 border-gray-200" />
            <li><button className="px-4 py-2 rounded-md hover:bg-gray-100 w-full text-left" onClick={() => setMenu(null)}>ℹ️ Properties… (demo)</button></li>
          </motion.ul>
        )}
      </AnimatePresence>
      <div className="flex justify-between items-center mt-4 p-4 bg-gray-100 rounded-lg shadow-md">
        <button
          onClick={() => navigate('/part3/chapters/ch9')}
          className="flex items-center gap-2 px-4 py-2 bg-purple-200 hover:bg-purple-300 text-purple-900 rounded-lg shadow transition"
        >
          <FaArrowLeft />
          Previous
        </button>

        <button
          onClick={() => navigate('/part3/chapters/ch10')}
          className="flex items-center gap-2 px-4 py-2 bg-green-200 hover:bg-green-300 text-green-900 rounded-lg shadow transition"
        >
          Next
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
}