import { useContext } from "react"
import { modalContext } from "../contexts/ModalContext";

// TODO: Update all modal usage instances to use this hook instead of the old boilerplate code.

export function useModal() {
    const context = useContext(modalContext)

    if (!context) {
        throw new Error("useModal must be used within a ModalContext")
    }

    return context
}