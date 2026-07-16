import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "motion/react"
import {
  Sun, Moon, Menu, X, ExternalLink, Github, Mail,
   ChevronDown, Code2, Smartphone,
  Box, Brain, ArrowRight, MapPin, Send,
} from "lucide-react"

// ─── Data ───────────────────────────────────────────────────────────────────

const SKILLS: Record<string, string[]> = {
  Frontend: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
  Backend: ["Node.js", "Express", "Java", "PostgreSQL"],
  Mobile: ["React Native", "Expo"],
  "3D Design": ["Blender", "Sweet Home", "Fusion 360"],
  "Machine Learning": ["Python"],
};
const PROJECTS = [
  {
    id: 1,
    title: "D&S Journeys",
    description: "A modern travel platform designed to inspire and simplify African adventures by offering curated destinations, personalized travel experiences, and seamless trip planning.",
    stack: ["React", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/Eloheeka/D-S_Journeys.git",
    preview: "https://d-s-journeys.vercel.app/",
  },
  {
    id: 2,
    title: "Bon Berge",
    description: "A responsive school website that streamlines communication between students, parents, and staff while showcasing the institution's programs, achievements, and community.",
    stack: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/Eloheeka/Bon_Berge.git",
    preview: "https://bon-berge.vercel.app/",
  },
  {
    id: 3,
    title: "Kivu Creative",
    description: "An elegant interior design website that highlights creative spaces, showcases design portfolios, and helps clients discover personalized interior solutions.",
    stack: ["Next.js", "Framer Motion", "Tailwind CSS"],
    github: "https://github.com/Eloheeka/KIVU_CREATIVE.git",
    preview: "https://kivu-creative.vercel.app/",
  },
  {
    id: 4,
    title: "Artisan Heaven",
    description: "A digital marketplace that connects skilled artisans with customers, providing a platform to showcase handcrafted products and celebrate creativity and craftsmanship.",
    stack: ["React", "Node.js", "MongoDB"],
    github: "https://github.com/Eloheeka/artisan-haven.git",
    preview: "https://kivu-creative-liard.vercel.app/",
  },
  {
    id: 5,
    title: "Smart-Mine",
    description: "An innovative mining technology platform focused on improving safety, operational efficiency, and sustainability through smart digital solutions and data-driven insights.",
    stack: ["React", "Python", "FastAPI"],
    github: "https://github.com/Eloheeka/SmartMine.git",
    preview: "https://smart-mine-v2.vercel.app/",
  },
  {
    id: 6,
    title: "Imena Paper Pop",
    description: "A modern event announcement platform that enables users to create, customize, and share beautiful digital invitations and event notices with ease.",
    stack: ["Vue", "CSS", "Firebase"],
    github: "https://github.com/Eloheeka/IMENA-PAPER-POP.git",
    preview: "https://imena-paper-pop-delta.vercel.app/",
  },
  {
    id: 7,
    title: "MediTrack",
    description: "A healthcare application that leverages machine learning to support diabetes management by predicting health risks, providing personalized insights, and helping users monitor their condition more effectively.",
    stack: ["React", "Python", "TensorFlow"],
    github: "#",
    preview: "#",
  },
]

const CAT = {
  Frontend: { text: "text-cyan-400",    border: "border-cyan-400/30",    bg: "bg-cyan-400/10",    glow: "rgba(0,212,255,0.35)"   },
  Mobile:   { text: "text-emerald-400", border: "border-emerald-400/30", bg: "bg-emerald-400/10", glow: "rgba(52,211,153,0.35)"  },
  "3D":     { text: "text-violet-400",  border: "border-violet-400/30",  bg: "bg-violet-400/10",  glow: "rgba(167,139,250,0.35)" },
  ML:       { text: "text-rose-400",    border: "border-rose-400/30",    bg: "bg-rose-400/10",    glow: "rgba(251,113,133,0.35)" },
} as const

const SKILL_ICONS = [
  <Code2 size={13} key="fe" />,
  <Smartphone size={13} key="mo" />,
  <Box size={13} key="3d" />,
  <Brain size={13} key="ml" />,
]

const SKILL_COLORS = [
  "text-cyan-400 border-cyan-400/25 bg-cyan-400/8",
  "text-emerald-400 border-emerald-400/25 bg-emerald-400/8",
  "text-violet-400 border-violet-400/25 bg-violet-400/8",
  "text-rose-400 border-rose-400/25 bg-rose-400/8",
]

// ─── Injected CSS ────────────────────────────────────────────────────────────

const STYLES = `
  .f-display { font-family: 'Exo 2', system-ui, sans-serif; }
  .f-mono    { font-family: 'JetBrains Mono', ui-monospace, monospace; }

  @keyframes orbital-spin {
    to { transform: rotate(360deg); }
  }
  @keyframes float-particle {
    0%, 100% { transform: translateY(0) scale(1);   opacity: 0.65; }
    50%       { transform: translateY(-16px) scale(1.4); opacity: 1;    }
  }
  @keyframes grad-shift {
    0%, 100% { background-position: 0% 50%; }
    50%       { background-position: 100% 50%; }
  }
  @keyframes orb-pulse {
    0%, 100% { box-shadow: 0 0 60px rgba(0,212,255,0.45), 0 0 120px rgba(0,212,255,0.12), inset 0 0 40px rgba(0,0,0,0.45); }
    50%       { box-shadow: 0 0 80px rgba(0,212,255,0.65), 0 0 160px rgba(0,212,255,0.2),  inset 0 0 40px rgba(0,0,0,0.45); }
  }

  .grad-text {
    background: linear-gradient(135deg, #00d4ff 0%, #9d4edd 50%, #00d4ff 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: grad-shift 5s linear infinite;
  }

  .grid-bg {
    background-image:
      linear-gradient(rgba(0,212,255,0.035) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,212,255,0.035) 1px, transparent 1px);
    background-size: 64px 64px;
  }

  :root {
    --glass-light: rgba(0,0,0,0.04);
    --glass-dark:  rgba(255,255,255,0.05);
    --glass-border-light: rgba(0,0,0,0.07);
    --glass-border-dark:  rgba(255,255,255,0.08);
  }
  .dark {
    --glass: var(--glass-dark);
    --glass-border: var(--glass-border-dark);
  }
  :root:not(.dark) {
    --glass: var(--glass-light);
    --glass-border: var(--glass-border-light);
  }

  ::-webkit-scrollbar { width: 0; }
  html { scroll-behavior: smooth; }

  .card-glass {
    background: var(--glass);
    backdrop-filter: blur(22px);
    -webkit-backdrop-filter: blur(22px);
    border: 1px solid var(--glass-border);
  }
`

// ─── Loading Screen ──────────────────────────────────────────────────────────

const LOADER_STYLES = `
  @keyframes scan-line {
    0%   { transform: translateY(-100%); opacity: 0; }
    10%  { opacity: 1; }
    90%  { opacity: 1; }
    100% { transform: translateY(100vh); opacity: 0; }
  }
  @keyframes flicker {
    0%, 100% { opacity: 1; }
    92%       { opacity: 1; }
    93%       { opacity: 0.4; }
    94%       { opacity: 1; }
    96%       { opacity: 0.6; }
    97%       { opacity: 1; }
  }
  @keyframes count-up {
    from { content: "0"; }
    to   { content: "100"; }
  }
  @keyframes hbar-fill {
    from { width: 0%; }
    to   { width: 100%; }
  }
  @keyframes caret-blink {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0; }
  }
  @keyframes glitch-1 {
    0%, 100% { clip-path: inset(0 0 100% 0); transform: translate(0); }
    10% { clip-path: inset(10% 0 60% 0); transform: translate(-4px, 2px); }
    20% { clip-path: inset(50% 0 30% 0); transform: translate(4px, -2px); }
    30% { clip-path: inset(70% 0 5% 0);  transform: translate(-2px, 1px); }
    40% { clip-path: inset(0 0 100% 0);  transform: translate(0); }
  }
  @keyframes glitch-2 {
    0%, 100% { clip-path: inset(0 0 100% 0); transform: translate(0); }
    10% { clip-path: inset(40% 0 40% 0); transform: translate(3px, -1px); color: #00d4ff; }
    20% { clip-path: inset(80% 0 5% 0);  transform: translate(-3px, 2px); color: #9d4edd; }
    30% { clip-path: inset(20% 0 70% 0); transform: translate(2px, 0px); }
    40% { clip-path: inset(0 0 100% 0);  transform: translate(0); }
  }
  .loader-flicker { animation: flicker 4s linear infinite; }
  .scan-line {
    position: absolute; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, transparent 0%, rgba(0,212,255,0.6) 50%, transparent 100%);
    animation: scan-line 2.8s linear infinite;
    pointer-events: none; z-index: 10;
  }
`

const LOG_LINES = [
  "Initializing runtime environment...",
  "Loading core modules............. OK",
  "Mounting design system........... OK",
  "Compiling shaders................ OK",
  "Establishing connection........... OK",
  "Rendering portfolio.............. DONE",
]

function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const [logIndex, setLogIndex] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    // Progress bar runs to 100 over ~2.6s
    const step = 100 / 52
    const interval = setInterval(() => {
      setProgress(p => {
        const next = Math.min(p + step, 100)
        if (next >= 100) clearInterval(interval)
        return next
      })
    }, 50)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Stagger log lines
    if (logIndex >= LOG_LINES.length) return
    const t = setTimeout(() => setLogIndex(i => i + 1), 380 + logIndex * 60)
    return () => clearTimeout(t)
  }, [logIndex])

  useEffect(() => {
    if (progress >= 100 && logIndex >= LOG_LINES.length) {
      const t = setTimeout(() => {
        setDone(true)
        setTimeout(onComplete, 900)
      }, 400)
      return () => clearTimeout(t)
    }
  }, [progress, logIndex, onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#06080f" }}
      animate={done ? { opacity: 0, scale: 1.04 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
    >
      <style>{LOADER_STYLES}</style>

      {/* Scan line */}
      <div className="scan-line" />

      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Corner decorations */}
      {[
        "top-6 left-6 border-t border-l",
        "top-6 right-6 border-t border-r",
        "bottom-6 left-6 border-b border-l",
        "bottom-6 right-6 border-b border-r",
      ].map((cls, i) => (
        <div key={i} className={`absolute w-8 h-8 border-cyan-400/40 ${cls}`} />
      ))}

      {/* Centre content */}
      <div className="relative flex flex-col items-center gap-10 w-full max-w-md px-8 loader-flicker">

        {/* Glitching name */}
        <div className="relative select-none" style={{ lineHeight: 1 }}>
          {/* Base layer */}
          <h1 className="f-display font-black text-5xl md:text-6xl text-white tracking-tight">
            ZION ELOHEEKA
          </h1>
          {/* Glitch layer 1 */}
          <h1
            className="f-display font-black text-5xl md:text-6xl text-cyan-400 tracking-tight absolute inset-0"
            style={{ animation: "glitch-1 3.5s steps(1) infinite 1s" }}
            aria-hidden
          >
            ZION ELOHEEKA
          </h1>
          {/* Glitch layer 2 */}
          <h1
            className="f-display font-black text-5xl md:text-6xl text-violet-400 tracking-tight absolute inset-0"
            style={{ animation: "glitch-2 3.5s steps(1) infinite 1.1s" }}
            aria-hidden
          >
            ZION ELOHEEKA
          </h1>
        </div>

        {/* Subtitle */}
        <p className="f-mono text-cyan-400/70 text-xs tracking-[0.4em] uppercase">
          Portfolio v2025 — Initializing
        </p>

        {/* Terminal log */}
        <div
          className="w-full rounded-xl p-5 border border-white/8 space-y-1.5"
          style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(10px)" }}
        >
          {LOG_LINES.slice(0, logIndex).map((line, i) => (
            <div key={i} className="flex gap-3 items-center">
              <span className="text-cyan-400/60 f-mono text-xs shrink-0">›</span>
              <span className="f-mono text-xs text-white/55">{line}</span>
            </div>
          ))}
          {logIndex < LOG_LINES.length && (
            <div className="flex gap-3 items-center">
              <span className="text-cyan-400/60 f-mono text-xs">›</span>
              <span
                className="f-mono text-xs text-white/30 inline-block w-2 h-3 bg-cyan-400/60"
                style={{ animation: "caret-blink 0.8s step-end infinite" }}
              />
            </div>
          )}
        </div>

        {/* Progress bar */}
        <div className="w-full space-y-2">
          <div className="flex justify-between items-center">
            <span className="f-mono text-xs text-white/30 tracking-widest uppercase">Loading</span>
            <span className="f-mono text-xs text-cyan-400">{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-px bg-white/8 relative overflow-hidden rounded-full">
            <div
              className="absolute left-0 top-0 h-full rounded-full transition-all duration-75"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, #0891b2, #9d4edd)",
                boxShadow: "0 0 12px rgba(0,212,255,0.6)",
              }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Scroll Spy ──────────────────────────────────────────────────────────────

function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const obs = ids.map(id => {
      const el = document.getElementById(id)
      if (!el) return null
      const o = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActive(id) },
        { rootMargin: "-40% 0px -50% 0px" }
      )
      o.observe(el)
      return o
    })
    return () => obs.forEach(o => o?.disconnect())
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  return active
}

