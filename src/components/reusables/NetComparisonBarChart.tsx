

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

export default function NetComparisonBarChart() {

    
}