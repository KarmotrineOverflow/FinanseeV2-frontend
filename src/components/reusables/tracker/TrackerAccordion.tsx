import { useState } from "react"
import type { TrackerEntry } from "../../../types/UserTypes"
import TrackerAccordionEntry from "./TrackerAccordionEntry"

type TrackerAccordionProps = {
    data: TrackerEntry[],
    theme: "positive" | "negative"
}

export default function TrackerAccordion({ data, theme } : TrackerAccordionProps) {

    const [expandedEntry, setExpandedEntry] = useState<TrackerEntry | null>(null)

    return (
        <ul>
            {data.map(e => 
                <TrackerAccordionEntry 
                entry={e}
                theme={theme}
                isExpanded={expandedEntry != null && expandedEntry._id === e._id}
                onEntryClick={() => {
                    
                    if (expandedEntry != e) setExpandedEntry(e)
                    else setExpandedEntry(null)
                }}
                />
            )}
        </ul>
    )
}