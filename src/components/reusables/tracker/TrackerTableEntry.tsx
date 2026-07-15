import { useState, useRef } from "react"
import { EllipsisVerticalIcon, PenBoxIcon, XIcon } from "lucide-react"

import TrackerEntryActions from "./TrackerEntryActions"
import Card from "../../composites/Card"
import Modal from "../../composites/Modal"

import type { TrackerEntry } from "../../../types/UserTypes"
import InputField from "../../forms/InputField"
import InputSubmit from "../../forms/InputSubmit"

type TrackerEntryProps = {
    index: number,
    entry: TrackerEntry,
    theme: "positive" | "negative"
}

type TrackerEntryModalProps = { 
    entry?: TrackerEntry, 
    mode: "add" | "update" | "view", 
    onSubmit: (entry: TrackerEntry) => void 
    onClose: () => void
}

function TrackerEntryModal({ entry, mode, onSubmit, onClose } : TrackerEntryModalProps) {

    const [modalMode, setModalMode] = useState(mode)

    // TODO: Finish the logic of this modal component
    // Extract this component to its own file so the main tracker page can use it to for adding new entries

    const handleSubmit = (e: React.SubmitEvent) => {

        e.preventDefault()


    }

    return (
        <Modal onClose={onClose}>
            <div className="p-2">
                {modalMode === "add" && (
                    <h2>Add New Entry</h2>
                )}
                
                {modalMode === "update" && (
                    <h2>Add New Entry</h2>
                )}

                {modalMode === "view" && (
                    <h2>Add New Entry</h2>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="w-full mt-4 grid grid-cols-2">
                        <InputField 
                        label="Amount"
                        isValid
                        type="text" 
                        readOnly={modalMode === "view"}
                        placeholder={(entry ? entry.amount.toString() : "0")}
                        />
                    </div>

                    <span className="w-full mt-4 inline-flex justify-end">
                        {modalMode === "view" && (
                            <button
                            onClick={() => setModalMode("update")} 
                            className="inline-flex gap-1 px-1"
                            >
                                <PenBoxIcon size={14} />
                                <p className="text-[14px]">Edit Entry</p>
                            </button>
                        )}

                        {modalMode === "update" && (
                            <button 
                            onClick={() => setModalMode("view")}
                            className="inline-flex gap-1 px-1"
                            >
                                <XIcon size={14} />
                                <p className="text-[14px]">Cancel</p>
                            </button>
                        )}

                        {(modalMode === "update" || modalMode === "add") && (
                            <input type="submit" />
                        )}

                        <button 
                        onClick={() => onClose()}
                        className="inline-flex gap-1 px-1.5 rounded-sm bg-red-800"
                        >
                            <XIcon size={14} color="#fff" className="h-auto" />
                            <p className="text-[14px] text-white cursor-pointer">Close</p>
                        </button>
                    </span>                    
                </form>
            </div>
        </Modal>
    )
}

export default function TrackerTableEntry({ index, entry, theme } : TrackerEntryProps) {
    
    const [isActionsOpen, setIsActionsOpen] = useState(false)
    const [isViewEntryOpen, setIsViewEntryOpen] = useState(false)    

    const entryAction = useRef<"update" | "view">("view")

    const handleActionClick = (action: string) => {

        switch (action) {
            
            case "view":                
                entryAction.current = "view"
                setIsViewEntryOpen(true)
                setIsActionsOpen(false)
                break
            case "edit":                
                entryAction.current = "update"
                setIsViewEntryOpen(true)
                setIsActionsOpen(false)
                break
            case "delete":
                setIsActionsOpen(false)
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
                <TrackerEntryModal 
                entry={entry} 
                mode={entryAction.current} 
                onSubmit={handleEntryUpdate} 
                onClose={() => setIsViewEntryOpen(prevState => !prevState)}
                />                
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