import { useState, createContext, type SetStateAction } from "react"
import Toast from "../components/composites/Toast"

type ToastContextProps = {

    type: "success" | "warning" | "error",
    header: string,
    message?: string,
}

interface IToastContext {
    toastProps: ToastContextProps,
    isToastOpen: boolean,
    setToastProps: React.Dispatch<SetStateAction<ToastContextProps>>
    setIsToastOpen: React.Dispatch<SetStateAction<boolean>>
}

const initialVal = {
    toastProps: {
        type: "success",
        header: ""
    } as ToastContextProps,
    isToastOpen: false,
    setIsToastOpen: () => {},
    setToastProps: (props: ToastContextProps) => {}
} as IToastContext

const toastContext = createContext(initialVal)

export default function ToastContext({ children } : { children: React.ReactNode }) {

    const [isToastOpen, setIsToastOpen] = useState(false)
    const [toastProps, setToastProps] = useState({
        type: "success",
        header: ""
    } as ToastContextProps)

    const onToastClose = () => setIsToastOpen(false)

    return (
        <>
            <toastContext.Provider value={{ toastProps, isToastOpen, setIsToastOpen, setToastProps }}>
                {children}
            </toastContext.Provider>

            {isToastOpen && (
                <Toast 
                type={toastProps.type}
                header={toastProps.header} 
                message={toastProps.message ?? ""}
                onClose={() => onToastClose()}
                />
            )}
        </>
    )
}