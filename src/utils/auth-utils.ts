import type { SignInFormData, SignUpFormData } from "../types/FormDataTypes";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

type UserCreationResponse = {
    statusCode: number,
    message: string
}

export async function createUser(userData: SignUpFormData) {

    // Add this code block back in when ready for backend testing
    /* const res = await fetch(`${BACKEND_URL}/create-user`, {
        headers: new Headers({ "Content-Type": "application/json" }),
        method: "POST",
        body: JSON.stringify(userData)
    })

    return await res.json() as UserCreationResponse */

    // Using setTimeout for now to simulate async process
    // Replace isActionSuccess value to simulate success/error results
    const isActionSuccess = true
    const result: UserCreationResponse = (isActionSuccess)
        ? { statusCode: 201, message: "User created successfully." }
        : { statusCode: 500, message: "Something went wrong. Please try again." }

    return new Promise((resolve: (value: UserCreationResponse) => void) => {

        setTimeout(() => { resolve(result) }, 5000)
    })
}

export async function authenticate(credentials: SignInFormData) {

    
}