import { useState, useRef } from "react"
import { createPortal } from "react-dom"
import { EllipsisVerticalIcon } from "lucide-react"

import TrackerEntryActions from "./TrackerEntryActions"

import type { TrackerEntry } from "../../../types/UserTypes"
import Card from "../../composites/Card"
import Modal from "../../composites/Modal"

type TrackerEntryProps = {
    index: number,
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

export default function TrackerTableEntry({ index, entry, theme } : TrackerEntryProps) {
    
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
            <tr className={`${baseRowStyle()} ${index % 2 != 0 && coloredRowStyle(theme)}`}>
                <td className={`${baseCellStlye()} text-start`}>{entry.description}</td>
                <td className={`${baseCellStlye()}`}>PHP {entry.amount}</td>
                <td className={`${baseCellStlye()}`}>{entry.date}</td>
                <td className={`${baseCellStlye()}`}>{entry.allocation}</td>
                <td className="relative">
                    <button 
                    onClick={() => setIsActionsOpen(prevState => !prevState)}
                    className="w-fit cursor-pointer"                    
                    >
                        <EllipsisVerticalIcon size={14} />                    
                    </button>

                    {isActionsOpen && (
                        <TrackerEntryActions entry={entry} onClose={() => setIsActionsOpen(false)} onActionChosen={handleActionClick} />
                    )}
                </td>
            </tr>

            {isViewEntryOpen && (                
                <ViewEntryModal entry={entry} mode={entryAction.current} onUpdate={handleEntryUpdate}/>                
            )}
        </>
    )
}

function baseRowStyle() {

    return [  
        "relative",      
        "text-middle",        
        "text-[12px]",
        "font-regular"
    ].join(" ")
}

function coloredRowStyle(theme: "positive" | "negative") {

    if (theme === "positive") return "bg-[#CBF3F0]"
    else if (theme === "negative") return "bg-[#EBA49D] text-white" 
}

function baseCellStlye() {

    return [
        "px-2",
        "py-0.5"
    ].join(" ")
}