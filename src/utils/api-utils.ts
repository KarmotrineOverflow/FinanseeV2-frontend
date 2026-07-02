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

export async function getQuote() {

    const apiUrl = "https://thequoteshub.com/api/"

    const res = await fetch(apiUrl, {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET'
    })

    if (res.ok) {

        const resBody = await res.json()

        return {
            quote: resBody.text,
            author: resBody.author
        }
    }

    return null
}