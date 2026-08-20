import { createContext, useState, type ReactNode } from "react"
import Modal from "../components/composites/Modal";

type ModalContent = {
    content: ReactNode,
    onClose: () => void,
    onAction?: () => void,
}

interface IModalContext {
    modalContent: ModalContent | null,
    setModalContent: (content: ModalContent | null) => void,
    isModalOpen: boolean,
    setIsModalOpen: (isOpen: boolean) => void
}

const initialVal = {
    modalContent: null,
    setModalContent: () => {},
    isModalOpen: false,
    setIsModalOpen: () => {}
} as IModalContext

const modalContext = createContext(initialVal)

export default function ModalContext({ children } : { children: ReactNode }) {

    const [modalContent, setModalContent] = useState<ModalContent | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    // TODO: Turn the modal component into a context provider so it can be used
    // anywhere with least boilerplate code

    // I don't think there's a way to pass a callback function from a child component.
    // Might fall back to executing the desired output/function in the given content component instead of 
    // passing a callback function.
    return (
        <modalContext.Provider value={{ modalContent, setModalContent, isModalOpen, setIsModalOpen }}>
            {children}

            {isModalOpen && modalContent && (
                <Modal onClose={() => {                    
                    setIsModalOpen(false)
                }}>
                    {modalContent.content}
                </Modal>
            )}
        </modalContext.Provider>
    )
}

export { modalContext }

