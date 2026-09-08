export const PRIMITIVES = [
  "help",
  "about",
  "stack",
  "logs",
  "contact",
  "hermes",
  "fdse",
  "deployments",
  "field_stack",
  "sudo",
  "clear",
];

export const PROMPT_USER = "klevert";
export const PROMPT_HOST = "dubai";

const DAEMON_COMMANDS = new Set(["hermes", "fdse"]);

export const OUTPUT = {
  help: "available primitives: [about] [stack] [logs] [contact] [hermes] [fdse] [deployments] [field_stack] [sudo] [clear]",
  about:
    "KLEVERT OPEE // Systems Engineer. High-availability trading engines, multi-tenant APIs, and agentic orchestration.",
  stack:
    "runtimes: rust, go, java, python | data: postgres, redis, kafka | agentic: hermes framework",
  logs: "[2025-2026] processed $2B+ USD cumulative settlement volume. 0 unhandled panics.",
  contact:
    "signal: info@klevertopee.app | gh: github.com/klevert-ope | in: linkedin.com/in/klevert-opee",
  hermes:
    "[hermes_daemon]: routing event -> scoring AML risks -> execution latency <12ms -> state: VALIDATED",
  fdse: "[FDSE_INIT]: architecture scoping -> client-side deployment -> custom API integration -> rapid field execution.",
  deployments:
    "01: Integrated real-time monitoring and compliance layers directly into production asset pipelines.\n02: Built custom integration bridges & execution proxies (MT5, microVMs, eBPF).\n03: Implemented high-assurance client isolation models across multi-tenant infrastructures.",
  field_stack:
    "deploy: docker, kubernetes, ebpf, microvms | integration: gRPC, ZeroMQ, OpenAPI, Web3 | languages: rust, python, go, java",
  sudo: "Permission denied: user is not in the sudoers file. This incident will be reported.",
};

export const FIELD_COPY =
  "[fdse]: ingest client architecture -> ship in-prod under compliance/security constraints -> custom integrations (kyt, risk gateways, multi-tenant apis) -> own e2e delivery.";

const FREEFORM_RULES = [
  {
    test: /\b(fdse|forward[-\s]?deployed|field[-\s]?work|field[-\s]?engineer|client[-\s]?experience|client[-\s]?facing|on[-\s]?prem)\b/i,
    text: FIELD_COPY,
    tone: "daemon",
  },
  {
    test: /\b(field[_\s-]?stack|ebpf|microvm|grpc|zeromq|nomad|openapi)\b/i,
    text: OUTPUT.field_stack,
    tone: "ok",
  },
  {
    test: /\b(deployment|deployments|isolation|mt5|proxy bridge|multi[-\s]?tenant)\b/i,
    text: OUTPUT.deployments,
    tone: "ok",
  },
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
  if (/\s/.test(input)) {
    return true;
  }
  return /\b(who|what|where|when|why|how|tell|describe|explain|your|you|about|fdse|deployments|field)\b/i.test(
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
    const tone = DAEMON_COMMANDS.has(lowered) ? "daemon" : "ok";
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
