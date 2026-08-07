import { useEffect } from "react"
import { CheckCircle2Icon, TriangleAlertIcon, XCircleIcon, XIcon } from "lucide-react"
import { cloneElement } from "react"
import { createPortal } from "react-dom"

type ToastProps = {

    type: "success" | "warning" | "error",
    header: string,
    message?: string,
    onClose: () => void
}

const TOAST_TYPE_ICON_MAPPING = {
    success: <CheckCircle2Icon />,
    warning: <TriangleAlertIcon />,
    error: <XCircleIcon />
}

export default function Toast({ type, header, message, onClose } : ToastProps) {

    // Trigger the auto close timer immediately on mount
    useEffect(() => {

        setTimeout(() => onClose(), 6000)

        return () => {}
    }, [])

    const styledIcon = cloneElement(TOAST_TYPE_ICON_MAPPING[type], determineIconStyle(type))

    const CloseToast = () => {

        return (
            <button 
            onClick={() => onClose()}
            className="cursor-pointer"
            >
                {cloneElement(<XIcon />, {...determineIconStyle(type), className: "ml-6"})}
            </button>
        )
    }

    return createPortal((
        <div className={determineToastStyle(type)}>
            { styledIcon }
            <span>
                <p className="font-bold text-[14px] text-start">{header}</p>
                {message && <p className="text-[12px] text-start leading-3">{message}</p>}
            </span>
            <CloseToast />
        </div>
    ), document.getElementById("toast")!)
}

function determineToastStyle(type: string) {

    const baseStyle = [
        "fixed",
        "z-50",
        "bottom-5",
        "right-5",
        "min-w-48",
        "py-2",
        "px-4",
        "inline-flex",
        "justify-start",
        "gap-3",
        "rounded-md",
        "border"
    ]

    switch (type) {

        case "success": 
            return [
                ...baseStyle,
                "border-[#2EC4B6]",
                "bg-[#CBF3F0]",                
            ].join(" ")

        case "warning":
            return [
                ...baseStyle,
                "border-[#2EC4B6]",
                "bg-[#CBF3F0]",
            ].join(" ")

        case "error":
            return [
                ...baseStyle,
                "border-[#9C0000]",
                "bg-[#FFA9A9]",
            ].join(" ")

        default:
            return ""
    }
}

function determineIconStyle(type: string) {

    const baseStyle = ["h-auto", "m-auto"]
    const iconSize = 24

    switch (type) {

        case "success": 
            return {
                size: iconSize,
                color: "#2EC4B6",
                className: baseStyle.join(" ")
            }

        case "warning":
            return {
                size: iconSize,
                color: "#9C5A00",
                className: baseStyle.join(" ")
            }

        case "error":
            return {
                size: iconSize,
                color: "#9C0000",
                className: baseStyle.join(" ")
            }

        default:
            return {}
    }
}