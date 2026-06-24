import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BuddyList } from "./BuddyList";

describe("BuddyList", () => {
  it("starts with SmarterChild selected", () => {
    render(<BuddyList />);

    expect(
      screen.getByRole("option", { name: "SmarterChild" }),
    ).toHaveAttribute("aria-selected", "true");
    expect(
      screen.getByRole("option", { name: "AnotherChild" }),
    ).toHaveAttribute("aria-selected", "false");
  });

  it("selects a buddy on click", async () => {
    render(<BuddyList />);
    const another = screen.getByRole("option", { name: "AnotherChild" });

    await userEvent.click(another);

    expect(another).toHaveAttribute("aria-selected", "true");
    expect(
      screen.getByRole("option", { name: "SmarterChild" }),
    ).toHaveAttribute("aria-selected", "false");
  });

  it("selects a buddy with the keyboard", () => {
    render(<BuddyList />);
    const another = screen.getByRole("option", { name: "AnotherChild" });

    fireEvent.keyDown(another, { key: "Enter" });

    expect(another).toHaveAttribute("aria-selected", "true");
  });

  it("exposes each buddy row as a focusable option", () => {
    render(<BuddyList />);

    for (const name of ["SmarterChild", "AnotherChild"]) {
      expect(screen.getByRole("option", { name })).toHaveAttribute(
        "tabindex",
        "0",
      );
    }
  });
});
