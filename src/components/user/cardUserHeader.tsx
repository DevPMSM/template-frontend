import { cn } from "@/lib/utils";

type CardUserHeaderProps = {
  className?: string;
};

export default function CardUserHeader({
  className,
}: CardUserHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between border-b-2 border-[#6273a0] bg-[#223463]/5 px-2.5 py-2",
        className
      )}
    >
      <div className="grid w-full grid-cols-12 items-center gap-1">
        <p className="col-span-6 ml-8 text-sm font-bold tracking-wide text-[#223463] uppercase md:col-span-3">
          Nome
        </p>

        <p className="col-span-5 ml-7 text-sm font-bold tracking-wide text-[#223463] uppercase max-md:hidden">
          Email
        </p>

        <p className="col-span-5 pl-10 text-sm font-bold tracking-wide text-[#223463] uppercase md:col-span-3">
          Cargo
        </p>
      </div>

      <p className="w-17 shrink-0 text-right text-sm font-bold tracking-wide text-[#223463] uppercase">
        Ações
      </p>
    </div>
  );
}
