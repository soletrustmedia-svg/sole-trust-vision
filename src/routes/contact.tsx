import { createFileRoute } from "@tanstack/react-router";
import { Mail, Instagram, Calendar } from "lucide-react";
import { PageLayout, seoMeta } from "@/components/page-layout";
import stmLogo from "@/assets/soletrust-media-logo.png.asset.json";

const TITLE = "Contact — Talk to Sole Trust Media";
const DESC = "Tell us what you're building. We'll come back within one business day with a plan, a partner, and a path forward. Email soletrustmedia@gmail.com or book a discovery call.";

export const Route = createFileRoute("/contact")({
  head: () => seoMeta({ title: TITLE, description: DESC, path: "/contact", ogImage: stmLogo.url }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <PageLayout
      eyebrow="Contact"
      title={<>Let's build something <span className="italic font-light text-gradient-gold">bigger.</span></>}
      intro="Tell us what you're building. We reply to every serious inquiry within one business day."
    >
      <div className="grid gap-5 md:grid-cols-2">
        <a
          href="mailto:soletrustmedia@gmail.com"
          className="group rounded-3xl border border-border bg-surface p-8 transition-colors hover:border-gold/40"
        >
          <div className="grid h-12 w-12 place-items-center rounded-2xl border border-border bg-background">
            <Mail className="h-5 w-5 text-gold" strokeWidth={1.5} />
          </div>
          <h2 className="mt-8 text-2xl font-medium tracking-tight">Email</h2>
          <p className="mt-2 text-sm text-muted-foreground">Best for briefs, proposals and partnership inquiries.</p>
          <p className="mt-4 text-base text-foreground group-hover:text-gold">soletrustmedia@gmail.com</p>
        </a>

        <a
          href="https://cal.com/sole-trust-5klivz/demo-meet"
          target="_blank"
          rel="noopener noreferrer"
          className="group rounded-3xl border border-border bg-surface p-8 transition-colors hover:border-gold/40"
        >
          <div className="grid h-12 w-12 place-items-center rounded-2xl border border-border bg-background">
            <Calendar className="h-5 w-5 text-gold" strokeWidth={1.5} />
          </div>
          <h2 className="mt-8 text-2xl font-medium tracking-tight">Book a discovery call</h2>
          <p className="mt-2 text-sm text-muted-foreground">30 minutes with a partner to unpack goals and next steps.</p>
          <p className="mt-4 text-base text-foreground group-hover:text-gold">cal.com/sole-trust-5klivz</p>
        </a>

        <a
          href="https://instagram.com/soletrustmedia"
          target="_blank"
          rel="noopener noreferrer"
          className="group rounded-3xl border border-border bg-surface p-8 transition-colors hover:border-gold/40 md:col-span-2"
        >
          <div className="grid h-12 w-12 place-items-center rounded-2xl border border-border bg-background">
            <Instagram className="h-5 w-5 text-gold" strokeWidth={1.5} />
          </div>
          <h2 className="mt-8 text-2xl font-medium tracking-tight">Follow along</h2>
          <p className="mt-2 text-sm text-muted-foreground">Behind-the-scenes work, launches and creative process.</p>
          <p className="mt-4 text-base text-foreground group-hover:text-gold">@soletrustmedia</p>
        </a>
      </div>
    </PageLayout>
  );
}
