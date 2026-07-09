import { useState } from "react"
import { EllipsisVerticalIcon } from "lucide-react"
import TrackerEntryActions from "./TrackerEntryActions"
import type { TrackerEntry } from "../../../types/UserTypes"

type TrackerEntryProps = {
    entry: TrackerEntry,
    theme: "positive" | "negative"
}

export default function TrackerTableEntry({ entry, theme } : TrackerEntryProps) {
    
    const [isActionsOpen, setIsActionsOpen] = useState(false)

    return (
        <tr>
            <td>{entry.description}</td>
            <td>{entry.amount}</td>
            <td>{entry.date}</td>
            <td>{entry.allocation}</td>
            <td className="relative">
                <button 
                onClick={() => setIsActionsOpen(prevState => !prevState)}
                className="w-fit"
                name="Open actions"
                >
                    <EllipsisVerticalIcon size={14} />                    
                </button>

                {isActionsOpen && (
                    <TrackerEntryActions entry={entry} />
                )}
            </td>
        </tr>
    )
}