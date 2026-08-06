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
import type { Debt, MonthlyDue, TrackerEntry } from "../types/UserTypes"
import ScheduleLadder from "../components/reusables/ScheduleLadder"
import Card from "../components/composites/Card"
import { ChevronRight } from "lucide-react"

export default function Dashboard() {

    const schedLdTestData: Debt[] = [
        {
            name: "Money Borrowed",
            to:[ "Adam"],
            allocation: "Savings",
            category: ["As Debtor"],
            amount: 1200,
            dateCreated: "06/22/2026",
            dateExpiry: "07/12/2026",
            description: "Borrowed money from my friend Adamn",
            isPaid: false
        },
        {
            name: "Snack Money",
            to:[ "Casey"],
            allocation: "Pocket Money",
            category: ["As Creditor"],
            amount: 500,
            dateCreated: "07/19/2026",
            dateExpiry: "07/22/2026",
            description: "Casey got hungry after breaktime and wanted some chips. Unfortunately, the office pantry's cashless accounts were down and she had no cash.",
            isPaid: false
        },
        {
            name: "Emergency checkup",
            to:[ "Blake"],
            allocation: "Emergency Fund",
            category: ["As Debtor"],
            amount: 20000,
            dateCreated: "07/15/2026",
            dateExpiry: "07/20/2026",
            description: "My sibling caught the flu and has been sick for almost a week. We've got no money at the moment, but she has to get to the doctor now.",
            isPaid: false
        },
        {
            name: "Physical game to pay later",
            to:[ "Blake"],
            allocation: "Pocket Money",
            category: ["As Debtor"],
            amount: 800,
            dateCreated: "06/02/2026",
            dateExpiry: "07/05/2026",
            description: "Borrowed money from my friend Adamn",
            isPaid: false
        }
    ]

    const MONTHLY_DUE_TEST_DATA: MonthlyDue[] = [
        {
            name: "House Rent",   
            category: ["Rent"],
            amount: 3500,
            date: "07/12/2026",
            description: "Payment for the apartment I'm renting. Can be paid at the end of the month",
            isPaid: false
        },
        {
            name: "WiFi Bill",   
            category: ["Internet"],
            amount: 1500,
            date: "07/20/2026",
            description: "WiFi provider asking for their monthly payment while providing lackluster services. Typical..",
            isPaid: false
        },
        {
            name: "Water Bill",   
            category: ["Utilities"],
            amount: 500,
            date: "07/08/2026",
            description: "Outstanding bill for the past month. Typically cheap so I wouldn't mind.",
            isPaid: false
        }
    ]

    const trackerTestData: TrackerEntry[] = [
        {
            type: "Income",
            description: "Received salary from XYZ",
            date: "07/12/2026",
            amount: 10000,
            allocation: "Savings"
        },
        {
            type: "Income",
            description: "Allowance from Dolores",
            date: "07/14/2026",
            amount: 15000,
            allocation: "Pocket Money"
        },
        {
            type: "Income",
            description: "Monthly salary allocation to EF",
            date: "07/20/2026",
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
                            sortedData={MONTHLY_DUE_TEST_DATA}
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