"use client";

import Pagination from "@/components/pagination";
import baseApi from "@/services/api";
import { useUsersStore } from "@/store/useUser";
import { paginationResponseType } from "@/types/pagination-response";
import { userType } from "@/types/user";
import { useEffect, useState } from "react";
import { LuSearch, LuSendHorizontal } from "react-icons/lu";
import {
  PiUserCirclePlus,
  PiUserLight,
} from "react-icons/pi";
import { TbFilter } from "react-icons/tb";
import FilterSelect from "@/components/filterSelect";
import { useAuth } from "@/store/useAuth";
import ListSkeleton from "@/app/(dashboard)/_components/listSkeleton";
import DialogUserCreate from "../../_components/user/dialogs/dialogUserCreate";
import CardUserHeader from "../../_components/user/cardUserHeader";
import CardUser from "../../_components/user/cardUser";

const SORT_OPTIONS_NAMES = [
  { value: "asc", label: "Nome (A - Z)" },
  { value: "desc", label: "Nome (Z - A)" },
];

const SORT_OPTIONS_ROLES = [
  { value: " ", label: "Todos" },
  { value: "admin", label: "Admin" },
  { value: "user", label: "Usuário" },
];

export default function Home() {
  const { users, setUsers } = useUsersStore();
  const { user: loggedUser } = useAuth();

  const [userPage, setUserPage] = useState<number>(1);
  const [isShowFilter, setIsShowFilter] =
    useState<boolean>(false);

  const PER_PAGE = 30;
  const [lastPage, setLastPage] = useState<number>(1);
  const [isLoading, setIsLoading] =
    useState<boolean>(false);

  const [searchInput, setSearchInput] =
    useState<string>("");
  const [searchName, setSearchName] = useState<string>("");

  const [sortOrder, setSortOrder] = useState<string>("asc");
  const [roleFilter, setRoleFilter] = useState<string>(" ");

  const handleSearch = () => {
    setSearchName(searchInput);
    setUserPage(1);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setSearchInput(value);

    if (value.trim() === "") {
      setSearchName("");
      setUserPage(1);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    setIsLoading(true);

    const url = `/users?name=${encodeURIComponent(searchName)}
          &sort=${sortOrder}
          &role=${roleFilter}
          &page=${userPage}
          &per_page=${PER_PAGE}`;

    baseApi
      .get<paginationResponseType<userType[]>>(url)
      .then((res) => {
        setUsers(res.data.data);
        setLastPage(res.data.last_page);
      })
      .catch((err) => {
        console.error(err.response?.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [
    userPage,
    searchName,
    sortOrder,
    roleFilter,
    setUsers,
  ]);

  return (
    <div className="mx-auto flex h-full w-11/12 flex-col items-center overflow-hidden md:w-full md:max-w-7xl md:p-4 md:pr-7">
      <div className="flex w-full flex-col items-center max-md:mt-6 max-md:justify-center md:flex-row md:gap-2">
        <PiUserLight
          size={34}
          className="2xl: max-md:mb-2 max-md:text-[#2857CD]"
        />
        <div className="leading-4 max-md:text-center md:pt-4">
          <h2 className="text-xl leading-3 font-semibold md:text-2xl">
            Usuários
          </h2>
          <p className="mt-1 text-sm font-medium">
            Cadastre, edite, visualize e exclua usuários.
          </p>
        </div>
      </div>

      <div className="flex w-full flex-1 flex-col overflow-hidden">
        <div
          className={`mt-4 flex h-12 w-full items-center justify-between bg-[#223463] px-3 ${
            isShowFilter ? "rounded-t-sm" : "rounded-sm"
          } transition-all duration-50`}
        >
          <div className="flex h-8 items-center gap-2 rounded-sm bg-[#3c4f80] px-2 md:w-4/12">
            <LuSearch
              size={22}
              className="text-slate-200"
            />
            <input
              type="text"
              value={searchInput}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="w-full text-white placeholder:text-slate-300 focus:outline-0"
              placeholder="Pesquise o nome do usuário"
              maxLength={255}
            />
            <LuSendHorizontal
              size={20}
              onClick={handleSearch}
              className="cursor-pointer text-slate-200 transition-all duration-100 hover:text-slate-400"
            />
          </div>

          <div className="flex items-center gap-2 md:gap-10">
            <div
              className="flex cursor-pointer items-center gap-1 rounded-sm p-1 hover:bg-[#3c4f80]"
              onClick={() => {
                setIsShowFilter(!isShowFilter);
              }}
            >
              <TbFilter
                className="text-slate-200"
                size={24}
              />
              <p className="my-auto hidden font-semibold text-slate-200 uppercase md:block">
                Filtros
              </p>
            </div>
            <DialogUserCreate title="Criar Usuário">
              <PiUserCirclePlus
                className="cursor-pointer text-white transition-all duration-200 hover:scale-90"
                size={26}
              />
            </DialogUserCreate>
          </div>
        </div>

        {isShowFilter && (
          <div className="flex flex-wrap items-center gap-4 rounded-b-sm border border-t-0 border-[#223463] bg-slate-50 p-3 max-sm:justify-center">
            <FilterSelect
              label="Ordenar nome"
              options={SORT_OPTIONS_NAMES}
              value={sortOrder}
              onChange={(val) => {
                setSortOrder(val);
                setUserPage(1);
              }}
            />
            <FilterSelect
              label="Cargo"
              options={SORT_OPTIONS_ROLES}
              value={roleFilter}
              onChange={(val) => {
                setRoleFilter(val);
                setUserPage(1);
              }}
            />
          </div>
        )}

        <div className="my-2 flex flex-1 flex-col overflow-hidden rounded-sm border-2 border-[#6273a0]">
          <CardUserHeader className="max-md:hidden" />
          {isLoading ? (
            <ListSkeleton rows={PER_PAGE} />
          ) : users.length === 0 ||
            (users.length === 1 &&
              users[0].id === loggedUser?.id) ? (
            <div className="flex h-full items-center justify-center text-lg font-semibold text-gray-500">
              Nenhum usuário encontrado.
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto px-0.5">
              {users.map(
                (userProps, key) =>
                  userProps.id !== loggedUser?.id && (
                    <CardUser
                      key={key}
                      userProps={userProps}
                      className={
                        key % 2 === 0
                          ? "bg-[#e5ecff]/70"
                          : ""
                      }
                    />
                  )
              )}
            </div>
          )}
        </div>

        <Pagination
          currentPage={userPage}
          lastPage={lastPage}
          onPageChange={setUserPage}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
