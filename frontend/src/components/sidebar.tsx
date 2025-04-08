import SvgChart from "@/assets/img/icons/ChartPie.svg?react";
import SvgChevronDown from "@/assets/img/icons/ChevronDown.svg?react";
import SvgUser from "@/assets/img/icons/User.svg?react";
import SvgBadge from "@/assets/img/icons/UserBadge.svg?react";
import SvgLogo from "@/assets/img/logos/WenLockLogoWhite.svg?react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const [openControls, setOpenControls] = useState(false);

  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="h-screen w-80 bg-[#0d1931] border-r shadow-sm flex flex-col justify-between">
      <div>
        <SvgLogo className="mx-auto my-12 w-60" />
        <nav className="flex flex-col gap-2 px-4">
          <SidebarItem
            icon={<SvgChart />}
            label="Início"
            onClick={() => navigate("/dash")}
            isActive={isActive("/dash")}
          />

          <SidebarItem
            icon={<SvgBadge />}
            label="Controle de acesso"
            onClick={() => setOpenControls(!openControls)}
            isActive={openControls}
            isMenu
            isOpen={openControls}
          />

          {openControls && (
            <SidebarItem
              icon={<SvgUser />}
              label="Usuários"
              onClick={() => navigate("/dash/users")}
              isActive={isActive("/dash/users")}
              isSubItem
            />
          )}
        </nav>
      </div>

      <div className="p-8">
        <div className="flex flex-col gap-2">
          <span className="text-white font-bold text-xl">&copy; Wenlock</span>
          <div className="flex flex-col gap-1">
            <span className="text-[#AACBC4]">Power by Conecthus</span>
            <span className="text-[#AACBC4]">V 0.0.0</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  isActive: boolean;
  isMenu?: boolean;
  isOpen?: boolean;
  isSubItem?: boolean;
}
const SidebarItem = (props: SidebarItemProps) => {
  return (
    <button
      onClick={props.onClick}
      className={`flex items-center p-2 rounded-lg text-white hover:bg-[#00606D] hover:text-white transition-colors ${
        props.isActive || props.isOpen ? "opacity-100" : "opacity-60"
      } ${props.isSubItem ? "ml-8" : ""}
      } `}
    >
      <div className="flex items-center gap-3">
        {props.icon}
        {props.label}
      </div>
      {props.isMenu && (
        <SvgChevronDown className={props.isOpen ? "rotate-180" : ""} />
      )}
    </button>
  );
};
