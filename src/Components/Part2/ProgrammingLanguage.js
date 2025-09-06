import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCode, FaPython, FaJava, FaHtml5, FaCss3 } from "react-icons/fa";
import { SiJavascript } from "react-icons/si"

export default function ProgrammingLanguagesProComponent() {
    const [lang, setLang] = useState("en"); // 'en' or 'hi'
    const [stage, setStage] = useState(1); // 1..5
    const iframeRef = useRef(null);

    // Editors for web (dark)
    const [htmlCode, setHtmlCode] = useState(`<!doctype html>
        <html>
            <body>
                <h1 id="demoHeading">Hi there</h1>
                <p id="demoPara">Click the heading to see JS</p>
             </body>
        </html>`);

    const [cssCode, setCssCode] = useState(`
    #demoHeading { 
        color: #06b6d4; 
        font-family: Inter, system-ui; 
    }
    #demoPara { 
        color: #475569; 
    }`);

    const [jsCode, setJsCode] = useState(`
        document.getElementById('demoHeading')
        .addEventListener('click', () => {
        document.getElementById('demoPara').textContent = 'You clicked!';
        });`);

    // Python & Java editors + output
    const [pythonCode, setPythonCode] = useState(`print("Hello friend")\nprint(2 + 3)`);
    const [pythonOutput, setPythonOutput] = useState([]);
    const [pythonRunning, setPythonRunning] = useState(false);

    const [javaCode, setJavaCode] = useState(`public class Hello {\n  public static void main(String[] args) {\n    System.out.println("Hello from Java");\n  }\n}`);
    const [javaOutput, setJavaOutput] = useState([]);
    const [javaCompiling, setJavaCompiling] = useState(false);

    // Content: English + simple conversational Hindi (technical words stay English)
    const content = {
        en: {
            title: 'About Programming Languages',
            subtitle: 'Simple steps — with analogies & live code',
            stages: {
                1: {
                    title: 'What is a programming language?',
                    short: 'A programming language is a special way of writing instructions that a computer can understand. Instead of giving direct commands through a keyboard or mouse (like opening a file or clicking a button), a programming language lets us write step-by-step instructions — similar to a recipe — so the computer can automatically follow those steps and solve problems.',
                    analogy: 'Recipe analogy: a cooking recipe gives exact steps. Computers need the same clear steps.',
                    syntax: 'Syntax = grammar / rules (missing punctuation breaks code).',
                    semantics: 'Semantics = meaning / result (does the code do what you want?).',
                },
                2: {
                    title: 'How code runs — Interpreted vs Compiled',
                    short: 'Interpreted: reads & runs line-by-line. Compiled: translates whole program first, then runs fast.',
                    analogy: 'Interpreter = live translator; Compiler = translate whole book once then run.',
                },
                3: {
                    title: 'Web building blocks — HTML, CSS, JavaScript',
                    short:
                        "HTML = Structure → It decides what is on the page (like text, images, buttons).\n" +
                        "CSS = Look & Style → It controls how the page looks (colors, fonts, layout, design).\n" +
                        "JavaScript = Behavior → It makes the page interactive (buttons working, animations, forms).",
                },
                4: {
                    title: 'Python — first logic language',
                    analogy: 'Python is like giving instructions to a smart helper who understands simple English.',
                    short:
                        'High-level language: no need for computer binary, human-friendly words.\n' +
                        'Beginner-friendly: easy to learn and start programming.\n' +
                        'Logic & problem-solving: tells the computer how to think step by step.\n' +
                        'Small tasks & automation: automates boring work like renaming files.\n' +
                        'Big projects too: used for websites, games, data analysis, AI.\n' +
                        'Simple syntax: write instructions in plain sentences.',
                },
                5: {
                    title: 'Make pages come alive — JavaScript & Java',
                    short: 'JavaScript brings interaction to web pages. Java is used for apps. Try small edits.',
                },
            },
            runPreview: 'Run Preview',
            reset: 'Reset',
            run: 'Run',
            compiling: 'Compiling...',
            running: 'Running...',
            tip: 'Tip: use 1–5 to jump stages; Arrow keys to navigate; Ctrl/Cmd+K toggles language.',
            nextSteps: ['Edit small code lines and observe.', 'Write one tiny program every day.', 'Try Replit or CodePen when ready.'],
        },

        hi: {
            title: 'Programming Languages के बारे में',
            subtitle: 'सरल भाषा, रोज़मर्रा की उपमाएँ और लाइव कोड',
            stages: {
                1: {
                    title: 'Programming language क्या है?',
                    short: 'प्रोग्रामिंग लैंग्वेज एक विशेष तरीका है जिसमें हम ऐसे निर्देश लिखते हैं जिन्हें कंप्यूटर समझ सके। कीबोर्ड या माउस से सीधे कमांड देने (जैसे फ़ाइल खोलना या बटन क्लिक करना) के बजाय, प्रोग्रामिंग लैंग्वेज हमें स्टेप-बाय-स्टेप निर्देश लिखने देती है — बिल्कुल किसी रेसिपी की तरह — ताकि कंप्यूटर अपने आप उन स्टेप्स को फॉलो करके समस्या का समाधान कर सके।',
                    analogy: 'Recipe की तरह: steps और नाप बिलकुल सही होने चाहिए, तभी खाना सही बनेगा।',
                    syntax: 'Syntax = grammar / rules (गलत punctuation से code नहीं चलेगा).',
                    semantics: 'Semantics = meaning / result (क्या code वही करेगा जो आप चाह रहे हैं?).',
                },
                2: {
                    title: 'Code कैसे चलता — Interpreted vs Compiled',
                    short: 'Interpreted: लाइन-बाय-लाइन पढ़कर चलता है. Compiled: पूरा program पहले translate होता है, फिर तेज चलता है.',
                    analogy: 'Interpreter = live translator; Compiler = पूरा किताब पहले translate कर दो, फिर काम तेजी से होगा.',
                },
                3: {
                    title: 'Web के हिस्से — HTML, CSS, JavaScript',
                    short: `HTML = संरचना → यह तय करता है कि पेज पर क्या होगा (जैसे टेक्स्ट, इमेज, बटन).\n
                    CSS = रूप और स्टाइल → यह तय करता है कि पेज कैसा दिखेगा (रंग, फॉन्ट, लेआउट, डिज़ाइन).\n
                    JavaScript = व्यवहार → यह पेज को इंटरएक्टिव बनाता है (बटन काम करना, ऐनिमेशन, फॉर्म्स).`,

                },
                4: {
                    title: 'Python — शुरुआती के लिए',
                    analogy: 'Python ऐसा है जैसे आप किसी स्मार्ट सहायक को सरल अंग्रेज़ी में निर्देश दे रहे हों।',
                    short:
                        'High-level भाषा: कंप्यूटर बाइनरी की जरूरत नहीं, इंसान के लिए आसान शब्द।\n' +
                        'शुरुआत करने वालों के लिए आसान: जल्दी सीखने और प्रोग्रामिंग शुरू करने के लिए।\n' +
                        'लॉजिक और समस्या समाधान: कंप्यूटर को कदम-दर-कदम सोचने के निर्देश देता है।\n' +
                        'छोटे काम और ऑटोमेशन: बोरिंग काम जैसे फाइल का नाम बदलना अपने आप कर देता है।\n' +
                        'बड़े प्रोजेक्ट्स भी: वेबसाइट, गेम, डेटा एनालिसिस, और AI में इस्तेमाल होता है।\n' +
                        'सिंटैक्स सरल: निर्देशों को सामान्य वाक्यों में लिखा जा सकता है।'
                },
                5: {
                    title: 'Pages कैसे ज़िंदा होते हैं — JavaScript & Java',
                    short: 'JavaScript web पर interaction देता है. Java बड़े apps के लिए इस्तेमाल होता है।',
                },
            },
            runPreview: 'Preview चलाएँ',
            reset: 'Reset',
            run: 'चलाएँ',
            compiling: 'कम्पाइल हो रहा...',
            running: 'चालू...',
            tip: 'टिप: 1–5 से स्टेप चुनें; Arrow keys से आगे/पीछे; Ctrl/Cmd+K भाषा बदलता है.',
            nextSteps: ['छोटे-छोटे बदलाव करके देखें.', 'हर दिन एक छोटा प्रोग्राम लिखने की आदत डालें.', 'Replit/CodePen पर असली रन आज़माएँ.'],
        },
    };

    const examples = [
        {
            title: "Correct Syntax ✔️, Wrong Semantics ❌",
            code: `<h1>Welcome!</h1>
<p>This is a heading written in paragraph tag.</p>`,
            explanation: "Browser accepts it, but using <p> for heading is misleading.",
            labelColor: "text-pink-400",
        },
        {
            title: "Wrong Syntax ❌, Clear Intention ✔️",
            code: `<h1>Welcome!<h1>
<p>Click here</p>`,
            explanation: "h1 not closed properly. Browser guesses it, but invalid HTML.",
            labelColor: "text-orange-400",
        },
        {
            title: "Correct Syntax ✔️ and Correct Semantics ✔️",
            code: `<h1>Welcome!</h1>
<p>This is a proper paragraph under the heading.</p>`,
            explanation: "Both syntax and semantics are correct. Best practice.",
            labelColor: "text-green-400",
        },
    ];
    const t = (key) => {
        const parts = key.split('.');
        let obj = content[lang];
        for (let p of parts) {
            if (!obj) return '';
            obj = obj[p];
        }
        return obj ?? '';
    };

    // build safe srcDoc
    const buildSrcDoc = (html, css, js) => `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>
                body {
                font-family: Inter, system-ui;
                padding: 18px;
            }
                ${css}
            </style>
        </head>
        <body>
        ${html}
        <script>
            try {
            ${js}
            } catch (e) {
            document.body.insertAdjacentHTML(
            'beforeend',
            '<pre style="color:#ff6b6b; background:#111; padding:8px; border-radius:6px; font-family:monospace;">Error: ' +
             (e && e.message ? e.message : e) +
            '</pre>'
            );
        }
        </script>
        </body>
    </html>
`;

    const runPreview = () => { if (iframeRef.current) iframeRef.current.srcdoc = buildSrcDoc(htmlCode, cssCode, jsCode); };

    // Simulated Python runner (very limited & safe)
    const runPython = () => {
        if (pythonRunning) return;

        setPythonOutput([]);
        setPythonRunning(true);

        // Split code into lines, trim and remove empty lines
        const lines = pythonCode.split('\n').map(l => l.trim()).filter(Boolean);
        let delay = 0;

        lines.forEach((ln) => {
            delay += 300;

            // Match print statements
            const m = ln.match(/^print\((.*)\)$/i);

            if (m) {
                const inner = m[1].trim();

                // Case 1: print("string") or print('string')
                const s = inner.match(/^"(.+)"$|^'(.+)'$/);
                if (s) {
                    setTimeout(() => setPythonOutput(p => [...p, s[1] ?? s[2]]), delay);
                }
                else {
                    // Case 2: print(2 + 3), print(10 - 5), etc.
                    const ar = inner.match(/^([0-9]+)\s*([+\-*/])\s*([0-9]+)$/);
                    if (ar) {
                        const a = Number(ar[1]);
                        const op = ar[2];
                        const b = Number(ar[3]);
                        let r = '';

                        if (op === '+') r = String(a + b);
                        if (op === '-') r = String(a - b);
                        if (op === '*') r = String(a * b);
                        if (op === '/') r = b !== 0 ? String(Math.floor(a / b)) : 'Infinity';

                        setTimeout(() => setPythonOutput(p => [...p, r]), delay);
                    }
                    else {
                        // Unsupported expression inside print
                        setTimeout(() =>
                            setPythonOutput(p => [
                                ...p,
                                lang === 'en' ? '(unsupported line)' : '(समर्थित पंक्ति नहीं)'
                            ]),
                            delay);
                    }
                }
            }
            else {
                // Line that is not a print
                setTimeout(() =>
                    setPythonOutput(p => [
                        ...p,
                        lang === 'en' ? '(ignored line)' : '(लाइनेँ छोड़ दी)'
                    ]),
                    delay);
            }
        });

        // Reset running state at the end
        setTimeout(() => setPythonRunning(false), delay + 200);
    };

    // Simulated Java compile & run
    const runJava = () => {
        if (javaCompiling) return;

        setJavaOutput([]);
        setJavaCompiling(true);

        setTimeout(() => {
            // --- Basic compile checks ---
            const hasClass = /class\s+\w+/i.test(javaCode);
            const hasMain = /public\s+static\s+void\s+main\s*\(/i.test(javaCode);

            if (!hasClass) {
                setJavaOutput([
                    lang === 'en'
                        ? 'Compilation error: missing class'
                        : 'कम्पाइल त्रुटि: class गायब',
                ]);
                setJavaCompiling(false);
                return;
            }

            if (!hasMain) {
                setJavaOutput([
                    lang === 'en'
                        ? 'Compilation error: missing main'
                        : 'कम्पाइल त्रुटि: main मेथड गायब',
                ]);
                setJavaCompiling(false);
                return;
            }

            // --- Extract System.out.println statements ---
            const matches = [...javaCode.matchAll(
                /System\.out\.println\((?:"([^"]*)"|'([^']*)')\)/g
            )].map(m => m[1] ?? m[2] ?? '');

            // Show compile success
            setJavaOutput([
                lang === 'en'
                    ? 'Compiled successfully.'
                    : 'सफलतापूर्वक कम्पाइल हुआ.',
            ]);

            // Simulate execution after compile
            setTimeout(() => {
                if (matches.length === 0) {
                    setJavaOutput(o => [
                        ...o,
                        lang === 'en'
                            ? '(Program ran but printed nothing)'
                            : '(कोई आउटपुट नहीं)',
                    ]);
                } else {
                    matches.forEach((mm, i) => {
                        setTimeout(() => {
                            setJavaOutput(o => [...o, mm]);
                        }, 180 * (i + 1));
                    });
                }

                setJavaCompiling(false);
            }, 400);
        }, 800);
    };

    // keyboard shortcuts
    useEffect(() => {
        const onKey = (e) => {
            // Number keys 1–5 → jump to stage
            if (['1', '2', '3', '4', '5'].includes(e.key)) {
                setStage(Number(e.key));
                e.preventDefault();
            }
            // ArrowRight → next stage
            if (e.key === 'ArrowRight') {
                setStage((s) => Math.min(5, s + 1));
                e.preventDefault();
            }
            // ArrowLeft → previous stage
            if (e.key === 'ArrowLeft') {
                setStage((s) => Math.max(1, s - 1));
                e.preventDefault();
            }
            // Ctrl/Cmd + K → toggle language
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
                setLang((l) => (l === 'en' ? 'hi' : 'en'));
                e.preventDefault();
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);


    // Animated SVGs
    const CodeArrows = ({ size = 92 }) => (
        <motion.svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <motion.path
                d="M7 8L3 12L7 16"
                stroke="#34D399"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.9 }}
            />
            <motion.path
                d="M17 8L21 12L17 16"
                stroke="#34D399"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.9, delay: 0.12 }}
            />
            <motion.path
                d="M14 4L10 20"
                stroke="#60A5FA"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.9, delay: 0.24 }}
            />
        </motion.svg>
    );

    const RobotGlyph = ({ size = 96 }) => (
        <motion.svg
            width={size}
            height={size}
            viewBox="0 0 64 64"
            xmlns="http://www.w3.org/2000/svg"
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
        >
            <rect
                x="10"
                y="18"
                rx="6"
                width="44"
                height="30"
                stroke="#94A3B8"
                strokeWidth="1.6"
                fill="#F8FAFC"
            />
            <circle
                cx="24"
                cy="32"
                r="3"
                fill="#60A5FA"
            />
            <circle
                cx="40"
                cy="32"
                r="3"
                fill="#34D399"
            />
            <rect
                x="26"
                y="40"
                width="12"
                height="3"
                rx="1"
                fill="#94A3B8"
            />
        </motion.svg>
    );


    // Small UI pieces
    const StageBtn = ({ n }) => (
        <button onClick={() => setStage(n)} className={`px-3 py-1 rounded-full text-xs font-medium ${stage === n ? 'bg-slate-900 text-white' : 'bg-white border text-slate-700'}`}>{lang === 'en' ? `Stage ${n}` : `स्टेप ${n}`}</button>
    );

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-700 text-white shadow-lg"><FaCode className="text-2xl" /></div>
                <div className="flex-1">
                    <h1 className="text-2xl font-extrabold text-slate-900">{t('title')}</h1>
                    <p className="text-sm text-slate-500 mt-1">{t('subtitle')}</p>
                </div>

                <div className="flex items-center gap-2">
                    <div className="text-xs text-slate-500">EN</div>
                    <div role="switch" aria-checked={lang === 'hi'} tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setLang(l => l === 'en' ? 'hi' : 'en') }} onClick={() => setLang(l => l === 'en' ? 'hi' : 'en')} className="w-12 h-6 bg-gray-200 rounded-full relative cursor-pointer">
                        <motion.span layout className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow" animate={{ x: lang === 'hi' ? 24 : 0 }} transition={{ type: 'spring', stiffness: 400, damping: 28 }} />
                    </div>
                    <div className="text-xs text-slate-500">HI</div>
                </div>
            </div>

            <div className="grid md:grid-cols-12 gap-6 items-start">

                {/* left visual column */}
                <div className="md:col-span-5 bg-gradient-to-br from-slate-100 via-slate-50 to-white rounded-2xl p-6 relative overflow-hidden border shadow-xl">
                    <motion.div
                        initial={{ scale: 0.96, opacity: 0.12 }}
                        animate={{ scale: 1.02, opacity: 0.22 }}
                        transition={{ duration: 4, repeat: Infinity, repeatType: "mirror" }}
                        className="absolute -right-8 -top-8 w-56 h-56 bg-gradient-to-tr from-indigo-200 to-cyan-200 rounded-full filter blur-3xl opacity-60"
                    />

                    {/* stages block */}
                    <div className="relative z-10 flex flex-col items-center gap-4">
                        <AnimatePresence mode="wait">
                            {stage === 1 && (
                                <motion.div
                                    key="v1"
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -6 }}
                                    className="flex flex-col items-center gap-3"
                                >
                                    <RobotGlyph />
                                    <div className="text-center">
                                        <div className="text-lg font-semibold">{t("stages.1.title")}</div>
                                        <div className="text-sm text-slate-600 mt-2 max-w-xs">
                                            {t("stages.1.analogy")}
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {stage === 2 && (
                                <motion.div
                                    key="v2"
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -6 }}
                                    className="flex flex-col items-center gap-3"
                                >
                                    <CodeArrows />
                                    <div className="text-center">
                                        <div className="text-lg font-semibold">{t("stages.2.title")}</div>
                                        <div className="text-sm text-slate-600 mt-2 max-w-xs">
                                            {t("stages.2.analogy")}
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {stage === 3 && (
                                <motion.div
                                    key="v3"
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -6 }}
                                    className="flex flex-col items-center gap-3"
                                >
                                    <div className="flex items-center gap-4 text-4xl">
                                        <FaHtml5 className="text-orange-600" />
                                        <FaCss3 className="text-blue-600" />
                                        <SiJavascript className="text-yellow-500" />
                                    </div>
                                    <div className="text-center">
                                        <div className="text-lg font-semibold">{t("stages.3.title")}</div>
                                        <div className="text-sm text-slate-600 mt-2 max-w-xs">
                                            HTML = शरीर (Body),
                                            CSS = कपड़े (Clothes),
                                            JavaScript = (Brain)
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {stage === 4 && (
                                <motion.div
                                    key="v4"
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -6 }}
                                    className="flex flex-col items-center gap-3"
                                >
                                    <FaPython className="text-yellow-500 text-5xl" />
                                    <div className="text-center">
                                        <div className="text-lg font-semibold">{t("stages.4.title")}</div>
                                        <div className="text-sm text-slate-600 mt-2 max-w-xs">
                                            {t("stages.4.analogy")}
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {stage === 5 && (
                                <motion.div
                                    key="v5"
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -6 }}
                                    className="flex flex-col items-center gap-3"
                                >
                                    <FaJava className="text-yellow-400 text-6xl" />
                                    <h6 className="font-bold text-yellow-500 -mt-2">JAVA</h6>
                                    <div className="text-center">
                                        <div className="text-lg font-semibold">{t("stages.5.title")}</div>
                                        <div className="text-sm text-slate-600 mt-2 max-w-xs">
                                            {t("stages.5.short")}
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                        </AnimatePresence>

                        {/* stage buttons + tip */}
                        <div className="mt-4 flex gap-2 flex-wrap justify-center">
                            {[1, 2, 3, 4, 5].map((n) => (
                                <StageBtn key={n} n={n} />
                            ))}
                        </div>
                        <div className="mt-3 text-xs text-slate-500 text-center max-w-[220px]">
                            {lang === "en" ? content.en.tip : content.hi.tip}
                        </div>
                    </div>

                    {/* new “Why programming matters” section */}
                    <div className="mt-8 p-5 rounded-xl bg-gradient-to-br from-white to-slate-50 border border-slate-200 shadow-lg">
                        <h3 className="text-base font-semibold mb-3 text-slate-800">
                            {lang === "en"
                                ? "Why programming languages matter"
                                : "Programming Languages क्यों ज़रूरी हैं"}
                        </h3>
                        <p className="text-sm text-slate-700 leading-relaxed">
                            {lang === "en"
                                ? "Languages let us break big work into small steps and tell computers exactly what to do. Syntax organizes the steps; semantics decide the result."
                                : "Languages हमें बड़ा काम छोटे steps में बाँटकर कंप्यूटर को सही निर्देश देने में मदद करती हैं। Syntax steps को organize करता है; Semantics तय करते हैं कि परिणाम क्या होगा।"}
                        </p>

                        <div className="mt-4 grid sm:grid-cols-2 gap-3">
                            <div className="p-3 bg-indigo-50 rounded-lg shadow-sm">
                                <div className="text-xs font-semibold text-indigo-700">Syntax</div>
                                <div className="text-sm text-slate-700 mt-1">
                                    {lang === "en"
                                        ? "Grammar & rules — missing punctuation breaks code"
                                        : "Grammar / नियम — गलत punctuation से code नहीं चलेगा"}
                                </div>
                            </div>
                            <div className="p-3 bg-emerald-50 rounded-lg shadow-sm">
                                <div className="text-xs font-semibold text-emerald-700">Semantics</div>
                                <div className="text-sm text-slate-700 mt-1">
                                    {lang === "en"
                                        ? "What the code actually does"
                                        : "कोड वास्तव में क्या करता है"}
                                </div>
                            </div>
                        </div>

                        <div className="mt-4">
                            <div className="text-sm font-semibold mb-2 text-slate-800">
                                {lang === "en" ? "Next steps" : "अगले कदम"}
                            </div>
                            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
                                {content[lang].nextSteps.map((s, i) => (
                                    <li key={i}>{s}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* right content column */}
                <div className="md:col-span-7">
                    <div className="bg-white rounded-2xl p-6 shadow-md border">
                        <AnimatePresence mode="wait">
                            {stage === 1 && (
                                <motion.div
                                    key="s1"
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -6 }}
                                >
                                    <h2 className="text-lg font-bold mb-2">{t('stages.1.title')}</h2>
                                    <p className="text-slate-700 mb-3">{t('stages.1.short')}</p>

                                    <div className="p-3 bg-gray-50 rounded mb-3">
                                        <div className="text-sm font-semibold mb-1">{lang === 'en' ? 'Analogy' : 'उपमा'}</div>
                                        <div className="text-sm text-slate-700">{t('stages.1.analogy')}</div>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-3 mb-6">
                                        <div className="p-3 rounded-lg bg-indigo-50">
                                            <div className="text-sm font-semibold text-indigo-700">Syntax</div>
                                            <div className="text-sm text-slate-700 mt-1">{t('stages.1.syntax')}</div>
                                        </div>
                                        <div className="p-3 rounded-lg bg-emerald-50">
                                            <div className="text-sm font-semibold text-emerald-700">Semantics</div>
                                            <div className="text-sm text-slate-700 mt-1">{t('stages.1.semantics')}</div>
                                        </div>
                                    </div>

                                    {/* ---- Add Syntax vs Semantics Examples Here ---- */}
                                    <div className="mt-6 bg-white/5 p-6 rounded-2xl shadow-md border border-white/10 w-full">
                                        <h3 className="text-2xl font-bold text-black mb-4">Syntax vs Semantics Examples</h3>
                                        <p className="text-gray-500 mb-6">
                                            Syntax is the grammar of code, semantics is the meaning.
                                        </p>
                                        {/* Examples */}
                                        <div className="mt-6 w-full flex flex-col gap-6">
                                            {examples.map((ex, index) => (
                                                <motion.div
                                                    key={index}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.5, delay: index * 0.2 }}
                                                    className="w-full bg-gray-900 rounded-xl p-5 shadow-md"
                                                >
                                                    <div className={`text-lg font-semibold mb-2 ${ex.labelColor}`}>{ex.title}</div>
                                                    <pre className="bg-black/50 p-4 rounded text-sm text-gray-200 overflow-x-auto">
                                                        {ex.code}
                                                    </pre>
                                                    <div className="text-gray-300 mt-2 text-sm">{ex.explanation}</div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {stage === 2 && (
                                <motion.div
                                    key="s2"
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -6 }}
                                    className="space-y-4"
                                >
                                    {/* Title + Short Intro */}
                                    <h2 className="text-lg font-bold mb-2">{t('stages.2.title')}</h2>
                                    <p className="text-slate-700 mb-3">{t('stages.2.short')}</p>


                                    {/* Detailed Explanation */}
                                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                                        {/* Interpreted */}
                                        <div className="p-4 rounded-lg bg-indigo-50 shadow-sm">
                                            <h3 className="font-semibold text-indigo-700 text-sm mb-2">
                                                {lang === 'en' ? 'Interpreted' : 'इंटरप्रेटेड'}
                                            </h3>
                                            <ul className="text-sm text-slate-700 list-disc pl-4 space-y-1">
                                                <li>
                                                    {lang === 'en'
                                                        ? 'Reads code line by line and runs immediately'
                                                        : 'कोड को लाइन-बाय-लाइन पढ़कर तुरंत चलाता है'}
                                                </li>
                                                <li>
                                                    {lang === 'en'
                                                        ? 'Slower because it keeps translating while running'
                                                        : 'धीमा होता है क्योंकि रन करते समय लगातार ट्रांसलेट करता है'}
                                                </li>
                                                <li>
                                                    {lang === 'en'
                                                        ? 'Easy to test and debug'
                                                        : 'टेस्ट और डिबग करना आसान'}
                                                </li>
                                                <li className="font-medium">
                                                    {lang === 'en' ? 'Examples: Python, JavaScript' : 'उदाहरण: Python, JavaScript'}
                                                </li>
                                            </ul>
                                        </div>

                                        {/* Compiled */}
                                        <div className="p-4 rounded-lg bg-emerald-50 shadow-sm">
                                            <h3 className="font-semibold text-emerald-700 text-sm mb-2">
                                                {lang === 'en' ? 'Compiled' : 'कम्पाइल्ड'}
                                            </h3>
                                            <ul className="text-sm text-slate-700 list-disc pl-4 space-y-1">
                                                <li>
                                                    {lang === 'en'
                                                        ? 'Translates the whole program first'
                                                        : 'पूरा प्रोग्राम पहले ट्रांसलेट करता है'}
                                                </li>
                                                <li>
                                                    {lang === 'en'
                                                        ? 'Runs very fast once compiled'
                                                        : 'कम्पाइल होने के बाद बहुत तेज चलता है'}
                                                </li>
                                                <li>
                                                    {lang === 'en'
                                                        ? 'Harder to debug (need to recompile)'
                                                        : 'डिबग करना मुश्किल (फिर से कम्पाइल करना पड़ता है)'}
                                                </li>
                                                <li className="font-medium">
                                                    {lang === 'en' ? 'Examples: C, C++, Java' : 'उदाहरण: C, C++, Java'}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Analogy Box */}
                                    <div className="mt-4 p-4 rounded-lg bg-gradient-to-r from-slate-50 to-white border shadow-sm text-sm text-slate-700">
                                        <span className="font-semibold">
                                            {lang === 'en' ? 'Easy Analogy:' : 'सरल उदाहरण:'}
                                        </span>
                                        <br />
                                        <span className="text-slate-600">
                                            {lang === 'en'
                                                ? 'Interpreted → Cooking while reading the recipe step by step.\nCompiled → Preparing all ingredients and instructions first, then cooking smoothly.'
                                                : 'इंटरप्रेटेड → रेसिपी पढ़ते-पढ़ते पकाना।\nकम्पाइल्ड → पहले सारी सामग्री और निर्देश तैयार करना, फिर आसानी से पकाना।'}
                                        </span>
                                    </div>
                                </motion.div>
                            )}


                            {stage === 3 && (
                                <motion.div
                                    key="s3"
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -6 }}
                                >
                                    <h2 className="text-lg font-bold mb-2">{t("stages.3.title")}</h2>

                                    {/* Handle multiline text */}
                                    <div className="text-slate-700 mb-3 space-y-1 text-sm">
                                        {t("stages.3.short")
                                            .split("\n")
                                            .map((line, i) => (
                                                <div key={i}>{line}</div>
                                            ))}
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {/* left column */}
                                        <div className="flex flex-col">
                                            <div className="text-xs text-slate-400 mb-2">
                                                {lang === "en"
                                                    ? "Edit HTML / CSS / JS (dark editors)"
                                                    : "HTML / CSS / JS संपादित करें (डार्क एडिटर)"}
                                            </div>
                                            <div className="rounded-lg overflow-hidden border bg-[#0b1220] p-3 space-y-3">
                                                {/* HTML */}
                                                <div>
                                                    <div className="text-xs mb-1 text-slate-400">HTML</div>
                                                    <textarea
                                                        value={htmlCode}
                                                        onChange={(e) => setHtmlCode(e.target.value)}
                                                        spellCheck={false}
                                                        className="w-full h-[150px] bg-[#071024] text-[#d1fae5] font-mono text-sm p-3 rounded outline-none border border-[#0b1220] resize-none"
                                                    />
                                                </div>

                                                {/* CSS */}
                                                <div>
                                                    <div className="text-xs mb-1 text-slate-400">CSS</div>
                                                    <textarea
                                                        value={cssCode}
                                                        onChange={(e) => setCssCode(e.target.value)}
                                                        spellCheck={false}
                                                        className="w-full h-[150px] bg-[#071024] text-[#c7f9ff] font-mono text-sm p-3 rounded outline-none border border-[#0b1220] resize-none"
                                                    />
                                                </div>

                                                {/* JavaScript */}
                                                <div>
                                                    <div className="text-xs mb-1 text-slate-400">JavaScript</div>
                                                    <textarea
                                                        value={jsCode}
                                                        onChange={(e) => setJsCode(e.target.value)}
                                                        spellCheck={false}
                                                        className="w-full h-[150px] bg-[#071024] text-[#fff6bf] font-mono text-sm p-3 rounded outline-none border border-[#0b1220] resize-none"
                                                    />
                                                </div>

                                                {/* Buttons */}
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={runPreview}
                                                        className="px-3 py-1 rounded bg-green-600 text-white text-sm"
                                                    >
                                                        {content[lang].runPreview}
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setHtmlCode(
                                                                '<!doctype html>\n<html>\n  <body>\n    <h1 id="demoHeading">Hi there</h1>\n    <p id="demoPara">Click the heading to see JS</p>\n  </body>\n</html>'
                                                            );
                                                            setCssCode("#demoHeading { color: #06b6d4; }");
                                                            setJsCode(
                                                                "document.getElementById('demoHeading').addEventListener('click', () => { document.getElementById('demoPara').textContent = 'You clicked!'; })"
                                                            );
                                                        }}
                                                        className="px-3 py-1 rounded bg-gray-100 text-slate-700 text-sm"
                                                    >
                                                        {content[lang].reset}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>



                                        {/* right column */}
                                        <div>
                                            <div className="text-xs text-slate-400 mb-2">
                                                {lang === "en"
                                                    ? "Preview (safe iframe)"
                                                    : "पूर्वावलोकन (सुरक्षित iframe)"}
                                            </div>
                                            <div className="rounded-lg border overflow-hidden">
                                                <iframe
                                                    title="preview"
                                                    ref={iframeRef}
                                                    srcDoc={buildSrcDoc(htmlCode, cssCode, jsCode)}
                                                    className="w-full h-64 bg-white"
                                                />
                                                <div className="p-2 text-xs text-slate-500">
                                                    {lang === "en"
                                                        ? "Click heading in preview to see JS run."
                                                        : "पूर्वावलोकन में हेडिंग पर क्लिक करें और JS देखें।"}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}


                            {stage === 4 && (
                                <motion.div
                                    key="s4"
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -6 }}
                                >
                                    <h2 className="text-lg font-bold mb-2">{t('stages.4.title')}</h2>
                                    <p className="text-slate-700 mb-3">{t("stages.4.short")
                                        .split("\n")
                                        .map((line, i) => (
                                            <div key={i}>{line}</div>
                                        ))}</p>

                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {/* Left column: Python editor */}
                                        <div className="p-3 rounded-lg bg-[#0b1220] border">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="text-xs text-slate-400">
                                                    {lang === 'en' ? 'Python (editable)' : 'Python (संपादित करें)'}
                                                </div>
                                                <button
                                                    onClick={runPython}
                                                    disabled={pythonRunning}
                                                    className={`px-3 py-1 rounded text-sm ${pythonRunning
                                                        ? 'bg-gray-400 text-slate-700'
                                                        : 'bg-yellow-600 text-white'
                                                        }`}
                                                >
                                                    {pythonRunning ? content[lang].running : content[lang].run}
                                                </button>
                                            </div>
                                            <textarea
                                                value={pythonCode}
                                                onChange={e => setPythonCode(e.target.value)}
                                                spellCheck={false}
                                                className="w-full min-h-[200px] bg-[#07070a] text-[#d8f3dc] font-mono p-3 rounded outline-none text-sm border border-[#101214]"
                                            />
                                        </div>

                                        {/* Right column: Python output */}
                                        <div className="p-3 rounded-lg bg-white border">
                                            <div className="text-xs text-slate-400 mb-2">
                                                {lang === 'en' ? 'Output (simulated)' : 'आउटपुट (अनुकरण)'}
                                            </div>
                                            <div className="min-h-[200px] p-3 bg-[#0a0f14] rounded text-sm text-[#c7f9ff] font-mono">
                                                {pythonOutput.length === 0 ? (
                                                    <div className="text-slate-400">
                                                        {lang === 'en' ? 'No output yet — press Run' : 'कोई आउटपुट नहीं — Run दबाएँ'}
                                                    </div>
                                                ) : (
                                                    pythonOutput.map((o, i) => <div key={i}>{o}</div>)
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}


                            {stage === 5 && (
                                <motion.div key="s5" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
                                    <h2 className="text-lg font-bold mb-2">{t('stages.5.title')}</h2>
                                    <p className="text-slate-700 mb-3">{t('stages.5.short')}</p>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div className="p-3 rounded-lg bg-[#0b1220] border"><div className="flex items-center justify-between mb-2"><div className="text-xs text-slate-400">{lang === 'en' ? 'Java (editable)' : 'Java (संपादित करें)'}</div><button onClick={runJava} disabled={javaCompiling} className={`px-3 py-1 rounded text-sm ${javaCompiling ? 'bg-gray-400 text-slate-700' : 'bg-indigo-600 text-white'}`}>{javaCompiling ? content[lang].compiling : (lang === 'en' ? 'Compile & Run' : 'कम्पाइल और चलाएँ')}</button></div><textarea value={javaCode} onChange={e => setJavaCode(e.target.value)} spellCheck={false} className="w-full min-h-[220px] bg-[#07070a] text-[#ffeedd] font-mono p-3 rounded outline-none text-sm border border-[#101214]" /></div>
                                        <div className="p-3 rounded-lg bg-white border"><div className="text-xs text-slate-400 mb-2">{lang === 'en' ? 'Console (simulated)' : 'कंसोल (अनुकरण)'}</div><div className="min-h-[220px] p-3 bg-[#0a0f14] rounded text-sm text-[#d1f8ff] font-mono">{javaOutput.length === 0 ? <div className="text-slate-400">{lang === 'en' ? 'No output — try Compile & Run' : 'कोई आउटपुट नहीं — compile और चलाएँ'}</div> : javaOutput.map((l, i) => <div key={i}>{l}</div>)}</div></div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

        </div>
    );
}
