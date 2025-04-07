import Sidebar from "@/components/sidebar";
import { Topbar } from "@/components/topbar";
import { Outlet } from "react-router";

export const LayoutDashboard = () => {
  return (
    <div className="bg-white  w-full flex grow overflow-autos h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Topbar />
        <div className="bg-[#F3F3F3] h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
