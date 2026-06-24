import { useState } from "react";
import { asset } from "../../assets";
import { Window } from "../Window";
import { MenuBar } from "../MenuBar";
import { HotButton } from "../HotButton";

const MENU = [
    { label: "MyNIM", accel: "M" },
    { label: "People", accel: "P" },
    { label: "Help", accel: "H" },
];

/** A bold, collapsible-looking group header (e.g. "Buddies (0/2)"). */
export function BuddyGroup({ label }: { label: string }) {
    return (
        <div className="buddy-group">
            <span className="arrow">▼</span>
            {label}
        </div>
    );
}

/** A single, selectable buddy row (yellow highlight when selected). */
export function BuddyItem({
    name,
    selected,
    onSelect,
}: {
    name: string;
    selected: boolean;
    onSelect: () => void;
}) {
    return (
        <div
            className={`buddy-item${selected ? " selected" : ""}`}
            role="option"
            aria-selected={selected}
            tabIndex={0}
            onClick={onSelect}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelect();
                }
            }}
        >
            <span>{name}</span>
        </div>
    );
}

interface Group {
    label: string;
    buddies: string[];
}

const GROUPS: Group[] = [
    {
        label: "Buddies (0/2)",
        buddies: ["SmarterChild", "AmyRodeo98", "XxXInxNIMxWexTrustXxX"],
    },
    { label: "Family (0/0)", buddies: [] },
    { label: "Co-workers (0/0)", buddies: [] },
    { label: "Offline (0/0)", buddies: [] },
];

export function BuddyList() {
    const [selected, setSelected] = useState<string | null>("SmarterChild");

    return (
        <Window id="buddy" title="test's Buddy List">
            <MenuBar items={MENU} />
            <div className="window-body">
                <div className="buddy-banner">
                    {/*<div className="logo-square" role="img" aria-label="NIM" />*/}
                </div>

                <div className="buddy-tabs flex">
                    <div className="tab active">Online</div>
                    <div className="tab">List Setup</div>
                </div>

                <div className="buddy-list">
                    {GROUPS.map((group) => (
                        <div key={group.label}>
                            <BuddyGroup label={group.label} />
                            {group.buddies.map((name) => (
                                <BuddyItem
                                    key={name}
                                    name={name}
                                    selected={selected === name}
                                    onSelect={() => setSelected(name)}
                                />
                            ))}
                        </div>
                    ))}
                </div>

                <div className="buddy-bottom flex align-items-end">
                    <HotButton
                        src={asset("bl_im.png")}
                        hoverSrc={asset("bl_im_hover.png")}
                        alt="Send IM"
                    />
                    <HotButton
                        src={asset("bl_chat.png")}
                        hoverSrc={asset("bl_chat_hover.png")}
                        alt="Chat"
                    />
                    <HotButton
                        src={asset("bl_info.png")}
                        hoverSrc={asset("bl_info_hover.png")}
                        alt="Info"
                    />
                </div>
            </div>
        </Window>
    );
}
