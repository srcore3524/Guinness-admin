import { CheckCircle, XCircle } from "lucide-react";

const RULES = [
  { key: "uppercase", label: "Uppercase letter", test: (v) => /[A-Z]/.test(v) },
  { key: "length", label: "Must be 8 characters", test: (v) => v.length >= 8 },
  { key: "symbol", label: "Symbols (e.g. !@#$%^&*?)", test: (v) => /[!@#$%^&*?]/.test(v) },
];

export default function PasswordRules({ password }) {
  return (
    <div className="flex flex-col gap-1">
      {RULES.map((rule) => {
        const passed = password.length > 0 && rule.test(password);
        return (
          <div key={rule.key} className="flex items-center gap-1">
            {passed ? (
              <CheckCircle size={18} className="text-green-500" />
            ) : (
              <XCircle size={18} className="text-gn-red" />
            )}
            <span
              className={`text-[12px] tracking-[-0.24px] ${
                passed ? "text-gn-text" : "text-gn-red"
              }`}
            >
              {rule.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export function validatePassword(password) {
  return RULES.every((rule) => rule.test(password));
}
