"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { projects } from "@/content/projects";
import { site } from "@/lib/site";

const APPS = {
  computer: {
    label: "My Computer",
    title: "My Computer",
    icon: "computer",
    width: 650,
    height: 440,
  },
  about: {
    label: "About Me.txt",
    title: "About Me.txt - Notepad",
    icon: "notepad",
    width: 485,
    height: 330,
  },
  projects: {
    label: "Projects",
    title: "Projects",
    icon: "folder",
    width: 690,
    height: 470,
  },
  experience: {
    label: "Experience",
    title: "Experience - Notepad",
    icon: "document",
    width: 550,
    height: 410,
  },
  terminal: {
    label: "Terminal",
    title: "Terminal",
    icon: "terminal",
    width: 610,
    height: 390,
  },
  contact: {
    label: "Contact",
    title: "Contact",
    icon: "contact",
    width: 520,
    height: 360,
  },
};
const APP_IDS = Object.keys(APPS);

function Icon({ name, size = 32 }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 32 32",
    fill: "none",
    "aria-hidden": true,
  };
  if (name === "computer")
    return (
      <svg {...common}>
        <rect
          x="3"
          y="3"
          width="25"
          height="18"
          rx="2"
          fill="#e8e4cf"
          stroke="#545c64"
        />
        <rect x="5" y="5" width="21" height="13" fill="#427db8" />
        <path d="M7 16l5-5 4 3 4-5 5 7" fill="#81b966" />
        <path d="M12 21h7l1 4h5v3H6v-3h5z" fill="#d9d6c5" stroke="#676b6a" />
        <path d="M9 26h13" stroke="#fff" />
      </svg>
    );
  if (name === "folder")
    return (
      <svg {...common}>
        <path d="M2 8h11l3 3h13v15H2z" fill="#e1a735" stroke="#a5741b" />
        <path d="M3 12h27l-3 14H2z" fill="#f6cd66" stroke="#ad812e" />
        <path d="M5 14h22" stroke="#fff0ac" />
      </svg>
    );
  if (name === "notepad" || name === "document")
    return (
      <svg {...common}>
        <path d="M6 3h15l6 6v20H6z" fill="#fffef5" stroke="#777f87" />
        <path d="M21 3v7h6" fill="#d8e7f4" stroke="#777f87" />
        <path d="M9 14h15M9 17h15M9 20h12M9 23h13" stroke="#7d9cb9" />
        <path d="M8 2v4m4-4v4m4-4v4" stroke="#526a80" strokeWidth="2" />
        {name === "document" && (
          <path d="M19 25l7-7 2 2-7 7-3 1z" fill="#e5b848" stroke="#8b6a28" />
        )}
      </svg>
    );
  if (name === "terminal")
    return (
      <svg {...common}>
        <rect
          x="2"
          y="5"
          width="28"
          height="22"
          rx="1"
          fill="#e5e5dd"
          stroke="#555"
        />
        <path d="M3 6h26v4H3z" fill="#2262bb" />
        <path d="M4 11h24v14H4z" fill="#1c2630" />
        <path d="M7 14l4 3-4 3m6 1h6" stroke="#e9f2ee" strokeWidth="1.5" />
      </svg>
    );
  return (
    <svg {...common}>
      <rect
        x="4"
        y="4"
        width="24"
        height="25"
        rx="2"
        fill="#e4bc6e"
        stroke="#9e7431"
      />
      <path d="M7 7h18v19H7z" fill="#fffdf0" />
      <circle cx="16" cy="13" r="4" fill="#e1aa79" />
      <path d="M9 23c0-5 3-7 7-7s7 2 7 7" fill="#6184a7" />
      <path d="M3 9h3m-3 5h3m-3 5h3m-3 5h3" stroke="#635337" strokeWidth="2" />
    </svg>
  );
}

function clampRect(rect) {
  if (typeof window === "undefined") return rect;
  const width = Math.min(rect.width, Math.max(280, window.innerWidth));
  const height = Math.min(rect.height, Math.max(200, window.innerHeight - 42));
  return {
    ...rect,
    width,
    height,
    x: Math.max(0, Math.min(rect.x, window.innerWidth - width)),
    y: Math.max(0, Math.min(rect.y, window.innerHeight - 40 - height)),
  };
}

