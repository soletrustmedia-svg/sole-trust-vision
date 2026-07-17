import { createFileRoute } from "@tanstack/react-router";
import { Palette, Camera, Megaphone, TrendingUp, Code, Search, Music } from "lucide-react";
import { PageLayout, seoMeta } from "@/components/page-layout";
import stmLogo from "@/assets/soletrust-media-logo.png.asset.json";

const TITLE = "Services — Branding, Marketing, Development & Talent | Sole Trust Media";
const DESC = "End-to-end services for ambitious brands and creators: brand strategy, creative content, social media, performance marketing, web development, SEO, and talent management.";

export const Route = createFileRoute("/services")({
  head: () => seoMeta({ title: TITLE, description: DESC, path: "/services", ogImage: stmLogo.url }),
  component: ServicesPage,
});

const SERVICES = [
  { icon: Palette, title: "Brand strategy & identity", items: ["Brand strategy", "Positioning", "Messaging", "Logo & visual identity", "Packaging", "Brand guidelines"] },
  { icon: Camera, title: "Creative content studio", items: ["Photography", "Videography", "Commercial production", "Reels & UGC", "Motion graphics", "Creative direction"] },
  { icon: Megaphone, title: "Social media management", items: ["Strategy", "Content calendar", "Graphic design", "Community management", "Analytics"] },
  { icon: TrendingUp, title: "Performance marketing", items: ["Meta Ads", "Google Ads", "Lead generation", "Sales funnels", "CRO", "Retargeting"] },
  { icon: Code, title: "Development", items: ["Business websites", "Landing pages", "E-commerce", "Custom web apps", "SaaS", "AI integrations"] },
  { icon: Search, title: "SEO", items: ["Technical SEO", "Local SEO", "Content SEO", "Keyword research", "Link building"] },
  { icon: Music, title: "Talent & creator management", items: ["Artist management", "Influencer management", "Music marketing", "Distribution", "Brand collaborations"] },
];

function ServicesPage() {
  return (
    <PageLayout
      eyebrow="Services"
      title={<>Solutions for <span className="italic font-light text-gradient-gold">growth.</span></>}
      intro="We don't sell services — we solve business problems. One team that strategizes, designs, builds and ships."
    >
      <div className="grid gap-5 md:grid-cols-2">
        {SERVICES.map((s) => (
          <article key={s.title} className="rounded-3xl border border-border bg-surface p-8">
            <div className="grid h-12 w-12 place-items-center rounded-2xl border border-border bg-background">
              <s.icon className="h-5 w-5 text-gold" strokeWidth={1.5} />
            </div>
            <h2 className="mt-8 text-2xl font-medium tracking-tight">{s.title}</h2>
            <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
              {s.items.map((it) => (
                <li key={it} className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-gold/70" /> {it}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </PageLayout>
  );
}
