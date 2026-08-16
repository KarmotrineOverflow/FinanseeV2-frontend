import { useState, useEffect, createContext } from "react"

export const windowContext = createContext(false)

export default function WindowContext({ children } : { children: React.ReactNode }) {

    const [isMobile, setIsMobile] = useState(window.outerWidth < 640)

    useEffect(() => {

        const handleResize = () => {

            if (window.outerWidth < 640) setIsMobile(true)
            else setIsMobile(false)
        }

        window.addEventListener("resize", handleResize)

        return () => {

            window.removeEventListener("resize", handleResize)
        }
    })

    return (
        <windowContext.Provider value={isMobile}>
            {children}
        </windowContext.Provider>
    )
}