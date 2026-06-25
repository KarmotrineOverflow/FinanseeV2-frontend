import { XCircle } from "lucide-react";

export default function Error({ message } : { message?: string }) {

    return (
        <div className="w-fit h-auto flex flex-col justify-center align-middle">
            <XCircle size={48} className="m-auto my-2 text-red-600" />
            {(message) ? message : "An error has occured. Please refresh the page to try again."}
        </div>
    )
}