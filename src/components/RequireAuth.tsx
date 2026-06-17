export default function RequireAuth({ children } : { children: React.ReactNode }) {

    // Check header for accessToken
    // If accessToken exists
        // Verify accessToken validity
        // If accessToken is valid
            // Display page as child component
        // Else if accessToken is invalid
            // Redirect back to /sign-in
}