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
import { FaCircleUser } from "react-icons/fa6";
import { usePathname } from "next/dist/client/components/navigation";

const items = [
  {
    title: "Usuários",
    url: "/admin/users",
    isActive: false,
  },
  {
    title: "Config",
    url: "/admin/config",
    isActive: false,
  },
];

export function AppSidebar() {
  const { user } = useAuth();
  const pathname = usePathname();

  return (
    <Sidebar className="border-none">
      <SidebarContent className="rounded-r-2xl bg-[#4c65ac]">
        <SidebarHeader className="m-3 rounded-sm max-md:bg-[#2d3f6e]">
          <div className="flex items-center gap-3 md:mt-6 md:flex-col">
            <Avatar>
              <AvatarImage src={user?.image} />
              <AvatarFallback className="my-auto bg-transparent">
                <FaCircleUser
                  className="h-80 w-80"
                  color="#6E88D1"
                />
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-lg text-white w-full text-center font-bold line-clamp-1">
                {user?.name}
              </p>
              <p className="text-md text-white text-center font-semibold line-clamp-1">
                {user?.role[0].toUpperCase() +
                  "" +
                  user?.role.slice(1)}
              </p>
            </div>
          </div>
        </SidebarHeader>
        <SidebarGroup>
          <SidebarGroupContent className="my-8">
            <SidebarMenu>
              {items.map((item, value) => (
                <SidebarMenuItem key={value}>
                  <SidebarMenuButton asChild>
                    <a
                      href={item.url}
                      className="font-nunito flex justify-center text-[17px] font-semibold text-white/20 transition-all duration-200 hover:bg-transparent hover:text-[18px] hover:font-bold"
                    >
                      <span
                        className={`text-white ${pathname === item.url ? "font-extrabold" : ""}`}
                      >
                        {item.title}
                      </span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