function DesktopIcon({ id, selected, onSelect, onOpen }) {
  const app = APPS[id];
  const touchPointer = useRef(false);
  return (
    <button
      className={`desktop-icon${selected ? " selected" : ""}`}
      aria-label={`Open ${app.label}`}
      onPointerDown={(event) => {
        touchPointer.current = event.pointerType === "touch";
      }}
      onClick={(event) => {
        event.stopPropagation();
        onSelect(id);
        if (
          touchPointer.current ||
          window.matchMedia("(pointer: coarse)").matches ||
          event.detail === 0
        )
          onOpen(id);
        touchPointer.current = false;
      }}
      onDoubleClick={() => onOpen(id)}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          onOpen(id);
        }
      }}
    >
      <Icon name={app.icon} size={38} />
      <span>{app.label}</span>
    </button>
  );
}

function MenuBar({ onClose, kind }) {
  const [menu, setMenu] = useState(null);
  return (
    <div
      className="menu-bar"
      onKeyDown={(e) => {
        if (e.key === "Escape") setMenu(null);
      }}
    >
      <div className="menu-wrap">
        <button
          aria-expanded={menu === "file"}
          onClick={() => setMenu(menu === "file" ? null : "file")}
        >
          <u>F</u>ile
        </button>
        {menu === "file" && (
          <div className="menu-popup">
            <button
              onClick={() => {
                setMenu(null);
                onClose();
              }}
            >
              Close <span>Alt+F4</span>
            </button>
          </div>
        )}
      </div>
      <div className="menu-wrap">
        <button
          aria-expanded={menu === "help"}
          onClick={() => setMenu(menu === "help" ? null : "help")}
        >
          <u>H</u>elp
        </button>
        {menu === "help" && (
          <div className="menu-popup menu-help">
            <p>
              {kind === "terminal"
                ? "Type help to see available commands."
                : "Use the title bar to move this window. Use the taskbar to switch applications."}
            </p>
            <button onClick={() => setMenu(null)}>OK</button>
          </div>
        )}
      </div>
    </div>
  );
}

function Window({
  id,
  state,
  active,
  onFocus,
  onMinimize,
  onMaximize,
  onClose,
  onRect,
  children,
}) {
  const app = APPS[id];
  const startPointer = (event, mode) => {
    if (
      event.button !== 0 ||
      state.maximized ||
      window.matchMedia("(max-width: 600px)").matches
    )
      return;
    event.preventDefault();
    onFocus(id);
    const start = { x: event.clientX, y: event.clientY, rect: state.rect };
    const move = (e) => {
      const dx = e.clientX - start.x,
        dy = e.clientY - start.y;
      if (mode === "move")
        onRect(
          id,
          clampRect({
            ...start.rect,
            x: start.rect.x + dx,
            y: start.rect.y + dy,
          }),
        );
      else
        onRect(
          id,
          clampRect({
            ...start.rect,
            width: Math.max(300, start.rect.width + dx),
            height: Math.max(220, start.rect.height + dy),
          }),
        );
    };
    const end = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", end);
      window.removeEventListener("pointercancel", end);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", end);
    window.addEventListener("pointercancel", end);
  };
  const keyMove = (event) => {
    if (
      !event.altKey ||
      !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(
        event.key,
      ) ||
      state.maximized
    )
      return;
    event.preventDefault();
    const dx =
      event.key === "ArrowLeft" ? -10 : event.key === "ArrowRight" ? 10 : 0;
    const dy =
      event.key === "ArrowUp" ? -10 : event.key === "ArrowDown" ? 10 : 0;
    onRect(
      id,
      clampRect(
        event.shiftKey
          ? {
              ...state.rect,
              width: Math.max(300, state.rect.width + dx),
              height: Math.max(220, state.rect.height + dy),
            }
          : { ...state.rect, x: state.rect.x + dx, y: state.rect.y + dy },
      ),
    );
  };
  return (
    <section
      className={`window${active ? " active" : ""}${state.maximized ? " maximized" : ""}`}
      aria-label={app.title}
      aria-hidden={state.minimized || undefined}
      inert={state.minimized || undefined}
      style={{
        left: state.rect.x,
        top: state.rect.y,
        width: state.rect.width,
        height: state.rect.height,
        zIndex: state.z,
        display: state.minimized ? "none" : undefined,
      }}
      onPointerDown={() => onFocus(id)}
      onFocus={() => onFocus(id)}
      onKeyDown={(e) => {
        if (e.altKey && e.key === "F4") {
          e.preventDefault();
          onClose(id);
        }
      }}
    >
      <div
        className="title-bar"
        onPointerDown={(e) => {
          if (!e.target.closest("button")) startPointer(e, "move");
        }}
        onDoubleClick={(e) => {
          if (!e.target.closest("button")) onMaximize(id);
        }}
      >
        <div
          className="title-text"
          data-window-title={id}
          tabIndex={0}
          onKeyDown={keyMove}
          title="Alt + arrow keys to move; Alt + Shift + arrow keys to resize"
        >
          <Icon name={app.icon} size={16} />
          <span>{app.title}</span>
        </div>
        <div
          className="window-controls"
          onPointerDown={(event) => event.stopPropagation()}
        >
          <button
            aria-label={`Minimize ${app.label}`}
            onClick={() => onMinimize(id)}
          >
            <span className="minimize-mark" />
          </button>
          <button
            aria-label={`${state.maximized ? "Restore" : "Maximize"} ${app.label}`}
            onClick={() => onMaximize(id)}
          >
            <span className="maximize-mark" />
          </button>
          <button
            className="close-control"
            aria-label={`Close ${app.label}`}
            onClick={() => onClose(id)}
          >
            ×
          </button>
        </div>
      </div>
      <MenuBar onClose={() => onClose(id)} kind={id} />
      <div className="window-content">{children}</div>
      {!state.maximized && (
        <div
          className="resize-grip"
          aria-hidden="true"
          onPointerDown={(e) => startPointer(e, "resize")}
        />
      )}
    </section>
  );
}

