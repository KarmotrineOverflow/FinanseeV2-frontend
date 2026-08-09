import { useState, cloneElement, useEffect } from "react"
import { ChevronDown } from "lucide-react"

type DropdownListProps = {
    
    label?: string,
    choices: string[],
    defaultValue?: string,
    readOnly?: boolean
    icon?: React.ReactElement<any>
    onChange: (value: string) => void
}

export default function DropdownList({ label, choices, defaultValue, readOnly, icon, onChange } : DropdownListProps) {

    const [chosenValue, setChosenValue] = useState(defaultValue ?? "")
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    useEffect(() => onChange(chosenValue), [chosenValue])

    return (
        <div className="flex flex-col">
            <label className="mb-1 text-start font-regular text-gray-700 text-[14px]">{label}</label>
            <span className="relative bg-white px-2 py-1 rounded-sm shadow-sm flex gap-2 justify-items-start align-middle">
                {icon && (
                    cloneElement(icon, {
                        size: 18,                        
                        className: "h-auto"
                    })
                )}

                <button 
                disabled={readOnly}
                onClick={() => setIsDropdownOpen(prevState => !prevState)}
                className='w-full flex justify-end cursor-pointer'
                >                   
                    <p className="text-[14px] min-h-5 h-auto px-2">{chosenValue}</p>
                    <ChevronDown size={14} className='h-auto m-auto mr-0' />
                </button>     

                {isDropdownOpen && (
                    <ValuesDropdown 
                    values={choices} 
                    onSelect={(v: string) => {
                        setChosenValue(v)
                        setIsDropdownOpen(false)
                    }} />
                )}
            </span>
        </div>
    )
}

function ValuesDropdown({ values, onSelect } : { values: string[], onSelect: (value: string) => void }) {

    return (
        <ul className='w-full absolute left-0 top-8 max-h-48 overflow-y-auto scroll-m-0 rounded-sm bg-white border border-gray-200 shadow-md'>
            {values.map(v => 
                <li className='w-full hover:bg-gray-200'>
                    <button 
                    onClick={() => onSelect(v)}
                    className='w-full py-0.5 px-2 cursor-pointer'
                    >
                        <p className='text-black text-[14px] text-left'>{v}</p>
                    </button>

                    <hr className='text-gray-100' />
                </li>
            )}
        </ul>
    )
}