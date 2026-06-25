import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ToolkitPage from "./page";
import { tools } from "@/lib/toolkit-tools";

let mockOpen: ReturnType<typeof vi.fn>;

beforeEach(() => {
  mockOpen = vi.fn();
  vi.spyOn(window, "open").mockImplementation(mockOpen);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("ToolkitPage", () => {
  it("renders the page title and description", () => {
    render(<ToolkitPage />);
    expect(screen.getByRole("heading", { name: "Developer Toolkit" })).toBeInTheDocument();
    expect(screen.getByText(/Browse the catalog/)).toBeInTheDocument();
  });

  it("renders all tool cards", () => {
    render(<ToolkitPage />);
    tools.forEach((tool) => {
      expect(screen.getByRole("heading", { name: tool.name })).toBeInTheDocument();
      expect(screen.getByText(tool.description)).toBeInTheDocument();
      expect(screen.getByText(tool.category)).toBeInTheDocument();
    });
    const launchButtons = screen.getAllByRole("button", { name: "Launch" });
    expect(launchButtons.length).toBe(tools.length);
  });

  it("launch button triggers window.open with correct URL for each tool", () => {
    render(<ToolkitPage />);
    const buttons = screen.getAllByRole("button", { name: "Launch" });
    expect(buttons.length).toBe(tools.length);
    tools.forEach((tool, index) => {
      fireEvent.click(buttons[index]);
      expect(mockOpen).toHaveBeenCalledWith(tool.url, "_blank");
      mockOpen.mockClear();
    });
  });

  it("category badge is present for each tool", () => {
    render(<ToolkitPage />);
    tools.forEach((tool) => {
      expect(screen.getByText(tool.category)).toBeInTheDocument();
    });
  });
});