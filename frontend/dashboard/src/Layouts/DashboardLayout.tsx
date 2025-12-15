import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ProfileModal } from "@/components/ProfileModal";
import { useUserProfile } from "@/hooks/user";
import { User, LogOut } from "lucide-react";
import { useAuthStore } from "@/stores/auth";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const { data: profileData } = useUserProfile();
  const { clearAuthState } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    clearAuthState();
    navigate("/login");
  };

  const profile = profileData?.data || null;

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between border-b bg-white px-4">
          <SidebarTrigger className="-ml-1" />

          {/* Profile Section */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              onClick={() => setProfileModalOpen(true)}
              className="flex items-center gap-2 hover:bg-gray-100"
            >
              <div className="w-8 h-8 bg-[#ef4444] rounded-full flex items-center justify-center shadow-sm">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-900 hidden sm:inline">
                {profile?.fullName || "Profile"}
              </span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-gray-600 hover:text-[#ef4444] hover:bg-red-50"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </header>
        <main className="flex-1 bg-gray-50">{children}</main>

        <ProfileModal
          open={profileModalOpen}
          onOpenChange={setProfileModalOpen}
          profile={profile}
        />
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
