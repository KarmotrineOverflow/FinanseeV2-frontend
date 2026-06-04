import { useRef, useState } from 'react'
import { Link } from "react-router-dom";
import { Asterisk, Calendar, Mail, Phone, User } from "lucide-react";
import Card from "../../components/composites/Card";
import InputField from "../../components/forms/InputField";
import InputSubmit from "../../components/forms/InputSubmit";

import { validateField } from '../../utils/form-utils';

// NEXT STEPS:
// - Simulate an async process with setTimeout then design the loading visuals for SignIn/SignUp pages
// - Create FE auth utils
// - Create API endpoints for auth

type SignUpFormData = {

    firstName: string,
    lastName: string,
    dateOfBirth: string,
    phoneNumber: string,
    email: string,
    password: string,
    confirmPassword: string
}

export default function SignUp() {

    const formData = useRef({
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        phoneNumber: "",
        email: "",
        password: "",
        confirmPassword: ""
    } as SignUpFormData)

    const firstNameErrMsg = useRef("")
    const lastNameErrMsg = useRef("")
    const dateOfBirthErrMsg = useRef("")
    const phoneNumberErrMsg = useRef("")
    const emailErrMsg = useRef("")
    const passwordErrMsg = useRef("")
    const confirmPasswordErrMsg = useRef("")

    const [isFirstNameValid, setIsFirstNameValid] = useState(true)
    const [isLastNameValid, setIsLastNameValid] = useState(true)
    const [isDateOfBirthValid, setIsDateOfBirthValid] = useState(true)
    const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true)
    const [isEmailValid, setIsEmailValid] = useState(true)
    const [isPasswordValid, setIsPasswordValid] = useState(true)
    const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true)

    const onChange = (e?: React.ChangeEvent<HTMLInputElement>) => {

        // Can't rely on type checking anymore because of 'Confirm Password' and 'Password' having the same type
        const { name, value } = e?.target as HTMLInputElement

        switch (name) {
            
            case "first-name":
                formData.current.firstName = value
                break
            case "last-name":
                formData.current.lastName = value
                break
            case "date-of-birth":
                formData.current.dateOfBirth = value
                break
            case "phone-number":
                formData.current.phoneNumber = value
                break
            case "email":
                formData.current.email = value
                break
            case "confirm-password":
                formData.current.confirmPassword = value
                break
            case "password":
                formData.current.password = value
                break
        }
    }

    const onSubmit = (e: React.SubmitEvent) => {
    
        e.preventDefault()

        // These validation checks are for patterns only. Additional conditions will be done later on
        const firstNameValid = validateField("first-name", formData.current.firstName)
        const lastNameValid = validateField("last-name", formData.current.lastName)
        const dateOfBirthValid = validateField("date-of-birth", formData.current.dateOfBirth)
        const phoneNumberValid = validateField("phone-number", formData.current.phoneNumber)
        const emailValid = validateField("email", formData.current.email)
        const passwordValid = validateField("password", formData.current.password)
        const confirmPasswordValid = validateField("confirm-password", formData.current.confirmPassword)

        console.log(firstNameValid)

        if (!firstNameValid) {
            firstNameErrMsg.current = "This field cannot be empty."
            setIsFirstNameValid(false)            
        }

        if (!lastNameValid) {
            lastNameErrMsg.current = "This field cannot be empty."
            setIsLastNameValid(false)            
        }

        if (!dateOfBirthValid) {
            dateOfBirthErrMsg.current = "This field cannot be empty."
            setIsDateOfBirthValid(false)            
        }

        if (!emailValid) {
            emailErrMsg.current = "Invalid email format."
            setIsEmailValid(false)            
        }

        if (!passwordValid) {
            passwordErrMsg.current = "Your password must be at least 8 characters long and must consist of at least 1 uppercase and lowercase letters, number, and special character."
            setIsPasswordValid(false)            
        }

        // Now for implementing additional conditions here
        if (formData.current.phoneNumber.length < 11) {
            phoneNumberErrMsg.current = "Your phone number must consist of 11 digits."
            setIsPhoneNumberValid(false)
        }

        if (formData.current.password != formData.current.confirmPassword) {
            confirmPasswordErrMsg.current = "Your password must match the one above."
            setIsConfirmPasswordValid(false)
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

            <main className="mx-36 z-50">
                <Card hasBorders>                  
                    <div className="py-12 px-8 flex flex-col">
                        <h1 className="mb-6 text-start text-[32px] font-bold text-black">Create New Account</h1>
                        <form 
                            onSubmit={onSubmit}
                            className="w-full flex flex-col"
                        >
                            <div className='w-full flex flex-col gap-2 lg:flex-row lg:gap-12'>
                                {/* Left/first InputField batch */}
                                <div className="w-full flex flex-col gap-2"> 
                                    <InputField 
                                        label="First Name"
                                        name="first-name"
                                        type="text"
                                        errorMessage={firstNameErrMsg.current}
                                        isValid={isFirstNameValid}
                                        onChange={(e) => { onChange(e); setIsFirstNameValid(true) }}
                                        icon={<User size={18} className="h-auto"/>}                            
                                    />

                                    <InputField 
                                        label="Last Name"
                                        name="last-name"
                                        type="text"
                                        errorMessage={lastNameErrMsg.current}
                                        isValid={isLastNameValid}
                                        onChange={(e) => { onChange(e); setIsLastNameValid(true) }}
                                        icon={<User size={18} className="h-auto"/>}
                                    />

                                    <InputField 
                                        label="Date of Birth"
                                        name="date-of-birth"
                                        type="date"
                                        errorMessage={dateOfBirthErrMsg.current}
                                        isValid={isDateOfBirthValid}
                                        onChange={(e) => { onChange(e); setIsDateOfBirthValid(true) }}
                                        icon={<Calendar size={18} className="h-auto"/>}
                                    />
                                    
                                    <InputField 
                                        label="Phone Number"
                                        name="phone-number"
                                        type="number"                    
                                        errorMessage={phoneNumberErrMsg.current}            
                                        isValid={isPhoneNumberValid}
                                        onChange={(e) => { onChange(e); setIsPhoneNumberValid(true) }}
                                        icon={<Phone size={18} className="h-auto"/>}
                                    />
                                </div>

                                {/* Right/second InputField batch */}
                                <div className="w-full flex flex-col gap-2">
                                    <InputField 
                                        label="Email Address"
                                        name="email"
                                        type="email"
                                        errorMessage={emailErrMsg.current}
                                        isValid={isEmailValid}
                                        onChange={(e) => { onChange(e); setIsEmailValid(true) }}
                                        icon={<Mail size={18} className="h-auto"/>}
                                    />

                                    <InputField 
                                        label="Password"
                                        name="password"
                                        type="password"
                                        errorMessage={passwordErrMsg.current}
                                        isValid={isPasswordValid}
                                        onChange={(e) => { onChange(e); setIsPasswordValid(true) }}
                                        icon={<Asterisk size={18} className="h-auto"/>}
                                    />

                                    <InputField 
                                        label="Confirm Password"
                                        name="confirm-password"
                                        type="password"
                                        errorMessage={confirmPasswordErrMsg.current}
                                        isValid={isConfirmPasswordValid}
                                        onChange={(e) => { onChange(e); setIsConfirmPasswordValid(true) }}
                                        icon={<Asterisk size={18} className="h-auto"/>}
                                    />                
                                </div>      
                            </div>            

                            <span className="w-fit self-center lg:self-start">
                                <InputSubmit label="Sign Up"/>        
                            </span>                                                            
                        </form>                              

                        <p className="self-center lg:self-start text-[16px] pt-4">Already have an account? <Link to="/sign-in" className="underline text-[#FFBF69] cursor-pointer">Sign in.</Link></p>
                    </div>                                  
                </Card>
            </main>

            <footer>

            </footer>
        </div>
    )
}