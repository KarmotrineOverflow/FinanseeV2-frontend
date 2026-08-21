import { useState, useRef } from "react"
import { 
    CalendarIcon, 
    MinusSquareIcon, 
    PiggyBankIcon, 
    PlusSquareIcon, 
    EyeIcon, 
    PencilIcon, 
    TrashIcon 
} from "lucide-react"
import { useModal } from "../../../hooks/useModal"
import type { TrackerEntry } from "../../../types/UserTypes"

type TrackerAccordionEntryProps = {
    entry: TrackerEntry,
    theme: "positive" | "negative",
    isExpanded: boolean,
    onEntryClick: (entry: TrackerEntry) => void
}

export default function TrackerAccordionEntry({ entry, theme, isExpanded, onEntryClick } : TrackerAccordionEntryProps) {

    const [isViewEntryOpen, setIsViewEntryOpen] = useState(false)  
    const entryAction = useRef<"update" | "view">("view") 

    const { setModalContent } = useModal()

    const handleActionClick = (entry: TrackerEntry, action: "update" | "view") => {

        switch (action) {
            case "view":
                entryAction.current = "view"
                setIsViewEntryOpen(true)
                break
            case "update":
                entryAction.current = "update"
                setIsViewEntryOpen(true)
                break            
            default:
                console.log("Unknown entry action.")
        }
    }

    const handleDeleteEntry = (entry: TrackerEntry) => {

        
    }

    return (
        <li>
           <button onClick={() => onEntryClick(entry)} className={`${entryStyle(theme)}`}>
                <span className="inline-flex gap-2 align-middle">
                    {
                        (isExpanded)
                            ? <MinusSquareIcon size={16} className="h-auto m-auto" />
                            : <PlusSquareIcon size={16} className="h-auto m-auto" />
                    }
                    <p className="text-start font-medium text-[16px]">{entry.name}</p>
                </span>                
                <span className="inline-flex">
                    <p className="text-[14px] px-3 border-r border-gray-500">{entry.date}</p>
                    <p className="text-[14px] px-2">PHP{entry.amount}</p>
                </span>
           </button>

            {/* TODO: Finish the designs of the expanded entry view, then its functionalities */}
            {/* Use the existing TrackerEntryActions for the action button functionalities */}
           {isExpanded && (
            <div className="pt-2">
                <p className="px-4 text-start">{entry.description}</p>

                <span className="px-4 mt-4 w-full inline-flex gap-6">
                    <span className="inline-flex gap-2">
                        <CalendarIcon size={16} color={(theme === "positive") ? "#2EC4B6" : "#A92E23"} className="h-auto m-auto"/>
                        <p>{entry.date}</p>
                    </span>
                    <span className="inline-flex gap-2">
                        <PiggyBankIcon size={16} color={(theme === "positive") ? "#2EC4B6" : "#A92E23"} className="h-auto m-auto"/>
                        <p>{entry.allocation}</p>
                    </span>
                </span>

                <span className="flex mt-4">
                    <button 
                    onClick={() => handleActionClick(entry, "view")}
                    className={`${actionButtonStyle(theme)} border-r`}
                    >
                        <EyeIcon size={18} color="#fff" className="h-auto"/>
                        <p>View</p>
                    </button>
                    <button 
                    onClick={() => handleActionClick(entry, "update")}
                    className={`${actionButtonStyle(theme)} border-r`}
                    >
                        <PencilIcon size={18} color="#fff" className="h-auto"/>
                        <p>Edit</p>
                    </button>
                    <button 
                    onClick={() => {
                        setModalContent({
                            content: (
                                <div>
                                    <p>Are you sure you want to delete this entry?</p>
                                    <span>
                                        <button onClick={() => handleDeleteEntry(entry)}>
                                            <p>Yes</p>
                                        </button>
                                        <button onClick={() => setModalContent(null)}>
                                            <p>No</p>
                                        </button>
                                    </span>
                                </div>
                            )
                        })
                    }}
                    className={actionButtonStyle(theme)}>
                        <TrashIcon size={18} color="#fff" className="h-auto"/>
                        <p>Delete</p>
                    </button>
                </span>
            </div>
           )}
        </li>
    )
}

function entryStyle(theme: "positive" | "negative") {

    const baseStyle = [
        "w-full",
        "p-3",
        "flex",
        "justify-between",
        "align-middle",
        "text-black"
    ]

    if (theme === "positive") {

        return [
            ...baseStyle,
            "bg-[#CBF3F0]"
        ].join(" ")
    } else {

        return [
            ...baseStyle,
            "bg-[#EBA49D]"
        ].join(" ")
    }
}

function actionButtonStyle(theme: "positive" | "negative") {

    const baseStyle = [
        "py-3",
        "inline-flex",
        "justify-center",
        "gap-2",
        "grow",
        "text-white",
        "text-[16px]"
    ]

    if (theme === "positive") {

        return [
            ...baseStyle,
            "bg-[#2EC4B6]"
        ].join(" ")
    } else {

        return [
            ...baseStyle,
            "bg-[#A92E23]"
        ].join(" ")
    }
}