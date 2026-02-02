import { cn } from "@/lib/utils";

type InputProps =
  React.InputHTMLAttributes<HTMLInputElement> & {
    type: string;
    hidden?: boolean;
    className?: string;
  };

export default function Input({
  type,
  hidden = false,
  className,
  ...props
}: InputProps) {
  return (
    <>
      <input
        type={type}
        hidden={hidden}
        className={cn(
          "outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium",
          className
        )}
        {...props}
      />
    </>
  );
}
