import { render, screen, fireEvent, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BuddyList } from "./BuddyList";

describe("BuddyList", () => {
  it("starts with SmarterChild selected", () => {
    render(<BuddyList />);

    expect(
      screen.getByRole("option", { name: "SmarterChild" }),
    ).toHaveAttribute("aria-selected", "true");
    expect(
      screen.getByRole("option", { name: "AmyRodeo98" }),
    ).toHaveAttribute("aria-selected", "false");
  });

  it("selects a buddy on click", async () => {
    render(<BuddyList />);
    const another = screen.getByRole("option", { name: "AmyRodeo98" });

    await userEvent.click(another);

    expect(another).toHaveAttribute("aria-selected", "true");
    expect(
      screen.getByRole("option", { name: "SmarterChild" }),
    ).toHaveAttribute("aria-selected", "false");
  });

  it("selects a buddy with the keyboard", () => {
    render(<BuddyList />);
    const another = screen.getByRole("option", { name: "AmyRodeo98" });

    fireEvent.keyDown(another, { key: "Enter" });

    expect(another).toHaveAttribute("aria-selected", "true");
  });

  it("exposes each buddy row as a focusable option", () => {
    render(<BuddyList />);

    for (const name of ["SmarterChild", "AmyRodeo98"]) {
      expect(screen.getByRole("option", { name })).toHaveAttribute(
        "tabindex",
        "0",
      );
    }
  });

  it("shows each group header with a count matching its buddies", async () => {
    render(<BuddyList />);

    // Group headers are the buttons whose label ends in "(n/n)".
    const headers = screen
      .getAllByRole("button")
      .filter((b) => /\(\d+\/\d+\)\s*$/.test(b.textContent ?? ""));
    expect(headers.length).toBeGreaterThan(0);

    // Expand any collapsed group so all its rows render.
    for (const header of headers) {
      if (header.getAttribute("aria-expanded") === "false") {
        await userEvent.click(header);
      }
    }

    for (const header of headers) {
      const total = Number(header.textContent!.match(/\((\d+)\/(\d+)\)/)![2]);
      const rows = within(header.parentElement!).queryAllByRole("option");
      expect(rows).toHaveLength(total);
    }
  });

  describe("collapsible groups", () => {
    it("starts with the Offline group collapsed and others expanded", () => {
      render(<BuddyList />);

      // Offline is collapsed: its member is hidden, arrow points right.
      expect(
        screen.queryByRole("option", { name: "DexterMorgan" }),
      ).not.toBeInTheDocument();
      const offline = screen.getByRole("button", { name: /Offline/ });
      expect(offline).toHaveAttribute("aria-expanded", "false");
      expect(offline).toHaveTextContent("▶");

      // Buddies is expanded: its members show, arrow points down.
      const buddies = screen.getByRole("button", { name: /Buddies/ });
      expect(buddies).toHaveAttribute("aria-expanded", "true");
      expect(buddies).toHaveTextContent("▼");
    });

    it("expands a collapsed group when its header is clicked", async () => {
      render(<BuddyList />);
      const offline = screen.getByRole("button", { name: /Offline/ });

      await userEvent.click(offline);

      expect(offline).toHaveAttribute("aria-expanded", "true");
      expect(offline).toHaveTextContent("▼");
      expect(
        screen.getByRole("option", { name: "DexterMorgan" }),
      ).toBeInTheDocument();
    });

    it("collapses an expanded group when its header is clicked", async () => {
      render(<BuddyList />);
      const buddies = screen.getByRole("button", { name: /Buddies/ });

      await userEvent.click(buddies);

      expect(buddies).toHaveAttribute("aria-expanded", "false");
      expect(buddies).toHaveTextContent("▶");
      expect(
        screen.queryByRole("option", { name: "SmarterChild" }),
      ).not.toBeInTheDocument();
    });
  });

  describe("tabs", () => {
    it("starts on the Online tab", () => {
      render(<BuddyList />);

      expect(screen.getByRole("tab", { name: "Online" })).toHaveAttribute(
        "aria-selected",
        "true",
      );
      expect(
        screen.getByRole("tab", { name: "List Setup" }),
      ).toHaveAttribute("aria-selected", "false");
    });

    it("switches to List Setup when clicked", async () => {
      render(<BuddyList />);

      await userEvent.click(screen.getByRole("tab", { name: "List Setup" }));

      expect(
        screen.getByRole("tab", { name: "List Setup" }),
      ).toHaveAttribute("aria-selected", "true");
      // The buddy groups are no longer shown on the setup tab.
      expect(
        screen.queryByRole("option", { name: "SmarterChild" }),
      ).not.toBeInTheDocument();
    });
  });

  describe("menu bar dropdowns", () => {
    it("opens a dropdown when a menu title is clicked", async () => {
      render(<BuddyList />);
      const myNim = screen.getByRole("button", { name: "MyNIM" });

      expect(myNim).toHaveAttribute("aria-expanded", "false");
      await userEvent.click(myNim);

      expect(myNim).toHaveAttribute("aria-expanded", "true");
      expect(
        screen.getByRole("menuitem", { name: "Sign Off" }),
      ).toBeInTheDocument();
    });

    it("closes the dropdown when an entry is selected", async () => {
      render(<BuddyList />);
      await userEvent.click(screen.getByRole("button", { name: "MyNIM" }));

      await userEvent.click(screen.getByRole("menuitem", { name: "Exit" }));

      expect(
        screen.getByRole("button", { name: "MyNIM" }),
      ).toHaveAttribute("aria-expanded", "false");
    });
  });
});
