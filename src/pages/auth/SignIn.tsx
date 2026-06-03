import { Mail, RectangleEllipsis } from 'lucide-react'
import InputField from "../../components/forms/InputField";
import InputSubmit from "../../components/forms/InputSubmit";

export default function SignIn() {

    // NEXT STEPS:
    // - Custom appropriate error messages for input field type
    // - When invalid data is received, show red error message (check proto)
    // - Get sign in vector
    // - Get platform logo
    // - Separate the Login form card to its own component with goldenBorder property (reuse it for the Sign in and Dashboard elements)

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
                <img src="/resources/finansee-logo-light.png" className="w-4 h-4"/>                
            </header>

            <main className="mx-36 z-50 flex sm:flex-col justify-self-end lg:flex-row align-middle gap-4">
                <div className="flex flex-col justify-center">
                    
                    <h1 className='my-8 text-black font-bold text-[38px]'>Personal finance made easy and accessible any time, anywhere.</h1>
                    <p>Easily track your financial standing, make better financial decisions, and be alerted with financial obligations. </p>
                    <p>Have the riches you have always dreamed of!</p>
                </div>
                <div className="px-8 py-12 mx-4 bg-white shadow-md rounded-md border border-[#FFBF69]">                    
                    <p className="text-start text-[32px] text-black font-medium">Login</p>
                    <form className="mt-8 flex flex-col justify-start gap-2">                        
                        <InputField label="Email Address" type="email" icon={<Mail size={18} strokeWidth={2} className='h-auto'/>}/>
                        <InputField label="Password" type="password" icon={<RectangleEllipsis size={18} className='h-auto' />}/>
                        <InputSubmit label={"Login"} />
                    </form>

                    <p className="text-[16px] pt-8">No account yet? <button className="underline text-[#FFBF69] cursor-pointer">Sign up.</button></p>
                </div>
            </main>

            <footer>

            </footer>
        </div>
    )
}