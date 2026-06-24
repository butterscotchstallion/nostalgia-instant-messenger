// red → yellow → green activity meter shown under the Send button.
const SEGMENTS: Array<"r" | "y" | "g"> = [
  ...(Array(2).fill("r") as "r"[]),
  ...(Array(8).fill("y") as "y"[]),
  ...(Array(6).fill("g") as "g"[]),
];

export function SendMeter() {
  return (
    <div className="send-meter flex">
      {SEGMENTS.map((c, i) => (
        <i key={i} className={`flex-1 ${c}`} />
      ))}
    </div>
  );
}
