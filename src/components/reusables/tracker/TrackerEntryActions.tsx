import { EyeIcon, PencilIcon, TrashIcon } from "lucide-react";
import Card from "../../composites/Card";

import type { TrackerEntry } from "../../../types/UserTypes";

type TrackerEntryActionsProps = {
    entry: TrackerEntry
}

export default function TrackerEntryActions({ entry } : TrackerEntryActionsProps) {

    return (
        <Card>
            <ul className="min-w-36 h-auto py-2">
                <li className={listItemStyle()}>
                    <button className={listItemButtonStyle()}>
                        <EyeIcon size={14} />
                        <p>View</p>
                    </button>
                </li>

                <li className={listItemStyle()}>
                    <button className={listItemButtonStyle()}>
                        <PencilIcon size={14} />
                        <p>Edit</p>
                    </button>
                </li>

                <li className={listItemStyle()}>
                    <button className={listItemButtonStyle()}>
                        <TrashIcon size={14} />
                        <p>Delete</p>
                    </button>
                </li>
            </ul>
        </Card>
    )
}

function listItemStyle() {

    return [
        "w-full"
    ].join(" ")
}

function listItemButtonStyle() {

    return [
        "w-full",
        "py-1",
        "px-3",
        "inline-flex",
        "justify-center",
        "align-middle",
        "gap-2",
        "text-[14px]"
    ].join(" ")
}