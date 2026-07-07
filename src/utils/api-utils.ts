import type { Report } from "../types/UserTypes"

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export function getAccessToken() {

    const cookie = document.cookie
    
    if (cookie && cookie != "") {

        const token = cookie.split('=')[1]
        return token
    } 
    
    return ""
}

export async function getQuote(tag: string | null) {

    const quoteTag = (tag) ? `tags/${tag}` : ""

    const apiUrl = `https://thequoteshub.com/api/${quoteTag}`

    const res = await fetch(apiUrl, {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET'
    })

    if (res.ok) {

        const resBody = await res.json()

        if (tag) {

            const initialQuoteListVal = resBody["quotes"][0]

            return {
                quote: initialQuoteListVal.text,
                author: initialQuoteListVal.author
            }
        } else {

            return {
                quote: resBody.text,
                author: resBody.author
            }
        }
    }

    return null
}