import { cloneElement } from "react"

type IconMessageProps = {
    icon: React.ReactElement<any>,
    iconSize: "small" | "medium" | "large" | "extra-large",
    message: string,
    paragraph?: string
}

const ICON_SIZE = {
    "small": 14,
    "medium": 24,
    "large": 32,
    "extra-large": 48
}

export default function IconMessage({ icon, iconSize, message, paragraph } : IconMessageProps) {
    
    // Clone the passed icon so we can defined its size prop in here. It has to happen here since we have predefined sizes
    const styledIcon = cloneElement(
        icon,
        { 
            size: ICON_SIZE[iconSize],
            className: "mb-4"
        }
    )

    return (
        <div className="w-full flex-col">
            { styledIcon }
            <p className="text-[16px]">{ message }</p>
            { paragraph && (
                <p className="text-[14px]">{ paragraph }</p>
            )}
        </div>
    )
}