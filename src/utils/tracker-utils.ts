import { useContext } from "react";
import { userContext } from "../contexts/UserContext";
import { reportContext } from "../contexts/ReportContext";

import type { TrackerEntry } from "../types/UserTypes";

// !! These functions expect a user data to be stored in UserContext !!

/**
 * Adds a new entry to the user's income or expense tracker for the current month
 * @param {TrackerEntry} entry - an object holding the values for the new entry
 * @param {string} type - a string that specifies which tracker list this entry goes to. Can either be `"income"` or `"expense"`
 * @returns `0` if the entry addition is successful. `1` if otherwise.
 */
export async function addEntry(entry: TrackerEntry, type: "income" | "expense") {

    try {

        const { user } = useContext(userContext)
        const userId = user!._id
        
        const accessToken = await cookieStore.get("accessToken")        

        const res = await fetch('/add-tracker-entry', {
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            method: 'POST',
            body: JSON.stringify({
                userId: userId,
                type: type,
                entry: entry
            })
        })

        if (res.ok) {
            
            // Once backend is updated, update the cached copy in the FE to render the changes
            
            return 0
        }
        return 1
    } catch (err) {

        console.log(err)
        return 1
    }
}

/**
 * Updates an entry in the user's specified tracker list for the current month
 * @param {TrackerEntry} entry - an object containing the ID of the entry to be updated and its new values
 * @param {string} type - a string that specifies which tracker list to do the operation in. Can either be `"income"` or `"expense"`
 * @returns `0` if the entry update is successful. `1` if otherwise.
 */
export async function updateEntry(entry: TrackerEntry, type: "income" | "expense") {

    try {

        const { user } = useContext(userContext)
        const userId = user!._id

        const accessToken = await cookieStore.get("accessToken")        

        const res = await fetch('/update-tracker-entry', {
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            method: 'PUT',
            body: JSON.stringify({
                userId: userId,
                type: type,
                entry: entry
            })
        })

        if (res.ok) return 0
        return 1
    } catch (err) {

        console.log(err)
        return 1
    }
}

/**
 * Deletes an entry in the user's specified tracker list for the current month
 * @param {string} entryId - a string representing the entry's unique ID
 * @param {string} type - a string that specifies which tracker list to do the operation in. Can either be `"income"` or `"expense"`
 * @returns `0` if the entry deletion is successful. `1` if otherwise.
 */
export async function deleteEntry(entryId: TrackerEntry, type: "income" | "expense") {

    try {

        const { user } = useContext(userContext)
        const userId = user!._id

        const accessToken = await cookieStore.get("accessToken")        

        const res = await fetch('/delete-tracker-entry', {
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            method: 'DELETE',
            body: JSON.stringify({
                userId: userId,
                type: type,
                entryId: entryId
            })
        })

        if (res.ok) return 0
        return 1
    } catch (err) {

        console.log(err)
        return 1
    }
}