import { useContext } from "react"
import { userContext } from "../contexts/UserContext"
import { reportContext } from "../contexts/ReportContext"
import QuotationOfTheDay from "../components/composites/QuotationOfTheDay"
import NetComparisonBarChart from "../components/reusables/NetComparisonBarChart"
import AllocationPieChart from "../components/reusables/AllocationPieChart"
import PageHeading from "../components/reusables/PageHeading"
import RequireAuth from "../components/wrappers/RequireAuth"
import MiniList from "../components/reusables/MiniList"
import type { Debt } from "../types/UserTypes"
import ScheduleLadder from "../components/reusables/ScheduleLadder"

export default function Dashboard() {

    const schedLdTestData: Debt[] = [
        {
            to: "Adam",
            allocation: "Savings",
            isDebtor: false,
            amount: 1200,
            date: "07-12-2026",
            description: "Borrowed money",
            isPaid: false
        },
        {
            to: "Casey",
            allocation: "Savings",
            isDebtor: true,
            amount: 10200,
            date: "07-14-2026",
            description: "Needed to buy snack",
            isPaid: false
        },
        {
            to: "Casey",
            allocation: "Savings",
            isDebtor: true,
            amount: 10200,
            date: "07-14-2026",
            description: "Needed to buy snack",
            isPaid: false
        },
        {
            to: "Casey",
            allocation: "Savings",
            isDebtor: true,
            amount: 10200,
            date: "07-14-2026",
            description: "Needed to buy snack",
            isPaid: false
        }
    ]

    const { report } = useContext(reportContext)
    const { user } = useContext(userContext)
    const currentMonth = (new Date).toLocaleDateString('en-US', { month: "long" })

    return (
        <RequireAuth>
            <main className="p-8 w-full h-full flex-col overflow-y-auto">                
                <header className="w-full flex justify-between">
                    <PageHeading heading={`Welcome, ${user?.firstName}`} subtext={`Here is your financial report for the month of ${currentMonth}`}/>
                    <QuotationOfTheDay />
                </header>    
                <div className="w-full h-auto mt-8 flex justify-evenly gap-4">
                    <NetComparisonBarChart />
                    <AllocationPieChart />
                </div>     

                <h1 className="font-bold text-[24px] text-start mt-8">Quick View</h1>

                <div className="mt-4 grid grid-cols-2 gap-8">
                    <MiniList label="Income" theme="positive" data={[]} />
                    <MiniList label="Expense" theme="negative" data={[]} />
                    
                    <ScheduleLadder
                    label="Debts"
                    numOfElementsDisplayed={4}
                    sortedData={schedLdTestData}
                    />
                    <ScheduleLadder
                    label="Monthly Dues"
                    numOfElementsDisplayed={4}
                    sortedData={schedLdTestData}
                    />
                </div>
            </main>            
        </RequireAuth> 
    )
}