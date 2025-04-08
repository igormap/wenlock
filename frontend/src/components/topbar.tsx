import { getUser } from "@/contexts/AuthContext";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { ChevronDown, LogOut } from "lucide-react";
import { useNavigate } from "react-router";

export const Topbar = () => {
  const navigate = useNavigate();
  const user = getUser();

  return (
    <div className="bg-white w-full flex items-center px-16 justify-end overflow-autos h-20 shadow-custom-light border-b">
      <Popover>
        <PopoverTrigger>
          <UserAvatar collapse />
        </PopoverTrigger>
        <PopoverContent className="bg-white h-32 rounded-2xl border p-3 flex flex-col">
          <div className="flex gap-1.5">
            <UserAvatar />
            <div className="flex flex-col justify-between">
              <span className="text-[#0290a4] font-bold">{user?.name}</span>
              <span className="text-[#0B2B25] opacity-80">{user?.email}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="mt-5 ml-2 flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-black focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <LogOut direction="right" /> Sair
          </button>
        </PopoverContent>
      </Popover>
    </div>
  );
};

const UserAvatar = ({ collapse }: { collapse?: boolean }) => {
  return (
    <div className="relative cursor-pointer">
      <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#021b1a] font-bold text-white border-2 border-[#00aac1] hover:border-[#17876D]">
        MS
      </div>
      {collapse && (
        <div className="h-4 w-4 absolute bottom-0 right-0 bg-white rounded-full flex items-center justify-center">
          <ChevronDown />
        </div>
      )}
    </div>
  );
};
