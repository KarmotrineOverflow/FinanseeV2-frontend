export default function PageHeading({ heading, subtext } : { heading: string, subtext?: string }) {

    return (
        <div className="flex flex-col justify-start">
            <h1 className="text-start text-[24px] font-bold">{heading}</h1>
            {subtext && <p className="text-[18px] pt-1">{subtext}</p>}
        </div>
    )
}