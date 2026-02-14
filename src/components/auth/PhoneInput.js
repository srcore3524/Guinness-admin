"use client";

import { PhoneInput as IntlPhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

export default function PhoneInput({ value, onChange, error }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[11px] font-medium leading-[1.5] text-gn-primary">
        Phone Number
      </label>
      <IntlPhoneInput
        defaultCountry="us"
        value={value}
        onChange={onChange}
        inputClassName="!bg-transparent !border-none !text-[13px] !font-medium !tracking-[-0.26px] !text-gn-text !outline-none !h-full"
        countrySelectorStyleProps={{
          buttonClassName:
            "!bg-transparent !border-none !pl-3 !pr-1 !h-full",
        }}
        className={`!h-[42px] !rounded-lg !border !bg-gn-input ${
          error ? "!border-gn-red" : "!border-gn-stroke"
        }`}
      />
      {error && <p className="text-[11px] text-gn-red">{error}</p>}
    </div>
  );
}
