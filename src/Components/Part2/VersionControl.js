import React, { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { FaHistory, FaCodeBranch, FaClipboard, FaArrowLeft, FaArrowRight, FaHome } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';

const content = {
  en: {
    home: "Home",
    title: "Understanding Version Control",
    concept: "Version Control Systems (VCS) are tools that track changes to files over time. Think of it as a 'save' button for your entire project, but with the ability to go back to any previous save.",
    analogy: "Imagine you're writing a story. A VCS is like having a magical notebook that saves a copy of your story every time you make a change. You can look at old versions, see what you changed, and even go back to a previous version if you don't like your new ideas. <strong>Git</strong> is the most popular VCS.",
    liveSandbox: "Interactive Git Simulation",
    instructions: "This sandbox simulates a simple version control system. Here’s how to use it: <ul><li><strong>Edit Files:</strong> Click on a file name to open it in the editor.</li><li><strong>Commit Changes:</strong> After editing, write a short message describing your changes and click 'Commit'. This saves a snapshot of your files.</li><li><strong>Create Branches:</strong> Give a new branch a name and click '+' to create a parallel timeline for your work.</li><li><strong>Switch Branches:</strong> Click on a branch name to switch to it. The files will change to how they were last saved in that branch.</li><li><strong>Merge Branches:</strong> Select a branch to merge into your current one. This combines the changes from both branches.</li><li><strong>Rewind History:</strong> Click on any commit in the timeline to go back to that point in time.</li></ul>",
    newCommitMsg: "Enter commit message...",
    commitBtn: "Commit Changes",
    createBranch: "New Branch Name",
    checkout: "Switch to",
    mergeBtn: "Merge into current branch",
    revertBtn: "Go to this commit",
    conflictTitle: "Merge Conflict!",
    resolved: "Resolved",
    cheatTitle: "Common Git Commands",
    examplesTitle: "Why is VCS so useful?",
    bestPracticesTitle: "Pro Tips for Version Control",
    copy: "Copy",
    history: "Commit History",
    branches: "Branches",
    previous: "Previous",
    next: "Next",
  },
  hi: {
    home: "होम",
    title: "वर्जन कंट्रोल को समझना",
    concept: "वर्जन कंट्रोल सिस्टम (VCS) ऐसे टूल होते हैं जो समय के साथ फाइलों में हुए बदलावों को ट्रैक करते हैं। इसे अपने पूरे प्रोजेक्ट के लिए एक 'सेव' बटन की तरह समझें, लेकिन किसी भी पिछले सेव पर वापस जाने की क्षमता के साथ।",
    analogy: "कल्पना कीजिए कि आप एक कहानी लिख रहे हैं। एक VCS एक जादुई नोटबुक की तरह है जो हर बार जब आप कोई बदलाव करते हैं तो आपकी कहानी की एक कॉपी सहेजता है। आप पुराने संस्करण देख सकते हैं, देख सकते हैं कि आपने क्या बदला है, और यदि आपको अपने नए विचार पसंद नहीं हैं तो पिछले संस्करण पर वापस भी जा सकते हैं। <strong>गिट</strong> सबसे लोकप्रिय VCS है।",
    liveSandbox: "इंटरैक्टिव गिट सिमुलेशन",
    instructions: "यह सैंडबॉक्स एक सरल संस्करण नियंत्रण प्रणाली का अनुकरण करता है। इसका उपयोग कैसे करें: <ul><li><strong>फ़ाइलें संपादित करें:</strong> संपादक में खोलने के लिए फ़ाइल नाम पर क्लिक करें।</li><li><strong>बदलाव सहेजें (कमिट):</strong> संपादन के बाद, अपने परिवर्तनों का वर्णन करते हुए एक संक्षिप्त संदेश लिखें और 'कमिट' पर क्लिक करें। यह आपकी फ़ाइलों का एक स्नैपशॉट सहेजता है।</li><li><strong>शाखाएँ बनाएँ:</strong> एक नई शाखा को एक नाम दें और अपने काम के लिए एक समानांतर टाइमलाइन बनाने के लिए '+' पर क्लिक करें।</li><li><strong>शाखाएँ बदलें:</strong> उस पर स्विच करने के लिए एक शाखा के नाम पर क्लिक करें। उस शाखा में अंतिम बार सहेजे जाने पर फ़ाइलें बदल जाएँगी।</li><li><strong>शाखाओं को मिलाएं (मर्ज):</strong> अपनी वर्तमान शाखा में विलय करने के लिए एक शाखा का चयन करें। यह दोनों शाखाओं के परिवर्तनों को जोड़ता है।</li><li><strong>इतिहास में वापस जाएं (रिवाइंड):</strong> उस समय के उस बिंदु पर वापस जाने के लिए टाइमलाइन में किसी भी कमिट पर क्लिक करें।</li></ul>",
    newCommitMsg: "कमिट संदेश दर्ज करें...",
    commitBtn: "बदलाव सहेजें",
    createBranch: "नई शाखा का नाम",
    checkout: "इस पर जाएं",
    mergeBtn: "वर्तमान शाखा में मर्ज करें",
    revertBtn: "इस कमिट पर जाएं",
    conflictTitle: "मर्ज में समस्या!",
    resolved: "हल हो गया",
    cheatTitle: "आम गिट कमांड्स",
    examplesTitle: "VCS इतना उपयोगी क्यों है?",
    bestPracticesTitle: "वर्जन कंट्रोल के लिए प्रो टिप्स",
    copy: "कॉपी",
    history: "कमिट का इतिहास",
    branches: "शाखाएँ",
    previous: "पिछला",
    next: "अगला",
  },
};

function shortId() {
  return Math.random().toString(16).slice(2, 8);
}

function now() {
  return new Date().toLocaleTimeString();
}

export default function VersionControlModule() {
  const [lang, setLang] = useState('en');
  const navigate = useNavigate();
  const t = (k) => content[lang][k] || content.en[k];

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === 'k') {
        event.preventDefault();
        setLang(prevLang => prevLang === 'en' ? 'hi' : 'en');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // --- Simulation state ---
  const [files, setFiles] = useState({
    "README.md": "# Magic App\nThis project demonstrates version control concepts.",
    "index.js": "console.log('Hello, world!');",
  });

  const initialCommit = {
    id: shortId(),
    message: "Initial commit",
    files: JSON.parse(JSON.stringify(files)),
    parent: null,
    branch: "main",
    time: now(),
  };

  const [commits, setCommits] = useState([initialCommit]);
  const [branches, setBranches] = useState({ main: initialCommit.id });
  const [currentBranch, setCurrentBranch] = useState("main");
  const [head, setHead] = useState(initialCommit.id); // HEAD points to commit id

  const [selectedFile, setSelectedFile] = useState("README.md");
  const [editorText, setEditorText] = useState(files[selectedFile]);
  const [commitMsg, setCommitMsg] = useState("");
  const [newBranchName, setNewBranchName] = useState("");
  const [mergeSource, setMergeSource] = useState(null);
  const [conflict, setConflict] = useState(null); // {file, ours, theirs}

  useEffect(() => {
    setEditorText(files[selectedFile] || "");
  }, [selectedFile, files]);

  // helper to find commit by id
  const findCommit = (id) => commits.find((c) => c.id === id);

  // Commit: snapshot files
  function doCommit(message) {
    if (!message || message.trim().length === 0) message = "(no message)";
    const snapshot = JSON.parse(JSON.stringify(files));
    const c = {
      id: shortId(),
      message,
      files: snapshot,
      parent: branches[currentBranch],
      branch: currentBranch,
      time: now(),
    };
    const nextCommits = [...commits, c];
    setCommits(nextCommits);
    // update branch pointer
    setBranches((b) => ({ ...b, [currentBranch]: c.id }));
    setHead(c.id);
    setCommitMsg("");
  }

  // Create branch pointing at current HEAD
  function createBranch(name) {
    if (!name) return;
    if (branches[name]) {
      alert("Branch already exists");
      return;
    }
    setBranches((b) => ({ ...b, [name]: head }));
    setNewBranchName("");
  }

  // Checkout branch
  function checkoutBranch(name) {
    if (!branches[name]) return;
    setCurrentBranch(name);
    const branchHead = branches[name];
    const c = findCommit(branchHead);
    if (c) {
      setFiles(JSON.parse(JSON.stringify(c.files)));
      setHead(c.id);
      setSelectedFile(Object.keys(c.files)[0]);
    }
  }

  // Simple merge: merge source branch into currentBranch
  function startMerge(sourceBranch) {
    if (!branches[sourceBranch]) return;
    setMergeSource(sourceBranch);
    const sourceCommit = findCommit(branches[sourceBranch]);
    const targetCommit = findCommit(branches[currentBranch]);

    // Detect conflicts (same file changed differently)
    const conflicts = [];
    const mergedFiles = { ...(targetCommit?.files || {}) };
    Object.keys(sourceCommit.files).forEach((fname) => {
      const ours = targetCommit.files[fname];
      const theirs = sourceCommit.files[fname];
      if (ours !== undefined && ours !== theirs) {
        // naive detection
        conflicts.push({ file: fname, ours, theirs });
      } else {
        mergedFiles[fname] = theirs;
      }
    });

    if (conflicts.length > 0) {
      setConflict(conflicts[0]);
    } else {
      // fast-forward-like merge: create a merge commit
      const mergeMsg = `Merge ${sourceBranch} into ${currentBranch}`;
      const c = {
        id: shortId(),
        message: mergeMsg,
        files: mergedFiles,
        parent: branches[currentBranch],
        branch: currentBranch,
        time: now(),
      };
      const nextCommits = [...commits, c];
      setCommits(nextCommits);
      setBranches((b) => ({ ...b, [currentBranch]: c.id }));
      setHead(c.id);
      setFiles(JSON.parse(JSON.stringify(mergedFiles)));
      setMergeSource(null);
    }
  }

  function resolveConflictWith(choice) {
    if (!conflict) return;
    const { file } = conflict;
    const targetCommit = findCommit(branches[currentBranch]);
    const sourceCommit = findCommit(branches[mergeSource]);
    const mergedFiles = { ...(targetCommit?.files || {}) };
    mergedFiles[file] = choice === "ours" ? targetCommit.files[file] : sourceCommit.files[file];

    // create merge commit
    const mergeMsg = `Merge ${mergeSource} into ${currentBranch} (conflict resolved)`;
    const c = {
      id: shortId(),
      message: mergeMsg,
      files: mergedFiles,
      parent: branches[currentBranch],
      branch: currentBranch,
      time: now(),
    };
    const nextCommits = [...commits, c];
    setCommits(nextCommits);
    setBranches((b) => ({ ...b, [currentBranch]: c.id }));
    setHead(c.id);
    setFiles(JSON.parse(JSON.stringify(mergedFiles)));
    setConflict(null);
    setMergeSource(null);
  }

  // Rewind to commit (checkout a past commit as HEAD but keep branch pointer to it)
  function rewindTo(commitId) {
    const c = findCommit(commitId);
    if (!c) return;
    setHead(c.id);
    setFiles(JSON.parse(JSON.stringify(c.files)));
    // Move current branch pointer to this commit (like a hard reset)
    setBranches((b) => ({ ...b, [currentBranch]: c.id }));
  }

  // UI helpers
  function updateFileInEditor(text) {
    setEditorText(text);
    setFiles((f) => ({ ...f, [selectedFile]: text }));
  }

  function copyToClipboard(text) {
    if (navigator && navigator.clipboard) {
      navigator.clipboard.writeText(text).then(
        () => {
          // small feedback handled by brief toast-like visual
          // we'll just flash a small animation
        },
        () => alert("Copy failed — try manually")
      );
    } else {
      alert("Clipboard not available in this browser");
    }
  }

  const commitNodes = useMemo(() => {
    return commits.map((c, idx) => ({ ...c, idx }));
  }, [commits]);

  // Command cheat sheet strings
  const cheatCommands = [
    { label: "Init repo", cmd: "git init" },
    { label: "Clone", cmd: "git clone <url>" },
    { label: "Check status", cmd: "git status" },
    { label: "Add", cmd: "git add <file>" },
    { label: "Commit", cmd: "git commit -m \"message\"" },
    { label: "Create branch", cmd: "git branch <name>" },
    { label: "Checkout branch", cmd: "git checkout <name>" },
    { label: "Merge", cmd: "git merge <branch>" },
    { label: "Revert", cmd: "git revert <commit>" },
  ];

  return (
    <div className="w-full min-h-screen p-6 bg-gray-50 text-slate-900">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
            <Link to="/" className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-md border border-gray-200 hover:bg-gray-100 transition">
              <FaHome className="mr-2 text-lg text-sky-600" />
              {t("home")}
            </Link>
            <div className="flex space-x-2">
              <button onClick={() => setLang("en")} className={`px-3 py-1 rounded-lg border font-semibold ${lang === "en" ? "bg-sky-600 text-white border-sky-600" : "bg-white text-gray-700 border-gray-300"} transition`}>EN</button>
              <button onClick={() => setLang("hi")} className={`px-3 py-1 rounded-lg border font-semibold ${lang === "hi" ? "bg-sky-600 text-white border-sky-600" : "bg-white text-gray-700 border-gray-300"} transition`}>हिं</button>
            </div>
        </div>
        <div className="flex flex-col md:flex-row items-start gap-6">
          {/* Left column: Intro / Controls */}
          <div className="md:w-1/3 w-full space-y-4">
            <div className="p-4 rounded-2xl shadow-md bg-white">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-extrabold">{t("title")}</h1>
                  <p className="mt-1 text-sm text-slate-600">{t("concept")}</p>
                </div>
              </div>

              <div className="mt-4">
                <div className="rounded-lg p-3 bg-sky-50 border border-sky-100">
                  <p className="text-slate-700 text-sm" dangerouslySetInnerHTML={{ __html: t("analogy") }} />
                </div>

                <div className="mt-3 text-sm text-slate-600" dangerouslySetInnerHTML={{ __html: t("instructions") }} />
              </div>
            </div>

            <div className="p-4 rounded-2xl shadow-md bg-white space-y-3">
              <h3 className="font-semibold">{t("cheatTitle")}</h3>
              <div className="grid grid-cols-1 gap-2">
                {cheatCommands.map((c) => (
                  <div key={c.cmd} className="flex items-center justify-between gap-2">
                    <div className="text-xs text-slate-700">{c.label}</div>
                    <div className="flex items-center gap-2">
                      <code className="text-xs px-2 py-1 bg-slate-100 rounded">{c.cmd}</code>
                      <button
                        className="text-xs px-2 py-1 rounded bg-sky-600 text-white"
                        onClick={() => copyToClipboard(c.cmd)}
                      >
                        {t("copy")}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl shadow-md bg-white space-y-3">
              <h3 className="font-semibold">{t("examplesTitle")}</h3>
              <ul className="text-sm text-slate-700 list-disc ml-5">
                <li><strong>Teamwork:</strong> Multiple developers can work on the same project without overwriting each other's work.</li>
                <li><strong>Experimentation:</strong> You can create a 'branch' to try out a new feature. If it doesn't work, you can just delete the branch without affecting the main project.</li>
                <li><strong>Bug Tracking:</strong> When a bug appears, you can look back through the history to see exactly when it was introduced.</li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl shadow-md bg-white">
              <h3 className="font-semibold">{t("bestPracticesTitle")}</h3>
              <ol className="text-sm text-slate-700 list-decimal ml-5">
                <li><strong>Commit Often:</strong> Save your work frequently with clear, descriptive messages.</li>
                <li><strong>Use Branches:</strong> Always work on a new feature or bug fix in its own branch.</li>
                <li><strong>Review Code:</strong> Before merging changes, have someone else on your team review them.</li>
              </ol>
            </div>
          </div>

          {/* Right column: Live Sandbox */}
          <div className="md:w-2/3 w-full space-y-4">
            <div className="rounded-2xl shadow-md bg-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-sky-100 rounded-full"><FaHistory className="text-sky-600" /></div>
                  <div>
                    <div className="text-sm text-slate-500">{t("liveSandbox")}</div>
                    <h2 className="text-lg font-semibold">{t("title")}</h2>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="text-xs text-slate-500">{t("branches")}: </div>
                  <div className="flex items-center gap-1">
                    {Object.keys(branches).map((b) => (
                      <button
                        key={b}
                        onClick={() => checkoutBranch(b)}
                        className={`text-xs px-2 py-1 rounded ${currentBranch === b ? "bg-sky-600 text-white" : "bg-slate-100 text-slate-700"}`}
                      >
                        {b}
                      </button>
                    ))}
                    <input
                      value={newBranchName}
                      onChange={(e) => setNewBranchName(e.target.value)}
                      placeholder={t("createBranch")}
                      className="text-xs px-2 py-1 rounded border ml-2"
                    />
                    <button
                      onClick={() => createBranch(newBranchName.trim())}
                        className="text-xs px-2 py-1 rounded bg-emerald-500 text-white ml-1 hover:bg-emerald-600 transition"
                    >
                        Create
                    </button>
                  </div>
                </div>
              </div>

              {/* commit timeline */}
              <div className="mt-4 overflow-x-auto py-3">
                <div className="flex items-center gap-6 min-w-max">
                  {commitNodes.map((c) => (
                    <div
                      key={c.id}
                      onClick={() => rewindTo(c.id)}
                      className={`cursor-pointer p-3 rounded-xl border ${head === c.id ? "ring-2 ring-sky-200" : "bg-white"} transition-shadow hover:shadow-md`}
                    >
                      <div className="text-xs text-slate-500">{c.time}</div>
                      <div className="font-medium mt-1">{c.message}</div>
                      <div className="text-xs text-slate-400">{c.id} • {c.branch}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* conflict box */}
              {conflict && (
                <div className="mt-3 p-3 bg-amber-50 border rounded">
                  <div className="font-semibold">{t("conflictTitle")}</div>
                  <div className="mt-2 text-sm">
                    <div className="font-medium">{conflict.file}</div>
                    <div className="mt-2 grid md:grid-cols-2 gap-2">
                      <div className="p-2 bg-white rounded shadow-sm">
                        <div className="text-xs text-slate-500">Ours</div>
                        <pre className="text-sm whitespace-pre-wrap">{conflict.ours}</pre>
                        <button className="mt-2 text-xs px-2 py-1 rounded bg-sky-600 text-white" onClick={() => resolveConflictWith("ours")}>
                          Keep ours
                        </button>
                      </div>

                      <div className="p-2 bg-white rounded shadow-sm">
                        <div className="text-xs text-slate-500">Theirs</div>
                        <pre className="text-sm whitespace-pre-wrap">{conflict.theirs}</pre>
                        <button className="mt-2 text-xs px-2 py-1 rounded bg-sky-600 text-white" onClick={() => resolveConflictWith("theirs")}>
                          Keep theirs
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-4 grid md:grid-cols-3 gap-4">
                {/* File explorer & file list */}
                <div className="col-span-1 bg-slate-50 p-3 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Files</div>
                    <div className="text-xs text-slate-500">{Object.keys(files).length}</div>
                  </div>
                  <div className="mt-2 space-y-2">
                    {Object.keys(files).map((fname) => (
                      <button
                        key={fname}
                        onClick={() => setSelectedFile(fname)}
                        className={`w-full text-left px-2 py-1 rounded ${selectedFile === fname ? "bg-white ring-1 ring-sky-200" : "hover:bg-white"}`}
                      >
                        {fname}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Editor */}
                <div className="col-span-2 bg-white p-3 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-slate-500">Editing</div>
                      <div className="font-medium">{selectedFile}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        value={commitMsg}
                        onChange={(e) => setCommitMsg(e.target.value)}
                        placeholder={t("newCommitMsg")}
                        className="text-sm px-2 py-1 rounded border"
                      />
                      <button className="px-3 py-1 rounded bg-sky-600 text-white" onClick={() => doCommit(commitMsg)}>
                        {t("commitBtn")}
                      </button>
                    </div>
                  </div>

                  <textarea
                    value={editorText}
                    onChange={(e) => updateFileInEditor(e.target.value)}
                    className="mt-3 w-full min-h-[220px] font-mono text-sm p-3 rounded border"
                  />

                  <div className="mt-3 flex items-center gap-2">
                    <select value={mergeSource || ""} onChange={(e) => setMergeSource(e.target.value)} className="text-sm px-2 py-1 rounded border">
                      <option value="">Select branch to merge</option>
                      {Object.keys(branches)
                        .filter((b) => b !== currentBranch)
                        .map((b) => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                    </select>
                    <button
                      className="px-3 py-1 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition disabled:bg-gray-400"
                      onClick={() => startMerge(mergeSource)}
                      disabled={!mergeSource}
                    >
                      {t("mergeBtn")} {mergeSource}
                    </button>

                    <div className="ml-auto flex items-center gap-2">
                      <div className="text-xs text-slate-500">HEAD: {head}</div>
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {/* Footer: timeline details */}
            <div className="rounded-2xl shadow-md bg-white p-4">
              <div className="text-sm font-medium">{t("history")}</div>
              <div className="mt-3 grid gap-2">
                {commitNodes.slice().reverse().map((c) => (
                  <div key={c.id} className="p-3 rounded-lg border flex items-start justify-between">
                    <div>
                      <div className="text-sm font-semibold">{c.message}</div>
                      <div className="text-xs text-slate-500">{c.id} • {c.branch} • {c.time}</div>
                      <div className="mt-2 text-xs text-slate-700 whitespace-pre-wrap">{Object.keys(c.files).slice(0,3).map(fn => `• ${fn}`).join('\n')}</div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button className="text-xs px-2 py-1 rounded bg-sky-600 text-white hover:bg-sky-700 transition" onClick={() => rewindTo(c.id)}>Checkout</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
        <div className="w-full flex justify-between items-center mt-10 p-4 bg-gray-100 rounded-lg shadow-md">
            <button
              onClick={() => navigate('/module3/ui-ux')}
              className="flex items-center gap-2 px-4 py-2 bg-purple-200 hover:bg-purple-300 text-purple-900 rounded-lg shadow transition"
            >
              <FaArrowLeft />
              {t("previous")}
            </button>
            <button
              onClick={() => navigate('/module4/testing')}
              className="flex items-center gap-2 px-4 py-2 bg-green-200 hover:bg-green-300 text-green-900 rounded-lg shadow transition"
            >
              {t("next")}
              <FaArrowRight />
            </button>
          </div>
      </div>
    </div>
  );
}
