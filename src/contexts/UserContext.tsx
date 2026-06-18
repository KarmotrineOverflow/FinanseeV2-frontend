import { createContext, useState } from "react";
import type { Dispatch, SetStateAction } from 'react'
import type { User } from "../types/UserTypes";

interface UserContextInterface {

    user: User | null,
    setUser: Dispatch<SetStateAction<User | null>>
}

export const userContext = createContext({
    user: null,
    setUser: (user: User | null) => {}
} as UserContextInterface)

export default function UserContext({ children } : { children: React.ReactNode }) {

    const [user, setUser] = useState<User | null>(null)

    return (
        <userContext.Provider value={{ user, setUser }}>
            {children}
        </userContext.Provider>
    )
}