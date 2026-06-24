import type { ReactNode } from "react";

export interface MenuItem {
  label: string;
  /** Character to underline as the keyboard accelerator (first occurrence). */
  accel?: string;
}

interface MenuBarProps {
  items: MenuItem[];
  /** Optional content pushed to the right (e.g. "Warning Level: 0%"). */
  right?: ReactNode;
}

function renderItem({ label, accel }: MenuItem): ReactNode {
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
  return (
    <div className="menu-bar flex">
      {items.map((item, i) => (
        <span key={i}>{renderItem(item)}</span>
      ))}
      {right != null && (
        <>
          <span className="spacer flex-1" />
          <span>{right}</span>
        </>
      )}
    </div>
  );
}
