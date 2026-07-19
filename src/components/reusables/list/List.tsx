import { useMemo } from "react"

import type { Debt, MonthlyDue } from "../../../types/UserTypes"
import { PlusIcon } from "lucide-react"

type ListProps = {
    listItemType: "monthly-due" | "debt"
    items: MonthlyDue[] | Debt[]
    filter?: string
}

export default function List({ items, listItemType, filter }: ListProps) {

    const listItems = useMemo(() => {

        if (listItemType === "monthly-due") {

            return (items as MonthlyDue[]).map((item, index) => 
                <li></li>
            )

        } else if (listItemType === "debt") {

           return (items as Debt[]).map((item, index) => 
                <li></li>
            )
        }
    }, [items, listItemType])

    return (
        <div>
            <span>
                <h1>Showing {items.length} results for <b>{(filter) ? filter : "All"}</b></h1>
                <button                 
                className="bg-[#2EC4B6] rounded-md px-1 flex justify-center align-middle gap-1 cursor-pointer"
                >
                    <PlusIcon size={12} color="#000" className="h-auto"/>
                    <p className="text-[14px] text-black">Add Entry</p>
                </button>
            </span>
        </div>
    )
}