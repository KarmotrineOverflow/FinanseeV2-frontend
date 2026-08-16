import { useState, useEffect, useContext } from 'react'
import { windowContext } from '../../contexts/WindowContext'
import { getQuote } from '../../utils/api-utils'
import Loading from '../reusables/Loading'

type Quote = {
    quote: string,
    author: string,
    expirationTimestamp: number
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

    const isMobile = useContext(windowContext)
    const [quote, setQuote] = useState<Quote | null>(null)
    
    useEffect(() => {

        const getNewQuote = async () => {
            const generatedTagIndex = Math.floor(Math.random() * QUOTE_TAGS.length)
            const selectedTag = QUOTE_TAGS.at(generatedTagIndex)!

            const res = await getQuote(selectedTag)

            if (res) {

                // Set to expire after 24 hours by adding a day in milliseconds to current timestamp
                const expirationDate = Date.now() + 86400000
                const newQuote = {...res, expirationTimestamp: expirationDate}

                localStorage.setItem("finansee_quote", JSON.stringify(newQuote))
                setQuote(newQuote)
            }
        }

        let existingQuote = localStorage.getItem("finansee_quote")

        if (existingQuote) {
            const parsedQuoteData = JSON.parse(existingQuote) as Quote
            const expirationTimestamp = parsedQuoteData.expirationTimestamp ?? 0
            
            if (Date.now() > expirationTimestamp) {
                getNewQuote()

            } else setQuote(JSON.parse(existingQuote) as Quote)            

        } else getNewQuote()
    }, [])

    if (!quote) return <Loading message='Retrieving quote..' />

    // --- DESKTOP VIEW ---
    if (!isMobile)
    return (
        <span className="flex h-auto lg:max-w-[50%] flex-col justify-end">
            <q className="text-[16px] text-end wrap text-[#2EC4B6]"><cite>{quote.quote}</cite></q>
            <p className="italic text-[14px] text-end text-[#2EC4B6]">- {quote.author}</p>
        </span>
    )

    // --- MOBILE VIEW --- 
    else
    return (
        <span className="mt-1 flex h-auto lg:max-w-[50%] flex-col justify-start">
            <q className="text-[14px] text-start wrap text-[#2EC4B6]"><cite>{quote.quote}</cite></q>
            <p className="italic text-[12px] text-start text-[#2EC4B6]">- {quote.author}</p>
        </span>
    )
}