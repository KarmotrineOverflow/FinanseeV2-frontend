import React, { useState, useEffect, type ButtonHTMLAttributes } from "react"
import Card from "../../composites/Card"

import type { MonthlyDue } from "../../../types/UserTypes"

type FilterEntry = {
    name: string,
    count: number,
    icon: React.ReactElement<any>
}

type ListFiltersProps = {
    filters: Map<string, FilterEntry>
    onFilterSelect: (selectedFilter: string) => void
}

const MONTHLY_DUE_LIST_FILTERS = [
    "Utilities",
    "Electricity",
    "Internet",
    "Rent"
]
const DEBT_LIST_FILTERS = [
    "Overdue",
    "Creditor",
    "Debtor"
]

export default function ListFilters({ filters, onFilterSelect } : ListFiltersProps) {

    const [selectedFilter, setSelectedFilter] = useState("All")

    useEffect(() => onFilterSelect(selectedFilter), [selectedFilter])

    const filterItems = Array.from(filters.values()).map((item, index) => {

        const styledIcon = React.cloneElement(item.icon, {
            size: 12,
            color: "#FF9F1C",
            className: "h-auto"
        })

        return (
            <li className="w-auto">
                <button 
                onClick={() => setSelectedFilter(item.name)}
                className={`inline-flex justify-center align-bottom gap-2 m-auto w-min px-2 py-1 text-[12px] rounded-lg cursor-pointer
                    ${(selectedFilter === item.name) ? selectedFilterStyle() : unselectedFilterStyle()}`}
                >
                    <span className="h-min my-auto p-1 rounded-sm bg-white">
                        {styledIcon}
                    </span>
                    <span className="h-min my-auto">
                        <p className="h-min m-auto my-auto">{item.name}</p>
                    </span>       
                    <span className="px-1.5 py-1 m-auto leading-none rounded-full bg-white text-[10px] text-black">
                        {item.count}
                    </span>                                 
                </button>
            </li>
        )
    })

    return (
        <Card hasBorders>
            <ul className="min-w-[20vw] max-w-[25vw] p-3 flex gap-4 flex-wrap">
                {filterItems}
            </ul>
        </Card>
    )
}

function unselectedFilterStyle() {

    return [
        "bg-[#F5F5F5]",
        "text-black"
    ].join(" ")
}

function selectedFilterStyle() {

    return [
        "bg-[#FF9F1C]",
        "text-white"
    ].join(" ")
}