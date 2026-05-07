import { paginationResponseType } from "@/types/pagination-response";

export default function Pagination({
  pagination,
}: {
  pagination: paginationResponseType;
}) {
  return (
    <div className="mt-4 flex h-10 w-full items-center justify-between rounded-sm bg-[#223463] px-3"></div>
  );
}
