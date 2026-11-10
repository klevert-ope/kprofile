import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import profile from "../../public/profile.png";
import { site } from "@/lib/site";
import { Action, SectionHeading } from "./editorial";

const focus = [
  ["Financial systems", "Settlement, reconciliation and compliance."],
  ["Distributed systems", "Event-driven services, APIs and data pipelines."],
  ["Infrastructure", "Deployments, observability and security."],
];

const channels = [
  ["GitHub", "@klevert-ope", site.github],
  ["LinkedIn", site.name, site.linkedin],
];

export function AboutSection() {
  return (
    <section
      className="shell home-section"
      id="about"
      aria-labelledby="about-heading"
    >
      <SectionHeading
        id="about-heading"
        index="02"
        eyebrow="Profile"
        title="About."
      />
      <div className="about-layout">
        <figure className="profile-figure">
          <Image
            src={profile}
            alt={site.name}
            sizes="(max-width: 688px) 80px, 256px"
          />
        </figure>
        <div className="about-copy">
          <h3>Software engineer in Dubai.</h3>
          <p>
            5+ years building software for digital-asset trading, settlement,
            and internal operations.
          </p>
        </div>
      </div>
      <section className="note-grid" aria-label="Areas of focus">
        {focus.map(([title, body]) => (
          <article key={title}>
            <h3>{title}</h3>
            <p>{body}</p>
          </article>
        ))}
      </section>
    </section>
  );
}

export function ContactSection() {
  return (
    <section
      className="shell home-section contact-section"
      id="contact"
      aria-labelledby="contact-heading"
    >
      <SectionHeading
        id="contact-heading"
        index="03"
        eyebrow="Contact"
        title="Let’s talk."
      />
      <div className="actions contact-action">
        <Action href={"mailto:" + site.email} primary>
          {site.email}
        </Action>
      </div>
      <ul className="index-list contact-list" role="list">
        {channels.map(([label, value, href]) => (
          <li key={label}>
            <a href={href}>
              <span className="kicker">{label}</span>
              <span className="channel-value">{value}</span>
              <ArrowUpRight aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
