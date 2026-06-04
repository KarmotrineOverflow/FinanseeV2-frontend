import { useRef, useState } from 'react'
import { Mail, RectangleEllipsis } from 'lucide-react'
import InputField from "../../components/forms/InputField";
import InputSubmit from "../../components/forms/InputSubmit";
import Card from '../../components/composites/Card';
import { Link } from 'react-router-dom';

import { validateField } from '../../utils/form-utils';

type SignInFormData = {
    email: string,
    password: string
}

export default function SignIn() {

    const formData = useRef({ email: "", password: "" } as SignInFormData)
    const emailErrorMessage = useRef("")
    const passwordErrorMessage = useRef("")

    const [isEmailValid, setIsEmailValid] = useState(true)
    const [isPasswordValid, setIsPasswordValid] = useState(true)

    const onChange = (e?: React.ChangeEvent<HTMLInputElement>) => {

        const { type, value } = e?.target as HTMLInputElement
        
        switch (type) {
            
            case "email":
                formData.current.email = value
                break
            case "password":
                formData.current.password = value
                break
        }
    }

    const onSubmit = (e: React.SubmitEvent) => {

        e.preventDefault()

        const emailValid = validateField("email", formData.current.email)
        const passwordValid = validateField("password", formData.current.password)

        if (!emailValid) {
            emailErrorMessage.current = "Invalid email format."
            setIsEmailValid(false)            
        }

        if (!passwordValid) {
            passwordErrorMessage.current = "You have entered an incorrect password."
            setIsPasswordValid(false)            
        }

        // API call here to authenticate user and retrieve user data once initial checks pass
    }

    return (
        <div className="w-screen h-full min-h-screen flex flex-col justify-between relative">

            {/* Spans for rendering the colored corner designs */}
            {/* Top corner flag */}
            {/* Main box */}
            <span className="absolute z-20 w-96 h-96 rotate-45 -top-56 -right-56 overflow-hidden">                
                <div className="w-full h-full bg-[#FF9F1C] overflow-hidden" />                                
            </span>
            {/* Box shade */}
            <span className="absolute z-10 w-96 h-96 rotate-45 -top-52 -right-52 overflow-hidden">                
                <div className="w-full h-full bg-[#FFBF69]  overflow-hidden" />                                
            </span>

            {/* Bottom corner flag */}
            {/* Main box */}
            <span className="absolute z-20 w-96 rotate-45 h-96 -bottom-56 -left-56 overflow-hidden">                
                <div className="w-full h-full bg-[#2EC4B6]  overflow-hidden" />                                
            </span>
            {/* Box shade */}
            <span className="absolute z-10 w-96 h-96 rotate-45 -bottom-52 -left-52 overflow-hidden">                
                <div className="w-full h-full bg-[#CBF3F0] overflow-hidden" />                                
            </span>

            <header className="py-4 mx-36">
                <img src="/finansee_logo.png" className="w-36  h-16 "/>                
            </header>

            <main className="mx-36 z-50 flex flex-col-reverse my-12 lg:flex-row lg:my-0 justify-self-end align-middle gap-4">
                <div className="lg:w-[50vw] px-4 flex flex-col justify-center">
                    <img src="/resources/pf_vector.png" className='p-0 m-0 w-96 h-56 self-center' />
                    <h1 className='p-0 mb-8 text-black font-bold text-[28px]'>Personal finance made easy and accessible any time, anywhere.</h1>
                    <p className='font-light text-[18px]'>Easily track your financial standing, make better financial decisions, and be alerted with financial obligations. </p>
                    <p className='font-light text-[18px]'>Have the riches you have always dreamed of!</p>
                </div>
                <div className="mx-4 lg:w-[50vw]">     
                    <Card hasBorders>
                        <div className='px-8 py-12'>
                            <p className="text-start text-[32px] text-black font-medium">Login</p>
                            <form onSubmit={onSubmit} className="mt-8 flex flex-col justify-start gap-2">                        
                                <InputField 
                                    label="Email Address" 
                                    type="email" 
                                    errorMessage={emailErrorMessage.current} 
                                    isValid={isEmailValid}
                                    onChange={(e) => { onChange(e); setIsEmailValid(true) }}
                                    icon={<Mail size={18} strokeWidth={2} className='h-auto'/>}
                                />
                                <InputField 
                                    label="Password" 
                                    type="password" 
                                    errorMessage={passwordErrorMessage.current} 
                                    isValid={isPasswordValid}
                                    onChange={(e) => { onChange(e); setIsPasswordValid(true) }}
                                    icon={<RectangleEllipsis size={18} className='h-auto' />}
                                />

                                <span>
                                    <InputSubmit label={"Login"} />
                                </span>                                
                            </form>

                            <p className="text-[16px] pt-8">No account yet? <Link to="/sign-up" className="underline text-[#FFBF69] cursor-pointer">Sign up.</Link></p>
                        </div>
                    </Card>                                   
                </div>
            </main>

            <footer>

            </footer>
        </div>
    )
}