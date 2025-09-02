import Input from "@/components/form/Input";
import SelectOption from "@/components/form/SelectOption";
import { ReactNode } from "react";

type ProfileFieldProps = {
  icon: ReactNode;
  label: string;
  value: string | number | undefined;
  isEditing: boolean;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  name: string;
  type?: "text" | "email" | "date" | "select";
  options?: { value: string; label: string }[];
};

export default function ProfileField({
  icon,
  label,
  value,
  isEditing,
  name,
  onChange,
  type = "text",
  options = [],
}: ProfileFieldProps) {
  const commonInputClasses =
    "w-full rounded-md border-gray-300 bg-white/50 p-2 text-sm text-gray-800 shadow-sm focus:border-indigo-500 focus:ring-indigo-500";

  return (
    <div>
      {isEditing ? (
        type === "select" ? (
          <SelectOption
            label={label}
            value={value}
            options={options}
            icon={icon}
          />
        ) : (
          <Input
            type={type}
            label={label}
            icon={icon}
            name={name}
            value={value}
            onChange={onChange}
            className={commonInputClasses}
          />
        )
      ) : (
        <>
          <label className="flex items-center font-semibold text-text">
            {icon}
            <span className="ml-2">{label}</span>
          </label>
          <p className="mt-1 rounded-md bg-transparent p-2 text-text border py-1.5 mb-4">
            {value || <span className="text-gray-400">Belum diisi</span>}
          </p>
        </>
      )}
    </div>
  );
}