function Explorer({ type }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const project = projects.find((item) => item.slug === selectedProject);
  const isProjects = type === "projects";
  return (
    <div className="explorer">
      <div className="explorer-toolbar">
        <button
          onClick={() => setSelectedProject(null)}
          disabled={!project}
          aria-label="Back to projects"
        >
          <span className="back-arrow">←</span> Back
        </button>
        <span className="toolbar-divider" />
        <span className="toolbar-label">
          {isProjects ? "Folders" : "Details"}
        </span>
      </div>
      <div className="address-bar">
        <span>Address</span>
        <div>
          <Icon name={isProjects ? "folder" : "computer"} size={16} />
          {isProjects
            ? `Projects${project ? ` / ${project.name}` : ""}`
            : "My Computer"}
        </div>
      </div>
      <div className="explorer-body">
        <aside className="explorer-sidebar">
          <div className="sidebar-title">
            {isProjects ? "Project tasks" : "System tasks"}
          </div>
          <div className="sidebar-content">
            {project ? (
              <button onClick={() => setSelectedProject(null)}>
                ← View all projects
              </button>
            ) : (
              <p>
                {isProjects
                  ? "Select a project to view its details."
                  : "A closer look at my work and tools."}
              </p>
            )}
          </div>
          <div className="sidebar-title">Details</div>
          <div className="sidebar-content">
            <strong>
              {project ? project.name : isProjects ? "Projects" : "My Computer"}
            </strong>
            <p>
              {project
                ? project.category
                : isProjects
                  ? `${projects.length} selected projects`
                  : "Software engineering"}
            </p>
          </div>
        </aside>
        <div className="explorer-main">
          {isProjects ? (
            project ? (
              <div className="project-detail">
                <button
                  className="back-link"
                  onClick={() => setSelectedProject(null)}
                >
                  ← Back to Projects
                </button>
                <div className="detail-heading">
                  <Icon name="folder" size={38} />
                  <div>
                    <h2>{project.name}</h2>
                    <p>
                      {project.category} · {project.status}
                    </p>
                  </div>
                </div>
                <p className="detail-summary">{project.summary}</p>
                <h3>Architecture</h3>
                <p>{project.architecture}</p>
                <h3>Approach</h3>
                <p>{project.decision}</p>
                <h3>Technologies</h3>
                <p>{project.stack.join(" · ")}</p>
                <h3>Current status</h3>
                <p>{project.outcome}</p>
                <div className="project-links">
                  {project.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {link.label} ↗
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <div className="group-heading">
                  Selected engineering projects
                </div>
                <div className="file-list">
                  {projects.map((item) => (
                    <button
                      className="file-item"
                      key={item.slug}
                      onClick={() => setSelectedProject(item.slug)}
                    >
                      <Icon name="folder" size={34} />
                      <span>
                        <strong>{item.name}</strong>
                        <small>{item.category}</small>
                      </span>
                    </button>
                  ))}
                </div>
              </>
            )
          ) : (
            <>
              <div className="group-heading">About this computer</div>
              <div className="computer-intro">
                <Icon name="computer" size={42} />
                <div>
                  <strong>Klevert Opee</strong>
                  <p>Senior Software Engineer</p>
                </div>
              </div>
              <div className="group-heading">Areas of expertise</div>
              <div className="expertise-list">
                <div>
                  <strong>Financial systems</strong>
                  <span>Settlement, reconciliation and compliance</span>
                </div>
                <div>
                  <strong>Distributed systems</strong>
                  <span>Event-driven services, APIs and data pipelines</span>
                </div>
                <div>
                  <strong>Infrastructure</strong>
                  <span>Deployments, observability and security</span>
                </div>
              </div>
              <div className="group-heading">Technologies</div>
              <p className="technology-list">
                Go · TypeScript · React · Rust · Smart contracts
              </p>
            </>
          )}
        </div>
      </div>
      <div className="status-bar">
        {project
          ? "1 project selected"
          : isProjects
            ? `${projects.length} objects`
            : "System information"}
      </div>
    </div>
  );
}

const INTRO = `Klevert Opee\n\nSenior Software Engineer\n\nI design and build reliable software systems, with a focus on distributed computing, fintech, and infrastructure.\n\nI have more than five years of experience building software for digital-asset trading, settlement, and internal operations.\n\nI enjoy working across the stack, from event-driven services and APIs to deployment, observability, and security. I value clear system boundaries and software that is practical to operate.`;
function Notepad({ experience = false }) {
  return (
    <div className="notepad">
      <div className="notepad-paper" tabIndex={0}>
        {experience ? (
          <>
            <h2>Experience</h2>
            <p>Software engineering</p>
            <p>
              5+ years building software for digital-asset trading, settlement,
              and internal operations.
            </p>
            <p>
              Areas of responsibility include financial systems, event-driven
              services, APIs, data pipelines, deployments, observability, and
              security.
            </p>
            <p>
              My work focuses on reliable systems and clear boundaries between
              approval, execution, and settlement.
            </p>
          </>
        ) : (
          INTRO
        )}
      </div>
      <div className="status-bar">
        {experience ? "Experience" : "About Me.txt"}
        <span>Ln 1, Col 1</span>
      </div>
    </div>
  );
}

const commands = {
  help: "Available commands: help, whoami, skills, projects, contact, clear",
  whoami: "Klevert Opee — Senior Software Engineer.",
  skills:
    "Distributed systems, financial infrastructure, Go, TypeScript, React, Rust and smart contracts.",
  projects: projects.map((p) => `${p.name} — ${p.summary}`).join("\n"),
  contact: `Email: ${site.email}\nGitHub: ${site.github}\nLinkedIn: ${site.linkedin}`,
};
function Terminal() {
  const [lines, setLines] = useState([
    {
      output:
        "Klevert Opee Portfolio [Version 1.0]\nType 'help' to see available commands.",
    },
  ]);
  const [value, setValue] = useState("");
  const end = useRef(null);
  function submit(event) {
    event.preventDefault();
    const input = value.trim();
    const command = input.toLowerCase();
    setValue("");
    if (command === "clear") {
      setLines([]);
      return;
    }
    setLines((previous) => [
      ...previous,
      {
        input,
        output: command
          ? commands[command] ||
            `'${input}' is not recognized. Type 'help' for a list of commands.`
          : "",
      },
    ]);
  }
  useEffect(() => {
    end.current?.scrollIntoView({ block: "nearest" });
  }, [lines]);
  return (
    <div
      className="terminal"
      onClick={(e) => e.currentTarget.querySelector("input")?.focus()}
    >
      <div aria-live="polite">
        {lines.map((line, index) => (
          <div key={index}>
            {line.input !== undefined && (
              <div>C:\Users\Klevert&gt; {line.input}</div>
            )}
            <div className="terminal-output">{line.output}</div>
          </div>
        ))}
      </div>
      <form onSubmit={submit}>
        <label htmlFor="terminal-command">C:\Users\Klevert&gt;</label>
        <input
          id="terminal-command"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoComplete="off"
          spellCheck="false"
          aria-label="Terminal command"
        />
      </form>
      <div ref={end} />
    </div>
  );
}
function Contact() {
  return (
    <div className="contact-app">
      <div className="contact-heading">
        <Icon name="contact" size={42} />
        <div>
          <h2>Get in touch</h2>
          <p>Find me at any of the addresses below.</p>
        </div>
      </div>
      <div className="contact-rows">
        <a href={`mailto:${site.email}`}>
          <strong>Email</strong>
          <span>{site.email}</span>
          <b>↗</b>
        </a>
        <a href={site.github} target="_blank" rel="noreferrer">
          <strong>GitHub</strong>
          <span>github.com/klevert-ope</span>
          <b>↗</b>
        </a>
        <a href={site.linkedin} target="_blank" rel="noreferrer">
          <strong>LinkedIn</strong>
          <span>Klevert Opee</span>
          <b>↗</b>
        </a>
      </div>
    </div>
  );
}
function AppContent({ id }) {
  if (id === "computer" || id === "projects") return <Explorer type={id} />;
  if (id === "about" || id === "experience")
    return <Notepad experience={id === "experience"} />;
  if (id === "terminal") return <Terminal />;
  return <Contact />;
}

export function Desktop() {
  const [windows, setWindows] = useState({
    about: {
      rect: { x: 235, y: 100, width: 485, height: 330 },
      z: 1,
      minimized: false,
      maximized: false,
    },
  });
  const [active, setActive] = useState("about");
  const [selected, setSelected] = useState(null);
  const [startOpen, setStartOpen] = useState(false);
  const [clock, setClock] = useState("");
  const counter = useRef(1);
  const startRef = useRef(null);
  const openApp = useCallback((id) => {
    counter.current += 1;
    setWindows((prev) => ({
      ...prev,
      [id]: prev[id]
        ? { ...prev[id], minimized: false, z: counter.current }
        : {
            rect: clampRect({
              x: 180 + (counter.current % 5) * 32,
              y: 65 + (counter.current % 5) * 25,
              width: APPS[id].width,
              height: APPS[id].height,
            }),
            z: counter.current,
            minimized: false,
            maximized: false,
          },
    }));
    setActive(id);
    setStartOpen(false);
    requestAnimationFrame(() =>
      document.querySelector(`[data-window-title="${id}"]`)?.focus(),
    );
  }, []);
  const focusApp = useCallback(
    (id) => {
      if (active === id) return;
      counter.current += 1;
      const z = counter.current;
      setWindows((prev) =>
        prev[id] ? { ...prev, [id]: { ...prev[id], z } } : prev,
      );
      setActive(id);
    },
    [active],
  );
  const update = (id, changes) =>
    setWindows((prev) => ({ ...prev, [id]: { ...prev[id], ...changes } }));
  const closeApp = (id) => {
    const next = { ...windows };
    delete next[id];
    const visible = Object.keys(next)
      .filter((key) => !next[key].minimized)
      .sort((a, b) => next[b].z - next[a].z);
    setWindows(next);
    setActive(visible[0] || null);
    requestAnimationFrame(() => {
      const target = visible[0]
        ? document.querySelector(`[data-window-title="${visible[0]}"]`)
        : startRef.current?.querySelector(".start-button");
      target?.focus();
    });
  };
  const minimize = (id) => {
    update(id, { minimized: true });
    const visible = Object.keys(windows)
      .filter((key) => key !== id && !windows[key].minimized)
      .sort((a, b) => windows[b].z - windows[a].z);
    setActive(visible[0] || null);
    requestAnimationFrame(() =>
      document.querySelector(`[data-task-app="${id}"]`)?.focus(),
    );
  };
  useEffect(() => {
    const tick = () =>
      setClock(
        new Intl.DateTimeFormat(undefined, {
          hour: "numeric",
          minute: "2-digit",
        }).format(new Date()),
      );
    tick();
    const timer = setInterval(tick, 10000);
    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    const resize = () =>
      setWindows((prev) =>
        Object.fromEntries(
          Object.entries(prev).map(([id, state]) => [
            id,
            { ...state, rect: clampRect(state.rect) },
          ]),
        ),
      );
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);
  useEffect(() => {
    if (!startOpen) return;
    const close = (event) => {
      if (!startRef.current?.contains(event.target)) setStartOpen(false);
    };
    const escape = (event) => {
      if (event.key === "Escape") {
        setStartOpen(false);
        startRef.current?.querySelector(".start-button")?.focus();
      }
    };
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", escape);
    };
  }, [startOpen]);
  return (
    <main
      className="desktop"
      aria-label="Klevert Opee desktop"
      onPointerDown={(e) => {
        if (e.target === e.currentTarget) setSelected(null);
      }}
    >
      <div className="desktop-icons" aria-label="Desktop shortcuts">
        {APP_IDS.map((id) => (
          <DesktopIcon
            key={id}
            id={id}
            selected={selected === id}
            onSelect={setSelected}
            onOpen={openApp}
          />
        ))}
      </div>
      <div className="desktop-caption" aria-hidden="true">
        <span>KLEVERT OPEE</span>
        <span>PERSONAL COMPUTER</span>
      </div>
      {Object.entries(windows).map(([id, state]) => (
        <Window
          key={id}
          id={id}
          state={state}
          active={active === id}
          onFocus={focusApp}
          onMinimize={minimize}
          onMaximize={(key) =>
            update(key, { maximized: !windows[key].maximized })
          }
          onClose={closeApp}
          onRect={(key, rect) => update(key, { rect })}
        >
          <AppContent id={id} />
        </Window>
      ))}
      <div className="taskbar" ref={startRef}>
        <button
          className={`start-button${startOpen ? " pressed" : ""}`}
          aria-expanded={startOpen}
          aria-controls="start-menu"
          onClick={() => setStartOpen(!startOpen)}
        >
          <span className="start-logo">
            <i />
            <i />
            <i />
            <i />
          </span>
          <span>start</span>
        </button>
        {startOpen && (
          <div className="start-menu" id="start-menu">
            <div className="start-header">
              <div className="user-avatar">K</div>
              <strong>Klevert Opee</strong>
            </div>
            <div className="start-body">
              <div className="start-apps">
                {APP_IDS.map((id) => (
                  <button key={id} onClick={() => openApp(id)}>
                    <Icon name={APPS[id].icon} size={28} />
                    <span>{APPS[id].label}</span>
                  </button>
                ))}
              </div>
              <div className="start-aside">
                <strong>Welcome</strong>
                <p>Explore the desktop to learn more about my work.</p>
                <span>Software engineer</span>
              </div>
            </div>
            <div className="start-footer">
              <button onClick={() => setStartOpen(false)}>
                Close menu <span>›</span>
              </button>
            </div>
          </div>
        )}
        <div className="taskbar-divider" />
        <div className="taskbar-apps" aria-label="Open applications">
          {Object.keys(windows)
            .sort((a, b) => APP_IDS.indexOf(a) - APP_IDS.indexOf(b))
            .map((id) => (
              <button
                key={id}
                data-task-app={id}
                className={`task-item${active === id && !windows[id].minimized ? " current" : ""}`}
                aria-label={`${windows[id].minimized ? "Restore" : active === id ? "Minimize" : "Focus"} ${APPS[id].label}`}
                onClick={() => {
                  if (active === id && !windows[id].minimized) minimize(id);
                  else openApp(id);
                }}
              >
                <Icon name={APPS[id].icon} size={16} />
                <span>{APPS[id].label}</span>
              </button>
            ))}
        </div>
        <div className="system-tray">
          <span className="tray-dot" aria-hidden="true">
            ●
          </span>
          <time suppressHydrationWarning>{clock}</time>
        </div>
      </div>
    </main>
  );
}
