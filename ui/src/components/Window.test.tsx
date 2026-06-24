import { render, screen, fireEvent } from "@testing-library/react";
import { Window } from "./Window";

/** jsdom has no layout engine, so fake the rendered size the resize math reads. */
function mockNaturalSize(el: HTMLElement, width: number, height: number) {
  Object.defineProperty(el, "offsetWidth", { configurable: true, value: width });
  Object.defineProperty(el, "offsetHeight", {
    configurable: true,
    value: height,
  });
}

function renderWindow(title = "Sign On") {
  const utils = render(
    <Window title={title}>
      <div className="window-body">body</div>
    </Window>,
  );
  const win = utils.container.querySelector(".window") as HTMLElement;
  const handle = utils.container.querySelector(".resize-handle") as HTMLElement;
  return { ...utils, win, handle };
}

function dragHandle(
  handle: HTMLElement,
  from: { x: number; y: number },
  to: { x: number; y: number },
) {
  fireEvent.pointerDown(handle, {
    clientX: from.x,
    clientY: from.y,
    pointerId: 1,
  });
  fireEvent.pointerMove(handle, { clientX: to.x, clientY: to.y, pointerId: 1 });
  fireEvent.pointerUp(handle, { pointerId: 1 });
}

describe("Window", () => {
  it("renders the title and a resize handle", () => {
    const { handle } = renderWindow("Buddy List");

    expect(screen.getByText("Buddy List")).toBeInTheDocument();
    expect(handle).toBeInTheDocument();
  });

  it("grows when the handle is dragged outward", () => {
    const { win, handle } = renderWindow();
    mockNaturalSize(win, 400, 300);

    dragHandle(handle, { x: 400, y: 300 }, { x: 520, y: 380 });

    expect(win.style.width).toBe("520px"); // 400 + 120
    expect(win.style.height).toBe("380px"); // 300 + 80
    expect(win.className).toContain("resized");
  });

  it("clamps shrinking at 80% of the natural size", () => {
    const { win, handle } = renderWindow();
    mockNaturalSize(win, 400, 300);

    // Drag far past the corner toward the top-left to over-shrink.
    dragHandle(handle, { x: 400, y: 300 }, { x: -600, y: -600 });

    expect(win.style.width).toBe("320px"); // floor: 80% of 400
    expect(win.style.height).toBe("240px"); // floor: 80% of 300
  });

  it("raises a window above its siblings when pointed at", () => {
    render(
      <>
        <Window title="A">
          <div className="window-body">a</div>
        </Window>
        <Window title="B">
          <div className="window-body">b</div>
        </Window>
      </>,
    );
    const winA = screen.getByText("A").closest(".window") as HTMLElement;
    const winB = screen.getByText("B").closest(".window") as HTMLElement;

    fireEvent.pointerDown(winA);
    fireEvent.pointerDown(winB);

    expect(Number(winB.style.zIndex)).toBeGreaterThan(Number(winA.style.zIndex));
  });
});
