import type { KeyboardEvent, ReactNode } from "react";

interface HotButtonProps {
  /** Icon image source (label is usually baked into the image). */
  src: string;
  /** Brighter "hot-tracked" icon shown on hover, like NIM's toolbar. */
  hoverSrc?: string;
  alt?: string;
  title?: string;
  /** Extra class on the inner <img> (e.g. "help" / "setup" / "signon"). */
  imgClassName?: string;
  /** Extra class on the wrapper (e.g. "send-wrap"). */
  className?: string;
  onClick?: () => void;
  /** Extra content inside the wrapper, e.g. a <SendMeter />. */
  children?: ReactNode;
}

/**
 * A flat "hot-track" toolbar icon button (NIM's .ButtonIconSmall): the icon
 * swaps to a brighter "raised" graphic on hover. The hover image is overlaid
 * (absolutely positioned) so its slightly different dimensions never reflow the
 * layout — the resting image always defines the button's box.
 * Used by the IM toolbar, the Sign On buttons, and the Buddy List bottom bar.
 */
export function HotButton({
  src,
  hoverSrc,
  alt = "",
  title,
  imgClassName,
  className = "",
  onClick,
  children,
}: HotButtonProps) {
  const imgCls = imgClassName ?? "";
  const handleKeyDown = (e: KeyboardEvent<HTMLSpanElement>) => {
    if (onClick && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onClick();
    }
  };
  return (
    <span
      className={`tbtn ${className}`.trim()}
      title={title}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >
      <span className="tbtn-img">
        <img className={imgCls} src={src} alt={alt} />
        {hoverSrc && (
          <img
            className={`tbtn-hover ${imgCls}`.trim()}
            src={hoverSrc}
            alt=""
            aria-hidden="true"
          />
        )}
      </span>
      {children}
    </span>
  );
}
