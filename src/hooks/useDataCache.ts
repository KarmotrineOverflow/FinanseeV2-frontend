import { useContext } from "react";
import { userContext } from "../contexts/UserContext";
import { reportContext } from "../contexts/ReportContext";

import type { User, Report } from "../types/UserTypes";

export type DataCache = {
    user: User,
    report: Report,
    setUser: (user: User) => void,
    setReport: (report: Report) => void
}

const dataCache = {
    user: useContext(userContext).user!,
    report: useContext(reportContext).report!,
    setUser: (user: User) => { 
        const { setUser } = useContext(userContext)
        setUser(prevState => { return {...prevState!, ...user} }) 
    },
    setReport: (report: Report) => { 
        const { setReport } = useContext(reportContext)
        setReport(prevState => { return {...prevState!, ...report} }) 
    }
}

export function useDataCache() {

    const userCache = useContext(userContext)
    const reportCache = useContext(reportContext)    

    if (!userCache || !reportCache) {
        throw new Error("useDataCache must be used within a UserProvider and ReportProvider")
    }

    return dataCache
}