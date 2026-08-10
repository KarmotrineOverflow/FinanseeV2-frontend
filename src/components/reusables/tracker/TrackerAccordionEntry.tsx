import { 
    CalendarIcon, 
    MinusSquareIcon, 
    PiggyBankIcon, 
    PlusSquareIcon, 
    EyeIcon, 
    PencilIcon, 
    TrashIcon 
} from "lucide-react"
import type { TrackerEntry } from "../../../types/UserTypes"

type TrackerAccordionEntryProps = {
    entry: TrackerEntry,
    theme: "positive" | "negative",
    isExpanded: boolean,
    onEntryClick: (entry: TrackerEntry) => void
}

export default function TrackerAccordionEntry({ entry, theme, isExpanded, onEntryClick } : TrackerAccordionEntryProps) {

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

           {isExpanded && (
            <div className="pt-2">
                <p className="px-2 text-start">{entry.description}</p>

                <span className="px-2 mt-4 w-full inline-flex gap-6">
                    <span className="inline-flex gap-2">
                        <CalendarIcon size={16} className="h-auto m-auto"/>
                        <p>{entry.date}</p>
                    </span>
                    <span className="inline-flex gap-2">
                        <PiggyBankIcon size={16} className="h-auto m-auto"/>
                        <p>{entry.allocation}</p>
                    </span>
                </span>

                <span className="flex mt-4">
                    <button className="inline-flex justify-center gap-2 grow">
                        <EyeIcon />
                        <p>View</p>
                    </button>
                    <button className="inline-flex justify-center gap-2 grow">
                        <PencilIcon />
                        <p>Edit</p>
                    </button>
                    <button className="inline-flex justify-center gap-2 grow">
                        <TrashIcon />
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

        ].join(" ")
    }
}