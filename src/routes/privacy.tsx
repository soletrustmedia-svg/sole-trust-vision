import { createFileRoute } from "@tanstack/react-router";
import { PageLayout, seoMeta } from "@/components/page-layout";

const TITLE = "Privacy Policy — Sole Trust Media";
const DESC = "How Sole Trust Media collects, uses and protects information across our website and client engagements.";

export const Route = createFileRoute("/privacy")({
  head: () => seoMeta({ title: TITLE, description: DESC, path: "/privacy" }),
  component: PrivacyPage,
});

function PrivacyPage() {
  const updated = "July 17, 2026";
  return (
    <PageLayout
      eyebrow="Legal"
      title={<>Privacy <span className="italic font-light text-gradient-gold">Policy.</span></>}
      intro={`This page explains what information we collect, how we use it, and the choices you have. Last updated ${updated}.`}
    >
      <div className="rounded-3xl border border-border bg-surface p-8 md:p-12">
        <p className="text-sm text-muted-foreground">
          This page is maintained by Sole Trust Media to answer common privacy questions about our website and services. It is not a certification or legal advice.
        </p>

        <h2 className="mt-10 text-2xl font-medium tracking-tight">1. Who we are</h2>
        <p className="mt-3 text-muted-foreground">
          Sole Trust Media ("we", "us", "our") is a growth company offering branding, marketing, technology and talent services. You can reach us at{" "}
          <a href="mailto:soletrustmedia@gmail.com" className="text-foreground hover:text-gold">soletrustmedia@gmail.com</a>.
        </p>

        <h2 className="mt-10 text-2xl font-medium tracking-tight">2. Information we collect</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-muted-foreground">
          <li><strong className="text-foreground">Contact details</strong> you share when you email us, submit a form, or book a call (name, email, company, message).</li>
          <li><strong className="text-foreground">Project information</strong> shared during engagements with clients (briefs, assets, feedback).</li>
          <li><strong className="text-foreground">Basic usage data</strong> from our website, such as pages visited, device type and referrer, collected through standard web analytics.</li>
        </ul>

        <h2 className="mt-10 text-2xl font-medium tracking-tight">3. How we use information</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-muted-foreground">
          <li>Respond to inquiries and deliver services you've requested.</li>
          <li>Improve our website, content and offering.</li>
          <li>Send occasional updates related to a live engagement (never sold or shared for third-party marketing).</li>
        </ul>

        <h2 className="mt-10 text-2xl font-medium tracking-tight">4. Sharing and subprocessors</h2>
        <p className="mt-3 text-muted-foreground">
          We only share information with trusted service providers required to operate our business — for example, email, scheduling, hosting and analytics tools — under their own privacy terms. We do not sell personal information.
        </p>

        <h2 className="mt-10 text-2xl font-medium tracking-tight">5. Retention</h2>
        <p className="mt-3 text-muted-foreground">
          We keep inquiry and project information only as long as needed to serve you, meet our legal obligations, or resolve disputes. Ask us and we'll delete your personal data where we're able to.
        </p>

        <h2 className="mt-10 text-2xl font-medium tracking-tight">6. Cookies and analytics</h2>
        <p className="mt-3 text-muted-foreground">
          Our site may use cookies or similar technologies for basic functionality and anonymous analytics. You can disable cookies in your browser at any time.
        </p>

        <h2 className="mt-10 text-2xl font-medium tracking-tight">7. Your choices</h2>
        <p className="mt-3 text-muted-foreground">
          You can request access, correction, or deletion of your personal data by emailing us at{" "}
          <a href="mailto:soletrustmedia@gmail.com" className="text-foreground hover:text-gold">soletrustmedia@gmail.com</a>. We aim to respond within a reasonable timeframe.
        </p>

        <h2 className="mt-10 text-2xl font-medium tracking-tight">8. Changes to this policy</h2>
        <p className="mt-3 text-muted-foreground">
          We may update this Privacy Policy from time to time. Material changes will be reflected by updating the "Last updated" date above.
        </p>

        <h2 className="mt-10 text-2xl font-medium tracking-tight">9. Contact</h2>
        <p className="mt-3 text-muted-foreground">
          Questions? Reach us at{" "}
          <a href="mailto:soletrustmedia@gmail.com" className="text-foreground hover:text-gold">soletrustmedia@gmail.com</a>.
        </p>
      </div>
    </PageLayout>
  );
}
