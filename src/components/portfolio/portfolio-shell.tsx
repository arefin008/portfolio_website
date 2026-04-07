"use client";

import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
import { contactFormSchema, type ContactFormValues } from "@/lib/contact-schema";

const fadeInUp = {
  initial: { opacity: 0, y: 48 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
} as const;

const workItemMotion = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
} as const;

const resumeHref = "/resume.pdf";

export function PortfolioShell() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeIdentity, setActiveIdentity] = useState<string>(identityTabs[0].id);
  const [openModule, setOpenModule] = useState<string>(expertiseModules[0].id);
  const [activeProtocol, setActiveProtocol] = useState<string>(protocols[0].id);
  const [typedText, setTypedText] = useState("");
  const [profilePhotoMissing, setProfilePhotoMissing] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactBotField, setContactBotField] = useState("");
  const [contactStatus, setContactStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [contactFeedback, setContactFeedback] = useState("");
  const [contactErrors, setContactErrors] = useState<
    Partial<Record<keyof ContactFormValues, string>>
  >({});
  const cursorDotRef = useRef<HTMLDivElement | null>(null);
  const cursorOutlineRef = useRef<HTMLDivElement | null>(null);
  const projectsSectionRef = useRef<HTMLElement | null>(null);
  const projectsRailViewportRef = useRef<HTMLDivElement | null>(null);
  const projectsRailTrackRef = useRef<HTMLDivElement | null>(null);
  const workSectionRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const projectsRailProgress = useMotionValue(0);
  const { scrollY, scrollYProgress } = useScroll();
  const { scrollYProgress: workScrollProgress } = useScroll({
    target: workSectionRef,
    offset: ["start 70%", "end 35%"],
  });
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
  const projectsBarScale = useSpring(projectsRailProgress, {
    stiffness: 140,
    damping: 26,
    mass: 0.22,
  });
  const workLineProgress = useSpring(workScrollProgress, {
    stiffness: 110,
    damping: 24,
    mass: 0.24,
  });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = projectsSectionRef.current;
    const viewport = projectsRailViewportRef.current;
    const track = projectsRailTrackRef.current;
    if (!section || !viewport || !track || window.innerWidth < 768 || shouldReduceMotion) {
      return;
    }

    const context = gsap.context(() => {
      const maxTravel = Math.max(0, track.scrollWidth - viewport.clientWidth);
      gsap.set(track, { x: 0 });

      if (maxTravel <= 0) {
        projectsRailProgress.set(0);
        return;
      }

      gsap.to(track, {
        x: -maxTravel,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${maxTravel}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => projectsRailProgress.set(self.progress),
        },
      });
    }, section);

    const handleRefresh = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleRefresh);

    return () => {
      window.removeEventListener("resize", handleRefresh);
      context.revert();
      projectsRailProgress.set(0);
    };
  }, [projectsRailProgress, shouldReduceMotion]);

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
      setShowBackToTop(window.scrollY > 560);
    };

    updateScrollPosition();
    window.addEventListener("scroll", updateScrollPosition, { passive: true });

    return () => window.removeEventListener("scroll", updateScrollPosition);
  }, []);

  const activeIdentityTab =
    identityTabs.find((tab) => tab.id === activeIdentity) ?? identityTabs[0];

  const getLinkProps = (href: string) =>
    href.startsWith("http")
      ? { target: "_blank" as const, rel: "noreferrer" }
      : {};

  const handleContactSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationResult = contactFormSchema.safeParse({
      name: contactName,
      email: contactEmail,
      phone: contactPhone,
      message: contactMessage,
      website: contactBotField,
    });

    if (!validationResult.success) {
      const fieldErrors = validationResult.error.flatten().fieldErrors;
      setContactErrors({
        name: fieldErrors.name?.[0],
        email: fieldErrors.email?.[0],
        phone: fieldErrors.phone?.[0],
        message: fieldErrors.message?.[0],
        website: fieldErrors.website?.[0],
      });
      setContactStatus("error");
      setContactFeedback("Please correct the highlighted fields.");
      return;
    }

    setContactErrors({});

    setContactStatus("loading");
    setContactFeedback("Sending your message...");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: contactName,
          email: contactEmail,
          phone: contactPhone,
          message: contactMessage,
          website: contactBotField,
        }),
      });

      const result = (await response.json()) as {
        error?: string;
        message?: string;
        fieldErrors?: Partial<Record<keyof ContactFormValues, string[]>>;
      };

      if (!response.ok) {
        if (result.fieldErrors) {
          setContactErrors({
            name: result.fieldErrors.name?.[0],
            email: result.fieldErrors.email?.[0],
            phone: result.fieldErrors.phone?.[0],
            message: result.fieldErrors.message?.[0],
            website: result.fieldErrors.website?.[0],
          });
        }
        throw new Error(result.error ?? "Unable to send message right now.");
      }

      setContactStatus("success");
      setContactFeedback(result.message ?? "Message sent successfully.");
      setContactErrors({});
      setContactName("");
      setContactEmail("");
      setContactPhone("");
      setContactMessage("");
      setContactBotField("");
    } catch (error) {
      setContactStatus("error");
      setContactFeedback(
        error instanceof Error ? error.message : "Unable to send message right now.",
      );
    }
  };

  return (
    <main className="noise-overlay relative overflow-hidden bg-[var(--color-page)] text-[var(--color-ink)]">
      <motion.div
        style={{ scaleX: smoothProgress }}
        className="fixed left-0 right-0 top-0 z-[70] h-px origin-left bg-[var(--color-accent)]"
      />
      <div ref={cursorDotRef} className="cursor-dot" />
      <div ref={cursorOutlineRef} className="cursor-outline" />

      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/6 bg-black/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 sm:py-5 lg:px-12">
          <div className="flex flex-col">
            <span className="text-base font-extrabold uppercase tracking-[-0.04em] sm:text-lg">
              Nasimul Arafin Rounok
            </span>
            <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)] sm:text-[10px] sm:tracking-[0.22em]">
              Software Engineer
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
              className="overflow-hidden border-t border-white/6 bg-black/95 px-4 sm:px-6 md:hidden"
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
            <span className="relative flex h-3 w-3 items-center justify-center">
              <span className="absolute inset-0 m-auto h-2.5 w-2.5 rounded-full bg-[var(--color-accent)]" />
              <span
                className="absolute inset-0 m-auto h-2.5 w-2.5 rounded-full bg-[var(--color-accent)]/40"
                style={{ animation: "status-ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite" }}
              />
            </span>
            <span className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-emerald-300">
              Available <span className="mx-1 text-white/25">//</span> Dhaka, Bangladesh
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
            Skilled in React, Next.js, ASP.NET, Node.js, and database-backed application development with a focus on responsive interfaces and clean implementation.
          </motion.p>

          <motion.div
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.24 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap"
          >
            <motion.a
              href="#projects"
              whileHover={{ y: -4, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              style={{ backgroundColor: "#3ddc97", color: "#050505" }}
              className="inline-flex items-center justify-center rounded-sm px-8 py-4 font-mono text-sm font-bold uppercase tracking-[0.16em] shadow-[0_18px_40px_rgba(61,220,151,0.2)] transition hover:-translate-y-0.5"
            >
              View Projects
            </motion.a>
            <motion.a
              href={resumeHref}
              target="_blank"
              rel="noreferrer"
              download
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-2 rounded-sm border border-emerald-400/35 bg-emerald-400/10 px-8 py-4 font-mono text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-accent)] transition hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-400/16"
            >
              Download Resume
              <Icon name="externalLink" className="h-4 w-4" />
            </motion.a>
          </motion.div>

          <motion.div
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.32 }}
            className="mt-12 grid max-w-2xl gap-4 sm:grid-cols-3"
          >
            {[
              { label: "Projects Built", value: "7+" },
              { label: "Core Focus", value: "Full Stack" },
              { label: "Degree", value: "CSE" },
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
            className="mx-auto w-full max-w-sm sm:max-w-xl lg:mx-0 lg:max-w-none"
          >
            <div className="glass-panel overflow-hidden rounded-[2rem]">
              {!profilePhotoMissing ? (
                <div className="relative">
                  <img
                    src="/profile-photo.jpg"
                    alt="Professional portrait"
                    className="h-[22rem] w-full object-cover object-center sm:h-[28rem] lg:h-[34rem]"
                    onError={() => setProfilePhotoMissing(true)}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.18)_72%,rgba(0,0,0,0.38))]" />
                </div>
              ) : (
                <div className="relative flex h-[22rem] items-end overflow-hidden bg-[radial-gradient(circle_at_top,rgba(61,220,151,0.12),transparent_42%),linear-gradient(180deg,#111111_0%,#090909_100%)] p-6 sm:h-[28rem] sm:p-8 lg:h-[34rem]">
                  <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(61,220,151,0.55),transparent)]" />
                  <div className="absolute right-[-3rem] top-[-2rem] h-40 w-40 rounded-full bg-emerald-400/10 blur-3xl" />
                  <div className="relative flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-emerald-400/20 bg-white/4 text-[var(--color-accent)]">
                      <Icon name="fingerprint" className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-accent)]">
                        Portrait Placeholder
                      </p>
                      <p className="mt-2 text-sm text-white/55">Use `public/profile-photo.jpg`</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.aside>
        </motion.div>
      </section>

      <div className="section-divider mx-auto h-px max-w-7xl opacity-50" />

      <section id="identity" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-12">
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
            <div className="glass-panel overflow-hidden rounded-[1.75rem] p-6 sm:p-8">
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
                  <p className="mt-6 max-w-3xl leading-7 sm:leading-8 text-[var(--color-muted)]">
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

      <section id="expertise" className="relative overflow-hidden bg-black/40 py-20 sm:py-24">
        <div
          className="parallax-orb absolute right-0 top-10 h-80 w-80 rounded-full bg-emerald-400/6 blur-3xl"
          style={{ ["--parallax-speed" as string]: "0.05" }}
        />
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-12">
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
                    className="flex w-full flex-col items-start justify-between gap-4 p-5 text-left sm:flex-row sm:items-center sm:p-6"
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
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="self-end sm:self-auto"
                    >
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

      <section id="services" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-12">
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

      <section
        id="projects"
        ref={projectsSectionRef}
        className="overflow-hidden bg-black/40 py-20 sm:py-24 md:py-0"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 md:flex md:h-screen md:flex-col md:justify-center">
          <motion.div {...fadeInUp} className="mb-12 grid gap-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-5">
              <h2 className="text-4xl font-bold tracking-[-0.05em] md:text-6xl">
                Selected Works<span className="text-[var(--color-accent)]">.</span>
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--color-soft)]">
                Selected projects from frontend, backend, database, and academic application work.
              </p>
            </div>
            <div className="hidden lg:col-span-7 md:flex md:items-end md:justify-end">
              <div className="w-full max-w-sm">
                <div className="mb-3 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-white/35">
                  <span>Project Archive</span>
                  <span>{projects.length} projects</span>
                </div>
                <div className="h-px overflow-hidden bg-white/10">
                  <motion.div
                    style={{ scaleX: projectsBarScale }}
                    className="h-full origin-left bg-[var(--color-accent)]"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          <div ref={projectsRailViewportRef} className="relative hidden overflow-hidden md:block">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-[linear-gradient(90deg,rgba(5,5,5,0.96),rgba(5,5,5,0))]" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-[linear-gradient(270deg,rgba(5,5,5,0.96),rgba(5,5,5,0))]" />

            <div className="pb-6">
              <div ref={projectsRailTrackRef} className="flex w-max gap-6 pl-2 pr-2 will-change-transform">
              {projects.map((project, index) => (
                <motion.article
                  key={project.name}
                  data-cursor="interactive"
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: index * 0.05, duration: 0.65 }}
                  whileHover={{ y: -8 }}
                  className="glass-panel group flex min-h-[31rem] w-[29rem] flex-col overflow-hidden rounded-[1.75rem]"
                >
                  <div
                    className={`relative flex h-64 items-end overflow-hidden bg-gradient-to-br ${project.gradient} p-6`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.04 }}
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
                      <h3 className="text-[2rem] font-bold tracking-[-0.05em] text-white">
                        {project.name}
                      </h3>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col border-t border-white/8 bg-black/30 p-6">
                    <p className="text-[15px] leading-7 text-[var(--color-muted)]">
                      {project.summary}
                    </p>

                    <div className="mt-auto pt-6">
                      <div className="flex flex-wrap gap-3">
                        <motion.a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noreferrer"
                          whileHover={{ y: -3 }}
                          whileTap={{ scale: 0.98 }}
                          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/14 px-4 py-2 text-xs font-bold text-white shadow-[0_10px_24px_rgba(0,0,0,0.18)] transition hover:border-white/32 hover:bg-white/20"
                        >
                          GitHub Repository <Icon name="externalLink" className="h-3.5 w-3.5" />
                        </motion.a>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
              </div>
            </div>
          </div>

          <div className="relative md:hidden">
            <div className="hide-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:px-6">
              {projects.map((project, index) => (
                <motion.article
                  key={project.name}
                  data-cursor="interactive"
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: index * 0.06, duration: 0.65 }}
                  whileHover={{ y: -8 }}
                  className="glass-panel group flex min-h-[29rem] w-[min(22rem,88vw)] shrink-0 snap-start flex-col overflow-hidden rounded-[1.5rem] sm:min-h-[31rem] sm:w-[min(24rem,82vw)] sm:rounded-[1.75rem]"
                >
                  <div
                    className={`relative flex h-56 items-end overflow-hidden bg-gradient-to-br p-5 sm:h-64 sm:p-6 ${project.gradient}`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.04 }}
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
                      <h3 className="text-[1.75rem] font-bold tracking-[-0.05em] text-white sm:text-[2rem]">
                        {project.name}
                      </h3>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col border-t border-white/8 bg-black/30 p-5 sm:p-6">
                    <p className="text-sm leading-7 text-[var(--color-muted)] sm:text-[15px]">
                      {project.summary}
                    </p>

                    <div className="mt-auto pt-6">
                      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                        <motion.a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noreferrer"
                          whileHover={{ y: -3 }}
                          whileTap={{ scale: 0.98 }}
                          className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/14 px-4 py-2 text-xs font-bold text-white shadow-[0_10px_24px_rgba(0,0,0,0.18)] transition hover:border-white/32 hover:bg-white/20"
                        >
                          GitHub Repository <Icon name="externalLink" className="h-3.5 w-3.5" />
                        </motion.a>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="work"
        ref={workSectionRef}
        className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24 lg:px-12"
      >
        <motion.div {...fadeInUp} className="mb-16 text-center">
          <h2 className="text-4xl font-bold tracking-[-0.05em] md:text-5xl">
            Experience<span className="text-[var(--color-accent)]">.</span>
          </h2>
          <p className="mt-4 text-[var(--color-soft)]">
            Resume-backed professional experience and internship history.
          </p>
        </motion.div>

        <div className="relative mx-auto max-w-5xl space-y-10">
          <div className="absolute bottom-0 left-[1.2rem] top-0 w-px bg-white/10 md:left-1/2 md:-translate-x-1/2" />
          <motion.div
            style={{ scaleY: workLineProgress }}
            className="absolute bottom-0 left-[1.2rem] top-0 w-px origin-top bg-[linear-gradient(180deg,rgba(61,220,151,0.18),rgba(61,220,151,0.92),rgba(61,220,151,0.2))] md:left-1/2 md:-translate-x-1/2"
          />
          {workHistory.map((item, index) => {
            const leftCard = item.side === "left";

            return (
              <motion.div
                key={`${item.company}-${item.period}`}
                {...workItemMotion}
                transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="relative grid grid-cols-[auto_1fr] gap-4 sm:gap-5 md:grid-cols-[1fr_auto_1fr] md:gap-8"
              >
                <div className="hidden md:block md:order-1">
                  {leftCard ? (
                    <motion.article
                      whileHover={{ y: -6 }}
                      transition={{ duration: 0.2 }}
                      className="glass-panel relative mr-6 overflow-hidden rounded-[1.75rem] p-6 lg:mr-10 lg:p-7"
                    >
                      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(61,220,151,0.7),transparent)]" />
                      <div className="flex items-start justify-between gap-5">
                        <div>
                          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
                            {item.company}
                          </p>
                          <h3 className="mt-2 text-2xl font-bold tracking-[-0.04em]">{item.role}</h3>
                          <p className="mt-2 text-sm text-white/55">{item.model}</p>
                        </div>
                        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/8 px-3 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-300">
                          <Icon name="calendar" className="h-3.5 w-3.5" />
                          {item.period}
                        </div>
                      </div>

                      <ul className="mt-6 space-y-3 text-sm leading-7 text-[var(--color-muted)]">
                        {item.bullets.map((bullet, bulletIndex) => (
                          <motion.li
                            key={bullet}
                            initial={{ opacity: 0, x: -12 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.6 }}
                            transition={{
                              duration: 0.45,
                              delay: index * 0.08 + bulletIndex * 0.06,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="flex items-start gap-3"
                          >
                            <span className="mt-2 h-2 w-2 rounded-full bg-[var(--color-accent)]" />
                            <span>{bullet}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.article>
                  ) : (
                    <div />
                  )}
                </div>

                <div className="relative z-10 flex justify-center md:order-2">
                  <div className="mt-7 flex h-9 w-9 items-center justify-center rounded-full border border-emerald-400/35 bg-black shadow-[0_0_0_5px_rgba(5,5,5,1)] sm:mt-8 sm:h-10 sm:w-10 sm:shadow-[0_0_0_6px_rgba(5,5,5,1)]">
                    <motion.span
                      whileInView={{ scale: [0.8, 1.1, 1] }}
                      viewport={{ once: true, amount: 0.7 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="h-2.5 w-2.5 rounded-full bg-[var(--color-accent)]"
                    />
                  </div>
                </div>

                <div className="md:order-3">
                  <motion.article
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.2 }}
                    className={`glass-panel relative overflow-hidden rounded-[1.75rem] p-5 sm:p-6 md:p-7 ${
                      leftCard ? "md:hidden" : "md:ml-6 lg:ml-10"
                    }`}
                  >
                    <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(61,220,151,0.7),transparent)]" />
                    <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                      <div>
                        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
                          {item.company}
                        </p>
                        <h3 className="mt-2 text-2xl font-bold tracking-[-0.04em]">{item.role}</h3>
                        <p className="mt-2 text-sm text-white/55">{item.model}</p>
                      </div>
                      <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/8 px-3 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-300">
                        <Icon name="calendar" className="h-3.5 w-3.5" />
                        {item.period}
                      </div>
                    </div>

                    <ul className="mt-6 space-y-3 text-sm leading-7 text-[var(--color-muted)]">
                      {item.bullets.map((bullet, bulletIndex) => (
                        <motion.li
                          key={bullet}
                          initial={{ opacity: 0, x: -12 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, amount: 0.6 }}
                          transition={{
                            duration: 0.45,
                            delay: index * 0.08 + bulletIndex * 0.06,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="flex items-start gap-3"
                        >
                          <span className="mt-2 h-2 w-2 rounded-full bg-[var(--color-accent)]" />
                          <span>{bullet}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.article>
                </div>

              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="bg-black/40 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <motion.div
            {...fadeInUp}
            className="glass-panel relative overflow-hidden rounded-[2rem] p-8 md:p-10"
          >
            <div className="absolute right-[-6rem] top-[-4rem] h-40 w-40 rounded-full bg-emerald-400/8 blur-3xl" />
            <div className="absolute left-[-4rem] bottom-[-5rem] h-32 w-32 rounded-full bg-sky-400/8 blur-3xl" />

            <div className="relative grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
              <div>
                <div className="mb-5 flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-emerald-400/15 px-3 py-1 font-mono text-xs font-bold uppercase tracking-[0.16em] text-emerald-300">
                    Education
                  </span>
                  <span className="rounded-full border border-white/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-white/40">
                    2021 - 2025
                  </span>
                </div>

                <h2 className="text-4xl font-bold tracking-[-0.05em] md:text-5xl">
                  Academic Foundation<span className="text-[var(--color-accent)]">.</span>
                </h2>

                <h3 className="mt-6 max-w-3xl text-3xl font-bold tracking-[-0.04em] md:text-4xl">
                  B.Sc. in Computer Science <span className="text-[var(--color-accent)]">&</span>{" "}
                  Engineering
                </h3>

                <p className="mt-3 text-lg text-[var(--color-muted)]">
                  American International University-Bangladesh
                </p>

                <p className="mt-5 max-w-2xl leading-8 text-[var(--color-soft)]">
                  Completed a B.Sc. in CSE with a major in Software Engineering and
                  supporting study in advanced database systems and machine learning.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  {["Software Engineering", "Advanced DBMS", "Machine Learning"].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-mono uppercase tracking-[0.16em] text-white/55"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <motion.div
                whileHover={{ y: -6 }}
                className="rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-6"
              >
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-400/10 text-[var(--color-accent)]">
                    <Icon name="graduationCap" className="h-7 w-7" />
                  </div>
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/35">
                    Degree Summary
                  </span>
                </div>

                <div className="space-y-5">
                  <div className="border-b border-white/8 pb-4">
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">
                      Qualification
                    </p>
                    <p className="mt-2 text-xl font-bold">Bachelor&apos;s Degree</p>
                  </div>

                  <div className="border-b border-white/8 pb-4">
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">
                      Discipline
                    </p>
                    <p className="mt-2 text-lg font-semibold text-white/88">
                      Computer Science & Engineering
                    </p>
                  </div>

                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">
                      Focus
                    </p>
                    <p className="mt-2 text-sm leading-7 text-[var(--color-soft)]">
                      Engineering-first training grounded in systems design, software
                      construction, and analytical problem solving.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl overflow-hidden px-4 py-20 sm:px-6 sm:py-24 lg:px-12">
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
                className={`reveal group relative overflow-hidden rounded-[1.5rem] border p-6 sm:p-8 transition ${
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

      <section id="contact" className="bg-black/40 py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:gap-16 sm:px-6 lg:grid-cols-2 lg:px-12">
          <motion.div {...fadeInUp}>
            <h2 className="text-4xl font-bold tracking-[-0.05em] md:text-5xl">
              Let&apos;s Build
            </h2>
            <h2 className="mt-2 text-4xl font-bold tracking-[-0.05em] text-[var(--color-accent)] md:text-5xl">
              Something Great.
            </h2>
            <p className="mt-6 max-w-md text-[var(--color-soft)]">
              Open to software engineering opportunities where I can contribute,
              learn quickly, and keep building strong web applications.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  aria-label={link.label}
                  {...getLinkProps(link.href)}
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
            <div className="glass-panel rounded-[1.75rem] p-6 sm:p-8">
              <div className="mb-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/45">
                  Start a conversation
                </p>
              </div>
              <form className="space-y-6" onSubmit={handleContactSubmit}>
              <input
                type="text"
                placeholder="Your Name"
                value={contactName}
                onChange={(event) => {
                  setContactName(event.target.value);
                  setContactErrors((current) => ({ ...current, name: undefined }));
                }}
                className="w-full border-0 border-b border-white/15 bg-transparent px-0 py-4 text-white outline-none placeholder:text-white/30 focus:border-[var(--color-accent)]"
              />
              {contactErrors.name ? (
                <p className="-mt-3 text-sm text-rose-300">{contactErrors.name}</p>
              ) : null}
              <input
                type="email"
                placeholder="Email Address"
                value={contactEmail}
                onChange={(event) => {
                  setContactEmail(event.target.value);
                  setContactErrors((current) => ({ ...current, email: undefined }));
                }}
                className="w-full border-0 border-b border-white/15 bg-transparent px-0 py-4 text-white outline-none placeholder:text-white/30 focus:border-[var(--color-accent)]"
              />
              {contactErrors.email ? (
                <p className="-mt-3 text-sm text-rose-300">{contactErrors.email}</p>
              ) : null}
              <input
                type="tel"
                placeholder="Phone Number"
                value={contactPhone}
                onChange={(event) => {
                  setContactPhone(event.target.value);
                  setContactErrors((current) => ({ ...current, phone: undefined }));
                }}
                className="w-full border-0 border-b border-white/15 bg-transparent px-0 py-4 text-white outline-none placeholder:text-white/30 focus:border-[var(--color-accent)]"
              />
              {contactErrors.phone ? (
                <p className="-mt-3 text-sm text-rose-300">{contactErrors.phone}</p>
              ) : null}
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                value={contactBotField}
                onChange={(event) => setContactBotField(event.target.value)}
                className="hidden"
              />
              <textarea
                rows={4}
                placeholder="Project Details"
                value={contactMessage}
                onChange={(event) => {
                  setContactMessage(event.target.value);
                  setContactErrors((current) => ({ ...current, message: undefined }));
                }}
                className="w-full resize-none border-0 border-b border-white/15 bg-transparent px-0 py-4 text-white outline-none placeholder:text-white/30 focus:border-[var(--color-accent)]"
              />
              {contactErrors.message ? (
                <p className="-mt-3 text-sm text-rose-300">{contactErrors.message}</p>
              ) : null}
              <p
                className={`text-sm ${
                  contactStatus === "error"
                    ? "text-rose-300"
                    : contactStatus === "success"
                      ? "text-emerald-300"
                      : "text-white/45"
                }`}
              >
                {contactFeedback || "Replies are sent directly to my inbox."}
              </p>
              <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
                <span className="font-mono text-sm font-semibold uppercase tracking-[0.18em]">
                  {contactStatus === "loading" ? "Sending..." : "Send Message"}
                </span>
                <motion.button
                  type="submit"
                  whileHover={{ x: 3, scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  disabled={contactStatus === "loading"}
                  className="flex h-12 w-12 self-start items-center justify-center rounded-full bg-[var(--color-accent)] text-black transition hover:bg-emerald-300 sm:self-auto"
                >
                  <Icon name="arrowRight" className="h-5 w-5" />
                </motion.button>
              </div>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-white/8 bg-black/55">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-12 sm:px-6 lg:px-12">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div className="max-w-lg">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-accent)]">
                Nasimul Arafin Rounok
              </p>
              <h2 className="mt-3 text-2xl font-bold tracking-[-0.05em] text-white">
                Aspiring software engineer focused on modern, responsive web applications.
              </h2>
              <p className="mt-3 text-sm leading-7 text-[var(--color-soft)]">
                Based in Dhaka with a focus on frontend development, web application
                engineering, and database-backed systems.
              </p>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/50">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="transition hover:text-[var(--color-accent)]"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 border-t border-white/8 pt-5 text-sm text-white/35 md:flex-row md:items-center md:justify-between">
            <p>© 2026 Nasimul Arafin Rounok. All rights reserved.</p>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/30">
              Minimal by design. Built with Next.js and Framer Motion.
            </p>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {showBackToTop ? (
          <motion.button
            type="button"
            aria-label="Back to top"
            initial={{ opacity: 0, y: 16, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.92 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 z-[75] inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/12 bg-black/80 text-white shadow-[0_18px_40px_rgba(0,0,0,0.3)] backdrop-blur-xl transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
          >
            <Icon name="arrowUp" className="h-5 w-5" />
          </motion.button>
        ) : null}
      </AnimatePresence>
    </main>
  );
}
