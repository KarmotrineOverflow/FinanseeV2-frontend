import { Loader2 } from "lucide-react";

export default function Loading({ message } : { message?: string }) {

    return (
        <div className="w-full h-96 flex flex-col justify-center align-middle">
            <Loader2 size={18} className="animate-spin" />
            {(message) ? message : "Loading.."}
        </div>
    )
}