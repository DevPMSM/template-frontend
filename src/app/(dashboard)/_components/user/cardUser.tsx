import { userType } from "@/types/user";
import { FaRegEye } from "react-icons/fa6";
import { MdModeEditOutline } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import DialogUserInformation from "./dialogs/dialogUserInformation";
import DialogUserUpdate from "./dialogs/dialogUserUpdate";
import DialogUserDelete from "./dialogs/dialogUserDelete";
import { useAuth } from "@/store/useAuth";
import { cn } from "@/lib/utils";

type CardUserProps = {
  userProps: userType;
  className?: string;
};

export default function CardUser({
  userProps,
  className,
}: CardUserProps) {
  const { user } = useAuth();

  return (
    <div
      className={cn(
        "my-2 flex items-center justify-between p-2 text-xs duration-50 md:h-14",
        className
      )}
    >
      <div className="grid w-full grid-cols-12 items-center gap-1">
        <div className="col-span-6 my-auto ml-8 line-clamp-2 overflow-x-hidden text-lg font-semibold text-ellipsis md:col-span-3">
          {userProps?.name}
        </div>
        <div className="col-span-5 my-auto ml-7 line-clamp-2 overflow-x-hidden text-left text-lg font-semibold wrap-break-word text-slate-600 max-md:hidden">
          {userProps?.email}
        </div>
        <div className="col-span-5 my-auto line-clamp-2 overflow-x-hidden pl-10 text-lg font-semibold text-slate-600 md:col-span-3">
          {userProps.role === "user" ? "Usuário" : "Admin"}
        </div>
      </div>
      <div className="flex gap-1">
        <DialogUserInformation
          title="Dados do usuário"
          user={userProps}
        >
          <FaRegEye
            size={22}
            color="#FFFFFF"
            className="cursor-pointer rounded-sm bg-[#639855] p-0.5"
          />
        </DialogUserInformation>
        <DialogUserUpdate
          title="Editar usuário"
          user={userProps}
        >
          <MdModeEditOutline
            size={22}
            color="#FFFFFF"
            className="cursor-pointer rounded-sm bg-[#2857CD] p-0.5"
          />
        </DialogUserUpdate>
        {user?.id !== userProps.id ? (
          <DialogUserDelete user={userProps}>
            <IoCloseSharp
              size={22}
              color="#FFFFFF"
              className="cursor-pointer rounded-sm bg-[#CA080B] p-0.5"
            />
          </DialogUserDelete>
        ) : (
          <div className="w-4.75"></div>
        )}
      </div>
    </div>
  );
}
