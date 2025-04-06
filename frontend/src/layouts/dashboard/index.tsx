import { Topbar } from "@/components/topbar";

export const LayoutDashboard = () => {
  return (
    <div className="bg-white  w-full flex grow overflow-autos h-screen">
      <div className="w-[336px] bg-[#0d1931] h-full">Sidebar</div>
      <div className="flex flex-col flex-1">
        <Topbar />
        <div />
      </div>
    </div>
  );
};
