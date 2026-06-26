import type { Expense, Income } from "../../types/UserTypes";
import RequireAuth from "../wrappers/RequireAuth";
import Card from "../composites/Card";

export default function MiniList(
    { 
        label, 
        theme, 
        data 
    } : { 
        label: string, 
        theme: "positive" | "negative", 
        data: Income[] | Expense[] 
    }) {

    // Set the amount of list items to display to 8 for now
    const displayAmount = 8

    return (
        <RequireAuth>
            <Card>
                <div className="p-8 w-full flex flex-col gap-4 justify-center">
                    <h1 className="text-start text-[24px] font-semibold">{label}</h1>
                    <table className="w-full">
                        <thead>
                            <tr className={`${baseTableRowStyle()} ${tableHeaderStyle(theme)} `}>
                                <th className="font-semibold text-black text-[16px] rounded-tl-md">Description</th>
                                <th className="font-semibold text-black text-[16px]">Amount</th>
                                <th className="font-semibold text-black text-[16px]">Date</th>
                                <th className="font-semibold text-black text-[16px] rounded-tr-md">Allocation</th>
                            </tr>
                        </thead> 
                        <tbody>
                            {data.map((e, index) => {
                                return (
                                    <tr key={`entry-${index}`} className={`${baseTableRowStyle()} ${tableRowStyle(theme)}`}>
                                        <td className="text-black text-[16px]">{e.description}</td>
                                        <td className="text-black text-[16px]">{e.amount}</td>
                                        <td className="text-black text-[16px]">{e.date}</td>
                                        <td className="text-black text-[16px]">{e.allocation}</td>
                                    </tr>
                                )
                            })}
                        </tbody>                       
                    </table>
                </div>
            </Card>
        </RequireAuth>
    )
}

function baseTableRowStyle() {

    return [
        "px-2",
        "py-1"
    ].join(" ")
}

function tableHeaderStyle(theme: string) {
    
    switch (theme) {
        case "positive":
            return [
                "bg-[#2EC4B6]"
            ].join(" ")
        case "negative":
            return [
                "bg-[#A92E23]",
                "text-white"
            ].join(" ")
    }
}

function tableRowStyle(theme: string) {

    switch (theme) {
        case "positive":
             return [
                "bg-[#A92E23]",
                "text-white"
            ].join(" ")
        case "negative":
            return [
                "bg-[#EBA49D]",
                "text-white"
            ].join(" ")
    }
}