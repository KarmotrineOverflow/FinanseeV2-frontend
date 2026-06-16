import type { SignInFormData, SignUpFormData } from "../types/FormDataTypes";
import type { User } from "../types/UserTypes";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

type UserCreationResponse = {
    status: number,
    statusText: string
}

type UserAuthenticationResponse = {
    statusCode: number,
    statusText: string,
    userData?: User
}

export async function createUser(userData: SignUpFormData) {

    // Add this code block back in when ready for backend testing
    const res = await fetch(`${BACKEND_URL}/sign-up`, {
        headers: new Headers({ "Content-Type": "application/json" }),
        method: "POST",
        body: JSON.stringify(userData)
    })

    console.log(res)

    // Handle unexpected statuses that does not get formatted to UserCreationResponse with custom message
    if (![201, 500].includes(res.status)) {

        switch (res.status) {

            case 404:
                return { status: res.status, statusText: "There was an error while trying to reaching the server. Please try again."} as UserCreationResponse            
            default:
                return { status: 500, statusText: "An error occured. Please try again."} as UserCreationResponse
        }
    }

    return await res.json() as UserCreationResponse
    
    // Using setTimeout for now to simulate async process
    // Replace isActionSuccess value to simulate success/error results
    /* const isActionSuccess = true
    const result: UserCreationResponse = (isActionSuccess)
        ? { status: 201, statusText: "User created successfully." }
        : { status: 500, statusText: "Something went wrong. Please try again." }

    return new Promise((resolve: (value: UserCreationResponse) => void) => {

        setTimeout(() => { resolve(result) }, 5000)
    }) */
}

export async function loginUser(credentials: SignInFormData) {

    // Add this code block back in when ready for backend testing
    const res = await fetch(`${BACKEND_URL}/sign-in`, {
        headers: new Headers({ "Content-Type": "application/json" }),
        method: "POST",
        body: JSON.stringify(credentials)
    })

    return await res.json() as UserAuthenticationResponse 

    // Using setTimeout for now to simulate async process
    // Replace isActionSuccess value to simulate success/error results
   /*  const isActionSuccess = false
    const result: UserAuthenticationResponse = (isActionSuccess)
        ? { statusCode: 302}
        : { statusCode: 400}

    return new Promise((resolve: (value: UserAuthenticationResponse) => void) => {

        setTimeout(() => { resolve(result) }, 5000)
    }) */
}

export async function authenticate() {


}