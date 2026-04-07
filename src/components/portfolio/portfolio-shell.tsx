"use client";

import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  capabilities,
  expertiseModules,
  heroText,
  identityTabs,
  navItems,
  projects,
  protocols,
  socialLinks,
  workHistory,
} from "@/components/portfolio/data";
import { Icon } from "@/components/portfolio/icons";

const fadeInUp = {
  initial: { opacity: 0, y: 48 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
} as const;

export function PortfolioShell() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeIdentity, setActiveIdentity] = useState<string>(identityTabs[0].id);
  const [openModule, setOpenModule] = useState<string>(expertiseModules[0].id);
  const [activeProtocol, setActiveProtocol] = useState<string>(protocols[0].id);
  const [typedText, setTypedText] = useState("");
  const cursorDotRef = useRef<HTMLDivElement | null>(null);
  const cursorOutlineRef = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollY, scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.2,
  });
  const heroY = useTransform(scrollY, [0, 800], [0, shouldReduceMotion ? 0 : -120]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0.35]);
  const heroOrbOneY = useTransform(scrollY, [0, 1200], [0, shouldReduceMotion ? 0 : 180]);
  const heroOrbTwoY = useTransform(scrollY, [0, 1200], [0, shouldReduceMotion ? 0 : 110]);
  const heroCardY = useTransform(scrollY, [0, 900], [0, shouldReduceMotion ? 0 : -70]);

  useEffect(() => {
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setTypedText(heroText.slice(0, index));
      if (index >= heroText.length) {
        window.clearInterval(timer);
      }
    }, 32);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (shouldReduceMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      touchMultiplier: 1.1,
      wheelMultiplier: 0.9,
      easing: (t) => 1 - Math.pow(1 - t, 4),
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(raf);
    };

    rafId = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [shouldReduceMotion]);

  useEffect(() => {
    const revealElements = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -48px 0px" },
    );

    revealElements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (window.matchMedia("(max-width: 768px)").matches) {
      return;
    }

    const dot = cursorDotRef.current;
    const outline = cursorOutlineRef.current;
    if (!dot || !outline) {
      return;
    }

    let outlineX = 0;
    let outlineY = 0;
    let pointerX = 0;
    let pointerY = 0;
    let frameId = 0;

    const tick = () => {
      outlineX += (pointerX - outlineX) * 0.18;
      outlineY += (pointerY - outlineY) * 0.18;
      outline.style.left = `${outlineX}px`;
      outline.style.top = `${outlineY}px`;
      frameId = window.requestAnimationFrame(tick);
    };

    const handleMove = (event: MouseEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      dot.style.left = `${pointerX}px`;
      dot.style.top = `${pointerY}px`;
    };

    const handleEnter = () => outline.classList.add("is-hovering");
    const handleLeave = () => outline.classList.remove("is-hovering");

    const interactive = Array.from(
      document.querySelectorAll<HTMLElement>(
        "a, button, input, textarea, [data-cursor='interactive']",
      ),
    );

    interactive.forEach((item) => {
      item.addEventListener("mouseenter", handleEnter);
      item.addEventListener("mouseleave", handleLeave);
    });

    window.addEventListener("mousemove", handleMove);
    frameId = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.cancelAnimationFrame(frameId);
      interactive.forEach((item) => {
        item.removeEventListener("mouseenter", handleEnter);
        item.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, []);

  useEffect(() => {
    const updateScrollPosition = () => {
      document.documentElement.style.setProperty("--scroll-y", `${window.scrollY}px`);
    };

    updateScrollPosition();
    window.addEventListener("scroll", updateScrollPosition, { passive: true });

    return () => window.removeEventListener("scroll", updateScrollPosition);
  }, []);

  const activeIdentityTab =
    identityTabs.find((tab) => tab.id === activeIdentity) ?? identityTabs[0];

  return (
    <main className="noise-overlay relative overflow-hidden bg-[var(--color-page)] text-[var(--color-ink)]">
      <motion.div
        style={{ scaleX: smoothProgress }}
        className="fixed left-0 right-0 top-0 z-[70] h-px origin-left bg-[var(--color-accent)]"
      />
      <div ref={cursorDotRef} className="cursor-dot" />
      <div ref={cursorOutlineRef} className="cursor-outline" />

      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/6 bg-black/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-12">
          <div className="flex flex-col">
            <span className="text-lg font-extrabold uppercase tracking-[-0.04em]">
              Nasimul Arafin Rounok
            </span>
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--color-accent)]">
              Full Stack Engineer
            </span>
          </div>

          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="border-b border-transparent pb-1 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-white/60 transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            aria-label="Toggle navigation"
            className="rounded-full border border-white/10 p-2 text-white/80 md:hidden"
            onClick={() => setMobileMenuOpen((value) => !value)}
          >
            <Icon name="menu" className="h-5 w-5" />
          </button>
        </div>

        <AnimatePresence initial={false}>
          {mobileMenuOpen ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden border-t border-white/6 bg-black/95 px-6 md:hidden"
            >
              <div className="flex flex-col gap-4 py-5">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-white/70"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      <section className="grid-shell relative isolate flex min-h-screen items-center overflow-hidden px-6 pt-28 lg:px-12">
        <motion.div
          style={{ y: heroOrbOneY }}
          className="absolute left-[-8%] top-24 h-64 w-64 rounded-full bg-emerald-400/15 blur-3xl"
        />
        <motion.div
          style={{ y: heroOrbTwoY }}
          className="absolute right-[-6%] top-44 h-80 w-80 rounded-full bg-sky-400/12 blur-3xl"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(61,220,151,0.08),transparent_36%)]" />
        <div className="absolute inset-x-0 bottom-[-10rem] h-64 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_55%)]" />
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 mx-auto grid w-full max-w-7xl gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-end"
        >
          <div>
          <motion.div
            {...fadeInUp}
            className="mb-8 inline-flex items-center gap-3 rounded-full border border-emerald-400/35 bg-emerald-400/10 px-4 py-2"
          >
            <span className="relative inline-block h-2 w-2 rounded-full bg-[var(--color-accent)]">
              <span
                className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-accent)]/30"
                style={{ animation: "pulse 2s ease-out infinite" }}
              />
            </span>
            <span className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-emerald-300">
              Online <span className="mx-1 text-white/25">//</span> Dhaka, BD
            </span>
          </motion.div>

          <motion.h1
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.08 }}
            className="max-w-5xl text-4xl font-bold leading-[0.98] tracking-[-0.06em] md:text-6xl xl:text-8xl"
          >
            {typedText}
            <span className="typing-caret" />
          </motion.h1>

          <motion.p
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.16 }}
            className="mt-6 max-w-2xl text-lg font-medium leading-8 text-[var(--color-soft)] md:text-xl"
          >
            Architecting performance-critical applications with modern web technologies, product instincts, and systems that still feel human.
          </motion.p>

          <motion.div
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.24 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <motion.a
              href="#projects"
              whileHover={{ y: -4, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-sm bg-[var(--color-ink)] px-8 py-4 font-mono text-xs font-bold uppercase tracking-[0.18em] text-black transition hover:-translate-y-0.5 hover:bg-white"
            >
              View Projects
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-sm border border-white/25 px-8 py-4 font-mono text-xs font-bold uppercase tracking-[0.18em] text-white transition hover:-translate-y-0.5 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            >
              Contact Me
            </motion.a>
          </motion.div>

          <motion.div
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.32 }}
            className="mt-12 grid max-w-2xl gap-4 sm:grid-cols-3"
          >
            {[
              { label: "Years Building", value: "4+" },
              { label: "Projects Shipped", value: "20+" },
              { label: "Stack Range", value: "Full" },
            ].map((item) => (
              <div key={item.label} className="glass-panel rounded-[1.25rem] p-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/45">
                  {item.label}
                </p>
                <p className="mt-3 text-3xl font-bold tracking-[-0.05em] text-[var(--color-accent)]">
                  {item.value}
                </p>
              </div>
            ))}
          </motion.div>
          </div>

          <motion.aside
            style={{ y: heroCardY }}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="glass-panel hidden rounded-[2rem] p-6 lg:block"
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/45">
                  Active Build Mode
                </p>
                <h2 className="mt-2 text-2xl font-bold tracking-[-0.05em]">
                  Product systems with high visual intent.
                </h2>
              </div>
              <div className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-emerald-300">
                Live
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-white/10 bg-black/35 p-5">
              <div className="mb-4 flex items-center gap-3">
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/50">
                  Current Focus
                </p>
              </div>
              <div className="space-y-4">
                {[
                  "Motion-led frontend systems",
                  "Scalable API and dashboard architecture",
                  "Performance tuning for production release",
                ].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.45 + index * 0.1 }}
                    className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/[0.03] p-4"
                  >
                    <span className="mt-1 h-2 w-2 rounded-full bg-[var(--color-accent)]" />
                    <span className="text-sm leading-7 text-[var(--color-muted)]">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.aside>
        </motion.div>
      </section>

      <div className="section-divider mx-auto h-px max-w-7xl opacity-50" />

      <section id="identity" className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
        <motion.div {...fadeInUp} className="mb-12">
          <p className="mb-4 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-accent)]">
            <Icon name="fingerprint" className="h-4 w-4" />
            My Digital DNA
          </p>
          <h2 className="text-4xl font-bold tracking-[-0.05em] md:text-5xl">
            The Identity<span className="text-[var(--color-accent)]">.</span>
          </h2>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-12">
          <motion.div {...fadeInUp} className="space-y-4 lg:col-span-4">
            {identityTabs.map((tab) => (
              <motion.button
                key={tab.id}
                type="button"
                data-cursor="interactive"
                whileHover={{ x: 8 }}
                whileTap={{ scale: 0.985 }}
                onClick={() => setActiveIdentity(tab.id)}
                className={`relative flex w-full items-center gap-4 overflow-hidden rounded-2xl border p-4 text-left transition ${
                  activeIdentity === tab.id
                    ? "border-[var(--color-accent)] bg-emerald-400/8"
                    : "border-white/10 bg-white/[0.02] hover:border-emerald-400/35"
                }`}
              >
                {activeIdentity === tab.id ? (
                  <motion.span
                    layoutId="identity-tab-glow"
                    className="absolute inset-0 bg-[linear-gradient(90deg,rgba(61,220,151,0.10),transparent)]"
                  />
                ) : null}
                <div
                  className={`relative rounded-xl p-3 ${
                    activeIdentity === tab.id
                      ? "bg-emerald-400/10 text-[var(--color-accent)]"
                      : "bg-white/5 text-white/60"
                  }`}
                >
                  <Icon name={tab.icon} className="h-5 w-5" />
                </div>
                <span className="relative text-base font-semibold">{tab.label}</span>
              </motion.button>
            ))}
          </motion.div>

          <motion.div {...fadeInUp} className="lg:col-span-8">
            <div className="glass-panel overflow-hidden rounded-[1.75rem] p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIdentityTab.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-accent)]">
                    Role Analysis
                  </div>
                  <h3 className="text-3xl font-bold tracking-[-0.04em] md:text-4xl">
                    {activeIdentityTab.code}
                  </h3>
                  <p className="mt-3 font-mono text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-accent)]">
                    {activeIdentityTab.strap}
                  </p>
                  <p className="mt-6 max-w-3xl leading-8 text-[var(--color-muted)]">
                    {activeIdentityTab.body}
                  </p>

                  <div className="mt-8 grid gap-4 text-sm text-[var(--color-muted)] md:grid-cols-2">
                    {activeIdentityTab.points.map((point, index) => (
                      <motion.div
                        key={point}
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.08 }}
                        className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/[0.025] p-4"
                      >
                        <span className="mt-1 h-2 w-2 rounded-full bg-[var(--color-accent)]" />
                        <span>{point}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="expertise" className="relative overflow-hidden bg-black/40 py-24">
        <div
          className="parallax-orb absolute right-0 top-10 h-80 w-80 rounded-full bg-emerald-400/6 blur-3xl"
          style={{ ["--parallax-speed" as string]: "0.05" }}
        />
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-12 lg:px-12">
          <motion.div {...fadeInUp} className="lg:col-span-4">
            <p className="mb-4 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-accent)]">
              <Icon name="grid" className="h-4 w-4" />
              System Modules
            </p>
            <h2 className="text-4xl font-bold tracking-[-0.05em] md:text-5xl">
              Technical Arsenal<span className="text-[var(--color-accent)]">.</span>
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-7 text-[var(--color-soft)]">
              High-performance tools configured for scalable systems and clean delivery.
            </p>

            <div className="glass-panel mt-8 rounded-2xl p-4">
              <div className="mb-2 flex items-center justify-between font-mono text-xs font-semibold uppercase tracking-[0.16em]">
                <span className="text-white/55">System Status</span>
                <span className="text-[var(--color-accent)]">All Systems Go</span>
              </div>
              <div className="h-1 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="h-full bg-[var(--color-accent)]"
                />
              </div>
            </div>
          </motion.div>

          <motion.div {...fadeInUp} className="space-y-4 lg:col-span-8">
            {expertiseModules.map((module) => {
              const isOpen = openModule === module.id;
              return (
                <motion.article
                  key={module.id}
                  data-cursor="interactive"
                  whileHover={{ y: -4 }}
                  className={`overflow-hidden rounded-[1.25rem] border transition ${
                    isOpen
                      ? "glass-panel border-emerald-400/55"
                      : "border-white/10 bg-white/[0.02] hover:border-emerald-400/30"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenModule(isOpen ? "" : module.id)}
                    className="flex w-full items-center justify-between gap-4 p-6 text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className="rounded-xl bg-white/5 p-3 text-white/70">
                        <Icon name={module.icon} className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
                          {module.number}
                        </p>
                        <div className="mt-1 flex items-center gap-3">
                          <h3 className="text-lg font-bold">{module.title}</h3>
                          {module.badge ? (
                            <span className="rounded-full bg-emerald-400/12 px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-300">
                              {module.badge}
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                      <Icon name="chevronDown" className="h-5 w-5 text-white/40" />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35 }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-white/8 px-6 pb-6 pt-4">
                          <div className="flex flex-wrap gap-2">
                            {module.skills.map((skill) => (
                              <motion.span
                                key={skill}
                                whileHover={{ y: -4 }}
                                className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/75 transition hover:border-emerald-400/40 hover:text-[var(--color-accent)]"
                              >
                                {skill}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
        <motion.div {...fadeInUp} className="mb-16">
          <h2 className="text-4xl font-bold tracking-[-0.05em] md:text-6xl">
            Capabilities<span className="text-[var(--color-accent)]">.</span>
          </h2>
          <p className="mt-4 max-w-xl text-[var(--color-soft)]">
            A focused service stack for ambitious digital products, internal tools,
            and production-grade platforms.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {capabilities.map((capability, index) => (
            <motion.article
              key={capability.title}
              data-cursor="interactive"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: index * 0.07, duration: 0.7 }}
              whileHover={{ y: -10, rotateX: 3, rotateY: -3 }}
              className="glass-panel rounded-[1.75rem] p-6 [transform-style:preserve-3d]"
            >
              <div className="mb-6 flex items-start justify-between">
                <div className="rounded-2xl bg-white/5 p-3 text-white/60">
                  <Icon name={capability.icon} className="h-6 w-6" />
                </div>
                <Icon name="arrowUpRight" className="h-5 w-5 text-white/35" />
              </div>
              <h3 className={`text-xl font-bold ${capability.accent}`}>
                {capability.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                {capability.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {capability.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-emerald-400/10 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.16em] text-emerald-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="projects" className="overflow-hidden bg-black/40 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <motion.div {...fadeInUp} className="mb-12 grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <h2 className="text-4xl font-bold tracking-[-0.05em] md:text-6xl">
                Selected Works<span className="text-[var(--color-accent)]">.</span>
              </h2>
              <p className="mt-4 text-sm leading-7 text-[var(--color-soft)]">
                A cross-section of web products and platform work spanning
                healthcare, commerce, operations, and travel.
              </p>
              <p className="mt-6 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-white/35">
                Scroll to explore <Icon name="arrowRight" className="h-4 w-4" />
              </p>
            </div>
          </motion.div>

          <motion.div {...fadeInUp} className="hide-scrollbar flex gap-6 overflow-x-auto pb-4">
            {projects.map((project, index) => (
              <motion.article
                key={project.name}
                data-cursor="interactive"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ delay: index * 0.08, duration: 0.65 }}
                whileHover={{ y: -10 }}
                className="glass-panel group min-w-[340px] max-w-[430px] flex-1 overflow-hidden rounded-[1.75rem]"
              >
                <div className={`relative flex h-60 items-end justify-start overflow-hidden bg-gradient-to-br ${project.gradient} p-6`}>
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_35%)]"
                  />
                  <div className="relative z-10">
                    <div className="mb-3 flex flex-wrap gap-2">
                      <span className="rounded-full bg-black/25 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.16em] text-white/75">
                        {project.category}
                      </span>
                      <span className="rounded-full bg-black/25 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.16em] text-white/75">
                        {project.stack}
                      </span>
                    </div>
                    <h3 className="text-3xl font-black tracking-[-0.06em]">{project.name}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                    {project.summary}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <motion.a
                      href="#"
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center gap-2 rounded-full bg-[var(--color-ink)] px-4 py-2 text-xs font-bold text-black transition hover:bg-white"
                    >
                      View Project <Icon name="externalLink" className="h-3.5 w-3.5" />
                    </motion.a>
                    <motion.a
                      href="#"
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs font-bold transition hover:border-emerald-400/45 hover:text-[var(--color-accent)]"
                    >
                      <Icon name="github" className="h-3.5 w-3.5" />
                      Source
                    </motion.a>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="work" className="mx-auto max-w-5xl px-6 py-24 lg:px-12">
        <motion.div {...fadeInUp} className="mb-16 text-center">
          <h2 className="text-4xl font-bold tracking-[-0.05em] md:text-5xl">
            Work History<span className="text-[var(--color-accent)]">.</span>
          </h2>
        </motion.div>

        <div className="relative space-y-12">
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-emerald-400/20 md:block" />
          {workHistory.map((item, index) => {
            const leftCard = item.side === "left";
            const card = (
              <motion.article
                whileHover={{ y: -6 }}
                className="glass-panel rounded-[1.5rem] p-6"
              >
                <h3 className="text-xl font-bold">{item.role}</h3>
                <p className="mt-1 text-sm text-[var(--color-accent)]">
                  {item.company} · {item.model}
                </p>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--color-muted)]">
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-[var(--color-accent)]" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            );

            const date = (
              <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-accent)]">
                <Icon name="calendar" className="h-3.5 w-3.5" />
                {item.period}
              </div>
            );

            return (
              <motion.div
                key={`${item.company}-${item.period}`}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ delay: index * 0.08 }}
                className="relative"
              >
                <div className="absolute left-1/2 top-8 hidden h-3 w-3 -translate-x-1/2 rounded-full border-4 border-[var(--color-page)] bg-[var(--color-accent)] md:block" />
                <div className="grid gap-8 md:grid-cols-2">
                  <div className={leftCard ? "order-2 md:order-1 md:pr-12" : "md:pr-12 md:text-right"}>
                    {leftCard ? card : date}
                  </div>
                  <div className="md:pl-12">{leftCard ? date : card}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="bg-black/40 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-6 lg:grid-cols-12 lg:px-12">
          <motion.div {...fadeInUp} className="lg:col-span-8">
            <div className="mb-4 inline-flex items-center gap-3">
              <span className="rounded-full bg-emerald-400/15 px-3 py-1 font-mono text-xs font-bold uppercase tracking-[0.16em] text-emerald-300">
                Verified Degree
              </span>
              <span className="font-mono text-sm text-white/35">2021 - 2025</span>
            </div>
            <h2 className="text-4xl font-bold tracking-[-0.05em] md:text-5xl">
              Education<span className="text-[var(--color-accent)]">.</span>
            </h2>
            <h3 className="mt-6 text-3xl font-bold tracking-[-0.04em]">
              B.Sc. in Computer Science <span className="text-[var(--color-accent)]">&</span>{" "}
              Engineering
            </h3>
            <p className="mt-2 text-xl text-[var(--color-muted)]">
              American International University-Bangladesh
            </p>
            <p className="mt-4 max-w-2xl leading-8 text-[var(--color-soft)]">
              Specialized in software architecture, development, advanced algorithms,
              and distributed systems with a focus on scalable engineering
              solutions.
            </p>
          </motion.div>
          <motion.div
            {...fadeInUp}
            whileHover={{ rotate: 8, scale: 1.04 }}
            className="flex justify-start lg:col-span-4 lg:justify-end"
          >
            <div className="glass-panel flex h-32 w-32 items-center justify-center rounded-full">
              <Icon
                name="graduationCap"
                className="h-12 w-12 text-[var(--color-accent)]"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl overflow-hidden px-6 py-24 lg:px-12">
        <div
          className="parallax-orb absolute left-[-8rem] top-8 h-64 w-64 rounded-full bg-fuchsia-500/8 blur-3xl"
          style={{ ["--parallax-speed" as string]: "0.1" }}
        />
        <motion.div {...fadeInUp} className="mb-16 text-center">
          <h2 className="text-4xl font-bold tracking-[-0.05em] md:text-5xl">
            Engineering <span className="text-white/40">Protocol.</span>
          </h2>
          <p className="mt-4 text-[var(--color-soft)]">
            A deliberate approach to product, systems, and execution.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {protocols.map((protocol, index) => {
            const isActive = activeProtocol === protocol.id;
            return (
              <motion.article
                key={protocol.id}
                data-cursor="interactive"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -8 }}
                className={`reveal group relative overflow-hidden rounded-[1.5rem] border p-8 transition ${
                  isActive
                    ? "glass-panel border-[var(--color-accent)]"
                    : "border-white/10 bg-white/[0.03] hover:border-white/20"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setActiveProtocol(protocol.id)}
                  className="absolute inset-0"
                  aria-label={`Select ${protocol.title}`}
                />
                <div
                  className={`absolute -right-16 -top-16 h-36 w-36 rounded-full blur-3xl ${protocol.glow}`}
                />
                <div className="relative z-10">
                  <div className="mb-6 inline-flex rounded-2xl bg-white/5 p-3 text-white/65">
                    <Icon name={protocol.icon} className="h-6 w-6" />
                  </div>
                  <p
                    className={`font-mono text-xs font-semibold uppercase tracking-[0.16em] ${protocol.accent}`}
                  >
                    {protocol.phase}
                  </p>
                  <h3 className="mt-3 text-2xl font-bold">{protocol.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
                    {protocol.body}
                  </p>
                  <div className="mt-8 flex justify-end">
                    <span className="inline-flex rounded-full bg-white/5 p-3 opacity-0 transition group-hover:opacity-100">
                      <Icon name="arrowRight" className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section id="contact" className="bg-black/40 py-24">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:px-12">
          <motion.div {...fadeInUp}>
            <h2 className="text-4xl font-bold tracking-[-0.05em] md:text-5xl">
              Let&apos;s Build
            </h2>
            <h2 className="mt-2 text-4xl font-bold tracking-[-0.05em] text-[var(--color-accent)] md:text-5xl">
              Something Great.
            </h2>
            <p className="mt-6 max-w-md text-[var(--color-soft)]">
              Open to product work, engineering partnerships, and technical
              consulting.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  aria-label={link.label}
                  whileHover={{ y: -4, rotate: 4 }}
                  whileTap={{ scale: 0.96 }}
                  className="glass-panel flex h-12 w-12 items-center justify-center rounded-full text-white/60 transition hover:text-[var(--color-accent)]"
                >
                  <Icon name={link.icon} className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div {...fadeInUp}>
            <div className="glass-panel rounded-[1.75rem] p-8">
              <div className="mb-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/45">
                  Start a conversation
                </p>
              </div>
              <form className="space-y-6">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border-0 border-b border-white/15 bg-transparent px-0 py-4 text-white outline-none placeholder:text-white/30 focus:border-[var(--color-accent)]"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full border-0 border-b border-white/15 bg-transparent px-0 py-4 text-white outline-none placeholder:text-white/30 focus:border-[var(--color-accent)]"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full border-0 border-b border-white/15 bg-transparent px-0 py-4 text-white outline-none placeholder:text-white/30 focus:border-[var(--color-accent)]"
              />
              <textarea
                rows={4}
                placeholder="Project Details"
                className="w-full resize-none border-0 border-b border-white/15 bg-transparent px-0 py-4 text-white outline-none placeholder:text-white/30 focus:border-[var(--color-accent)]"
              />
              <div className="flex items-center justify-between pt-2">
                <span className="font-mono text-sm font-semibold uppercase tracking-[0.18em]">
                  Send Message
                </span>
                <motion.button
                  type="submit"
                  whileHover={{ x: 3, scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-accent)] text-black transition hover:bg-emerald-300"
                >
                  <Icon name="arrowRight" className="h-5 w-5" />
                </motion.button>
              </div>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-white/6 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-sm text-white/35 md:flex-row lg:px-12">
          <p>© 2026 Arafin Rounok. All rights reserved.</p>
          <motion.button
            type="button"
            whileHover={{ y: -2 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-2 transition hover:text-[var(--color-accent)]"
          >
            Back to Top <Icon name="arrowUp" className="h-4 w-4" />
          </motion.button>
        </div>
      </footer>
    </main>
  );
}
