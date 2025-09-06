import React from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import {
  Search,
  BookOpen,
  Milestone,
  Star,
} from "lucide-react";
import { FaHome, FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { Link, useNavigate } from "react-router-dom";


const AnimatedDeveloperMindIcon = () => {
  return (
    <motion.svg
      viewBox="40 40 160 110"
      width="250"
      height="auto"
      className="mx-auto"
      initial="hidden"
      animate="visible"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* --- Table (closer) --- */}
      <motion.rect x="90" y="100" width="84" height="12" fill="#4B5563" rx="2" />

      {/* --- Tea Cup (closer) --- */}
      <motion.ellipse cx="135" cy="92" rx="14" ry="7" fill="#FCD34D" stroke="#B45309" />
      <motion.rect x="123" y="85" width="24" height="10" rx="5" fill="#FCD34D" stroke="#B45309" />

      {/* --- Steam Cluster 1: Cup --- */}
      {[...Array(5)].map((_, i) => (
        <motion.path
          key={`cup-${i}`}
          d={`M135 ${92 - i * 2} C${133 - i} ${85 - i * 3}, ${137 + i} ${80 - i * 3}, 135 ${72 - i * 4}`}
          stroke="#D1D5DB"
          strokeWidth={Math.random() * 2 + 1}
          strokeOpacity={Math.random() * 0.5 + 0.5}
          fill="none"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: [0, 1, 0], y: [-5, -25, -50] }}
          transition={{
            duration: 3 + Math.random(),
            delay: i * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* --- Steam Cluster 2: Drifting Toward Developer --- */}
      {[...Array(4)].map((_, i) => (
        <motion.path
          key={`dev-${i}`}
          d={`M140 ${90 - i * 2} C${138 - i} ${85 - i * 2}, ${142 + i} ${78 - i * 2}, 138 ${70 - i * 3}`}
          stroke="#D1D5DB"
          strokeWidth={Math.random() * 1.5 + 0.5}
          strokeOpacity={Math.random() * 0.4 + 0.4}
          fill="none"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: [0, 1, 0], y: [-10, -30, -60] }}
          transition={{
            duration: 3 + Math.random(),
            delay: i * 0.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* --- Chair --- */}
      <motion.rect x="38" y="110" width="44" height="10" fill="#6B7280" rx="2" />
      <motion.rect x="50" y="120" width="20" height="10" fill="#6B7280" rx="2" />

      {/* --- Developer Head --- */}
      <motion.circle cx="60" cy="60" r="16" fill="#FCA5A5" stroke="#78350F" strokeWidth="1.5" />

      {/* Glasses */}
      <motion.rect x="52" y="56" width="8" height="6" rx="2" stroke="#111827" fill="none" />
      <motion.rect x="60" y="56" width="8" height="6" rx="2" stroke="#111827" fill="none" />
      <motion.line x1="60" y1="59" x2="60" y2="59" stroke="#111827" />

      {/* --- Body --- */}
      <motion.rect x="48" y="74" width="24" height="32" rx="5" fill="#3B82F6" />

      {/* Arms typing (more pronounced) */}
      <motion.rect
        x="40"
        y="78"
        width="8"
        height="18"
        rx="3"
        fill="#3B82F6"
        animate={{ rotate: [0, -15, 0, 15, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <motion.rect
        x="72"
        y="78"
        width="8"
        height="18"
        rx="3"
        fill="#3B82F6"
        animate={{ rotate: [0, 15, 0, -15, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.75 }}
      />

      {/* Legs */}
      <motion.rect x="44" y="106" width="12" height="22" fill="#2563EB" rx="3" />
      <motion.rect x="64" y="106" width="12" height="22" fill="#2563EB" rx="3" />

      {/* --- Laptop --- */}
      <motion.rect x="45" y="90" width="30" height="18" fill="#9CA3AF" stroke="#374151" rx="2" />
      <motion.rect x="45" y="90" width="30" height="2" fill="#1F2937" />

      {/* Laptop code lines */}
      {[...Array(4)].map((_, i) => (
        <motion.rect
          key={i}
          x="50"
          y={95 + i * 3}
          width={20}
          height="2"
          fill={i % 2 === 0 ? "#10B981" : "#F59E0B"}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.5 }}
        />
      ))}
    </motion.svg>

  );
};

// Background blob animation
const MorphBlob = () => (
  <motion.div
    className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-r from-cyan-500/30 to-indigo-500/30 rounded-full blur-3xl"
    animate={{ scale: [1, 1.2, 1], rotate: [0, 30, -30, 0] }}
    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
  />
);

// --- Data ---
const steps = [
  { icon: <Search className="w-8 h-8" />, title: "Find the Need", text: "Look for problems people face daily." },
  { icon: <BookOpen className="w-8 h-8" />, title: "Plan the Steps", text: "Break the big idea into tiny tasks." },
  { icon: <Milestone className="w-8 h-8" />, title: "Try It Small", text: "Build & test a small piece first." },
  { icon: <Star className="w-8 h-8" />, title: "Improve Gently", text: "Fix mistakes and polish it up." },
];

const examples = [
  {
    title: "Bus Stop Board",
    need: "People don’t know when the bus will come.",
    plan: "Show next buses & minutes left.",
    build: "Take timings, compare with clock, display numbers.",
  },
  {
    title: "Class Attendance",
    need: "Teachers spend time marking names.",
    plan: "Tap student’s name to mark present.",
    build: "List names, tap = mark, count total present.",
  },
  {
    title: "Canteen Token",
    need: "Long lunch line is confusing.",
    plan: "Give token numbers and call in order.",
    build: "Issue token, show current number, beep next.",
  },
];

const stories = [
  {
    who: "From Fashion to Engineer",
    note: "Started with an online fashion course but discovered a passion for problem-solving. Took a free intro to coding course, built small projects, and eventually became a developer while also teaching kids to code on weekends. Overcame the fear of switching careers and embraced continuous learning.",
    source: "Passion + practice works. Fear of starting is normal; persistence creates mastery."
  },
  {
    who: "From Landscaping to Dev",
    note: "Worked long hours in landscaping and often felt limited by routine work. Started building simple web projects after work, learning through trial and error. Gradually progressed to freelance gigs, then a full-time developer role. Learned that small consistent efforts compound into major breakthroughs.",
    source: "Learn by building. Every small project teaches a bigger lesson."
  },
  {
    who: "Internal Move to Tech",
    note: "Started in operations with zero coding experience. Curiosity drove them to learn tools and automation. Built small scripts to solve daily tasks, gradually getting noticed by the tech team. Transitioned into a tech role without formal CS education, proving passion and initiative matter more than credentials.",
    source: "Courage to begin is enough. Start small, keep building, the rest will follow."
  },
  {
    who: "Teacher to Software Developer",
    note: "Spent years teaching students, but always wanted to create tools that could impact more people. Learned Python and JavaScript at night, built educational apps, contributed to open-source projects, and eventually landed a dev role in edtech. Shows that transferable skills + persistence create new paths.",
    source: "Your past experience is an asset. Combine it with learning and passion."
  },
  {
    who: "Self-Taught College Dropout",
    note: "Dropped out of college due to financial challenges. Taught themselves coding via online resources and mentorship communities. Built a portfolio of projects, networked online, and secured a role in a startup. Proves that determination and self-learning can outperform formal education.",
    source: "Learning never stops. Your mindset defines your trajectory."
  },
  {
    who: "From Hobbyist to Innovator",
    note: "Started coding as a weekend hobby. Solved small automation problems for friends and family, then built apps to streamline local businesses. Their projects caught attention online, leading to collaborations and eventually a full-time software development career.",
    source: "Start with curiosity, solve real problems, and opportunities will follow."
  },
];


// --- Animated Counter ---
const AnimatedCounter = ({ to }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  React.useEffect(() => {
    if (isInView) {
      animate(count, to, { duration: 2, ease: "easeOut" });
    }
  }, [isInView, to, count]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
};

// --- Main Component ---
const DeveloperHybridPage = () => {
  const navigate = useNavigate()
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-gray-200 font-sans overflow-hidden">
      {/* background blob */}
      <MorphBlob />
      <div className="flex justify-center mb-1 pt-8">
        <Link
          to="/parts/prt2"
          className="inline-flex items-center px-5 py-2 rounded-full border border-cyan-400/50 
                     text-cyan-300 font-semibold transition-all
                     bg-cyan-500/10 hover:bg-cyan-500/20 
                     hover:shadow-[0_0_20px_rgba(34,211,238,0.6)] backdrop-blur-md"
        >
          <FaHome className="mr-2 text-lg text-cyan-300" />
          Home
        </Link>
      </div>
      <div className="relative max-w-6xl mx-auto px-6 py-2">
        {/* Hero */}
        <motion.header className="text-center py-10">
          <div className="relative flex justify-center items-center">
            <AnimatedDeveloperMindIcon />
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-emerald-400 to-purple-400">
              You Are a Problem-Solver
            </span>
          </h1>
          <motion.p className="max-w-2xl mx-auto text-xl text-gray-400 mt-4">
            Developers are creators. They take ideas and turn them into reality.
            Your journey starts with curiosity and small steps.
          </motion.p>
        </motion.header>
        <div className="max-w-2xl mx-auto mt-4 space-y-4 text-gray-300 text-lg">
          <div className="flex items-start gap-3">
            <span className="mt-1 text-yellow-400 text-xl">🚀</span>
            <p>
              Discover how <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-purple-400">developers think</span>,
              from spotting <span className="font-semibold text-yellow-400">everyday problems </span>
              to crafting <span className="font-bold text-green-400">real-world solutions</span>.
            </p>
          </div>

          <div className="flex items-start gap-3">
            <span className="mt-1 text-cyan-400 text-xl">💻</span>
            <p>
              Explore <span className="font-bold text-purple-400">inspiring journeys</span>,
              <span className="font-semibold text-cyan-400">practical examples</span>,
              and step-by-step <span className="font-bold text-emerald-400">insights </span>
              to ignite your own path in <span className="font-bold text-yellow-400">software development</span>.
            </p>
          </div>
        </div>

        {/* Steps */}
        <section className="my-20">
          <h2 className="text-center text-3xl md:text-4xl font-bold mb-12">
            How a Developer Thinks
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                className="bg-[#161B22] p-6 rounded-xl border border-gray-800 text-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
              >
                <div className="flex justify-center items-center w-20 h-20 rounded-full bg-gray-800/50 mx-auto mb-4 text-cyan-400">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Examples */}
        <section className="my-20">
          <h2 className="text-center text-3xl md:text-4xl font-bold mb-12">
            From Ideas to Real Apps
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {examples.map((ex, i) => (
              <motion.div
                key={ex.title}
                className="bg-[#161B22] p-6 rounded-xl border border-gray-800"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.2 }}
              >
                <h3 className="text-xl font-bold text-emerald-400 mb-4">
                  {ex.title}
                </h3>
                <p><b className="text-gray-300">Need:</b> {ex.need}</p>
                <p><b className="text-gray-300">Plan:</b> {ex.plan}</p>
                <p><b className="text-gray-300">Build:</b> {ex.build}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Salary */}
        <section className="my-20">
          <h2 className="text-center text-3xl md:text-4xl font-bold mb-12">
            Your Growth = Your Rewards
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div className="bg-[#161B22] p-8 rounded-xl border border-gray-800">
              <h3 className="text-xl font-bold">Junior</h3>
              <p className="text-4xl font-bold text-emerald-400">
                ₹<AnimatedCounter to={3} />–<AnimatedCounter to={10} /> L
              </p>
              <p className="text-sm text-gray-400">per year</p>
            </motion.div>
            <motion.div className="bg-[#161B22] p-8 rounded-xl border-2 border-purple-500 scale-105 shadow-lg shadow-purple-500/20">
              <h3 className="text-xl font-bold">Mid-Level</h3>
              <p className="text-5xl font-bold text-purple-400">
                ₹<AnimatedCounter to={10} />–<AnimatedCounter to={25} /> L
              </p>
              <p className="text-sm text-gray-400">per year</p>
            </motion.div>
            <motion.div className="bg-[#161B22] p-8 rounded-xl border border-gray-800">
              <h3 className="text-xl font-bold">Senior / Lead</h3>
              <p className="text-4xl font-bold text-cyan-400">
                ₹<AnimatedCounter to={25} />–<AnimatedCounter to={80} /> L+
              </p>
              <p className="text-sm text-gray-400">per year</p>
            </motion.div>
          </div>
        </section>

        {/* Stories */}
        <section className="my-20">
          <h2 className="text-center text-3xl md:text-4xl font-bold mb-12">
            Real Journeys, Real Inspiration ✨
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stories.map((s, i) => (
              <motion.div
                key={s.who}
                className="bg-[#161B22] p-6 rounded-xl border border-gray-800 shadow-lg hover:shadow-cyan-500/30"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, type: "spring", stiffness: 80 }}
              >
                <h3 className="font-bold text-center text-emerald-400 text-lg md:text-xl mb-2 decoration-sky-400 decoration-2">
                  {s.who} 💡
                </h3>

                <p className="text-gray-300 my-2">
                  <span className="font-semibold text-pink-600">Journey:</span> {s.note}
                </p>

                <p className="text-gray-300 my-2">
                  <span className="font-semibold text-yellow-400">Lesson:</span> {s.source}
                </p>

                {/* Optional Emoji Highlight */}
                <div className="mt-4 flex gap-2 justify-center">
                  <span>🚀</span>
                  <span>💻</span>
                  <span>🎯</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Page Navigation*/}
        <div className="flex justify-between items-center -mt-6 p-4 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md">
          <button
            onClick={() => navigate('/module2/developer-role')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-cyan-400/50 
                       text-cyan-300 font-medium transition-all
                       bg-cyan-500/10 hover:bg-cyan-500/20 
                       hover:shadow-[0_0_15px_rgba(34,211,238,0.6)]"
          >
            <FaArrowLeft className="text-cyan-300" />
            Previous
          </button>

          <button
            onClick={() => navigate('/module2/sdlc')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-fuchsia-400/50 
                       text-fuchsia-300 font-medium transition-all
                       bg-fuchsia-500/10 hover:bg-fuchsia-500/20 
                       hover:shadow-[0_0_15px_rgba(217,70,239,0.6)]"
          >
            Next
            <FaArrowRight className="text-fuchsia-300" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeveloperHybridPage;
