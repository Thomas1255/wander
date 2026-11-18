import { describe, expect, it } from "vitest";

import { cn } from "@/lib/utils";

describe("cn", () => {
  it("combines class names and includes only enabled conditional styles", () => {
    expect(
      cn("flex", ["items-center"], { "font-bold": true, hidden: false }),
    ).toBe("flex items-center font-bold");
  });

  it("lets a caller override a conflicting Tailwind class", () => {
    expect(cn("px-2 py-3", "px-6")).toBe("py-3 px-6");
  });

  it("returns an empty string when no styles are supplied", () => {
    expect(cn(undefined, null, false)).toBe("");
  });
});
