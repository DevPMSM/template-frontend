import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/sidebar";
import { useAuth } from "@/hooks/useAuth";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../avatar";
import { getImageUrl } from "@/lib/imageUrl";
import { usePathname } from "next/dist/client/components/navigation";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../popover";
import { PiUserLight } from "react-icons/pi";
import DialogUserUpdate from "../user/dialogs/dialogUserUpdate";
import { TbUserEdit } from "react-icons/tb";
import { IoMdLogOut } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { cn } from "@/lib/utils";

// const items = [
//   {
//     title: "Usuários",
//     url: "/admin/users",
//   },
//   {
//     title: "Configuração",
//     url: "/admin/config",
//   },
// ];

type AppSidebarProps = {
  children: React.ReactNode;
};

export function AppSidebar({ children }: AppSidebarProps) {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  return (
    <Sidebar className="w-75 border-none">
      <SidebarContent className="bg-linear-to-r from-[#3B5394] to-[#203670]">
        <SidebarHeader className="rounded-sm px-2 py-3">
          <div className="flex items-center justify-center gap-3 px-2 md:mt-6">
            {/* Logo do sistema que estiver em desenvolvimento */}
            <Image
              src="/logo-pref-notext.png"
              alt="Logo"
              width={50}
              height={50}
            />

            {/* Nome do sistema */}
            <div>
              <p className="font-nunito line-clamp-1 w-full text-start text-lg leading-4 font-bold text-white">
                TEMPLATE SECTI
              </p>
            </div>
          </div>
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
              {/* {items.map((item, value) => (
                <SidebarMenuItem key={value}>
                  <SidebarMenuButton
                    asChild
                  ></SidebarMenuButton>
                </SidebarMenuItem>
              ))} */}
              {children}
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
