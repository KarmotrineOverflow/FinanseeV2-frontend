import Card from "../composites/Card";
import RequireAuth from "../wrappers/RequireAuth";

export default function ScheduleLadder({ label, sortedData, numOfElementsDisplayed = 4 } : { label: string, sortedData: any[], numOfElementsDisplayed: number }) {

    // For now, ladder is able to display up to 4 elements 
    // TODO: Need mock data for past three months
    const mappedData = sortedData.slice(0, 4)
        .map((el, index) => {
                        
            const theme = (Number.parseFloat(el.amount) < 0) ? "negative" : "positive"

            return (
                <li className={`${getStepWidth(index)} ${(index == 0) ? firstElementStyle(theme) : baseElementStyle(theme)}`}>
                    <span>
                        <h3 className="font-semibold">{el.description}</h3>
                        <p className="text-[12px] text-start">Due on: {(new Date(el.date)).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}</p>
                    </span>
                    <h3 className="font-semibold text-[16px]">PHP {el.amount}</h3>
                </li>
            )
        })

    return (
        <Card>
            <div className="p-4 w-full">
                <h2 className="text-[16px] text-start font-semibold">{label}</h2>
                <ul>
                    {mappedData}
                </ul>                
            </div>
        </Card>
    )
}

function getStepWidth(index: number) {

    const elWidth = (index == 0) ? 100 : 100 - (index * 10)
    console.log(`w-[${elWidth}%]`)

    return `w-[${elWidth}%]`
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