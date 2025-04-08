// import SvgLock from "@/assets/img/illustrations/LockPassword.svg?react";
// import SvgLogo from "@/assets/img/logos/WenLockLogoWhite.svg?react";
import WenlockLogo from "@/assets/img/logos/WenlockLogoWhite";
import { Outlet, useLocation } from "react-router";

const LayoutAuth = () => {
  const location = useLocation();

  return (
    <div className="bg-slate-900 w-full grid grid-cols-2 h-screen">
      <div className="flex justify-center items-center">
        <WenlockLogo className="w-1/2" />
        {/* {location.pathname === "/password-recovery" ? (
        ) : (
          <SvgLogo className="w-1/2" />
        )} */}
      </div>
      <div className="p-10">
        <Outlet />
      </div>
    </div>
  );
};

export { LayoutAuth };
