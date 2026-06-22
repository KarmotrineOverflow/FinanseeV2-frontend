import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import Loading from "../reusables/Loading"
import { userContext } from "../../contexts/UserContext" 
import { reportContext } from "../../contexts/ReportContext"
import { authenticate } from "../../utils/auth-utils"
import { retrieveReport } from "../../utils/api-utils"
import { generateReport } from "../../utils/report-utils"

export default function RequireAuth({ children } : { children: React.ReactNode }) {

    const [isVerifying, setIsVerifying] = useState(true)
    const navigate = useNavigate()
    const { user, setUser } = useContext(userContext)
    const { report, setReport } = useContext(reportContext)

    useEffect(() => {

        const cookie = document.cookie

        const verify = async () => {

            const token = cookie.split('=')[1]
            const res = await authenticate(token)

            if (res.status === 200) {
                
                let userData = user
                let reportData = report

                // Check if user and report contexts are null. Retrieve from DB if so (latest report will be retrieved)
                if (!userData) {

                    userData = await res.json()
                    setUser(userData)
                }                               

                if (userData && !reportData) {

                    const userId = userData!._id
                    reportData = await retrieveReport(userId ?? "")                                          

                    // If currentReport is null, it means the user does not have an existing report for the current month. Generate a new one if so
                    if (!reportData) {

                        // Check user report ref first if it's not empty so we can use the latest report's values
                        const lastReportRef = (userData!.reports.length > 0) ? userData?.reports[-1] : null
                        reportData = await generateReport(userId, lastReportRef?._id)                        
                    }
                    
                    setReport(reportData)
                }                                            
            }
            
            setIsVerifying(false)
        }

        if (cookie && cookie != "") verify()
        else setIsVerifying(false)
    })

    if (isVerifying) return <Loading />
    if (!user && !report) {
        document.cookie = "" 
        setReport(null)
        setUser(null)
        navigate('/sign-in') 
    } else return children
}