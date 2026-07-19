import { useState, useRef, useMemo, cloneElement, type ChangeEvent, useEffect } from "react"
import { ChevronLeftIcon, ChevronRightIcon, CircleQuestionMarkIcon, LucideChevronsLeft, LucideChevronsRight, PencilIcon, SearchIcon, TrashIcon } from "lucide-react"
import Card from "../../composites/Card"
import { MONTHLY_DUE_FILTER_ICON_MAPPING } from "../../../mappings/iconMappings"

import type { Debt, MonthlyDue } from "../../../types/UserTypes"

type ListProps = {
    listItemType: "monthly-due" | "debt"
    items: MonthlyDue[] | Debt[]
}

export default function List({ items, listItemType }: ListProps) {

    // TODO: Create pagination feature (ATM, do 4 entries per page)
    const entriesPerPage = 4

    const [currentPage, setCurrentPage] = useState(1)
    const [displayedEntries, setDisplayedEntries] = useState<MonthlyDue[] | Debt[]>([])    

    const numOfPages = useRef(Math.ceil(items.length / entriesPerPage))

    // Calculate which entries will be displayed based on the given page
    useEffect(() => {
                
        const remainingItems = items.length - (currentPage * entriesPerPage)
        const sliceStart = (currentPage - 1) * entriesPerPage        
        const sliceEnd = ((currentPage * entriesPerPage) > items.length) ? (sliceStart + remainingItems) + sliceStart : (currentPage * entriesPerPage)
                        
        const newEntries = items.slice(sliceStart, sliceEnd)
        
        setDisplayedEntries(newEntries) 
    }, [items, currentPage])

    console.log(displayedEntries)

    const listItems = useMemo(() => {

        if (listItemType === "monthly-due") {

            return (displayedEntries as MonthlyDue[]).map((item, index) => 
                <li className="border-t border-b border-gray-300">
                    <div className="py-4 px-6">

                        {/* --- Entry name and controls --- */}
                        <span className="w-full inline-flex justify-around">
                            <span className="w-full gap-2.5 inline-flex justify-start">
                                <span className="inline-flex p-1 rounded-sm border border-[#2EC4B6]">
                                    { (item.category)
                                        ? cloneElement(MONTHLY_DUE_FILTER_ICON_MAPPING[item.category[0]], {
                                            size: 18,
                                            color: "#2EC4B6",
                                            className: "h-auto"
                                        })
                                        : <CircleQuestionMarkIcon size={18} color="#2EC4B6" className="h-auto"/>
                                    }
                                </span>                            
                                <h3 className="text-[#2EC4B6] font-bold text-[24px] text-start">{item.description}</h3>
                            </span>      

                            <span className="inline-flex gap-2">
                                <button className="cursor-pointer">
                                    {<PencilIcon size={16} />}
                                </button>
                                <button className="cursor-pointer">
                                    {<TrashIcon size={16} />}
                                </button>
                            </span>
                        </span>                                          

                        {/* --- Entry description --- */}
                        <h4 className="mt-2 font-medium text-start text-[16px]">Description</h4>
                        <p className="mt-2 font-regular text-start text-[14px]">{item.description}</p>

                        {/* --- Entry Toggle --- */}
                        <span className="w-full inline-flex gap-2 mt-2 align-middle justify-start">
                            <input type="checkbox" id="is-paid-checkbox" onChange={(e) => handleToggle} className="h-auto scale-110"/>
                            <label htmlFor="is-paid-checkbox" className="text-[14px] font-medium">Is Paid for Current Month</label>
                        </span>

                        {/* Extra Detail Chips */}
                        <div className="grid grid-cols-2 gap-3 mt-6">
                            <span className="inline-flex gap-2">
                                <p className="text-[14px] font-medium">Categories: </p>
                                {(item.category)
                                    ? item.category.map(i => <DetailChip label={i} />)
                                    : <DetailChip label={"Uncategorized"} />
                                }
                            </span>

                            <span className="inline-flex gap-2">
                                <p className="text-[14px] font-medium">Due Date: </p>
                                <DetailChip label={item.date} />
                            </span>

                            <span className="inline-flex gap-2">
                                <p className="text-[14px] font-medium">Amount: </p>
                                <DetailChip label={`PHP ${item.amount}`} />
                            </span>
                        </div>
                    </div>
                </li>
            )

        } else if (listItemType === "debt") {

           return (items as Debt[]).map((item, index) => 
                <li></li>
            )
        }
    }, [items, listItemType, displayedEntries])

    const handleToggle = (e: ChangeEvent<HTMLInputElement>) => {

        if (listItemType === "monthly-due") {

            if (e.target.checked) {

                // Add a new entry to the tracker that subtracts that entry's amount from the user's Savings allocation
            } else {

                // Remove the generated entry from the tracker
            }
        } else if (listItemType === "debt") {


        }
    }

    const handlePageJump = (page: number) => {

        setCurrentPage(page)
    }

    return (
        <Card>
            <div className="w-full flex justify-end p-4">
                <span className="inline-flex p-1 px-2 gap-2 rounded-lg bg-gray-100 shadow-md">
                    <SearchIcon size={14} className="h-auto" />
                    <input className="focus:outline-none text-[12px]" />
                </span>      
            </div>          

            <ul className="mb-2">
                {listItems}
            </ul>            

            <Paginator currentPage={currentPage} numOfPages={numOfPages.current} onJumpToPage={handlePageJump}/>
        </Card>        
    )
}

function DetailChip({ label } : { label: string }) {

    return (
        <span className="bg-[#FFBF69] px-2 rounded-full text-[12px] text-white">
            {label}
        </span>
    )
}

function Paginator({ numOfPages, currentPage, onJumpToPage }
    : { numOfPages: number, currentPage: number, 
        onJumpToPage: (page: number) => void }
) {

    const elementSize = 14
    const pageButtons = useMemo(() => {

        const buttons = []

        for (let i = 1; i <= numOfPages; i++) {

            buttons.push(
                <button
                onClick={() => onJumpToPage(i)}
                className="border-2 border-[#2EC4B6] px-2 font-medium cursor-pointer"                            
                style={{
                    backgroundColor: (currentPage === i) ? "#2EC4B6" : "transparent",
                    color: (currentPage === i) ? "#fff" : "#2EC4B6"
                }}
                >
                    <p style={{ fontSize: elementSize }}>{i}</p>
                </button>
            )
        }

        return buttons
    }, [currentPage])

    return (
        <div className="py-2 inline-flex">
            <button
            onClick={() => onJumpToPage(1)}
            className="border-2 border-[#2EC4B6] rounded-l-sm px-1 cursor-pointer"
            >
                <LucideChevronsLeft size={elementSize} color="#2EC4B6" className="h-auto" strokeWidth={3} />
            </button>
            <button
            onClick={() => onJumpToPage(currentPage - 1)}
            className="border-y-2 border-[#2EC4B6] px-1 cursor-pointer"
            >
                <ChevronLeftIcon size={elementSize} color="#2EC4B6" strokeWidth={3} />
            </button>
            
            { pageButtons }
            
            <button
            onClick={() => onJumpToPage(currentPage + 1)}
            className="border-y-2 border-[#2EC4B6] px-1 cursor-pointer"
            >
                <ChevronRightIcon size={elementSize} color="#2EC4B6" strokeWidth={3} />
            </button>
            <button
            onClick={() => onJumpToPage(numOfPages)}
            className="border-2 border-[#2EC4B6] rounded-r-sm px-1 cursor-pointer"
            >
                <LucideChevronsRight size={elementSize} color="#2EC4B6" strokeWidth={3} />
            </button>
        </div>
    )
}