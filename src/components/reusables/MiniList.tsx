import type { Expense, Income } from "../../types/UserTypes";
import RequireAuth from "../wrappers/RequireAuth";

export default function MiniList(
    {         
        theme, 
        data 
    } : {         
        theme: "positive" | "negative", 
        data: Income[] | Expense[] 
    }) {

    // Set the amount of list items to display to 8 for now
    const displayAmount = 8

    return (
        <RequireAuth>            
            <div className="w-full">                
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
                                    <td className="pl-3 text-black text-[12px] text-start">{e.description}</td>
                                    <td className="text-black text-[12px]">PHP {e.amount}</td>
                                    <td className="text-black text-[12px]">{e.date}</td>
                                    <td className="pr-3 text-black text-[12px]">{e.allocation}</td>
                                </tr>
                            )
                        })}
                    </tbody>                       
                </table>
            </div>            
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
                "bg-[#CBF3F0]",
                "text-white"
            ].join(" ")
        case "negative":
            return [
                "bg-[#EBA49D]",
                "text-white"
            ].join(" ")
    }
}