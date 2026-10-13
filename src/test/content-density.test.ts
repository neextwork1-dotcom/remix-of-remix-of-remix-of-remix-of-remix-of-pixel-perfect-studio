// @vitest-environment node
import { describe, expect, it } from "vitest";
import { htmlToDOM, Element, type DOMNode } from "html-react-parser";
import { collectionGroups, collectionLimit } from "@/lib/content-density";

function element(html: string) {
  // Parser dependencies can carry separate Element constructors in the test runner.
  const normalize = (node: DOMNode): DOMNode => {
    if ('name' in node && 'attribs' in node && 'children' in node) {
      return new Element(node.name, node.attribs, node.children.map(child => normalize(child as DOMNode)));
    }
    return node;
  };
  const first = htmlToDOM(html)[0];
  if (!first) throw new Error("Expected element");
  const node = normalize(first as DOMNode);
  if (!(node instanceof Element)) throw new Error("Expected element");
  return node;
}
describe("Concise collections", () => {
  it("limits repeated imagery without deleting source entries", () => {
    const node = element(`<div class="events">${"<a><img /></a>".repeat(180)}</div>`);
    expect(collectionLimit(node)).toBe(12);
    expect(collectionGroups(node)).toHaveLength(180);
  });
  it("keeps FAQ answers together", () => {
    const node = element(`<div>${'<div class="title">Question</div><p>Answer</p><p>Details</p>'.repeat(8)}</div>`);
    expect(collectionLimit(node)).toBe(6);
    expect(collectionGroups(node)).toHaveLength(8);
    expect(collectionGroups(node)[0]).toHaveLength(3);
  });
  it("shows all twelve awards without an expansion control", () => {
    const node = element(`<div class="awards">${"<div><img /></div>".repeat(12)}</div>`);
    expect(collectionLimit(node)).toBe(12);
    expect(collectionGroups(node)).toHaveLength(12);
  });
  it("keeps timeline years attached to entries", () => {
    const node = element('<ul class="timeline"><div>2026</div><li>Entry</li><li>Entry 2</li></ul>');
    expect(collectionGroups(node)).toHaveLength(2);
    expect(collectionGroups(node)[0]).toHaveLength(2);
  });
  it("does not truncate ordinary text", () => {
    expect(collectionLimit(element("<div><p>Important information</p></div>"))).toBeUndefined();
  });
});