import type { HTMLAttributes } from "react"

type InputSubmitProps = {

    label: string,    
} & HTMLAttributes<HTMLInputElement>

export default function InputSubmit({ label } : InputSubmitProps) {

    return (
        <input type="submit" value={label} 
            className="mt-8 px-24 py-1 w-fit bg-[#FF9F1C] rounded-md text-[16px] font-semibold text-white cursor-pointer"
        />
    )    
}