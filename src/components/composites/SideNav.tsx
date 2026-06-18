export default function SideNav({ children } : { children: React.ReactNode }) {

    return (
        <aside>
            <nav>
                <ul>
                    { children }
                </ul>                
            </nav>
        </aside>
    )
}