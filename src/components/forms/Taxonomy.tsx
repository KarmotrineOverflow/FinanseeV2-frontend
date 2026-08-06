import { ChevronDown, X } from 'lucide-react'
import { useState, useEffect, cloneElement } from 'react'

type TaxonomyProps = {

    label: string,
    values: string[]
    icon?: React.ReactElement<any>
    onChange: (selectedOptions: string[]) => void,
    readOnly?: boolean
}

export default function Taxonomy({ label, values, icon, onChange, readOnly } : TaxonomyProps) {

    const [selectedValues, setSelectedValues] = useState<string[]>([])
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    useEffect(() => {

        onChange(selectedValues)
    }, [selectedValues])

    const removeValue = (value: string, e: React.MouseEvent<HTMLButtonElement>) => {

        e.stopPropagation()

        setSelectedValues((prevState) => {

            if (prevState.length === 1) return []

            const valueIndex = prevState.indexOf(value)

            switch (valueIndex) {

                case 0:
                    return prevState.slice(valueIndex + 1)
                case prevState.length - 1:
                    return prevState.slice(0, valueIndex)
                default:
                    return [...prevState.slice(0, valueIndex), ...prevState.slice(valueIndex + 1)]
            }
        })
    }

    const addValue = (value: string) => {
        
        if (!selectedValues.includes(value)) {

            setSelectedValues(prevState => [...prevState, value])
            setIsDropdownOpen(false)
        }
    }

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
                    <span className='inline-flex flex-wrap min-h-5 h-auto px-2 gap-1'>
                        {selectedValues.map(v => <FilterChip label={v} onRemove={removeValue} />)}
                    </span>
                    <ChevronDown size={14} className='h-auto m-auto mr-0' />
                </button>     

                {isDropdownOpen && <ValuesDropdown values={values} onSelect={addValue} />}
            </span>
        </div>
    )
}

function FilterChip({ label, readOnly, onRemove } : { label: string, readOnly?: boolean, onRemove: (removedFilter: string, e: React.MouseEvent<HTMLButtonElement>) => void }) {

    return (
        <span className='inline-flex gap-1 justify-center align-middle rounded-full bg-green-800 text-[12px] text-white leading-0 px-2 py-1'>
            <p className='m-auto pt-1'>{label}</p>
            <button 
            disabled={readOnly}
            onClick={(e) => onRemove(label, e)}
            className='bg-white rounded-full p-0.5 cursor-pointer'
            >
                <X size={8} color='#000' className='h-auto m-auto'/>
            </button>
        </span>
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