import { useState, useRef, useEffect } from "react";
import { PlusIcon } from "lucide-react";
import RequireAuth from "../components/wrappers/RequireAuth";
import Card from "../components/composites/Card";
import PageHeading from "../components/reusables/PageHeading";
import QuotationOfTheDay from "../components/composites/QuotationOfTheDay";
import TrackerTable from "../components/reusables/tracker/TrackerTable";
import TrackerEntryModal from "../components/reusables/tracker/TrackerEntryModal";

import type { TrackerEntry } from "../types/UserTypes";

export default function Tracker() {

    const INCOME_TEST_DATA: TrackerEntry[] = [
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

    useEffect(() => {

        const handleResize = () => {

            if (window.outerWidth <= 640) console.log ("Mobile view")
        }

        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
        }
    })

    const [isEntryModalOpen, setIsEntryModalOpen] = useState(false)

    const entryType = useRef<"income" | "expense">("income")
    
    const currentMonth = (new Date).toLocaleDateString('en-US', { month: "long" })

    /* --- DESKTOP VIEW --- */    
    return (
        <RequireAuth>
            <main className="p-8 w-full h-full flex-col overflow-y-auto">                
                <header className="w-full flex flex-col-reverse md:flex-row justify-between">
                    <PageHeading heading={"Monthly Tracker"} subtext={`Your income and expense for ${currentMonth}`}/>
                    <QuotationOfTheDay />
                </header> 

                {/* --- Tracker Lists --- */}
                <span className="w-full flex gap-8">
                    {/* Income List */}
                    <div className="grow">
                        <span className="w-full mb-2 mt-4 inline-flex justify-between">
                            <h2 className="text-black font-medium">Income</h2>
                            <button 
                            onClick={() => setIsEntryModalOpen(prevState => !prevState)}
                            className="bg-[#2EC4B6] rounded-md px-1 flex justify-center align-middle gap-1 cursor-pointer"
                            >
                                <PlusIcon size={12} color="#fff" className="h-auto"/>
                                <p className="text-[14px] text-white">Add Entry</p>
                            </button>
                        </span>
                        <Card>
                            <TrackerTable data={INCOME_TEST_DATA} theme={"positive"} />
                        </Card>
                    </div>
                    
                    {/* Expense List */}
                    <div className="grow">                        
                        <span className="w-full mb-2 mt-4 inline-flex justify-between">
                            <h2 className="text-black font-medium">Expense</h2>
                            <button className="bg-[#A92E23] rounded-md px-1 flex justify-center align-middle gap-1 cursor-pointer">
                                <PlusIcon size={12} color="#fff" className="h-auto"/>
                                <p className="text-[14px] text-white">Add Entry</p>
                            </button>
                        </span>
                        <Card>
                            <TrackerTable data={INCOME_TEST_DATA} theme={"negative"} />
                        </Card>                        
                    </div>
                </span>
            </main>

            {isEntryModalOpen && (                
                <TrackerEntryModal 
                mode="add"
                type={entryType.current}
                onClose={() => setIsEntryModalOpen(prevState => !prevState)}
                />                
            )}
        </RequireAuth>
    )
}