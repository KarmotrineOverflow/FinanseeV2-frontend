import { useContext } from "react";
import { toastContext } from "../contexts/ToastContext";

export function useToast() {
    const context = useContext(toastContext)

    if (!context) {
        throw new Error("useToast must be used within a ToastProvider")
    }

    return context
}