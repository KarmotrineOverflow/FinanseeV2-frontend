import { EllipsisVerticalIcon, PackageOpen } from "lucide-react"
import TrackerTableEntry from "./TrackerTableEntry"
import IconMessage from "../../composites/IconMessage"

import type { TrackerEntry } from "../../../types/UserTypes"

type TrackerTableProps = {
    data: TrackerEntry[],
    theme: "positive" | "negative"
}

export default function TrackerTable({ data, theme } : TrackerTableProps) {

    return (
        <div className="w-full min-h-[75vh] h-auto">

            {data.length > 0
                ?   <table className="w-full h-full rounded-t-md">
                        <thead>
                            <tr className={`${(theme === "positive") ? positiveTableHeaderStyle() : negativeTableHeaderStyle()}`}>
                                <th className={`${baseHeaderStyle()} rounded-tl-md`}>Description</th>
                                <th className={`${baseHeaderStyle()}`}>Amount</th>
                                <th className={`${baseHeaderStyle()}`}>Date</th>
                                <th className={`${baseHeaderStyle()}`}>Allocation</th>
                                <th className={`${baseHeaderStyle()} rounded-tr-md`}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            { data.map((d, index) => <TrackerTableEntry key={`${theme}-entry-${index}`} index={index} entry={d} theme={theme} />) }  
                        </tbody>
                    </table>
                :   <div className="min-h-[75vh] flex justify-center">
                        <IconMessage icon={<PackageOpen />} size="x-lg" message="Quite spacious here!" paragraph="Use the Add Entry button above to start logging your money!" />
                    </div>
            }
            
        </div>
    )
}

function baseHeaderStyle() {

    return [        
        "px-2",
        "text-[14px]",
        "font-medium"
    ].join(" ")
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