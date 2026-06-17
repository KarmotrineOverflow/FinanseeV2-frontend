import { createContext, useState, type Dispatch } from 'react'

import type { Report } from '../types/UserTypes'

interface ReportContextInterface {

    report: Report | null,
    setReport: Dispatch<React.SetStateAction<Report | null>>
}

export const reportContext = createContext({
    report: null,
    setReport: (report: Report | null) => {}
} as ReportContextInterface)

export default function ReportContext({ children } : { children: React.ReactNode }) {

    const [report, setReport] = useState<Report | null>(null)

    return (
        <reportContext.Provider value={{ report, setReport }}>
            { children }
        </reportContext.Provider>
    )
}