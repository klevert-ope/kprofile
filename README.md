# Klevert Opee · Engineering portfolio

A single-page Next.js portfolio presented as an XP-inspired desktop. The application registry and window state live in `src/components/desktop.jsx`; project content and contact details live in `src/content/projects.js` and `src/lib/site.js`.

Double-click a desktop shortcut (or tap on touch devices) to open it. On a keyboard, focus a shortcut and press Enter. Use the taskbar to switch between open applications. Focus a window title and use Alt + arrow keys to move it, or Alt + Shift + arrow keys to resize it. Alt + F4 closes the focused window.

## Run locally

Use Node.js 24 LTS and npm.

```sh
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000). For a production preview, run `npm run build` and `npm start`.

To test the development server from a phone on your local network, add your computer's local IP address to an ignored `.env.local` file, then restart the dev server:

```sh
NEXT_DEV_ALLOWED_ORIGINS=192.168.1.10
```

Replace the example with your computer's actual address and open that address on the phone at port 3000. For multiple trusted development hosts, separate the addresses with commas.

## Verify

```sh
npm run format:check
npm run lint
npm run typecheck
npm run build
```

The type check covers site metadata and project content.
