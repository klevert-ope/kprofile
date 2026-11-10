import { Plus } from "lucide-react";
import { Action } from "./editorial";

function point(x, y, height = 0) {
  return [320 + (x - y) * 0.96, 287 + (x + y) * 0.47 - height];
}

function path(points, height = 0) {
  return points
    .map(([x, y], index) => (index ? "L" : "M") + point(x, y, height).join(" "))
    .join(" ");
}

function square(x, y, size, height = 0) {
  return (
    path(
      [
        [x, y],
        [x + size, y],
        [x + size, y + size],
        [x, y + size],
      ],
      height,
    ) + "Z"
  );
}

const traces = [
  [
    [-133, -55],
    [-82, -55],
    [-82, -22],
    [-29, -22],
  ],
  [
    [-112, -103],
    [-58, -103],
    [-58, -40],
    [-29, -40],
  ],
  [
    [51, -135],
    [51, -81],
    [23, -81],
    [23, -28],
  ],
  [
    [99, -98],
    [99, -54],
    [40, -54],
    [40, -28],
  ],
  [
    [42, 12],
    [92, 12],
    [92, -25],
    [133, -25],
  ],
  [
    [42, 28],
    [72, 28],
    [72, 87],
    [135, 87],
  ],
  [
    [24, 42],
    [24, 85],
    [50, 85],
    [50, 133],
  ],
  [
    [-28, 18],
    [-76, 18],
    [-76, 64],
    [-132, 64],
  ],
  [
    [-16, 42],
    [-16, 96],
    [-54, 96],
    [-54, 133],
  ],
];

export function HeroSchematic() {
  return (
    <figure className="hero-figure" aria-labelledby="hero-caption">
      <div className="diagram-top" aria-hidden="true">
        <span>
          <i /> INFRASTRUCTURE STUDY
        </span>
        <span>ISOMETRIC / 01</span>
      </div>
      <svg
        viewBox="0 45 640 475"
        className="hero-diagram"
        aria-hidden="true"
        focusable="false"
      >
        <g fill="none" strokeWidth="1">
          <circle
            cx="320"
            cy="272"
            r="202"
            stroke="#262e28"
            strokeDasharray="2 6"
          />
          <circle cx="320" cy="272" r="176" stroke="#202822" />
          <path
            d="M320 66v412M92 272h456"
            stroke="#28302a"
            strokeDasharray="3 6"
          />
          <path
            d="M112 109h24m-12-12v24m390 310h24m-12-12v24M112 431h24m-12-12v24M514 109h24m-12-12v24"
            stroke="#505b50"
          />
          <path
            d={square(-151, -151, 302, -76)}
            fill="#111712"
            stroke="#39483b"
          />
          {[-151, -101, -51, -1, 49, 99, 149].map((n) => (
            <path
              key={n}
              d={
                path(
                  [
                    [n, -151],
                    [n, 151],
                  ],
                  -76,
                ) +
                path(
                  [
                    [-151, n],
                    [151, n],
                  ],
                  -76,
                )
              }
              stroke="#242f26"
            />
          ))}
          <path
            d={path(
              [
                [151, -151],
                [151, 151],
                [-151, 151],
              ],
              -76,
            )}
            stroke="#61715e"
          />
          <path
            d={square(-142, -142, 284, -38)}
            fill="#182019"
            fillOpacity=".84"
            stroke="#536451"
          />
          <path d={square(-132, -132, 264, -38)} stroke="#334333" />
          <path
            d={path(
              [
                [142, -142],
                [142, 142],
                [-142, 142],
              ],
              -38,
            )}
            stroke="#769471"
          />
          <path
            d={square(-148, -148, 296)}
            fill="#151f17"
            fillOpacity=".93"
            stroke="#7f9e76"
          />
          <path d={square(-137, -137, 274)} stroke="#3f5940" />
          {[-120, -90, -60, -30, 0, 30, 60, 90, 120].map((n) => (
            <path
              key={n}
              d={
                path([
                  [n, -148],
                  [n, 148],
                ]) +
                path([
                  [-148, n],
                  [148, n],
                ])
              }
              stroke="#28382a"
            />
          ))}
          {traces.map((trace, index) => {
            const [cx, cy] = point(...trace[0]);
            const [ex, ey] = point(...trace.at(-1));
            return (
              <g key={index}>
                <path
                  className={index % 3 === 0 ? "signal-trace" : undefined}
                  d={path(trace)}
                  stroke={index % 3 === 0 ? "#b9ed98" : "#648560"}
                  strokeWidth={index % 3 === 0 ? "1.6" : "1"}
                />
                <circle cx={cx} cy={cy} r="3" fill="#1a251a" stroke="#8cb081" />
                <circle cx={ex} cy={ey} r="2" fill="#a6d38e" />
              </g>
            );
          })}
          <path d={square(-30, -30, 69)} fill="#142216" stroke="#799773" />
          <path d={square(-30, -30, 69, 18)} fill="#385739" stroke="#9fc292" />
          <path
            d={path(
              [
                [39, -30],
                [39, 39],
                [-30, 39],
              ],
              18,
            )}
            stroke="#c4eeaa"
          />
          <path d={square(-18, -18, 45, 18)} fill="#a5d78d" stroke="#ccf8b6" />
          <path d={square(-10, -10, 29, 18)} fill="#203b25" stroke="#6c9861" />
          {[
            [148, 148],
            [-148, 148],
            [148, -148],
            [-148, -148],
          ].map(([x, y]) => {
            const [px, py] = point(x, y);
            return (
              <g key={x + ":" + y}>
                <path
                  d={path([[x, y]]) + "v67"}
                  stroke="#587256"
                  strokeDasharray="3 5"
                />
                <circle cx={px} cy={py} r="3" fill="#bce4a6" />
              </g>
            );
          })}
          <path d="M141 177h50l43 41M503 365h-49l-30-23" stroke="#6e8d69" />
        </g>
        <g fill="#9da99a" className="svg-label" fontSize="9" letterSpacing="1">
          <text x="141" y="167">
            INPUT / 01
          </text>
          <text x="503" y="380" textAnchor="end">
            STATE / 03
          </text>
        </g>
      </svg>
      <figcaption id="hero-caption">
        <span>FIG 01</span> / SERVICE TOPOLOGY
      </figcaption>
    </figure>
  );
}

