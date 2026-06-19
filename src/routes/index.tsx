import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useInView } from "motion/react";
import {
  Mail,
  Phone,
  Instagram,
  ArrowRight,
  Code2,
  Globe,
  Terminal,
  GraduationCap,
  Sparkles,
  Target,
  Rocket,
  BookOpen,
  Copy,
  Check,
  ChevronDown,
  Github,
  Send,
} from "lucide-react";
import { Toaster, toast } from "sonner";
import profilePic from "@/assets/charan-profile.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Charan.D — Engineering Student & Developer" },
      { name: "description", content: "Portfolio of Charan.D — engineering student at Sapthagiri NPS University, exploring Python, C, and modern web development." },
      { property: "og:title", content: "Charan.D — Engineering Student & Developer" },
      { property: "og:description", content: "Aspiring developer focused on Python, C, and modern web technologies." },
    ],
  }),
  component: Portfolio,
});

const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Journey" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" },
];

function Portfolio() {
  const { scrollYProgress } = useScroll();
  const progressX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 700);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Toaster theme="dark" position="bottom-right" />

      {/* Loader */}
      <div
        className={`fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-500 ${
          loaded ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="relative h-14 w-14">
            <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-[color:var(--electric)] border-r-[color:var(--violet)]" />
            <div className="absolute inset-2 rounded-full bg-gradient-to-br from-[color:var(--electric)] to-[color:var(--violet)] opacity-40 blur-md" />
          </div>
          <span className="font-mono text-xs tracking-widest text-muted-foreground">LOADING</span>
        </div>
      </div>

      {/* Scroll progress */}
      <motion.div
        style={{ scaleX: progressX }}
        className="fixed left-0 right-0 top-0 z-50 h-[2px] origin-left bg-gradient-to-r from-[color:var(--electric)] via-[color:var(--violet)] to-[color:var(--electric)]"
      />

      <Nav />

      <main>
        <Hero />
        <About />
        <Education />
        <Skills />
        <Projects />
        <Experience />
        <Services />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

/* ============================ NAV ============================ */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed left-1/2 top-4 z-40 w-[min(1100px,94%)] -translate-x-1/2 rounded-2xl transition-all duration-300 ${
        scrolled ? "glass shadow-[0_8px_32px_-8px_oklch(0_0_0_/_0.6)]" : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-5 py-3">
        <a href="#home" className="flex items-center gap-2 font-semibold">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-[color:var(--electric)] to-[color:var(--violet)] text-sm font-bold text-primary-foreground">
            C
          </span>
          <span className="text-sm tracking-wide">Charan.D</span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className="rounded-lg px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="hidden rounded-xl bg-gradient-to-r from-[color:var(--electric)] to-[color:var(--violet)] px-4 py-2 text-xs font-semibold text-primary-foreground transition-transform hover:scale-105 md:inline-flex"
        >
          Let's Talk
        </a>

        <button
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="grid h-9 w-9 place-items-center rounded-lg bg-white/5 md:hidden"
        >
          <div className="flex flex-col gap-1">
            <span className={`h-0.5 w-4 bg-foreground transition-transform ${open ? "translate-y-1.5 rotate-45" : ""}`} />
            <span className={`h-0.5 w-4 bg-foreground transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`h-0.5 w-4 bg-foreground transition-transform ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
          </div>
        </button>
      </div>

      {open && (
        <div className="grid grid-cols-2 gap-1 border-t border-white/10 p-3 md:hidden">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-white/5 hover:text-foreground"
            >
              {n.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

/* ============================ HERO ============================ */

const TYPED = ["Engineering Student", "Python Developer", "Web Developer"];

function Typed() {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);

  useEffect(() => {
    const word = TYPED[i];
    const speed = del ? 55 : 95;
    const t = setTimeout(() => {
      if (!del) {
        const next = word.slice(0, text.length + 1);
        setText(next);
        if (next === word) setTimeout(() => setDel(true), 1400);
      } else {
        const next = word.slice(0, text.length - 1);
        setText(next);
        if (next === "") {
          setDel(false);
          setI((i + 1) % TYPED.length);
        }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [text, del, i]);

  return (
    <span className="font-mono text-gradient">
      {text}
      <span className="ml-0.5 inline-block w-[2px] animate-blink bg-[color:var(--electric)]">&nbsp;</span>
    </span>
  );
}

function CircleBadge({ text, size = 130, children }: { text: string; size?: number; children?: React.ReactNode }) {
  const chars = text.split("");
  const angleStep = 360 / chars.length;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <div className="absolute inset-0 animate-spin-slow rounded-full">
        <svg viewBox="0 0 200 200" className="h-full w-full">
          <defs>
            <path id={`cb-${text}`} d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
          </defs>
          <text fill="currentColor" className="text-foreground" style={{ fontSize: 18, letterSpacing: 3, fontWeight: 600 }}>
            <textPath href={`#cb-${text}`}>{text}</textPath>
          </text>
        </svg>
      </div>
      <div className="absolute inset-[22%] grid place-items-center rounded-full bg-[color:var(--electric)] text-primary-foreground shadow-[0_10px_30px_-5px_oklch(0.74_0.19_50_/_0.6)]">
        {children}
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="home" className="relative px-4 pb-20 pt-32 sm:pt-40">
      {/* Background brush strokes */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -right-32 top-20 h-[420px] w-[420px] rotate-[-25deg] rounded-[100%] border-[60px] border-[color:var(--electric)]/70 [clip-path:polygon(0_0,100%_0,100%_50%,0_50%)]" />
        <div className="absolute -left-40 bottom-10 h-[320px] w-[320px] rotate-[20deg] rounded-[100%] border-[40px] border-[color:var(--electric)]/40 [clip-path:polygon(0_50%,100%_50%,100%_100%,0_100%)]" />
        <div className="absolute right-1/4 top-1/3 text-[280px] font-black leading-none text-[color:var(--electric)]/10 select-none">✦</div>
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* DOWNLOAD CV pill */}
        <div className="mb-6 flex justify-end">
          <a
            href="#contact"
            className="rounded-full bg-[color:var(--electric)] px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-primary-foreground transition-transform hover:scale-105"
          >
            Hire Me →
          </a>
        </div>

        {/* Massive headline + portrait composition */}
        <div className="relative">
          <h1 className="relative z-10 text-center text-[18vw] font-black uppercase leading-[0.85] tracking-tight sm:text-[15vw] md:text-[13rem] lg:text-[15rem]">
            <span className="block">I'M A</span>
            <span className="relative block">
              <span>DEVE</span>
              <span className="text-stroke mx-2">LOPER</span>
            </span>
          </h1>

          {/* Portrait absolutely overlapping text */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-[55%]"
          >
            <div className="relative h-[40vw] max-h-[460px] min-h-[260px] w-[30vw] min-w-[220px] max-w-[360px] overflow-hidden rounded-t-full bg-surface">
              <img
                src={profilePic}
                alt="Charan.D"
                className="h-full w-full object-cover grayscale contrast-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>

        {/* Scroll-down badge */}
        <div className="mt-8 flex justify-center text-[color:var(--electric)]">
          <CircleBadge text="SCROLL DOWN • SCROLL DOWN • ">
            <ChevronDown className="h-6 w-6" />
          </CircleBadge>
        </div>
      </div>
    </section>
  );
}


