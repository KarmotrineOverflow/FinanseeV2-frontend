import { useState, useMemo } from 'react'
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
            <label className="mb-1 text-start font-light text-[16px]">{label}</label>
            <span className="bg-(--bg) px-2 rounded-sm shadow-md flex gap-2 justify-items-start align-middle">
                {icon && (
                    icon
                )}
                <input                     
                    {...props} 
                    className="px-2 py-1 lg: w-full text-[16px] bg-(--bg) rounded-md border-0 focus:outline-0"
                />                
            </span>

            {!isValid && (
                <p className='self-start text-left text-red-600 text-[12px] font-light'>{errorMessage}</p>
            )}
        </div>
    )
}