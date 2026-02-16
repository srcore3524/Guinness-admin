"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthLayout from "@/components/auth/AuthLayout";
import AuthHeader from "@/components/auth/AuthHeader";
import InputField from "@/components/auth/InputField";
import PasswordToggle from "@/components/auth/PasswordToggle";
import SubmitButton from "@/components/auth/SubmitButton";
import SocialLoginSection from "@/components/auth/SocialLoginSection";
import AuthLink from "@/components/auth/AuthLink";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const updateField = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.email) newErrors.email = "Email is required";
    if (!form.password) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    router.push("/dashboard");
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <AuthHeader
          title="Welcome to Guinness"
          subtitle={
            <>
              Enter your email and password to access
              <br />
              your account.
            </>
          }
        />

        <div className="flex flex-col gap-4">
          <InputField
            label="Email"
            type="email"
            value={form.email}
            onChange={updateField("email")}
            placeholder="tomsherwood@guinness.com"
            error={errors.email}
          />

          <div className="flex flex-col gap-3">
            <InputField
              label="Password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={updateField("password")}
              placeholder="Password"
              error={errors.password}
              suffix={
                <PasswordToggle
                  visible={showPassword}
                  onToggle={() => setShowPassword(!showPassword)}
                />
              }
            />

            <div className="flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-3 w-3 rounded-[3.6px] border-[0.6px] border-gn-gray accent-gn-primary"
                />
                <span className="text-[12px] tracking-[-0.24px] text-gn-gray">
                  Remember Me
                </span>
              </label>
              <Link
                href="/forgot-password"
                className="text-[12px] tracking-[-0.24px] text-gn-gray hover:text-gn-primary"
              >
                Forgot Your Password?
              </Link>
            </div>
          </div>
        </div>

        <SubmitButton>Log In</SubmitButton>
        <SocialLoginSection label="or login with" />
        <AuthLink
          text="Don't have an account?"
          linkText="Register now!"
          href="/register"
        />
      </form>
    </AuthLayout>
  );
}
