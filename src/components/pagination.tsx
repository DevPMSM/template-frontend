import { Button } from "@/components/button";
import { cn } from "@/lib/utils";
import {
  IoChevronBack,
  IoChevronForward,
} from "react-icons/io5";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";
import { useMemo } from "react";

type PaginationProps = {
  currentPage: number;
  lastPage: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
};

export default function Pagination({
  currentPage,
  lastPage,
  onPageChange,
  isLoading = false,
}: PaginationProps) {
  if (lastPage <= 1) return null;

  const allPages = useMemo(() => {
    return Array.from(
      { length: lastPage },
      (_, i) => i + 1
    );
  }, [lastPage]);

  const getRightSideNumbers = () => {
    if (lastPage <= 3) {
      return Array.from(
        { length: lastPage },
        (_, i) => i + 1
      );
    }
    if (currentPage === 1) {
      return [1, 2, 3];
    }
    if (currentPage === lastPage) {
      return [lastPage - 2, lastPage - 1, lastPage];
    }
    return [currentPage - 1, currentPage, currentPage + 1];
  };

  const rightNumbers = getRightSideNumbers();

  const handlePageChange = (page: number) => {
    if (
      !isLoading &&
      page !== currentPage &&
      page >= 1 &&
      page <= lastPage
    ) {
      onPageChange(page);
    }
  };

  const SelectSection = () => (
    <div className="flex items-center gap-2">
      <Button
        size="icon"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1 || isLoading}
        className="h-9 w-9 shrink-0 cursor-pointer bg-transparent disabled:cursor-not-allowed"
      >
        <IoChevronBack />
      </Button>

      <div className="flex items-center gap-2">
        <Select
          value={currentPage.toString()}
          onValueChange={(value) =>
            handlePageChange(Number(value))
          }
          disabled={isLoading}
        >
          <SelectTrigger className="flex w-auto cursor-pointer items-center border-none p-3 font-medium text-white shadow-none outline-0 transition-all focus:ring-0 focus:ring-offset-0 disabled:cursor-not-allowed">
            <SelectValue
              placeholder={currentPage.toString()}
            />
          </SelectTrigger>
          <SelectContent className="h-60">
            <SelectGroup>
              {allPages.map((page) => (
                <SelectItem
                  key={`select-page-${page}`}
                  value={page.toString()}
                  className="cursor-pointer"
                >
                  {page}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <span className="text-sm font-semibold whitespace-nowrap text-white">
          de {lastPage}.
        </span>
      </div>

      <Button
        size="icon"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === lastPage || isLoading}
        className="h-9 w-9 shrink-0 cursor-pointer bg-transparent disabled:cursor-not-allowed"
      >
        <IoChevronForward />
      </Button>
    </div>
  );

  return (
    <div className="font-nunito my-1 flex w-full shrink-0 flex-col items-center justify-center gap-4 rounded-sm bg-[#223463] px-2 py-2 md:flex-row md:justify-between md:px-0">
      <SelectSection />
      <div className="hidden items-center gap-1 md:flex">
        <Button
          size="icon"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1 || isLoading}
          className="h-9 w-9 cursor-pointer bg-transparent disabled:cursor-not-allowed"
        >
          <IoChevronBack />
        </Button>

        {rightNumbers.map((page) => (
          <Button
            key={`right-page-${page}`}
            onClick={() => handlePageChange(page)}
            disabled={isLoading}
            className={cn(
              "text-md h-9 w-auto cursor-pointer bg-transparent font-semibold transition-all",
              currentPage === page
                ? "text-[#adbaf2]"
                : "text-white",
              isLoading && "opacity-50"
            )}
          >
            {page}
          </Button>
        ))}

        <Button
          size="icon"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === lastPage || isLoading}
          className="h-9 w-9 cursor-pointer bg-transparent disabled:cursor-not-allowed"
        >
          <IoChevronForward />
        </Button>
      </div>
    </div>
  );
}
