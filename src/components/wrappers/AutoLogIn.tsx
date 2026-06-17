import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { authenticate } from "../../utils/auth-utils"
import Loading from "../reusables/Loading"

export default function AutoLogIn({ children } : { children: React.ReactNode }) {

    const [isVerifying, setIsVerifying] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {

        const cookie = document.cookie

        const verify = async () => {

            const token = cookie.split('=')[1]
            const res = await authenticate(token)

            if (res.status === 200) navigate('/dashboard')
            else setIsVerifying(false)
        }

        if (cookie && cookie != "") verify()
        else setIsVerifying(false)
    })

    if (isVerifying) return <Loading />
    return children
}