import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring, animate } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowUpRight, ArrowRight, Sparkles, Palette, Camera, Megaphone,
  TrendingUp, Code, Search, Music, Check, Mail, Instagram, Linkedin, Youtube, ExternalLink,
} from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import stmLogo from "@/assets/stm-logo.asset.json";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sole Trust Media — We Build Businesses That People Remember" },
      { name: "description", content: "From branding and marketing to technology and talent management, we partner with ambitious businesses and creators to build brands that last." },
      { property: "og:title", content: "Sole Trust Media — We Build Businesses That People Remember" },
      { property: "og:description", content: "A modern growth company for brands, startups, artists and creators." },
    ],
  }),
  component: Home,
});

/* ───────── primitives ───────── */

function MagneticButton({
  children,
  variant = "primary",
  href = "#contact",
  className = "",
}: { children: ReactNode; variant?: "primary" | "ghost"; href?: string; className?: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 14 });
  const sy = useSpring(y, { stiffness: 180, damping: 14 });

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - r.left - r.width / 2) * 0.25);
    y.set((e.clientY - r.top - r.height / 2) * 0.25);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  const base = "group relative inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium transition-colors will-change-transform";
  const styles = variant === "primary"
    ? "bg-gradient-gold text-primary-foreground shadow-[0_10px_40px_-10px_rgba(222,189,135,0.45)] hover:shadow-[0_20px_60px_-10px_rgba(222,189,135,0.6)]"
    : "border border-border bg-surface/40 text-foreground backdrop-blur-md hover:bg-surface";

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={`${base} ${styles} ${className}`}
    >
      <span className="relative z-10">{children}</span>
      <ArrowUpRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </motion.a>
  );
}

function Reveal({ children, delay = 0, y = 28, className = "" }: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/40 px-3.5 py-1.5 text-xs uppercase tracking-[0.18em] text-muted-foreground backdrop-blur-md">
      <span className="h-1 w-1 rounded-full bg-gold-light" />
      {children}
    </div>
  );
}

