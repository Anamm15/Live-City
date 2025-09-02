"use client";

import React from "react";
import LabelText from "./LabelText";

type SelectOptionProps = {
  label: string;
  helperText?: string;
  hideError?: boolean;
  validation?: boolean;
  className?: string;
  readOnly?: boolean;
  defaultValue?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  value: string | number | undefined;
  options: { value: string | number | undefined; label: string }[];
};

const SelectOption = ({
  label,
  className = "",
  readOnly = false,
  defaultValue = "",
  placeholder = "",
  icon,
  options,
  value,
}: SelectOptionProps) => {
  return (
    <div className="mb-4 flex flex-col space-y-2">
      <LabelText id={label} className="flex items-center gap-2">
        {icon && <span>{icon}</span>}
        {label}
      </LabelText>
      <div className={`relative ${className}`}>
        <select
          id={label}
          name={label}
          disabled={readOnly}
          className={`appearance-none w-full px-3 py-1.5 border border-[#808080] rounded-md 
            focus:outline-1 focus:outline-primary-info-active focus:ring-inset 
            hover:ring-1 hover:ring-inset hover:ring-[#000] 
            placeholder:text-sm placeholder:text-[#9AA2B1] focus:placeholder:text-[#092540] 
            pr-10`}
          defaultValue={defaultValue}
          aria-label={label}
          value={value}
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={String(option.value)} value={String(option.value)}>
              {String(option.label)}
            </option>
          ))}
        </select>

        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center z-10">
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default SelectOption;
