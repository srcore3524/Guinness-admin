"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AuthLayout from "@/components/auth/AuthLayout";
import AuthHeader from "@/components/auth/AuthHeader";
import InputField from "@/components/auth/InputField";
import SubmitButton from "@/components/auth/SubmitButton";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError("Email is required");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Invalid email address");
      return;
    }
    setError("");
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <AuthHeader
          title="Forgot Your Password"
          subtitle="We'll provide the reset instructions to you shortly."
        />

        <InputField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError("");
          }}
          placeholder="tomsherwood@guinness.com"
          error={error}
        />

        <SubmitButton>Reset Password</SubmitButton>

        <Link
          href="/login"
          className="flex items-center justify-center gap-1 text-[13px] tracking-[-0.13px] text-gn-gray hover:text-gn-primary"
        >
          <ArrowLeft size={14} />
          Back to Log In
        </Link>
      </form>
    </AuthLayout>
  );
}
