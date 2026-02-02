import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type LabelProps =
  React.InputHTMLAttributes<HTMLLabelElement> & {
    title?: string;
    className: string;
    children: ReactNode;
  };

export default function Label({
  title,
  className,
  children,
}: LabelProps) {
  return (
    <>
      <label
        htmlFor=""
        className={cn(
          "outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium",
          className
        )}
      >
        {title}
        {children}
      </label>
    </>
  );
}
