import { asset } from "../../assets";
import { Window } from "../Window";
import { MenuBar } from "../MenuBar";
import { FormatBar } from "../FormatBar";
import { HotButton } from "../HotButton";
import { SendMeter } from "../SendMeter";

const MENU = [
  { label: "File", accel: "F" },
  { label: "Edit", accel: "E" },
  { label: "View", accel: "V" },
  { label: "People", accel: "P" },
];

interface InstantMessageProps {
  /** Who the conversation is with (title bar). */
  screenName?: string;
}

export function InstantMessage({
  screenName = "AnotherChild",
}: InstantMessageProps) {
  return (
    <Window id="im" title={screenName}>
      <MenuBar items={MENU} />
      <div className="window-body">
        <div className="im-row flex">
          <div className="im-avatars flex flex-column align-items-center">
            <div className="av">
              <img src={asset("av_robot.svg")} alt="" />
            </div>
          </div>
          <div className="im-content flex-1 flex flex-column">
            <div className="im-transcript">
              <p>
                <span className="sender">SmarterChild</span>: Sphinx of The
                Black Quartz: judge my vow
              </p>
            </div>
            <FormatBar />
            <div
              className="im-compose"
              contentEditable
              suppressContentEditableWarning
            />
          </div>
        </div>

        <div className="im-bottom flex align-items-center">
          <div className="im-bottom-av">
            <img src={asset("av_mandy.svg")} alt="" />
          </div>
          <div className="im-toolbar flex align-items-stretch flex-1">
            <div className="tb-group flex align-items-end">
              <HotButton
                src={asset("tb_warn.png")}
                hoverSrc={asset("tb_warn_hover.png")}
                alt="Warn"
              />
              <HotButton
                src={asset("tb_block.png")}
                hoverSrc={asset("tb_block_hover.png")}
                alt="Block"
              />
            </div>
            <div className="tb-div" />
            <div className="tb-group tb-mid flex align-items-end flex-1 justify-content-around">
              <HotButton
                src={asset("tb_addbuddy.png")}
                hoverSrc={asset("tb_addbuddy_hover.png")}
                alt="Add Buddy"
              />
              <HotButton
                src={asset("tb_getinfo.png")}
                hoverSrc={asset("tb_getinfo_hover.png")}
                alt="Get Info"
              />
            </div>
            <div className="tb-div" />
            <div className="tb-group tb-send flex align-items-end">
              <HotButton
                src={asset("tb_send.png")}
                hoverSrc={asset("tb_send_hover.png")}
                alt="Send"
                className="send-wrap"
              >
                <SendMeter />
              </HotButton>
            </div>
          </div>
        </div>
      </div>
    </Window>
  );
}
