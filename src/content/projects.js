/**
 * @typedef {object} Project
 * @property {string} slug
 * @property {string} number
 * @property {string} name
 * @property {string} category
 * @property {string} status
 * @property {string} summary
 * @property {string[]} stack
 * @property {string} problem
 * @property {string} architecture
 * @property {string} decision
 * @property {string} outcome
 * @property {{label: string, href: string}[]} links
 */

/** @type {Project[]} */
export const projects = [
  {
    slug: "ase7en",
    number: "01",
    name: "ASE7EN",
    category: "Financial infrastructure",
    status: "Pre-production",
    summary: "Programmable stablecoin payments with verifiable settlement.",
    stack: ["Go", "Smart contracts", "Base / Solana / TRON"],
    problem: "Integrators need to know when an approved payment has settled.",
    architecture:
      "Hosted checkout sits above on-chain payment accounts on Base, Solana and TRON.",
    decision: "Track approval, execution and verified settlement separately.",
    outcome:
      "Core flows tested locally. Mainnet release and independent audit are pending.",
    links: [{ label: "Project site", href: "https://ase7en.com" }],
  },
  {
    slug: "use-hls-video-player",
    number: "02",
    name: "UseHLSVideoPlayer",
    category: "Media infrastructure",
    status: "Open source",
    summary: "Headless HLS playback for React.",
    stack: ["TypeScript", "React", "hls.js"],
    problem:
      "Native HLS and hls.js expose different playback controls and state.",
    architecture:
      "A TypeScript controller connects the video element to either engine.",
    decision: "React hooks expose playback state while apps own the player UI.",
    outcome:
      "The public API exposes quality, tracks, live state and playback metrics.",
    links: [
      {
        label: "Source",
        href: "https://github.com/klevert-ope/Usehlsvideoplayer",
      },
      { label: "npm", href: "https://www.npmjs.com/package/usehlsvideoplayer" },
    ],
  },
  {
    slug: "desktop-runtime",
    number: "03",
    name: "Desktop Runtime",
    category: "Systems engineering",
    status: "Open-source prototype",
    summary: "A Rust desktop host with an embedded React interface.",
    stack: ["Rust", "tao", "wry", "React"],
    problem:
      "Ship a web interface as a desktop app with a small runtime footprint.",
    architecture:
      "tao manages the window, wry hosts the OS WebView, and Vite builds the bundled UI.",
    decision:
      "Use the platform WebView and keep host capabilities behind typed IPC.",
    outcome: "The public prototype includes the host, UI and packaging setup.",
    links: [
      {
        label: "Source",
        href: "https://github.com/klevert-ope/desktop-runtime",
      },
      {
        label: "Releases",
        href: "https://github.com/klevert-ope/desktop-runtime/releases",
      },
    ],
  },
];
