import { ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="site-header" id="top">
      <div className="shell header-inner">
        <p className="wordmark">
          <span className="visually-hidden">{site.name}</span>
          <span className="wordmark-icon" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span aria-hidden="true">
            KLEVERT<span className="wordmark-accent">.OPEE</span>
          </span>
        </p>
        <a className="source-link" href={site.github}>
          GitHub <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </div>
    </header>
  );
}
