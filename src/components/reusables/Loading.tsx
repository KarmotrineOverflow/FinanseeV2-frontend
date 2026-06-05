import { Loader2 } from "lucide-react";

export default function Loading({ message } : { message?: string }) {

    return (
        <div className="w-fit h-auto flex flex-col justify-center align-middle">
            <Loader2 size={48} className="animate-spin m-auto my-2" />
            {(message) ? message : "Loading.."}
        </div>
    )
}