import { Eye, EyeOff } from "lucide-react";

export default function PasswordToggle({ visible, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="text-gn-gray hover:text-gn-text"
    >
      {visible ? <EyeOff size={18} /> : <Eye size={18} />}
    </button>
  );
}