/* ───────── nav ───────── */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Services", href: "#services" },
    { label: "Ecosystem", href: "#ecosystem" },
    { label: "Work", href: "#work" },
    { label: "Clients", href: "#clients" },
    { label: "Process", href: "#process" },
    { label: "Insights", href: "#insights" },
  ];

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-5"}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <div className={`flex w-full items-center justify-between rounded-full px-5 py-2.5 transition-all duration-500 ${
          scrolled ? "glass shadow-[0_10px_40px_-20px_rgba(0,0,0,0.8)]" : "bg-transparent"
        }`}>
          <a href="#top" className="flex items-center gap-2.5 text-sm font-semibold tracking-tight">
            <span className="grid h-8 w-8 place-items-center overflow-hidden rounded-full bg-white ring-1 ring-border"><img src={stmLogo.url} alt="Sole Trust Media" className="h-full w-full object-cover scale-[1.8] translate-x-[-2px]" /></span>

            <span>Sole Trust <span className="text-muted-foreground">Media</span></span>
          </a>
          <nav className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <a key={l.label} href={l.href}
                className="rounded-full px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-surface hover:text-foreground">
                {l.label}
              </a>
            ))}
          </nav>
          <MagneticButton href="https://cal.com/sole-trust-5klivz/demo-meet" className="!py-2 !px-4 !text-xs">Book a call</MagneticButton>
        </div>
      </div>
    </motion.header>
  );
}

/* ───────── hero ───────── */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const yImg = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <section ref={ref} id="top" className="noise relative isolate min-h-screen overflow-hidden pt-32 pb-24">
      {/* bg image */}
      <motion.div style={{ y: yImg, scale }} className="absolute inset-0 -z-10">
        <img src={heroBg} alt="" width={1920} height={1280}
          className="h-full w-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
      </motion.div>

      {/* floating gradient orbs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="animate-float absolute -top-32 left-1/4 h-[520px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(222,189,135,0.18),transparent)] blur-3xl" />
        <div className="animate-float absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(244,227,178,0.10),transparent)] blur-3xl [animation-delay:-3s]" />
      </div>

      <motion.div style={{ y, opacity }} className="mx-auto max-w-7xl px-6">
        <Reveal>
          <SectionLabel>Building Brands • Empowering Creators • Driving Growth</SectionLabel>
        </Reveal>

        <Reveal delay={0.1} y={50}>
          <h1 className="mt-8 max-w-5xl text-[clamp(2.75rem,8vw,7.5rem)] font-medium leading-[0.95] tracking-[-0.04em]">
            We build businesses<br />
            that people <span className="italic font-light text-gradient-gold">remember.</span>
          </h1>
        </Reveal>

        <Reveal delay={0.25}>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            From branding and marketing to technology and talent management, we partner with
            ambitious businesses and creators to build brands that last.
          </p>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <MagneticButton href="https://cal.com/sole-trust-5klivz/demo-meet">Book discovery call</MagneticButton>
            <MagneticButton href="#work" variant="ghost">View our work</MagneticButton>
          </div>
        </Reveal>

        <Reveal delay={0.6}>
          <div className="mt-24 flex items-center gap-6 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <div className="hairline w-16" />
            Scroll to explore
          </div>
        </Reveal>
      </motion.div>
    </section>
  );
}

/* ───────── trusted by ───────── */

const LOGOS = ["Nova", "Halcyon", "Vermilion", "Northwind", "Atelier", "Monolith", "Lumen", "Praxis", "Kintsugi", "Obsidian"];

function TrustedBy() {
  return (
    <section className="border-y border-border bg-surface/30 py-14">
      <div className="mx-auto max-w-7xl px-6">
        <p className="mb-10 text-center text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Trusted by ambitious brands & creators
        </p>
        <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_15%,#000_85%,transparent)]">
          <div className="animate-marquee flex w-max gap-16 whitespace-nowrap">
            {[...LOGOS, ...LOGOS].map((logo, i) => (
              <span key={i} className="font-display text-2xl font-medium tracking-tight text-muted-foreground/60 transition-colors hover:text-foreground md:text-3xl">
                {logo}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────── about ───────── */

function About() {
  return (
    <section id="about" className="relative py-32">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <SectionLabel>About</SectionLabel>
          <h2 className="mt-6 text-5xl font-medium leading-[1] tracking-tight md:text-7xl">
            More than<br />
            an <span className="italic font-light text-gradient-gold">agency.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.15} className="lg:col-span-6 lg:col-start-7">
          <p className="text-xl leading-relaxed text-muted-foreground md:text-2xl">
            Sole Trust Media is a modern growth company helping brands, startups,
            artists, and creators build scalable businesses through branding,
            marketing, technology, and creative execution.
          </p>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Instead of being another agency, we become a long-term growth partner —
            embedded, accountable, and obsessed with outcomes that compound.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-4 text-sm">
            {["Strategy first", "Creative excellence", "Technology driven", "Built to scale"].map((t) => (
              <div key={t} className="flex items-center gap-2 text-muted-foreground">
                <Check className="h-4 w-4 text-gold" /> {t}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────── stats ───────── */

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 2.2, ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(v),
    });
    return () => controls.stop();
  }, [inView, to]);
  const format = (v: number) =>
    v >= 1_000_000 ? (v / 1_000_000).toFixed(1) + "M"
      : v >= 1_000 ? (v / 1_000).toFixed(0) + "K"
      : Math.round(v).toString();
  return <span ref={ref}>{format(val)}{suffix}</span>;
}

const STATS = [
  { value: 240, suffix: "+", label: "Projects delivered" },
  { value: 80, suffix: "+", label: "Brands managed" },
  { value: 1500, suffix: "+", label: "Campaigns launched" },
  { value: 320_000_000, suffix: "+", label: "Content views" },
  { value: 98, suffix: "%", label: "Client satisfaction" },
];

function Stats() {
  return (
    <section className="border-y border-border bg-surface/20 py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-12 px-6 md:grid-cols-5">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} className="text-center md:text-left">
            <div className="font-display text-5xl font-medium tracking-tight md:text-6xl">
              <span className="text-gradient-gold">
                <Counter to={s.value} suffix={s.suffix} />
              </span>
            </div>
            <div className="mt-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">{s.label}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ───────── services ───────── */

const SERVICES = [
  { icon: Palette, title: "Brand strategy & identity", items: ["Brand strategy", "Brand positioning", "Brand messaging", "Logo design", "Visual identity", "Packaging design", "Label design", "Brand guidelines"] },
  { icon: Camera, title: "Creative content studio", items: ["Photography", "Videography", "Commercial production", "Product shoots", "Reels", "UGC", "Motion graphics", "Creative direction"] },
  { icon: Megaphone, title: "Social media management", items: ["Strategy", "Monthly planning", "Graphic design", "Content calendar", "Posting & scheduling", "Community management", "Analytics"] },
  { icon: TrendingUp, title: "Performance marketing", items: ["Meta Ads", "Google Ads", "Lead generation", "Sales funnels", "Conversion optimization", "Retargeting"] },
  { icon: Code, title: "Development", items: ["Business websites", "Landing pages", "E-commerce", "Custom web apps", "SaaS", "Business automation", "AI integrations"] },
  { icon: Search, title: "SEO", items: ["Technical SEO", "Local SEO", "Content SEO", "Keyword research", "Link building"] },
  { icon: Music, title: "Talent & creator management", items: ["Artist management", "Influencer management", "Music marketing", "Distribution", "Brand collaborations", "Events"] },
];

function Services() {
  return (
    <section id="services" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-end gap-10 md:grid-cols-2">
          <Reveal>
            <SectionLabel>Services</SectionLabel>
            <h2 className="mt-6 text-5xl font-medium leading-[1] tracking-tight md:text-7xl">
              Solutions for<br />
              <span className="italic font-light text-gradient-gold">growth.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-lg text-muted-foreground md:text-xl">
              We don't sell services. We solve business problems —
              with a team that strategizes, designs, builds, and ships.
            </p>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 0.08}>
              <article className="group relative h-full overflow-hidden rounded-3xl border border-border bg-surface p-8 transition-all duration-500 hover:border-gold/40 hover:-translate-y-1">
                <div className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: "radial-gradient(80% 100% at 0% 0%, rgba(222,189,135,0.10), transparent 60%)" }} />
                <div className="flex items-start justify-between">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl border border-border bg-background transition-colors group-hover:border-gold/40">
                    <s.icon className="h-5 w-5 text-gold" strokeWidth={1.5} />
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-gold" />
                </div>
                <h3 className="mt-8 text-2xl font-medium tracking-tight">{s.title}</h3>
                <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
                  {s.items.map((it) => (
                    <li key={it} className="flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-gold/70" /> {it}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── ecosystem ───────── */

const ECOSYSTEM = [
  { name: "Sole Trust Media", tag: "Flagship", desc: "The growth company.", items: ["Marketing", "Branding", "Development", "Technology", "Growth"] },
  { name: "STM Music Group", tag: "Music", desc: "Building careers in music.", items: ["Artist management", "Music marketing", "Distribution", "Events", "Brand partnerships"] },
  { name: "Future Ventures", tag: "Coming soon", desc: "What's next.", items: ["In development"] },
];

function Ecosystem() {
  return (
    <section id="ecosystem" className="relative border-t border-border py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <SectionLabel>Ecosystem</SectionLabel>
          <h2 className="mt-6 max-w-3xl text-5xl font-medium leading-[1] tracking-tight md:text-7xl">
            Building more<br />
            than <span className="italic font-light text-gradient-gold">one company.</span>
          </h2>
        </Reveal>

        <div className="mt-20 grid gap-5 lg:grid-cols-3">
          {ECOSYSTEM.map((card, i) => (
            <Reveal key={card.name} delay={i * 0.1}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-border bg-surface p-10 transition-all duration-500 hover:border-gold/40">
                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[radial-gradient(closest-side,rgba(222,189,135,0.18),transparent)] opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100" />
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-border px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{card.tag}</span>
                  <span className="h-2 w-2 rounded-full bg-gold/60" />
                </div>
                <h3 className="mt-10 text-3xl font-medium tracking-tight md:text-4xl">{card.name}</h3>
                <p className="mt-3 text-muted-foreground">{card.desc}</p>
                <div className="mt-10 flex flex-wrap gap-2">
                  {card.items.map((it) => (
                    <span key={it} className="rounded-full border border-border bg-background/60 px-3 py-1 text-xs text-muted-foreground">{it}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── why choose us ───────── */

const WHY = [
  { t: "Strategy first", d: "Every decision begins with the business behind it — not the deliverable in front of it." },
  { t: "Creative excellence", d: "A bar set by the world's best studios. Held to it on every frame." },
  { t: "Technology driven", d: "Modern stacks, automation, and AI baked into how we build and ship." },
  { t: "Data backed decisions", d: "Instinct refined by measurement. We move fast — and we move smart." },
  { t: "Long-term partnerships", d: "We don't chase retainers. We compound results over years." },
];

function WhyUs() {
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <SectionLabel>Why us</SectionLabel>
          <h2 className="mt-6 max-w-3xl text-5xl font-medium leading-[1] tracking-tight md:text-7xl">
            Built different. <span className="italic font-light text-gradient-gold">On purpose.</span>
          </h2>
        </Reveal>
        <div className="mt-20 grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-2 lg:grid-cols-5">
          {WHY.map((w, i) => (
            <Reveal key={w.t} delay={i * 0.06}>
              <div className="group relative h-full bg-surface p-8 transition-colors hover:bg-surface-elevated">
                <div className="font-display text-sm text-gold">0{i + 1}</div>
                <h3 className="mt-8 text-xl font-medium tracking-tight">{w.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{w.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── process timeline ───────── */

const PROCESS = ["Discover", "Research", "Strategy", "Create", "Launch", "Optimize", "Scale"];

function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 20%"] });
  const lineH = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return (
    <section id="process" className="border-t border-border py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <SectionLabel>Process</SectionLabel>
          <h2 className="mt-6 max-w-3xl text-5xl font-medium leading-[1] tracking-tight md:text-7xl">
            How we <span className="italic font-light text-gradient-gold">work.</span>
          </h2>
        </Reveal>
        <div ref={ref} className="relative mt-20 pl-10 md:pl-20">
          <div className="absolute left-3 top-2 h-full w-px bg-border md:left-6">
            <motion.div style={{ height: lineH }} className="w-px bg-gradient-to-b from-gold to-gold-light" />
          </div>
          <ul className="space-y-10">
            {PROCESS.map((step, i) => (
              <Reveal key={step} delay={i * 0.05}>
                <li className="relative">
                  <div className="absolute -left-[2.6rem] top-2 h-3 w-3 rounded-full border border-gold/60 bg-background md:-left-[3.95rem]">
                    <div className="absolute inset-0.5 rounded-full bg-gradient-gold" />
                  </div>
                  <div className="flex items-baseline gap-6">
                    <span className="font-display text-sm text-muted-foreground">{(i + 1).toString().padStart(2, "0")}</span>
                    <h3 className="font-display text-4xl font-medium tracking-tight md:text-6xl">{step}</h3>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ───────── featured work ───────── */

const WORK = [
  {
    img: "https://image.thum.io/get/width/1200/crop/800/noanimate/https://lumi-glow0.waseemraza01423.workers.dev/",
    title: "Lumora Beauty",
    tags: ["Website", "E-commerce", "Marketing"],
    overview: "Beauty brand transformation with a digital-first strategy and modern web presence.",
    challenge: "Low sales due to less presence on internet.",
    solution: "Website redesign, agentic calls, and digital outreach systems.",
    results: "+110% sales and traffic flow.",
  },
];

function Work() {
  return (
    <section id="work" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between gap-6">
          <Reveal>
            <SectionLabel>Featured work</SectionLabel>
            <h2 className="mt-6 max-w-3xl text-5xl font-medium leading-[1] tracking-tight md:text-7xl">
              Selected <span className="italic font-light text-gradient-gold">work.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <a href="#" className="group hidden items-center gap-2 text-sm text-muted-foreground hover:text-foreground md:inline-flex">
              View all <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>

        <div className="mt-16 space-y-6">
          {WORK.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.05}>
              <article className="group grid overflow-hidden rounded-3xl border border-border bg-surface transition-colors hover:border-gold/30 lg:grid-cols-12">
                <div className="relative overflow-hidden lg:col-span-7">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={w.img} alt={w.title} width={1280} height={800} loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-tr from-background/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>
                <div className="flex flex-col justify-between gap-6 p-8 lg:col-span-5 lg:p-12">
                  <div>
                    <div className="flex flex-wrap gap-2">
                      {w.tags.map((t) => (
                        <span key={t} className="rounded-full border border-border px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{t}</span>
                      ))}
                    </div>
                    <h3 className="mt-6 text-3xl font-medium tracking-tight md:text-4xl">{w.title}</h3>
                    <p className="mt-4 text-muted-foreground">{w.overview}</p>
                  </div>
                  <dl className="grid grid-cols-1 gap-4 border-t border-border pt-6 text-sm">
                    <div><dt className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Challenge</dt><dd className="mt-1">{w.challenge}</dd></div>
                    <div><dt className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Solution</dt><dd className="mt-1">{w.solution}</dd></div>
                    <div><dt className="text-xs uppercase tracking-[0.18em] text-gold">Results</dt><dd className="mt-1 font-medium">{w.results}</dd></div>
                  </dl>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── clients ───────── */

const CLIENTS = [
  {
    name: "Nina's Beauty Hub",
    category: "Beauty & Wellness",
    description: "Premium beauty brand experience with elegant product storytelling.",
    url: "https://nina-s-beauty-hub.vercel.app/",
  },
  {
    name: "Farmlytics",
    category: "AgriTech SaaS",
    description: "Data-driven analytics platform empowering modern farmers.",
    url: "https://farmlytics-three.vercel.app/",
  },
  {
    name: "ChainMind AI",
    category: "AI & Blockchain",
    description: "Next-gen AI intelligence layer for decentralized ecosystems.",
    url: "https://chainmind-ai-ten.vercel.app/",
  },
  {
    name: "Asha Tiffin",
    category: "Food & Hospitality",
    description: "Authentic home-style tiffin service rooted in Bengaluru.",
    url: "https://asha-tiffin-bengaluru.vercel.app/",
  },
  {
    name: "Psychology with Mitali",
    category: "Mental Health",
    description: "A warm, trust-led digital home for a leading psychologist.",
    url: "https://psychologywithmitali.vercel.app/",
  },
];

const shot = (url: string) =>
  `https://image.thum.io/get/width/1200/crop/800/noanimate/${url}`;

