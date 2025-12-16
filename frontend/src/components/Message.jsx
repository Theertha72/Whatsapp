import "../styles/whatsapp.css";

export default function Message({ msg, me }) {
  return (
    <div className={`message ${msg.sender === me ? "me" : "other"}`}>
      {msg.text}
    </div>
  );
}
