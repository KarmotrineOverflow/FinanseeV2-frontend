import { useState, useRef, useMemo, type ChangeEvent, useEffect } from "react"
import { ChevronLeftIcon, ChevronRightIcon, LucideChevronsLeft, LucideChevronsRight, SearchIcon } from "lucide-react"
import Card from "../../composites/Card"

import type { Debt, MonthlyDue } from "../../../types/UserTypes"
import ListEntry from "./ListEntry"

type ListProps = {
    listItemType: "monthly-due" | "debt"
    items: MonthlyDue[] | Debt[]
}

export default function List({ items, listItemType }: ListProps) {
    
    const entriesPerPage = 4
    
    const [currentPage, setCurrentPage] = useState(1)
    const [displayedEntries, setDisplayedEntries] = useState<MonthlyDue[] | Debt[]>([])    

    const numOfPages = useRef(Math.ceil(items.length / entriesPerPage))

    // Calculate which entries will be displayed based on the given page
    useEffect(() => {
                
        //const remainingItems = items.length - (currentPage * entriesPerPage)
        const sliceStart = (currentPage - 1) * entriesPerPage        
        /* const sliceEnd = ((currentPage * entriesPerPage) > items.length) ? (sliceStart + remainingItems) + sliceStart : (currentPage * entriesPerPage) */
        // slice() is smart enough to not run into segfaults/IndexErrors so let's leave it at this
        const sliceEnd = sliceStart + 4
                        
        const newEntries = items.slice(sliceStart, sliceEnd)
        
        setDisplayedEntries(newEntries) 
    }, [items, currentPage])

    // Reset the page back to 1 when a filter is applied since the amount of items change
    useEffect(() => {

        numOfPages.current = Math.ceil(items.length / entriesPerPage)
        setCurrentPage(1)
    }, [items])    

    const listItems = useMemo(() => {

        if (listItemType === "monthly-due") {

            return (displayedEntries as MonthlyDue[]).map((item, index) => 
                
                <ListEntry type="monthly-due" entryKey={item + index.toString()} entry={item} />
            )

        } else if (listItemType === "debt") {

           return (displayedEntries as Debt[]).map((item, index) => 
                
                <ListEntry type="debt" entry={item} entryKey={item + index.toString()} />
            )
        }
    }, [items, listItemType, displayedEntries])    

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

            <Paginator currentPage={currentPage} numOfPages={numOfPages.current} onJumpToPage={(page) => setCurrentPage(page)}/>
        </Card>        
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
    }, [currentPage, numOfPages])

    return (
        <div className="py-2 inline-flex">
            <button
            disabled={currentPage === 1}
            onClick={() => onJumpToPage(1)}
            className="border-2 border-[#2EC4B6] rounded-l-sm px-1 cursor-pointer"
            >
                <LucideChevronsLeft size={elementSize} color="#2EC4B6" className="h-auto" strokeWidth={3} />
            </button>
            <button
            disabled={currentPage === 1}
            onClick={() => onJumpToPage(currentPage - 1)}
            className="border-y-2 border-[#2EC4B6] px-1 cursor-pointer"
            >
                <ChevronLeftIcon size={elementSize} color="#2EC4B6" strokeWidth={3} />
            </button>
            
            { pageButtons }
            
            <button
            disabled={currentPage === numOfPages}
            onClick={() => onJumpToPage(currentPage + 1)}
            className="border-y-2 border-[#2EC4B6] px-1 cursor-pointer"
            >
                <ChevronRightIcon size={elementSize} color="#2EC4B6" strokeWidth={3} />
            </button>
            <button
            disabled={currentPage === numOfPages}
            onClick={() => onJumpToPage(numOfPages)}
            className="border-2 border-[#2EC4B6] rounded-r-sm px-1 cursor-pointer"
            >
                <LucideChevronsRight size={elementSize} color="#2EC4B6" strokeWidth={3} />
            </button>
        </div>
    )
}