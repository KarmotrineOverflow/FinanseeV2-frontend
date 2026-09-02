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

