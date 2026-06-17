import type { Report } from "../types/UserTypes"

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

/**
 * Retrieves a user's report sheet for the specified date
 * @param {string} date - The date of the report to be retrieved. Must follow the ISO Date format `YYYY-MM`. Defaults to current date if not provided
 */
export async function retrieveReport(userId: string, date?: string) {

    const reportDate = date ?? (() => {
        
        const currentDate = new Date()
        return currentDate.toISOString().substring(0, 6)
    })()

    const res = await fetch(`${BACKEND_URL}/retrieve-report?${new URLSearchParams({ report_date: reportDate, user_id: userId })}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getAccessToken()}`
        },
        method: 'GET',
    })

    if (res.ok) return await res.json() as Report
    else return null
}

function getAccessToken() {

    const cookie = document.cookie
    
    if (cookie && cookie != "") {

        const token = cookie.split('=')[1]
        return token
    } 
    
    return ""
}