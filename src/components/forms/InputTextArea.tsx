import Card from "../composites/Card"

type InputTextAreaProps = {
    label: string
    defaultText?: string
}

export default function InputTextArea({label, defaultText = ""} : InputTextAreaProps) {

    return (
        <>
            <label>{label}</label>
            <Card>
                <textarea placeholder={defaultText} className="w-full p-2 resize-none text-[14px] focus:outline-0"/>
            </Card>
        </>        
    )
}