import { cn } from "@/lib/utils";

function InputSkeleton({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      data-slot="input-skeleton"
      className={cn(
        "border-input h-8 w-full min-w-0 animate-pulse rounded-lg border bg-gray-200",
        className
      )}
    />
  );
}

export { InputSkeleton };
