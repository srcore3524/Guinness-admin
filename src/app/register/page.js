"use client";

import { useState } from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import AuthHeader from "@/components/auth/AuthHeader";
import InputField from "@/components/auth/InputField";
import PhoneInput from "@/components/auth/PhoneInput";
import PasswordToggle from "@/components/auth/PasswordToggle";
import PasswordRules, { validatePassword } from "@/components/auth/PasswordRules";
import SubmitButton from "@/components/auth/SubmitButton";
import SocialLoginSection from "@/components/auth/SocialLoginSection";
import AuthLink from "@/components/auth/AuthLink";

const INITIAL_FORM = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  repeatPassword: "",
};

export default function RegisterPage() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const updateField = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "First name is required";
    if (!form.lastName.trim()) e.lastName = "Last name is required";
    if (!form.email) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email address";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    if (!form.password) e.password = "Password is required";
    else if (!validatePassword(form.password))
      e.password = "Password does not meet requirements";
    if (!form.repeatPassword) e.repeatPassword = "Please confirm your password";
    else if (form.password !== form.repeatPassword)
      e.repeatPassword = "Passwords do not match";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
  };

  return (
    <AuthLayout wide>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <AuthHeader
          title="Get Started with Guinness"
          subtitle="Join the leading network of innovators, investors, and founders."
        />

        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="First Name"
                value={form.firstName}
                onChange={updateField("firstName")}
                placeholder="Tom"
                error={errors.firstName}
              />
              <InputField
                label="Last Name"
                value={form.lastName}
                onChange={updateField("lastName")}
                placeholder="Sherwood"
                error={errors.lastName}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="Email"
                type="email"
                value={form.email}
                onChange={updateField("email")}
                placeholder="tomsherwood@guinness.com"
                error={errors.email}
              />
              <PhoneInput
                value={form.phone}
                onChange={(phone) => {
                  setForm((prev) => ({ ...prev, phone }));
                  if (errors.phone) setErrors((prev) => ({ ...prev, phone: "" }));
                }}
                error={errors.phone}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
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
              <InputField
                label="Repeat Password"
                type={showRepeatPassword ? "text" : "password"}
                value={form.repeatPassword}
                onChange={updateField("repeatPassword")}
                placeholder="Password"
                error={errors.repeatPassword}
                suffix={
                  <PasswordToggle
                    visible={showRepeatPassword}
                    onToggle={() => setShowRepeatPassword(!showRepeatPassword)}
                  />
                }
              />
            </div>
          </div>

          <PasswordRules password={form.password} />
        </div>

        <SubmitButton>Sign Up</SubmitButton>
        <SocialLoginSection label="or sign up with" />
        <AuthLink
          text="Already have an account?"
          linkText="Sign In!"
          href="/login"
        />
      </form>
    </AuthLayout>
  );
}
