import { SignOn } from "./components/windows/SignOn";
import { InstantMessage } from "./components/windows/InstantMessage";
import { BuddyList } from "./components/windows/BuddyList";
import { AwayMessage } from "./components/windows/AwayMessage";
import { Taskbar } from "./components/Taskbar";

export default function App() {
  return (
    <>
      <div className="desktop">
        <SignOn />
        <InstantMessage />
        <BuddyList />
        <AwayMessage />
      </div>
      <Taskbar />
    </>
  );
}
