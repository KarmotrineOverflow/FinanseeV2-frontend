export default function PageHeading({ heading, subtext } : { heading: string, subtext?: string }) {

    return (
        <div className="flex flex-col justify-start">
            <h1 className="text-start font-bold">{heading}</h1>
            {subtext && <p>{subtext}</p>}
        </div>
    )
}