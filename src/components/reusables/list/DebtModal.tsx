import type { Debt } from "../../../types/UserTypes"

type DebtModalProps = { 
    entry?: Debt, 
    mode: "add" | "update" | "view", 
    onSubmit: (entry: Debt) => void 
    onClose: () => void
}

export default function DebtModal({ entry, mode, onSubmit, onClose } : DebtModalProps) {

    return (<></>)
}