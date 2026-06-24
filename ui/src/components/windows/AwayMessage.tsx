import { Window } from "../Window";
import { FormatBar } from "../FormatBar";

export function AwayMessage() {
  return (
    <Window id="away" title="Edit Away Message" icon={false} buttons={["close"]}>
      <div className="window-body">
        <div className="away-row flex align-items-center">
          <label htmlFor="away-label">Enter label:</label>
          <div className="grow flex-1">
            <select id="away-label" style={{ width: "100%", fontWeight: "bold" }} defaultValue="With the BF">
              <option>With the BF</option>
            </select>
          </div>
        </div>

        <div className="away-label-edit">Enter new Away message:</div>
        <FormatBar image={false} />

        <div className="away-text" contentEditable suppressContentEditableWarning>
          {"*~//uR jUst JEALOS cuz were YUNG"}
          <br />
          {"& in LOVE\\\\~*"}
        </div>

        <div className="away-special">
          <div style={{ fontWeight: "bold" }}>Special Characters:</div>
          <div className="row">
            <code>&nbsp;%n</code> = Screen Name of Buddy
          </div>
          <div className="row">
            <code>&nbsp;%d</code> = Current date
          </div>
          <div className="row">
            <code>&nbsp;%t</code> = Current time
          </div>
          <div className="away-save">
            <input type="checkbox" id="savelater" />
            <label htmlFor="savelater">Save for later use</label>
          </div>
        </div>

        <div className="away-buttons flex justify-content-center">
          <button type="button">I'm Away</button>
          <button type="button">Cancel</button>
        </div>
      </div>
    </Window>
  );
}
