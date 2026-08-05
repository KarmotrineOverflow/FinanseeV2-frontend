import { useState, useRef } from "react"
import { BanIcon, MenuIcon, CalendarCheck2Icon, CoinsIcon, PenBoxIcon, WalletMinimalIcon, XIcon, CaptionsIcon } from "lucide-react"
import InputField from "../../forms/InputField"
import Modal from "../../composites/Modal"

import type { MonthlyDue } from "../../../types/UserTypes"
import InputTextArea from "../../forms/InputTextArea"

type MonthlyDueModalProps = { 
    entry?: MonthlyDue, 
    mode: "add" | "update" | "view", 
    onSubmit: (entry: MonthlyDue) => void 
    onClose: () => void
}


export default function MonthlyDueModal({ entry, mode, onSubmit, onClose } : MonthlyDueModalProps) {

    const [modalMode, setModalMode] = useState(mode)

    const amountValue = useRef(1)

    const handleSubmit = (e: React.SubmitEvent) => {

        e.preventDefault() 
        
        // TODO: Finish the definition of this func
        // Collect the field values and store in a MonthlyDue obj


        // Call onSubmit with field vals as arg
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
                        label="Name"
                        icon={ <CaptionsIcon size={18} className="h-auto" /> }
                        isValid={true}                        
                        type="text"
                        readOnly={modalMode === "view"}
                        placeholder={(entry ? entry.name : "")}                        
                        />

                        <InputField 
                        label="Amount"
                        icon={ <CoinsIcon size={18} className="h-auto" /> }
                        isValid={true}
                        errorMessage="Amount must be greater than 0."
                        type="number" 
                        readOnly={modalMode === "view"}
                        placeholder={(entry ? entry.amount.toString() : "0")}
                        onChange={(e) => amountValue.current = parseFloat(e.target.value)}
                        />

                        <InputField 
                        label="Due Date"
                        icon={ <CalendarCheck2Icon size={18} className="h-auto" /> }
                        isValid={true}
                        errorMessage=""
                        type="date" 
                        readOnly={modalMode === "view"}
                        placeholder={(entry ? entry.date : "0")}                        
                        />

                        {/* TODO: Have to replace this with a taxonomy component */}
                        <InputField 
                        label="Categories"
                        icon={ <MenuIcon size={18} className="h-auto" /> }
                        isValid={true}
                        errorMessage=""
                        type="text" 
                        readOnly={modalMode === "view"}                                   
                        />

                        <span className="col-span-2">
                            <InputTextArea label="Description" readOnly={modalMode === "view"} />
                        </span>                                              
                    </div>

                    {/* --- Form Buttons --- */}

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
                            <input 
                            type="submit" 
                            value="Submit"
                            className="text-[14px] text-white cursor-pointer inline-flex gap-1 px-1.5 rounded-sm bg-green-800 focus:outline-0" 
                            />
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