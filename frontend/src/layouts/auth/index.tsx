import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
// import { useRedux } from '@/storage/hooks';
import { ReactComponent as SvgLogo } from "@/assets/img/logos/WenLockLogoWhite.svg";
import { ReactComponent as SvgLock } from "@/assets/img/illustrations/LockPassword.svg";

const LayoutAuth = () => {
  const loaction = useLocation();
  // const { user } = useRedux((s) => s.session);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (user) {
  //     navigate('/dash');
  //   }
  // }, [user]);

  return (
    <div className="bg-slate-900 w-full grid grid-cols-2 h-screen">
      <div className="flex justify-center items-center">
        {location.pathname === "/password-recovery" ? (
          <SvgLock className="w-1/2" />
        ) : (
          <SvgLogo className="w-1/2" />
        )}
      </div>
      <div className="p-10">
        <Outlet />
      </div>
    </div>
  );
};

export { LayoutAuth };