/* ============================ Reusable ============================ */

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeader({ kicker, title, sub }: { kicker: string; title: string; sub?: string }) {
  return (
    <Reveal>
      <div className="mb-14 text-center">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-[color:var(--electric)]">
          / {kicker}
        </span>
        <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          <span className="text-gradient">{title}</span>
        </h2>
        {sub && <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">{sub}</p>}
      </div>
    </Reveal>
  );
}

/* ============================ ABOUT ============================ */

function About() {
  const facts = [
    { icon: GraduationCap, label: "University", value: "Sapthagiri NPS" },
    { icon: BookOpen, label: "Year", value: "1st Year, 2nd Sem" },
    { icon: Target, label: "Focus", value: "Python · C · Web" },
    { icon: Rocket, label: "Status", value: "Learning & Building" },
  ];

  return (
    <section id="about" className="relative px-4 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeader kicker="about" title="About Me" />

        <div className="grid items-start gap-10 md:grid-cols-2">
          <Reveal>
            <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
              <p>
                I'm an <span className="text-foreground">engineering student at Sapthagiri NPS University</span>,
                currently in my 1st Year, 2nd Semester (Admission 2025–26).
              </p>
              <p>
                I'm fascinated by technology, software development, and the craft of writing
                clean, meaningful code. Every day I'm sharpening my fundamentals and exploring
                how ideas become real products.
              </p>
              <p className="rounded-2xl border-l-2 border-[color:var(--electric)] bg-white/[0.03] p-4 italic text-foreground/90">
                "Focused on strengthening programming fundamentals and building practical projects
                while developing skills for future opportunities."
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="grid grid-cols-2 gap-4">
              {facts.map((f) => (
                <div
                  key={f.label}
                  className="group rounded-2xl glass p-5 transition-all hover:-translate-y-1 hover:border-[color:var(--electric)]/40"
                >
                  <div className="mb-3 grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-[color:var(--electric)]/20 to-[color:var(--violet)]/20 text-[color:var(--electric)]">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">{f.label}</div>
                  <div className="mt-1 text-sm font-semibold">{f.value}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ============================ EDUCATION ============================ */

function Education() {
  return (
    <section id="education" className="relative px-4 py-28">
      <div className="mx-auto max-w-4xl">
        <SectionHeader kicker="education" title="Education" />

        <Reveal>
          <div className="relative pl-8 md:pl-16">
            <div className="absolute left-2 top-2 h-full w-px bg-gradient-to-b from-[color:var(--electric)] via-[color:var(--violet)] to-transparent md:left-6" />
            <div className="absolute left-0 top-1 grid h-5 w-5 place-items-center rounded-full bg-background ring-2 ring-[color:var(--electric)] md:left-4">
              <div className="h-2 w-2 rounded-full bg-[color:var(--electric)]" />
            </div>

            <div className="group rounded-3xl glass p-8 transition-all hover:-translate-y-1 hover:border-[color:var(--electric)]/40">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="font-mono text-xs uppercase tracking-widest text-[color:var(--violet)]">
                    2025 — Present
                  </div>
                  <h3 className="mt-2 text-2xl font-bold">Engineering</h3>
                  <p className="mt-1 text-muted-foreground">Sapthagiri NPS University</p>
                </div>
                <span className="rounded-full bg-[color:var(--electric)]/15 px-3 py-1 text-xs font-semibold text-[color:var(--electric)]">
                  Currently Pursuing
                </span>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                {[
                  { l: "Admission", v: "2025–26" },
                  { l: "Year", v: "1st" },
                  { l: "Semester", v: "2nd" },
                ].map((x) => (
                  <div key={x.l} className="rounded-xl bg-white/[0.03] p-3">
                    <div className="text-xs text-muted-foreground">{x.l}</div>
                    <div className="mt-0.5 text-sm font-semibold">{x.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================ SKILLS ============================ */

const SKILLS = [
  { name: "Python", level: 70, icon: Terminal, category: "Programming", color: "from-[color:var(--electric)] to-cyan-400" },
  { name: "C Programming", level: 65, icon: Code2, category: "Programming", color: "from-[color:var(--violet)] to-pink-400" },
  { name: "Web Development", level: 60, icon: Globe, category: "Development", color: "from-[color:var(--electric)] to-[color:var(--violet)]" },
];

function SkillBar({ skill, i }: { skill: (typeof SKILLS)[number]; i: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: i * 0.1 }}
      className="group rounded-2xl glass p-6 transition-all hover:-translate-y-1 hover:border-[color:var(--electric)]/40"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${skill.color} text-primary-foreground`}>
            <skill.icon className="h-5 w-5" />
          </div>
          <div>
            <div className="font-semibold">{skill.name}</div>
            <div className="text-xs text-muted-foreground">{skill.category}</div>
          </div>
        </div>
        <div className="font-mono text-sm text-[color:var(--electric)]">{skill.level}%</div>
      </div>
      <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/5">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1.2, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
        />
      </div>
    </motion.div>
  );
}

function Skills() {
  return (
    <section id="skills" className="relative px-4 py-28">
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          kicker="skills"
          title="Skills & Stack"
          sub="The tools and languages I'm actively learning and building with."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {SKILLS.map((s, i) => (
            <SkillBar key={s.name} skill={s} i={i} />
          ))}
        </div>

        <Reveal delay={0.3}>
          <div className="mt-10 flex flex-wrap justify-center gap-2 text-xs">
            {["Problem Solving", "DSA Basics", "HTML", "CSS", "JavaScript", "Git", "VS Code", "Linux"].map((t) => (
              <span key={t} className="rounded-full glass px-3 py-1.5 font-mono text-muted-foreground transition-colors hover:text-foreground">
                {t}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================ PROJECTS ============================ */

const FUTURE = [
  { title: "Project Coming Soon", desc: "First Python project — currently designing the architecture.", icon: Terminal },
  { title: "Building New Ideas", desc: "Crafting a responsive web experience from scratch.", icon: Globe },
  { title: "Stay Tuned", desc: "More creative builds on the way as I level up.", icon: Sparkles },
];

function Projects() {
  return (
    <section id="projects" className="relative px-4 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          kicker="projects"
          title="Future Projects"
          sub="Real projects are on the way. Here's what's brewing in the workshop."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {FUTURE.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <div className="group relative h-full overflow-hidden rounded-3xl glass p-7 transition-all hover:-translate-y-2 hover:border-[color:var(--violet)]/40">
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-[color:var(--electric)]/20 to-[color:var(--violet)]/20 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative">
                  <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[color:var(--electric)]/20 to-[color:var(--violet)]/20 text-[color:var(--electric)]">
                    <p.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>

                  <div className="mt-6 flex items-center gap-2 text-xs font-mono text-[color:var(--violet)]">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[color:var(--violet)]" />
                    in progress
                  </div>
                </div>

                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[color:var(--electric)]/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================ EXPERIENCE / JOURNEY ============================ */

const MILESTONES = [
  { year: "2025", title: "Started Engineering", desc: "Joined Sapthagiri NPS University.", icon: GraduationCap, done: true },
  { year: "Now", title: "Learning Foundations", desc: "Python, C, and Web Development fundamentals.", icon: BookOpen, done: true },
  { year: "Next", title: "First Real Project", desc: "Build and ship a complete Python/web application.", icon: Rocket, done: false },
  { year: "Soon", title: "Open Source & Internships", desc: "Contribute, collaborate, and gain real-world experience.", icon: Target, done: false },
];

function Experience() {
  return (
    <section id="experience" className="relative px-4 py-28">
      <div className="mx-auto max-w-4xl">
        <SectionHeader
          kicker="journey"
          title="Learning Journey"
          sub="Currently focused on education and skill development."
        />

        <div className="relative">
          <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-[color:var(--electric)] via-[color:var(--violet)] to-transparent md:left-1/2" />

          {MILESTONES.map((m, i) => (
            <Reveal key={m.title} delay={i * 0.1}>
              <div className={`relative mb-8 flex items-start gap-6 md:mb-12 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                <div className={`hidden md:block md:w-1/2 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`} />

                <div className="absolute left-4 top-2 z-10 -translate-x-1/2 md:left-1/2">
                  <div className={`grid h-9 w-9 place-items-center rounded-full ring-4 ring-background ${m.done ? "bg-gradient-to-br from-[color:var(--electric)] to-[color:var(--violet)]" : "bg-surface-2 border border-white/10"}`}>
                    <m.icon className={`h-4 w-4 ${m.done ? "text-primary-foreground" : "text-muted-foreground"}`} />
                  </div>
                </div>

                <div className={`ml-12 flex-1 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pl-12" : "md:pr-12"}`}>
                  <div className="rounded-2xl glass p-5 transition-all hover:-translate-y-1 hover:border-[color:var(--electric)]/40">
                    <div className="font-mono text-xs uppercase tracking-widest text-[color:var(--electric)]">
                      {m.year}
                    </div>
                    <h3 className="mt-1.5 text-lg font-semibold">{m.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{m.desc}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================ SERVICES ============================ */

const SERVICES = [
  { title: "Web Development", tag: "Learning", desc: "Building responsive interfaces with modern HTML, CSS & JavaScript.", icon: Globe },
  { title: "Python Development", tag: "Learning", desc: "Scripting, automation, and exploring backend with Python.", icon: Terminal },
  { title: "Software Development", tag: "Exploring", desc: "Diving into problem solving, data structures, and design.", icon: Code2 },
];

function Services() {
  return (
    <section id="services" className="relative px-4 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          kicker="services"
          title="Available for Future Collaborations"
          sub="Open to learning opportunities, hackathons, and small collaborations."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.1}>
              <div className="group h-full rounded-3xl glass p-7 transition-all hover:-translate-y-1 hover:border-[color:var(--electric)]/40">
                <div className="flex items-center justify-between">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[color:var(--electric)]/20 to-[color:var(--violet)]/20 text-[color:var(--electric)]">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <span className="rounded-full bg-white/5 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-[color:var(--violet)]">
                    {s.tag}
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================ CONTACT ============================ */

function CopyableContact({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Mail;
  label: string;
  value: string;
  href: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      toast.success(`${label} copied`);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error("Could not copy");
    }
  };

  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      className="group flex items-center gap-4 rounded-2xl glass p-4 transition-all hover:-translate-y-0.5 hover:border-[color:var(--electric)]/40"
    >
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[color:var(--electric)]/20 to-[color:var(--violet)]/20 text-[color:var(--electric)]">
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="truncate text-sm font-medium">{value}</div>
      </div>
      <button
        onClick={copy}
        aria-label={`Copy ${label}`}
        className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/5 text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
      >
        {copied ? <Check className="h-4 w-4 text-[color:var(--electric)]" /> : <Copy className="h-4 w-4" />}
      </button>
    </a>
  );
}

function Contact() {
  const [sending, setSending] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "");
    const message = String(data.get("message") || "");
    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(message);
    setTimeout(() => {
      window.location.href = `mailto:Charandhevaiah@gmail.com?subject=${subject}&body=${body}`;
      setSending(false);
      toast.success("Opening your email client…");
    }, 400);
  };

  return (
    <section id="contact" className="relative px-4 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          kicker="contact"
          title="Let's Connect"
          sub="Have an idea, opportunity, or just want to say hi? My inbox is open."
        />

        <div className="grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="space-y-3">
              <CopyableContact
                icon={Mail}
                label="Email"
                value="Charandhevaiah@gmail.com"
                href="mailto:Charandhevaiah@gmail.com"
              />
              <CopyableContact
                icon={Phone}
                label="Phone"
                value="+91 93801 82600"
                href="tel:+919380182600"
              />
              <CopyableContact
                icon={Instagram}
                label="Instagram"
                value="@charan_dhevaiah"
                href="https://instagram.com/charan_dhevaiah"
              />

              <div className="mt-5 rounded-2xl border border-dashed border-white/10 p-4 text-xs text-muted-foreground">
                Based in India · Open to remote · Replies within 24 hours.
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <form onSubmit={onSubmit} className="space-y-4 rounded-3xl glass p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Name" name="name" placeholder="Your name" required />
                <Field label="Email" name="email" type="email" placeholder="you@email.com" required />
              </div>
              <Field label="Subject" name="subject" placeholder="What's this about?" />
              <div>
                <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  placeholder="Tell me a bit about your idea…"
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-[color:var(--electric)]/60"
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[color:var(--electric)] to-[color:var(--violet)] px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02] disabled:opacity-60"
              >
                {sending ? "Sending…" : "Send Message"}
                <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-[color:var(--electric)]/60"
      />
    </div>
  );
}

/* ============================ FOOTER ============================ */

function Footer() {
  return (
    <footer className="relative mt-10 border-t border-white/5 bg-[oklch(0.13_0.012_265)] px-4 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 md:flex-row">
        <div className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-[color:var(--electric)] to-[color:var(--violet)] text-sm font-bold text-primary-foreground">
            C
          </span>
          <div>
            <div className="text-sm font-semibold">Charan.D</div>
            <div className="text-xs text-muted-foreground">Engineering Student · Developer in the making</div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-muted-foreground">
          <a href="mailto:Charandhevaiah@gmail.com" className="transition-colors hover:text-[color:var(--electric)]"><Mail className="h-4 w-4" /></a>
          <a href="https://instagram.com/charan_dhevaiah" target="_blank" rel="noreferrer" className="transition-colors hover:text-[color:var(--violet)]"><Instagram className="h-4 w-4" /></a>
          <a href="tel:+919380182600" className="transition-colors hover:text-[color:var(--electric)]"><Phone className="h-4 w-4" /></a>
          <a href="#" className="transition-colors hover:text-foreground"><Github className="h-4 w-4" /></a>
        </div>

        <div className="font-mono text-xs text-muted-foreground">
          © {new Date().getFullYear()} Charan.D — Built with passion
        </div>
      </div>
    </footer>
  );
}