function Clients() {
  return (
    <section id="clients" className="relative border-t border-border py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
      />
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between gap-6">
          <Reveal>
            <SectionLabel>Clients</SectionLabel>
            <h2 className="mt-6 max-w-3xl text-5xl font-medium leading-[1] tracking-tight md:text-7xl">
              Brands we've <span className="italic font-light text-gradient-gold">shipped.</span>
            </h2>
            <p className="mt-6 max-w-xl text-muted-foreground">
              Live products built end-to-end with our partners — from first sketch to launch day.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {CLIENTS.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.06}>
              <a
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block overflow-hidden rounded-3xl border border-border bg-surface transition-all duration-500 hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_30px_80px_-20px_rgba(222,189,135,0.25)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-background">
                  <img
                    src={shot(c.url)}
                    alt={`${c.name} — live website preview`}
                    loading="lazy"
                    className="h-full w-full object-cover object-top transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent opacity-90" />
                  <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/60 backdrop-blur-md transition-all duration-500 group-hover:border-gold/60 group-hover:bg-gold group-hover:text-background">
                    <ExternalLink className="h-4 w-4" />
                  </div>
                </div>
                <div className="flex items-end justify-between gap-6 p-8">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.22em] text-gold">
                      {c.category}
                    </span>
                    <h3 className="mt-3 text-2xl font-medium tracking-tight md:text-3xl">
                      {c.name}
                    </h3>
                    <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                      {c.description}
                    </p>
                  </div>
                  <span className="hidden shrink-0 items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors group-hover:text-gold sm:inline-flex">
                    Visit <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── testimonials ───────── */


const TESTIMONIALS = [
  { quote: "Sole Trust didn't just rebuild our brand — they reset our trajectory. The team operates like a co-founder, not a vendor.", name: "Maya Okafor", role: "CEO, Halcyon", company: "HALCYON" },
  { quote: "We've worked with five agencies. None compare. Strategy, design and execution under one roof — and everything ships on time.", name: "James Reyes", role: "Founder, Vermilion", company: "VERMILION" },
  { quote: "They scaled my career from 200K to 12M monthly listeners. Real partners with a real plan.", name: "Nova", role: "Recording Artist", company: "NOVA" },
];

function Testimonials() {
  return (
    <section className="border-t border-border py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <SectionLabel>Testimonials</SectionLabel>
          <h2 className="mt-6 max-w-3xl text-5xl font-medium leading-[1] tracking-tight md:text-7xl">
            Loved by the <span className="italic font-light text-gradient-gold">ambitious.</span>
          </h2>
        </Reveal>
        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <figure className="group flex h-full flex-col justify-between rounded-3xl border border-border bg-surface p-8 transition-all duration-500 hover:border-gold/30 hover:-translate-y-1">
                <Sparkles className="h-5 w-5 text-gold" strokeWidth={1.5} />
                <blockquote className="mt-8 text-xl leading-relaxed tracking-tight">
                  "{t.quote}"
                </blockquote>
                <figcaption className="mt-10 flex items-center justify-between border-t border-border pt-6">
                  <div>
                    <div className="text-sm font-medium">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                  <div className="font-display text-xs tracking-[0.25em] text-muted-foreground">{t.company}</div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── insights ───────── */

const POSTS = [
  { cat: "Branding", title: "The new luxury: quiet, considered, compounding.", read: "6 min read" },
  { cat: "Marketing", title: "Performance creative is the new performance marketing.", read: "5 min read" },
  { cat: "AI", title: "What AI changes about how growth teams operate in 2026.", read: "8 min read" },
  { cat: "Creator economy", title: "Why artists need infrastructure, not just management.", read: "4 min read" },
  { cat: "SEO", title: "SEO in the age of answer engines.", read: "7 min read" },
  { cat: "Business growth", title: "The compounding case for long-term partners.", read: "5 min read" },
];

function Insights() {
  return (
    <section id="insights" className="border-t border-border py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <SectionLabel>Insights</SectionLabel>
          <h2 className="mt-6 max-w-3xl text-5xl font-medium leading-[1] tracking-tight md:text-7xl">
            Notes on <span className="italic font-light text-gradient-gold">building.</span>
          </h2>
        </Reveal>
        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {POSTS.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) * 0.08}>
              <a href="#" className="group flex h-full flex-col justify-between rounded-3xl border border-border bg-surface p-8 transition-all duration-500 hover:border-gold/30 hover:-translate-y-1">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-[0.2em] text-gold">{p.cat}</span>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                  </div>
                  <h3 className="mt-10 text-2xl font-medium leading-snug tracking-tight">{p.title}</h3>
                </div>
                <div className="mt-12 text-xs text-muted-foreground">{p.read}</div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── cta ───────── */

function CTA() {
  return (
    <section id="contact" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="noise relative isolate overflow-hidden rounded-[2rem] border border-border bg-surface p-12 text-center md:p-24">
            <div aria-hidden className="absolute inset-0 -z-10"
              style={{ background: "radial-gradient(60% 70% at 50% 0%, rgba(222,189,135,0.20), transparent 60%)" }} />
            <SectionLabel>Let's build</SectionLabel>
            <h2 className="mt-8 text-5xl font-medium leading-[1] tracking-tight md:text-8xl">
              Ready to build<br />
              something <span className="italic font-light text-gradient-gold">bigger?</span>
            </h2>
            <p className="mx-auto mt-8 max-w-xl text-lg text-muted-foreground">
              Tell us what you're building. We'll come back within one business day with a plan,
              a partner, and a path forward.
            </p>
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <MagneticButton href="https://cal.com/sole-trust-5klivz/demo-meet">Let's talk</MagneticButton>
              <MagneticButton href="#work" variant="ghost">See the work</MagneticButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────── footer ───────── */

function Footer() {
  const cols = [
    { title: "Company", links: ["Services", "Projects", "STM Music Group", "Careers", "Contact"] },
    { title: "Connect", links: ["Instagram", "LinkedIn", "YouTube", "Email"] },
  ];
  return (
    <footer className="border-t border-border bg-surface/30 pt-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <div className="flex items-center gap-2.5 text-sm font-semibold tracking-tight">
              <span className="grid h-8 w-8 place-items-center overflow-hidden rounded-full bg-white ring-1 ring-border"><img src={stmLogo.url} alt="Sole Trust Media" className="h-full w-full object-cover scale-[1.8] translate-x-[-2px]" /></span>
              Sole Trust Media
            </div>
            <h3 className="mt-8 max-w-xl font-display text-4xl font-medium leading-[1] tracking-tight md:text-6xl">
              Build a brand <span className="italic font-light text-gradient-gold">people remember.</span>
            </h3>
            <div className="mt-10 flex gap-3">
              {[Instagram, Linkedin, Youtube, Mail].map((Icon, i) => (
                <a key={i} href="#" aria-label="Social link"
                  className="grid h-11 w-11 place-items-center rounded-full border border-border bg-background transition-colors hover:border-gold/40 hover:text-gold">
                  <Icon className="h-4 w-4" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.title} className="lg:col-span-3">
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{c.title}</div>
              <ul className="mt-6 space-y-3">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-base text-foreground/90 transition-colors hover:text-gold">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="hairline mt-20" />
        <div className="flex flex-col items-start justify-between gap-4 py-8 text-xs text-muted-foreground md:flex-row md:items-center">
          <div>© {new Date().getFullYear()} Sole Trust Media. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ───────── page ───────── */

function Home() {
  return (
    <div className="relative">
      <Nav />
      <main>
        <Hero />
        <TrustedBy />
        <About />
        <Stats />
        <Services />
        <Ecosystem />
        <WhyUs />
        <Process />
        <Work />
        <Clients />
        <Testimonials />
        <Insights />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
