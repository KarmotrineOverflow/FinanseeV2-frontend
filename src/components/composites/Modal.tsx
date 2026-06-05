import { createPortal } from "react-dom";
import Card from "./Card";
import { X } from "lucide-react";

export default function Modal({ children, onClose } : { children: React.ReactNode, onClose: () => void }) {

    return createPortal(
        /* Modal background to blur/disable page content while modal is open */
        <div className="absolute top-0 left-0 flex justify-center w-full h-full bg-black/50 z-50">
            {/* Actual modal content here */}
            <div className="m-auto max-w-[40vw] z-50">
                <Card hasBorders>
                    <div className="w-full p-4 flex flex-col">
                        <button onClick={() => onClose()} className="w-fit self-end cursor-pointer">
                            <X size={16} className="h-auto"/>
                        </button>
                        {children}
                    </div>            
                </Card>
            </div>   
        </div>             
    , document.getElementById("modal")!)
}