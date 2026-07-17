import { Link } from "@tanstack/react-router";
import { ArrowLeft, Instagram, Mail } from "lucide-react";
import type { ReactNode } from "react";
import stmLogo from "@/assets/soletrust-media-logo.png.asset.json";

export function PageLayout({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 py-5">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <div className="glass flex w-full items-center justify-between rounded-full px-5 py-2.5">
            <Link to="/" className="flex items-center">
              <img src={stmLogo.url} alt="Sole Trust Media" className="h-12 w-auto object-contain" />
            </Link>
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/40 px-4 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back home
            </Link>
          </div>
        </div>
      </header>

      <main className="pt-40 pb-24">
        <section className="mx-auto max-w-5xl px-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/40 px-3.5 py-1.5 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            <span className="h-1 w-1 rounded-full bg-gold-light" />
            {eyebrow}
          </div>
          <h1 className="mt-8 max-w-4xl text-5xl font-medium leading-[1] tracking-tight md:text-7xl">
            {title}
          </h1>
          {intro && (
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              {intro}
            </p>
          )}
        </section>
        <section className="mx-auto mt-16 max-w-5xl px-6">{children}</section>
      </main>

      <footer className="border-t border-border bg-surface/30 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <div>© {new Date().getFullYear()} Sole Trust Media. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <a href="https://instagram.com/soletrustmedia" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-foreground">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="mailto:soletrustmedia@gmail.com" aria-label="Email" className="inline-flex items-center gap-2 hover:text-foreground">
              <Mail className="h-4 w-4" /> soletrustmedia@gmail.com
            </a>
            <Link to="/privacy" className="hover:text-foreground">Privacy</Link>
            <Link to="/terms" className="hover:text-foreground">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function seoMeta({
  title,
  description,
  path,
  ogImage,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  type?: string;
}) {
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: type },
      { property: "og:url", content: path },
      { property: "og:site_name", content: "Sole Trust Media" },
      ...(ogImage ? [{ property: "og:image", content: ogImage }, { property: "og:image:alt", content: "Sole Trust Media" }] : []),
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@soletrustmedia" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      ...(ogImage ? [{ name: "twitter:image", content: ogImage }] : []),
    ],
    links: [{ rel: "canonical", href: path }],
  };
}
