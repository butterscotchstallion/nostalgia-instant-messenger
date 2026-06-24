import { useEffect, useRef, useState, type ReactNode } from "react";

export interface MenuItem {
  label: string;
  /** Character to underline as the keyboard accelerator (first occurrence). */
  accel?: string;
  /** Dropdown entries; `"-"` renders a separator. Omit for a plain label. */
  items?: string[];
}

interface MenuBarProps {
  items: MenuItem[];
  /** Optional content pushed to the right (e.g. "Warning Level: 0%"). */
  right?: ReactNode;
}

function renderLabel({ label, accel }: MenuItem): ReactNode {
  if (!accel) return label;
  const i = label.indexOf(accel);
  if (i < 0) return label;
  return (
    <>
      {label.slice(0, i)}
      <u>{label[i]}</u>
      {label.slice(i + 1)}
    </>
  );
}

/** The grey menu strip under a title bar (File / Edit / …). */
export function MenuBar({ items, right }: MenuBarProps) {
  // Index of the currently open dropdown, or null when the bar is idle.
  const [open, setOpen] = useState<number | null>(null);
  const barRef = useRef<HTMLDivElement>(null);

  // While a menu is open, close it on an outside pointer-down or Escape.
  useEffect(() => {
    if (open === null) return;
    const onDown = (e: PointerEvent) => {
      if (barRef.current && !barRef.current.contains(e.target as Node)) {
        setOpen(null);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="menu-bar flex" ref={barRef}>
      {items.map((item, i) => {
        const hasMenu = item.items != null && item.items.length > 0;
        const isOpen = open === i;
        if (!hasMenu) {
          return (
            <span key={i} className="menu-title">
              {renderLabel(item)}
            </span>
          );
        }
        return (
          <div key={i} className="menu-item">
            <button
              type="button"
              className={`menu-title${isOpen ? " open" : ""}`}
              aria-haspopup="menu"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
              // Once a menu is open, sliding across the bar switches menus.
              onPointerEnter={() => open !== null && setOpen(i)}
            >
              {renderLabel(item)}
            </button>
            {isOpen && (
              <div className="menu-dropdown" role="menu">
                {item.items!.map((entry, j) =>
                  entry === "-" ? (
                    <div key={j} className="menu-separator" role="separator" />
                  ) : (
                    <button
                      key={j}
                      type="button"
                      role="menuitem"
                      className="menu-entry"
                      onClick={() => setOpen(null)}
                    >
                      {entry}
                    </button>
                  ),
                )}
              </div>
            )}
          </div>
        );
      })}
      {right != null && (
        <>
          <span className="spacer flex-1" />
          <span>{right}</span>
        </>
      )}
    </div>
  );
}
