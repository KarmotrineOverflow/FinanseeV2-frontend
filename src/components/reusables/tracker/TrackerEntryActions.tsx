import { EyeIcon, PencilIcon, TrashIcon } from "lucide-react";
import Card from "../../composites/Card";

type TrackerEntryActionsProps = {    
    onClose: () => void,
    onActionChosen: (action: string) => void
}

export default function TrackerEntryActions({ onClose, onActionChosen } : TrackerEntryActionsProps) {

    return (
        <div className="w-auto absolute z-40 rounded-md">
            <Card>
                <ul className="h-auto">
                    <li className={`${listItemStyle()}`}>
                        <button 
                        className={`${listItemButtonStyle()} rounded-t-md`}
                        onClick={() => onActionChosen("view")}
                        >
                            <EyeIcon size={14} className="h-auto" />
                            <p>View</p>
                        </button>
                    </li>

                    <hr className="opacity-30" />

                    <li className={listItemStyle()}>
                        <button 
                        className={listItemButtonStyle()}
                        onClick={() => onActionChosen("edit")}
                        >
                            <PencilIcon size={14} className="h-auto" />
                            <p>Edit</p>
                        </button>
                    </li>

                    <hr className="opacity-30" />

                    <li className={listItemStyle()}>
                        <button 
                        className={`${listItemButtonStyle()} rounded-b-md`}
                        onClick={() => onActionChosen("delete")}
                        >
                            <TrashIcon size={14} className="h-auto" />
                            <p>Delete</p>
                        </button>
                    </li>
                </ul>
            </Card>
        </div>
    )
}

function listItemStyle() {

    return [
        "w-full",
    ].join(" ")
}

function listItemButtonStyle() {

    return [
        "w-full",
        "px-3",
        "py-1",
        "inline-flex",
        "justify-start",
        "align-middle",
        "gap-2",
        "text-[14px]",
        "cursor-pointer",
        "hover:bg-gray-200"
    ].join(" ")
}