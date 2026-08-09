import type { Debt, MonthlyDue } from "../../types/UserTypes";

export default function ScheduleLadder({ sortedData, numOfElementsDisplayed = 4 } : { sortedData: Debt[] | MonthlyDue[], numOfElementsDisplayed: number }) {

    // For now, ladder is able to display up to 4 elements 
    const mappedData = sortedData.slice(0, 4)
        .map((el, index) => {
                        
            const theme = (() => {

                const isDebtor = (el as any).isDebtor ?? true

                if (isDebtor) return "positive"
                return "negative"
            })()

            return (
                <li 
                className={`${(index == 0) ? firstElementStyle(theme) : baseElementStyle(theme)}`}
                style={{ width: `${getStepWidth(index)}` }}
                >
                    <span>
                        <h3 className="font-semibold">{el.name}</h3>
                        <p className="text-[12px] text-start">Due on: {(new Date(el.dateExpiry)).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}</p>
                    </span>
                    <h3 className="font-semibold text-[16px]">PHP {el.amount}</h3>
                </li>
            )
        })

    return (        
        <div className="w-full">            
            <ul>
                {mappedData}
            </ul>                
        </div>
    )
}

function getStepWidth(index: number) {

    const elWidth = 100 - (index * 10)

    return `${elWidth}%`
}

function baseElementStyle(theme: string) {

    const style = [
        "rounded-md",
        "text-[14px]",
        "text-black",
        "px-3",
        "py-2",
        "my-1",
        "flex",
        "justify-between",
        "align-middle"
    ]

    switch (theme) {
        case "positive":
            style.push("bg-[#CBF3F0]")
            break
        case "negative":
            style.push("bg-[#EBA49D]")
            break
        default:
            break
    }

    return style.join(" ")
}

function firstElementStyle(theme: string) {

    const style = [
        "rounded-md",
        "text-[14px]",
        "text-black",
        "px-3",
        "py-2",
        "my-1",
        "flex",
        "justify-between",
        "align-middle"
    ]

    switch (theme) {
        case "positive":
            style.push("bg-[#2EC4B6]")
            break
        case "negative":
            style.push("text-white")
            style.push("bg-[#A92E23]")
            break
        default:
            break
    }

    return style.join(" ")
}