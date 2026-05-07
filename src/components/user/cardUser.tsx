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
        "my-2 flex items-center justify-between rounded-xl border bg-[#F6F6F6] p-2 text-xs duration-50 md:h-14 md:hover:scale-[1.005]",
        className
      )}
    >
      <div className="flex flex-col md:hidden">
        <p className="mb-0.5 font-semibold text-[#696767]">
          {userProps.name}
        </p>
        <p className="text-[#828282] capitalize">
          {userProps.role}
        </p>
      </div>
      <div className="grid w-full grid-cols-12 gap-1 max-md:hidden">
        <div className="col-span-3 my-auto ml-8 line-clamp-2 overflow-x-hidden text-[13px] font-semibold text-ellipsis text-[#696767]">
          {userProps?.name}
        </div>
        <div className="col-span-2 my-auto line-clamp-1 overflow-x-hidden text-[13px] font-semibold text-ellipsis text-[#696767]">
          {userProps?.contact}
        </div>
        <div className="col-span-4 my-auto ml-7 line-clamp-1 overflow-x-hidden text-left text-[13px] font-semibold text-ellipsis text-[#696767]">
          {userProps?.email}
        </div>
        <div className="col-span-3 my-auto line-clamp-1 overflow-x-hidden pl-10 text-[13px] font-semibold text-ellipsis text-[#696767]">
          {userProps.role.charAt(0).toUpperCase() +
            userProps.role.slice(1)}
        </div>
      </div>
      <div className="flex gap-1">
        <DialogUserInformation
          title="Dados do usuário"
          user={userProps}
        >
          <FaRegEye
            size={19}
            color="#FFFFFF"
            className="cursor-pointer rounded-sm bg-[#639855] p-0.5"
          />
        </DialogUserInformation>
        <DialogUserUpdate
          title="Editar usuário"
          user={userProps}
        >
          <MdModeEditOutline
            size={19}
            color="#FFFFFF"
            className="cursor-pointer rounded-sm bg-[#2857CD] p-0.5"
          />
        </DialogUserUpdate>
        {user?.id !== userProps.id ? (
          <DialogUserDelete user={userProps}>
            <IoCloseSharp
              size={19}
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
