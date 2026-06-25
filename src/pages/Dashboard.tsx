import { useContext } from "react"
import { userContext } from "../contexts/UserContext"
import { reportContext } from "../contexts/ReportContext"
import QuotationOfTheDay from "../components/composites/QuotationOfTheDay"
import NetComparisonBarChart from "../components/reusables/NetComparisonBarChart"
import PageHeading from "../components/reusables/PageHeading"
import RequireAuth from "../components/wrappers/RequireAuth"

export default function Dashboard() {

    const { report } = useContext(reportContext)
    const { user } = useContext(userContext)
    const currentMonth = (new Date).toLocaleDateString('en-US', { month: "long" })

    return (
        <RequireAuth>
            <div className="p-6 w-full h-full flex-col">                
                <header className="w-full flex justify-between">
                    <PageHeading heading={`Welcome, ${user?.firstName}`} subtext={`Here is your financial report for the month of ${currentMonth}`}/>
                    <QuotationOfTheDay />
                </header>    
                <div className="w-full mt-8 flex">
                    <NetComparisonBarChart />
                </div>     
            </div>            
        </RequireAuth> 
    )
}