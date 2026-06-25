import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ToolkitCard } from "./card";

describe("ToolkitCard", () => {
  it("renders tool name, description, category, and launch button", () => {
    const onLaunch = vi.fn();

    render(
      <ToolkitCard
        name="Test Tool"
        description="A tool for testing"
        category="Testing"
        onLaunch={onLaunch}
      />
    );

    expect(screen.getByRole("heading", { name: "Test Tool" })).toBeInTheDocument();
    expect(screen.getByText("A tool for testing")).toBeInTheDocument();
    expect(screen.getByText("Testing")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Launch" })).toBeInTheDocument();
  });

  it("calls onLaunch when launch button is clicked", () => {
    const onLaunch = vi.fn();

    render(
      <ToolkitCard
        name="Test Tool"
        description="A tool for testing"
        category="Testing"
        onLaunch={onLaunch}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Launch" }));
    expect(onLaunch).toHaveBeenCalledTimes(1);
  });

  it("applies correct CSS classes to the card container", () => {
    const { container } = render(
      <ToolkitCard
        name="Test Tool"
        description="A tool for testing"
        category="Testing"
        onLaunch={() => {}}
      />
    );

    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass("rounded-lg", "border", "bg-card", "p-5");
    expect(card).toHaveClass("flex", "flex-col", "gap-4");
  });

  it("button has data-testid", () => {
    const onLaunch = vi.fn();

    render(
      <ToolkitCard
        name="Test Tool"
        description="A tool for testing"
        category="Testing"
        onLaunch={onLaunch}
      />
    );

    expect(screen.getByTestId("launch-button")).toBeInTheDocument();
  });

  it("card has data-testid", () => {
    const onLaunch = vi.fn();

    render(
      <ToolkitCard
        name="Test Tool"
        description="A tool for testing"
        category="Testing"
        onLaunch={onLaunch}
      />
    );

    expect(screen.getByTestId("toolkit-card")).toBeInTheDocument();
  });
});