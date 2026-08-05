import type React from "react"

type InputFieldProps = {

    label: string,
    icon?: React.ReactNode,
    errorMessage?: string,
    isValid: boolean
} & React.InputHTMLAttributes<HTMLInputElement>

export default function InputField({ label, icon, errorMessage, isValid, ...props } : InputFieldProps) {

    return (
        <div className="flex flex-col">
            <label className="mb-1 text-start font-regular text-gray-700 text-[14px]">{label}</label>
            <span className="bg-white px-2 rounded-sm shadow-sm flex gap-2 justify-items-start align-middle">
                {icon && (
                    icon
                )}
                <input                     
                    {...props} 
                    className="border-l border-gray-300 px-2 py-0.5 lg: w-full text-[12px] bg-white focus:outline-0"
                />                
            </span>

            {!isValid && (
                <p className='self-start text-left text-red-600 text-[12px] font-light'>{errorMessage}</p>
            )}
        </div>
    )
}