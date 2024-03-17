import React, { useEffect, useRef } from "react"
import { hiddenScroll } from '../utils/hiddenScroll'

function Modal({
    FormComponent
}) {
    
    const bodyRef = useRef(document.querySelector('body'))
    useEffect(() => {
        hiddenScroll(true, bodyRef)
        return () => hiddenScroll(false, bodyRef)
    }, [])

    return (
        <div className="modal">
            <div className="modal__wrapper">
                {FormComponent}
            </div>
        </div>
    )
}
export default Modal