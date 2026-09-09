"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Code2,
  Database,
  Server,
  Wrench,
  GraduationCap,
  Award,
  Menu,
  X,
  ArrowUpRight,
  Sparkles,
  Send,
} from "lucide-react";

const projects = [
  {
    title: "FitnessForge",
    subtitle: "Full-Stack Fitness Tracking Platform",
    description:
      "A complete full-stack fitness platform with user authentication, profile management, workout tracking, progress analytics, and admin functionality. Features JWT authentication, bcrypt password hashing, protected routes, and role-based access control. Includes workout CRUD, calorie tracking, filtering, and interactive progress charts.",
    tech: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "JWT",
      "Recharts",
      "Render",
    ],
    live: "https://fitness-tracker-frontend-2gix.onrender.com",
    github: "https://github.com/Surendra-Bhujel/Fitness-Tracker",
    accent: "emerald",
  },
  {
    title: "MithoDelivery",
    subtitle: "Full-Stack Food Delivery Platform",
    description:
      "A multi-role food delivery platform for customers, restaurant owners, and delivery riders with dedicated dashboards and workflows. Built RESTful APIs for authentication, restaurant/menu/cart/order/delivery management and integrated Socket.IO for real-time order updates. Includes image uploads, Leaflet geolocation, and role-based access control.",
    tech: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Socket.IO",
      "Redux Toolkit",
      "Tailwind CSS",
      "Leaflet",
      "JWT",
    ],
    live: "https://food-delivery-app-frontend-1g8i.onrender.com",
    github: "https://github.com/Surendra-Bhujel/Food-Delivery-App-",
    accent: "orange",
  },
  {
    title: "CineVerse",
    subtitle: "Full-Stack Movie Discovery Platform",
    description:
      "A responsive movie discovery platform integrating the TMDB API for search, filtering, movie details, and a persistent watchlist. Developed backend APIs with Node.js/Express and handled asynchronous data fetching between frontend and backend. Clean UI built with React and deployed on Render.",
    tech: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "REST APIs",
      "TMDB API",
      "Render",
    ],
    live: "https://movie-app-frontend-g51p.onrender.com",
    github: "https://github.com/Surendra-Bhujel/Movie-App",
    accent: "violet",
  },
];

