import { FaTimes } from "react-icons/fa";

//DaisyUi Toast
export default function Toast({message, hide}) {
    return <div className="toast">
    <div className="alert alert-info relative">
    <button className="absolute top-1 right-1 text-sm" onClick={() => hide()}><FaTimes /></button>
      <span>{message}</span>
    </div>
  </div>
}