import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  MapPin,
  Package,
  Settings,
  LogOut,
  Truck,
} from "lucide-react";
import { Link } from "react-router";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/merchant" },
  { icon: MapPin, label: "Tracking", href: "/tracking" },
  { icon: Package, label: "Shipments", href: "/merchant/shipments" },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="border-b border-gray-200 p-4">
        <Link to="/merchant" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#ef4444] rounded-xl flex items-center justify-center shadow-sm">
            <Truck className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">
            Ash<span className="text-[#ef4444]">7</span>nl
            <span className="text-[#ef4444]">y</span>
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={item.href}
                      className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-red-50 hover:text-[#ef4444] rounded-xl transition-colors font-medium"
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-gray-200 p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                to="/settings"
                className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-xl transition-colors font-medium"
              >
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <button
                className="flex items-center gap-3 px-3 py-2 text-[#ef4444] hover:bg-red-50 rounded-xl transition-colors w-full font-medium"
                onClick={() => console.log("Sign out")}
              >
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
