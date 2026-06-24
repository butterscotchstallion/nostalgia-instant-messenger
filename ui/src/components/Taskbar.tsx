interface TaskbarProps {
  time?: string;
}

/** The Windows-98 taskbar pinned to the bottom of the screen. */
export function Taskbar({ time = "3:47 PM" }: TaskbarProps) {
  return (
    <div className="taskbar flex align-items-center">
      <div className="start-btn flex align-items-center">
        <span className="flag">
          <i />
          <i />
          <i />
          <i />
        </span>
        Start
      </div>
      <div className="tray flex align-items-center">{time}</div>
    </div>
  );
}