// ─── 3D Orbital System ───────────────────────────────────────────────────────

function OrbitalSystem() {
  const particles = [
    { size: 4, x: "13%", y: "18%", color: "#00d4ff", delay: 0   },
    { size: 3, x: "82%", y: "14%", color: "#a78bfa", delay: 1.2 },
    { size: 5, x: "86%", y: "72%", color: "#00d4ff", delay: 2.1 },
    { size: 3, x: "10%", y: "78%", color: "#a78bfa", delay: 0.6 },
    { size: 4, x: "50%", y: "90%", color: "#22d3ee", delay: 1.7 },
    { size: 2, x: "72%", y: "32%", color: "#00d4ff", delay: 3.0 },
    { size: 3, x: "26%", y: "88%", color: "#a78bfa", delay: 2.5 },
  ]

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: 440, height: 440, perspective: "1000px" }}
    >
      {/* Ambient glow */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 210, height: 210,
          background: "radial-gradient(circle, rgba(0,212,255,0.22) 0%, transparent 70%)",
          filter: "blur(32px)",
        }}
      />

      {/* Central orb */}
      <div
        className="absolute rounded-full z-10"
        style={{
          width: 140, height: 140,
          background: "radial-gradient(circle at 34% 30%, #a5f3fc 0%, #0891b2 45%, #0c2342 100%)",
          animation: "orb-pulse 3s ease-in-out infinite",
        }}
      />

      {/* Ring 1 — fastest, cyan */}
      <div className="absolute" style={{ width: 300, height: 300, transform: "rotateX(72deg)" }}>
        <div
          className="absolute inset-0 rounded-full"
          style={{ border: "1px solid rgba(0,212,255,0.45)", animation: "orbital-spin 6s linear infinite" }}
        >
          <div
            className="absolute"
            style={{
              width: 13, height: 13, borderRadius: "50%",
              background: "#00d4ff", top: -6.5, left: "calc(50% - 6.5px)",
              boxShadow: "0 0 18px #00d4ff, 0 0 36px rgba(0,212,255,0.5)",
            }}
          />
        </div>
      </div>

      {/* Ring 2 — medium, violet */}
      <div className="absolute" style={{ width: 225, height: 225, transform: "rotateX(72deg) rotateZ(62deg)" }}>
        <div
          className="absolute inset-0 rounded-full"
          style={{ border: "1px solid rgba(167,139,250,0.45)", animation: "orbital-spin 10s linear infinite reverse" }}
        >
          <div
            className="absolute"
            style={{
              width: 9, height: 9, borderRadius: "50%",
              background: "#a78bfa", top: -4.5, left: "calc(50% - 4.5px)",
              boxShadow: "0 0 12px #a78bfa, 0 0 24px rgba(167,139,250,0.4)",
            }}
          />
        </div>
      </div>

      {/* Ring 3 — slow, faint */}
      <div className="absolute" style={{ width: 390, height: 390, transform: "rotateX(72deg) rotateZ(-38deg)" }}>
        <div
          className="absolute inset-0 rounded-full"
          style={{ border: "1px solid rgba(0,212,255,0.15)", animation: "orbital-spin 18s linear infinite" }}
        >
          <div
            className="absolute"
            style={{
              width: 6, height: 6, borderRadius: "50%",
              background: "#22d3ee", top: -3, left: "calc(50% - 3px)",
              boxShadow: "0 0 8px #22d3ee",
            }}
          />
        </div>
      </div>

      {/* Ring 4 — counter-orbit */}
      <div className="absolute" style={{ width: 340, height: 340, transform: "rotateX(72deg) rotateZ(130deg)" }}>
        <div
          className="absolute inset-0 rounded-full"
          style={{ border: "1px solid rgba(167,139,250,0.1)", animation: "orbital-spin 14s linear infinite" }}
        />
      </div>

      {/* Floating particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: p.size, height: p.size,
            background: p.color, top: p.y, left: p.x,
            boxShadow: `0 0 6px ${p.color}`,
            animation: `float-particle ${5 + i * 0.7}s ease-in-out infinite ${p.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

// ─── Section Label ────────────────────────────────────────────────────────────

function SectionLabel({ index, label }: { index: string; label: string }) {
  return (
    <div className="mb-4">
      <p className="f-mono text-cyan-400 text-xs tracking-[0.3em] uppercase">{index} / {label}</p>
    </div>
  )
}

// ─── Fade-in wrapper ──────────────────────────────────────────────────────────

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── Project Card ─────────────────────────────────────────────────────────────

function ProjectCard({ project }: { project: typeof PROJECTS[0] }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -7 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="card-glass relative rounded-2xl p-6 flex flex-col gap-4 group overflow-hidden transition-all duration-300"
      style={{
        boxShadow: hovered ? "0 0 48px rgba(0,212,255,0.25)" : "none",
        borderColor: hovered ? "rgba(0,212,255,0.35)" : undefined,
      }}
    >
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none"
        style={{
          background: "radial-gradient(circle at top left, rgba(0,212,255,0.12), transparent 60%)",
          opacity: hovered ? 1 : 0,
        }}
      />
      <div className="absolute top-0 left-8 right-8 h-px transition-opacity duration-300"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.9), transparent)",
          opacity: hovered ? 1 : 0,
        }}
      />

      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="f-display font-bold text-lg dark:text-white text-gray-900 mb-2 transition-colors duration-300 group-hover:text-cyan-400">
            {project.title}
          </h3>
          <p className="dark:text-white/45 text-gray-500 text-sm leading-relaxed">{project.description}</p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              window.location.href = project.github
            }}
            aria-label={`View ${project.title} on GitHub`}
            className="relative z-20 text-white/25 hover:text-cyan-400 transition-colors duration-200 inline-flex items-center justify-center rounded-md p-1.5 hover:bg-cyan-400/10"
          >
            <Github size={15} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              window.location.href = project.preview
            }}
            aria-label={`Preview ${project.title}`}
            className="relative z-20 text-white/25 hover:text-violet-400 transition-colors duration-200 inline-flex items-center justify-center rounded-md p-1.5 hover:bg-violet-400/10"
          >
            <ExternalLink size={15} />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-auto">
        {project.stack.map(tech => (
          <span
            key={tech}
            className="text-xs f-mono dark:text-cyan-300/80 text-cyan-600/80 dark:bg-cyan-400/10 bg-cyan-400/10 px-2.5 py-1 rounded-lg border border-cyan-400/20"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.article>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [loading, setLoading] = useState(true)
  const [dark, setDark] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [sent, setSent] = useState(false)

  const activeSection = useScrollSpy(["home", "about", "projects", "contact"])

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark)
  }, [dark])

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setMenuOpen(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const formData = new FormData()
    formData.append("access_key", "9f597313-2b31-4dd4-bdeb-82106d33c59f")
    formData.append("name", form.name)
    formData.append("email", form.email)
    formData.append("message", form.message)

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (result.success) {
        setSent(true)
        setForm({ name: "", email: "", message: "" })
        setTimeout(() => setSent(false), 4000)
      }
    } catch (error) {
      console.error("Contact form submission failed", error)
    }
  }

  const NAV = ["Home", "About", "Projects", "Contact"]

  return (
    <div className={dark ? "dark" : ""}>
      <style>{STYLES}</style>

      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {/* ── Nav ──────────────────────────────────────────────────────────── */}
      <header
        className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-12 h-16"
        style={{
          background: dark ? "rgba(8,11,22,0.82)" : "rgba(248,250,255,0.88)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
        }}
      >
        <button onClick={() => scrollTo("home")} className="f-display font-black text-lg tracking-wider grad-text">
          DEV.FOLIO
        </button>

        <nav className="hidden md:flex gap-8 items-center" aria-label="Main navigation">
          {NAV.map(link => (
            <button
              key={link}
              onClick={() => scrollTo(link.toLowerCase())}
              className={`f-mono text-xs tracking-[0.2em] uppercase transition-all duration-200 ${
                activeSection === link.toLowerCase()
                  ? "text-cyan-400"
                  : "dark:text-white/45 text-gray-400 dark:hover:text-white hover:text-gray-900"
              }`}
            >
              {link}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setDark(!dark)}
            aria-label="Toggle theme"
            className="w-9 h-9 flex items-center justify-center rounded-xl border dark:border-white/10 border-black/10 dark:text-white/50 text-gray-500 dark:hover:text-white hover:text-gray-900 dark:hover:border-white/25 hover:border-black/25 transition-all duration-200"
            style={{ background: "var(--glass)" }}
          >
            {dark ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden dark:text-white/60 text-gray-500 dark:hover:text-white hover:text-gray-900 transition-colors"
            aria-label="Menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-10"
          style={{ background: dark ? "rgba(8,11,22,0.97)" : "rgba(248,250,255,0.97)", backdropFilter: "blur(30px)" }}
        >
          {NAV.map(link => (
            <button
              key={link}
              onClick={() => scrollTo(link.toLowerCase())}
              className="f-display text-4xl font-black dark:text-white/80 text-gray-800 dark:hover:text-cyan-400 hover:text-cyan-500 transition-colors duration-200 tracking-widest uppercase"
            >
              {link}
            </button>
          ))}
        </div>
      )}

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        id="home"
        className="min-h-screen flex items-center pt-16 relative overflow-hidden grid-bg"
        style={{
          background: dark
            ? "linear-gradient(135deg, #06080f 0%, #090d1f 100%)"
            : "linear-gradient(135deg, #f0f4ff 0%, #e8f0fe 100%)",
        }}
      >
        {/* Radial glow accent */}
        <div
          className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(157,78,237,0.05) 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
        />

        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="f-mono text-cyan-400 text-xs tracking-[0.35em] uppercase mb-6 flex items-center gap-2">
                <span
                  className="inline-block w-2 h-2 rounded-full bg-cyan-400"
                  style={{ boxShadow: "0 0 8px #00d4ff", animation: "orb-pulse 2s ease-in-out infinite" }}
                />
                Available for opportunities
              </p>

              <h1 className="f-display font-black leading-[1.05] mb-6">
                <span className="block text-5xl md:text-[4.5rem] dark:text-white text-gray-900">Hello,</span>
                <span className="block text-5xl md:text-[4.5rem] dark:text-white text-gray-900">I&apos;m</span>
                <span className="block text-5xl md:text-[4.5rem] grad-text">Zion Eloheeka.</span>
              </h1>

              <p className="f-display text-xl md:text-2xl dark:text-white/55 text-gray-500 mb-4">
                Junior Software Developer
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {["Frontend", "Mobile Dev", "3D Design", "Machine Learning"].map(s => (
                  <span
                    key={s}
                    className="text-xs f-mono px-3 py-1.5 rounded-full border border-cyan-400/30 text-cyan-400/80 bg-cyan-400/5"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <p className="dark:text-white/48 text-gray-500 text-base leading-relaxed max-w-[420px] mb-10">
                Building clean, user-centered interfaces that transform ideas into impactful digital experiences—where usability, aesthetics, and customer satisfaction come first.
              </p>

              <div className="flex gap-4 flex-wrap">
                <button
                  onClick={() => scrollTo("projects")}
                  className="f-mono text-sm px-7 py-3.5 rounded-xl text-white font-medium transition-all duration-300 hover:scale-105 flex items-center gap-2"
                  style={{
                    background: "linear-gradient(135deg, #0891b2 0%, #7c3aed 100%)",
                    boxShadow: "0 0 32px rgba(0,212,255,0.28), 0 4px 24px rgba(0,0,0,0.3)",
                  }}
                >
                  View Projects <ArrowRight size={14} />
                </button>
                <button
                  onClick={() => scrollTo("contact")}
                  className="f-mono text-sm px-7 py-3.5 rounded-xl dark:text-white text-gray-800 font-medium border dark:border-white/12 border-gray-200 dark:hover:border-cyan-400/45 hover:border-cyan-400/45 transition-all duration-300 hover:scale-105"
                  style={{ background: "var(--glass)" }}
                >
                  Contact Me
                </button>
              </div>
            </motion.div>

            {/* Orbital */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="hidden md:flex justify-center items-center"
            >
              <OrbitalSystem />
            </motion.div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 dark:text-white/25 text-gray-300">
          <span className="f-mono text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <ChevronDown size={15} className="animate-bounce" />
        </div>
      </section>

      {/* ── About ────────────────────────────────────────────────────────── */}
      <section
        id="about"
        className="py-32"
        style={{ background: dark ? "#06080f" : "#f8faff" }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <FadeIn className="mb-16">
            <SectionLabel index="01" label="About" />
            <h2 className="f-display font-black text-4xl md:text-5xl dark:text-white text-gray-900">
              Who I Am
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Bio */}
            <FadeIn>
              <div className="space-y-5 mb-12">
                <p className="dark:text-white/65 text-gray-600 text-base leading-relaxed">
                  I'm a junior software developer passionate about building intuitive, user-focused digital experiences that solve real-world problems. I believe great software is more than clean code—it's about creating meaningful impact, improving lives, and delivering value through thoughtful design and functionality. Every project is an opportunity to learn, innovate, and build something people genuinely enjoy using.
                </p>
                <p className="dark:text-white/65 text-gray-600 text-base leading-relaxed">
                  Currently deepening my expertise in machine learning and exploring the
                  convergence of AI with interactive 3D graphics. 
                </p>
                
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Projects", value: "10+" },
                  { label: "Technologies", value: "12+" },
                ].map(s => (
                  <div
                    key={s.label}
                    className="card-glass rounded-2xl p-5 text-center"
                  >
                    <div className="f-display font-black text-2xl grad-text">{s.value}</div>
                    <div className="f-mono text-xs dark:text-white/35 text-gray-400 mt-1 tracking-wide">{s.label}</div>
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* Skills */}
            <FadeIn delay={0.1} className="space-y-8">
              {Object.entries(SKILLS).map(([cat, skills], i) => {
                const colorClass = SKILL_COLORS[i % SKILL_COLORS.length]
                const icon = SKILL_ICONS[i % SKILL_ICONS.length]

                return (
                  <div key={cat}>
                    <div className={`flex items-center gap-2 f-mono text-xs tracking-[0.25em] uppercase mb-3 ${colorClass.split(" ")[0]}`}>
                      {icon}
                      <span>{cat}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skills.map(skill => (
                        <span
                          key={skill}
                          className={`text-xs f-mono px-3 py-1.5 rounded-lg border transition-all duration-200 hover:scale-105 cursor-default ${colorClass}`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )
              })}
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Projects ─────────────────────────────────────────────────────── */}
      <section
        id="projects"
        className="py-32"
        style={{ background: dark ? "#080b14" : "#eef2ff" }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <FadeIn className="mb-12">
            <SectionLabel index="02" label="Projects" />
            <h2 className="f-display font-black text-4xl md:text-5xl dark:text-white text-gray-900">
              Selected Work
            </h2>
          </FadeIn>

          {/* Grid */}
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Contact ──────────────────────────────────────────────────────── */}
      <section
        id="contact"
        className="py-32"
        style={{ background: dark ? "#06080f" : "#f8faff" }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <FadeIn className="mb-16">
            <SectionLabel index="03" label="Contact" />
            <h2 className="f-display font-black text-4xl md:text-5xl dark:text-white text-gray-900">
              Let&apos;s Build Together
            </h2>
            <p className="dark:text-white/48 text-gray-500 text-base mt-4 max-w-md leading-relaxed">
              Have a project in mind or want to explore a collaboration? Drop me a message —
              I reply within 24 hours.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-5 gap-12">
            {/* Form */}
            <FadeIn className="md:col-span-3">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  {(["name", "email"] as const).map(field => (
                    <div key={field}>
                      <label className="f-mono text-xs tracking-[0.25em] uppercase dark:text-white/38 text-gray-400 block mb-2">
                        {field}
                      </label>
                      <input
                        type={field === "email" ? "email" : "text"}
                        value={form[field]}
                        onChange={e => setForm(prev => ({ ...prev, [field]: e.target.value }))}
                        placeholder={field === "email" ? "alex@example.com" : "Your name"}
                        required
                        className="w-full px-4 py-3 rounded-xl f-mono text-sm dark:text-white text-gray-900 border dark:border-white/10 border-black/10 outline-none focus:border-cyan-400/55 transition-all duration-200 dark:placeholder-white/18 placeholder-gray-300"
                        style={{ background: "var(--glass)", backdropFilter: "blur(10px)" }}
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="f-mono text-xs tracking-[0.25em] uppercase dark:text-white/38 text-gray-400 block mb-2">
                    message
                  </label>
                  <textarea
                    rows={5}
                    value={form.message}
                    onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Tell me about your project..."
                    required
                    className="w-full px-4 py-3 rounded-xl f-mono text-sm dark:text-white text-gray-900 border dark:border-white/10 border-black/10 outline-none focus:border-cyan-400/55 transition-all duration-200 resize-none dark:placeholder-white/18 placeholder-gray-300"
                    style={{ background: "var(--glass)", backdropFilter: "blur(10px)" }}
                  />
                </div>

                <div className="flex items-center gap-4">
                  <button
                    type="submit"
                    className="f-mono text-sm px-8 py-3.5 rounded-xl text-white font-medium transition-all duration-300 hover:scale-105 flex items-center gap-2"
                    style={{
                      background: "linear-gradient(135deg, #0891b2 0%, #7c3aed 100%)",
                      boxShadow: "0 0 28px rgba(0,212,255,0.22), 0 4px 20px rgba(0,0,0,0.25)",
                    }}
                  >
                    <Send size={14} />
                    Send Message
                  </button>

                  {sent && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="f-mono text-xs text-cyan-400"
                    >
                      ✓ Message sent — I&apos;ll be in touch!
                    </motion.span>
                  )}
                </div>
              </form>
            </FadeIn>

            {/* Info */}
            <FadeIn delay={0.1} className="md:col-span-2 space-y-8">
              <div className="card-glass rounded-2xl p-6 space-y-6">
                {[
                  { icon: <Mail size={15} />, label: "Email", value: "m.eloheeka12@gmail.com" },
                  { icon: <MapPin size={15} />, label: "Location", value: "Kigali, Rwanda" },
                ].map(item => (
                  <div key={item.label} className="flex gap-4 items-start">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center text-cyan-400 border border-cyan-400/25 bg-cyan-400/10 shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <div className="f-mono text-[10px] dark:text-white/32 text-gray-400 uppercase tracking-[0.25em]">{item.label}</div>
                      <div className="dark:text-white/78 text-gray-700 text-sm mt-0.5">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <p className="f-mono text-[10px] dark:text-white/32 text-gray-400 uppercase tracking-[0.3em] mb-4">
                  Find me online
                </p>
                <div className="flex gap-3">
                  {[
                    { icon: <Github size={17} />, label: "GitHub", href: "https://github.com/Eloheeka" },
                    { icon: <Mail size={17} />, label: "Email", href: "mailto:m.eloheeka12@gmail.com" },
                  ].map(s => (
                    <a
                      key={s.label}
                      href={s.href}
                      target={s.href.startsWith("http") ? "_blank" : undefined}
                      rel={s.href.startsWith("http") ? "noreferrer" : undefined}
                      aria-label={s.label}
                      className="w-11 h-11 rounded-xl flex items-center justify-center dark:text-white/45 text-gray-400 border dark:border-white/10 border-black/8 dark:hover:text-cyan-400 hover:text-cyan-500 dark:hover:border-cyan-400/38 hover:border-cyan-400/38 transition-all duration-200 hover:scale-110"
                      style={{ background: "var(--glass)" }}
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer
        className="py-8 border-t dark:border-white/6 border-black/6"
        style={{ background: dark ? "#06080f" : "#f8faff" }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="f-display font-black grad-text text-lg tracking-wider">DEV.FOLIO</span>
          <p className="f-mono text-xs dark:text-white/22 text-gray-400">
            © 2026 Zion Eloheeka 
          </p>
        </div>
      </footer>
    </div>
  )
}
