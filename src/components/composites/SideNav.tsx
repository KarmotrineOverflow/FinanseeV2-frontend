import { SquareChevronLeftIcon, SquareChevronRightIcon } from "lucide-react";

export default function SideNav({ children, isOpen, toggleOpen } : { children: React.ReactNode, isOpen: boolean, toggleOpen: () => void }) {    

    return (
        <aside className={(isOpen) ? openSideNavStyle() : closedSideNavStyle()}>
            <nav>
                <span className="mb-2 p-2 flex justify-between">
                    {isOpen && <img src='/finansee_logo_2.png' className="w-36"/>}
                    <button className="cursor-pointer"
                    onClick={() => toggleOpen()}
                    >
                        {
                            (isOpen)
                                ? <SquareChevronLeftIcon size={36} strokeWidth={1.5} color="white"/>
                                : <SquareChevronRightIcon size={36} strokeWidth={1.5} color="white"/>
                        }                        
                    </button>
                </span>
                <ul>                    
                    { children }
                </ul>                
            </nav>
        </aside>
    )
}

function openSideNavStyle() {

    return [
        "sm:min-w-64",
        "h-screen",
        "bg-[#FF9F1C]"
    ].join(' ')
}

function closedSideNavStyle() {

    return [
        "w-fit",
        "h-screen",
        "bg-[#FF9F1C]"
    ].join(' ')
}