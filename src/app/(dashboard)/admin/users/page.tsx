"use client";

import Card from "@/components/card";
import Pagination from "@/components/pagination";
import DialogUserCreate from "@/components/user/dialogs/dialogUserCreate";
import DialogUserDelete from "@/components/user/dialogs/dialogUserDelete";
import DialogUserInformation from "@/components/user/dialogs/dialogUserInformation";
import DialogUserUpdate from "@/components/user/dialogs/dialogUserUpdate";
import { useAuth } from "@/hooks/useAuth";
import { isServerSide } from "@/lib/is-server-side";
import baseApi from "@/services/api";
import { useUsersStore } from "@/store/useUser";
import { paginationResponseType } from "@/types/pagination-response";
import { userType } from "@/types/user";
import { useEffect, useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoEyeOutline } from "react-icons/io5";
import {
  PiUserCirclePlus,
  PiUserLight,
} from "react-icons/pi";
import { TbFilter } from "react-icons/tb";
import { TiPencil } from "react-icons/ti";

export default function Home() {
  const { users, setUsers } = useUsersStore();
  const { user: userLogged } = useAuth();

  const [userPage, setUserPage] = useState<number>(1);

  // Paginação
  const PER_PAGE = 30;
  const [lastPage, setLastPage] = useState<number>(1);
  const [isLoading, setIsLoading] =
    useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    baseApi
      .get<paginationResponseType<userType[]>>(
        `/users?page=${userPage}&per_page=${PER_PAGE}`
      )
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
  }, [userPage, setUsers]);

  return (
    <div className="mx-auto flex h-full w-11/12 flex-col items-center overflow-hidden md:w-full md:max-w-7xl md:p-4 md:pr-7">
      {" "}
      <div className="flex w-full flex-col items-center max-md:mt-6 max-md:justify-center md:flex-row md:gap-2">
        <PiUserLight
          size={34}
          className="2xl: max-md:mb-2 max-md:text-[#2857CD]"
        />
        <div className="leading-4 max-md:text-center md:pt-4">
          <h2 className="text-xl leading-3 font-semibold md:text-2xl">
            Usuários
          </h2>
          <p className="text-sm font-medium">
            Cadastre, edite, visualize e exclua usuários.
          </p>
        </div>
      </div>
      <div className="flex w-full flex-1 flex-col overflow-hidden">
        <div className="mt-4 flex h-10 w-full items-center justify-between rounded-sm bg-[#223463] px-3">
          <TbFilter
            className="cursor-pointer text-white transition-all duration-200 hover:scale-90"
            size={22}
          />
          <DialogUserCreate title="Criar Usuário">
            <PiUserCirclePlus
              className="cursor-pointer text-white transition-all duration-200 hover:scale-90"
              size={26}
            />
          </DialogUserCreate>
        </div>
        <div className="my-2 flex-1 overflow-y-auto rounded-sm border-2 border-[#6273a0] px-0.5">
          {users.map((user, key) => {
            if (user.id !== userLogged?.id) {
              return (
                <Card
                  key={user.id}
                  className={`${key % 2 === 0 ? "bg-[#e5ecff]/70" : ""}`}
                  columnValues={[user.name, user.email]}
                  dialogInformation={
                    <DialogUserInformation
                      title="Usuário"
                      user={user}
                    >
                      <IoEyeOutline
                        className="cursor-pointer rounded-full bg-[#639855] p-0.5 text-white transition-all duration-200 hover:scale-90"
                        size={22}
                      />
                    </DialogUserInformation>
                  }
                  dialogUpdate={
                    <DialogUserUpdate
                      title="Usuário"
                      user={user}
                    >
                      <TiPencil
                        className="cursor-pointer rounded-full bg-blue-600 p-0.5 transition-all duration-200 hover:scale-90"
                        size={20}
                        fill="white"
                      />
                    </DialogUserUpdate>
                  }
                  dialogDelete={
                    <DialogUserDelete user={user}>
                      <FaRegTrashCan
                        className="bg-destructive cursor-pointer rounded-full p-0.5 transition-all duration-200 hover:scale-90"
                        size={20}
                        fill="white"
                      />
                    </DialogUserDelete>
                  }
                />
              );
            }
          })}
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
