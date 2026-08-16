import { useContext } from "react";
import { userContext } from "../contexts/UserContext";
import { reportContext } from "../contexts/ReportContext";

import type { User, Report } from "../types/UserTypes";

export default class useDataCache {

    private userCache
    private reportCache

    constructor() {

        this.userCache = useContext(userContext)
        this.reportCache = useContext(reportContext)
    }

    get user() {

        const { user } = this.userCache

        return user!
    }

    set user(value: User) {

        const { setUser } = this.userCache

        setUser(prevState => {

            return {
                ...prevState!,
                ...value
            }
        })
    }

    get report() {

        const { report } = this.reportCache

        return report!
    }

    set report(value: Report) {

        const { setReport } = this.reportCache

        setReport(prevState => {

            return {
                ...prevState!,
                ...value
            }
        })
    }
}