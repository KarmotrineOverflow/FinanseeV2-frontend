import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import Loading from "../reusables/Loading"
import { userContext } from "../../contexts/UserContext" 
import { reportContext } from "../../contexts/ReportContext"
import { authenticate } from "../../utils/auth-utils"
import { retrieveReport } from "../../utils/api-utils"

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
                
                // Check if user and report contexts are null. Retrieve from DB if so (latest report will be retrieved)
                if (!user) {

                    const userData = await res.json()
                    setUser(userData)
                }

                if (!report) {

                    const userId = user!._id
                    const currentReport = await retrieveReport(userId)

                    // If currentReport is null, it means the user does not have an existing report for the current month. Generate a new one if so
                    if (!currentReport) {

                        // TODO: Create generate report logic in report-utils script
                    } else setReport(currentReport)
                }                

                return children
            }
            else setIsVerifying(false)
        }

        if (cookie && cookie != "") verify()
        else setIsVerifying(false)
    })

    if (isVerifying) return <Loading />
    else { document.cookie = ""; navigate('/sign-in') }
    // Check header for accessToken
    // If accessToken exists
        // Verify accessToken validity
        // If accessToken is valid
            // Display page as child component
        // Else if accessToken is invalid
            // Redirect back to /sign-in
}