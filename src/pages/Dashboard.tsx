import RequireAuth from "../components/wrappers/RequireAuth"

export default function Dashboard() {

    return (
        <RequireAuth>
            <h1>Now displaying dashboard</h1>
        </RequireAuth> 
    )
}