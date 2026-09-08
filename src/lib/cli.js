export const PRIMITIVES = [
  "help",
  "about",
  "stack",
  "logs",
  "contact",
  "hermes",
  "sudo",
  "clear",
];

export const PROMPT_USER = "klevert";
export const PROMPT_HOST = "dubai";

export const OUTPUT = {
  help: "available primitives: [about] [stack] [logs] [contact] [hermes] [sudo] [clear]",
  about:
    "KLEVERT OPEE // Systems Engineer. High-availability trading engines, multi-tenant APIs, and agentic orchestration.",
  stack:
    "runtimes: rust, go, java, python | data: postgres, redis, kafka | agentic: hermes framework",
  logs: "[2025-2026] processed $2B+ USD cumulative settlement volume. 0 unhandled panics.",
  contact:
    "signal: klevertope@gmail.com | gh: github.com/klevert-ope | in: linkedin.com/in/klevert-opee",
  hermes:
    "[hermes_daemon]: routing event -> scoring AML risks -> execution latency <12ms -> state: VALIDATED",
  sudo: "Permission denied: user is not in the sudoers file. This incident will be reported.",
};

const FREEFORM_RULES = [
  {
    test: /\b(hermes|agentic|orchestrat|aml)\b/i,
    text: OUTPUT.hermes,
    tone: "daemon",
  },
  {
    test: /\b(contact|email|mail|github|linkedin|signal|reach)\b/i,
    text: OUTPUT.contact,
    tone: "ok",
  },
  {
    test: /\b(stack|runtime|rust|\bgo\b|golang|java|python|postgres|redis|kafka|k8s|kubernetes)\b/i,
    text: OUTPUT.stack,
    tone: "ok",
  },
  {
    test: /\b(volume|settlement|2b|panic|logs|fintech|trading|kyt|chainalysis|wallet)\b/i,
    text: OUTPUT.logs,
    tone: "ok",
  },
  {
    test: /\b(where|location|dubai|geo|based|live|node)\b/i,
    text: "node: dubai (25.2048N, 55.2708E). uplink stable.",
    tone: "ok",
  },
  {
    test: /\b(who|name|klevert|role|engineer|bio|about)\b/i,
    text: OUTPUT.about,
    tone: "ok",
  },
];

function unknown(input) {
  return {
    type: "print",
    tone: "err",
    text: `err: unknown instruction '${input}'. type 'help' for options.`,
  };
}

function isFreeform(input) {
  if (input.includes("?")) {
    return true;
  }
  return /\b(who|what|where|when|why|how|tell|describe|explain|your|you|about)\b/i.test(
    input,
  );
}

function matchFreeform(input) {
  for (const rule of FREEFORM_RULES) {
    if (rule.test.test(input)) {
      return { type: "print", tone: rule.tone, text: rule.text };
    }
  }
  return null;
}

export function complete(partial) {
  const prefix = partial.trim().toLowerCase();
  if (!prefix) {
    return PRIMITIVES.slice();
  }
  return PRIMITIVES.filter((name) => name.startsWith(prefix));
}

export function interpret(raw) {
  const input = String(raw ?? "").trim();
  if (!input) {
    return { type: "noop" };
  }

  const lowered = input.toLowerCase();

  if (lowered === "clear") {
    return { type: "clear" };
  }

  if (lowered === "sudo" || lowered.startsWith("sudo ")) {
    return { type: "print", tone: "deny", text: OUTPUT.sudo };
  }

  if (Object.hasOwn(OUTPUT, lowered) && !lowered.includes(" ")) {
    const tone = lowered === "hermes" ? "daemon" : "ok";
    return { type: "print", tone, text: OUTPUT[lowered] };
  }

  if (isFreeform(input)) {
    const hit = matchFreeform(input);
    if (hit) {
      return hit;
    }
  }

  return unknown(input);
}
