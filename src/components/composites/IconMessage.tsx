import { cloneElement } from "react"

type IconMessageProps = {
    icon: React.ReactElement<any>,
    size: "sm" | "md" | "lg" | "x-lg" | "xx-lg"
    message: string,
    paragraph?: string
}

const SIZE = {
    "sm": {
        icon: 48,
        text: 16
    },
    "md": {
        icon: 64,
        text: 18
    },
    "lg": {
        icon: 96,
        text: 18
    },
    "x-lg": {
        icon: 128,
        text: 24
    },
    "xx-lg": {
        icon: 156,
        text: 28
    }
}

export default function IconMessage({ icon, size, message, paragraph } : IconMessageProps) {
    
    // Clone the passed icon so we can defined its size prop in here. It has to happen here since we have predefined sizes
    const styledIcon = cloneElement(
        icon,
        { 
            size: SIZE[size].icon,
            className: "mb-2 mx-auto"
        }
    )

    return (
        <div className="m-auto flex-col justify-center align-middle">
            { styledIcon }
            <p style={{ fontSize: SIZE[size].text }}>{ message }</p>
            { paragraph && (
                <p className="text-[14px]">{ paragraph }</p>
            )}
        </div>
    )
}