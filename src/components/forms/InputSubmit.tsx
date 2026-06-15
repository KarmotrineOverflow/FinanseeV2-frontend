type InputSubmitProps = {
    label: string,    
} & React.InputHTMLAttributes<HTMLInputElement>

export default function InputSubmit({ label, ...props } : InputSubmitProps) {

    return (
        <input type="submit" value={label} {...props}
            className={`mt-8 px-24 py-1 w-fit bg-[#FF9F1C] rounded-md text-[16px] font-semibold text-white cursor-pointer
                ${(props.disabled) ? "opacity-50" : "opacity-100"}`}
        />
    )    
}