import { useState, useRef, useContext } from "react";
import { PlusIcon } from "lucide-react";
import { windowContext } from "../contexts/WindowContext";
import RequireAuth from "../components/wrappers/RequireAuth";
import Card from "../components/composites/Card";
import PageHeading from "../components/reusables/PageHeading";
import QuotationOfTheDay from "../components/composites/QuotationOfTheDay";
import TrackerTable from "../components/reusables/tracker/TrackerTable";
import TrackerEntryModal from "../components/reusables/tracker/TrackerEntryModal";

import type { TrackerEntry } from "../types/UserTypes";
import TrackerAccordion from "../components/reusables/tracker/TrackerAccordion";

export default function Tracker() {

    const INCOME_TEST_DATA: TrackerEntry[] = [
        {
            _id: "1",
            name: "Salary",
            type: "Income",
            description: "Received salary from XYZ",
            date: "07/12/2026",
            amount: 10000,
            allocation: "Savings"
        },
        {
            _id: "2",
            name: "Received allowance",
            type: "Income",
            description: "Allowance from Dolores",
            date: "07/14/2026",
            amount: 15000,
            allocation: "Pocket Money"
        },
        {
            _id: "3",
            name: "EF Allocation",
            type: "Income",
            description: "Monthly salary allocation to EF",
            date: "07/20/2026",
            amount: 23456,
            allocation: "Emergency Fund"
        }
    ]

    const isMobile = useContext(windowContext)
    
    const [isEntryModalOpen, setIsEntryModalOpen] = useState(false)

    const entryType = useRef<"income" | "expense">("income")

    // THE HOOK VALUES BELOW THIS COMMENT ARE ONLY TO BE USED IN MOBILE VIEW!!
    const [activeTracker, setActiveTracker] = useState<"income" | "expense">("income")
    
    const currentMonth = (new Date).toLocaleDateString('en-US', { month: "long" })

    /* --- DESKTOP VIEW --- */    
    if (!isMobile)
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

    /* --- MOBILE VIEW --- */
    else
    return (
        <RequireAuth>
            <main className="w-full h-full flex-col overflow-y-auto">                
                <header className="w-full p-4 flex flex-col justify-left">
                    <PageHeading heading={"Monthly Tracker"} subtext={`Your income and expense for ${currentMonth}`}/>
                    <QuotationOfTheDay />
                </header> 

                <div className="mt-3">
                    <h2 className="px-4 text-black font-medium text-start text-[24px]">
                        {
                            (activeTracker === "income")
                                ? "Income"
                                : "Expense"
                        }
                    </h2>
                    <span className="flex px-4 mt-3 justify-between">
                        <button 
                        onClick={() => setIsEntryModalOpen(prevState => !prevState)}
                        className={buttonStyle(activeTracker)}
                        >
                            <PlusIcon size={14} color="#fff" className="h-auto"/>
                            <p className="text-[14px] text-white">Add Entry</p>
                        </button>

                        <button 
                        onClick={() => setActiveTracker(prevState => {
                            if (prevState === "income") return "expense"
                            else return "income"
                        })}
                        className={buttonStyle(activeTracker)}
                        >
                            <PlusIcon size={14} color="#fff" className="h-auto"/>
                            <p className="text-[14px] text-white">
                                {
                                    (activeTracker === "income")
                                        ? "Switch to Expenses"
                                        : "Switch to Income"
                                }
                            </p>
                        </button>
                    </span>

                    <div className="mt-3">
                        {activeTracker === "income" && (
                            <TrackerAccordion data={INCOME_TEST_DATA} theme={"positive"} />
                        )}

                        {activeTracker === "expense" && (
                            <TrackerAccordion data={INCOME_TEST_DATA} theme={"negative"} />
                        )}
                    </div>                    
                </div>                
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

function buttonStyle(type: "income" | "expense") {

    const baseStyle = [
        "rounded-md",
        "p-1",
        "flex",
        "justify-center",
        "align-middle",
        "gap-1",
        "cursor-pointer"
    ]

    if (type === "income") {

        return [
            ...baseStyle,
            "bg-[#2EC4B6]"
        ].join(" ")
    } else {

        return [
            ...baseStyle,
            "bg-[#A92E23]"
        ].join(" ")
    }
}