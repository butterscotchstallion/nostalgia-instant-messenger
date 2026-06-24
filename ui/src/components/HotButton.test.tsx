import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HotButton } from "./HotButton";

describe("HotButton", () => {
  it("fires onClick when clicked", async () => {
    const onClick = vi.fn();
    render(<HotButton src="send.png" alt="Send" onClick={onClick} />);

    await userEvent.click(screen.getByRole("button", { name: "Send" }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("is keyboard-activatable with Enter and Space", () => {
    const onClick = vi.fn();
    render(<HotButton src="send.png" alt="Send" onClick={onClick} />);
    const button = screen.getByRole("button", { name: "Send" });

    fireEvent.keyDown(button, { key: "Enter" });
    fireEvent.keyDown(button, { key: " " });

    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it("ignores other keys", () => {
    const onClick = vi.fn();
    render(<HotButton src="send.png" alt="Send" onClick={onClick} />);

    fireEvent.keyDown(screen.getByRole("button", { name: "Send" }), {
      key: "a",
    });

    expect(onClick).not.toHaveBeenCalled();
  });

  it("is focusable (exposes a tab stop)", () => {
    render(<HotButton src="send.png" alt="Send" onClick={() => {}} />);

    expect(screen.getByRole("button", { name: "Send" })).toHaveAttribute(
      "tabindex",
      "0",
    );
  });
});
