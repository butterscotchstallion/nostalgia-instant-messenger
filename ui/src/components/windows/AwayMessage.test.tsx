import { render, screen } from "@testing-library/react";
import { AwayMessage } from "./AwayMessage";

describe("AwayMessage", () => {
  it("associates the 'Enter label' label with its select control", () => {
    render(<AwayMessage />);

    // getByLabelText only resolves when the label is wired to the control.
    const select = screen.getByLabelText("Enter label:");

    expect(select.tagName).toBe("SELECT");
  });
});
