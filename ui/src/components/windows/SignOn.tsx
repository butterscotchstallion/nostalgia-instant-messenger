import { asset } from "../../assets";
import { Window } from "../Window";
import { HotButton } from "../HotButton";

const SAVED_NAMES = ["SmarterChild", "AnotherChild"];

export function SignOn() {
    return (
        <Window id="signon" title="Sign On">
            <div className="window-body">
                <div className="signon-art">
                    <div className="logo-square" role="img" aria-label="NIM" />
                </div>

                <div className="so-row lbl">
                    <img src={asset("lbl_screenname.png")} alt="ScreenName" />
                </div>
                <div className="so-row">
                    <input
                        type="text"
                        className="so-input"
                        list="screennames"
                        spellCheck={false}
                    />
                    <datalist id="screennames">
                        {SAVED_NAMES.map((n) => (
                            <option key={n} value={n} />
                        ))}
                    </datalist>
                </div>
                <button type="button" className="so-link">
                    Get a Screen Name
                </button>

                <div className="so-row">
                    <span className="so-label">Password</span>
                </div>
                <div className="so-row">
                    <input type="password" className="so-input" />
                </div>
                <button type="button" className="so-link">
                    Forgot Password?
                </button>

                <div className="so-checks flex">
                    <input type="checkbox" id="savepw" defaultChecked />
                    <label htmlFor="savepw">Save password</label>
                    <input type="checkbox" id="autolog" />
                    <label htmlFor="autolog">Auto-login</label>
                </div>

                <div className="signon-buttons flex align-items-end justify-content-around">
                    <HotButton
                        src={asset("btn_help.png")}
                        hoverSrc={asset("btn_help_hover.png")}
                        alt="Help"
                        imgClassName="help"
                    />
                    <HotButton
                        src={asset("btn_setup.png")}
                        hoverSrc={asset("btn_setup_hover.png")}
                        alt="Setup"
                        imgClassName="setup"
                    />
                    <HotButton
                        src={asset("btn_signon.png")}
                        hoverSrc={asset("btn_signon_hover.png")}
                        alt="Sign On"
                        imgClassName="signon"
                    />
                </div>
            </div>
        </Window>
    );
}
