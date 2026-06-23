import QuotationOfTheDay from "../components/composites/QuotationOfTheDay"
import PageHeading from "../components/reusables/PageHeading"
import RequireAuth from "../components/wrappers/RequireAuth"

export default function Dashboard() {

    return (
        <RequireAuth>
            <div className="w-full p-4">
                <header className="w-full flex justify-between">
                    <PageHeading heading={"Welcome, Test"} subtext="Here is your financial report for the month of XXX"/>
                    <QuotationOfTheDay />
                </header>
            </div>            
        </RequireAuth> 
    )
}