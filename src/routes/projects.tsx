import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { PageLayout, seoMeta } from "@/components/page-layout";
import stmLogo from "@/assets/soletrust-media-logo.png.asset.json";

const TITLE = "Projects — Selected Client Work | Sole Trust Media";
const DESC = "A selection of live products, brands and campaigns built end-to-end by Sole Trust Media — from first sketch to launch day.";

export const Route = createFileRoute("/projects")({
  head: () => seoMeta({ title: TITLE, description: DESC, path: "/projects", ogImage: stmLogo.url }),
  component: ProjectsPage,
});

const CLIENTS = [
  { name: "Lumora Beauty", category: "Beauty · Website & Marketing", description: "Beauty brand transformation with a digital-first strategy and modern web presence.", url: "https://lumi-glow0.waseemraza01423.workers.dev/" },
  { name: "Nina's Beauty Hub", category: "Beauty & Wellness", description: "Premium beauty brand experience with elegant product storytelling.", url: "https://nina-s-beauty-hub.vercel.app/" },
  { name: "Farmlytics", category: "AgriTech SaaS", description: "Data-driven analytics platform empowering modern farmers.", url: "https://farmlytics-three.vercel.app/" },
  { name: "ChainMind AI", category: "AI & Blockchain", description: "Next-gen AI intelligence layer for decentralized ecosystems.", url: "https://chainmind-ai-ten.vercel.app/" },
  { name: "Asha Tiffin", category: "Food & Hospitality", description: "Authentic home-style tiffin service rooted in Bengaluru.", url: "https://asha-tiffin-bengaluru.vercel.app/" },
  { name: "Psychology with Mitali", category: "Mental Health", description: "A warm, trust-led digital home for a leading psychologist.", url: "https://psychologywithmitali.vercel.app/" },
];

const shot = (url: string) => `https://image.thum.io/get/width/1200/crop/800/noanimate/${url}`;

function ProjectsPage() {
  return (
    <PageLayout
      eyebrow="Projects"
      title={<>Brands we've <span className="italic font-light text-gradient-gold">shipped.</span></>}
      intro="Live products built end-to-end with our partners."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {CLIENTS.map((c) => (
          <a key={c.name} href={c.url} target="_blank" rel="noopener noreferrer"
            className="group block overflow-hidden rounded-3xl border border-border bg-surface transition-all duration-500 hover:-translate-y-1 hover:border-gold/40">
            <div className="relative aspect-[16/10] overflow-hidden bg-background">
              <img src={shot(c.url)} alt={`${c.name} preview`} loading="lazy"
                className="h-full w-full object-cover object-top transition-transform duration-[1400ms] group-hover:scale-[1.04]" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
              <div className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-border bg-background/60 backdrop-blur-md">
                <ExternalLink className="h-4 w-4" />
              </div>
            </div>
            <div className="p-8">
              <span className="text-[10px] uppercase tracking-[0.22em] text-gold">{c.category}</span>
              <h2 className="mt-3 text-2xl font-medium tracking-tight">{c.name}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{c.description}</p>
            </div>
          </a>
        ))}
      </div>
    </PageLayout>
  );
}
