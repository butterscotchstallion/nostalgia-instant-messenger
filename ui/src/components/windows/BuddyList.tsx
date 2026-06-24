import { useState } from "react";
import { asset } from "../../assets";
import { Window } from "../Window";
import { MenuBar } from "../MenuBar";
import { HotButton } from "../HotButton";

const MENU = [
    {
        label: "MyNIM",
        accel: "M",
        items: [
            "My Instant Messages",
            "My Saved IMs",
            "My Profile",
            "-",
            "Sign Off",
            "Exit",
        ],
    },
    {
        label: "People",
        accel: "P",
        items: [
            "Send Instant Message...",
            "Get Buddy Info...",
            "-",
            "Add Buddy...",
            "Add Group...",
            "Edit Buddy List",
        ],
    },
    { label: "Help", accel: "H", items: ["Help Topics", "-", "About NIM"] },
];

/** A bold, collapsible group header (e.g. "Buddies (3/3)"). */
export function BuddyGroup({
    label,
    collapsed,
    onToggle,
}: {
    label: string;
    collapsed: boolean;
    onToggle: () => void;
}) {
    return (
        <button
            type="button"
            className="buddy-group"
            aria-expanded={!collapsed}
            onClick={onToggle}
        >
            <span className="arrow">{collapsed ? "▶" : "▼"}</span>
            {label}
        </button>
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
    name: string;
    buddies: string[];
}

const GROUPS: Group[] = [
    {
        name: "Buddies",
        buddies: ["SmarterChild", "AmyRodeo98", "XxXInxNIMxWexTrustXxX"],
    },
    { name: "Family", buddies: ["PixieGal999", "FairyQueen228652"] },
    { name: "Co-workers", buddies: ["RollTheDice9285"] },
    { name: "Offline", buddies: ["DexterMorgan"] },
];

const TABS = [
    { id: "online", label: "Online" },
    { id: "setup", label: "List Setup" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function BuddyList() {
    const [selected, setSelected] = useState<string | null>("SmarterChild");
    const [tab, setTab] = useState<TabId>("online");
    // Groups collapsed by the user; "Offline" starts collapsed.
    const [collapsed, setCollapsed] = useState<Set<string>>(
        () => new Set(["Offline"]),
    );

    const toggleGroup = (name: string) =>
        setCollapsed((prev) => {
            const next = new Set(prev);
            if (next.has(name)) next.delete(name);
            else next.add(name);
            return next;
        });

    return (
        <Window id="buddy" title="test's Buddy List">
            <MenuBar items={MENU} />
            <div className="window-body">
                <div className="buddy-banner">
                    {/*<div className="logo-square" role="img" aria-label="NIM" />*/}
                </div>

                <div className="buddy-tabs flex" role="tablist">
                    {TABS.map((t) => (
                        <button
                            key={t.id}
                            type="button"
                            role="tab"
                            aria-selected={tab === t.id}
                            className={`tab${tab === t.id ? " active" : ""}`}
                            onClick={() => setTab(t.id)}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>

                {tab === "online" ? (
                    <div className="buddy-list" role="listbox">
                        {GROUPS.map((group) => (
                            <div key={group.name}>
                                <BuddyGroup
                                    label={`${group.name} (${group.buddies.length}/${group.buddies.length})`}
                                    collapsed={collapsed.has(group.name)}
                                    onToggle={() => toggleGroup(group.name)}
                                />
                                {!collapsed.has(group.name) &&
                                    group.buddies.map((name) => (
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
                ) : (
                    <div className="buddy-list buddy-setup">
                        <p>
                            Use List Setup to add, remove, and organize buddies.
                        </p>
                    </div>
                )}

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
