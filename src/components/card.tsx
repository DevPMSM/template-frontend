import { cn } from "@/lib/utils";

type CardProps = {
  columnValues: string[];
  className?: string;
  dialogInformation: React.ReactNode;
  dialogUpdate: React.ReactNode;
  dialogDelete: React.ReactNode;
};

export default function Card({
  columnValues,
  className,
  dialogInformation,
  dialogUpdate,
  dialogDelete,
}: CardProps) {
  return (
    <div
      className={cn(
        "font-nunito flex h-15 w-full items-center overflow-hidden px-2 max-md:justify-between md:grid md:grid-cols-12",
        className
      )}
    >
      <div className="max-w-2/3 overflow-hidden md:hidden">
        {columnValues.map((value, index) => (
          <div key={index} className="text-ellipsis">
            {value}
          </div>
        ))}
      </div>

      {columnValues.map((value, index) => (
        <div
          key={index}
          className="truncate max-md:hidden md:col-span-4"
        >
          {value}
        </div>
      ))}

      <div className="flex items-center justify-end gap-2 pr-2 md:col-span-4">
        {dialogInformation}
        {dialogUpdate}
        {dialogDelete}
      </div>
    </div>
  );
}
