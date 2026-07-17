import { createFileRoute } from "@tanstack/react-router";
import { PageLayout, seoMeta } from "@/components/page-layout";
import stmLogo from "@/assets/soletrust-media-logo.png.asset.json";

const TITLE = "Careers — Join Sole Trust Media";
const DESC = "Join a small, senior team of strategists, designers, engineers and marketers building brands people remember. Open, remote-friendly, and outcome-obsessed.";

export const Route = createFileRoute("/careers")({
  head: () => seoMeta({ title: TITLE, description: DESC, path: "/careers", ogImage: stmLogo.url }),
  component: CareersPage,
});

const VALUES = [
  { t: "Own the outcome", d: "We hire senior people and trust them to run — no hand-holding, no politics." },
  { t: "Craft > volume", d: "One thing shipped brilliantly beats ten shipped okay. Quality is the moat." },
  { t: "Client-first, always", d: "We treat every partner like our only partner. Their growth is our scoreboard." },
  { t: "Compound growth", d: "Small wins, stacked weekly, for years. That's how careers and businesses get built." },
];

const ROLES = [
  { title: "Senior Brand Designer", location: "Remote · Full-time" },
  { title: "Performance Marketing Lead", location: "Remote · Full-time" },
  { title: "Full-stack Engineer", location: "Remote · Full-time" },
  { title: "Content Strategist", location: "Remote · Contract" },
];

function CareersPage() {
  return (
    <PageLayout
      eyebrow="Careers"
      title={<>Build brands that <span className="italic font-light text-gradient-gold">people remember.</span></>}
      intro="We're a small, senior team building a modern growth company. If you obsess over craft and outcomes, we'd love to hear from you."
    >
      <div className="grid gap-5 md:grid-cols-2">
        {VALUES.map((v) => (
          <article key={v.t} className="rounded-3xl border border-border bg-surface p-8">
            <h2 className="text-xl font-medium tracking-tight">{v.t}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v.d}</p>
          </article>
        ))}
      </div>

      <div className="mt-16">
        <h2 className="text-3xl font-medium tracking-tight">Open roles</h2>
        <div className="mt-8 divide-y divide-border overflow-hidden rounded-3xl border border-border bg-surface">
          {ROLES.map((r) => (
            <div key={r.title} className="flex flex-col gap-3 p-6 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-lg font-medium">{r.title}</div>
                <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{r.location}</div>
              </div>
              <a
                href={`mailto:soletrustmedia@gmail.com?subject=${encodeURIComponent("Application — " + r.title)}`}
                className="inline-flex items-center justify-center rounded-full border border-border bg-background px-4 py-2 text-sm hover:border-gold/40"
              >
                Apply
              </a>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          Don't see a fit? Send us a note at{" "}
          <a href="mailto:soletrustmedia@gmail.com" className="text-foreground hover:text-gold">
            soletrustmedia@gmail.com
          </a>
          .
        </p>
      </div>
    </PageLayout>
  );
}
