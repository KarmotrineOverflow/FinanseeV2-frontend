import { useNavigate } from "react-router-dom";
import { LogOut, Settings, SquareChevronLeftIcon, SquareChevronRightIcon } from "lucide-react";

export default function SideNav({ children, isOpen, toggleOpen } : { children: React.ReactNode, isOpen: boolean, toggleOpen: () => void }) {    

    const navigate = useNavigate()

    const handleLogOut = () => {

        const cookies = document.cookie.split(";")

        for (const cookie of cookies) {

            document.cookie = cookie + "=;expires=" + new Date(0).toUTCString();
            navigate('/sign-in')
        }
    }   

    return (
        <aside className={(isOpen) ? openSideNavStyle() : closedSideNavStyle()}>
            <nav className="h-full grid grid-cols-1 grid-rows-[max-content_1fr]">
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

                {/* Nav for main pages */} 
                <ul>
                    { children }
                </ul>

                {/* Static nav for logout and settings. This will always be shown at the bottom of the nav */}
                <ul>
                    <hr className="text-white" />
                    <li className="w-full">
                        <button
                        className={`px-4 w-full p-2 flex align-middle gap-2 text-white cursor-pointer hover:bg-[#FFBF69]`}
                        >
                            <Settings />
                            {isOpen && <p className="font-semibold text-[16px]">Settings</p>}                
                        </button>
                    </li>
                    <li className="w-full">
                        <button
                        onClick={() => handleLogOut()}
                        className={`px-4 w-full p-2 flex align-middle gap-2 text-white cursor-pointer hover:bg-[#FFBF69]`}
                        >
                            <LogOut />
                            {isOpen && <p className="font-semibold text-[16px]">Log Out</p>}                
                        </button>
                    </li>
                </ul>                                  
            </nav>
        </aside>
    )
}

function openSideNavStyle() {

    return [            
        "sm:min-w-56",
        "h-full",
        "bg-[#FF9F1C]"
    ].join(' ')
}

function closedSideNavStyle() {

    return [
        "w-fit",
        "h-full",
        "bg-[#FF9F1C]"
    ].join(' ')
}