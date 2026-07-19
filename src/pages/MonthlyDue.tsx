import { useState, useMemo } from "react";
import { CircleQuestionMarkIcon, ListFilterIcon, PlusIcon } from "lucide-react";
import QuotationOfTheDay from "../components/composites/QuotationOfTheDay";
import PageHeading from "../components/reusables/PageHeading";
import RequireAuth from "../components/wrappers/RequireAuth";
import ListFilters from "../components/reusables/list/ListFilters";
import List from "../components/reusables/list/List";
import { MONTHLY_DUE_FILTER_ICON_MAPPING } from "../mappings/iconMappings";

import type { MonthlyDue } from "../types/UserTypes";

export default function MonthlyDue() {

    const MONTHLY_DUES_TEST_DATA = [
        {
            amount: 1234,
            date: "06/12/2026",
            description: "Test payment",
            isPaid: false
        },
        {
            amount: 1234,
            date: "06/12/2026",
            description: "Test payment",
            isPaid: false
        },
        {
            amount: 1234,
            date: "06/12/2026",
            description: "Test payment",
            isPaid: false
        },
        {
            amount: 1234,
            date: "06/12/2026",
            description: "Test payment",
            isPaid: false
        },
        {
            amount: 1234,
            date: "06/12/2026",
            description: "Test payment",
            isPaid: false
        },
        {
            amount: 1234,
            date: "06/12/2026",
            description: "Test payment",
            isPaid: false
        },
        {
            amount: 1234,
            date: "06/12/2026",
            description: "Test payment",
            isPaid: false
        },
        {
            amount: 1234,
            date: "06/12/2026",
            description: "Test payment",
            isPaid: false
        },
        {
            amount: 1234,
            date: "06/12/2026",
            description: "Test payment",
            isPaid: false
        }
    ] as MonthlyDue[]

    const [selectedFilter, setSelectedFilter] = useState("All")

    const collectedFilters = useMemo(() => {

        const filterCollection = new Map()

        filterCollection.set("All", {
            name: "All",
            count: MONTHLY_DUES_TEST_DATA.length,
            icon: <ListFilterIcon />
        })
        filterCollection.set("Uncategorized", {
            name: "Uncategorized",
            count: 0,
            icon: <CircleQuestionMarkIcon />
        })

        for (const entry of MONTHLY_DUES_TEST_DATA) {

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
                            icon: MONTHLY_DUE_FILTER_ICON_MAPPING[cat]
                        })
                    }
                }
            } else {

                const uncategorizedFilterVal = filterCollection.get("Uncategorized")
                filterCollection.set("Uncategorized", {...uncategorizedFilterVal, count: uncategorizedFilterVal.count + 1})
            }
        }

        return filterCollection
    }, [MONTHLY_DUES_TEST_DATA])

    const entries = useMemo(() => {

        if (selectedFilter === "All") {

            return MONTHLY_DUES_TEST_DATA
        } else if (selectedFilter === "Uncategorized") {

            return MONTHLY_DUES_TEST_DATA.filter(i => !i.category)
        } else {
            
            return MONTHLY_DUES_TEST_DATA.filter(i => (i.category && i.category.includes(selectedFilter)))
        }        
    }, [selectedFilter])

    return (
        <RequireAuth>
            <main className="p-8 w-full h-full flex-col overflow-y-auto">                
                <header className="w-full flex justify-between">
                    <PageHeading heading={"Monthly Dues"} subtext={`Your upcoming payments`}/>
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
                            onClick={() => {}}
                            className="bg-[#2EC4B6] rounded-md px-1 flex justify-center align-middle gap-1 cursor-pointer"
                            >
                                <PlusIcon size={12} color="#fff" className="h-auto"/>
                                <p className="text-[14px] text-white">Add Entry</p>
                            </button>
                        </span>

                        <div className="mt-2">
                            <List listItemType="monthly-due" items={entries} />
                        </div>                        
                    </div>
                </span>
            </main>
        </RequireAuth>
    )
}