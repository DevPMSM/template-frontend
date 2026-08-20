import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/sidebar";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/avatar";
import { useAuth } from "@/hooks/useAuth";
import { FaCircleUser } from "react-icons/fa6";
import { CgMoreVertical } from "react-icons/cg";
import { usePathname } from "next/navigation";
import { AppSidebar } from "./appSidebar";

export default function Layout() {
  const { user } = useAuth();

  return (
    <div>
      <div className="flex h-0 w-full justify-between bg-[#4c65ac] px-4 max-md:h-20.5 md:bg-transparent">
        <SidebarProvider>
          <AppSidebar />
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
