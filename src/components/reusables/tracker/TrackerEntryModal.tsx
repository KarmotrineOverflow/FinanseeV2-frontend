import { useState, useRef, useContext } from "react"
import { BanIcon, CalendarIcon, CoinsIcon, PenBoxIcon, WalletMinimalIcon, XIcon } from "lucide-react"
import { toastContext, type ToastContextProps } from "../../../contexts/ToastContext"
import { 
    TRACKER_ENTRY_TYPES,
    ALLOCATION_TYPES
} from "../../../constants/filter_constants"
import { addEntry, updateEntry } from "../../../utils/tracker-utils"
import DropdownList from "../../forms/DropdownList"
import InputField from "../../forms/InputField"
import Modal from "../../composites/Modal"
import InputTextArea from "../../forms/InputTextArea"

import type { TrackerEntry } from "../../../types/UserTypes"

type TrackerEntryModalProps = { 
    entry?: TrackerEntry, 
    mode: "add" | "update" | "view", 
    type: "income" | "expense"
    onClose: () => void
}

export default function TrackerEntryModal({ entry, mode, type, onClose } : TrackerEntryModalProps) {

    const initialData = entry ?? {
        _id: "",
        name: "",
        type: "Income",
        amount: 0,
        isPaid: false,
        date: "",
        allocation: "Savings",
        description: ""
    } as TrackerEntry

    const toast = useContext(toastContext)
    const { setIsToastOpen, setToastProps } = toast

    const [modalMode, setModalMode] = useState(mode)
    const [capturedData, setCapturedData] = useState(initialData) 
    const [isAmountValid, setIsAmountValid] = useState(true)

    const handleDropdownChange = (value: string) => {

        setCapturedData((prevState) => { 
            return {
                ...prevState, 
                allocation: value as "Savings" | "Pocket Money" | "Emergency Fund"
            } 
        })     
    }

    const handleDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

        const inputType = e.target.name
        const newValue = e.target.value

        // Handle the validation inside here as well before actually setting the stored values
        if (inputType === "amount") if (parseInt(newValue) < 0) setIsAmountValid(false)

        setCapturedData((prevState) => { return {...prevState, [inputType]: newValue} })
    }

    const handleSubmit = async (e: React.SubmitEvent) => {

        e.preventDefault()

        switch (modalMode) {
        
            case "add": {
                const res = await addEntry(capturedData, type)
                
                const isSuccess = res === "success"

                showResultToast(
                    isSuccess, 
                    (isSuccess) ? "Your new entry has been added" : res,
                    { open: setIsToastOpen, props: setToastProps },
                    () => onClose()
                )

                break
            }    
            
            case "update": {

                const res = await updateEntry(capturedData, type)
                
                const isSuccess = res === "success"

                showResultToast(
                    isSuccess, 
                    (isSuccess) ? "The selected entry has been updated" : res,
                    { open: setIsToastOpen, props: setToastProps },
                    () => onClose()
                )

                break
            }
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
                    <div className="w-full mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <InputField 
                        label="Amount"
                        name="amount"
                        icon={ <CoinsIcon size={18} className="h-auto" /> }
                        isValid={isAmountValid}
                        errorMessage="Amount must be greater than 0."
                        type="number" 
                        readOnly={modalMode === "view"}
                        placeholder={(entry ? entry.amount.toString() : "0")}                       
                        onChange={() => handleDataChange} 
                        />
                                       
                        <DropdownList
                        label="Allocation"
                        defaultValue={capturedData.allocation}
                        choices={ALLOCATION_TYPES}
                        onChange={(value: string) => handleDropdownChange(value)}
                        readOnly={modalMode === "view"}
                        />

                        <InputField 
                        label="Date"
                        icon={ <CalendarIcon size={18} className="h-auto" /> }
                        isValid={isAmountValid}
                        errorMessage="Amount must be greater than 0."
                        type="date" 
                        readOnly={modalMode === "view"}
                        placeholder={(entry ? entry.amount.toString() : "0")} 
                        onChange={() => handleDataChange}                       
                        />

                        <span className="col-span-1 sm:col-span-2">
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
                            onClick={() => { setModalMode("view")  }}
                            className="inline-flex gap-1 px-1.5 rounded-sm bg-orange-400 cursor-pointer"
                            >
                                <BanIcon size={14} color="#fff" className="h-auto" />
                                <p className="text-[14px] text-white">Cancel</p>
                            </button>
                        )}

                        {(modalMode === "update" || modalMode === "add") && (
                            <input 
                            type="submit"                                                       
                            className="text-[14px] text-white cursor-pointer inline-flex gap-1 px-1.5 rounded-sm bg-green-800" 
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

function showResultToast(
    isSuccess: boolean, 
    message: string, 
    toastInterface: { 
        open: React.Dispatch<React.SetStateAction<boolean>>, 
        props: React.Dispatch<React.SetStateAction<ToastContextProps>> 
    },
    action?: () => void
) {    

    const { open, props } = toastInterface

    if (isSuccess) {        

        props((prevState) => {
            return {
                ...prevState,
                type: "success",
                header: "Success",
                message: message
            }
        })                    
        open(true)
    
        if (action) action()
    } else {

        props((prevState) => {
            return {
                ...prevState,
                type: "error",
                header: "An error has occured",
                message: message
            }
        })                    
        open(true)
    }
}