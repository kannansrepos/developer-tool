import { describe, it, expect } from "vitest";
import { tools } from "./toolkit-tools";

describe("toolkit-tools", () => {
  it("should have at least one tool", () => {
    expect(Array.isArray(tools)).toBe(true);
    expect(tools.length).toBeGreaterThan(0);
  });

  it("each tool has required fields", () => {
    tools.forEach((tool) => {
      expect(tool).toHaveProperty("id");
      expect(tool).toHaveProperty("name");
      expect(tool).toHaveProperty("description");
      expect(tool).toHaveProperty("category");
      expect(tool).toHaveProperty("url");

      expect(typeof tool.id).toBe("string");
      expect(typeof tool.name).toBe("string");
      expect(typeof tool.description).toBe("string");
      expect(typeof tool.category).toBe("string");
      expect(typeof tool.url).toBe("string");

      expect(tool.id).not.toBe("");
      expect(tool.name).not.toBe("");
      expect(tool.description).not.toBe("");
      expect(tool.category).not.toBe("");
      expect(tool.url).not.toBe("");
    });
  });

  it("tool categories are from allowed list", () => {
    const allowedCategories = [
      "Linting",
      "Formatting",
      "Testing",
      "UI Development",
      "Containerization",
    ];
    tools.forEach((tool) => {
      expect(allowedCategories).toContain(tool.category);
    });
  });

  it("tool ids are unique", () => {
    const ids = tools.map((t) => t.id);
    const uniqueIds = new Set(ids);
    expect(ids.length).toBe(uniqueIds.size);
  });

  it("tool URLs are valid URLs", () => {
    tools.forEach((tool) => {
      new URL(tool.url);
    });
  });
});