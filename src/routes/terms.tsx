import { createFileRoute } from "@tanstack/react-router";
import { PageLayout, seoMeta } from "@/components/page-layout";

const TITLE = "Terms of Service — Sole Trust Media";
const DESC = "The terms that govern use of the Sole Trust Media website and services.";

export const Route = createFileRoute("/terms")({
  head: () => seoMeta({ title: TITLE, description: DESC, path: "/terms" }),
  component: TermsPage,
});

function TermsPage() {
  const updated = "July 17, 2026";
  return (
    <PageLayout
      eyebrow="Legal"
      title={<>Terms of <span className="italic font-light text-gradient-gold">Service.</span></>}
      intro={`Please read these terms carefully. By using this website or engaging our services you agree to them. Last updated ${updated}.`}
    >
      <div className="rounded-3xl border border-border bg-surface p-8 md:p-12">
        <p className="text-sm text-muted-foreground">
          These terms are provided for general information about how we work. They are not a substitute for a signed engagement agreement, which governs any paid work.
        </p>

        <h2 className="mt-10 text-2xl font-medium tracking-tight">1. Use of the website</h2>
        <p className="mt-3 text-muted-foreground">
          You agree to use this website lawfully and not to interfere with its operation, security, or other users' access. Content is provided for informational purposes only.
        </p>

        <h2 className="mt-10 text-2xl font-medium tracking-tight">2. Intellectual property</h2>
        <p className="mt-3 text-muted-foreground">
          All content on this website — text, graphics, logos, images and code — belongs to Sole Trust Media or its licensors and is protected by applicable IP laws. You may not reproduce or redistribute it without written permission.
        </p>

        <h2 className="mt-10 text-2xl font-medium tracking-tight">3. Services and engagements</h2>
        <p className="mt-3 text-muted-foreground">
          Paid work with Sole Trust Media is governed by a separate written proposal or engagement agreement covering scope, deliverables, timelines, fees and IP ownership. Nothing on this website constitutes a binding offer.
        </p>

        <h2 className="mt-10 text-2xl font-medium tracking-tight">4. Third-party links</h2>
        <p className="mt-3 text-muted-foreground">
          Our website may link to third-party sites and tools. We're not responsible for their content, policies or practices, and inclusion does not imply endorsement.
        </p>

        <h2 className="mt-10 text-2xl font-medium tracking-tight">5. Disclaimers</h2>
        <p className="mt-3 text-muted-foreground">
          The website is provided "as is" without warranties of any kind. We make no guarantees about the accuracy, availability or results obtainable from using the site or our free content.
        </p>

        <h2 className="mt-10 text-2xl font-medium tracking-tight">6. Limitation of liability</h2>
        <p className="mt-3 text-muted-foreground">
          To the fullest extent permitted by law, Sole Trust Media will not be liable for any indirect, incidental, special or consequential damages arising from your use of the website.
        </p>

        <h2 className="mt-10 text-2xl font-medium tracking-tight">7. Changes to these terms</h2>
        <p className="mt-3 text-muted-foreground">
          We may update these Terms from time to time. Continued use of the website after changes means you accept the updated Terms.
        </p>

        <h2 className="mt-10 text-2xl font-medium tracking-tight">8. Contact</h2>
        <p className="mt-3 text-muted-foreground">
          Questions about these Terms? Email{" "}
          <a href="mailto:soletrustmedia@gmail.com" className="text-foreground hover:text-gold">soletrustmedia@gmail.com</a>.
        </p>
      </div>
    </PageLayout>
  );
}
