export default function QuotationOfTheDay() {

    const sampleQuote = "This is a sample quote."
    const samplePer = "Sample Person"

    return (
        <span className="flex flex-col justify-end">
            <q className="text-[16px] text-end"><cite>{sampleQuote}</cite></q>
            <p className="italic text-[14px] text-end">- {samplePer}</p>
        </span>
    )
}