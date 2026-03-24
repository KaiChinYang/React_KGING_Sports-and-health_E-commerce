import { useDispatch, useSelector } from "react-redux";
import { removeMessage } from "../slice/messageSlice";
import '../styles/messageToast.css'

export default function MessageToast() {
  const messages = useSelector((state) => state.message);
  const dispatch = useDispatch();

  return (
    <div className="kging-glass-toast-container">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`kging-glass-toast ${
            message.type === "success" ? "is-success" : "is-danger"
          }`}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="kging-glass-toast-glow"></div>

          <div className="kging-glass-toast-header">
            <div className="kging-glass-toast-badge">
              <span className="kging-glass-toast-dot"></span>
            </div>

            <div className="kging-glass-toast-content">
              <h6 className="kging-glass-toast-title">{message.title}</h6>
              <p className="kging-glass-toast-text">{message.text}</p>
            </div>

            <button
              type="button"
              className="kging-glass-toast-close"
              aria-label="Close"
              onClick={() => dispatch(removeMessage(message.id))}
            >
              ×
            </button>
          </div>

          <div className="kging-glass-toast-shine"></div>
        </div>
      ))}
    </div>
  );
}
