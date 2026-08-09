import { useState, useRef, useContext } from "react"
import { EllipsisVerticalIcon } from "lucide-react"
import { toastContext } from "../../../contexts/ToastContext"
import { deleteEntry } from "../../../utils/tracker-utils"
import TrackerEntryActions from "./TrackerEntryActions"
import TrackerEntryModal from "./TrackerEntryModal"

import type { TrackerEntry } from "../../../types/UserTypes"

type TrackerEntryProps = {
    index: number,
    entry: TrackerEntry,
    theme: "positive" | "negative"
}

export default function TrackerTableEntry({ index, entry, theme } : TrackerEntryProps) {
    
    const toast = useContext(toastContext)
    const [isActionsOpen, setIsActionsOpen] = useState(false)
    const [isViewEntryOpen, setIsViewEntryOpen] = useState(false)    

    const { setIsToastOpen, setToastProps } = toast

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

    const handleEntryDeletion = async () => {

        const type = (theme === "positive") ? "income" : "expense"

        const res = await deleteEntry(entry._id, type)
                        
        const isSuccess = res === "success"

        if (isSuccess) {
            
            setToastProps(prevState => {
                return {
                    ...prevState,
                    header: "Success",
                    message: "Entry has been deleted successfully",
                    type: "success"
                }
            })             
        } else {

            setToastProps(prevState => {
                return {
                    ...prevState,
                    header: "An error has occured",
                    message: res,
                    type: "error"
                }
            })   
        }
        
        setIsToastOpen(true)
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
                        <TrackerEntryActions onClose={() => setIsActionsOpen(false)} onActionChosen={handleActionClick} />
                    )}
                </td>
            </tr>

            {isViewEntryOpen && (                
                <TrackerEntryModal 
                entry={entry} 
                type={(theme === "positive") ? "income" : "expense"}
                mode={entryAction.current} 
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