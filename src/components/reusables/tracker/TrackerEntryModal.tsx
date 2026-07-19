import { useState, useRef } from "react"
import { BanIcon, CalendarIcon, CoinsIcon, PenBoxIcon, WalletMinimalIcon, XIcon } from "lucide-react"
import InputField from "../../forms/InputField"
import Modal from "../../composites/Modal"

import type { TrackerEntry } from "../../../types/UserTypes"
import Card from "../../composites/Card"
import InputTextArea from "../../forms/InputTextArea"

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
                    <h2>Update Entry</h2>
                )}

                {modalMode === "view" && (
                    <h2>View Entry</h2>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="w-full mt-4 grid grid-cols-2 gap-4">
                        <InputField 
                        label="Amount"
                        icon={ <CoinsIcon size={18} className="h-auto" /> }
                        isValid={isAmountValid}
                        errorMessage="Amount must be greater than 0."
                        type="number" 
                        readOnly={modalMode === "view"}
                        placeholder={(entry ? entry.amount.toString() : "0")}
                        onChange={(e) => amountValue.current = parseFloat(e.target.value)}
                        />

                        <InputField 
                        label="Allocation"
                        icon={ <WalletMinimalIcon size={18} className="h-auto" /> }
                        isValid={isAmountValid}
                        errorMessage="Amount must be greater than 0."
                        type="text" 
                        readOnly={modalMode === "view"}
                        placeholder={(entry ? entry.amount.toString() : "0")}
                        onChange={(e) => amountValue.current = parseFloat(e.target.value)}
                        />

                        <InputField 
                        label="Date"
                        icon={ <CalendarIcon size={18} className="h-auto" /> }
                        isValid={isAmountValid}
                        errorMessage="Amount must be greater than 0."
                        type="date" 
                        readOnly={modalMode === "view"}
                        placeholder={(entry ? entry.amount.toString() : "0")}
                        onChange={(e) => amountValue.current = parseFloat(e.target.value)}
                        />

                        <span className="col-span-2">
                            <InputTextArea label="Description" readOnly={modalMode === "view"} />
                        </span>                                              
                    </div>

                    <span className="w-full mt-4 inline-flex justify-end gap-2">
                        {modalMode === "view" && (
                            <button
                            onClick={() => setModalMode("update")} 
                            className="inline-flex gap-1 px-1.5 rounded-sm bg-green-400 cursor-pointer"
                            >
                                <PenBoxIcon size={14} color="#fff" className="h-auto" />
                                <p className="text-[14px] text-white">Edit Entry</p>
                            </button>
                        )}

                        {modalMode === "update" && (
                            <button 
                            onClick={() => { amountValue.current = entry!.amount; setModalMode("view")  }}
                            className="inline-flex gap-1 px-1.5 rounded-sm bg-orange-400 cursor-pointer"
                            >
                                <BanIcon size={14} color="#fff" className="h-auto" />
                                <p className="text-[14px] text-white">Cancel</p>
                            </button>
                        )}

                        {(modalMode === "update" || modalMode === "add") && (
                            <input type="submit" className="text-[14px] text-white cursor-pointer inline-flex gap-1 px-1.5 rounded-sm bg-green-800" />
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