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
                <div className="p-4 w-full flex flex-col gap-4 justify-center">
                    <h1 className="text-start text-[18px] font-semibold">{label}</h1>
                    <table className="w-full">
                        <thead>
                            <tr className={`${baseTableRowStyle()} ${tableHeaderStyle(theme)} `}>
                                <th className="font-semibold  text-[14px] rounded-tl-md">Description</th>
                                <th className="font-semibold  text-[14px]">Amount</th>
                                <th className="font-semibold  text-[14px]">Date</th>
                                <th className="font-semibold  text-[14px] rounded-tr-md">Allocation</th>
                            </tr>
                        </thead> 
                        <tbody>
                            {data.map((e, index) => {
                                return (
                                    <tr key={`entry-${index}`} className={`${baseTableRowStyle()} ${tableRowStyle(theme)}`}>
                                        <td className="text-black text-[14px]">{e.description}</td>
                                        <td className="text-black text-[14px]">{e.amount}</td>
                                        <td className="text-black text-[14px]">{e.date}</td>
                                        <td className="text-black text-[14px]">{e.allocation}</td>
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
                "bg-[#2EC4B6]",
                "text-black"
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