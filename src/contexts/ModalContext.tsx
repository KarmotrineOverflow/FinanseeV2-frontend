import { createContext, useState, type ReactNode } from "react"
import Modal from "../components/composites/Modal";

type ModalContent = {
    content: ReactNode    
}

interface IModalContext {
    modalContent: ModalContent | null,
    setModalContent: (content: ModalContent | null) => void,    
}

const initialVal = {
    modalContent: null,
    setModalContent: () => {}
} as IModalContext

const modalContext = createContext(initialVal)

export default function ModalProvider({ children } : { children: ReactNode }) {

    const [modalContent, setModalContent] = useState<ModalContent | null>(null)    

    // TODO: Turn the modal component into a context provider so it can be used
    // anywhere with least boilerplate code

    // I don't think there's a way to pass a callback function from a child component.
    // Might fall back to executing the desired output/function in the given content component instead of 
    // passing a callback function.    

    // There is. Don't overthink it. Just pass the callback function as a prop to the content component.
    return (
        <modalContext.Provider value={{ modalContent, setModalContent}}>
            {children}
            {modalContent && (
                <Modal onClose={() => {                    
                    setModalContent(null)
                }}>
                    {modalContent.content}
                </Modal>
            )}
        </modalContext.Provider>
    )
}

export { modalContext }

