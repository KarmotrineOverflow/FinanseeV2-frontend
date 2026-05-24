import type { HTMLAttributes } from "react"
import type React from "react"

type InputFieldProps = {

    label: string,
    icon?: React.ReactNode    
    type: string
} & HTMLAttributes<HTMLInputElement>

export default function InputField({ label, icon, type, ...props } : InputFieldProps) {

    return (
        <div className="flex flex-col">
            <label className="text-start text-[16px]">{label}</label>
            <span className="bg-(--bg) px-2 rounded-sm shadow-md flex gap-2 justify-items-start align-middle">
                {icon && (
                    icon
                )}
                <input type={type} className="px-2 py-1 lg: min-w-96 text-[16px] bg-(--bg) rounded-md border-0 focus:outline-0"/>
            </span>
        </div>
    )
}