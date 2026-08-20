import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
} from "@/components/sidebar";
import { useAuth } from "@/hooks/useAuth";
import { usePathname } from "next/dist/client/components/navigation";
import Image from "next/image";

import { TbUserEdit } from "react-icons/tb";
import { IoMdLogOut } from "react-icons/io";
import { MdCalendarMonth } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { cn } from "@/lib/utils";
import { IconType } from "react-icons";
import Link from "next/link";
import {
  LuMapPinned,
  LuHospital,
  LuUserRound,
  LuSyringe,
} from "react-icons/lu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/popover";
import DialogUserUpdate from "./user/dialogs/dialogUserUpdate";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/avatar";

type AppSidebarButtonProps = {
  name: string;
  url: string;
  icon: IconType;
};

function AppSidebarButton({
  name,
  url,
  icon,
}: AppSidebarButtonProps) {
  const pathname = usePathname();
  const Icon = icon;

  return (
    <SidebarMenuButton asChild>
      <Link
        href={url}
        className={cn(
          "group font-nunito my-0.5 flex h-11 px-2 text-[19px] font-medium text-white/20 transition-transform duration-200 hover:border hover:border-white/10 hover:bg-transparent hover:bg-linear-to-l hover:from-[#3147af] hover:to-[#3b53b6] hover:font-bold",
          pathname === url
            ? "group-hover:none border border-l-2 border-white/10 border-l-white bg-linear-to-l from-[#3147af] to-[#3b53b6] outline transition-all duration-200"
            : ""
        )}
      >
        <span
          className={`line-clamp-1 flex items-center gap-2 text-ellipsis text-white transition-all duration-200 ${
            pathname === url ? "font-bold" : ""
          }`}
        >
          <Icon className="h-5! w-5! text-white" />
          {name}
        </span>
      </Link>
    </SidebarMenuButton>
  );
}

export function AppSidebar() {
  const { user, logout } = useAuth();

  const routes: AppSidebarButtonProps[] = [
    {
      name: "Usuários",
      url: "/admin/users",
      icon: LuUserRound,
    },
  ];

  return (
    <Sidebar className="w-75 border-none">
      <SidebarContent className="bg-linear-to-r from-[#3B5394] to-[#203670]">
        <SidebarHeader className="rounded-sm px-2 py-3">
          <Link
            href={"/"}
            className="flex flex-col items-center justify-center gap-3 px-2 md:mt-6"
          >
            <Image
              src="/logo-pref-notext.png"
              alt="Logo"
              width={55}
              height={60}
            />

            <div>
              <p className="font-nunito line-clamp-1 w-full text-start text-2xl leading-8 font-bold text-white">
                Template Secti
              </p>
            </div>
          </Link>
        </SidebarHeader>
        <SidebarGroup className="no-scrollbar h-full overflow-y-scroll">
          <SidebarGroupContent className="my-2 pb-4">
            <div className="font-nunito flex items-center gap-2">
              <p className="ml-2 text-lg text-white">
                Menu
              </p>
              <div className="mt-1 w-full border-t"></div>
            </div>
            <SidebarMenu className="mt-4">
              {[...routes]
                .sort((a, b) =>
                  a.name.localeCompare(b.name, "pt-BR")
                )
                .map((e, index) => {
                  return (
                    <AppSidebarButton
                      name={e.name}
                      url={e.url}
                      icon={e.icon}
                      key={e.url || index}
                    />
                  );
                })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <div className="flex h-21 items-center justify-between gap-10 bg-[#FAFAFA] px-4 shadow-[0px_4px_4px_0px_#00000040] inset-shadow-[0px_4px_4px_0px_#00000040]">
          <div className="flex gap-1">
            <Avatar className="h-13 w-13">
              <AvatarImage
                src={user?.image}
                sizes="80"
              ></AvatarImage>
              <AvatarFallback>
                <Image
                  src="/logo-pref-notext.png"
                  alt="Logo"
                  width={50}
                  height={50}
                />
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start justify-center leading-5">
              <p className="line-clamp-1 text-start font-semibold text-[#3B5394]">
                {user?.name}
              </p>
              <p className="line-clamp-1 text-start font-light text-[#3B5394]">
                {user?.email}
              </p>
            </div>
          </div>
          <Popover>
            <PopoverTrigger className="flex cursor-pointer gap-3 text-[#3B5394] transition-all duration-300 hover:rotate-45">
              <IoSettingsOutline
                className="text-[#2857CD]"
                size={22}
              />
            </PopoverTrigger>
            <PopoverContent className="font- flex w-fit max-w-64 flex-col gap-1 overflow-hidden p-0 py-2">
              <DialogUserUpdate
                title="Editar Perfil"
                user={user!}
              >
                <div className="font-nunito group flex cursor-pointer items-center rounded-md px-3 py-1">
                  <TbUserEdit
                    size={20}
                    className="mr-1 transition-colors group-hover:text-[#639855]"
                  />

                  <span className="bg-[linear-gradient(to_right,#639855_50%,#000_50%)] bg-size-[200%_100%] bg-clip-text bg-right text-sm text-transparent transition-all duration-300 group-hover:bg-left group-hover:font-medium">
                    <p className="cursor-pointer font-medium">
                      Editar Perfil
                    </p>
                  </span>
                </div>
              </DialogUserUpdate>
              <div
                className="group flex cursor-pointer items-center rounded-md px-3 py-1"
                onClick={logout}
              >
                <IoMdLogOut
                  size={20}
                  className="mr-1 transition-colors group-hover:text-[#ca080b]"
                />
                <span className="bg-[linear-gradient(to_right,#ca080b_50%,#000_50%)] bg-size-[200%_100%] bg-clip-text bg-right text-sm font-medium text-transparent transition-all duration-300 group-hover:bg-left group-hover:font-medium">
                  Sair
                </span>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
