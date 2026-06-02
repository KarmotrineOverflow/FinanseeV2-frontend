import { createContext } from "react";
import type { User } from "../types/UserTypes";

// TODO:
//  - Create a context hook that will store the signed in user information (I forgot how the useContext hook works again 🤦‍♂️)
//  - Create routes for the sign in page
//  - Create a landing picker component. If no user information in context, redirect to sign in, else dashboard
const userContext = createContext<User | null>(null)

export default function UserContext() {

    return 
}