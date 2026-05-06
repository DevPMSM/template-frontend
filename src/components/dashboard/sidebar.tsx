import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/sidebar";
import { AppSidebar } from "@/components/dashboard/appSidebar"; // O componente da sua sidebar
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { useAuth } from "@/hooks/useAuth";
import { FaCircleUser } from "react-icons/fa6";
import { CgMoreVertical } from "react-icons/cg";

export default function Layout() {

  const {user} = useAuth();

  return (
    <div>
      <div className="flex max-md:h-20.5 h-0 w-full justify-between bg-[#4c65ac] md:bg-transparent px-4">
        <SidebarProvider>
          <AppSidebar />
          <main>
            <SidebarTrigger className="md:hidden h-20.5 cursor-pointer hover:bg-transparent">
              <CgMoreVertical className="w-full h-full text-white"/>
            </SidebarTrigger>
          </main>
        </SidebarProvider>
        <div className="flex items-center md:hidden">
          <Avatar>
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
