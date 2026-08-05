import Card from "../composites/Card"

import type { InputHTMLAttributes } from "react"

type InputTextAreaProps = {
    label: string
    defaultText?: string
} & InputHTMLAttributes<HTMLTextAreaElement>

export default function InputTextArea({label, defaultText = "", ...props} : InputTextAreaProps) {

    return (
        <>
            <label className="mb-1 text-start font-regular text-gray-700 text-[14px]">{label}</label>
            <Card>
                <textarea {...props} placeholder={defaultText} className="w-full min-h-[35vh] p-2 border-l border-gray-300 px-2 text-[12px] bg-white focus:outline-0"/>
            </Card>
        </>        
    )
}