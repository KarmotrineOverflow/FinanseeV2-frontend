import { EllipsisVerticalIcon } from "lucide-react"
import TrackerTableEntry from "./TrackerTableEntry"
import type { TrackerEntry } from "../../../types/UserTypes"
import Error from "../Error"

type TrackerTableProps = {
    data: TrackerEntry[],
    theme: "positive" | "negative"
}

export default function TrackerTable({ data, theme } : TrackerTableProps) {

    return (
        <div className="w-full flex-col">
            <table className="w-full rounded-t-md">
                <thead>
                    <tr className={`${(theme === "positive") ? positiveTableHeaderStyle() : negativeTableHeaderStyle()}`}>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Allocation</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {(data.length > 0) 
                        ? data.map((d, index) => <TrackerTableEntry key={`${theme}-entry-${index}`} entry={d} theme={theme} />)
                        : <Error message="No entry found." />
                    }                    
                </tbody>
            </table>
        </div>
    )
}

function positiveTableHeaderStyle() {

    return [
        "bg-[#2EC4B6]",
        "text-black",
    ].join(" ")
}

function negativeTableHeaderStyle() {

    return [
        "bg-[#A92E23]",
        "text-white",
    ].join(" ")
}