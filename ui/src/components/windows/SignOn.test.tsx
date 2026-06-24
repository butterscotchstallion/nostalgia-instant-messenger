import { render, screen } from "@testing-library/react";
import { SignOn } from "./SignOn";

describe("SignOn", () => {
  it("renders the screen-name actions as real buttons, not bare anchors", () => {
    render(<SignOn />);

    for (const name of ["Get a Screen Name", "Forgot Password?"]) {
      const link = screen.getByRole("button", { name });
      expect(link.tagName).toBe("BUTTON");
      expect(link).toHaveAttribute("type", "button");
    }
  });
});
