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
    summary:
      "A non-custodial programmable payments project for stablecoins, built around payment accounts and hosted checkout.",
    stack: ["TypeScript", "Go", "Solidity", "Rust", "React", "PostgreSQL"],
    problem:
      "Applications need a clear way to create payment requests and establish when funds have settled.",
    architecture:
      "Hosted checkout and rail-specific clients connect to payment account and escrow implementations for Base/USDC, Solana/USDC and TRON/USDT. A Go indexer builds PostgreSQL projections from chain data.",
    decision:
      "Keep customer approval and native settlement evidence separate from API state, webhooks and application coordination.",
    outcome:
      "Private repository and pre-production implementation. Deployment, independent audit and release qualification remain pending.",
    links: [],
  },
  {
    slug: "use-hls-video-player",
    number: "02",
    name: "UseHLSVideoPlayer",
    category: "Media infrastructure",
    status: "Open source",
    summary:
      "A headless HLS playback library for React applications and framework-independent TypeScript projects.",
    stack: ["TypeScript", "React", "hls.js", "HTML video"],
    problem:
      "Native HLS and hls.js expose different playback controls and state across browsers.",
    architecture:
      "A TypeScript controller attaches a stream to an HTML video element using native HLS or hls.js. React hooks expose the controller to components.",
    decision:
      "Keep playback logic separate from presentation so applications can use browser controls or build their own player UI.",
    outcome:
      "The library exposes playback state, quality and track selection, live playback controls, errors and metrics.",
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
    summary:
      "A native desktop runtime that packages a React interface inside a Rust application.",
    stack: ["Rust", "tao", "wry", "React", "Vite"],
    problem:
      "Run a web-based interface as a desktop application without bundling a browser engine or Node at runtime.",
    architecture:
      "tao manages windows and events, wry hosts the operating system WebView, and Vite builds React assets embedded in the Rust binary. Typed IPC connects the interface to native commands.",
    decision:
      "Use the platform WebView and keep native capabilities behind explicit commands.",
    outcome:
      "The open-source project includes the host, interface and packaging for Windows, macOS and Linux.",
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
