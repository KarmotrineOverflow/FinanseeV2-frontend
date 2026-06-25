import { useEffect, useContext, useState, useMemo, useRef } from "react"
import { BarElement, BarController, CategoryScale, LinearScale, Chart } from "chart.js"
import { retrieveReport } from "../../utils/api-utils"
import { userContext } from "../../contexts/UserContext"
import { FETCH_STATE } from "../../enums/FetchState"
import RequireAuth from "../wrappers/RequireAuth"
import Loading from "./Loading"
import Error from "./Error"
import Card from "../composites/Card"

import type { Report } from "../../types/UserTypes"

/**
 * Returns the n amount of months leading to the given end date. If no end date is provided, the current date is used.
 * @param {number} numOfMonths - The number of months to be calculated leading to the end date.
 * @param {string} endDate - (optional) The inclusive date that the leading months will lead to. Defaults to current month if none is provided.
 * @returns Array of dates in string using ISO format (e.g. `["2026-10", "2026-11", "2026-12"]`)
 */
function getLeadingMonths(numOfMonths: number, endDate?: string) {

    const leadingMonths: string[] = []

    const finalDate = endDate ?? (() => {
        return (new Date).toISOString().substring(0, 7)
    })()

    const dateParts = finalDate.split('-')
    const year = Number.parseInt(dateParts[0])
    const date = Number.parseInt(dateParts[1])

    let calculatedStartDate = date - numOfMonths
    let calculatedStartYear = year    

    if (calculatedStartDate < 1) {

        calculatedStartYear -= 1
        calculatedStartDate += 12
    }

    for (let i = 0; i < numOfMonths; i++) {

        const newDate = new Date()
        newDate.setMonth(calculatedStartDate)
        newDate.setFullYear(calculatedStartYear) 

        leadingMonths.push(newDate.toISOString().substring(0, 7))

        calculatedStartDate += 1
        
        if (calculatedStartDate >= 12) {

            calculatedStartDate -= 12
            calculatedStartYear += 1
        }
    }

    return leadingMonths
}

export default function NetComparisonBarChart({ numOfMonths = 3} : { numOfMonths?: number }) {

    const { user } = useContext(userContext)
    const [fetchState, setFetchState] = useState<FETCH_STATE>(FETCH_STATE.LOADING)
    const [reports, setReports] = useState<Report[] | null>(null)

    // The ref for the canvas element that will be used to host the chart render
    const chartCanvas = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        if (reports) {
            const labels = reports.map((r, index) => 
                (new Date(r.monthDate)).toLocaleDateString('en-US', { month: "long" })
            )

            // When report exists, create a new Chart instance that will be inserted in the given canvas ref
            // Under the hood, Chart does 'canvasRef.innerHTML = <chart_code>'. That's why we can't simply return a Chart. It's not an element, it is not coded for React, but rather for JavaScript
            const chart = new Chart(chartCanvas.current!, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: '',
                        data: reports.map((r) => r.currentMoney),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(153, 102, 255, 0.2)'
                        ],
                        borderColor: [
                            'rgb(255, 99, 132)',
                            'rgb(255, 159, 64)',
                            'rgb(153, 102, 255)'
                        ],
                        borderWidth: 1
                    }]
                },                
            })

            // Returning this func allows React to destory that chart when this component is unmounted
            // Need to include this because Chart.js needs a clean canvas when re-rendering
            return () => chart.destroy() 
        }
    }, [reports])

    useEffect(() => {

        Chart.register(
            BarElement,
            BarController,
            CategoryScale,
            LinearScale
        )

        const leadingMonths = getLeadingMonths(numOfMonths)
        const leadingMonthReports: Report[] = []

        const retrieveLeadingMonthReports = async () => {

            for (const month of leadingMonths) {

                const retrievedReport = await retrieveReport(user!._id, month)

                if (retrievedReport) leadingMonthReports.push(retrievedReport as Report) 
            }

            // Display fetch error if not a single report was retrieved
            if (leadingMonthReports.length < 1) {

                setFetchState(FETCH_STATE.ERROR)
            } else {

                setReports(leadingMonthReports)
                setFetchState(FETCH_STATE.SUCCESS)
            }            
        } 
        
        retrieveLeadingMonthReports()
    }, [])

    return (
        <RequireAuth>
            <Card>
                <div className="p-8 w-[35vw] flex flex-col gap-4 justify-center">
                    {fetchState === FETCH_STATE.LOADING && <Loading />}
                    {fetchState === FETCH_STATE.ERROR && <Error />}
                    {fetchState === FETCH_STATE.SUCCESS && (
                            <>
                                <h2>Net worth for the past {numOfMonths} months</h2>
                                <canvas width={100} height={100} ref={chartCanvas}/>
                            </>
                    )}
                </div>
            </Card>            
        </RequireAuth>
    )
}