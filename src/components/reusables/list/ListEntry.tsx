import { useState, cloneElement, type ChangeEvent } from "react"
import { CircleQuestionMarkIcon, PencilIcon, TrashIcon } from "lucide-react"
import MonthlyDueModal from "./MonthlyDueModal"
import { MONTHLY_DUE_FILTER_ICON_MAPPING, DEBT_FILTER_ICON_MAPPING } from "../../../mappings/iconMappings"

import type { MonthlyDue, Debt } from "../../../types/UserTypes"
import DebtModal from "./DebtModal"

type ListEntryProps = {

    type: "monthly-due" | "debt"
    entryKey: string
    entry: MonthlyDue | Debt
}

export default function ListEntry({ type, entryKey, entry } : ListEntryProps) {

    const [isModalVisible, setIsModalVisible] = useState(false)

    const handleUpdateEntry = (entry: MonthlyDue | Debt) => {


    }

    const handlePaymentToggle = (e: ChangeEvent<HTMLInputElement>) => {

        e.preventDefault()

        const isToggled = e.target.checked

        if (type === "monthly-due") {

            // Check if an entry exists first before doing anything

            if (isToggled) {

                // If an tracker entry does not exist yet, create one
            } else {
                
                // If a tracker does exist, delete it
            }
        } else if (type === "debt") {

            // Check if an entry exists first before doing anything

            if (isToggled) {

                // If an tracker entry does not exist yet, create one
            } else {
                
                // If a tracker does exist, delete it
            }
        }        
    }

    if (type === "monthly-due") {

        const castedEntry = entry as MonthlyDue

        return(
            <li className="border-t border-b border-gray-300">
                <div className="py-4 px-6">                        

                    {/* --- Entry name and controls --- */}
                    <span className="w-full inline-flex justify-around">
                        <span className="w-full gap-2.5 inline-flex justify-start">
                            <span className="inline-flex p-1 rounded-sm border border-[#2EC4B6]">
                                { (castedEntry.category)
                                    ? cloneElement(MONTHLY_DUE_FILTER_ICON_MAPPING[castedEntry.category[0]], {
                                        size: 18,
                                        color: "#2EC4B6",
                                        className: "h-auto"
                                    })
                                    : <CircleQuestionMarkIcon size={18} color="#2EC4B6" className="h-auto"/>
                                }
                            </span>                            
                            <h3 className="text-[#2EC4B6] font-bold text-[24px] text-start">{castedEntry.name}</h3>
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

                    {/* --- castedEntry description --- */}
                    <h4 className="mt-2 font-medium text-start text-[16px]">Description</h4>
                    <p className="mt-2 font-regular text-start text-[14px]">{castedEntry.description}</p>

                    {/* --- castedEntry Toggle --- */}
                    <span className="w-full inline-flex gap-2 mt-2 align-middle justify-start">
                        <input type="checkbox" id="is-paid-checkbox" onChange={() => handlePaymentToggle} className="h-auto scale-110"/>

                        {/* TODO: Add functionality to this where a tracker entry gets added/deleted based on its toggle state */}
                        {/* Will need to add the backend endpoints first before starting on this. */}
                        <label htmlFor="is-paid-checkbox" className="text-[14px] font-medium">Is Paid for Current Month</label>
                    </span>

                    {/* Extra Detail Chips */}
                    <div className="grid grid-cols-2 gap-3 mt-6">
                        <span className="inline-flex gap-2">
                            <p className="text-[14px] font-medium">Categories: </p>
                            {(castedEntry.category)
                                ? castedEntry.category.map(i => <DetailChip label={i} />)
                                : <DetailChip label={"Uncategorized"} />
                            }
                        </span>

                        <span className="inline-flex gap-2">
                            <p className="text-[14px] font-medium">Due Date: </p>
                            <DetailChip label={castedEntry.date} />
                        </span>

                        <span className="inline-flex gap-2">
                            <p className="text-[14px] font-medium">Amount: </p>
                            <DetailChip label={`PHP ${castedEntry.amount}`} />
                        </span>
                    </div>
                </div>
                
                {isModalVisible && (
                    <MonthlyDueModal 
                    entry={castedEntry}
                    mode="update" 
                    onSubmit={(castedEntry) => handleUpdateEntry(castedEntry)} 
                    onClose={() => setIsModalVisible(false)} 
                    />
                )}
            </li>
        )
    } else if (type === "debt") {

        const castedEntry = entry as Debt

        return(
            <li className="border-t border-b border-gray-300">
                <div className="py-4 px-6">                        

                    {/* --- Entry name and controls --- */}
                    <span className="w-full inline-flex justify-around">
                        <span className="w-full gap-2.5 inline-flex justify-start">
                            <span className="inline-flex p-1 rounded-sm border border-[#2EC4B6]">
                                { (castedEntry.category)
                                    ? cloneElement(DEBT_FILTER_ICON_MAPPING[castedEntry.category[0]], {
                                        size: 18,
                                        color: "#2EC4B6",
                                        className: "h-auto"
                                    })
                                    : <CircleQuestionMarkIcon size={18} color="#2EC4B6" className="h-auto"/>
                                }
                            </span>                            
                            <h3 className="text-[#2EC4B6] font-bold text-[24px] text-start">{castedEntry.name}</h3>
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

                    {/* --- castedEntry description --- */}
                    <h4 className="mt-2 font-medium text-start text-[16px]">Description</h4>
                    <p className="mt-2 font-regular text-start text-[14px]">{castedEntry.description}</p>

                    {/* --- castedEntry Toggle --- */}
                    <span className="w-full inline-flex gap-2 mt-2 align-middle justify-start">
                        <input type="checkbox" id={entryKey} onChange={(e) => handlePaymentToggle} className="h-auto scale-110"/>
                        <label htmlFor={entryKey} className="text-[14px] font-medium">Is Paid</label>
                    </span>

                    {/* Extra Detail Chips */}
                    <div className="grid grid-cols-2 gap-3 mt-6">
                        <span className="inline-flex gap-2 justify-center align-middle">
                            <p className="text-[14px] font-medium">Categories: </p>
                            {(castedEntry.category)
                                ? castedEntry.category.map(i => <DetailChip label={i} />)
                                : <DetailChip label={"Uncategorized"} />
                            }
                        </span>

                        <span className="inline-flex gap-2">
                            <p className="text-[14px] font-medium">Due Date: </p>
                            <DetailChip label={castedEntry.dateExpiry} />
                        </span>

                        <span className="inline-flex gap-2">
                            <p className="text-[14px] font-medium">Amount: </p>
                            <DetailChip label={`PHP ${castedEntry.amount}`} />
                        </span> 

                        <span className="inline-flex gap-2 flex-wrap">
                            <p className="text-[14px] font-medium">Involvements: </p>
                            { castedEntry.to.map(item => <DetailChip label={item} />) }                            
                        </span>
                    </div>
                </div>
                
                {isModalVisible && (
                    <DebtModal 
                    entry={castedEntry}
                    mode="update" 
                    onSubmit={(castedEntry) => handleUpdateEntry(castedEntry)} 
                    onClose={() => setIsModalVisible(false)} 
                    />
                )}
            </li>
        )
    } else {


    }
}

function DetailChip({ label } : { label: string }) {

    return (
        <span className="h-min self-center bg-[#FFBF69] px-2 py-2 rounded-full text-[12px] text-white">
            <p className="leading-0 font-medium">{label}</p>
        </span>
    )
}