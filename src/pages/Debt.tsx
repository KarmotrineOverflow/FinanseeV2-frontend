import { useState, useMemo } from "react";
import { CircleQuestionMarkIcon, ListFilterIcon, PlusIcon } from "lucide-react";
import QuotationOfTheDay from "../components/composites/QuotationOfTheDay";
import PageHeading from "../components/reusables/PageHeading";
import RequireAuth from "../components/wrappers/RequireAuth";
import ListFilters from "../components/reusables/list/ListFilters";
import List from "../components/reusables/list/List";
import { DEBT_FILTER_ICON_MAPPING } from "../mappings/iconMappings";

import type { Debt } from "../types/UserTypes";
import DebtModal from "../components/reusables/list/DebtModal";

export default function Debt() {

    const DEBT_TEST_DATA: Debt[] = [
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

    const [isModalVisible, setIsModalVisible] = useState(false)
    const [selectedFilter, setSelectedFilter] = useState("All")

    const collectedFilters = useMemo(() => {

        const filterCollection = new Map()

        filterCollection.set("All", {
            name: "All",
            count: DEBT_TEST_DATA.length,
            icon: <ListFilterIcon />
        })
        filterCollection.set("Uncategorized", {
            name: "Uncategorized",
            count: 0,
            icon: <CircleQuestionMarkIcon />
        })

        for (const entry of DEBT_TEST_DATA) {

            if (entry.category) {

                // Storage of an entry's category is by array since an entry can have multiple categories
                for (const cat of entry.category) {

                    if (filterCollection.has(cat)) {

                        const currentFilterValue = filterCollection.get(cat)
                        filterCollection.set(cat, {...currentFilterValue, count: currentFilterValue.count + 1})
                    } else {

                        filterCollection.set(cat, {
                            name: cat,
                            count: 1,
                            icon: DEBT_FILTER_ICON_MAPPING[cat]
                        })
                    }
                }
            } else {

                const uncategorizedFilterVal = filterCollection.get("Uncategorized")
                filterCollection.set("Uncategorized", {...uncategorizedFilterVal, count: uncategorizedFilterVal.count + 1})
            }
        }

        return filterCollection
    }, [DEBT_TEST_DATA])

    const entries = useMemo(() => {

        if (selectedFilter === "All") {

            return DEBT_TEST_DATA
        } else if (selectedFilter === "Uncategorized") {

            return DEBT_TEST_DATA.filter(i => !i.category)
        } else {
            
            return DEBT_TEST_DATA.filter(i => (i.category && i.category.includes(selectedFilter)))
        }        
    }, [selectedFilter])

    const handleAddEntry = (entry: Debt) => {


    }

    return (
        <RequireAuth>
            <main className="p-8 w-full h-full flex-col overflow-y-auto">                
                <header className="w-full flex justify-between">
                    <PageHeading heading={"Debts"} subtext={`All incoming and outgoing debts and their details`}/>
                    <QuotationOfTheDay />
                </header> 
                
                <span className="w-full mt-4 inline-flex gap-6">
                    {/* Filter Card */}
                    <ListFilters filters={collectedFilters} onFilterSelect={(filter) => setSelectedFilter(filter)} />

                    {/* Entry List */}
                    <div className="w-full grow">
                        <span className="w-full inline-flex justify-between">
                            <p>Showing {entries.length} results for <b>{selectedFilter}</b></p>
                            <button 
                            onClick={() => setIsModalVisible(true)}
                            className="bg-[#2EC4B6] rounded-md px-1 flex justify-center align-middle gap-1 cursor-pointer"
                            >
                                <PlusIcon size={12} color="#fff" className="h-auto"/>
                                <p className="text-[14px] text-white">Add Entry</p>
                            </button>
                        </span>

                        <div className="mt-2">
                            <List listItemType="debt" items={entries} />
                        </div>                        
                    </div>
                </span>
            </main>

            {/* {isModalVisible && <DebtModal mode="add" onSubmit={(entry) => handleAddEntry(entry)} onClose={() => setIsModalVisible(false)}/>} */}
        </RequireAuth>
    )
}