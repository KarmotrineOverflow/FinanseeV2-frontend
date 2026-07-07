import { getAccessToken } from "./api-utils";

import type { Report } from "../types/UserTypes";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

/**
 * Generates a new `Report` for the current month. 
 * 
 * Starting values will be the provided previous report's final values. If no previous report is provided, defaults to 0
 * @param {Report} prevReportRef - a previous month's `Report`. Its final values will be the starting values of the generated report.
 */
export async function generateReport(userId: string, prevReportRef?: string | null) {

    // No way to access ObjectId type from FE. Will have to generate report from BE
    const res = await fetch(`${BACKEND_URL}/generate-report`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getAccessToken()}`
        },
        method: 'POST',
        body: (prevReportRef) ? JSON.stringify({userId: userId, prevReportRef: prevReportRef}) : JSON.stringify({userId: userId})
    })

    const resBody = await res.json()

    console.log(resBody)

    if (res.ok) return await res.json()
    return null
}

/**
 * Retrieves a user's report sheet for the specified date
 * @param {string} date - The date of the report to be retrieved. Must follow the ISO Date format `YYYY-MM`. Defaults to current date if not provided
 */
export async function retrieveReport(userId: string, date?: string) {

    const reportDate = date ?? (() => {
        
        const currentDate = new Date()
        return currentDate.toISOString().substring(0, 7)
    })()

    const res = await fetch(`${BACKEND_URL}/retrieve-report?${new URLSearchParams({ reportDate: reportDate, userId: userId })}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getAccessToken()}`
        },
        method: 'GET',
    })

    const resBody = await res.json() as Report

    if (res.ok) return resBody
    else return null
}