import type React from "react";

export default function Card({ children, hasBorders } : { children: React.ReactNode, hasBorders?: boolean }) {

    return (
        <div className={`w-auto h-auto bg-white shadow-md rounded-md ${hasBorders && "border border-[#FFBF69]"}`}>
            {children}
        </div>
    )
}