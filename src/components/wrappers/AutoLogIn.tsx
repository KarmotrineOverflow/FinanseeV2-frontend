export default async function AutoLogIn({ children } : { children: React.ReactNode }) {

    const cookie = document.cookie

    if (cookie && cookie != "") {

        // TODO: Backend has API ready for authenticating, just pass the whole document cookie.
        // Await backend response before displaying children or navigating to /dashboard
        const accessToken = cookie.split("=")[1]

        // Verify validity of retrieved access token
        // If still valid, redirect to /dashboard
    }
}