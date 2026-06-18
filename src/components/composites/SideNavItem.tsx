import { Link, useLocation } from "react-router-dom"

export default function SideNavItem({ label, path, icon } : { label: string, path: string, icon: React.ReactNode }) {

    const location = useLocation()

    return (
        <li className="w-full">
            <Link to={path} 
            className={`${(location.pathname.includes(path)) ? selectedItemStyle() : defaultItemStyle()}`}
            >
                {icon}
                {label}
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
        "gap-4"
    ].join(" ")
}

function defaultItemStyle() {

    return `${baseItemStyle()} ${
        [
            "bg-transparent",
            "hover: bg-[#FFBF69]"
        ].join(" ")
    }`
}

function selectedItemStyle() {

    return `${baseItemStyle()} ${
        [
            "bg-[#FFBF69]",
            "hover: bg-transparent"
        ].join(" ")
    }`
}