import { useState, useEffect } from 'react'
import { getQuote } from '../../utils/api-utils'
import Loading from '../reusables/Loading'

type Quote = {
    quote: string,
    author: string
}

const QUOTE_TAGS = [
    "finance",
    "inspire",
    "life",
    "life-lessons",
    "life-changing",
    "live-experience",
    "lesson",
    "obtain",
    "prepare",
    "stay-alive"
]

export default function QuotationOfTheDay() {

    const [quote, setQuote] = useState<Quote | null>(null)

    // TODO: Implement an expiration feature to the stored quote that will be valid for only 1 day.
    useEffect(() => {

        const getNewQuote = async () => {
            const generatedTagIndex = Math.floor(Math.random() * QUOTE_TAGS.length)
            const selectedTag = QUOTE_TAGS.at(generatedTagIndex)!

            const res = await getQuote(selectedTag)

            if (res) {

                localStorage.setItem("finansee_quote", JSON.stringify(res))
                setQuote(res)
            }
        }

        let existingQuote = localStorage.getItem("finansee_quote")

        if (existingQuote) setQuote(JSON.parse(existingQuote) as Quote)
        else getNewQuote()
    }, [])

    if (!quote) return <Loading message='Retrieving quote..' />

    return (
        <span className="flex flex-col justify-end">
            <q className="text-[16px] text-end"><cite>{quote.quote}</cite></q>
            <p className="italic text-[14px] text-end">- {quote.author}</p>
        </span>
    )
}