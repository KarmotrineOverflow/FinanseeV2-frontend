import { useState, useRef, useContext } from "react"
import { 
    BanIcon, 
    MenuIcon, 
    CalendarCheck2Icon, 
    CoinsIcon, 
    PenBoxIcon, 
    XIcon, 
    CaptionsIcon 
} from "lucide-react"
import { toastContext } from "../../../contexts/ToastContext"
import InputField from "../../forms/InputField"
import Modal from "../../composites/Modal"
import InputTextArea from "../../forms/InputTextArea"
import Taxonomy from "../../forms/Taxonomy"
import { MONTHLY_DUE_FILTERS } from "../../../constants/filter_constants"
import { addEntry, updateEntry } from "../../../utils/monthly-due-utils"

import type { MonthlyDue } from "../../../types/UserTypes"

type MonthlyDueModalProps = { 
    entry?: MonthlyDue, 
    mode: "add" | "update" | "view", 
    onClose: () => void
}

export default function MonthlyDueModal({ entry, mode, onClose } : MonthlyDueModalProps) {

    const initialData = entry ?? {
        _id: "",
        name: "",
        amount: 0,
        isPaid: false,
        date: "",
        categories: [],
        description: ""
    } as MonthlyDue

    const toast = useContext(toastContext)
    const { setIsToastOpen, setToastProps } = toast

    const [modalMode, setModalMode] = useState(mode)
    const [capturedData, setCapturedData] = useState(initialData)        

    const amountValue = useRef(1)

    const handleDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

        const inputType = e.target.name
        const newValue = e.target.value

        setCapturedData((prevState) => { return {...prevState, [inputType]: newValue} })
    }

    const handleTaxonomyChange = (selectedOptions: string[])  => {

        setCapturedData((prevState) => { return {...prevState, category: selectedOptions} })
    }

    const handleSubmit = async (e: React.SubmitEvent) => {

        e.preventDefault() 
        
        // TODO: Will need to add "update" case here
        switch (modalMode) {

            case "add": {
                const res = await addEntry(capturedData)

                console.log(res)
                
                if (res === "success") {

                    setToastProps((prevState) => {
                        return {
                            ...prevState,
                            type: "success",
                            header: "Success",
                            message: "Your new monthly due entry has been added."
                        }
                    })                    
                    setIsToastOpen(true)
                    
                    onClose()
                } else {

                    setToastProps((prevState) => {
                        return {
                            ...prevState,
                            type: "error",
                            header: "An error has occured",
                            message: res
                        }
                    })                    
                    setIsToastOpen(true)
                }
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
                    <div className="w-full mt-4 grid grid-cols-2 gap-4">
                        <InputField 
                        label="Name"
                        name="name"
                        icon={ <CaptionsIcon size={18} className="h-auto" /> }
                        isValid={true}                        
                        type="text"
                        readOnly={modalMode === "view"}
                        placeholder={(entry ? entry.name : "")}     
                        onChange={() => handleDataChange}                   
                        />

                        <InputField 
                        label="Amount"
                        name="amount"
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
                        name="date"
                        icon={ <CalendarCheck2Icon size={18} className="h-auto" /> }
                        isValid={true}
                        errorMessage=""
                        type="date" 
                        readOnly={modalMode === "view"}
                        placeholder={(entry ? entry.date : "0")}                        
                        />
                        
                        <Taxonomy 
                        label="Categories"
                        values={MONTHLY_DUE_FILTERS}
                        icon={ <MenuIcon size={18} className="h-auto" /> }
                        readOnly={modalMode === "view"}      
                        onChange={handleTaxonomyChange}             
                        />

                        <span className="col-span-2">
                            <InputTextArea label="Description" name="description" readOnly={modalMode === "view"} />
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