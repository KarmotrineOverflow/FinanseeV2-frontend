import { useContext } from "react"
import { Link } from "react-router-dom"
import { userContext } from "../contexts/UserContext"
import { reportContext } from "../contexts/ReportContext"
import QuotationOfTheDay from "../components/composites/QuotationOfTheDay"
import NetComparisonBarChart from "../components/reusables/NetComparisonBarChart"
import AllocationPieChart from "../components/reusables/AllocationPieChart"
import PageHeading from "../components/reusables/PageHeading"
import RequireAuth from "../components/wrappers/RequireAuth"
import MiniList from "../components/reusables/MiniList"
import type { Debt, TrackerEntry } from "../types/UserTypes"
import ScheduleLadder from "../components/reusables/ScheduleLadder"
import Card from "../components/composites/Card"
import { ChevronRight } from "lucide-react"

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

    const trackerTestData: TrackerEntry[] = [
        {
            type: "Income",
            description: "Got money off the ground",
            date: "07-12-2026",
            amount: 10000,
            allocation: "Savings"
        },
        {
            type: "Income",
            description: "Shat gold",
            date: "07-14-2026",
            amount: 15000,
            allocation: "Pocket Money"
        },
        {
            type: "Income",
            description: "Stole it from an old crone",
            date: "07-20-2026",
            amount: 23456,
            allocation: "Emergency Fund"
        }
    ]

    const { report } = useContext(reportContext)
    const { user } = useContext(userContext)
    const currentMonth = (new Date).toLocaleDateString('en-US', { month: "long" })

    return (
        <RequireAuth>
            <main className="p-8 w-full h-full flex-col overflow-y-auto">                
                <header className="w-full flex justify-between">
                    <PageHeading heading={`${determineGreeting()}, ${user?.firstName}`} subtext={`Here is your financial report for the month of ${currentMonth}`}/>
                    <QuotationOfTheDay />
                </header>    
                <div className="w-full h-auto mt-8 flex justify-evenly gap-4">
                    <NetComparisonBarChart />
                    <AllocationPieChart />
                </div>     

                <h1 className="font-bold text-[24px] text-start mt-8">Quick View</h1>

                <div className="mt-4 grid grid-cols-2 gap-6">
                    <Card>
                        <div className="p-4 w-full flex flex-col gap-2">
                            <h1 className="text-start text-[18px] font-semibold">Income</h1>
                            <MiniList theme="positive" data={trackerTestData} />
                            <Link to="/tracker" className="mt-2 w-fit flex align-middle gap-1 self-end cursor-pointer">
                                <p className="text-[14px]">View Tracker</p>
                                <ChevronRight size={16} className="m-auto"/>
                            </Link>
                        </div>                        
                    </Card>     

                    <Card>
                        <div className="p-4 w-full flex flex-col gap-2">
                            <h1 className="text-start text-[18px] font-semibold">Expense</h1>
                            <MiniList theme="negative" data={trackerTestData} />
                            <Link to="/tracker" className="mt-2 w-fit flex align-middle gap-1 self-end cursor-pointer">
                                <p className="text-[14px]">View Tracker</p>
                                <ChevronRight size={16} className="m-auto"/>
                            </Link>
                        </div>                        
                    </Card>    

                    <Card>
                        <div className="p-4 w-full flex flex-col gap-2">
                            <h1 className="text-start text-[18px] font-semibold">Monthly Expenses</h1>
                            <ScheduleLadder                    
                            numOfElementsDisplayed={4}
                            sortedData={schedLdTestData}
                            />
                            <Link to="/monthly-dues" className="mt-2 w-fit flex align-middle gap-1 self-end cursor-pointer">
                                <p className="text-[14px]">View Monthly Dues</p>
                                <ChevronRight size={16} className="m-auto"/>
                            </Link>
                        </div>                        
                    </Card>   

                    <Card>
                        <div className="p-4 w-full flex flex-col gap-2">
                            <h1 className="text-start text-[18px] font-semibold">Debts</h1>
                            <ScheduleLadder                    
                            numOfElementsDisplayed={4}
                            sortedData={schedLdTestData}
                            />
                            <Link to="/debts" className="mt-2 w-fit flex align-middle gap-1 self-end cursor-pointer">
                                <p className="text-[14px]">View Debts</p>
                                <ChevronRight size={16} className="m-auto"/>
                            </Link>
                        </div>                        
                    </Card>                                                       
                </div>
            </main>            
        </RequireAuth> 
    )
}

function determineGreeting() {

    const currTime = new Date().getHours()

    if (currTime >= 4 && currTime <= 11) return "Good morning"
    else if (currTime >= 12 && currTime <= 16) return "Good afternoon"
    else if (currTime >= 17 || currTime <= 3) return "Good evening"
}