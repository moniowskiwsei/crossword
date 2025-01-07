import { FaTimes } from "react-icons/fa";

//DaisyUi modal
export default function Modal({ children, id, showModal = false, hideModal}) {

    const hide = () => {
        document.getElementById(id).close()
        hideModal()
    }
    return <>
        <dialog id={id} className="modal" open={showModal}>
            <div className="modal-box relative bg-base-300 pt-10">
                <button type="button" className="text-xl absolute top-3 right-3" onClick={() => hide()}><FaTimes /></button>
                {children}
            </div>
            <div method="dialog" className="modal-backdrop">
            </div>
        </dialog>
    </>
}