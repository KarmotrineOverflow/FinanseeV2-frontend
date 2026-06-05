import { createPortal } from "react-dom";
import Card from "./Card";
import { X } from "lucide-react";

export default function Modal({ children, onClose } : { children: React.ReactNode, onClose: () => {} }) {

    return createPortal(
        <Card hasBorders>
            <div className="w-full p-2">
                <button onClick={() => onClose()} className="w-fit mr-0">
                    <X size={14} className="h-auto"/>
                </button>
                {children}
            </div>            
        </Card>
    , document.getElementById("modal")!)
}