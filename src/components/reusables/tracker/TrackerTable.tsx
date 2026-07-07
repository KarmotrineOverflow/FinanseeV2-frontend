import type { TrackerEntry } from "../../../types/UserTypes"
import Error from "../Error"

type TrackerTableProps = {
    data: TrackerEntry[],
    theme: "positive" | "negative"
}

export default function TrackerTable({ data, theme } : TrackerTableProps) {

    const parsedData = data.map((d, index) => {

        return <td></td>
    })

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
                    {(parsedData.length > 0) 
                        ? parsedData
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