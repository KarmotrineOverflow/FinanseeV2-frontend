import Card from "../composites/Card"

import type { InputHTMLAttributes } from "react"

type InputTextAreaProps = {
    label: string
    defaultText?: string
} & InputHTMLAttributes<HTMLTextAreaElement>

export default function InputTextArea({label, defaultText = "", ...props} : InputTextAreaProps) {

    return (
        <>
            <label>{label}</label>
            <Card>
                <textarea {...props} placeholder={defaultText} className="w-full min-h-[35vh] p-2 bg-gray-50 resize-none text-[14px] focus:outline-0"/>
            </Card>
        </>        
    )
}