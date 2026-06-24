import { asset } from "../assets";

function FmtButton({
  icon,
  title,
  className,
}: {
  icon: string;
  title: string;
  className?: string;
}) {
  return (
    <button className={className} title={title} type="button">
      <img src={asset(icon)} alt={title} />
    </button>
  );
}

const Divider = () => <div className="vertical-bar" />;

interface FormatBarProps {
  /** Include the "insert image" button (IM has it, the Away editor doesn't). */
  image?: boolean;
}

/** The rich-text formatting toolbar reused by the IM window and Away editor. */
export function FormatBar({ image = true }: FormatBarProps) {
  return (
    <div className="format-bar flex align-items-center">
      <FmtButton icon="ft_color.png" title="Text color" />
      <FmtButton icon="ft_highlight.png" title="Highlight" />
      <Divider />
      <FmtButton icon="ft_sizedown.png" title="Smaller" />
      <FmtButton icon="ft_font.png" title="Font" />
      <FmtButton icon="ft_sizeup.png" title="Bigger" />
      <Divider />
      <FmtButton icon="ft_bold.png" title="Bold" />
      <FmtButton icon="ft_italic.png" title="Italic" />
      <FmtButton icon="ft_underline.png" title="Underline" />
      <Divider />
      <FmtButton icon="ft_link.png" title="Link" className="link-btn" />
      {image && <FmtButton icon="ft_image.png" title="Image" />}
      <FmtButton icon="ft_smiley.png" title="Emoticon" />
    </div>
  );
}
