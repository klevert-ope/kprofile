import {
  ArrowDownRight,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
} from "lucide-react";
import { site } from "@/lib/site";

export function Kicker({ children }) {
  return <p className="kicker">{children}</p>;
}

export function Action({ href, children, primary = false }) {
  const Icon = href.startsWith("#")
    ? ArrowDownRight
    : href.startsWith("/")
      ? ArrowRight
      : ArrowUpRight;
  return (
    <a className={primary ? "action action-primary" : "action"} href={href}>
      {children}
      <Icon size={16} aria-hidden="true" />
    </a>
  );
}

export function SectionHeading({ id, index, eyebrow, title }) {
  return (
    <header className="section-heading">
      <Kicker>
        <span className="section-index">{index}</span> / {eyebrow}
      </Kicker>
      <h2 id={id}>{title}</h2>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <div>
          <span className="status-dot" /> KLEVERT OPEE{" "}
          <span className="footer-location">/ {site.location}</span>
        </div>
        <div className="footer-links">
          <a href={site.github}>
            GitHub <ArrowUpRight size={12} aria-hidden="true" />
          </a>
          <a href={site.linkedin}>
            LinkedIn <ArrowUpRight size={12} aria-hidden="true" />
          </a>
          <a href="#top">
            Back to top <ArrowUp size={12} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
