import React, { useState, useMemo, useEffect } from "react";
import { FaHistory, FaArrowLeft, FaArrowRight, FaHome } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';

const content = {
  en: {
    home: "Home",
    title: "Understanding Version Control",
    concept: "A Version Control System (VCS) is a tool that saves the history of your changes in files. Instead of just saving a file, a VCS takes a 'snapshot' of all your files at a specific moment. This is incredibly useful for big projects.",
    analogy: "Think of it like a video game with many save slots. Each time you reach a new level, you save the game. If you make a mistake, you can always load a previous save. A VCS does this for your project files. It lets you create different 'timelines' (called <strong>branches</strong>) to try new ideas without affecting the main game. The most popular VCS is <strong>Git</strong>.",
    liveSandbox: "Interactive Git Simulation",
    sandboxExplanation: "This simulation shows you how a VCS works. <strong>What you're seeing:</strong> The timeline at the top shows your 'commits' (saved snapshots). The files on the left are your project files. <strong>How it works:</strong> When you edit a file and click 'Commit', you create a new snapshot in your history. Creating a 'branch' lets you work on a new feature without changing your main 'main' branch. 'Merging' combines your changes back together. This is exactly how developers use Git every day!",
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
    examples: [
        "<strong>Teamwork:</strong> Multiple developers can work on the same project without overwriting each other's work.",
        "<strong>Experimentation:</strong> You can create a 'branch' to try out a new feature. If it doesn't work, you can just delete the branch without affecting the main project.",
        "<strong>Bug Tracking:</strong> When a bug appears, you can look back through the history to see exactly when it was introduced."
    ],
    bestPracticesTitle: "Pro Tips for Version Control",
    bestPractices: [
        "<strong>Commit Often:</strong> Save your work frequently with clear, descriptive messages.",
        "<strong>Use Branches:</strong> Always work on a new feature or bug fix in its own branch.",
        "<strong>Review Code:</strong> Before merging changes, have someone else on your team review them."
    ],
    copy: "Copy",
    history: "Commit History",
    branches: "Branches",
    previous: "Previous",
    next: "Next",
  },
  hi: {
    home: "होम",
    title: "वर्जन कंट्रोल को समझना",
    concept: "वर्जन कंट्रोल सिस्टम (VCS) एक ऐसा टूल है जो फाइलों में आपके बदलावों का इतिहास सहेजता है। केवल एक फाइल को सहेजने के बजाय, एक VCS एक विशिष्ट क्षण में आपकी सभी फाइलों का 'स्नैपशॉट' लेता है। यह बड़े प्रोजेक्ट्स के लिए अविश्वसनीय रूप से उपयोगी है।",
    analogy: "इसे कई सेव स्लॉट वाले वीडियो गेम की तरह समझें। हर बार जब आप एक नए स्तर पर पहुँचते हैं, तो आप गेम को सहेजते हैं। यदि आप कोई गलती करते हैं, तो आप हमेशा पिछले सेव को लोड कर सकते हैं। एक VCS आपकी प्रोजेक्ट फ़ाइलों के लिए ऐसा ही करता है। यह आपको मुख्य गेम को प्रभावित किए बिना नए विचारों को आज़माने के लिए अलग-अलग 'टाइमलाइन' (जिन्हें <strong>ब्रांच</strong> कहा जाता है) बनाने देता है। सबसे लोकप्रिय VCS <strong>गिट</strong> है।",
    liveSandbox: "इंटरैक्टिव गिट सिमुलेशन",
    sandboxExplanation: "यह सिमुलेशन आपको दिखाता है कि VCS कैसे काम करता है। <strong>आप जो देख रहे हैं:</strong> शीर्ष पर टाइमलाइन आपके 'कमिट्स' (सहेजे गए स्नैपशॉट) को दिखाती है। बाईं ओर की फाइलें आपकी प्रोजेक्ट फाइलें हैं। <strong>यह कैसे काम करता है:</strong> जब आप किसी फ़ाइल को संपादित करते हैं और 'कमिट' पर क्लिक करते हैं, तो आप अपने इतिहास में एक नया स्नैपशॉट बनाते हैं। एक 'ब्रांच' बनाने से आप अपनी मुख्य 'main' ब्रांच को बदले बिना एक नई सुविधा पर काम कर सकते हैं। 'मर्जिंग' आपके परिवर्तनों को एक साथ वापस जोड़ती है। डेवलपर्स हर दिन गिट का इसी तरह उपयोग करते हैं!",
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
    examples: [
        "<strong>टीम वर्क:</strong> कई डेवलपर्स एक ही प्रोजेक्ट पर एक-दूसरे के काम को ओवरराइट किए बिना काम कर सकते हैं।",
        "<strong>प्रयोग:</strong> आप एक नई सुविधा को आज़माने के लिए एक 'शाखा' बना सकते हैं। यदि यह काम नहीं करता है, तो आप मुख्य प्रोजेक्ट को प्रभावित किए बिना बस शाखा को हटा सकते हैं।",
        "<strong>बग ट्रैकिंग:</strong> जब कोई बग दिखाई देता है, तो आप इतिहास में वापस देख सकते हैं कि यह वास्तव में कब पेश किया गया था।"
    ],
    bestPracticesTitle: "वर्जन कंट्रोल के लिए प्रो टिप्स",
    bestPractices: [
        "<strong>बार-बार कमिट करें:</strong> स्पष्ट, वर्णनात्मक संदेशों के साथ अपने काम को बार-बार सहेजें।",
        "<strong>शाखाओं का उपयोग करें:</strong> हमेशा एक नई सुविधा या बग फिक्स पर अपनी शाखा में काम करें।",
        "<strong>कोड की समीक्षा करें:</strong> परिवर्तनों को मर्ज करने से पहले, अपनी टीम के किसी अन्य व्यक्ति से उनकी समीक्षा करवाएं।"
    ],
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
              <button onClick={() => setLang("hi")} className={`px-3 py-1 rounded-lg border font-semibold ${lang === "hi" ? "bg-sky-600 text-white border-sky-600" : "bg-white text-gray-700 border-gray-300"} transition`}>हिन्दी</button>
            </div>
        </div>
        <div className="w-full space-y-8">
          {/* Introduction Section */}
          <div className="p-6 rounded-2xl shadow-lg bg-white">
            <h1 className="text-3xl font-bold text-slate-800">{t("title")}</h1>
            <p className="mt-2 text-slate-600">{t("concept")}</p>
            <div className="mt-4 rounded-lg p-4 bg-sky-50 border border-sky-100">
              <p className="text-slate-700" dangerouslySetInnerHTML={{ __html: t("analogy") }} />
            </div>
          </div>

          {/* Interactive Simulation Section */}
          <div className="p-6 rounded-2xl shadow-lg bg-white">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-sky-100 rounded-full"><FaHistory className="text-sky-600" /></div>
              <h2 className="text-2xl font-bold text-slate-800">{t("liveSandbox")}</h2>
            </div>
            <div className="mt-4 text-slate-600" dangerouslySetInnerHTML={{ __html: t("sandboxExplanation") }} />
            
            <div className="mt-4 border-t pt-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{t("branches")}:</span>
                        {Object.keys(branches).map((b) => (
                        <button
                            key={b}
                            onClick={() => checkoutBranch(b)}
                            className={`px-3 py-1 text-sm rounded-lg transition ${currentBranch === b ? "bg-sky-600 text-white shadow-md" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
                        >
                            {b}
                        </button>
                        ))}
                    </div>
                    <div className="flex items-center gap-2">
                        <input
                        value={newBranchName}
                        onChange={(e) => setNewBranchName(e.target.value)}
                        placeholder={t("createBranch")}
                        className="px-3 py-1 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500"
                        />
                        <button
                        onClick={() => createBranch(newBranchName.trim())}
                        className="px-3 py-1 text-sm rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition shadow"
                        >
                        Create
                        </button>
                    </div>
                </div>

                {/* Commit Timeline */}
                <div className="mt-6 overflow-x-auto py-3">
                    <div className="flex items-center gap-6 min-w-max">
                        {commitNodes.map((c) => (
                        <div
                            key={c.id}
                            onClick={() => rewindTo(c.id)}
                            className={`cursor-pointer p-4 rounded-xl border-2 transition-all hover:shadow-xl ${head === c.id ? "border-sky-500 scale-105" : "bg-white"}`}
                        >
                            <div className="text-xs text-slate-500">{c.time}</div>
                            <div className="font-semibold mt-1">{c.message}</div>
                            <div className="text-xs text-slate-400 mt-1">{c.id} • {c.branch}</div>
                        </div>
                        ))}
                    </div>
                </div>

                {/* Conflict Box */}
                {conflict && (
                    <div className="mt-4 p-4 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg">
                        <h3 className="font-bold text-amber-800">{t("conflictTitle")}</h3>
                        <div className="mt-2 text-sm">
                            <p>Conflict in file: <code className="font-mono bg-slate-200 p-1 rounded">{conflict.file}</code></p>
                            <div className="mt-3 grid md:grid-cols-2 gap-4">
                                <div className="p-3 bg-white rounded-lg shadow">
                                    <h4 className="text-xs font-semibold text-slate-500">Your changes (ours)</h4>
                                    <pre className="mt-1 text-sm whitespace-pre-wrap font-mono">{conflict.ours}</pre>
                                    <button className="mt-2 w-full text-sm px-3 py-1 rounded-lg bg-sky-600 text-white hover:bg-sky-700 transition" onClick={() => resolveConflictWith("ours")}>
                                        Keep Your Changes
                                    </button>
                                </div>
                                <div className="p-3 bg-white rounded-lg shadow">
                                    <h4 className="text-xs font-semibold text-slate-500">Incoming changes (theirs)</h4>
                                    <pre className="mt-1 text-sm whitespace-pre-wrap font-mono">{conflict.theirs}</pre>
                                    <button className="mt-2 w-full text-sm px-3 py-1 rounded-lg bg-sky-600 text-white hover:bg-sky-700 transition" onClick={() => resolveConflictWith("theirs")}>
                                        Keep Incoming Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* File Explorer & Editor */}
                <div className="mt-6 grid md:grid-cols-12 gap-6">
                    <div className="md:col-span-3 bg-slate-50 p-4 rounded-lg">
                        <h3 className="text-sm font-semibold">Project Files</h3>
                        <div className="mt-3 space-y-2">
                            {Object.keys(files).map((fname) => (
                            <button
                                key={fname}
                                onClick={() => setSelectedFile(fname)}
                                className={`w-full text-left px-3 py-2 text-sm rounded-lg transition ${selectedFile === fname ? "bg-sky-200 text-sky-800" : "hover:bg-slate-200"}`}
                            >
                                {fname}
                            </button>
                            ))}
                        </div>
                    </div>
                    <div className="md:col-span-9 bg-white p-4 rounded-lg border">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                            <h4 className="text-sm font-semibold">Editing: <code className="font-mono bg-slate-200 p-1 rounded">{selectedFile}</code></h4>
                            <div className="flex items-center gap-2">
                                <input
                                value={commitMsg}
                                onChange={(e) => setCommitMsg(e.target.value)}
                                placeholder={t("newCommitMsg")}
                                className="px-3 py-1 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500"
                                />
                                <button className="px-4 py-1 text-sm rounded-lg bg-sky-600 text-white hover:bg-sky-700 transition shadow" onClick={() => doCommit(commitMsg)}>
                                {t("commitBtn")}
                                </button>
                            </div>
                        </div>
                        <textarea
                            value={editorText}
                            onChange={(e) => updateFileInEditor(e.target.value)}
                            className="mt-4 w-full min-h-[200px] font-mono text-sm p-3 rounded-lg border bg-slate-900 text-slate-100 focus:ring-2 focus:ring-sky-500"
                        />
                         <div className="mt-4 flex items-center gap-2">
                            <select value={mergeSource || ""} onChange={(e) => setMergeSource(e.target.value)} className="px-3 py-1 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500">
                                <option value="">Select branch to merge</option>
                                {Object.keys(branches)
                                    .filter((b) => b !== currentBranch)
                                    .map((b) => (
                                    <option key={b} value={b}>{b}</option>
                                    ))}
                            </select>
                            <button
                                className="px-4 py-1 text-sm rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition shadow disabled:bg-gray-400"
                                onClick={() => startMerge(mergeSource)}
                                disabled={!mergeSource}
                            >
                                {t("mergeBtn")}
                            </button>
                            <div className="ml-auto text-xs text-slate-500">HEAD: {head.slice(0, 7)}</div>
                        </div>
                    </div>
                </div>
            </div>
          </div>

          {/* Commit History Section */}
            <div className="p-6 rounded-2xl shadow-lg bg-white">
                <h3 className="text-2xl font-bold text-slate-800">{t("history")}</h3>
                <div className="mt-4 space-y-3">
                    {commitNodes.slice().reverse().map((c) => (
                    <div key={c.id} className="p-4 rounded-lg border flex flex-wrap items-center justify-between gap-2">
                        <div>
                        <div className="font-semibold">{c.message}</div>
                        <div className="text-sm text-slate-500">{c.id} • <span className="font-medium text-indigo-600">{c.branch}</span> • {c.time}</div>
                        </div>
                        <button className="px-3 py-1 text-sm rounded-lg bg-sky-100 text-sky-800 hover:bg-sky-200 transition" onClick={() => rewindTo(c.id)}>
                            Go to this commit
                        </button>
                    </div>
                    ))}
                </div>
            </div>

          {/* Additional Info Sections */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 rounded-2xl shadow-lg bg-sky-50">
                <h3 className="text-xl font-bold text-slate-800">{t("examplesTitle")}</h3>
                <ul className="mt-4 text-slate-700 list-disc ml-5 space-y-2">
                    {t("examples").map((example, index) => (
                    <li key={index} dangerouslySetInnerHTML={{ __html: example }} />
                    ))}
                </ul>
            </div>
            <div className="p-6 rounded-2xl shadow-lg bg-emerald-50">
                <h3 className="text-xl font-bold text-slate-800">{t("bestPracticesTitle")}</h3>
                <ol className="mt-4 text-slate-700 list-decimal ml-5 space-y-2">
                    {t("bestPractices").map((practice, index) => (
                    <li key={index} dangerouslySetInnerHTML={{ __html: practice }} />
                    ))}
                </ol>
            </div>
          </div>

            <div className="p-6 rounded-2xl shadow-lg bg-slate-800 text-white">
                <h3 className="text-xl font-bold">{t("cheatTitle")}</h3>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {cheatCommands.map((c) => (
                    <div key={c.cmd} className="flex items-center justify-between gap-2 bg-slate-700 p-3 rounded-lg">
                        <div className="text-sm text-slate-300">{c.label}</div>
                        <div className="flex items-center gap-2">
                        <code className="text-sm px-2 py-1 bg-slate-900 rounded">{c.cmd}</code>
                        <button
                            className="text-xs px-2 py-1 rounded bg-sky-500 text-white hover:bg-sky-600"
                        >
                            {t("copy")}
                        </button>
                        </div>
                    </div>
                    ))}
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
