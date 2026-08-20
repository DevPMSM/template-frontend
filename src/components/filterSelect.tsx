"use client";

import { Label } from "@/components/label";
import Select from "@/components/select";

type FilterOption = {
  value: string;
  label: string;
};

type FilterSelectProps = {
  label: string;
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
  clearable?: boolean;
  className?: string;
};

export default function FilterSelect({
  label,
  options,
  value,
  onChange,
  clearable = false,
  className = "w-64",
}: FilterSelectProps) {
  return (
    <Label className={`flex flex-col ${className}`}>
      <p className="w-full pl-1 text-left text-sm font-bold tracking-wide text-[#223463] uppercase">
        {label}
      </p>
      <Select
        clearable={clearable}
        options={options}
        value={value}
        onChange={(val) => onChange(val ?? "")}
        classNames={{
          trigger: "h-9 text-sm bg-white font-semibold",
          option: "font-medium text-nunito",
        }}
      />
    </Label>
  );
}
