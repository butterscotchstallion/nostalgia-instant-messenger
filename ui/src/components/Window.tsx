import { useRef, useState } from "react";
import type { CSSProperties, PointerEvent, ReactNode } from "react";
import { asset } from "../assets";

/** Windows can't be shrunk below this fraction of their natural size, so the
 * content never gets too squished. */
const MIN_SCALE = 0.8;

export type TitleButton = "minimize" | "maximize" | "close";

const ALL_BUTTONS: TitleButton[] = ["minimize", "maximize", "close"];
const label = (b: TitleButton) => b.charAt(0).toUpperCase() + b.slice(1);

// Shared across every window so the most recently focused one sits on top, the
// way clicking a window raises it on the Windows desktop. Starts above the
// static per-window z-indexes in index.css (max is 12).
let topZ = 100;

interface WindowProps {
  /** Title-bar text. */
  title: string;
  /** DOM id (drives the per-window position/size rules in index.css). */
  id?: string;
  /** Show the little running-man icon before the title (default true). */
  icon?: boolean;
  /** Which title-bar buttons to render (default minimize/maximize/close). */
  buttons?: TitleButton[];
  className?: string;
  style?: CSSProperties;
  /** Window body — typically a <MenuBar /> and a `.window-body` element. */
  children: ReactNode;
}

/** A generic Windows-98 window (98.css chrome): title bar + body. Draggable by
 * its title bar, and raised above its siblings when clicked. */
export function Window({
  title,
  id,
  icon = true,
  buttons = ALL_BUTTONS,
  className = "",
  style,
  children,
}: WindowProps) {
  const ref = useRef<HTMLDivElement>(null);
  // null until the window is first moved — until then the CSS rule positions it.
  const [pos, setPos] = useState<{ left: number; top: number } | null>(null);
  const [z, setZ] = useState<number | null>(null);
  // null until the window is first resized — until then CSS/content drive size.
  const [size, setSize] = useState<{ width: number; height: number } | null>(
    null,
  );
  const drag = useRef<{ dx: number; dy: number } | null>(null);
  // Lower bound (80% of natural size). Captured lazily on the first resize,
  // not at mount, so images/fonts have settled and the baseline is accurate.
  const minSize = useRef<{ width: number; height: number } | null>(null);
  const resize = useRef<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

  const bringToFront = () => setZ(++topZ);

  const onResizePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    if (!minSize.current) {
      minSize.current = {
        width: Math.round(el.offsetWidth * MIN_SCALE),
        height: Math.round(el.offsetHeight * MIN_SCALE),
      };
    }
    resize.current = {
      x: e.clientX,
      y: e.clientY,
      width: el.offsetWidth,
      height: el.offsetHeight,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
    e.preventDefault();
    e.stopPropagation();
  };

  const onResizePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const r = resize.current;
    if (!r) return;
    const min = minSize.current ?? { width: 0, height: 0 };
    setSize({
      width: Math.max(min.width, r.width + (e.clientX - r.x)),
      height: Math.max(min.height, r.height + (e.clientY - r.y)),
    });
  };

  const endResize = (e: PointerEvent<HTMLDivElement>) => {
    if (!resize.current) return;
    resize.current = null;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  const onTitlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    // Let the minimize/maximize/close buttons behave normally.
    if ((e.target as HTMLElement).closest(".title-bar-controls")) return;
    const el = ref.current;
    if (!el) return;
    // Offset from the pointer to the window's top-left, in the desktop's
    // coordinate space (offsetLeft/Top are relative to the positioned parent).
    drag.current = {
      dx: e.clientX - el.offsetLeft,
      dy: e.clientY - el.offsetTop,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
    e.preventDefault(); // don't select the title text while dragging
  };

  const onTitlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d) return;
    setPos({ left: e.clientX - d.dx, top: e.clientY - d.dy });
  };

  const endDrag = (e: PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return;
    drag.current = null;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  const mergedStyle: CSSProperties = {
    ...style,
    ...(pos ? { left: pos.left, top: pos.top } : null),
    ...(z != null ? { zIndex: z } : null),
    ...(size ? { width: size.width, height: size.height } : null),
  };

  return (
    <div
      ref={ref}
      className={`window float ${size ? "resized" : ""} ${className}`.trim()}
      id={id}
      style={mergedStyle}
      onPointerDown={bringToFront}
    >
      <div
        className="title-bar"
        onPointerDown={onTitlePointerDown}
        onPointerMove={onTitlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <div className="title-bar-text">
          {icon && <img className="titleman" src={asset("titleman.png")} alt="" />}
          {title}
        </div>
        <div className="title-bar-controls">
          {buttons.map((b) => (
            <button key={b} aria-label={label(b)} />
          ))}
        </div>
      </div>
      {children}
      <div
        className="resize-handle"
        onPointerDown={onResizePointerDown}
        onPointerMove={onResizePointerMove}
        onPointerUp={endResize}
        onPointerCancel={endResize}
      />
    </div>
  );
}
