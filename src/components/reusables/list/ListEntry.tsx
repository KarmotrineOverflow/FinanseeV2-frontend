import { useState, cloneElement, type ChangeEvent } from "react"
import { CircleQuestionMarkIcon, PencilIcon, TrashIcon } from "lucide-react"
import MonthlyDueModal from "./MonthlyDueModal"
import { MONTHLY_DUE_FILTER_ICON_MAPPING } from "../../../mappings/iconMappings"

import type { MonthlyDue, Debt } from "../../../types/UserTypes"

type ListEntryProps = {

    type: "monthly-due" | "debt"
    entry: MonthlyDue | Debt
}

export default function ListEntry({ type, entry } : ListEntryProps) {

    const [isModalVisible, setIsModalVisible] = useState(false)

    const handleToggle = (e: ChangeEvent<HTMLInputElement>) => {

        if (type === "monthly-due") {

            if (e.target.checked) {

                // Add a new entry to the tracker that subtracts that entry's amount from the user's Savings allocation
            } else {

                // Remove the generated entry from the tracker
            }
        } else if (type === "debt") {


        }
    }

    const handleUpdateEntry = (entry: MonthlyDue) => {


    }

    if (type === "monthly-due") {

        return(
            <li className="border-t border-b border-gray-300">
                <div className="py-4 px-6">                        

                    {/* --- Entry name and controls --- */}
                    <span className="w-full inline-flex justify-around">
                        <span className="w-full gap-2.5 inline-flex justify-start">
                            <span className="inline-flex p-1 rounded-sm border border-[#2EC4B6]">
                                { (entry.category)
                                    ? cloneElement(MONTHLY_DUE_FILTER_ICON_MAPPING[entry.category[0]], {
                                        size: 18,
                                        color: "#2EC4B6",
                                        className: "h-auto"
                                    })
                                    : <CircleQuestionMarkIcon size={18} color="#2EC4B6" className="h-auto"/>
                                }
                            </span>                            
                            <h3 className="text-[#2EC4B6] font-bold text-[24px] text-start">{entry.description}</h3>
                        </span>      

                        <span className="inline-flex gap-2">
                            <button 
                            onClick={() => setIsModalVisible(true)}
                            className="cursor-pointer"
                            >
                                {<PencilIcon size={16} />}
                            </button>
                            <button className="cursor-pointer">
                                {<TrashIcon size={16} />}
                            </button>
                        </span>
                    </span>                                          

                    {/* --- Entry description --- */}
                    <h4 className="mt-2 font-medium text-start text-[16px]">Description</h4>
                    <p className="mt-2 font-regular text-start text-[14px]">{entry.description}</p>

                    {/* --- Entry Toggle --- */}
                    <span className="w-full inline-flex gap-2 mt-2 align-middle justify-start">
                        <input type="checkbox" id="is-paid-checkbox" onChange={(e) => handleToggle} className="h-auto scale-110"/>
                        <label htmlFor="is-paid-checkbox" className="text-[14px] font-medium">Is Paid for Current Month</label>
                    </span>

                    {/* Extra Detail Chips */}
                    <div className="grid grid-cols-2 gap-3 mt-6">
                        <span className="inline-flex gap-2">
                            <p className="text-[14px] font-medium">Categories: </p>
                            {(entry.category)
                                ? entry.category.map(i => <DetailChip label={i} />)
                                : <DetailChip label={"Uncategorized"} />
                            }
                        </span>

                        <span className="inline-flex gap-2">
                            <p className="text-[14px] font-medium">Due Date: </p>
                            <DetailChip label={entry.date} />
                        </span>

                        <span className="inline-flex gap-2">
                            <p className="text-[14px] font-medium">Amount: </p>
                            <DetailChip label={`PHP ${entry.amount}`} />
                        </span>
                    </div>
                </div>
                
                {isModalVisible && (
                    <MonthlyDueModal 
                    entry={entry}
                    mode="update" 
                    onSubmit={(entry) => handleUpdateEntry(entry)} 
                    onClose={() => setIsModalVisible(false)} 
                    />
                )}
            </li>
        )
    } else if (type === "debt") {


    } else {


    }
}

function DetailChip({ label } : { label: string }) {

    return (
        <span className="bg-[#FFBF69] px-2 rounded-full text-[12px] text-white">
            {label}
        </span>
    )
}