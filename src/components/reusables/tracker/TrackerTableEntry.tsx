import { useState, useRef } from "react"
import { createPortal } from "react-dom"
import { EllipsisVerticalIcon } from "lucide-react"

import TrackerEntryActions from "./TrackerEntryActions"

import type { TrackerEntry } from "../../../types/UserTypes"
import Card from "../../composites/Card"
import Modal from "../../composites/Modal"

type TrackerEntryProps = {
    entry: TrackerEntry,
    theme: "positive" | "negative"
}

type ViewEntryModalProps = { 
    entry: TrackerEntry, 
    mode: string, 
    onUpdate: (entry: TrackerEntry) => void 
}

function ViewEntryModal({ entry, onEditMode, onUpdate } : ViewEntryModalProps) {

    // TODO: Finish the logic of this modal component
    return createPortal((
        <Card>
            <div>

            </div>
        </Card>
    ), document.getElementById("modal")!)    
}

export default function TrackerTableEntry({ entry, theme } : TrackerEntryProps) {
    
    const [isActionsOpen, setIsActionsOpen] = useState(false)
    const [isViewEntryOpen, setIsViewEntryOpen] = useState(false)    

    const entryAction = useRef("")

    const handleActionClick = (action: string) => {

        switch (action) {
            
            case "view":                
                entryAction.current = "view"
                setIsViewEntryOpen(true)
                break
            case "edit":                
                entryAction.current = "edit"
                setIsViewEntryOpen(true)
                break
            case "delete":
                handleEntryDeletion()
                break
            default:
                console.log("Unknown entry action.")
        }
    }

    const handleEntryDeletion = () => {


    }

    const handleEntryUpdate = (updatedEntry: TrackerEntry) => {


    }

    return (
        <>
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
                        <TrackerEntryActions entry={entry} onClose={() => setIsActionsOpen(false)} onActionChosen={handleActionClick} />
                    )}
                </td>
            </tr>

            {isViewEntryOpen && (                
                <ViewEntryModal entry={entry} mode={isEditMode.current} onUpdate={handleEntryUpdate}/>                
            )}
        </>
    )
}