const skills = {
  Frontend: {
    icon: Code2,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    items: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Redux Toolkit",
      "Tailwind CSS",
    ],
  },
  Backend: {
    icon: Server,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    items: [
      "Node.js",
      "Express.js",
      "RESTful APIs",
      "JWT Authentication",
      "Socket.IO",
    ],
  },
  Databases: {
    icon: Database,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    items: ["MongoDB", "Mongoose", "MySQL"],
  },
  "Tools & Others": {
    icon: Wrench,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    items: ["Git", "GitHub", "Postman", "Render", "Leaflet"],
  },
};

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Education", href: "#education" },
  { name: "Contact", href: "#contact" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = navLinks.map((l) => l.href.slice(1));
      for (const section of [...sections].reverse()) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 180) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          to: "magarsurendra81@gmail.com",
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 selection:bg-blue-500/30">
      {/* ========== NAVBAR ========== */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between h-16 md:h-[4.25rem]">
            <a href="#home" className="group flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition-transform group-hover:scale-105">
                SB
              </span>
              <span className="hidden sm:block text-sm font-semibold tracking-tight text-zinc-200">
                Surendra Bhujel
              </span>
            </a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`relative px-3.5 py-2 text-[13px] font-medium rounded-lg transition-colors duration-200 ${
                    activeSection === link.href.slice(1)
                      ? "text-white"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  {activeSection === link.href.slice(1) && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg bg-white/8 border border-white/10"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.5,
                      }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </a>
              ))}
            </nav>

            {/* Mobile toggle */}
            <button
              className="md:hidden flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden border-t border-white/5 bg-[#050505]/95 backdrop-blur-xl"
            >
              <div className="px-5 py-4 space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                      activeSection === link.href.slice(1)
                        ? "bg-white/8 text-white"
                        : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
                    }`}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ========== HERO ========== */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center px-5 sm:px-8 pt-20 overflow-hidden"
      >
        {/* Background effects */}
        <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-600/15 blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-violet-600/8 blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
          >
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 mb-8 backdrop-blur-sm"
            >
              <Sparkles size={14} className="text-cyan-400" />
              <span className="text-xs font-medium tracking-wide text-zinc-300">
                Available for opportunities
              </span>
            </motion.div>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="text-sm font-medium tracking-widest uppercase text-blue-400 mb-5"
            >
              Hello, I&apos;m
            </motion.p>

            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.55 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-bold tracking-tight leading-[1.05] mb-5"
            >
              <span className="bg-gradient-to-b from-white via-white to-zinc-500 bg-clip-text text-transparent">
                Surendra Bhujel
              </span>
            </motion.h1>

            <motion.h2
              variants={fadeUp}
              transition={{ duration: 0.55 }}
              className="text-xl sm:text-2xl md:text-3xl font-medium text-zinc-400 mb-7"
            >
              Full Stack Developer
            </motion.h2>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.55 }}
              className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto mb-11 leading-relaxed"
            >
              I craft end-to-end web applications with{" "}
              <span className="text-zinc-200">React</span>,{" "}
              <span className="text-zinc-200">Node.js</span>,{" "}
              <span className="text-zinc-200">Express</span> &{" "}
              <span className="text-zinc-200">MongoDB</span>. Focused on clean
              architecture, real-time features, and polished user experiences.
            </motion.p>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.55 }}
              className="flex flex-wrap items-center justify-center gap-3.5 mb-14"
            >
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition-all hover:bg-blue-500 hover:shadow-blue-500/40 hover:-translate-y-0.5"
              >
                View Projects
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-zinc-200 backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/20 hover:-translate-y-0.5"
              >
                Get in Touch
              </a>
            </motion.div>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.55 }}
              className="flex items-center justify-center gap-3"
            >
              {[
                {
                  href: "https://github.com/Surendra-Bhujel",
                  icon: Github,
                  label: "GitHub",
                },
                {
                  href: "mailto:magarsurendra81@gmail.com",
                  icon: Mail,
                  label: "Email",
                },
                {
                  href: "tel:+9779829112871",
                  icon: Phone,
                  label: "Phone",
                },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    item.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  aria-label={item.label}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/8 bg-white/5 text-zinc-400 transition-all hover:border-white/15 hover:bg-white/10 hover:text-white hover:-translate-y-0.5"
                >
                  <item.icon size={18} />
                </a>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden sm:block"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] font-medium tracking-widest uppercase text-zinc-600">
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.6,
                ease: "easeInOut",
              }}
              className="h-8 w-5 rounded-full border border-zinc-700 flex justify-center pt-1.5"
            >
              <div className="h-1.5 w-1 rounded-full bg-zinc-500" />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ========== ABOUT ========== */}
      <section id="about" className="relative py-28 px-5 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12 } },
            }}
          >
            <motion.div variants={fadeUp} className="text-center mb-14">
              <p className="text-xs font-semibold tracking-widest uppercase text-blue-400 mb-3">
                About
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                A bit about me
              </h2>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="glass rounded-2xl p-8 sm:p-10 glow-blue transition-shadow duration-500"
            >
              <div className="space-y-5 text-[15px] sm:text-base leading-relaxed text-zinc-400">
                <p>
                  I&apos;m a Full Stack Developer with hands-on experience
                  building end-to-end web applications using{" "}
                  <span className="text-zinc-200 font-medium">React</span>,{" "}
                  <span className="text-zinc-200 font-medium">Node.js</span>,{" "}
                  <span className="text-zinc-200 font-medium">Express.js</span>,{" "}
                  <span className="text-zinc-200 font-medium">MongoDB</span>,
                  and MySQL.
                </p>
                <p>
                  Skilled in HTML, CSS, JavaScript, RESTful APIs, JWT
                  authentication, and role-based authorization. I&apos;ve
                  developed and deployed multiple full-stack projects featuring
                  real-time features, third-party API integration, and
                  CRUD-based workflows.
                </p>
                <p>
                  Strong problem-solving skills with the ability to work
                  independently and in a team. Currently pursuing a{" "}
                  <span className="text-zinc-200 font-medium">
                    BSc (Hons) Computing
                  </span>{" "}
                  at Informatics College Pokhara, affiliated with London
                  Metropolitan University.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap gap-x-8 gap-y-3 text-sm text-zinc-500">
                <span className="inline-flex items-center gap-2">
                  <MapPin size={15} className="text-blue-400" />
                  Pokhara-14, Kaski, Nepal
                </span>
                <span className="inline-flex items-center gap-2">
                  <Phone size={15} className="text-blue-400" />
                  +977-9829112871
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ========== SKILLS ========== */}
      <section id="skills" className="relative py-28 px-5 sm:px-8">
        <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
        <div className="relative max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
          >
            <motion.div variants={fadeUp} className="text-center mb-14">
              <p className="text-xs font-semibold tracking-widest uppercase text-blue-400 mb-3">
                Expertise
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Skills & Technologies
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-5">
              {Object.entries(skills).map(([category, data], idx) => {
                const Icon = data.icon;
                return (
                  <motion.div
                    key={category}
                    variants={fadeUp}
                    transition={{ delay: idx * 0.05 }}
                    className="group glass rounded-2xl p-6 transition-all duration-300 hover:border-white/10 hover:-translate-y-1"
                  >
                    <div className="flex items-center gap-3.5 mb-5">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-xl ${data.bg} ${data.border} border`}
                      >
                        <Icon size={18} className={data.color} />
                      </div>
                      <h3 className="text-base font-semibold text-zinc-100">
                        {category}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {data.items.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-lg border border-white/6 bg-white/4 px-3 py-1.5 text-[13px] font-medium text-zinc-300 transition-colors group-hover:border-white/10"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== PROJECTS ========== */}
      <section id="projects" className="relative py-28 px-5 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12 } },
            }}
          >
            <motion.div variants={fadeUp} className="text-center mb-14">
              <p className="text-xs font-semibold tracking-widest uppercase text-blue-400 mb-3">
                Work
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
                Featured Projects
              </h2>
              <p className="text-zinc-500 max-w-md mx-auto text-sm sm:text-base">
                Full-stack applications I&apos;ve designed, built, and deployed
              </p>
            </motion.div>

            <div className="space-y-6">
              {projects.map((project, idx) => {
                const accentMap: Record<string, string> = {
                  emerald: "from-emerald-500 to-teal-500",
                  orange: "from-orange-500 to-rose-500",
                  violet: "from-violet-500 to-purple-500",
                };
                return (
                  <motion.article
                    key={project.title}
                    variants={fadeUp}
                    className="group relative overflow-hidden rounded-2xl border border-white/6 bg-zinc-900/40 transition-all duration-500 hover:border-white/12 hover:bg-zinc-900/60"
                  >
                    {/* Top accent line */}
                    <div
                      className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${accentMap[project.accent]} opacity-80`}
                    />

                    <div className="p-6 sm:p-8">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
                        <div>
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="text-[11px] font-semibold tracking-wider uppercase text-zinc-500">
                              0{idx + 1}
                            </span>
                          </div>
                          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                            {project.title}
                          </h3>
                          <p className="text-sm text-zinc-500 mt-1">
                            {project.subtitle}
                          </p>
                        </div>

                        <div className="flex gap-2.5 shrink-0">
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-lg border border-blue-500/25 bg-blue-500/10 px-3.5 py-2 text-xs font-semibold text-blue-400 transition-all hover:bg-blue-500/20 hover:border-blue-500/40"
                          >
                            <ExternalLink size={13} />
                            Live Demo
                          </a>
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-semibold text-zinc-300 transition-all hover:bg-white/10 hover:border-white/20"
                          >
                            <Github size={13} />
                            Code
                          </a>
                        </div>
                      </div>

                      <p className="text-sm sm:text-[15px] leading-relaxed text-zinc-400 mb-6 max-w-3xl">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className="rounded-md border border-white/6 bg-white/4 px-2.5 py-1 text-[11px] font-medium text-zinc-400"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== EDUCATION ========== */}
      <section id="education" className="relative py-28 px-5 sm:px-8">
        <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
        <div className="relative max-w-3xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12 } },
            }}
          >
            <motion.div variants={fadeUp} className="text-center mb-14">
              <p className="text-xs font-semibold tracking-widest uppercase text-blue-400 mb-3">
                Background
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Education & Certifications
              </h2>
            </motion.div>

            <div className="space-y-5">
              <motion.div
                variants={fadeUp}
                className="glass rounded-2xl p-6 sm:p-7 transition-all hover:border-white/10"
              >
                <div className="flex gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10">
                    <GraduationCap size={22} className="text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      BSc (Hons) Computing
                    </h3>
                    <p className="text-sm font-medium text-blue-400 mt-1">
                      2024 – 2027
                    </p>
                    <p className="text-sm text-zinc-400 mt-2">
                      Informatics College Pokhara · Affiliated with London
                      Metropolitan University
                    </p>
                    <p className="text-xs text-zinc-500 mt-3 leading-relaxed">
                      Relevant Coursework: Programming, Database Systems,
                      Networking, Operating Systems, Web Technologies, Software
                      Engineering
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="glass rounded-2xl p-6 sm:p-7 transition-all hover:border-white/10"
              >
                <div className="flex gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-amber-500/20 bg-amber-500/10">
                    <Award size={22} className="text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Java Object-Oriented Programming
                    </h3>
                    <p className="text-sm font-medium text-amber-400 mt-1">
                      LinkedIn Learning Certificate · May 2025
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== CONTACT ========== */}
      <section id="contact" className="relative py-28 px-5 sm:px-8">
        <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
        <div className="relative max-w-2xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
          >
            <motion.div variants={fadeUp} className="text-center mb-14">
              <p className="text-xs font-semibold tracking-widest uppercase text-blue-400 mb-3">
                Contact
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
                Let&apos;s work together
              </h2>
              <p className="text-zinc-400 mb-2 text-sm sm:text-base leading-relaxed">
                Have a project in mind? Let&apos;s talk.
              </p>
              <p className="text-zinc-500 text-sm">
                Email: magarsurendra81@gmail.com
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="glass rounded-2xl p-6 sm:p-8"
            >
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-zinc-300 mb-1.5"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-zinc-300 mb-1.5"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-zinc-300 mb-1.5"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-500 hover:shadow-blue-500/35 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {isSubmitting ? (
                    <>
                      <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </button>

                {submitStatus === "success" && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center text-sm text-emerald-400"
                  >
                    ✓ Message sent successfully!
                  </motion.p>
                )}

                {submitStatus === "error" && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center text-sm text-red-400"
                  >
                    ✗ Failed to send. Please try again or email me directly.
                  </motion.p>
                )}
              </form>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-zinc-500 mt-8"
            >
              <a
                href="tel:+9779829112871"
                className="inline-flex items-center gap-2 transition-colors hover:text-zinc-300"
              >
                <Phone size={14} />
                +977-9829112871
              </a>
              <a
                href="mailto:magarsurendra81@gmail.com"
                className="inline-flex items-center gap-2 transition-colors hover:text-zinc-300"
              >
                <Mail size={14} />
                magarsurendra81@gmail.com
              </a>
              <span className="inline-flex items-center gap-2">
                <MapPin size={14} />
                Pokhara, Nepal
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="border-t border-white/5 py-8 px-5 sm:px-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-600">
          <p>
            © {new Date().getFullYear()} Surendra Bhujel. All rights reserved.
          </p>
          <p className="text-zinc-600">
            Built with Next.js · Tailwind CSS · Framer Motion
          </p>
        </div>
      </footer>
    </div>
  );
}
