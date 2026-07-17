import { createFileRoute } from "@tanstack/react-router";
import { Music, Mic, Radio, Sparkles } from "lucide-react";
import { PageLayout, seoMeta } from "@/components/page-layout";
import stmLogo from "@/assets/soletrust-media-logo.png.asset.json";

const TITLE = "STM Music Group — Artist Management, Marketing & Distribution";
const DESC = "STM Music Group is the music arm of Sole Trust Media — building careers for artists through management, marketing, distribution, events and brand partnerships.";

export const Route = createFileRoute("/stm-music-group")({
  head: () => seoMeta({ title: TITLE, description: DESC, path: "/stm-music-group", ogImage: stmLogo.url }),
  component: StmMusicPage,
});

const PILLARS = [
  { icon: Mic, title: "Artist management", desc: "Career strategy, release planning, and day-to-day management for serious artists." },
  { icon: Radio, title: "Music marketing", desc: "Modern release campaigns across social, streaming and creator platforms." },
  { icon: Music, title: "Distribution", desc: "Global distribution partnerships to place records on every major platform." },
  { icon: Sparkles, title: "Brand partnerships & events", desc: "Sync deals, sponsorships and live experiences that amplify the story." },
];

function StmMusicPage() {
  return (
    <PageLayout
      eyebrow="STM Music Group"
      title={<>Building careers <span className="italic font-light text-gradient-gold">in music.</span></>}
      intro="A modern music company inside Sole Trust Media, helping artists build fanbases, ship music, and turn momentum into a lasting career."
    >
      <div className="grid gap-5 md:grid-cols-2">
        {PILLARS.map((p) => (
          <article key={p.title} className="rounded-3xl border border-border bg-surface p-8">
            <div className="grid h-12 w-12 place-items-center rounded-2xl border border-border bg-background">
              <p.icon className="h-5 w-5 text-gold" strokeWidth={1.5} />
            </div>
            <h2 className="mt-8 text-2xl font-medium tracking-tight">{p.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
          </article>
        ))}
      </div>

      <div className="mt-12 rounded-3xl border border-border bg-surface p-10">
        <h2 className="text-2xl font-medium tracking-tight">Work with STM Music Group</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Send your music, EPK or a short note about what you're building. We reply to every serious inquiry within one business day.
        </p>
        <a
          href="mailto:soletrustmedia@gmail.com?subject=STM%20Music%20Group%20Inquiry"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-gold px-5 py-2.5 text-sm font-medium text-primary-foreground"
        >
          Email STM Music Group
        </a>
      </div>
    </PageLayout>
  );
}
