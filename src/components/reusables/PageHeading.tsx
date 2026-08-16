import { useContext } from "react"
import { windowContext } from "../../contexts/WindowContext"

export default function PageHeading({ heading, subtext } : { heading: string, subtext?: string }) {

    const isMobile = useContext(windowContext)

    return (
        <div className="flex flex-col justify-start">
            <h1 className={(isMobile) ? mobileHeaderStyle() : desktopHeaderStyle()}>{heading}</h1>
            {subtext && <p className={(isMobile) ? mobileMessageStyle() : desktopMessageStyle()}>{subtext}</p>}
        </div>
    )
}

function desktopHeaderStyle() {

    return [
        "text-start", 
        "text-[24px]",
        "font-bold",
        "text-nowrap"
    ].join(" ")
}

function desktopMessageStyle() {

    return [
        "text-[18px]",
        "text-start",
        "pt-1"
    ].join(" ")
}

function mobileHeaderStyle() {

    return [
        "text-start", 
        "text-[24px]",
        "font-bold",
        "text-nowrap"
    ].join(" ")
}

function mobileMessageStyle() {

    return [
        "text-[18px]",
        "text-start",        
        "pt-1"
    ].join(" ")
}