import { useEffect } from 'react'

type useModalCloseProps = {
    ref: React.RefObject<Element | null>,
    callback: (isOutOfBounds: boolean) => void
}

/**
 * A custom hook that closes a floating element if a click is done outside its boundary
 * @param {React.RefObject} ref - A useRef object that refers to the component that will be check if a click was done outside its boundary
 * @param { function } callback - A callback function that will be invoked when a click event happens
 */
export default function useModalClose(ref: React.RefObject<Element | null>, callback: (isOutOfBounds: boolean) => void) {

    useEffect(() => {

        const checkCursorPlacement = (event: MouseEvent) => {

            if (ref.current && !ref.current.contains(event.target as Node)) callback(true)
            else callback(false)
        }

        document.addEventListener("mousedown", checkCursorPlacement)

        return (() => {

            document.removeEventListener("mousedown", checkCursorPlacement)
        })
    }, [])
}