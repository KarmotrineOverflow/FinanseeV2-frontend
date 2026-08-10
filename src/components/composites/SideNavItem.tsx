import { Link, useLocation } from "react-router-dom"

export default function SideNavItem({ 
    label, 
    path, 
    icon, 
    isExpanded, 
    isMobile,
    onMobileEvent
} : { 
    label: string, 
    path: string, 
    icon: React.ReactNode, 
    isExpanded: boolean, 
    isMobile: boolean,
    onMobileEvent: () => void
}) {

    const location = useLocation()

    return (
        <li className="w-full">
            
            {/* When on mobile view, we want to close the nav automatically when an item is selected */}
            <Link 
            to={path} 
            onClick={() => onMobileEvent()}
            className={`px-4 ${baseItemStyle()} ${(location.pathname.includes(path)) ? "side-nav-link active" : "side-nav-link"}`}
            >
                {icon}
                {isExpanded && <p className="font-semibold text-[16px]">{label}</p>}                
            </Link>
        </li>
    )
}

function baseItemStyle() {

    return [
        "w-full",
        "p-2",
        "flex",
        "align-middle",
        "gap-2",
        "text-white"
    ].join(" ")
}