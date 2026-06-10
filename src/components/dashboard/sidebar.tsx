import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/sidebar";
import { AppSidebar } from "@/components/dashboard/appSidebar"; // O componente da sua sidebar
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../avatar";
import { useAuth } from "@/hooks/useAuth";
import { FaCircleUser } from "react-icons/fa6";
import { CgMoreVertical } from "react-icons/cg";
import { cn } from "@/lib/utils";
import { PiUserLight } from "react-icons/pi";
import { usePathname } from "next/navigation";

export default function Layout() {
  const { user } = useAuth();
  const pathname = usePathname();

  return (
    <div>
      <div className="flex h-0 w-full justify-between bg-[#4c65ac] px-4 max-md:h-20.5 md:bg-transparent">
        <SidebarProvider>
          <AppSidebar>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a
                  href={"/admin/users"}
                  className={cn(
                    "group font-nunito my-0.5 flex h-11 px-2 text-[19px] font-medium text-white/20 transition-transform duration-200 hover:border hover:border-white/10 hover:bg-transparent hover:bg-linear-to-l hover:from-[#3147af] hover:to-[#3b53b6] hover:font-bold",
                    pathname === "/admin/users"
                      ? "group-hover:none border border-l-2 border-white/10 border-l-white bg-linear-to-l from-[#3147af] to-[#3b53b6] outline transition-all duration-200"
                      : ""
                  )}
                >
                  <span
                    className={`flex items-center gap-2 text-ellipsis text-white transition-all duration-200 line-clamp-1${
                      pathname === "/admin/users"
                        ? "font-bold"
                        : ""
                    }`}
                  >
                    <PiUserLight className="h-5.5! w-5.5! text-white" />
                    Usuários
                  </span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </AppSidebar>
          <main>
            <SidebarTrigger className="h-20.5 cursor-pointer hover:bg-transparent md:hidden">
              <CgMoreVertical className="h-full w-full scale-125 text-white" />
            </SidebarTrigger>
          </main>
        </SidebarProvider>
        <div className="flex items-center md:hidden">
          <Avatar className="scale-105">
            <AvatarImage src={user?.image} />
            <AvatarFallback className="my-auto bg-transparent">
              <FaCircleUser
                className="h-full w-full"
                color="#6E88D1"
              />
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
}
