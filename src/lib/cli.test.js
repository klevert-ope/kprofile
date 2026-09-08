import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { complete, FIELD_COPY, interpret, OUTPUT } from "./cli.js";

describe("interpret", () => {
  it("noops on empty input", () => {
    assert.deepEqual(interpret("  "), { type: "noop" });
    assert.deepEqual(interpret(""), { type: "noop" });
  });

  it("returns exact primitive payloads", () => {
    assert.deepEqual(interpret("help"), {
      type: "print",
      tone: "ok",
      text: OUTPUT.help,
    });
    assert.deepEqual(interpret("about"), {
      type: "print",
      tone: "ok",
      text: OUTPUT.about,
    });
    assert.deepEqual(interpret("stack"), {
      type: "print",
      tone: "ok",
      text: OUTPUT.stack,
    });
    assert.deepEqual(interpret("logs"), {
      type: "print",
      tone: "ok",
      text: OUTPUT.logs,
    });
    assert.deepEqual(interpret("contact"), {
      type: "print",
      tone: "ok",
      text: OUTPUT.contact,
    });
    assert.deepEqual(interpret("hermes"), {
      type: "print",
      tone: "daemon",
      text: OUTPUT.hermes,
    });
    assert.deepEqual(interpret("fdse"), {
      type: "print",
      tone: "daemon",
      text: OUTPUT.fdse,
    });
    assert.deepEqual(interpret("deployments"), {
      type: "print",
      tone: "ok",
      text: OUTPUT.deployments,
    });
    assert.deepEqual(interpret("field_stack"), {
      type: "print",
      tone: "ok",
      text: OUTPUT.field_stack,
    });
  });

  it("clears on clear", () => {
    assert.deepEqual(interpret("CLEAR"), { type: "clear" });
  });

  it("denies sudo and sudo argv", () => {
    assert.deepEqual(interpret("sudo"), {
      type: "print",
      tone: "deny",
      text: OUTPUT.sudo,
    });
    assert.equal(interpret("sudo rm -rf /").tone, "deny");
  });

  it("errors on unknown instructions", () => {
    assert.deepEqual(interpret("ls"), {
      type: "print",
      tone: "err",
      text: "err: unknown instruction 'ls'. type 'help' for options.",
    });
  });

  it("answers free-form bio questions from system facts", () => {
    assert.equal(interpret("who are you?").text, OUTPUT.about);
    assert.equal(interpret("where are you based").text.includes("dubai"), true);
    assert.equal(interpret("what is your stack?").text, OUTPUT.stack);
    assert.equal(interpret("how do I contact you").text, OUTPUT.contact);
    assert.equal(interpret("tell me about hermes").tone, "daemon");
    assert.equal(interpret("client experience").text, FIELD_COPY);
    assert.equal(interpret("what is forward deployed engineering?").text, FIELD_COPY);
    assert.equal(interpret("field work").text, FIELD_COPY);
    assert.equal(interpret("what is your field_stack").text, OUTPUT.field_stack);
    assert.equal(interpret("describe your deployments").text, OUTPUT.deployments);
    assert.equal(interpret("how do I contact you").text.includes("info@klevertopee.app"), true);
  });

  it("does not treat bare tokens as free-form", () => {
    assert.equal(interpret("rust").tone, "err");
  });
});

describe("complete", () => {
  it("prefixes primitives", () => {
    assert.deepEqual(complete("he"), ["help", "hermes"]);
    assert.deepEqual(complete("c"), ["contact", "clear"]);
    assert.deepEqual(complete("f"), ["fdse", "field_stack"]);
    assert.deepEqual(complete("de"), ["deployments"]);
  });
});