export function ProjectSchematic({ slug }) {
  return (
    <div className={"project-art project-art-" + slug} aria-hidden="true">
      <svg
        viewBox="0 0 640 260"
        preserveAspectRatio="xMidYMid meet"
        focusable="false"
      >
        {slug === "ase7en" && (
          <g fill="none" stroke="currentColor">
            <path
              d="M100 130h114l106-69 106 69h114M214 130l106 69 106-69M320 61v138"
              opacity=".65"
            />
            <path
              d="m320 34 148 96-148 96-148-96zM320 49l124 81-124 81-124-81z"
              opacity=".28"
            />
            {[100, 214, 320, 426, 540].map((x) => (
              <circle
                key={x}
                cx={x}
                cy="130"
                r={x === 320 ? "24" : "6"}
                fill="#18241a"
              />
            ))}
            <path d="m320 115 13 15-13 15-13-15z" fill="currentColor" />
            <circle cx="320" cy="61" r="4" fill="currentColor" />
            <circle cx="320" cy="199" r="4" fill="currentColor" />
          </g>
        )}
        {slug === "use-hls-video-player" && (
          <g fill="none" stroke="currentColor">
            {[0, 1, 2, 3, 4, 5, 6].map((n) => (
              <path
                key={n}
                transform={"translate(" + n * 22 + ", " + n * -7 + ")"}
                d="M92 168h47l22-26 36 47 34-91 35 57 21-21h62l23-41 36 74 29-30h75"
                opacity={n === 3 ? "1" : ".22"}
                strokeWidth={n === 3 ? "2" : "1"}
              />
            ))}
            <path
              d="M104 213h432M104 48h432"
              opacity=".25"
              strokeDasharray="4 7"
            />
          </g>
        )}
        {slug === "desktop-runtime" && (
          <g fill="none" stroke="currentColor">
            {[60, 92, 124]
              .map((y, i) => (
                <g key={y} opacity={1 - i * 0.23}>
                  <path
                    d={"m320 " + y + " 146 58-146 58-146-58z"}
                    fill="#27241c"
                  />
                  <path
                    d={"m320 " + (y + 17) + " 106 41-106 41-106-41z"}
                    opacity=".5"
                  />
                </g>
              ))
              .reverse()}
            <path
              d="m320 86 81 32-81 32-81-32z"
              fill="currentColor"
              opacity=".28"
            />
          </g>
        )}
      </svg>
    </div>
  );
}

function CaseStudy({ project }) {
  const sections = [
    ["Problem", project.problem],
    ["Architecture", project.architecture],
    ["Decision", project.decision],
    ["Outcome", project.outcome],
  ];
  return (
    <details className="case-disclosure">
      <summary className="action">
        Case study <span className="visually-hidden"> for {project.name}</span>
        <Plus size={17} aria-hidden="true" />
      </summary>
      <div className="case-layout">
        <div className="case-aside">
          <h4 className="kicker">Technology</h4>
          <ul className="tags" role="list">
            {project.stack.map((technology) => (
              <li key={technology}>{technology}</li>
            ))}
          </ul>
        </div>
        <div>
          {sections.map(([title, body], index) => (
            <section className="text-section" key={title}>
              <span className="kicker section-index" aria-hidden="true">
                0{index + 1}
              </span>
              <div>
                <h4>{title}</h4>
                <p>{body}</p>
              </div>
            </section>
          ))}
          <div className="actions case-actions">
            {project.links.map(({ label, href }, index) => (
              <Action key={href} href={href} primary={index === 0}>
                {label}
              </Action>
            ))}
          </div>
        </div>
      </div>
    </details>
  );
}

export function ProjectList({ projects }) {
  return (
    <div className="project-list">
      {projects.map((project) => (
        <article
          className="project-entry"
          key={project.slug}
          id={"work-" + project.slug}
        >
          <div className="project-row">
            <ProjectSchematic slug={project.slug} />
            <div className="project-copy">
              <p className="kicker">
                <span className="section-index">{project.number}</span> /{" "}
                {project.category}
              </p>
              <h3 className="project-title">{project.name}</h3>
              <p>{project.summary}</p>
              <div className="project-status">
                <span className="status-dot" /> {project.status}
              </div>
              <CaseStudy project={project} />
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
