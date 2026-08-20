type SkeletonRowProps = {
  isEven: boolean;
};

function Bar({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded bg-gray-200 ${className}`}
    />
  );
}

function SkeletonRow({ isEven }: SkeletonRowProps) {
  return (
    <div
      className={`flex items-center gap-3 border-b px-2 py-4 last:border-b-0 md:grid md:grid-cols-12 md:gap-0 ${
        isEven ? "bg-[#e5ecff]/70" : ""
      }`}
    >
      <div className="col-span-4 pr-4">
        <Bar className="h-4 w-3/4" />
      </div>
      <div className="col-span-4 pr-4 max-md:hidden">
        <Bar className="h-4 w-2/3" />
      </div>
      <div className="col-span-2 pr-4 max-md:hidden">
        <Bar className="h-4 w-1/2" />
      </div>
      <div className="col-span-2 ml-auto flex justify-end gap-2 pr-4">
        <div className="h-7 w-7 animate-pulse rounded-full bg-gray-200" />
        <div className="h-7 w-7 animate-pulse rounded-full bg-gray-200" />
        <div className="h-7 w-7 animate-pulse rounded-full bg-gray-200" />
      </div>
    </div>
  );
}

export default function ListSkeleton({
  rows = 8,
}: {
  rows?: number;
}) {
  return (
    <div className="mt-4 w-full flex-1 overflow-hidden rounded-sm bg-white shadow-lg">
      <div>
        {Array.from({ length: rows }).map((_, i) => (
          <SkeletonRow key={i} isEven={i % 2 !== 0} />
        ))}
      </div>
    </div>
  );
}
