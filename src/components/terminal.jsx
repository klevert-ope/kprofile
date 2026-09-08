"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import {
  complete,
  interpret,
  PROMPT_HOST,
  PROMPT_USER,
} from "@/lib/cli";
import { cn } from "@/lib/utils";

const BOOT_LINES = [
  "klevertopee.app 6.12.94+",
  "init: dubai-node @ 25.2048N 55.2708E",
  "identity: klevert opee",
  "role: sr. systems engineer // fintech, distributed, agentic ops",
  "type 'help' for primitives.",
];

const TOKEN_RE =
  /(https?:\/\/[^\s]+)|(github\.com\/[^\s]+)|(linkedin\.com\/[^\s]+)|([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})/gi;

function hrefFor(token) {
  if (token.includes("@") && !token.includes("://")) {
    return `mailto:${token}`;
  }
  if (token.startsWith("http://") || token.startsWith("https://")) {
    return token;
  }
  return `https://${token}`;
}

function LinkedText({ text }) {
  const nodes = [];
  let last = 0;
  const re = new RegExp(TOKEN_RE.source, TOKEN_RE.flags);
  let match = re.exec(text);
  while (match) {
    if (match.index > last) {
      nodes.push(text.slice(last, match.index));
    }
    const token = match[0];
    nodes.push(
      <a
        key={`${token}-${match.index}`}
        href={hrefFor(token)}
        target={token.includes("@") ? undefined : "_blank"}
        rel={token.includes("@") ? undefined : "noopener noreferrer"}
        className="underline decoration-tty-dim underline-offset-2 hover:text-tty-cyan"
      >
        {token}
      </a>,
    );
    last = match.index + token.length;
    match = re.exec(text);
  }
  if (last < text.length) {
    nodes.push(text.slice(last));
  }
  return nodes;
}

function Prompt() {
  return (
    <span className="shrink-0 select-none">
      <span className="text-tty-cyan">{PROMPT_USER}</span>
      <span className="text-tty-dim">@</span>
      <span className="text-tty-cyan">{PROMPT_HOST}</span>
      <span className="text-tty-dim">:</span>
      <span className="text-tty">~</span>
      <span className="text-tty-dim">$ </span>
    </span>
  );
}

const TONE_CLASS = {
  err: "text-tty-err",
  deny: "text-tty-deny",
  daemon: "text-tty-daemon",
  ok: "text-tty",
  boot: "text-tty-dim",
  echo: "text-tty",
};

function toneClass(tone) {
  return TONE_CLASS[tone] ?? "text-tty";
}

function Clock() {
  const [now, setNow] = useState(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return <span>{now ? `${now.toISOString().slice(11, 19)}Z` : "--------Z"}</span>;
}

const MAX_LINES = 400;

function pushLines(prev, ...next) {
  const merged = [...prev, ...next];
  return merged.length > MAX_LINES ? merged.slice(merged.length - MAX_LINES) : merged;
}

export function Terminal() {
  const inputId = useId();
  const inputRef = useRef(null);
  const bottomRef = useRef(null);
  const [lines, setLines] = useState([]);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState([]);
  const [historyCursor, setHistoryCursor] = useState(-1);
  const [booting, setBooting] = useState(true);

  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    let cancelled = false;
    let index = 0;

    const tick = () => {
      if (cancelled) {
        return;
      }
      if (index >= BOOT_LINES.length) {
        setBooting(false);
        focusInput();
        return;
      }
      const text = BOOT_LINES[index];
      index += 1;
      setLines((prev) => pushLines(prev, { id: `boot-${index}`, tone: "boot", text }));
      window.setTimeout(tick, 70);
    };

    const start = window.setTimeout(tick, 120);
    return () => {
      cancelled = true;
      window.clearTimeout(start);
    };
  }, [focusInput]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "end" });
  }, [lines, value]);

  const run = useCallback((raw) => {
    const result = interpret(raw);

    if (result.type === "noop") {
      setLines((prev) =>
        pushLines(prev, {
          id: crypto.randomUUID(),
          tone: "echo",
          text: "",
          prompt: true,
        }),
      );
      return;
    }

    if (result.type === "clear") {
      setLines([]);
      return;
    }

    setLines((prev) =>
      pushLines(
        prev,
        { id: crypto.randomUUID(), tone: "echo", text: raw, prompt: true },
        { id: crypto.randomUUID(), tone: result.tone, text: result.text },
      ),
    );
  }, []);

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      const next = value;
      if (next.trim()) {
        setHistory((prev) => [next, ...prev.filter((item) => item !== next)]);
      }
      setHistoryCursor(-1);
      setValue("");
      run(next);
    },
    [run, value],
  );

  const onKeyDown = useCallback(
    (event) => {
      if (event.key === "l" && event.ctrlKey) {
        event.preventDefault();
        setLines([]);
        setValue("");
        return;
      }

      if (event.key === "c" && event.ctrlKey) {
        event.preventDefault();
        setValue("");
        setHistoryCursor(-1);
        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        if (!history.length) {
          return;
        }
        const nextCursor = Math.min(historyCursor + 1, history.length - 1);
        setHistoryCursor(nextCursor);
        setValue(history[nextCursor] ?? "");
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        if (historyCursor <= 0) {
          setHistoryCursor(-1);
          setValue("");
          return;
        }
        const nextCursor = historyCursor - 1;
        setHistoryCursor(nextCursor);
        setValue(history[nextCursor] ?? "");
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      event.preventDefault();
      const matches = complete(value);
      if (matches.length === 1) {
        setValue(matches[0]);
        return;
      }
      if (matches.length > 1) {
        setLines((prev) =>
          pushLines(
            prev,
            { id: crypto.randomUUID(), tone: "echo", text: value, prompt: true },
            {
              id: crypto.randomUUID(),
              tone: "boot",
              text: matches.join("    "),
            },
          ),
        );
      }
    },
    [history, historyCursor, value],
  );

  return (
    <div
      className="relative flex h-svh flex-col bg-background text-tty"
      onClick={(event) => {
        if (event.target.closest("a, input, button")) {
          return;
        }
        focusInput();
      }}
    >
      <header className="flex shrink-0 items-center justify-between gap-4 border-b border-tty-line px-3 py-2 text-[11px] uppercase tracking-[0.18em] text-tty-dim sm:px-4">
        <span>klevertopee.app // dubai-node // tty1</span>
        <span className="hidden sm:inline">
          25.2048n 55.2708e // <Clock />
        </span>
      </header>

      <div
        className="min-h-0 flex-1 overflow-y-auto px-3 py-4 font-mono text-base leading-7 sm:px-4 sm:text-sm sm:leading-6"
        role="log"
        aria-live="polite"
        aria-relevant="additions"
      >
        {lines.map((line) => (
          <div
            key={line.id}
            className={cn("whitespace-pre-wrap break-words", toneClass(line.tone))}
          >
            {line.prompt ? (
              <>
                <Prompt />
                {line.text}
              </>
            ) : (
              <LinkedText text={line.text} />
            )}
          </div>
        ))}

        <form onSubmit={onSubmit} className="flex items-center">
          <label htmlFor={inputId} className="sr-only">
            command
          </label>
          <Prompt />
          <input
            id={inputId}
            ref={inputRef}
            data-testid="cli-input"
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            disabled={booting}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={onKeyDown}
            className="min-w-0 flex-1 bg-transparent text-tty outline-none disabled:opacity-50"
          />
        </form>
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
