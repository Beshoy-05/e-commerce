import { useEffect, useRef, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./SupportChat.css";

function SupportChat() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      text: "Hello  Welcome to AURA Store. How can I help you today?",
      sender: "agent",
    },
  ]);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  async function sendMessage() {
    if (!message.trim() || loading) return;

    const userMessage = message;

    setMessages((prev) => [
      ...prev,
      {
        text: userMessage,
        sender: "user",
      },
    ]);

    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        "https://beshoy-05.app.n8n.cloud/webhook/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: userMessage,
            session_id: "user123",
          }),
        }
      );

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          text: data.reply,
          sender: "agent",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          text: "Something went wrong. Please try again.",
          sender: "agent",
        },
      ]);
    }

    setLoading(false);
  }

  return (
    <>
 
      <button
        className="chat-button shadow"
        onClick={() => setOpen(!open)}
      >
        <i className={`bi ${open ? "bi-x-circle-fill" : "bi-chat-dots-fill"} fs-4`}></i>
      </button>

      {open && (
        <div className="chat-window shadow-lg">

          <div className="chat-header">

            <div className="d-flex align-items-center">

              <div className="chat-avatar">
                <i className="bi bi-headset"></i>
              </div>

              <div className="ms-3">

                <h6 className="mb-0 fw-bold">
                  AURA Assistant
                </h6>

                <small className="d-flex align-items-center">
                  <i className="bi bi-circle-fill online-dot"></i>
                  Online
                </small>

              </div>

            </div>

            <button
              className="btn-close btn-close-white"
              onClick={() => setOpen(false)}
            ></button>

          </div>

          <div className="chat-body">

            {messages.map((msg, index) => (

              <div
                key={index}
                className={
                  msg.sender === "user"
                    ? "message-row user"
                    : "message-row agent"
                }
              >

                {msg.sender === "agent" && (
                  <div className="avatar">
                    <i className="bi bi-headset"></i>
                  </div>
                )}

                <div
                  className={
                    msg.sender === "user"
                      ? "message user-message"
                      : "message agent-message"
                  }
                >
                  {msg.text}
                </div>

              </div>

            ))}

            {loading && (

              <div className="message-row agent">

                <div className="avatar">
                  <i className="bi bi-headset"></i>
                </div>

                <div className="typing">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>

              </div>

            )}

            <div ref={bottomRef}></div>

          </div>

   
          <div className="chat-footer">

            <input
              type="text"
              className="form-control"
              placeholder="Ask me anything..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
            />

            <button
              className="send-btn"
              onClick={sendMessage}
            >
              <i className="bi bi-send-fill"></i>
            </button>

          </div>

        </div>
      )}
    </>
  );
}

export default SupportChat;