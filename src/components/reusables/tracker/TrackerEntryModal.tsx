import { useState, useRef } from "react"
import { PenBoxIcon, XIcon } from "lucide-react"
import InputField from "../../forms/InputField"
import Modal from "../../composites/Modal"

import type { TrackerEntry } from "../../../types/UserTypes"

type TrackerEntryModalProps = { 
    entry?: TrackerEntry, 
    mode: "add" | "update" | "view", 
    onSubmit: (entry: TrackerEntry) => void 
    onClose: () => void
}


export default function TrackerEntryModal({ entry, mode, onSubmit, onClose } : TrackerEntryModalProps) {

    const [modalMode, setModalMode] = useState(mode)
    const [isAmountValid, setIsAmountValid] = useState(true)

    const amountValue = useRef(1)

    // TODO: Finish the logic of this modal component
    // Extract this component to its own file so the main tracker page can use it to for adding new entries

    const handleSubmit = (e: React.SubmitEvent) => {

        e.preventDefault()

        if (amountValue.current < 1) {
            setIsAmountValid(false)
            return
        } 
    }

    return (
        <Modal onClose={onClose}>
            <div className="p-2">
                {modalMode === "add" && (
                    <h2>Add New Entry</h2>
                )}
                
                {modalMode === "update" && (
                    <h2>Add New Entry</h2>
                )}

                {modalMode === "view" && (
                    <h2>Add New Entry</h2>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="w-full mt-4 grid grid-cols-2">
                        <InputField 
                        label="Amount"
                        isValid={isAmountValid}
                        errorMessage="Amount must be greater than 0."
                        type="number" 
                        readOnly={modalMode === "view"}
                        placeholder={(entry ? entry.amount.toString() : "0")}
                        onChange={(e) => amountValue.current = parseFloat(e.target.value)}
                        />
                    </div>

                    <span className="w-full mt-4 inline-flex justify-end">
                        {modalMode === "view" && (
                            <button
                            onClick={() => setModalMode("update")} 
                            className="inline-flex gap-1 px-1"
                            >
                                <PenBoxIcon size={14} />
                                <p className="text-[14px]">Edit Entry</p>
                            </button>
                        )}

                        {modalMode === "update" && (
                            <button 
                            onClick={() => { amountValue.current = entry!.amount; setModalMode("view")  }}
                            className="inline-flex gap-1 px-1"
                            >
                                <XIcon size={14} />
                                <p className="text-[14px]">Cancel</p>
                            </button>
                        )}

                        {(modalMode === "update" || modalMode === "add") && (
                            <input type="submit" />
                        )}

                        <button 
                        onClick={() => onClose()}
                        className="inline-flex gap-1 px-1.5 rounded-sm bg-red-800"
                        >
                            <XIcon size={14} color="#fff" className="h-auto" />
                            <p className="text-[14px] text-white cursor-pointer">Close</p>
                        </button>
                    </span>                    
                </form>
            </div>
        </Modal>
    )
}